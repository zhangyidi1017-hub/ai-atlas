/**
 * AI OS 快讯流水线 — 多 Agent 采集 / 总结 / 洞察 / 标签 / 评分 / Brief
 *
 * 环境变量：
 *   DEEPSEEK_API_KEY  — 启用 Summary / Insight / Tag / Importance / Brief Agent
 *
 * 用法：npm run news:pipeline
 */
import fs from "fs";
import path from "path";
import crypto from "crypto";
import { fileURLToPath } from "url";
import { decodeEntities, stripHtml, cleanFeedText, isMostlyChinese } from "./text-utils.mjs";
import { fetchArticle, shouldFetchArticle } from "./fetch-article.mjs";
import { translateArticleBundle, translateText } from "./translate.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const configPath = path.join(__dirname, "news-sources.json");
const outPath = path.join(root, "news.json");
const dbDir = path.join(root, "data", "news-db");
const seenPath = path.join(dbDir, "seen.json");
const curatedPath = path.join(root, "data", "curated-signals.json");
const rawDir = path.join(dbDir, "raw");

const config = JSON.parse(fs.readFileSync(configPath, "utf8"));
const apiKey = process.env.DEEPSEEK_API_KEY || "";
const maxAgeDays = config.maxAgeDays || 14;
const maxProcess = config.maxProcessPerRun || 10;
const maxArchive = config.maxArchiveDays || 45;
const interestTags = config.interestTags || [];
const learningFocus = config.learningFocus || [];

// ── RSS helpers ──

function parseAtomItems(xml) {
  const items = [];
  for (const block of xml.match(/<entry[\s\S]*?<\/entry>/gi) || []) {
    const pick = (tag) => {
      const m = block.match(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`, "i"));
      return m ? stripHtml(m[1]) : "";
    };
    const title = pick("title");
    const linkMatch = block.match(/<link[^>]+href=["']([^"']+)["']/i);
    const link = linkMatch ? linkMatch[1] : pick("link");
    const description = pick("summary") || pick("content");
    const pubDate = pick("published") || pick("updated");
    if (title && link) items.push({ title, link, description, pubDate });
  }
  return items;
}

function parseRssItems(xml) {
  const items = [];
  for (const block of xml.match(/<item[\s\S]*?<\/item>/gi) || []) {
    const pick = (tag) => {
      const m = block.match(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`, "i"));
      return m ? stripHtml(m[1]) : "";
    };
    const title = pick("title");
    const link = pick("link");
    const description = pick("description") || pick("content:encoded") || pick("summary");
    const pubDate = pick("pubDate") || pick("updated") || pick("dc:date");
    if (title && link) items.push({ title, link, description, pubDate });
  }
  return items;
}

function parseFeedItems(xml, format) {
  const kind = format || (/<feed[\s>]/i.test(xml) ? "atom" : "rss");
  return kind === "atom" ? parseAtomItems(xml) : parseRssItems(xml);
}

function feedUrls(feed) {
  const template = feed.feedUrl || "";
  if (!template.includes("{rssHubBase}")) return [template];
  const bases = [process.env.RSSHUB_BASE, ...(config.rssHubBases || []), "https://rsshub.app"].filter(Boolean);
  return [...new Set(bases.map((b) => template.replace("{rssHubBase}", b)))];
}

async function fetchFeed(feed) {
  for (const url of feedUrls(feed)) {
    try {
      const res = await fetch(url, {
        headers: { "User-Agent": "AI-OS-NewsPipeline/2.0" },
        signal: AbortSignal.timeout(25000),
      });
      if (!res.ok) continue;
      const xml = await res.text();
      const parsed = parseFeedItems(xml, feed.format).map((item) => ({ ...item, feed }));
      if (parsed.length) return parsed;
    } catch {
      /* next mirror */
    }
  }
  if (!feed.optional) console.warn(`[source skip] ${feed.id}`);
  return [];
}

function itemDate(item) {
  const d = new Date(item.pubDate || Date.now());
  return Number.isNaN(d.getTime()) ? new Date() : d;
}

function makeId(url) {
  return "sig-" + crypto.createHash("sha1").update(url).digest("hex").slice(0, 10);
}

function formatDate(d) {
  return d.toISOString().slice(0, 10);
}

function ensureDb() {
  fs.mkdirSync(rawDir, { recursive: true });
  if (!fs.existsSync(seenPath)) fs.writeFileSync(seenPath, "{}\n");
}

function loadSeen() {
  try {
    return JSON.parse(fs.readFileSync(seenPath, "utf8"));
  } catch {
    return {};
  }
}

function saveSeen(seen) {
  fs.writeFileSync(seenPath, JSON.stringify(seen, null, 2) + "\n");
}

function loadExistingNews() {
  try {
    const data = JSON.parse(fs.readFileSync(outPath, "utf8"));
    return Array.isArray(data.items) ? data.items : [];
  } catch {
    return [];
  }
}

function saveRaw(raw) {
  const day = formatDate(itemDate(raw));
  const file = path.join(rawDir, `${day}.jsonl`);
  fs.appendFileSync(file, JSON.stringify(raw) + "\n");
}

// ── Layer 1: Source Agent ──

async function sourceAgent() {
  console.log("[1/6] Source Agent — 采集信息源…");
  const feeds = config.sources || config.feeds || [];
  const batches = await Promise.all(feeds.map(fetchFeed));
  const merged = batches
    .flat()
    .filter((item) => Date.now() - itemDate(item).getTime() <= maxAgeDays * 86400000)
    .sort((a, b) => itemDate(b) - itemDate(a));

  const seen = loadSeen();
  const existing = loadExistingNews();
  const knownUrls = new Set([...existing.map((i) => i.source?.url || i.raw?.url), ...Object.keys(seen)]);

  const fresh = [];
  for (const item of merged) {
    if (knownUrls.has(item.link)) continue;
    knownUrls.add(item.link);
    fresh.push(item);
  }

  console.log(`  发现 ${merged.length} 条，其中 ${fresh.length} 条为新内容`);

  const groupRank = { company: 0, community: 1, x: 2, trending: 3 };
  fresh.sort(
    (a, b) =>
      (groupRank[a.feed.group] ?? 2) - (groupRank[b.feed.group] ?? 2) ||
      itemDate(b) - itemDate(a)
  );

  return fresh.slice(0, maxProcess);
}

async function processRawItem(raw) {
  const feed = raw.feed;
  let article = null;

  if (shouldFetchArticle(feed)) {
    console.log(`  [fetch] ${feed.name}: ${raw.link}`);
    article = await fetchArticle(raw.link);
    if (article) {
      saveRaw({
        title: article.title || raw.title,
        link: raw.link,
        description: article.text.slice(0, 500),
        source: feed.id,
        fetched: true,
        at: new Date().toISOString(),
      });
    }
  }

  let analysis;
  try {
    if (apiKey) {
      analysis = await analyzeAgent(raw, article);
    } else if (shouldFetchArticle(feed) || feed.group === "company") {
      analysis = await translateProcess(raw, article);
    } else {
      analysis = fallbackProcess(raw, article);
    }
  } catch (err) {
    console.warn(`  [fail] ${raw.link}: ${err.message}`);
    try {
      analysis = shouldFetchArticle(feed) ? await translateProcess(raw, article) : fallbackProcess(raw, article);
    } catch {
      analysis = fallbackProcess(raw, article);
    }
  }

  return {
    id: makeId(raw.link),
    ...analysis,
    summary: analysis.summary,
    date: formatDate(itemDate(raw)),
    categoryIds: feed.categoryIds || [],
    productIds: [...new Set([...(feed.productIds || []), ...(analysis.affectedProductIds || [])])],
    source: {
      type: feed.type || "rss",
      group: feed.group || "company",
      name: feed.name,
      author: feed.author,
      url: raw.link,
      home: feed.url,
      lang: analysis.originalLang || article?.lang || "en",
      translated: Boolean(analysis.translated),
      translateMethod: analysis.translateMethod || (analysis.translated ? "deepseek" : null),
      originalTitle: analysis.originalTitle || article?.title || raw.title,
    },
    raw: {
      title: raw.title,
      url: raw.link,
      fetched: Boolean(article),
      savedAt: new Date().toISOString(),
    },
  };
}

async function retranslateExistingItem(item) {
  const url = item.source?.url || item.raw?.url;
  if (!url) return item;

  const feed = {
    id: item.source?.name,
    group: item.source?.group || "company",
    type: item.source?.type || "blog",
    name: item.source?.name,
    author: item.source?.author,
    url: item.source?.home,
    productIds: item.productIds || [],
    categoryIds: item.categoryIds || [],
  };

  const raw = {
    title: item.raw?.title || item.source?.originalTitle || item.title,
    link: url,
    description: (item.content || []).join("\n\n"),
    feed,
    pubDate: item.date,
  };

  console.log(`  [retranslate] ${feed.name}: ${url}`);
  const article = shouldFetchArticle(feed) ? await fetchArticle(url) : null;
  let analysis;
  try {
    analysis = apiKey ? await analyzeAgent(raw, article) : await translateProcess(raw, article);
  } catch (err) {
    console.warn(`  [retranslate fail] ${url}: ${err.message}`);
    return item;
  }

  return {
    ...item,
    ...analysis,
    summary: analysis.summary,
    source: {
      ...item.source,
      lang: analysis.originalLang || item.source?.lang,
      translated: Boolean(analysis.translated),
      translateMethod: analysis.translateMethod || item.source?.translateMethod,
      originalTitle: analysis.originalTitle || item.source?.originalTitle,
    },
    raw: { ...item.raw, retranslatedAt: new Date().toISOString(), fetched: Boolean(article) },
  };
}

// ── LLM ──

async function callDeepSeek(system, user, { temperature = 0.35 } = {}) {
  const res = await fetch("https://api.deepseek.com/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "deepseek-chat",
      messages: [
        { role: "system", content: system },
        { role: "user", content: user },
      ],
      response_format: { type: "json_object" },
      temperature,
    }),
    signal: AbortSignal.timeout(90000),
  });
  if (!res.ok) throw new Error(`DeepSeek HTTP ${res.status}`);
  const data = await res.json();
  return JSON.parse(data.choices?.[0]?.message?.content || "{}");
}

function fallbackProcess(raw, article = null) {
  const desc = cleanFeedText(raw.description || "");
  const title = cleanFeedText(raw.title || "");
  const bodyParas = article?.paragraphs?.length ? article.paragraphs : desc ? [desc] : [title];
  return {
    title,
    oneLiner: desc.slice(0, 100) || title,
    summary: {
      oneSentence: desc.slice(0, 120) || title,
      bullets: desc ? [desc.slice(0, 200)] : [title],
      audience: "AI 产品学习者",
      readMinutes: 3,
      keywords: [],
    },
    insight: {
      mainInsight: "待 AI 分析（请配置 DEEPSEEK_API_KEY）",
      whyNow: "",
      problem: "",
      trend: "",
      differentiation: "",
      outlook: "",
    },
    learning: {
      whyImportant: "",
      productDesign: "",
      relevance: "",
      actionItems: raw.link ? [`阅读原文：${raw.link}`] : [],
    },
    tags: [],
    importance: { stars: 3, reason: "待评分", readMinutes: 3 },
    affectedProductIds: raw.feed.productIds || [],
    content: bodyParas,
    highlights: [],
    translated: false,
    originalTitle: article?.title || raw.title,
    originalLang: article?.lang || (isMostlyChinese(title + desc) ? "zh" : "en"),
  };
}

async function translateProcess(raw, article = null) {
  const feed = raw.feed;
  const desc = cleanFeedText(raw.description || "");
  const rssTitle = cleanFeedText(raw.title || "");
  const sourceLang = article?.lang || (isMostlyChinese(rssTitle + desc) ? "zh" : "en");
  const originalTitle = article?.title || rssTitle;
  const originalParagraphs =
    article?.paragraphs?.length >= 2
      ? article.paragraphs
      : desc
        ? desc.split(/\n{2,}/).filter((p) => p.trim().length >= 40).slice(0, 8)
        : [rssTitle];

  console.log(`  [translate] ${feed.name}: ${originalTitle.slice(0, 50)}…`);

  const bundle = await translateArticleBundle({
    title: originalTitle,
    paragraphs: originalParagraphs.slice(0, 10),
    lang: sourceLang,
  });

  const zhParas = bundle.paragraphs.length ? bundle.paragraphs : [bundle.oneLiner];
  const oneSentence = bundle.oneLiner || zhParas[0]?.slice(0, 120) || bundle.title;

  return {
    title: bundle.title || rssTitle,
    oneLiner: oneSentence,
    summary: {
      oneSentence,
      bullets: zhParas.slice(0, 4).map((p) => p.slice(0, 160)),
      audience: "AI 产品学习者",
      readMinutes: Math.min(12, Math.max(3, Math.ceil(zhParas.join("").length / 500))),
      keywords: [],
    },
    insight: {
      mainInsight: `${feed.name} 官网发布：${oneSentence}`,
      whyNow: "",
      problem: "",
      trend: "",
      differentiation: "",
      outlook: "",
    },
    learning: {
      whyImportant: "官方一手信息，适合了解产品方向与能力边界。",
      productDesign: "",
      relevance: (feed.productIds || []).length ? `关联产品：${feed.productIds.join("、")}` : "",
      actionItems: raw.link ? [`阅读原文（${sourceLang === "zh" ? "中文" : "英文"}）：${raw.link}`] : [],
    },
    tags: feed.type === "release" ? ["Release"] : [],
    importance: { stars: feed.group === "company" ? 4 : 3, reason: "官网一手发布", readMinutes: 5 },
    affectedProductIds: feed.productIds || [],
    content: zhParas,
    highlights: zhParas.slice(0, 3).map((p) => p.slice(0, 80)),
    translated: bundle.translated,
    translateMethod: bundle.method,
    originalTitle,
    originalLang: sourceLang,
  };
}

// ── Layers 2–5: Summary + Insight + Tag + Importance + Learning ──

async function analyzeAgent(raw, article = null) {
  const feed = raw.feed;
  const articleText = article?.text?.slice(0, 8000) || "";
  const body = [
    `来源：${feed.name}（${feed.type || "rss"}）`,
    `标题：${article?.title || raw.title}`,
    `链接：${raw.link}`,
    articleText ? `官网正文（请转译成中文呈现）：\n${articleText}` : "",
    !articleText && raw.description ? `原文摘要：${cleanFeedText(raw.description).slice(0, 2000)}` : "",
    feed.productIds?.length ? `关联产品 ID：${feed.productIds.join(", ")}` : "",
    `可选标签：${interestTags.join(", ")}`,
    `学习关注：${learningFocus.join(", ")}`,
  ]
    .filter(Boolean)
    .join("\n");

  const system = `你是 AI OS 快讯系统的分析 Agent 链，面向中国 AI 产品学习者。
必须将所有输出（标题、正文、摘要）转为流畅中文；保留专有名词英文原名。
按以下 JSON 结构输出（不要编造原文没有的事实）：
{
  "title": "中文标题",
  "oneLiner": "一句话发生了什么",
  "summary": {
    "oneSentence": "一句话总结",
    "bullets": ["更新点1","更新点2","更新点3"],
    "audience": "适合谁",
    "readMinutes": 3,
    "keywords": ["关键词"]
  },
  "insight": {
    "mainInsight": "核心洞察，1-2句",
    "whyNow": "为什么现在发布",
    "problem": "解决什么问题",
    "trend": "属于哪个趋势",
    "differentiation": "与竞品差异",
    "outlook": "未来半年意味着什么"
  },
  "learning": {
    "whyImportant": "为什么重要（行业意义）",
    "productDesign": "值得学习的产品设计/交互/策略",
    "relevance": "与 Agent/Memory/MCP/Coding 等方向的相关性",
    "actionItems": ["今天值得读的链接或动作"]
  },
  "tags": ["从可选标签中选 1-4 个"],
  "importance": {
    "stars": 1-5,
    "reason": "产品经理是否值得花几分钟读",
    "readMinutes": 1-15
  },
  "affectedProductIds": ["可能受影响的产品 id 数组，无则空"],
  "content": ["正文段落1","正文段落2"],
  "highlights": ["要点1","要点2","要点3"]
}`;

  const parsed = await callDeepSeek(system, body);
  const stars = Math.min(5, Math.max(1, Number(parsed.importance?.stars) || 3));

  return {
    title: parsed.title || raw.title,
    oneLiner: parsed.oneLiner || parsed.summary?.oneSentence || raw.title,
    summary: {
      oneSentence: parsed.summary?.oneSentence || "",
      bullets: Array.isArray(parsed.summary?.bullets) ? parsed.summary.bullets.slice(0, 5) : [],
      audience: parsed.summary?.audience || "",
      readMinutes: parsed.summary?.readMinutes || parsed.importance?.readMinutes || 3,
      keywords: Array.isArray(parsed.summary?.keywords) ? parsed.summary.keywords.slice(0, 6) : [],
    },
    insight: {
      mainInsight: parsed.insight?.mainInsight || "",
      whyNow: parsed.insight?.whyNow || "",
      problem: parsed.insight?.problem || "",
      trend: parsed.insight?.trend || "",
      differentiation: parsed.insight?.differentiation || "",
      outlook: parsed.insight?.outlook || "",
    },
    learning: {
      whyImportant: parsed.learning?.whyImportant || "",
      productDesign: parsed.learning?.productDesign || "",
      relevance: parsed.learning?.relevance || "",
      actionItems: Array.isArray(parsed.learning?.actionItems) ? parsed.learning.actionItems.slice(0, 4) : [],
    },
    tags: Array.isArray(parsed.tags) ? parsed.tags.filter((t) => interestTags.includes(t) || t).slice(0, 5) : [],
    importance: {
      stars,
      reason: parsed.importance?.reason || "",
      readMinutes: parsed.importance?.readMinutes || 3,
    },
    affectedProductIds: Array.isArray(parsed.affectedProductIds)
      ? parsed.affectedProductIds
      : feed.productIds || [],
    content: Array.isArray(parsed.content) && parsed.content.length ? parsed.content : [parsed.summary?.oneSentence || raw.title],
    highlights: Array.isArray(parsed.highlights) ? parsed.highlights.slice(0, 4) : [],
    translated: true,
    translateMethod: "deepseek",
    originalTitle: article?.title || raw.title,
    originalLang: article?.lang || "en",
  };
}

function loadCuratedSignals() {
  try {
    if (!fs.existsSync(curatedPath)) return [];
    const list = JSON.parse(fs.readFileSync(curatedPath, "utf8"));
    return Array.isArray(list) ? list.map(normalizeLegacyItem) : [];
  } catch {
    return [];
  }
}

function buildWhatsChangingOffline(items) {
  const cutoff = Date.now() - 30 * 86400000;
  const recent = items.filter((i) => new Date(i.date).getTime() >= cutoff);
  const tagCounts = {};
  for (const item of recent) {
    for (const tag of item.tags || []) {
      tagCounts[tag] = (tagCounts[tag] || 0) + 1;
    }
  }
  const trends = Object.entries(tagCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8)
    .map(([name, count]) => ({
      name,
      signal: `近 30 天 ${count} 条相关更新`,
      examples: recent
        .filter((i) => (i.tags || []).includes(name))
        .slice(0, 2)
        .map((i) => i.title),
    }));

  const hotTags = ["MCP", "Agent", "Memory", "Coding", "Browser Agent", "Workspace"];
  const rising = hotTags.filter((t) => tagCounts[t] >= 2);

  return {
    periodDays: 30,
    generatedAt: new Date().toISOString(),
    summary:
      recent.length >= 3
        ? `近 30 天共 ${recent.length} 条 AI 信号。${rising.length ? `上升趋势：${rising.join("、")}。` : ""}越来越多产品在做 MCP 集成、Browser Agent、Memory 层与 Coding Agent。`
        : "持续采集更多信号后，将自动生成 30 天趋势分析。",
    trends,
    focusAreas: learningFocus.filter((f) => tagCounts[f] > 0).slice(0, 7),
    risingTags: rising,
  };
}

function buildProductUpdates(items) {
  return items
    .filter(
      (i) =>
        i.source?.type === "release" ||
        (i.tags || []).includes("Release") ||
        (i.source?.type === "blog" && (i.productIds || []).length)
    )
    .slice(0, 24)
    .map((i) => ({
      id: i.id,
      title: i.title,
      oneLiner: i.oneLiner || i.summary?.oneSentence || "",
      date: i.date,
      productIds: i.productIds || [],
      source: i.source?.name || "",
      tags: i.tags || [],
      stars: i.importance?.stars || 3,
    }));
}

// ── Layer 6: Brief + What's Changing + Product Updates ──

async function briefAgent(items) {
  const today = formatDate(new Date());
  const sorted = [...items].sort((a, b) => (b.importance?.stars || 0) - (a.importance?.stars || 0));
  const top = sorted.slice(0, 8);

  const brief = {
    date: today,
    generatedAt: new Date().toISOString(),
    totalCount: items.length,
    todayCount: items.filter((i) => i.date === today).length,
    headline: `今日 AI 信号 ${items.filter((i) => i.date === today).length || "—"} 条 · 档案共 ${items.length} 条`,
    topUpdates: top.slice(0, 5).map((i) => ({
      id: i.id,
      title: i.title,
      stars: i.importance?.stars || 3,
      oneLiner: i.oneLiner || i.summary?.oneSentence || i.summary,
      readMinutes: i.importance?.readMinutes || 3,
    })),
    sections: {
      topUpdates: top.filter((i) => (i.importance?.stars || 0) >= 4).slice(0, 6).map((i) => i.id),
      newReleases: items
        .filter((i) => i.tags?.includes("Release") || i.source?.type === "release")
        .slice(0, 8)
        .map((i) => i.id),
      insights: top.filter((i) => i.insight?.mainInsight).slice(0, 8).map((i) => i.id),
      emergingTrends: items
        .filter((i) => (i.tags || []).some((t) => ["Agent", "MCP", "Memory", "Workflow"].includes(t)))
        .slice(0, 8)
        .map((i) => i.id),
      newApis: items.filter((i) => (i.tags || []).includes("API")).slice(0, 6).map((i) => i.id),
      githubTrending: items.filter((i) => i.source?.type === "github").slice(0, 6).map((i) => i.id),
      productHunt: items.filter((i) => i.source?.type === "producthunt").slice(0, 6).map((i) => i.id),
      xDiscussions: items.filter((i) => i.source?.group === "x" || i.source?.type === "x").slice(0, 6).map((i) => i.id),
    },
    sectionLabels: {
      topUpdates: "🔥 Top Updates",
      newReleases: "🟢 New Releases",
      insights: "🧠 AI Insights",
      emergingTrends: "📈 Emerging Trends",
      newApis: "🏷 New APIs",
      githubTrending: "🚀 Github Trending",
      productHunt: "💼 Product Hunt",
      xDiscussions: "💬 X Discussions",
    },
  };

  const productUpdates = buildProductUpdates(items);
  const offlineWc = buildWhatsChangingOffline(items);

  if (!apiKey || items.length < 3) {
    return { brief, whatsChanging: offlineWc, productUpdates };
  }

  console.log("[6/6] Brief Agent — 生成 What's Changing…");
  const cutoff = Date.now() - 30 * 86400000;
  const recent = items.filter((i) => new Date(i.date).getTime() >= cutoff);
  const digest = recent.slice(0, 40).map((i) => `- ${i.title} [${(i.tags || []).join(",")}] ${i.insight?.mainInsight || i.oneLiner || ""}`).join("\n");

  try {
    const wc = await callDeepSeek(
      `你是 AI 行业分析师。基于最近 30 天更新，输出 JSON：
{"summary":"2-3句总览","trends":[{"name":"趋势名","signal":"为什么","examples":["例子"]}],"focusAreas":["Agent","Memory"]}`,
      digest.slice(0, 12000),
      { temperature: 0.4 }
    );
    return {
      brief,
      whatsChanging: {
        periodDays: 30,
        generatedAt: new Date().toISOString(),
        summary: wc.summary || offlineWc.summary,
        trends: Array.isArray(wc.trends) && wc.trends.length ? wc.trends.slice(0, 8) : offlineWc.trends,
        focusAreas: Array.isArray(wc.focusAreas) && wc.focusAreas.length ? wc.focusAreas : offlineWc.focusAreas,
        risingTags: offlineWc.risingTags,
      },
      productUpdates,
    };
  } catch (err) {
    console.warn(`  What's Changing 跳过: ${err.message}`);
    return { brief, whatsChanging: offlineWc, productUpdates };
  }
}

function normalizeLegacyItem(item) {
  if (item.summary && typeof item.summary === "object") return item;
  return {
    ...item,
    oneLiner: item.oneLiner || item.summary,
    summary: {
      oneSentence: typeof item.summary === "string" ? item.summary : "",
      bullets: item.highlights || [],
      audience: "",
      readMinutes: 3,
      keywords: item.tags || [],
    },
    insight: item.insight || { mainInsight: "" },
    learning: item.learning || {},
    tags: item.tags || [],
    importance: item.importance || { stars: 3, reason: "", readMinutes: 3 },
    affectedProductIds: item.affectedProductIds || item.productIds || [],
  };
}

async function main() {
  ensureDb();
  console.log("AI OS News Pipeline v2\n");

  const freshRaw = await sourceAgent();
  const existing = loadExistingNews().map(normalizeLegacyItem);
  const seen = loadSeen();
  const processed = [];

  console.log(`[2-5/6] Analysis Agents — 处理 ${freshRaw.length} 条新内容…`);
  for (const raw of freshRaw) {
    saveRaw({ title: raw.title, link: raw.link, description: raw.description, source: raw.feed.id, at: new Date().toISOString() });
    processed.push(await processRawItem(raw));
    seen[raw.link] = new Date().toISOString();
    await new Promise((r) => setTimeout(r, apiKey ? 500 : 800));
  }

  const maxRetranslate = config.maxRetranslate || 6;
  const needRetranslate = existing.filter(
    (i) =>
      i.source?.group === "company" &&
      i.source?.translated === false &&
      (i.source?.url || i.raw?.url) &&
      !i.id?.startsWith("cur-")
  );
  if (needRetranslate.length) {
    console.log(`[retranslate] 补转译 ${Math.min(maxRetranslate, needRetranslate.length)} 条官网文章…`);
    for (const item of needRetranslate.slice(0, maxRetranslate)) {
      const updated = await retranslateExistingItem(item);
      processed.push(updated);
      await new Promise((r) => setTimeout(r, 800));
    }
  }

  const curated = loadCuratedSignals();
  console.log(`  精选信号库 ${curated.length} 条（Agent 学习向）`);

  const byKey = new Map();
  for (const item of [...curated, ...existing, ...processed]) {
    const key = item.id || item.source?.url || item.raw?.url;
    if (key) byKey.set(key, item);
  }

  const merged = [...byKey.values()]
    .filter((i) => Date.now() - new Date(i.date).getTime() <= maxArchive * 86400000)
    .sort((a, b) => new Date(b.date) - new Date(a.date) || (b.importance?.stars || 0) - (a.importance?.stars || 0));

  const { brief, whatsChanging, productUpdates } = await briefAgent(merged);

  const payload = {
    version: 2,
    updatedAt: new Date().toISOString(),
    pipeline: "ai-os-agent-v2",
    analyzed: Boolean(apiKey),
    itemCount: merged.length,
    brief,
    whatsChanging,
    productUpdates,
    items: merged,
  };

  fs.writeFileSync(outPath, JSON.stringify(payload, null, 2) + "\n", "utf8");
  saveSeen(seen);
  console.log(`\n✓ 写入 ${merged.length} 条 → ${outPath}`);
  if (!apiKey) console.log("Tip: 设置 DEEPSEEK_API_KEY 启用深度 Agent 分析；当前使用官网抓取 + 自动中译");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
