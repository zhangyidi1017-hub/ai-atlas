(() => {
  if (!window.AI_DATA) {
    console.error("AI_DATA 未加载，请检查 data.js");
    return;
  }

  const { scenes, products, news: fallbackNews, featuredBanner = [], categoryPins = {} } = window.AI_DATA;

  let news = [...fallbackNews];
  let newsBrief = null;
  let newsWhatsChanging = null;
  let newsProductUpdates = [];

  const els = {
    views: {
      home: document.getElementById("view-home"),
      scene: document.getElementById("view-scene"),
      product: document.getElementById("view-product"),
      news: document.getElementById("view-news"),
      "news-detail": document.getElementById("view-news-detail"),
    },
    backBtn: document.getElementById("backBtn"),
    topbar: document.getElementById("topbar"),
    siteHeader: document.getElementById("siteHeader"),
    sceneSections: document.getElementById("sceneSections"),
    newsPreview: document.getElementById("newsPreview"),
    sceneIntro: document.getElementById("sceneIntro"),
    sceneFilters: document.getElementById("sceneFilters"),
    sceneProducts: document.getElementById("sceneProducts"),
    productPage: document.getElementById("productPage"),
    newsFilters: document.getElementById("newsFilters"),
    newsBrief: document.getElementById("newsDashboard"),
    newsWhatsChanging: null,
    newsProductUpdates: document.getElementById("newsProductUpdates"),
    newsList: document.getElementById("newsList"),
    newsDetail: document.getElementById("newsDetail"),
    searchInput: document.getElementById("searchInput"),
    searchPanel: document.getElementById("searchPanel"),
    searchResults: document.getElementById("searchResults"),
    feedbackBtn: document.getElementById("feedbackBtn"),
    feedbackModal: document.getElementById("feedbackModal"),
    feedbackForm: document.getElementById("feedbackForm"),
    feedbackSuccess: document.getElementById("feedbackSuccess"),
    feedbackContent: document.getElementById("feedbackContent"),
    bannerSettingsBtn: document.getElementById("bannerSettingsBtn"),
    bannerSettingsModal: document.getElementById("bannerSettingsModal"),
    bannerRegionChips: document.getElementById("bannerRegionChips"),
    bannerPickList: document.getElementById("bannerPickList"),
    bannerSelectDefault: document.getElementById("bannerSelectDefault"),
    bannerSettingsSave: document.getElementById("bannerSettingsSave"),
    heroBanner: document.getElementById("heroBanner"),
    heroBannerViewport: document.getElementById("heroBannerViewport"),
    heroStage: document.getElementById("heroStage"),
    heroSphereScene: document.getElementById("heroSphereScene"),
    heroSphereCanvas: document.getElementById("heroSphereCanvas"),
    heroSphereDrag: document.getElementById("heroSphereDrag"),
    heroSphereNodes: document.getElementById("heroSphereNodes"),
    sphereVisitHint: document.getElementById("sphereVisitHint"),
  };

  const state = {
    view: "home",
    sceneId: null,
    sceneSubFilter: "all",
    productId: null,
    newsFilter: "all",
    homeSubFilters: {},
    homeSectionPages: {},
    newsId: null,
    history: [],
    searchOpen: false,
    feedbackOpen: false,
    bannerSettingsOpen: false,
  };

  const FEEDBACK_KEY = "ai-atlas-feedback";
  const BANNER_SETTINGS_KEY = "ai-atlas-banner-settings";
  const HOME_SECTION_PAGE_SIZE = 20;

  function defaultBannerSettings() {
    return {
      selectedIds: [...featuredBanner],
      regionFilter: "all",
    };
  }

  function loadBannerSettings() {
    try {
      const raw = localStorage.getItem(BANNER_SETTINGS_KEY);
      if (!raw) return defaultBannerSettings();
      const parsed = JSON.parse(raw);
      const selectedIds = Array.isArray(parsed.selectedIds)
        ? parsed.selectedIds.filter((id) => productMap[id])
        : [...featuredBanner];
      return {
        selectedIds: selectedIds.length ? selectedIds : [...featuredBanner],
        regionFilter: ["all", "domestic", "overseas"].includes(parsed.regionFilter)
          ? parsed.regionFilter
          : "all",
      };
    } catch {
      return defaultBannerSettings();
    }
  }

  let bannerSettings = loadBannerSettings();
  let bannerSettingsDraft = null;

  const sceneMap = Object.fromEntries(scenes.map((s) => [s.id, s]));
  const productMap = Object.fromEntries(products.map((p) => [p.id, p]));
  let newsMap = Object.fromEntries(news.map((n) => [n.id, n]));

  async function loadNewsFeed() {
    try {
      const res = await fetch(`./news.json?t=${Date.now()}`);
      if (!res.ok) return;
      const data = await res.json();
      if (Array.isArray(data.items) && data.items.length) {
        news = data.items.map(normalizeNewsItem);
        newsMap = Object.fromEntries(news.map((n) => [n.id, n]));
      }
      newsBrief = data.brief || null;
      newsWhatsChanging = data.whatsChanging || null;
      newsProductUpdates = data.productUpdates || [];
    } catch {
      /* 使用 data.js 内置快讯 */
    }
  }

  function normalizeNewsItem(n) {
    if (n.summary && typeof n.summary === "object") return n;
    const summaryText = typeof n.summary === "string" ? n.summary : "";
    return {
      ...n,
      oneLiner: n.oneLiner || summaryText,
      summary: {
        oneSentence: summaryText,
        bullets: n.highlights || [],
        audience: "",
        readMinutes: 3,
        keywords: [],
      },
      insight: n.insight || { mainInsight: "" },
      learning: n.learning || {},
      tags: n.tags || [],
      importance: n.importance || { stars: 3, reason: "", readMinutes: 3 },
    };
  }

  function newsOneLiner(n) {
    return n.oneLiner || n.summary?.oneSentence || (typeof n.summary === "string" ? n.summary : "");
  }

  function newsTagHtml(n) {
    return (n.tags || [])
      .map((t) => `<span class="tag tag-static">${t}</span>`)
      .join("");
  }

  function newsSourceMeta(n) {
    return n.source || null;
  }

  function newsDetailMeta(n) {
    const parts = [n.date];
    const src = newsSourceMeta(n);
    if (src?.name) parts.push(src.name);
    return parts.filter(Boolean).join(" · ");
  }

  function newsDetailNotes(n) {
    const insight = n.insight || {};
    const learning = n.learning || {};
    const points = [
      learning.whyImportant,
      insight.mainInsight,
      learning.productDesign,
      learning.relevance,
    ].filter(Boolean);
    const actions = (learning.actionItems || []).filter(Boolean);
    if (!points.length && !actions.length) return "";

    return `
      <div class="block reveal news-detail-notes">
        <h2>学习笔记</h2>
        ${points.length ? `<ul class="news-detail-points">${points.map((p) => `<li>${escapeHtml(p)}</li>`).join("")}</ul>` : ""}
        ${
          actions.length
            ? `<div class="news-detail-actions">${actions
                .map((a) => {
                  const href = /^https?:\/\//i.test(a) ? a : null;
                  return href
                    ? `<a href="${href}" target="_blank" rel="noopener noreferrer">${escapeHtml(a)}</a>`
                    : `<span>${escapeHtml(a)}</span>`;
                })
                .join("")}</div>`
            : ""
        }
      </div>`;
  }

  function newsSourceLabel(n) {
    const s = newsSourceMeta(n);
    if (!s) return "";
    const typeLabel =
      s.type === "x" ? "X" : s.type === "release" ? "Release Notes" : s.type === "blog" ? "官网" : "来源";
    return `${typeLabel} · ${s.author || s.name || "海外"}`;
  }

  function escapeHtml(text = "") {
    return String(text)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function newsSourceLink(n) {
    const s = newsSourceMeta(n);
    return s?.url || s?.home || "";
  }

  function newsSourceHtml(n, compact = false) {
    const s = newsSourceMeta(n);
    if (!s) return "";
    const label = newsSourceLabel(n);
    const href = newsSourceLink(n);
    if (!href) return `<span class="news-source ${compact ? "compact" : ""}">${label}</span>`;
    return `<a class="news-source ${compact ? "compact" : ""}" href="${href}" target="_blank" rel="noopener noreferrer">${label} ↗</a>`;
  }

  function topScenes() {
    return scenes.filter((s) => !s.parent);
  }

  function childScenes(parentId) {
    return scenes.filter((s) => s.parent === parentId);
  }

  function descendantIds(rootId) {
    const ids = [rootId];
    childScenes(rootId).forEach((c) => ids.push(...descendantIds(c.id)));
    return ids;
  }

  function sortProductsList(list, pinKey) {
    const pins = pinKey ? categoryPins[pinKey] || [] : [];
    const featured = new Set(featuredBanner);
    const pinRank = (id) => {
      const i = pins.indexOf(id);
      return i === -1 ? pins.length + 1 : i;
    };
    return [...list].sort((a, b) => {
      if (pins.length) {
        const dr = pinRank(a.id) - pinRank(b.id);
        if (dr !== 0) return dr;
      }
      return (featured.has(a.id) ? 0 : 1) - (featured.has(b.id) ? 0 : 1);
    });
  }

  function productsInCategory(catId) {
    const ids = descendantIds(catId);
    return products.filter((p) => (p.categories || []).some((c) => ids.includes(c)));
  }

  function regionBadge(p) {
    if (!p.region) return "";
    return `<span class="badge mix">${p.region}</span>`;
  }

  function categoryTags(categoryIds, clickable = true) {
    return (categoryIds || [])
      .map((id) => {
        const s = sceneMap[id];
        if (!s) return "";
        if (!clickable) return `<span class="tag">${s.name}</span>`;
        return `<button class="tag" type="button" data-open-scene="${id}">${s.name}</button>`;
      })
      .join("");
  }

  function primaryLink(p) {
    return (p.links && p.links[0]) || null;
  }

  function productAppUri(p) {
    return p?.appUri || "";
  }

  function openProductTarget(p) {
    if (!p) return;
    const appUri = productAppUri(p);
    const webUrl = primaryLink(p)?.url;
    if (!appUri) {
      if (webUrl) window.open(webUrl, "_blank", "noopener,noreferrer");
      return;
    }
    if (!webUrl) {
      window.location.href = appUri;
      return;
    }

    let launched = false;
    const markLaunched = () => {
      launched = true;
    };
    window.addEventListener("blur", markLaunched, { once: true });
    document.addEventListener(
      "visibilitychange",
      () => {
        if (document.hidden) markLaunched();
      },
      { once: true }
    );

    const iframe = document.createElement("iframe");
    iframe.style.display = "none";
    iframe.setAttribute("aria-hidden", "true");
    iframe.src = appUri;
    document.body.appendChild(iframe);

    window.setTimeout(() => {
      iframe.remove();
      if (!launched) {
        window.open(webUrl, "_blank", "noopener,noreferrer");
      }
    }, 1600);
  }

  function openExternalLabel(p) {
    return productAppUri(p) ? "打开应用" : "打开官网";
  }

  function hostOf(url) {
    try {
      return new URL(url).host.replace(/^www\./, "");
    } catch {
      return url;
    }
  }

  function pricingBadge(p) {
    const cls = p.pricing === "free" ? "free" : p.pricing === "paid" ? "paid" : "mix";
    return `<span class="badge ${cls}">${p.pricingLabel}</span>`;
  }

  function sceneIconHtml(s) {
    if (!s?.icon) return "";
    return `<span class="scene-module-ico" aria-hidden="true">${s.icon}</span>`;
  }

  function sceneModuleHead(s, i) {
    const count = productsInCategory(s.id).length;
    const num = String(i + 1).padStart(2, "0");
    return `
      <header class="scene-module-head">
        <button class="scene-module-hit" type="button" data-scroll="#scene-products-${s.id}">
          <span class="scene-module-index">${num}</span>
          ${sceneIconHtml(s)}
          <div class="scene-module-copy">
            <h3>${s.name}</h3>
            <p>${s.blurb}</p>
          </div>
        </button>
        <button class="scene-module-count" type="button" data-open-category="${s.id}" aria-label="查看 ${s.name} 全部 ${count} 款产品">
          ${count} products
        </button>
      </header>`;
  }

  function sectionSubFilter(parentId) {
    return state.homeSubFilters[parentId] || "all";
  }

  function sectionProducts(parentId) {
    const children = childScenes(parentId);
    const sub = sectionSubFilter(parentId);
    let list;
    if (children.length && sub !== "all") {
      list = products.filter((p) => (p.categories || []).includes(sub));
    } else {
      list = productsInCategory(parentId);
    }
    return sortProductsList(list, parentId === "agent" ? "agent" : null);
  }

  function homeSectionPage(sceneId) {
    return Math.max(1, Number(state.homeSectionPages[sceneId]) || 1);
  }

  function paginateSectionProducts(list, sceneId) {
    const total = list.length;
    const totalPages = Math.max(1, Math.ceil(total / HOME_SECTION_PAGE_SIZE));
    const page = Math.min(homeSectionPage(sceneId), totalPages);
    if (page !== homeSectionPage(sceneId)) {
      state.homeSectionPages[sceneId] = page;
    }
    const start = (page - 1) * HOME_SECTION_PAGE_SIZE;
    return {
      items: list.slice(start, start + HOME_SECTION_PAGE_SIZE),
      page,
      totalPages,
      total,
    };
  }

  function sceneSectionPagerHtml(sceneId, page, totalPages, total) {
    if (totalPages <= 1) return "";
    return `
      <nav class="scene-section-pager" aria-label="${sceneMap[sceneId]?.name || "分类"}产品分页">
        <span class="scene-pager-meta">${page} / ${totalPages}</span>
        <div class="scene-pager-nav">
          <button
            type="button"
            class="scene-pager-btn"
            data-home-section-page="${sceneId}"
            data-page="${page - 1}"
            aria-label="上一页"
            ${page <= 1 ? "disabled" : ""}
          >←</button>
          <button
            type="button"
            class="scene-pager-btn"
            data-home-section-page="${sceneId}"
            data-page="${page + 1}"
            aria-label="下一页"
            ${page >= totalPages ? "disabled" : ""}
          >→</button>
        </div>
      </nav>`;
  }

  function sceneSectionFiltersHtml(parentId) {
    const children = childScenes(parentId);
    if (!children.length) return "";

    const sub = sectionSubFilter(parentId);
    const chips = [{ id: "all", name: "全部" }, ...children.map((c) => ({ id: c.id, name: c.name }))];
    return `<div class="filter-chips scene-sub-filters">${chips
      .map(
        (f) =>
          `<button class="chip ${sub === f.id ? "active" : ""}" type="button" data-home-sub-filter="${f.id}" data-scene-parent="${parentId}">${f.name}</button>`
      )
      .join("")}</div>`;
  }

  function sceneSectionHtml(s, i) {
    const list = sectionProducts(s.id);
    const { items, page, totalPages, total } = paginateSectionProducts(list, s.id);
    return `
      <section class="scene-section scene-section--${s.id} reveal" data-scene-section="${s.id}" id="scene-section-${s.id}">
        <div class="scene-section-layout">
          <aside class="scene-section-side">
            ${sceneModuleHead(s, i)}
          </aside>
          <div class="scene-section-main">
            ${sceneSectionFiltersHtml(s.id)}
            <div class="scene-section-products" id="scene-products-${s.id}">
              ${
                items.map((p) => productCard(p)).join("") ||
                `<div class="empty reveal">该分类暂无产品</div>`
              }
            </div>
            ${sceneSectionPagerHtml(s.id, page, totalPages, total)}
          </div>
        </div>
      </section>`;
  }

  function renderHomeMap() {
    els.sceneSections.innerHTML = topScenes().map((s, i) => sceneSectionHtml(s, i)).join("");
  }

  function productLogo(p, sizeClass = "") {
    const src = p.logo || p.logoFallback || "";
    const fallback = p.logoFallback || "";
    const letter = (p.name || "?").slice(0, 1);
    if (!src) {
      return `<span class="product-logo ${sizeClass} product-logo-fallback" aria-hidden="true">${letter}</span>`;
    }
    return `
      <img
        class="product-logo ${sizeClass}"
        src="${src}"
        alt="${p.name}"
        loading="lazy"
        decoding="async"
        data-fallback="${fallback}"
        data-letter="${letter}"
        onerror="window.__logoFallback && window.__logoFallback(this)"
      />
    `;
  }

  window.__logoFallback = (img) => {
    const next = img.dataset.fallback;
    if (next && img.src.indexOf(next) === -1 && !img.dataset.triedFallback) {
      img.dataset.triedFallback = "1";
      img.src = next;
      return;
    }
    const span = document.createElement("span");
    span.className = img.className + " product-logo-fallback";
    span.setAttribute("aria-hidden", "true");
    span.textContent = img.dataset.letter || "?";
    img.replaceWith(span);
  };

  function linksBlock(p) {
    const links = p.links || [];
    if (!links.length) return "<p>暂无链接</p>";
    return `
      <div class="link-list">
        ${links
          .map(
            (l, i) => `
          <a class="ext-link" href="${l.url}" rel="noopener noreferrer" ${
              i === 0 && productAppUri(p) ? `data-open-external="${p.id}"` : ""
            }>
            <span class="ext-link-label">${i === 0 && productAppUri(p) ? "打开应用" : l.label}</span>
            <span class="ext-link-host">${hostOf(l.url)} ↗</span>
          </a>`
          )
          .join("")}
      </div>
    `;
  }

  function previewUrl(p) {
    if (p.preview) return p.preview;
    const link = primaryLink(p);
    if (!link) return "";
    // WordPress mShots：自动抓取官网首页截图
    return `https://s0.wp.com/mshots/v1/${encodeURIComponent(link.url)}?w=960`;
  }

  function productPreview(p) {
    const src = previewUrl(p);
    const letter = (p.name || "?").slice(0, 1);
    if (!src) {
      return `<div class="mob-shot mob-shot-empty">${letter}</div>`;
    }
    return `
      <img
        class="mob-shot"
        src="${src}"
        alt="${p.name} 首页"
        loading="lazy"
        decoding="async"
        data-letter="${letter}"
        onerror="window.__shotFallback && window.__shotFallback(this)"
      />
    `;
  }

  window.__shotFallback = (img) => {
    const div = document.createElement("div");
    div.className = "mob-shot mob-shot-empty";
    div.textContent = img.dataset.letter || "?";
    img.replaceWith(div);
  };

  function productTagLine(p) {
    const tags = [];
    (p.categories || []).forEach((id) => {
      const s = sceneMap[id];
      if (s) tags.push(s.name);
    });
    if (p.region) tags.push(p.region);
    return tags.join(" • ");
  }

  function productCard(p) {
    return `
      <article class="mob-card reveal">
        <button class="mob-card-shot" type="button" data-open-product="${p.id}" aria-label="查看 ${p.name} 介绍">
          ${productPreview(p)}
        </button>
        <button class="mob-card-foot" type="button" data-open-external="${p.id}" aria-label="打开 ${p.name} 官网">
          <p class="mob-card-tags">${productTagLine(p)}</p>
          <h3 class="mob-card-title"><span class="mob-card-arrow" aria-hidden="true">→</span><span class="mob-card-name">${p.name}</span></h3>
        </button>
      </article>
    `;
  }

  function newsStripItem(n) {
    return `
      <button class="news-strip-item" type="button" data-open-news="${n.id}">
        <span class="news-strip-title">${n.title}</span>
        ${newsSourceMeta(n) ? `<span class="news-strip-source">${newsSourceLabel(n)}</span>` : ""}
        <span class="news-strip-date">${n.date}</span>
        <span class="news-strip-arrow" aria-hidden="true">→</span>
      </button>
    `;
  }

  function newsCard(n, compact = false) {
    return `
      <button class="news-item reveal ${compact ? "compact" : ""}" type="button" data-open-news="${n.id}">
        <div class="row-top">
          <div class="news-card-meta">
            ${newsSourceMeta(n) ? `<div class="news-card-source">${newsSourceHtml(n, true)}</div>` : ""}
          </div>
          <h3>${n.title}</h3>
        </div>
        <p class="summary">${newsOneLiner(n)}</p>
        ${(n.tags || []).length ? `<div class="tags news-tags">${newsTagHtml(n)}</div>` : `<div class="tags">${categoryTags(n.categoryIds, false)}</div>`}
        <div class="news-item-foot">
          <p class="time">${n.date}</p>
          <span class="news-read-more">阅读 →</span>
        </div>
      </button>
    `;
  }

  function newsDashboardRow(n, compact = false) {
    if (!n) return "";
    return `
      <button class="news-dash-row${compact ? " compact" : ""}" type="button" data-open-news="${n.id}">
        <span class="news-dash-row-body">
          <span class="news-dash-row-title">${n.title}</span>
          ${compact ? "" : `<span class="news-dash-row-sub">${newsOneLiner(n)}</span>`}
        </span>
        <span class="news-dash-row-meta">${n.date || ""}</span>
      </button>`;
  }

  function briefSectionStats(b, sectionDefs) {
    return sectionDefs.map(({ key, fallback, icon }) => {
      const ids = b.sections?.[key] || [];
      const label = b.sectionLabels?.[key] || fallback;
      const items = ids.map((id) => newsMap[id]).filter(Boolean);
      const top = items[0];
      return {
        key,
        label,
        icon: icon || label.split(" ")[0],
        shortLabel: label.replace(/^[^\s]+\s/, ""),
        count: ids.length,
        topTitle: top?.title || "",
        topId: top?.id || ids[0] || "",
      };
    });
  }

  function renderBriefSummaryChart(b, sectionDefs, wc) {
    const stats = briefSectionStats(b, sectionDefs);
    const maxCount = Math.max(1, ...stats.map((s) => s.count));
    const activeSections = stats.filter((s) => s.count > 0);
    const topCount = (b.topUpdates || []).length;

    const pipelineHtml = `
      <div class="brief-chart-pipeline" aria-hidden="true">
        <span class="brief-chart-node brief-chart-node--source">Source Agent</span>
        <span class="brief-chart-arrow">→</span>
        <span class="brief-chart-node brief-chart-node--tag">Tag Agent</span>
        <span class="brief-chart-arrow">→</span>
        <span class="brief-chart-node brief-chart-node--brief">AI Brief</span>
        <span class="brief-chart-arrow">→</span>
        <span class="brief-chart-node brief-chart-node--dash">Dashboard</span>
      </div>`;

    const structureHtml = `
      <div class="brief-chart-structure">
        <div class="brief-chart-hub">
          <div class="brief-chart-hub-label">Today's Brief</div>
          <div class="brief-chart-hub-stats">
            <span class="brief-stat"><strong>${b.todayCount ?? "—"}</strong><em>今日</em></span>
            <span class="brief-stat"><strong>${b.totalCount ?? news.length}</strong><em>档案</em></span>
            <span class="brief-stat"><strong>${topCount}</strong><em>必读</em></span>
            <span class="brief-stat"><strong>${activeSections.length}</strong><em>栏目</em></span>
          </div>
        </div>
        <div class="brief-chart-branches" aria-label="Brief 栏目分布">
          ${stats
            .map((s) => {
              const pct = Math.round((s.count / maxCount) * 100);
              const inactive = s.count === 0;
              return `
                <button
                  class="brief-chart-branch${inactive ? " is-empty" : ""}"
                  type="button"
                  data-brief-section="${s.key}"
                  ${inactive ? "disabled" : ""}
                  aria-label="${s.label} ${s.count} 条"
                >
                  <div class="brief-chart-branch-head">
                    <span class="brief-chart-branch-icon">${s.icon}</span>
                    <span class="brief-chart-branch-name">${s.shortLabel}</span>
                    <span class="brief-chart-branch-count">${s.count}</span>
                  </div>
                  <div class="brief-chart-bar-track" aria-hidden="true">
                    <div class="brief-chart-bar-fill" style="width:${inactive ? 0 : Math.max(pct, s.count ? 12 : 0)}%"></div>
                  </div>
                  ${s.topTitle ? `<p class="brief-chart-branch-top">${s.topTitle}</p>` : `<p class="brief-chart-branch-top muted">暂无信号</p>`}
                </button>`;
            })
            .join("")}
        </div>
      </div>`;

    const trendTags = wc?.risingTags || [];
    const trendHtml =
      wc?.summary || trendTags.length
        ? `
        <div class="brief-chart-trends">
          <div class="brief-chart-trends-head">
            <span>What's Changing · ${wc?.periodDays || 30} 天</span>
          </div>
          ${wc?.summary ? `<p class="brief-chart-trends-summary">${wc.summary}</p>` : ""}
          ${
            trendTags.length
              ? `<div class="brief-chart-trend-tags">${trendTags.map((t) => `<span class="tag tag-static">✓ ${t}</span>`).join("")}</div>`
              : ""
          }
        </div>`
        : "";

    return `
      <div class="brief-summary-chart reveal">
        <div class="brief-summary-chart-head">
          <div>
            <div class="section-label">Brief Overview</div>
            <h3 class="brief-summary-chart-title">今日快讯总览</h3>
          </div>
          <span class="news-brief-meta">${b.date || ""} · ${b.headline || ""}</span>
        </div>
        ${pipelineHtml}
        ${structureHtml}
        ${trendHtml}
      </div>`;
  }

  function renderNewsDashboard() {
    if (!els.newsBrief) return;
    const b = newsBrief;
    if (!b) {
      els.newsBrief.innerHTML = "";
      return;
    }

    const sectionDefs = [
      { key: "topUpdates", fallback: "🔥 Top Updates", icon: "🔥" },
      { key: "newReleases", fallback: "🟢 New Releases", icon: "🟢" },
      { key: "insights", fallback: "🧠 AI Insights", icon: "🧠" },
      { key: "emergingTrends", fallback: "📈 Emerging Trends", icon: "📈" },
      { key: "newApis", fallback: "🏷 New APIs", icon: "🏷" },
      { key: "githubTrending", fallback: "🚀 Github Trending", icon: "🚀" },
      { key: "productHunt", fallback: "💼 Product Hunt", icon: "💼" },
      { key: "xDiscussions", fallback: "💬 X Discussions", icon: "💬" },
    ];

    const sectionsHtml = sectionDefs
      .map(({ key, fallback }) => {
        const ids = b.sections?.[key] || [];
        if (!ids.length) return "";
        const label = b.sectionLabels?.[key] || fallback;
        const rows = ids
          .map((id) => newsMap[id])
          .filter(Boolean)
          .slice(0, 5)
          .map((n) => newsDashboardRow(n, true))
          .join("");
        if (!rows) return "";
        return `
          <div class="news-dash-section" id="brief-section-${key}">
            <h3 class="news-dash-section-title">${label} <span class="news-dash-section-count">${ids.length}</span></h3>
            <div class="news-dash-section-list">${rows}</div>
          </div>`;
      })
      .filter(Boolean)
      .join("");

    const topRows = (b.topUpdates || [])
      .map((u) => {
        return `
          <button class="news-brief-row" type="button" data-open-news="${u.id}">
            <span class="news-brief-row-title">${u.title}</span>
          </button>`;
      })
      .join("");

    const wc = newsWhatsChanging;
    const wcHtml =
      wc?.summary || (wc?.trends || []).length
        ? `
      <section class="news-whats-changing reveal">
        <h2>What's Changing · 近 ${wc.periodDays || 30} 天</h2>
        ${wc.summary ? `<p class="news-wc-summary">${wc.summary}</p>` : ""}
        ${
          (wc.risingTags || []).length
            ? `<div class="news-wc-rising">${wc.risingTags.map((t) => `<span class="tag tag-static">✓ ${t}</span>`).join("")}</div>`
            : ""
        }
        ${
          (wc.trends || []).length
            ? `<ul class="news-wc-trends">${wc.trends
                .map(
                  (t) =>
                    `<li><strong>${t.name}</strong>${t.signal ? ` — ${t.signal}` : ""}${
                      t.examples?.length ? `<span class="news-wc-examples">${t.examples.slice(0, 2).join(" · ")}</span>` : ""
                    }</li>`
                )
                .join("")}</ul>`
            : ""
        }
      </section>`
        : "";

    els.newsBrief.innerHTML = `
      <section class="news-dashboard reveal">
        ${renderBriefSummaryChart(b, sectionDefs, wc)}
        <div class="news-brief-head">
          <h2>Today's Brief</h2>
          <span class="news-brief-meta">${b.date || ""} · 今日 ${b.todayCount ?? "—"} 条 · 档案 ${b.totalCount ?? news.length} 条</span>
        </div>
        ${topRows ? `<div class="news-brief-list">${topRows}</div>` : ""}
        ${sectionsHtml ? `<div class="news-dash-grid">${sectionsHtml}</div>` : ""}
        ${wcHtml}
      </section>`;
  }

  function renderProductUpdates() {
    if (!els.newsProductUpdates) return;
    const list = newsProductUpdates || [];
    if (!list.length) {
      els.newsProductUpdates.innerHTML = "";
      return;
    }

    els.newsProductUpdates.innerHTML = `
      <section class="news-product-updates reveal">
        <div class="news-product-updates-head">
          <h2>产品更新 Dashboard</h2>
          <span class="news-brief-meta">${list.length} 条近期 Release / 产品动态</span>
        </div>
        <div class="news-product-grid">
          ${list
            .map((u) => {
              const products = (u.productIds || [])
                .map((id) => productMap[id]?.name)
                .filter(Boolean)
                .join(" · ");
              return `
            <button class="news-product-card" type="button" data-open-news="${u.id}">
              <div class="news-product-card-top">
                <span class="news-product-card-date">${u.date || ""}</span>
              </div>
              <h3>${u.title}</h3>
              <p>${u.oneLiner || ""}</p>
              <div class="news-product-card-foot">
                ${products ? `<span class="news-product-card-prod">${products}</span>` : ""}
                ${u.source ? `<span class="news-product-card-src">${u.source}</span>` : ""}
              </div>
            </button>`;
            })
            .join("")}
        </div>
      </section>`;
  }

  function renderNewsBrief() {
    renderNewsDashboard();
  }

  function renderWhatsChanging() {
    /* merged into renderNewsDashboard */
  }

  function renderNewsDetail(newsId) {
    const n = newsMap[newsId];
    if (!n) return;
    const relatedProducts = (n.productIds || []).map((id) => productMap[id]).filter(Boolean);
    const paragraphs = (n.content || [])
      .map((p) => `<p>${escapeHtml(p)}</p>`)
      .join("");
    const bullets = (n.summary?.bullets || n.highlights || []).filter(Boolean);
    const sourceUrl = n.source?.url || n.source?.home || "";
    const lead = newsOneLiner(n);

    els.newsDetail.innerHTML = `
      <header class="news-detail-head reveal">
        <p class="news-detail-meta">
          ${escapeHtml(newsDetailMeta(n))}
          ${
            sourceUrl
              ? ` · <a href="${sourceUrl}" target="_blank" rel="noopener noreferrer">阅读原文</a>`
              : ""
          }
        </p>
        <h1>${escapeHtml(n.title)}</h1>
        ${lead && lead !== n.title ? `<p class="news-detail-lead">${escapeHtml(lead)}</p>` : ""}
        ${(n.tags || []).length || (n.categoryIds || []).length ? `<div class="tags">${(n.tags || []).length ? newsTagHtml(n) : ""}${categoryTags(n.categoryIds, true)}</div>` : ""}
      </header>

      <div class="block reveal news-detail-main">
        <div class="news-detail-body">${paragraphs || `<p>${escapeHtml(lead || n.title)}</p>`}</div>
        ${
          bullets.length
            ? `<ul class="news-detail-bullets">${bullets.map((h) => `<li>${escapeHtml(h)}</li>`).join("")}</ul>`
            : ""
        }
      </div>

      ${newsDetailNotes(n)}

      ${
        relatedProducts.length
          ? `<div class="block reveal">
              <h2>相关产品</h2>
              <div class="alt-list">
                ${relatedProducts
                  .map(
                    (p) =>
                      `<button class="alt-btn" type="button" data-open-product="${p.id}">
                        ${productLogo(p, "product-logo-sm")}
                        <span>${p.name}</span>
                      </button>`
                  )
                  .join("")}
              </div>
            </div>`
          : ""
      }
    `;
    bindReveal();
  }

  function openNews(id) {
    clearSearch();
    state.newsId = id;
    showView("news-detail");
  }

  function matchesBannerRegion(p) {
    const region = p.region || "";
    if (bannerSettings.regionFilter === "domestic") return region.includes("国内");
    if (bannerSettings.regionFilter === "overseas") return region.includes("海外");
    return true;
  }

  function bannerProducts() {
    return bannerSettings.selectedIds
      .map((id) => productMap[id])
      .filter(Boolean)
      .filter(matchesBannerRegion);
  }

  function primaryTopCategoryId(p) {
    const topIds = topScenes().map((s) => s.id);
    return (p.categories || []).find((id) => topIds.includes(id)) || (p.categories || [])[0] || "other";
  }

  function renderBannerPickList(draft) {
    if (!els.bannerPickList) return;
    const selected = new Set(draft.selectedIds);
    const grouped = new Map();
    products.forEach((p) => {
      const key = primaryTopCategoryId(p);
      if (!grouped.has(key)) grouped.set(key, []);
      grouped.get(key).push(p);
    });

    const order = [...topScenes().map((s) => s.id), "other"];
    els.bannerPickList.innerHTML = order
      .filter((id) => grouped.has(id))
      .map((id) => {
        const title = sceneMap[id]?.name || "其他";
        const items = grouped
          .get(id)
          .slice()
          .sort((a, b) => a.name.localeCompare(b.name, "zh-CN"))
          .map((p) => {
            const checked = selected.has(p.id);
            return `
              <label class="banner-pick-item ${checked ? "is-checked" : ""}">
                <input type="checkbox" name="banner-pick" value="${p.id}" ${checked ? "checked" : ""} />
                ${productLogo(p, "product-logo-sm")}
                <span class="banner-pick-name">${p.name}</span>
                ${p.region ? `<span class="badge mix">${p.region}</span>` : ""}
              </label>
            `;
          })
          .join("");
        return `
          <div class="banner-pick-group">
            <p class="banner-pick-group-title">${title}</p>
            ${items}
          </div>
        `;
      })
      .join("");

    els.bannerPickList.querySelectorAll(".banner-pick-item input").forEach((input) => {
      input.addEventListener("change", () => {
        input.closest(".banner-pick-item")?.classList.toggle("is-checked", input.checked);
      });
    });
  }

  function syncBannerRegionChips(regionFilter) {
    if (!els.bannerRegionChips) return;
    els.bannerRegionChips.querySelectorAll("[data-banner-region]").forEach((chip) => {
      chip.classList.toggle("active", chip.dataset.bannerRegion === regionFilter);
    });
  }

  function openBannerSettings() {
    bannerSettingsDraft = {
      selectedIds: [...bannerSettings.selectedIds],
      regionFilter: bannerSettings.regionFilter,
    };
    syncBannerRegionChips(bannerSettingsDraft.regionFilter);
    renderBannerPickList(bannerSettingsDraft);
    els.bannerSettingsModal.hidden = false;
    state.bannerSettingsOpen = true;
    document.body.classList.add("banner-settings-open");
    els.bannerSettingsBtn?.focus();
  }

  function closeBannerSettings() {
    els.bannerSettingsModal.hidden = true;
    state.bannerSettingsOpen = false;
    bannerSettingsDraft = null;
    document.body.classList.remove("banner-settings-open");
    els.bannerSettingsBtn?.focus();
  }

  function saveBannerSettings() {
    if (!bannerSettingsDraft) return;
    const picked = [...els.bannerPickList.querySelectorAll('input[name="banner-pick"]:checked')].map(
      (input) => input.value
    );
    bannerSettingsDraft.selectedIds = picked.length ? picked : [...featuredBanner];
    bannerSettings = {
      selectedIds: [...bannerSettingsDraft.selectedIds],
      regionFilter: bannerSettingsDraft.regionFilter,
    };
    localStorage.setItem(BANNER_SETTINGS_KEY, JSON.stringify(bannerSettings));
    renderSphere();
    renderBanner();
    closeBannerSettings();
  }

  function bannerSlot(p) {
    const link = primaryLink(p);
    const inner = `
      <div class="banner-shot">${productPreview(p)}</div>
      <div class="banner-cap">
        <span class="banner-name">${p.name}</span>
        <span class="banner-go" aria-hidden="true">↗</span>
      </div>
    `;
    if (link) {
      return `
        <a class="banner-slot" href="${link.url}" data-open-external="${p.id}" rel="noopener noreferrer" aria-label="打开 ${p.name}">
          ${inner}
        </a>
      `;
    }
    return `
      <button class="banner-slot" type="button" data-open-product="${p.id}" aria-label="查看 ${p.name}">
        ${inner}
      </button>
    `;
  }

  function renderBanner() {
    const list = bannerProducts();
    if (!els.heroBanner) return;
    if (!list.length) {
      els.heroBanner.innerHTML = "";
      return;
    }
    const loop = [...list, ...list];
    els.heroBanner.innerHTML = loop.map((p) => bannerSlot(p)).join("");
  }

  const SPHERE_PHI = (1 + Math.sqrt(5)) / 2;
  const SPHERE_ICO_VERTS = [
    [-1, SPHERE_PHI, 0],
    [1, SPHERE_PHI, 0],
    [-1, -SPHERE_PHI, 0],
    [1, -SPHERE_PHI, 0],
    [0, -1, SPHERE_PHI],
    [0, 1, SPHERE_PHI],
    [0, -1, -SPHERE_PHI],
    [0, 1, -SPHERE_PHI],
    [SPHERE_PHI, 0, -1],
    [SPHERE_PHI, 0, 1],
    [-SPHERE_PHI, 0, -1],
    [-SPHERE_PHI, 0, 1],
  ].map((v) => {
    const len = Math.hypot(v[0], v[1], v[2]);
    return [v[0] / len, v[1] / len, v[2] / len];
  });
  const SPHERE_ICO_FACES = [
    [0, 11, 5],
    [0, 5, 1],
    [0, 1, 7],
    [0, 7, 10],
    [0, 10, 11],
    [1, 5, 9],
    [5, 11, 4],
    [11, 10, 2],
    [10, 7, 6],
    [7, 1, 8],
    [3, 9, 4],
    [3, 4, 2],
    [3, 2, 6],
    [3, 6, 8],
    [3, 8, 9],
    [4, 9, 5],
    [2, 4, 11],
    [6, 2, 10],
    [8, 6, 7],
    [9, 8, 1],
  ];

  function normalizeVec3(v) {
    const len = Math.hypot(v[0], v[1], v[2]) || 1;
    return [v[0] / len, v[1] / len, v[2] / len];
  }

  function subdivideGeodesic(vertices, faces, levels) {
    const cache = new Map();
    const verts = vertices.map((v) => [...v]);
    let currentFaces = faces.map((f) => [...f]);

    const midIndex = (a, b) => {
      const key = a < b ? `${a}_${b}` : `${b}_${a}`;
      if (cache.has(key)) return cache.get(key);
      const mid = normalizeVec3([
        verts[a][0] + verts[b][0],
        verts[a][1] + verts[b][1],
        verts[a][2] + verts[b][2],
      ]);
      const idx = verts.length;
      verts.push(mid);
      cache.set(key, idx);
      return idx;
    };

    for (let level = 0; level < levels; level += 1) {
      const nextFaces = [];
      currentFaces.forEach(([a, b, c]) => {
        const ab = midIndex(a, b);
        const bc = midIndex(b, c);
        const ca = midIndex(c, a);
        nextFaces.push([a, ab, ca], [b, bc, ab], [c, ca, bc], [ab, bc, ca]);
      });
      currentFaces = nextFaces;
    }

    return { vertices: verts, faces: currentFaces };
  }

  function buildGeodesicEdges(faces) {
    const seen = new Set();
    const edges = [];
    faces.forEach(([a, b, c]) => {
      [[a, b], [b, c], [c, a]].forEach(([i, j]) => {
        const key = i < j ? `${i}-${j}` : `${j}-${i}`;
        if (seen.has(key)) return;
        seen.add(key);
        edges.push([i, j]);
      });
    });
    return edges;
  }

  let geodesicCache = null;
  function getGeodesicData() {
    if (!geodesicCache) {
      const { vertices, faces } = subdivideGeodesic(SPHERE_ICO_VERTS, SPHERE_ICO_FACES, 2);
      geodesicCache = { vertices, edges: buildGeodesicEdges(faces) };
    }
    return geodesicCache;
  }

  function pickProductVertexIndices(vertexCount, productCount) {
    const indices = [];
    const step = Math.max(1, Math.floor(vertexCount / productCount));
    for (let i = 0; i < vertexCount && indices.length < productCount; i += step) {
      indices.push(i);
    }
    for (let i = 0; indices.length < productCount && i < vertexCount; i += 1) {
      if (!indices.includes(i)) indices.push(i);
    }
    return indices;
  }

  function rotateVec3(x, y, z, rotX, rotY) {
    const rx = (rotX * Math.PI) / 180;
    const ry = (rotY * Math.PI) / 180;
    const x1 = x * Math.cos(ry) + z * Math.sin(ry);
    const z1 = -x * Math.sin(ry) + z * Math.cos(ry);
    const y2 = y * Math.cos(rx) - z1 * Math.sin(rx);
    const z2 = y * Math.sin(rx) + z1 * Math.cos(rx);
    return [x1, y2, z2];
  }

  function projectVec3(x, y, z, cx, cy, radius) {
    const depth = 2.8 + z;
    const scale = 2.8 / depth;
    return {
      x: cx + x * radius * scale,
      y: cy + y * radius * scale,
      z,
      scale,
    };
  }

  function lerpChannel(a, b, t) {
    return Math.round(a + (b - a) * t);
  }

  function sphereGradientColor(x, y, z, rotX, rotY, alpha = 1) {
    const [rx, ry] = rotateVec3(x, y, z, rotX, rotY);
    const t = Math.max(0, Math.min(1, (-rx * 0.62 - ry * 0.62 + 1) / 2));
    const r = lerpChannel(204, 229, t);
    const g = lerpChannel(95, 176, t);
    const b = lerpChannel(96, 177, t);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }

  function sphereRadius() {
    const panel = els.heroSphereCanvas?.parentElement;
    if (!panel) return 150;
    return Math.max(118, Math.min(panel.clientWidth * 0.88, panel.clientHeight) * 0.47);
  }

  function updateSphereMask() {
    const stage = els.heroStage;
    const panel = els.heroSphereCanvas?.parentElement;
    if (!stage || !panel) return;

    const radius = sphereRadius() * 1.05;
    const feather = Math.max(20, radius * 0.13);

    stage.style.setProperty("--sphere-r", `${radius}px`);
    stage.style.setProperty("--sphere-feather", `${feather}px`);

    if (els.heroSphereDrag) {
      const size = radius * 2;
      els.heroSphereDrag.style.width = `${size}px`;
      els.heroSphereDrag.style.height = `${size}px`;
    }
  }

  function sphereNodeHtml(p, vertexIndex) {
    const link = primaryLink(p);
    const inner = `
      <span class="sphere-node-dot">
        ${productLogo(p)}
      </span>
      <span class="sphere-node-name">${p.name}</span>
    `;
    if (link) {
      return `
        <a class="sphere-node" href="${link.url}" rel="noopener noreferrer"
          data-open-external="${p.id}"
          data-vertex-index="${vertexIndex}"
          aria-label="打开 ${p.name}"
          data-product-id="${p.id}">
          ${inner}
        </a>
      `;
    }
    return `
      <button class="sphere-node" type="button" data-open-product="${p.id}"
        data-vertex-index="${vertexIndex}"
        aria-label="查看 ${p.name}">
        ${inner}
      </button>
    `;
  }

  function bindSphereHover() {
    const scene = els.heroSphereScene;
    const nodes = els.heroSphereNodes;
    if (!scene || !nodes) return;
    nodes.querySelectorAll(".sphere-node").forEach((node) => {
      const activate = () => {
        scene.classList.add("has-active");
        nodes.classList.add("has-hover");
        nodes.querySelectorAll(".sphere-node.is-active").forEach((n) => n.classList.remove("is-active"));
        node.classList.add("is-active");
        if (els.sphereVisitHint) {
          els.sphereVisitHint.hidden = false;
        }
      };
      const deactivate = () => {
        node.classList.remove("is-active");
        if (!nodes.querySelector(".sphere-node.is-active")) {
          scene.classList.remove("has-active");
          nodes.classList.remove("has-hover");
          if (els.sphereVisitHint) {
            els.sphereVisitHint.hidden = true;
          }
        }
      };
      node.addEventListener("mouseenter", activate);
      node.addEventListener("mouseleave", deactivate);
      node.addEventListener("focus", activate);
      node.addEventListener("blur", deactivate);
    });
  }

  let sphereInited = false;
  let sphereProductIndices = new Set();
  let sphereResizeBound = false;
  const sphereState = {
    rotX: -16,
    rotY: 18,
    dragging: false,
    autoRotate: true,
    lastX: 0,
    lastY: 0,
    dragMoved: 0,
    suppressClick: false,
    dpr: window.devicePixelRatio || 1,
  };

  function resizeSphereCanvas() {
    const panel = els.heroSphereCanvas?.parentElement;
    const canvas = els.heroSphereCanvas;
    if (!panel || !canvas) return;
    sphereState.dpr = window.devicePixelRatio || 1;
    const w = panel.clientWidth;
    const h = panel.clientHeight;
    canvas.width = Math.max(1, Math.floor(w * sphereState.dpr));
    canvas.height = Math.max(1, Math.floor(h * sphereState.dpr));
    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`;
    updateSphereMask();
  }

  function drawSphereFrame() {
    const canvas = els.heroSphereCanvas;
    const scene = els.heroSphereScene;
    if (!canvas || !scene) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = sphereState.dpr;
    const w = canvas.width / dpr;
    const h = canvas.height / dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, w, h);

    const cx = w / 2;
    const cy = h / 2;
    const radius = sphereRadius();
    const { vertices, edges } = getGeodesicData();
    const { rotX, rotY } = sphereState;

    const projected = vertices.map((v) => {
      const rotated = rotateVec3(v[0], v[1], v[2], rotX, rotY);
      return projectVec3(rotated[0], rotated[1], rotated[2], cx, cy, radius);
    });

    const sortedEdges = edges
      .map(([a, b]) => ({ a, b, z: (projected[a].z + projected[b].z) / 2 }))
      .sort((left, right) => left.z - right.z);

    const baseGlow = ctx.createRadialGradient(
      cx - radius * 0.18,
      cy - radius * 0.22,
      radius * 0.08,
      cx,
      cy,
      radius * 1.02
    );
    baseGlow.addColorStop(0, "rgba(255, 255, 255, 0.05)");
    baseGlow.addColorStop(0.55, "rgba(255, 255, 255, 0.015)");
    baseGlow.addColorStop(1, "rgba(255, 255, 255, 0)");
    ctx.fillStyle = baseGlow;
    ctx.beginPath();
    ctx.arc(cx, cy, radius * 1.02, 0, Math.PI * 2);
    ctx.fill();

    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    sortedEdges.forEach(({ a, b, z }) => {
      const pa = projected[a];
      const pb = projected[b];
      const depth = (z + 1) / 2;
      const depthAlpha = 0.16 + depth * 0.52;
      const grad = ctx.createLinearGradient(pa.x, pa.y, pb.x, pb.y);
      grad.addColorStop(
        0,
        sphereGradientColor(vertices[a][0], vertices[a][1], vertices[a][2], rotX, rotY, depthAlpha * 0.92)
      );
      grad.addColorStop(
        1,
        sphereGradientColor(vertices[b][0], vertices[b][1], vertices[b][2], rotX, rotY, depthAlpha * 0.92)
      );
      ctx.strokeStyle = grad;
      ctx.lineWidth = 0.35 + depth * 0.45;
      ctx.beginPath();
      ctx.moveTo(pa.x, pa.y);
      ctx.lineTo(pb.x, pb.y);
      ctx.stroke();
    });

    vertices.forEach((v, index) => {
      if (sphereProductIndices.has(index)) return;
      const p = projected[index];
      const depth = (p.z + 1) / 2;
      const dotSize = (1.6 + p.scale * 1.2) * p.scale;
      ctx.fillStyle = sphereGradientColor(v[0], v[1], v[2], rotX, rotY, 0.22 + depth * 0.48);
      ctx.beginPath();
      ctx.arc(p.x, p.y, dotSize, 0, Math.PI * 2);
      ctx.fill();
    });

    const membrane = ctx.createRadialGradient(
      cx - radius * 0.12,
      cy - radius * 0.16,
      radius * 0.04,
      cx,
      cy,
      radius * 1.04
    );
    membrane.addColorStop(0, "rgba(255, 255, 255, 0.28)");
    membrane.addColorStop(0.42, "rgba(255, 255, 255, 0.14)");
    membrane.addColorStop(0.68, "rgba(255, 255, 255, 0.05)");
    membrane.addColorStop(0.88, "rgba(255, 255, 255, 0.015)");
    membrane.addColorStop(1, "rgba(255, 255, 255, 0)");
    ctx.fillStyle = membrane;
    ctx.beginPath();
    ctx.arc(cx, cy, radius * 1.04, 0, Math.PI * 2);
    ctx.fill();

    els.heroSphereNodes?.querySelectorAll(".sphere-node").forEach((node) => {
      const index = Number(node.dataset.vertexIndex);
      const p = projected[index];
      if (!p) return;
      const size = 34 + p.scale * 14;
      const nameEl = node.querySelector(".sphere-node-name");
      const isHovering = els.heroSphereNodes?.classList.contains("has-hover");
      const isHovered = node.classList.contains("is-active");
      const facingFront = p.z > 0.12;
      let nameOpacity = 0;

      if (isHovered) {
        nameOpacity = 1;
      } else if (!isHovering && facingFront) {
        nameOpacity = Math.max(0, Math.min(1, (p.z - 0.1) / 0.45));
      }

      node.style.width = `${size}px`;
      node.style.height = `${size}px`;
      node.style.transform = `translate3d(${p.x - size / 2}px, ${p.y - size / 2}px, 0)`;
      node.style.zIndex = String(Math.round((p.z + 1) * 100));
      node.style.opacity = p.z < -0.35 ? "0.28" : "1";
      node.style.pointerEvents = p.z < -0.75 ? "none" : "auto";
      node.classList.toggle("is-facing", nameOpacity > 0.08);

      if (nameEl) {
        const dx = p.x - cx;
        const dy = p.y - cy;
        const dist = Math.hypot(dx, dy) || 1;
        const nx = dx / dist;
        const ny = dy / dist;
        const labelRadius = size * 0.5 + 12;
        nameEl.style.left = `${size / 2 + nx * labelRadius}px`;
        nameEl.style.top = `${size / 2 + ny * labelRadius}px`;
        nameEl.style.opacity = String(nameOpacity);
      }
    });
  }

  function initSphereInteraction() {
    if (sphereInited) return;
    sphereInited = true;
    const dragZone = els.heroSphereDrag;
    if (!dragZone) return;

    resizeSphereCanvas();
    if (!sphereResizeBound) {
      sphereResizeBound = true;
      window.addEventListener("resize", () => {
        resizeSphereCanvas();
        drawSphereFrame();
      });
      window.addEventListener("load", updateSphereMask);
    }

    const onPointerDown = (e) => {
      if (e.button !== 0) return;
      sphereState.dragging = true;
      sphereState.autoRotate = false;
      sphereState.lastX = e.clientX;
      sphereState.lastY = e.clientY;
      sphereState.dragMoved = 0;
      dragZone.classList.add("is-dragging");
      dragZone.setPointerCapture(e.pointerId);
    };

    const onPointerMove = (e) => {
      if (!sphereState.dragging) return;
      const dx = e.clientX - sphereState.lastX;
      const dy = e.clientY - sphereState.lastY;
      sphereState.dragMoved += Math.abs(dx) + Math.abs(dy);
      sphereState.rotY += dx * 0.35;
      sphereState.rotX -= dy * 0.35;
      sphereState.rotX = Math.max(-55, Math.min(55, sphereState.rotX));
      sphereState.lastX = e.clientX;
      sphereState.lastY = e.clientY;
    };

    const endDrag = (e) => {
      if (!sphereState.dragging) return;
      sphereState.dragging = false;
      dragZone.classList.remove("is-dragging");
      if (dragZone.hasPointerCapture(e.pointerId)) {
        dragZone.releasePointerCapture(e.pointerId);
      }
      if (sphereState.dragMoved > 8) {
        sphereState.suppressClick = true;
        setTimeout(() => {
          sphereState.suppressClick = false;
        }, 120);
      }
      window.setTimeout(() => {
        sphereState.autoRotate = true;
      }, 2200);
    };

    dragZone.addEventListener("pointerdown", onPointerDown);
    dragZone.addEventListener("pointermove", onPointerMove);
    dragZone.addEventListener("pointerup", endDrag);
    dragZone.addEventListener("pointercancel", endDrag);

    els.heroSphereNodes?.addEventListener("click", (e) => {
      if (!sphereState.suppressClick) return;
      const link = e.target.closest("a.sphere-node");
      if (link) e.preventDefault();
    });

    const tick = () => {
      if (sphereState.autoRotate && !sphereState.dragging) {
        sphereState.rotY += 0.06;
      }
      drawSphereFrame();
      requestAnimationFrame(tick);
    };
    tick();
  }

  function renderSphere() {
    const list = bannerProducts();
    if (!els.heroSphereNodes) return;
    if (!list.length) {
      els.heroSphereNodes.innerHTML = "";
      sphereProductIndices = new Set();
      return;
    }

    const { vertices } = getGeodesicData();
    const vertexIndices = pickProductVertexIndices(vertices.length, list.length);
    sphereProductIndices = new Set(vertexIndices);

    els.heroSphereNodes.innerHTML = list
      .map((p, i) => sphereNodeHtml(p, vertexIndices[i]))
      .join("");
    bindSphereHover();
    initSphereInteraction();
    resizeSphereCanvas();
    requestAnimationFrame(updateSphereMask);
    drawSphereFrame();
  }

  function renderHome() {
    renderSphere();
    renderBanner();
    renderHomeMap();
    const newsPreview = news.slice(0, 6);
    els.newsPreview.innerHTML = newsPreview.map((n) => newsStripItem(n)).join("");
    bindReveal();
  }

  function renderScene(sceneId) {
    const s = sceneMap[sceneId];
    if (!s) return;

    els.views.scene.className = `view scene-detail-view scene-section--${sceneId}`;

    const topIndex = topScenes().findIndex((item) => item.id === sceneId);
    const num = topIndex >= 0 ? String(topIndex + 1).padStart(2, "0") : "";
    const count = productsInCategory(sceneId).length;
    const children = childScenes(sceneId);
    const sub = state.sceneSubFilter || "all";

    els.sceneIntro.className = `page-intro scene-detail-intro scene-section scene-section--${sceneId} reveal`;
    els.sceneIntro.innerHTML = `
      <div class="scene-detail-head">
        ${num ? `<div class="section-label">Category ${num}</div>` : `<div class="section-label">Category</div>`}
        <div class="scene-detail-title-row">
          ${sceneIconHtml(s)}
          <h1>${s.name}</h1>
        </div>
        <p>${s.blurb}</p>
        <p class="scene-detail-meta">${count} 款产品</p>
      </div>
    `;

    if (children.length) {
      els.sceneFilters.hidden = false;
      const chips = [{ id: "all", name: "全部" }, ...children.map((c) => ({ id: c.id, name: c.name }))];
      els.sceneFilters.innerHTML = chips
        .map(
          (f) =>
            `<button class="chip ${sub === f.id ? "active" : ""}" type="button" data-scene-sub-filter="${f.id}">${f.name}</button>`
        )
        .join("");
    } else {
      els.sceneFilters.hidden = true;
      els.sceneFilters.innerHTML = "";
    }

    let list;
    if (children.length && sub !== "all") {
      list = products.filter((p) => (p.categories || []).includes(sub));
    } else {
      const ids = descendantIds(sceneId);
      list = products.filter((p) => (p.categories || []).some((c) => ids.includes(c)));
    }

    list = sortProductsList(list, sceneId === "agent" ? "agent" : null);

    els.sceneProducts.className = "product-list scene-products-wrap";
    els.sceneProducts.innerHTML =
      list.map((p) => productCard(p)).join("") || `<div class="empty reveal">该分类暂无产品</div>`;
    bindReveal();
  }

  function renderProduct(productId) {
    const p = productMap[productId];
    if (!p) return;
    const alts = (p.alternatives || []).map((id) => productMap[id]).filter(Boolean);
    const related = news.filter((n) => (n.productIds || []).includes(productId)).slice(0, 3);

    const main = primaryLink(p);

    const cat = sceneMap[p.categories?.[0]];
    const conceptBlock = cat?.concept
      ? `<div class="block"><h2>产品类型</h2><p>${cat.concept}</p></div>`
      : "";

    els.productPage.innerHTML = `
      <div class="cover mob-detail-cover">
        ${
          main
            ? `<a class="cover-shot-link" href="${main.url}" data-open-external="${p.id}" rel="noopener noreferrer" aria-label="打开 ${p.name}">
                <div class="mob-shot-frame mob-shot-frame-detail">
                  ${productPreview(p)}
                </div>
                <span class="cover-shot-hint">${productAppUri(p) ? "点击打开应用，未安装则跳转官网 ↗" : "点击访问官网 ↗"}</span>
              </a>`
            : `<div class="mob-shot-frame mob-shot-frame-detail">
                ${productPreview(p)}
              </div>`
        }
        <div class="cover-brand">
          ${productLogo(p, "product-logo-lg")}
          <div class="tags">${categoryTags(p.categories, true)}</div>
        </div>
        <h1>${p.name}</h1>
        <p class="one-liner">${p.oneLiner}</p>
        <div class="cover-actions">
          ${regionBadge(p)}
          ${pricingBadge(p)}
          ${
            main
              ? `<button class="btn btn-primary btn-sm" type="button" data-open-external="${p.id}">${openExternalLabel(p)}</button>`
              : ""
          }
        </div>
      </div>

      ${conceptBlock}

      <div class="block">
        <h2>相关链接</h2>
        ${linksBlock(p)}
      </div>

      <div class="block">
        <h2>适合谁</h2>
        <p>${p.forWho}</p>
      </div>

      <div class="block">
        <h2>分类标签</h2>
        <div class="tags">${categoryTags(p.categories, true)}</div>
      </div>

      <div class="block">
        <h2>3 步上手</h2>
        <ol>${(p.steps || []).map((step) => `<li>${step}</li>`).join("")}</ol>
      </div>

      <div class="block">
        <h2>同类替代</h2>
        <div class="alt-list">
          ${
            alts.length
              ? alts
                  .map((a) => {
                    const aLink = primaryLink(a);
                    return `
                      <div class="alt-row">
                        <button class="alt-btn" type="button" data-open-product="${a.id}">
                          ${productLogo(a, "product-logo-sm")}
                          <span>${a.name} · ${a.pricingLabel}</span>
                        </button>
                        ${
                          aLink
                            ? `<a class="alt-ext" href="${aLink.url}" rel="noopener noreferrer" aria-label="打开 ${a.name} 官网">↗</a>`
                            : ""
                        }
                      </div>`;
                  })
                  .join("")
              : "<p>暂无</p>"
          }
        </div>
      </div>

      <div class="block">
        <h2>相关资讯</h2>
        <div class="related-news">
          ${
            related.length
              ? related
                  .map(
                    (n) =>
                      `<button type="button" data-open-news="${n.id}"><strong>${n.title}</strong><span>${n.date}</span></button>`
                  )
                  .join("")
              : "<p>暂无相关快讯</p>"
          }
        </div>
      </div>
    `;
    bindReveal();
  }

  let revealObserver;
  function bindReveal() {
    const targets = document.querySelectorAll(".reveal:not(.is-visible)");
    if (!targets.length) return;

    if (typeof IntersectionObserver === "undefined") {
      targets.forEach((el) => el.classList.add("is-visible"));
      return;
    }

    if (!revealObserver) {
      revealObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) {
              e.target.classList.add("is-visible");
              revealObserver.unobserve(e.target);
            }
          });
        },
        { threshold: 0.08, rootMargin: "0px 0px -24px 0px" }
      );
    }
    targets.forEach((el) => {
      revealObserver.observe(el);
    });
  }

  function renderNews() {
    const tagSet = new Set();
    news.forEach((n) => (n.tags || []).forEach((t) => tagSet.add(t)));
    const tagFilters = [...tagSet].sort().map((t) => ({ id: `tag:${t}`, name: t }));
    const catFilters = topScenes().map((s) => ({ id: s.id, name: s.name }));
    const filters = [{ id: "all", name: "全部" }, ...tagFilters.slice(0, 12), ...catFilters];

    els.newsFilters.innerHTML = filters
      .map(
        (f) =>
          `<button class="chip ${state.newsFilter === f.id ? "active" : ""}" type="button" data-news-filter="${f.id}">${f.name}</button>`
      )
      .join("");

    let list = news;
    if (state.newsFilter.startsWith("tag:")) {
      const tag = state.newsFilter.slice(4);
      list = news.filter((n) => (n.tags || []).includes(tag));
    } else if (state.newsFilter !== "all") {
      list = news.filter((n) => {
        const ids = descendantIds(state.newsFilter);
        return (n.categoryIds || []).some((c) => ids.includes(c));
      });
    }

    list = [...list].sort((a, b) => new Date(b.date) - new Date(a.date));

    renderNewsDashboard();
    renderProductUpdates();
    els.newsList.innerHTML = list.map((n) => newsCard(n)).join("") || `<div class="empty reveal">该分类暂无快讯</div>`;
    bindReveal();
  }

  function renderSearch(q) {
    const query = (q || "").trim().toLowerCase();
    if (!query) {
      closeSearchPanel();
      return;
    }

    const matchedScenes = scenes.filter(
      (s) =>
        s.name.toLowerCase().includes(query) ||
        s.blurb.includes(query) ||
        (s.concept && s.concept.includes(query)) ||
        s.audience.includes(query)
    );
    const matchedProducts = products.filter((p) => {
      const catNames = (p.categories || []).map((id) => sceneMap[id]?.name || "").join(" ");
      const blob = `${p.name} ${p.oneLiner} ${p.forWho} ${p.region || ""} ${catNames}`.toLowerCase();
      return blob.includes(query);
    });
    const matchedNews = news.filter((n) => {
      const blob = `${n.title} ${newsOneLiner(n)} ${(n.tags || []).join(" ")}`.toLowerCase();
      return blob.includes(query);
    });

    let html = "";
    if (matchedScenes.length) {
      html += `<div class="search-group"><p class="search-group-title">分类</p>`;
      html += matchedScenes
        .map(
          (s) =>
            `<button class="scene-result" type="button" data-open-scene="${s.id}"><h3>${s.name}</h3><p class="one-liner">${s.blurb}</p></button>`
        )
        .join("");
      html += `</div>`;
    }
    if (matchedProducts.length) {
      html += `<div class="search-group"><p class="search-group-title">产品</p>`;
      html += `<div class="search-product-grid">${matchedProducts.map(productCard).join("")}</div>`;
      html += `</div>`;
    }
    if (matchedNews.length) {
      html += `<div class="search-group"><p class="search-group-title">快讯</p>`;
      html += matchedNews.map((n) => newsCard(n, true)).join("");
      html += `</div>`;
    }

    els.searchResults.innerHTML = html || `<div class="empty">没有找到「${q}」</div>`;
    openSearchPanel();
    bindReveal();
  }

  function openSearchPanel() {
    state.searchOpen = true;
    els.searchPanel.hidden = false;
    els.searchInput.setAttribute("aria-expanded", "true");
    els.siteHeader.classList.add("search-active");
  }

  function closeSearchPanel() {
    state.searchOpen = false;
    els.searchPanel.hidden = true;
    els.searchInput.setAttribute("aria-expanded", "false");
    els.siteHeader.classList.remove("search-active");
    els.searchResults.innerHTML = "";
  }

  function clearSearch() {
    els.searchInput.value = "";
    closeSearchPanel();
  }

  function openFeedback() {
    closeSearchPanel();
    els.feedbackModal.hidden = false;
    els.feedbackForm.hidden = false;
    els.feedbackSuccess.hidden = true;
    state.feedbackOpen = true;
    document.body.classList.add("feedback-open");
    els.feedbackContent.focus();
  }

  function closeFeedback() {
    els.feedbackModal.hidden = true;
    state.feedbackOpen = false;
    document.body.classList.remove("feedback-open");
    els.feedbackBtn.focus();
  }

  function saveFeedback(entry) {
    const list = JSON.parse(localStorage.getItem(FEEDBACK_KEY) || "[]");
    list.push(entry);
    localStorage.setItem(FEEDBACK_KEY, JSON.stringify(list));
  }

  function setTab(view) {
    const activeNav =
      view === "scene" || view === "product"
        ? "home"
        : view === "news-detail"
          ? "news"
          : view;

    document.querySelectorAll(".tab, .desk-link").forEach((el) => {
      el.classList.toggle("active", el.dataset.nav === activeNav);
    });
  }

  function showView(view, { push = true } = {}) {
    if (push && state.view !== view) {
      state.history.push({
        view: state.view,
        sceneId: state.sceneId,
        productId: state.productId,
        newsId: state.newsId,
      });
    }
    state.view = view;
    Object.entries(els.views).forEach(([key, node]) => {
      node.hidden = key !== view;
    });

    els.backBtn.hidden = !(view === "scene" || view === "product" || view === "news-detail");

    if (view === "home") renderHome();
    if (view === "scene") renderScene(state.sceneId);
    if (view === "product") renderProduct(state.productId);
    if (view === "news") renderNews();
    if (view === "news-detail") renderNewsDetail(state.newsId);

    setTab(view === "scene" || view === "product" ? "home" : view);
    window.scrollTo({ top: 0, behavior: "instant" in window ? "instant" : "auto" });
  }

  function openCategoryPage(id) {
    clearSearch();
    state.sceneId = id;
    state.sceneSubFilter = "all";
    showView("scene");
  }

  function openScene(id) {
    clearSearch();
    const s = sceneMap[id];
    if (!s) return;
    if (s.parent) {
      state.sceneId = s.parent;
      state.sceneSubFilter = id;
    } else {
      state.sceneId = id;
      state.sceneSubFilter = "all";
    }
    showView("scene");
  }

  function openProduct(id) {
    clearSearch();
    state.productId = id;
    showView("product");
  }

  function goBack() {
    const prev = state.history.pop();
    if (!prev) {
      showView("home", { push: false });
      return;
    }
    state.sceneId = prev.sceneId;
    state.productId = prev.productId;
    state.newsId = prev.newsId ?? null;
    showView(prev.view, { push: false });
  }

  document.body.addEventListener("click", (e) => {
    if (e.target.closest(".news-source")) return;

    const ext = e.target.closest("[data-open-external]");
    if (ext) {
      e.preventDefault();
      const p = productMap[ext.dataset.openExternal];
      openProductTarget(p);
      return;
    }

    // 其余外链仍直接跳转
    if (e.target.closest("a[href^='http']")) return;

    const t = e.target.closest("[data-nav], [data-open-scene], [data-open-category], [data-open-product], [data-open-news], [data-news-filter], [data-home-sub-filter], [data-scene-sub-filter], [data-home-section-page], [data-scroll], [data-brief-section]");
    if (!t) return;

    if (t.dataset.briefSection) {
      document.getElementById(`brief-section-${t.dataset.briefSection}`)?.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }

    if (t.dataset.scroll) {
      document.querySelector(t.dataset.scroll)?.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }
    if (t.dataset.nav) {
      if (t.dataset.nav === "home" || t.dataset.nav === "news") {
        state.history = [];
        clearSearch();
      }
      showView(t.dataset.nav, { push: t.dataset.nav === "news" && state.view === "product" });
      return;
    }
    if (t.dataset.openScene) {
      openScene(t.dataset.openScene);
      return;
    }
    if (t.dataset.openCategory) {
      openCategoryPage(t.dataset.openCategory);
      return;
    }
    if (t.dataset.sceneSubFilter !== undefined) {
      state.sceneSubFilter = t.dataset.sceneSubFilter;
      renderScene(state.sceneId);
      bindReveal();
      return;
    }
    if (t.dataset.homeSubFilter !== undefined) {
      const parent = t.dataset.sceneParent;
      if (!parent) return;
      state.homeSubFilters[parent] = t.dataset.homeSubFilter;
      state.homeSectionPages[parent] = 1;
      renderHomeMap();
      bindReveal();
      return;
    }
    if (t.dataset.homeSectionPage !== undefined) {
      const sceneId = t.dataset.homeSectionPage;
      const page = Number(t.dataset.page);
      if (!sceneId || !Number.isFinite(page) || page < 1) return;
      state.homeSectionPages[sceneId] = page;
      renderHomeMap();
      bindReveal();
      document.getElementById(`scene-section-${sceneId}`)?.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }
    if (t.dataset.openProduct) {
      openProduct(t.dataset.openProduct);
      return;
    }
    if (t.dataset.openNews) {
      openNews(t.dataset.openNews);
      return;
    }
    if (t.dataset.newsFilter) {
      state.newsFilter = t.dataset.newsFilter;
      renderNews();
    }
  });

  els.backBtn.addEventListener("click", goBack);

  els.feedbackBtn.addEventListener("click", openFeedback);

  els.bannerSettingsBtn?.addEventListener("click", openBannerSettings);

  els.bannerSettingsModal?.addEventListener("click", (e) => {
    if (e.target.closest("[data-close-banner-settings]")) closeBannerSettings();
  });

  els.bannerRegionChips?.addEventListener("click", (e) => {
    const chip = e.target.closest("[data-banner-region]");
    if (!chip || !bannerSettingsDraft) return;
    bannerSettingsDraft.regionFilter = chip.dataset.bannerRegion;
    syncBannerRegionChips(bannerSettingsDraft.regionFilter);
  });

  els.bannerSelectDefault?.addEventListener("click", () => {
    if (!bannerSettingsDraft) return;
    bannerSettingsDraft.selectedIds = [...featuredBanner];
    renderBannerPickList(bannerSettingsDraft);
  });

  els.bannerSettingsSave?.addEventListener("click", saveBannerSettings);

  els.feedbackModal.addEventListener("click", (e) => {
    if (e.target.closest("[data-close-feedback]")) closeFeedback();
  });

  els.feedbackForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const content = els.feedbackContent.value.trim();
    if (!content) return;
    saveFeedback({
      content,
      contact: document.getElementById("feedbackContact").value.trim(),
      date: new Date().toISOString(),
      page: state.view,
    });
    els.feedbackForm.reset();
    els.feedbackForm.hidden = true;
    els.feedbackSuccess.hidden = false;
  });

  let searchTimer;
  els.searchInput.addEventListener("input", () => {
    clearTimeout(searchTimer);
    searchTimer = setTimeout(() => renderSearch(els.searchInput.value), 120);
  });

  document.addEventListener("click", (e) => {
    if (!e.target.closest(".top-search") && state.searchOpen) {
      els.searchPanel.hidden = true;
      state.searchOpen = false;
      els.searchInput.setAttribute("aria-expanded", "false");
      els.siteHeader.classList.remove("search-active");
    }
  });

  els.searchInput.addEventListener("focus", () => {
    if (els.searchInput.value.trim()) {
      renderSearch(els.searchInput.value);
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      if (state.bannerSettingsOpen) closeBannerSettings();
      else if (state.feedbackOpen) closeFeedback();
      else clearSearch();
    }
  });

  window.addEventListener(
    "scroll",
    () => {
      els.siteHeader.classList.toggle("scrolled", window.scrollY > 8);
      const glowA = document.getElementById("glowA");
      const glowB = document.getElementById("glowB");
      if (glowA && glowB) {
        const y = window.scrollY * 0.12;
        glowA.style.transform = `translate3d(0, ${y}px, 0)`;
        glowB.style.transform = `translate3d(0, ${-y * 0.7}px, 0)`;
      }
    },
    { passive: true }
  );

  async function boot() {
    try {
      await loadNewsFeed();
      news = news.map(normalizeNewsItem);
      newsMap = Object.fromEntries(news.map((n) => [n.id, n]));
      showView("home", { push: false });
      bindReveal();
    } catch (err) {
      console.error("页面初始化失败", err);
      const app = document.getElementById("app");
      if (app) {
        app.insertAdjacentHTML(
          "afterbegin",
          `<div class="boot-error" role="alert">页面加载异常，请刷新或稍后再试。</div>`
        );
      }
    }
  }

  boot();
})();
