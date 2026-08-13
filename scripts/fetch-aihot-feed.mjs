/**
 * 抓取 AI HOT 首页精选 → aihot-feed.json（含分类、标签、原文链接）
 * 用法：npm run aihot:fetch
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const outPath = path.join(root, "aihot-feed.json");
const SOURCE_URL = "https://aihot.virxact.com/";

export const AIHOT_CATEGORIES = [
  { id: "all", name: "全部" },
  { id: "ai-models", name: "模型", keywords: ["AI 模型", "模型发布", "模型", "LLM", "GPT", "DeepSeek", "Claude", "Gemini", "Qwen", "OpenAI", "Anthropic", "编码", "推理", "多模态", "Agent"] },
  { id: "ai-products", name: "产品", keywords: ["AI 产品", "产品", "Copilot", "Cursor", "Codex", "Release", "工具", "Skill", "应用"] },
  { id: "industry", name: "行业", keywords: ["行业动态", "行业", "政策", "监管", "市场", "投资", "算力", "版权", "立法"] },
  { id: "paper", name: "论文", keywords: ["论文", "Research", "arxiv", "Bench", "评测", "Paper"] },
  { id: "tip", name: "教程", keywords: ["教程", "技巧", "指南", "How", "Skill", "Workflow"] },
  { id: "opinion", name: "观点", keywords: ["技巧观点", "观点", "大佬观点", "大佬", "评论", "分析"] },
];

function decodeHtml(text) {
  return String(text || "")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
}

function stripTags(html) {
  return decodeHtml(html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim());
}

function extractInitialItems(html) {
  const startMarker = 'initialItems\\":[';
  const idx = html.indexOf(startMarker);
  if (idx === -1) return null;

  const start = idx + startMarker.length - 1;
  const endMarker = '],\\"initialHasNext\\"';
  const end = html.indexOf(endMarker, start);
  if (end === -1) return null;

  const escaped = html.slice(start, end + 1);
  const raw = escaped.replace(/\\"/g, '"').replace(/\\\\/g, "\\");
  return JSON.parse(raw);
}

function parseRssCategories(xml) {
  const map = {};
  const itemRe = /<item>([\s\S]*?)<\/item>/g;
  let block;
  while ((block = itemRe.exec(xml))) {
    const chunk = block[1];
    const guid = chunk.match(/<guid[^>]*>([^<]+)<\/guid>/i)?.[1]?.trim();
    const category = chunk.match(/<category>([^<]*)<\/category>/i)?.[1]?.trim();
    if (guid && category) map[guid] = category;
  }
  return map;
}

function inferCategory(item, rssCategory) {
  const tags = (item.aiTags || []).map((t) => (typeof t === "string" ? t : t.tag)).filter(Boolean);
  const blob = [rssCategory, ...tags, item.source?.name, item.titleZh, item.summaryZh].filter(Boolean).join(" ");

  if (/论文\/研究|arXiv|评测\/基准|RAG/.test(blob) || rssCategory?.includes("论文")) return "paper";
  if (/教程\/实践|大佬观点/.test(blob) || rssCategory?.includes("技巧") || rssCategory?.includes("观点")) return "opinion";
  if (/产品更新|Replit|Copilot Design/.test(blob) || rssCategory?.includes("产品")) return "ai-products";
  if (/模型发布|DeepSeek|OpenAI|Anthropic|Gemini|Qwen|Claude|GPT|推理|编码|多模态/.test(blob) || rssCategory?.includes("模型")) return "ai-models";
  if (/政策\/监管|行业动态|安全\/对齐|具身智能|部署\/工程|视频|图像生成|Hugging Face/.test(blob) || rssCategory?.includes("行业")) return "industry";
  if (/教程/.test(blob)) return "tip";

  if (rssCategory?.includes("模型")) return "ai-models";
  if (rssCategory?.includes("产品")) return "ai-products";
  if (rssCategory?.includes("行业")) return "industry";
  return "industry";
}

function normalizeItem(raw, rssCategory) {
  const categoryId = inferCategory(raw, rssCategory);
  const categoryName = AIHOT_CATEGORIES.find((c) => c.id === categoryId)?.name || "行业";
  const tags = (raw.aiTags || []).map((t) => (typeof t === "string" ? t : t.tag)).filter(Boolean);

  return {
    id: raw.id,
    url: raw.url || "",
    aihotUrl: `https://aihot.virxact.com/items/${raw.id}`,
    title: raw.titleZh || raw.title || "",
    titleEn: raw.title || "",
    summary: raw.summaryZh || "",
    reason: raw.aiSelectedReason || "",
    author: raw.author || raw.source?.name || "",
    source: raw.source?.name || "",
    sourceKind: raw.source?.kind || "",
    score: raw.finalScore ?? raw.qualityScore ?? 0,
    publishedAt: raw.publishedAt || "",
    dateLabel: raw.dateLabel || "",
    weekday: "",
    time: raw.timeLabel || "",
    dateKey: raw.dateKey || "",
    categoryId,
    categoryName,
    tags,
    avatar: raw.xAvatarProxied ? `https://aihot.virxact.com${raw.xAvatarProxied}` : "",
    media: (raw.xMediaProxied || [])[0]?.fullSrc || (raw.xMediaProxied || [])[0]?.src || "",
    mediaUrl: (() => {
      const m = (raw.xMediaProxied || [])[0];
      if (!m) return "";
      const src = m.fullSrc || m.src || "";
      return src.startsWith("http") ? src : `https://aihot.virxact.com${src}`;
    })(),
  };
}

function buildGroups(items) {
  const order = [];
  const map = new Map();
  for (const item of items) {
    const key = item.dateLabel || item.dateKey || "未知日期";
    if (!map.has(key)) {
      map.set(key, { dateLabel: key, weekday: item.weekday || "", items: [] });
      order.push(key);
    }
    map.get(key).items.push(item);
  }
  return order.map((key) => map.get(key));
}

function buildCategorySections(items) {
  return AIHOT_CATEGORIES.slice(1)
    .map((cat) => ({
      id: cat.id,
      name: cat.name,
      count: items.filter((i) => i.categoryId === cat.id).length,
      items: items.filter((i) => i.categoryId === cat.id),
    }))
    .filter((s) => s.count > 0);
}

async function main() {
  const [homeRes, rssRes] = await Promise.all([
    fetch(SOURCE_URL, {
      headers: { "User-Agent": "AI-Bazaar-AihotSync/1.0" },
      signal: AbortSignal.timeout(30000),
    }),
    fetch("https://aihot.virxact.com/feed/all.xml", {
      headers: { "User-Agent": "AI-Bazaar-AihotSync/1.0" },
      signal: AbortSignal.timeout(30000),
    }),
  ]);

  if (!homeRes.ok) throw new Error(`AI HOT HTTP ${homeRes.status}`);
  const html = await homeRes.text();
  const rssXml = rssRes.ok ? await rssRes.text() : "";
  const rssCategories = parseRssCategories(rssXml);

  const initialItems = extractInitialItems(html) || [];
  const selected = initialItems.filter((item) => item.aiSelected);

  let items = selected.map((raw) => normalizeItem(raw, rssCategories[raw.id]));

  if (!items.length) {
    items = parseAihotHomeFallback(html).map((item) => ({
      ...item,
      categoryId: inferCategory(item, ""),
      categoryName: AIHOT_CATEGORIES.find((c) => c.id === inferCategory(item, ""))?.name || "行业",
      tags: [],
      aihotUrl: item.url,
      author: item.source,
    }));
  }

  const payload = {
    version: 2,
    source: SOURCE_URL,
    updatedAt: new Date().toISOString(),
    itemCount: items.length,
    categories: AIHOT_CATEGORIES,
    categorySections: buildCategorySections(items),
    groups: buildGroups(items),
    items,
  };

  fs.writeFileSync(outPath, `${JSON.stringify(payload, null, 2)}\n`);
  console.log(`AI HOT 精选：${items.length} 条，${payload.categorySections.length} 个分类 → ${outPath}`);
}

function parseAihotHomeFallback(html) {
  const groups = [];
  const chunks = html.split('<div class="m-daygroup">').slice(1);

  for (const chunk of chunks) {
    const dateLabel = chunk.match(/m-daybar-main">([^<]+)/)?.[1]?.trim() || "";
    const weekday = chunk.match(/m-daybar-sub">([^<]+)/)?.[1]?.trim() || "";
    if (!dateLabel) continue;

    const items = [];
    const rowRe =
      /<div class="m-row-wrap" data-item-id="([^"]+)">[\s\S]*?href="(\/items\/[^"]+)"[\s\S]*?<span class="m-row-time">([^<]*)<\/span>[\s\S]*?<span class="m-row-src">([^<]*)<\/span>[\s\S]*?m-score[^"]*">(\d+)<[\s\S]*?<span class="m-row-title">([^<]*)<\/span>[\s\S]*?<span class="m-row-summary">([\s\S]*?)<\/span>([\s\S]*?)<\/a>\s*<\/div>/g;

    let m;
    while ((m = rowRe.exec(chunk))) {
      const tail = m[8] || "";
      const reasonMatch = tail.match(/m-row-reason-label">推荐理由：<\/span>([\s\S]*?)<\/span>/);
      const reason = reasonMatch ? stripTags(reasonMatch[1]) : "";
      if (!reason) continue;

      items.push({
        id: m[1],
        url: `https://aihot.virxact.com${m[2]}`,
        time: m[3].trim(),
        source: stripTags(m[4]),
        score: Number(m[5]) || 0,
        title: stripTags(m[6]),
        summary: stripTags(m[7]),
        reason,
        dateLabel,
        weekday,
      });
    }

    if (items.length) groups.push({ dateLabel, weekday, items });
  }

  return groups.flatMap((g) => g.items.map((item) => ({ ...item, dateLabel: g.dateLabel, weekday: g.weekday })));
}

main().catch((err) => {
  console.error("[aihot fetch]", err.message || err);
  process.exit(1);
});
