export function decodeEntities(text = "") {
  return text
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&#x([0-9a-f]+);/gi, (_, hex) => String.fromCharCode(parseInt(hex, 16)))
    .replace(/&#(\d+);/g, (_, num) => String.fromCharCode(Number(num)));
}

export function stripHtml(html = "") {
  return decodeEntities(
    String(html)
      .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
      .replace(/<img[^>]*>/gi, " ")
      .replace(/<br\s*\/?>/gi, " ")
      .replace(/<[^>]+>/g, " ")
      .replace(/\s+/g, " ")
      .trim()
  );
}

export function cleanFeedText(text = "") {
  const t = stripHtml(text);
  if (/^<img|referrerpolicy/i.test(text) || /githubusercontent\.com/i.test(t)) {
    return t.replace(/^.*?Battle-tested at|^.*?Language:/i, "").trim();
  }
  return t;
}

export function isMostlyChinese(text = "") {
  const cjk = (text.match(/[\u4e00-\u9fff]/g) || []).length;
  const latin = (text.match(/[a-zA-Z]/g) || []).length;
  return cjk > latin * 0.35;
}
