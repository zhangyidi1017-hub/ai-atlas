(() => {
  const { scenes, products, news, featuredBanner = [] } = window.AI_DATA;

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
    sceneGrid: document.getElementById("sceneGrid"),
    newsPreview: document.getElementById("newsPreview"),
    sceneIntro: document.getElementById("sceneIntro"),
    sceneProducts: document.getElementById("sceneProducts"),
    productPage: document.getElementById("productPage"),
    newsFilters: document.getElementById("newsFilters"),
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
    productId: null,
    newsFilter: "all",
    newsId: null,
    history: [],
    searchOpen: false,
    feedbackOpen: false,
  };

  const FEEDBACK_KEY = "ai-atlas-feedback";

  const sceneMap = Object.fromEntries(scenes.map((s) => [s.id, s]));
  const productMap = Object.fromEntries(products.map((p) => [p.id, p]));
  const newsMap = Object.fromEntries(news.map((n) => [n.id, n]));

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

  function sceneCard(s, i = 0) {
    const count = productsInCategory(s.id).length;
    const num = String(i + 1).padStart(2, "0");
    return `
      <button class="scene-card reveal" type="button" data-open-scene="${s.id}">
        <div class="scene-card-top">
          <span class="scene-index">${num}</span>
          <span class="scene-ico">${s.icon}</span>
        </div>
        <h3>${s.name}</h3>
        <p>${s.blurb}</p>
        <div class="scene-card-foot">
          <span class="meta">${count} products</span>
          <span class="scene-arrow" aria-hidden="true">→</span>
        </div>
      </button>`;
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
            (l) => `
          <a class="ext-link" href="${l.url}" rel="noopener noreferrer">
            <span class="ext-link-label">${l.label}</span>
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
        <button class="mob-card-hit" type="button" data-open-product="${p.id}" aria-label="查看 ${p.name}">
          <div class="mob-card-shot">
            ${productPreview(p)}
          </div>
          <p class="mob-card-tags">${productTagLine(p)}</p>
          <h3 class="mob-card-title"><span class="mob-card-arrow" aria-hidden="true">→</span>${p.name}</h3>
        </button>
      </article>
    `;
  }

  function newsStripItem(n) {
    return `
      <button class="news-strip-item" type="button" data-open-news="${n.id}">
        <span class="news-strip-title">${n.title}</span>
        <span class="news-strip-date">${n.date}</span>
        <span class="news-strip-arrow" aria-hidden="true">→</span>
      </button>
    `;
  }

  function newsCard(n, compact = false) {
    return `
      <button class="news-item reveal ${compact ? "compact" : ""}" type="button" data-open-news="${n.id}">
        <div class="row-top">
          <h3>${n.title}</h3>
        </div>
        <p class="summary">${n.summary}</p>
        <div class="tags">${categoryTags(n.categoryIds, false)}</div>
        <div class="news-item-foot">
          <p class="time">${n.date}</p>
          <span class="news-read-more">阅读全文 →</span>
        </div>
      </button>
    `;
  }

  function renderNewsDetail(newsId) {
    const n = newsMap[newsId];
    if (!n) return;
    const relatedProducts = (n.productIds || []).map((id) => productMap[id]).filter(Boolean);
    const paragraphs = (n.content || []).map((p) => `<p>${p}</p>`).join("");
    const highlights = (n.highlights || []).length
      ? `<div class="block"><h2>要点速览</h2><ul>${n.highlights.map((h) => `<li>${h}</li>`).join("")}</ul></div>`
      : "";

    els.newsDetail.innerHTML = `
      <header class="news-detail-head reveal">
        <div class="section-label">News Detail</div>
        <p class="news-detail-date">${n.date}</p>
        <h1>${n.title}</h1>
        <p class="news-detail-lead">${n.summary}</p>
        <div class="tags">${categoryTags(n.categoryIds, true)}</div>
      </header>

      <div class="block reveal">
        <h2>正文</h2>
        <div class="news-detail-body">${paragraphs || `<p>${n.summary}</p>`}</div>
      </div>

      ${highlights}

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

  function bannerProducts() {
    return featuredBanner.map((id) => productMap[id]).filter(Boolean);
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
        <a class="banner-slot" href="${link.url}" rel="noopener noreferrer" aria-label="打开 ${p.name} 官网">
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
          data-vertex-index="${vertexIndex}"
          aria-label="打开 ${p.name} 官网"
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
    els.sceneGrid.innerHTML = topScenes().map((s, i) => sceneCard(s, i)).join("");
    const newsPreview = news.slice(0, 6);
    els.newsPreview.innerHTML = newsPreview.map((n) => newsStripItem(n)).join("");
    bindReveal();
  }

  function renderScene(sceneId) {
    const s = sceneMap[sceneId];
    if (!s) return;
    const children = childScenes(sceneId);
    els.sceneIntro.innerHTML = `
      <h1>${s.name}</h1>
      <p>${s.blurb}</p>
    `;

    if (children.length) {
      els.sceneProducts.className = "scene-grid scene-subgrid scene-products-wrap";
      els.sceneProducts.innerHTML = children.map((c, i) => sceneCard(c, i)).join("");
    } else {
      els.sceneProducts.className = "product-list scene-products-wrap";
      const list = products.filter((p) => (p.categories || []).includes(sceneId));
      els.sceneProducts.innerHTML = list.map(productCard).join("") || `<div class="empty reveal">该分类暂无产品</div>`;
    }
    bindReveal();
  }

  function renderProduct(productId) {
    const p = productMap[productId];
    if (!p) return;
    const alts = (p.alternatives || []).map((id) => productMap[id]).filter(Boolean);
    const related = news.filter((n) => n.productIds.includes(productId)).slice(0, 3);

    const main = primaryLink(p);

    const cat = sceneMap[p.categories?.[0]];
    const conceptBlock = cat?.concept
      ? `<div class="block"><h2>产品类型</h2><p>${cat.concept}</p></div>`
      : "";

    els.productPage.innerHTML = `
      <div class="cover mob-detail-cover">
        ${
          main
            ? `<a class="cover-shot-link" href="${main.url}" rel="noopener noreferrer" aria-label="打开 ${p.name} 官网">
                <div class="mob-shot-frame mob-shot-frame-detail">
                  ${productPreview(p)}
                </div>
                <span class="cover-shot-hint">点击访问官网 ↗</span>
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
              ? `<a class="btn btn-primary btn-sm" href="${main.url}" rel="noopener noreferrer">打开官网</a>`
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
        <ol>${p.steps.map((step) => `<li>${step}</li>`).join("")}</ol>
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
    document.querySelectorAll(".reveal:not(.is-visible)").forEach((el) => {
      revealObserver.observe(el);
    });
  }

  function renderNews() {
    const filters = [{ id: "all", name: "全部" }, ...topScenes().map((s) => ({ id: s.id, name: s.name }))];
    els.newsFilters.innerHTML = filters
      .map(
        (f) =>
          `<button class="chip ${state.newsFilter === f.id ? "active" : ""}" type="button" data-news-filter="${f.id}">${f.name}</button>`
      )
      .join("");

    const list =
      state.newsFilter === "all"
        ? news
        : news.filter((n) => {
            const ids = descendantIds(state.newsFilter);
            return (n.categoryIds || []).some((c) => ids.includes(c));
          });

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
    const matchedNews = news.filter((n) =>
      `${n.title} ${n.summary}`.toLowerCase().includes(query)
    );

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

  function openScene(id) {
    clearSearch();
    state.sceneId = id;
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
    // 外链直接跳转官网，不走站内路由
    if (e.target.closest("a[href^='http']")) return;

    const t = e.target.closest("[data-nav], [data-open-scene], [data-open-product], [data-open-news], [data-news-filter], [data-scroll]");
    if (!t) return;

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
      if (state.feedbackOpen) closeFeedback();
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

  showView("home", { push: false });
  bindReveal();
})();
