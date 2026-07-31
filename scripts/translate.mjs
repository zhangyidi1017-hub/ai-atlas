/**
 * 轻量翻译 — DeepSeek 优先，否则 Google Translate 免费端点（无需 API Key）
 */
const CHUNK = 3500;

async function googleTranslate(text, { from = "en", to = "zh-CN" } = {}) {
  const url =
    "https://translate.googleapis.com/translate_a/single?" +
    new URLSearchParams({
      client: "gtx",
      sl: from,
      tl: to,
      dt: "t",
      q: text.slice(0, CHUNK),
    });

  const res = await fetch(url, {
    headers: { "User-Agent": "AI-Atlas-NewsBot/1.0" },
    signal: AbortSignal.timeout(25000),
  });
  if (!res.ok) throw new Error(`Translate HTTP ${res.status}`);
  const data = await res.json();
  return (data[0] || []).map((x) => x[0]).join("");
}

export async function translateText(text, opts = {}) {
  const input = String(text || "").trim();
  if (!input) return "";
  if (opts.skipIfChinese !== false && /[\u4e00-\u9fff]/.test(input.slice(0, 200))) return input;

  if (input.length <= CHUNK) {
    return googleTranslate(input, opts);
  }

  const parts = [];
  let buf = "";
  for (const para of input.split(/\n{2,}/)) {
    if ((buf + para).length > CHUNK) {
      if (buf) parts.push(await googleTranslate(buf, opts));
      buf = para;
    } else {
      buf = buf ? `${buf}\n\n${para}` : para;
    }
    await new Promise((r) => setTimeout(r, 300));
  }
  if (buf) parts.push(await googleTranslate(buf, opts));
  return parts.join("\n\n");
}

export async function translateParagraphs(paragraphs, opts = {}) {
  const out = [];
  for (const p of paragraphs) {
    out.push(await translateText(p, opts));
    await new Promise((r) => setTimeout(r, 250));
  }
  return out;
}

export async function translateArticleBundle({ title, paragraphs, lang }) {
  if (lang === "zh") {
    return {
      title,
      paragraphs,
      oneLiner: paragraphs[0]?.slice(0, 120) || title,
      translated: false,
      method: "native",
    };
  }

  const from = lang === "unknown" ? "auto" : lang;
  const zhTitle = await translateText(title, { from });
  const zhParas = [];
  for (const p of paragraphs.slice(0, 10)) {
    zhParas.push(await translateText(p, { from }));
    await new Promise((r) => setTimeout(r, 300));
  }

  return {
    title: zhTitle || title,
    paragraphs: zhParas.filter(Boolean),
    oneLiner: (zhParas[0] || zhTitle || title).slice(0, 120),
    translated: true,
    method: "google",
  };
}
