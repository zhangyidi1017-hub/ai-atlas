import { readFileSync, writeFileSync } from "fs";
import { readdirSync } from "fs";

const code = readFileSync("./data.js", "utf8").replace("window.AI_DATA", "export default");
const mod = await import(`data:text/javascript,${encodeURIComponent(code)}`);
const { products } = mod.default;
const logos = new Set(readdirSync("./logos"));

async function checkUrl(url) {
  try {
    const res = await fetch(url, {
      method: "GET",
      redirect: "follow",
      signal: AbortSignal.timeout(15000),
      headers: { "User-Agent": "Mozilla/5.0 (compatible; AIAtlasValidator/1.0)" },
    });
    return { ok: res.status < 400, status: res.status, final: res.url };
  } catch (e) {
    return { ok: false, error: String(e.message || e) };
  }
}

const rows = [];
for (const p of products) {
  const logoFile = (p.logoFallback || p.logo || "").replace("./logos/", "");
  const primary = p.links?.[0];
  const urlCheck = primary ? await checkUrl(primary.url) : { ok: false, error: "no link" };
  let hostname = "";
  try {
    hostname = new URL(primary?.url || "").hostname.replace(/^www\./, "");
  } catch {}
  const genericHosts = new Set([
    "cloud.baidu.com",
    "cloud.tencent.com",
    "www.tencent.com",
    "tencent.com",
    "www.volcengine.com",
    "volcengine.com",
    "www.dingtalk.com",
    "dingtalk.com",
  ]);
  rows.push({
    id: p.id,
    logoExists: logos.has(logoFile),
    primaryUrl: primary?.url,
    urlOk: urlCheck.ok,
    urlStatus: urlCheck.status,
    urlFinal: urlCheck.final,
    urlError: urlCheck.error,
    genericLink: genericHosts.has(hostname),
  });
}

writeFileSync("./scripts/validate-report.json", JSON.stringify(rows, null, 2));
const bad = rows.filter((r) => !r.logoExists || !r.urlOk || r.genericLink);
console.log(`Checked ${rows.length} products, ${bad.length} issues`);
for (const r of bad) {
  console.log(
    `${r.id}: logo=${r.logoExists} urlOk=${r.urlOk}${r.urlError ? " err=" + r.urlError : ""} generic=${r.genericLink} ${r.primaryUrl}`
  );
}
