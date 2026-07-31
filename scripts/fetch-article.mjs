/**
 * 从官网文章 URL 抓取正文（RSS 摘要往往不完整）
 */
import { decodeEntities, stripHtml } from "./text-utils.mjs";

const ARTICLE_SELECTORS = [
  "article",
  '[role="main"]',
  "main",
  ".post-content",
  ".article-content",
  ".blog-post-content",
  ".entry-content",
  ".markdown-body",
  ".prose",
  "#content",
];

function detectLang(text = "") {
  const sample = text.slice(0, 2000);
  const cjk = (sample.match(/[\u4e00-\u9fff]/g) || []).length;
  const latin = (sample.match(/[a-zA-Z]/g) || []).length;
  if (cjk > latin * 0.3) return "zh";
  if (latin > 20) return "en";
  return "unknown";
}

function extractParagraphsFromBlock(html = "") {
  const paras = [];
  for (const m of html.matchAll(/<p[^>]*>([\s\S]*?)<\/p>/gi)) {
    const t = stripHtml(m[1]);
    if (t.length >= 40) paras.push(t);
  }
  if (paras.length >= 2) return paras;

  for (const m of html.matchAll(/<h[23][^>]*>([\s\S]*?)<\/h[23]>/gi)) {
    const t = stripHtml(m[1]);
    if (t.length >= 8) paras.push(t);
  }
  for (const m of html.matchAll(/<li[^>]*>([\s\S]*?)<\/li>/gi)) {
    const t = stripHtml(m[1]);
    if (t.length >= 30) paras.push(`· ${t}`);
  }
  return paras;
}

function pickArticleBlock(html = "") {
  let best = "";
  let bestScore = 0;

  for (const sel of ARTICLE_SELECTORS) {
    const tag = sel.match(/^([a-z0-9#.\[][^[]*)/i)?.[1]?.replace(/^\./, "") || sel;
    let pattern;
    if (sel.startsWith(".")) {
      pattern = new RegExp(`<[^>]+class=["'][^"']*${sel.slice(1)}[^"']*["'][^>]*>([\\s\\S]*?)<\\/[^>]+>`, "i");
    } else if (sel.startsWith("#")) {
      pattern = new RegExp(`<[^>]+id=["']${sel.slice(1)}["'][^>]*>([\\s\\S]*?)<\\/[^>]+>`, "i");
    } else if (sel.includes("role=")) {
      pattern = /<[^>]+role=["']main["'][^>]*>([\s\S]*?)<\/[^>]+>/i;
    } else {
      pattern = new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`, "i");
    }
    const m = html.match(pattern);
    if (!m) continue;
    const block = m[1];
    const score = (block.match(/<p/gi) || []).length;
    if (score > bestScore) {
      bestScore = score;
      best = block;
    }
  }

  if (bestScore >= 2) return best;

  const body = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i)?.[1] || html;
  return body
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/<nav[\s\S]*?<\/nav>/gi, "")
    .replace(/<footer[\s\S]*?<\/footer>/gi, "")
    .replace(/<header[\s\S]*?<\/header>/gi, "");
}

function extractTitle(html = "") {
  const og = html.match(/<meta[^>]+property=["']og:title["'][^>]+content=["']([^"']+)["']/i);
  if (og) return decodeEntities(og[1].trim());
  const h1 = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
  if (h1) return stripHtml(h1[1]);
  const title = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  return title ? stripHtml(title[1]).replace(/\s*[|\-–—].*$/, "").trim() : "";
}

export async function fetchArticle(url, { timeout = 20000 } = {}) {
  try {
    const res = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; AI-Atlas-NewsBot/1.0)",
        Accept: "text/html,application/xhtml+xml",
        "Accept-Language": "zh-CN,zh;q=0.9,en;q=0.8",
      },
      signal: AbortSignal.timeout(timeout),
      redirect: "follow",
    });
    if (!res.ok) return null;

    const html = await res.text();
    const block = pickArticleBlock(html);
    let paragraphs = extractParagraphsFromBlock(block);

    if (paragraphs.length < 2) {
      const fallback = stripHtml(block);
      if (fallback.length >= 200) {
        paragraphs = fallback
          .split(/\n{2,}|(?<=[.!?])\s+(?=[A-Z])/)
          .map((p) => p.trim())
          .filter((p) => p.length >= 60)
          .slice(0, 12);
      }
    }

    paragraphs = paragraphs.slice(0, 14);
    const text = paragraphs.join("\n\n");
    const title = extractTitle(html);
    const lang = detectLang(`${title}\n${text}`);

    if (!text || text.length < 80) return null;

    return { url, title, paragraphs, text, lang, fetchedAt: new Date().toISOString() };
  } catch {
    return null;
  }
}

export function shouldFetchArticle(feed) {
  if (!feed) return false;
  const type = feed.type || "rss";
  if (feed.fetchArticle === false) return false;
  if (feed.fetchArticle === true) return true;
  return feed.group === "company" && ["blog", "release", "news"].includes(type);
}
