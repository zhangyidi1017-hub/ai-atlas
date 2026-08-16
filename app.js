(() => {
  if (!window.AI_DATA) {
    console.error("AI_DATA 未加载，请检查 data.js");
    return;
  }

  const { scenes, products, news: fallbackNews, featuredBanner = [], categoryPins = {} } = window.AI_DATA;

  let news = [...fallbackNews];
  let aihotFeed = null;

  const els = {
    views: {
      home: document.getElementById("view-home"),
      scene: document.getElementById("view-scene"),
      product: document.getElementById("view-product"),
      news: document.getElementById("view-news"),
      "news-detail": document.getElementById("view-news-detail"),
      skills: document.getElementById("view-skills"),
    },
    backBtn: document.getElementById("backBtn"),
    topbar: document.getElementById("topbar"),
    siteHeader: document.getElementById("siteHeader"),
    sceneSections: document.getElementById("sceneSections"),
    newsPreview: null,
    aihotTimeline: document.getElementById("aihotTimeline"),
    aihotTimelineFull: document.getElementById("aihotTimelineFull"),
    aihotTimelineMeta: document.getElementById("aihotTimelineMeta"),
    aihotCategoryFilters: document.getElementById("aihotCategoryFilters"),
    aihotCategoryMeta: document.getElementById("aihotCategoryMeta"),
    aihotCategoryDetail: document.getElementById("aihotCategoryDetail"),
    sceneIntro: document.getElementById("sceneIntro"),
    sceneFilters: document.getElementById("sceneFilters"),
    sceneProducts: document.getElementById("sceneProducts"),
    productPage: document.getElementById("productPage"),
    newsFilters: document.getElementById("newsFilters"),
    newsList: document.getElementById("newsList"),
    newsDetail: document.getElementById("newsDetail"),
    skillsCategories: document.getElementById("skillsCategories"),
    skillsLibrary: document.getElementById("skillsLibrary"),
    skillsDocPanel: document.getElementById("skillsDocPanel"),
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
    aihotCategoryFilter: "all",
    skillCategory: "visual-video",
    skillId: null,
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
  const SKILL_CATEGORIES = [
    { id: "visual-video", name: "视觉和视频", description: "图像生成、视频生成、视觉风格、UI 原型和品牌素材。" },
    { id: "work-experience", name: "工作经验", description: "复盘、研究、汇报、项目推进和个人知识工作流。" },
  ];
  const SKILL_ITEMS = [
    {
      id: "visual-direction",
      category: "visual-video",
      name: "视觉方向 Skill",
      intro: "把模糊想法变成可执行的视觉方向：风格、色彩、构图、参考和负面约束。",
      bestFor: ["封面", "海报", "品牌调性"],
      source: "Midjourney / ChatGPT Image / Firefly",
      doc: [
        "目标：根据主题产出 3 个视觉方向，每个方向包含风格关键词、构图建议、色彩方案和禁用元素。",
        "输入：项目主题、受众、使用场景、尺寸、已有品牌元素、参考图或参考链接。",
        "流程：先拆解情绪和受众，再给出方向 A/B/C，最后生成可直接复制到图像模型的提示词。",
        "输出：方向名称、适用场景、主提示词、负面提示词、二次迭代建议。"
      ],
    },
    {
      id: "image-editing",
      category: "visual-video",
      name: "图片精修 Skill",
      intro: "用于局部修改、扩图、换背景、统一风格，让图片从可用变成可发布。",
      bestFor: ["局部改图", "扩图", "统一风格"],
      source: "ChatGPT Image / Adobe Firefly",
      doc: [
        "目标：在不破坏主体识别度的前提下完成图片编辑，并保留原有构图逻辑。",
        "检查项：主体、背景、光线、文字、边缘、比例、品牌色、是否有多余元素。",
        "编辑顺序：先修结构，再修光影和颜色，最后处理文字、边缘和小瑕疵。",
        "输出：编辑指令、保留项、允许修改项、验收标准。"
      ],
    },
    {
      id: "video-shot",
      category: "visual-video",
      name: "视频镜头 Skill",
      intro: "把一句视频想法拆成镜头语言、动作、节奏和生成提示词。",
      bestFor: ["短视频", "分镜", "动态广告"],
      source: "Runway / Kling / Pika",
      doc: [
        "目标：把创意描述转成 5 到 8 秒的视频镜头方案。",
        "输入：主体、动作、场景、镜头运动、情绪、画幅、时长、参考风格。",
        "流程：先确定镜头类型，再写主体动作和环境变化，最后补充光线、材质和运动节奏。",
        "输出：镜头描述、视频提示词、避免事项、下一镜头衔接建议。"
      ],
    },
    {
      id: "ui-prototype",
      category: "visual-video",
      name: "UI 原型 Skill",
      intro: "把产品想法整理成页面结构、组件清单和可交互原型描述。",
      bestFor: ["Figma Make", "v0", "落地页面"],
      source: "Figma Make / v0 / Codex",
      doc: [
        "目标：将需求转成一个可实现的单页或多页原型。",
        "输入：目标用户、核心任务、页面数量、信息层级、品牌调性、限制条件。",
        "流程：先列主流程，再定义页面模块和状态，最后输出给设计或代码生成工具的指令。",
        "输出：页面地图、组件列表、交互状态、首屏文案和验收清单。"
      ],
    },
    {
      id: "brand-asset",
      category: "visual-video",
      name: "品牌素材 Skill",
      intro: "快速生成一套统一的 Logo 草案、配色、字体方向和社媒素材说明。",
      bestFor: ["品牌启动", "社媒图", "Logo 草案"],
      source: "Ideogram / Midjourney / Firefly",
      doc: [
        "目标：为一个新项目建立基础视觉识别方向。",
        "输入：品牌名、行业、关键词、禁用风格、目标人群、输出尺寸。",
        "流程：先确定品牌人格，再生成 3 套视觉路线，每套包含色彩、字体、图形和应用场景。",
        "输出：品牌关键词、Logo 提示词、社媒封面提示词、统一规范。"
      ],
    },
    {
      id: "visual-review",
      category: "visual-video",
      name: "视觉评审 Skill",
      intro: "用固定标准检查图片、页面或视频是否专业、清晰、有辨识度。",
      bestFor: ["设计评审", "发布前检查", "改版建议"],
      source: "Multimodal review",
      doc: [
        "目标：对视觉稿做结构化评审，指出最影响质量的 3 到 5 个问题。",
        "检查维度：层级、对比、留白、文字可读性、主体清晰度、品牌一致性、移动端适配。",
        "输出方式：先给结论，再列问题、影响、修改建议和优先级。",
        "限制：不要只给审美评价，必须落到具体修改动作。"
      ],
    },
    {
      id: "weekly-review",
      category: "work-experience",
      name: "周复盘 Skill",
      intro: "把一周工作整理成成果、问题、学习和下周行动，适合个人复盘。",
      bestFor: ["周报", "个人成长", "管理汇报"],
      source: "Claude Skills / Codex Skills",
      doc: [
        "目标：把零散记录整理成可读的周复盘。",
        "输入：本周任务、完成结果、遇到的问题、关键数据、下周计划。",
        "结构：本周成果、关键判断、阻塞问题、经验教训、下周 3 个重点。",
        "输出要求：语言具体，不写空泛总结，每个结论都对应事实或例子。"
      ],
    },
    {
      id: "project-brief",
      category: "work-experience",
      name: "项目简报 Skill",
      intro: "把项目状态压缩成一页简报，让他人快速知道进度、风险和下一步。",
      bestFor: ["项目同步", "老板汇报", "团队对齐"],
      source: "Docs / Slides workflow",
      doc: [
        "目标：输出一页项目状态简报。",
        "输入：目标、当前进展、关键里程碑、风险、需要决策的问题。",
        "结构：一句话状态、完成了什么、还差什么、风险等级、需要谁做什么决定。",
        "输出要求：避免流水账，突出状态变化和下一步动作。"
      ],
    },
    {
      id: "research-brief",
      category: "work-experience",
      name: "资料研究 Skill",
      intro: "把资料、链接和笔记整理成可判断的研究摘要，而不是单纯摘录。",
      bestFor: ["竞品研究", "行业资料", "学习笔记"],
      source: "Research agent workflow",
      doc: [
        "目标：将多来源资料整理成可执行判断。",
        "输入：研究问题、资料链接、已有假设、需要输出的格式。",
        "流程：先归类事实，再提炼模式，最后写出结论、证据和不确定性。",
        "输出：摘要、关键证据、反例、可行动建议、后续问题。"
      ],
    },
    {
      id: "meeting-to-action",
      category: "work-experience",
      name: "会议转行动 Skill",
      intro: "把会议记录转成清晰的决策、负责人、截止时间和待确认问题。",
      bestFor: ["会议纪要", "行动项", "跨团队协作"],
      source: "Work assistant workflow",
      doc: [
        "目标：从会议记录里提取可执行事项。",
        "输入：会议文本、参会人、项目背景、时间要求。",
        "输出：已决策事项、行动项、负责人、截止时间、待确认问题、风险提醒。",
        "规则：没有负责人或时间的信息必须标记为待确认，不要自行编造。"
      ],
    },
    {
      id: "decision-log",
      category: "work-experience",
      name: "决策日志 Skill",
      intro: "记录为什么这么选，保留背景、选项、取舍和复盘点。",
      bestFor: ["产品决策", "技术选型", "团队知识库"],
      source: "Knowledge workflow",
      doc: [
        "目标：沉淀一条可追溯的决策记录。",
        "输入：问题背景、候选方案、约束条件、参与人、最终选择。",
        "结构：决策结论、为什么现在决策、备选方案、取舍、风险、复盘时间。",
        "输出要求：让三个月后的自己能看懂当时为什么这样做。"
      ],
    },
    {
      id: "career-story",
      category: "work-experience",
      name: "经验故事 Skill",
      intro: "把工作经历整理成面试、述职或作品集里可讲清楚的案例。",
      bestFor: ["面试", "述职", "作品集"],
      source: "Career narrative workflow",
      doc: [
        "目标：把一段经历整理成有冲突、有行动、有结果的故事。",
        "输入：项目背景、你的角色、难点、行动、结果数据、学到的东西。",
        "结构：场景、任务、行动、结果、反思；如果缺数据，要补充可验证证据。",
        "输出：30 秒版本、2 分钟版本、作品集版本。"
      ],
    },
  ];
  const skillMap = Object.fromEntries(SKILL_ITEMS.map((item) => [item.id, item]));

  function routeForState() {
    if (state.view === "scene" && state.sceneId) {
      const parts = ["scene", state.sceneId];
      if (state.sceneSubFilter && state.sceneSubFilter !== "all") parts.push(state.sceneSubFilter);
      return `#/${parts.map(encodeURIComponent).join("/")}`;
    }
    if (state.view === "product" && state.productId) {
      return `#/product/${encodeURIComponent(state.productId)}`;
    }
    if (state.view === "news-detail" && state.newsId) {
      return `#/news/${encodeURIComponent(state.newsId)}`;
    }
    if (state.view === "news") return "#/news";
    if (state.view === "skills") {
      return state.skillId ? `#/skills/${encodeURIComponent(state.skillId)}` : "#/skills";
    }
    return "#/home";
  }

  function syncRoute() {
    const route = routeForState();
    if (window.location.hash !== route) {
      window.history.replaceState(null, "", route);
    }
  }

  function restoreRouteFromHash() {
    const parts = window.location.hash
      .replace(/^#\/?/, "")
      .split("/")
      .filter(Boolean)
      .map((part) => decodeURIComponent(part));
    const [view, id, subId] = parts;

    if (view === "scene" && sceneMap[id]) {
      state.sceneId = id;
      state.sceneSubFilter = subId && sceneMap[subId] ? subId : "all";
      showView("scene", { push: false, sync: false });
      return true;
    }
    if (view === "product" && productMap[id]) {
      state.productId = id;
      showView("product", { push: false, sync: false });
      return true;
    }
    if (view === "news" && id && newsMap[id]) {
      state.newsId = id;
      showView("news-detail", { push: false, sync: false });
      return true;
    }
    if (view === "news") {
      showView("news", { push: false, sync: false });
      return true;
    }
    if (view === "skills" && id && skillMap[id]) {
      state.skillId = id;
      state.skillCategory = skillMap[id].category;
      showView("skills", { push: false, sync: false });
      return true;
    }
    if (view === "skills") {
      state.skillId = null;
      showView("skills", { push: false, sync: false });
      return true;
    }
    if (view === "home") {
      showView("home", { push: false, sync: false });
      return true;
    }
    return false;
  }

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
    return cleanNewsText(n.oneLiner || n.summary?.oneSentence || (typeof n.summary === "string" ? n.summary : ""));
  }

  function newsTagHtml(n) {
    return (n.tags || [])
      .map((t) => `<span class="tag tag-static">${escapeHtml(cleanNewsText(t))}</span>`)
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
      s.type === "x" ? "X" : s.type === "release" ? "发布说明" : s.type === "blog" ? "官网" : "来源";
    return `${typeLabel} · ${s.author || s.name || "海外"}`;
  }

  function escapeHtml(text = "") {
    return String(text)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function cleanNewsText(text = "") {
    return String(text)
      .replace(/<img\b[^>]*>/gi, " ")
      .replace(/<br\s*\/?>/gi, " ")
      .replace(/<\/p>|<\/div>|<\/li>|<\/h[1-6]>/gi, " ")
      .replace(/<[^>]+>/g, " ")
      .replace(/&nbsp;/gi, " ")
      .replace(/&amp;/gi, "&")
      .replace(/&lt;/gi, "<")
      .replace(/&gt;/gi, ">")
      .replace(/&quot;/gi, '"')
      .replace(/&#39;|&apos;/gi, "'")
      .replace(/\s+/g, " ")
      .trim();
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

  function isBaiduProduct(p) {
    if (!p) return false;
    if ((p.name || "").includes("百度")) return true;
    if ((p.oneLiner || "").includes("百度")) return true;
    return (p.links || []).some((l) => /baidu\.com/i.test(l.url || ""));
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
      const feat = (featured.has(a.id) ? 0 : 1) - (featured.has(b.id) ? 0 : 1);
      if (feat !== 0) return feat;
      return (isBaiduProduct(a) ? 1 : 0) - (isBaiduProduct(b) ? 1 : 0);
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

  async function loadAihotFeed() {
    try {
      const res = await fetch(`./aihot-feed.json?t=${Date.now()}`);
      if (!res.ok) return;
      const data = await res.json();
      if (Array.isArray(data.items) && data.items.length) {
        aihotFeed = data;
      }
    } catch {
      /* 忽略，显示空状态 */
    }
  }

  function aihotSourceInitial(source) {
    const s = String(source || "?").trim();
    const ch = s.replace(/^[^\p{L}\p{N}]+/u, "").charAt(0);
    return (ch || "?").toUpperCase();
  }

  function shortenProductName(name) {
    return String(name || "")
      .replace(/^([A-Za-z]+\d+\.\d+)-[\w]+$/i, "$1")
      .replace(/\s+(Flash|Max|Pro|Ultra|Mini|Nano|Turbo)\b.*$/i, "")
      .trim();
  }

  function aihotProductLabel(item) {
    const title = (item.title || "").trim();
    const titleEn = (item.titleEn || "").trim();
    if (!title && !titleEn) return aihotSourceInitial(item.source);

    let m =
      title.match(/^([A-Za-z][\w.\-]*(?:\s[A-Za-z][\w.\-]*)?)\s*(?:发布|[：:])/u) ||
      title.match(/^([A-Za-z][\w.\-]+(?:\s[\w.\-]+)?)\s+(?:用|支持|助|以|开源)/u) ||
      titleEn.match(/^([A-Za-z][\w.\-]*(?:\s[A-Za-z][\w.\-]*)?)\s*[：:]/u);
    if (m) return shortenProductName(m[1]);

    m = title.match(/^(OpenAI|Anthropic|Google|Meta|Microsoft|DeepSeek)\s+(?:新模型\s+)?([A-Za-z][\w.\-]+)/u);
    if (m) return shortenProductName(m[2] || m[1]);

    m = title.match(
      /(Claude(?:\s[\w.\-]+)?|GPT[\w.\-]*|Gemini[\w.\-]*|Qwen[\w.\-]*|Grok|Codex|GLM[\w.\s.\-]*|DeepSeek[\w.\s.\-]*|Suno|Copilot[\w.\-]*|Replit[\w.\-]*)/iu
    );
    if (m) return shortenProductName(m[1]);

    m = title.match(/^([^\s：:，,。]{2,18})/u);
    if (m) return shortenProductName(m[1]);

    return aihotSourceInitial(item.source);
  }

  function aihotTimelineItemHtml(item, side) {
    const productLabel = aihotProductLabel(item);
    const originalUrl = item.url || "";
    const linkHtml = originalUrl
      ? `<a class="ms-link" href="${originalUrl}" target="_blank" rel="noopener noreferrer">阅读原文 ↗</a>`
      : item.aihotUrl
        ? `<a class="ms-link" href="${item.aihotUrl}" target="_blank" rel="noopener noreferrer">AI HOT 详情 ↗</a>`
        : "";
    return `
      <article class="ms-item ms-item--${side} reveal">
        <div class="ms-card">
          <div class="ms-card-head">
            <time class="ms-time">${item.time || ""}</time>
            <span class="ms-score">${item.score || ""}</span>
          </div>
          <h3 class="ms-title">${escapeHtml(item.title || "")}</h3>
          <p class="ms-source">${escapeHtml(item.source || "")}</p>
          <p class="ms-summary">${escapeHtml(item.summary || "")}</p>
          ${item.reason ? `<p class="ms-reason"><em>推荐理由</em>${escapeHtml(item.reason)}</p>` : ""}
          ${linkHtml}
        </div>
        <div class="ms-media" aria-hidden="true">
          <div class="ms-media-ring"></div>
          <div class="ms-product-name">${escapeHtml(productLabel)}</div>
        </div>
      </article>`;
  }

  function renderAihotTimeline(container, metaEl, { limit = 12 } = {}) {
    if (!container) return;

    if (!aihotFeed?.items?.length) {
      if (metaEl) metaEl.textContent = "精选快讯加载中或暂无数据";
      container.innerHTML = `<div class="ms-empty reveal">暂无 AI HOT 精选，请稍后刷新或运行 npm run aihot:fetch</div>`;
      return;
    }

    const updated = aihotFeed.updatedAt
      ? new Date(aihotFeed.updatedAt).toLocaleString("zh-CN", { hour12: false })
      : "";
    if (metaEl) {
      metaEl.innerHTML = `更新于 ${updated} · 共 ${aihotFeed.itemCount} 条 · 来源 <a href="https://aihot.virxact.com/" target="_blank" rel="noopener noreferrer">AI HOT</a>`;
    }

    const groups = aihotFeed.groups || [];
    let shown = 0;
    let globalIndex = 0;
    const parts = ['<div class="ms-axis" aria-hidden="true"></div>'];

    for (const group of groups) {
      if (shown >= limit) break;
      parts.push(`
        <header class="ms-day reveal">
          <div class="ms-day-badge">
            <span class="ms-day-main">${escapeHtml(group.dateLabel || "")}</span>
            <span class="ms-day-sub">${escapeHtml(group.weekday || "")}</span>
          </div>
        </header>`);

      for (const item of group.items || []) {
        if (shown >= limit) break;
        const side = globalIndex % 2 === 0 ? "left" : "right";
        parts.push(aihotTimelineItemHtml(item, side));
        globalIndex += 1;
        shown += 1;
      }
    }

    container.innerHTML = parts.join("");
    bindReveal();
  }

  function aihotDetailCardHtml(item) {
    const tags = (item.tags || [])
      .map((t) => `<span class="aihot-detail-tag">${escapeHtml(t)}</span>`)
      .join("");
    const dateTime = [item.dateLabel, item.time].filter(Boolean).join(" ");
    const originalUrl = item.url || item.aihotUrl || "";
    const aihotUrl = item.aihotUrl || item.url || "";

    return `
      <article class="aihot-detail-card reveal">
        <div class="aihot-detail-head">
          <span class="aihot-detail-cat">${escapeHtml(item.categoryName || "行业")}</span>
          ${item.score ? `<span class="aihot-detail-score">${item.score}</span>` : ""}
          ${dateTime ? `<time class="aihot-detail-time">${escapeHtml(dateTime)}</time>` : ""}
        </div>
        <h3 class="aihot-detail-title">${escapeHtml(item.title || "")}</h3>
        ${item.source ? `<p class="aihot-detail-source">${escapeHtml(item.source)}</p>` : ""}
        ${item.summary ? `<p class="aihot-detail-summary">${escapeHtml(item.summary)}</p>` : ""}
        ${item.reason ? `<blockquote class="aihot-detail-reason"><span class="aihot-detail-reason-label">推荐理由</span>${escapeHtml(item.reason)}</blockquote>` : ""}
        ${tags ? `<div class="aihot-detail-tags">${tags}</div>` : ""}
        <div class="aihot-detail-actions">
          ${originalUrl ? `<a class="aihot-detail-link" href="${originalUrl}" target="_blank" rel="noopener noreferrer">阅读原文 ↗</a>` : ""}
          ${aihotUrl ? `<a class="aihot-detail-link aihot-detail-link--muted" href="${aihotUrl}" target="_blank" rel="noopener noreferrer">AI HOT 详情 ↗</a>` : ""}
        </div>
      </article>`;
  }

  function renderAihotCategoryDetail() {
    const { aihotCategoryFilters, aihotCategoryMeta, aihotCategoryDetail } = els;
    if (!aihotCategoryDetail) return;

    if (!aihotFeed?.items?.length) {
      if (aihotCategoryFilters) aihotCategoryFilters.innerHTML = "";
      if (aihotCategoryMeta) aihotCategoryMeta.textContent = "";
      aihotCategoryDetail.innerHTML = `<div class="ms-empty reveal">暂无分类数据，请运行 npm run aihot:fetch</div>`;
      return;
    }

    const categories = aihotFeed.categories || [{ id: "all", name: "全部" }];
    const filter = state.aihotCategoryFilter || "all";

    if (aihotCategoryFilters) {
      aihotCategoryFilters.innerHTML = categories
        .map((cat) => {
          const count =
            cat.id === "all"
              ? aihotFeed.itemCount
              : (aihotFeed.categorySections || []).find((s) => s.id === cat.id)?.count ||
                aihotFeed.items.filter((i) => i.categoryId === cat.id).length;
          return `<button class="chip ${filter === cat.id ? "active" : ""}" type="button" data-aihot-category-filter="${cat.id}">${escapeHtml(cat.name)}${count ? ` · ${count}` : ""}</button>`;
        })
        .join("");
    }

    let html = "";
    let visibleCount = 0;

    if (filter === "all") {
      const sections = aihotFeed.categorySections || [];
      if (sections.length) {
        html = sections
          .map((section) => {
            visibleCount += section.items.length;
            return `
              <div class="aihot-category-group reveal">
                <header class="aihot-category-group-head">
                  <h3 class="aihot-category-group-title">${escapeHtml(section.name)}</h3>
                  <span class="aihot-category-group-count">${section.count} 条</span>
                </header>
                <div class="aihot-detail-grid aihot-detail-grid--group">
                  ${section.items.map((item) => aihotDetailCardHtml(item)).join("")}
                </div>
              </div>`;
          })
          .join("");
      } else {
        visibleCount = aihotFeed.items.length;
        html = `<div class="aihot-detail-grid aihot-detail-grid--group">${aihotFeed.items.map((item) => aihotDetailCardHtml(item)).join("")}</div>`;
      }
    } else {
      const items = aihotFeed.items.filter((i) => i.categoryId === filter);
      visibleCount = items.length;
      const catName = categories.find((c) => c.id === filter)?.name || filter;
      html = items.length
        ? `<div class="aihot-detail-grid aihot-detail-grid--group">${items.map((item) => aihotDetailCardHtml(item)).join("")}</div>`
        : `<div class="ms-empty reveal">${escapeHtml(catName)} 分类暂无快讯</div>`;
    }

    if (aihotCategoryMeta) {
      aihotCategoryMeta.textContent = filter === "all" ? `共 ${visibleCount} 条精选` : `当前分类 ${visibleCount} 条`;
    }

    aihotCategoryDetail.innerHTML = html;
    bindReveal();
  }

  function renderAihotSections() {
    renderAihotTimeline(els.aihotTimeline, els.aihotTimelineMeta, { limit: 10 });
    renderAihotTimeline(els.aihotTimelineFull, null, { limit: 12 });
    renderAihotCategoryDetail();
  }

  function newsStripItem(n) {
    return `
      <button class="news-strip-item" type="button" data-open-news="${n.id}">
        <span class="news-strip-title">${escapeHtml(cleanNewsText(n.title))}</span>
        ${newsSourceMeta(n) ? `<span class="news-strip-source">${escapeHtml(cleanNewsText(newsSourceLabel(n)))}</span>` : ""}
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
          <h3>${escapeHtml(cleanNewsText(n.title))}</h3>
        </div>
        <p class="summary">${escapeHtml(newsOneLiner(n))}</p>
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
    return sectionDefs.map(({ key, label, icon }) => {
      const ids = b.sections?.[key] || [];
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
        <span class="brief-chart-node brief-chart-node--source">来源 Agent</span>
        <span class="brief-chart-arrow">→</span>
        <span class="brief-chart-node brief-chart-node--tag">标签 Agent</span>
        <span class="brief-chart-arrow">→</span>
        <span class="brief-chart-node brief-chart-node--brief">AI 简报</span>
        <span class="brief-chart-arrow">→</span>
        <span class="brief-chart-node brief-chart-node--dash">数据看板</span>
      </div>`;

    const structureHtml = `
      <div class="brief-chart-structure">
        <div class="brief-chart-hub">
          <div class="brief-chart-hub-label">今日简报</div>
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
            <span>近期变化 · ${wc?.periodDays || 30} 天</span>
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
            <div class="section-label">简报总览</div>
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
      { key: "topUpdates", label: "🔥 重点更新", icon: "🔥" },
      { key: "newReleases", label: "🟢 最新发布", icon: "🟢" },
      { key: "insights", label: "🧠 AI 洞察", icon: "🧠" },
      { key: "emergingTrends", label: "📈 新兴趋势", icon: "📈" },
      { key: "newApis", label: "🏷 最新 API", icon: "🏷" },
      { key: "githubTrending", label: "🚀 GitHub 热门", icon: "🚀" },
      { key: "productHunt", label: "💼 Product Hunt 热门", icon: "💼" },
      { key: "xDiscussions", label: "💬 X 热议", icon: "💬" },
    ];

    const sectionsHtml = sectionDefs
      .map(({ key, label }) => {
        const ids = b.sections?.[key] || [];
        if (!ids.length) return "";
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

    els.newsBrief.innerHTML = `
      <section class="news-dashboard reveal">
        ${renderBriefSummaryChart(b, sectionDefs, wc)}
        <div class="news-brief-head">
          <h2>今日简报</h2>
          <span class="news-brief-meta">${b.date || ""} · 今日 ${b.todayCount ?? "—"} 条 · 档案 ${b.totalCount ?? news.length} 条</span>
        </div>
        ${topRows ? `<div class="news-brief-list">${topRows}</div>` : ""}
        ${sectionsHtml ? `<div class="news-dash-grid">${sectionsHtml}</div>` : ""}
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
          <h2>产品更新看板</h2>
          <span class="news-brief-meta">${list.length} 条近期发布 / 产品动态</span>
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

  function renderSkills() {
    if (!els.skillsCategories || !els.skillsLibrary || !els.skillsDocPanel) return;
    if (!SKILL_CATEGORIES.some((cat) => cat.id === state.skillCategory)) {
      state.skillCategory = "visual-video";
    }
    const currentItems = SKILL_ITEMS.filter((item) => item.category === state.skillCategory);
    if (!state.skillId || !currentItems.some((item) => item.id === state.skillId)) {
      state.skillId = currentItems[0]?.id || null;
    }
    const currentCategory = SKILL_CATEGORIES.find((cat) => cat.id === state.skillCategory);

    els.skillsCategories.innerHTML = SKILL_CATEGORIES.map(
      (cat) =>
        `<button class="chip ${state.skillCategory === cat.id ? "active" : ""}" type="button" data-skill-category="${cat.id}">
          ${escapeHtml(cat.name)}
        </button>`
    ).join("");

    els.skillsLibrary.innerHTML = `
      <div class="skills-library-head">
        <div>
          <div class="section-label">${escapeHtml(currentCategory?.name || "Skills")}</div>
          <h2>${escapeHtml(currentCategory?.description || "")}</h2>
        </div>
        <span>${currentItems.length} 条</span>
      </div>
      <div class="skills-grid skills-grid--library">
        ${currentItems.map(skillCard).join("")}
      </div>
    `;
    renderSkillDoc();
    bindReveal();
  }

  function skillCard(item) {
    const isActive = state.skillId === item.id;
    return `
      <button class="skill-card ${isActive ? "active" : ""}" type="button" data-open-skill="${item.id}">
        <span class="skill-card-type">${escapeHtml(item.source)}</span>
        <h3>${escapeHtml(item.name)}</h3>
        <p>${escapeHtml(item.intro)}</p>
        <div class="skill-tags">
          ${item.bestFor.map((tag) => `<span>${escapeHtml(tag)}</span>`).join("")}
        </div>
      </button>
    `;
  }

  function renderSkillDoc() {
    const item = skillMap[state.skillId] || SKILL_ITEMS.find((skill) => skill.category === state.skillCategory);
    if (!item) {
      els.skillsDocPanel.innerHTML = `<div class="empty reveal">暂无 Skill 文档</div>`;
      return;
    }
    els.skillsDocPanel.innerHTML = `
      <div class="skills-doc-sticky reveal">
        <div class="skills-doc-top">
          <span class="skill-card-type">${escapeHtml(SKILL_CATEGORIES.find((cat) => cat.id === item.category)?.name || "")}</span>
          <h2>${escapeHtml(item.name)}</h2>
          <p>${escapeHtml(item.intro)}</p>
        </div>
        <div class="skills-doc-block">
          <div class="section-label">Skill 文档片段</div>
          <pre><code>${escapeHtml(skillDocMarkdown(item))}</code></pre>
        </div>
      </div>
    `;
  }

  function skillDocMarkdown(item) {
    return [
      `# ${item.name}`,
      "",
      `## 简介`,
      item.intro,
      "",
      `## 适合场景`,
      item.bestFor.map((tag) => `- ${tag}`).join("\n"),
      "",
      `## 文档片段`,
      item.doc.map((line) => `- ${line}`).join("\n"),
      "",
      `## 使用方式`,
      "把上面的文档片段复制到你的 SKILL.md 或提示词模板中，再补充你的项目背景、输入样例和输出格式。"
    ].join("\n");
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
    initBannerInteraction();
  }

  let bannerInited = false;
  let bannerResizeObs = null;
  const bannerState = {
    offset: 0,
    dragging: false,
    lastX: 0,
    lastTime: 0,
    autoScroll: true,
    dragMoved: 0,
    suppressClick: false,
    halfWidth: 0,
    reduceMotion: false,
  };

  function measureBannerLoop() {
    const track = els.heroBanner;
    if (!track) return 0;
    return track.scrollWidth / 2;
  }

  function normalizeBannerOffset() {
    const half = bannerState.halfWidth;
    if (half <= 0) return;
    while (bannerState.offset <= -half) bannerState.offset += half;
    while (bannerState.offset > 0) bannerState.offset -= half;
  }

  function applyBannerTransform() {
    if (!els.heroBanner) return;
    els.heroBanner.style.transform = `translate3d(${bannerState.offset}px, 0, 0)`;
  }

  function bannerTick(now) {
    if (!els.heroBanner?.children.length) {
      requestAnimationFrame(bannerTick);
      return;
    }
    if (bannerState.halfWidth <= 0) {
      bannerState.halfWidth = measureBannerLoop();
    }
    if (
      !bannerState.reduceMotion &&
      bannerState.autoScroll &&
      !bannerState.dragging &&
      bannerState.halfWidth > 0
    ) {
      const dt = bannerState.lastTime ? Math.min(now - bannerState.lastTime, 48) : 16;
      bannerState.offset -= (bannerState.halfWidth / 48000) * dt;
      normalizeBannerOffset();
      applyBannerTransform();
    }
    bannerState.lastTime = now;
    requestAnimationFrame(bannerTick);
  }

  function initBannerInteraction() {
    const viewport = els.heroBannerViewport;
    const track = els.heroBanner;
    if (!viewport || !track || !track.children.length) return;

    track.classList.add("is-js-scroll");
    viewport.classList.add("is-js-scroll-ready");
    bannerState.halfWidth = measureBannerLoop();
    bannerState.reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    applyBannerTransform();

    if (!bannerInited) {
      bannerInited = true;

      viewport.addEventListener("pointerdown", (e) => {
        if (e.button !== 0) return;
        bannerState.dragging = true;
        bannerState.autoScroll = false;
        bannerState.lastX = e.clientX;
        bannerState.dragMoved = 0;
        viewport.classList.add("is-dragging");
        viewport.setPointerCapture(e.pointerId);
      });

      viewport.addEventListener("pointermove", (e) => {
        if (!bannerState.dragging) return;
        const dx = e.clientX - bannerState.lastX;
        bannerState.dragMoved += Math.abs(dx);
        bannerState.offset += dx;
        bannerState.lastX = e.clientX;
        normalizeBannerOffset();
        applyBannerTransform();
      });

      const endDrag = (e) => {
        if (!bannerState.dragging) return;
        bannerState.dragging = false;
        viewport.classList.remove("is-dragging");
        if (viewport.hasPointerCapture(e.pointerId)) {
          viewport.releasePointerCapture(e.pointerId);
        }
        if (bannerState.dragMoved > 8) {
          bannerState.suppressClick = true;
          window.setTimeout(() => {
            bannerState.suppressClick = false;
          }, 120);
        }
        window.setTimeout(() => {
          if (!bannerState.dragging) bannerState.autoScroll = true;
        }, 2200);
      };

      viewport.addEventListener("pointerup", endDrag);
      viewport.addEventListener("pointercancel", endDrag);

      track.addEventListener(
        "click",
        (e) => {
          if (!bannerState.suppressClick) return;
          const slot = e.target.closest(".banner-slot");
          if (slot) e.preventDefault();
        },
        true
      );

      viewport.addEventListener("mouseenter", () => {
        if (!bannerState.dragging) bannerState.autoScroll = false;
      });
      viewport.addEventListener("mouseleave", () => {
        if (!bannerState.dragging) bannerState.autoScroll = true;
      });

      if (!bannerResizeObs) {
        bannerResizeObs = new ResizeObserver(() => {
          bannerState.halfWidth = measureBannerLoop();
          normalizeBannerOffset();
          applyBannerTransform();
        });
        bannerResizeObs.observe(track);
      }

      requestAnimationFrame(bannerTick);
    }
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
    renderAihotSections();
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
                      `<button type="button" data-open-news="${n.id}"><strong>${escapeHtml(cleanNewsText(n.title))}</strong><span>${n.date}</span></button>`
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
    renderAihotSections();
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

  function showView(view, { push = true, sync = true } = {}) {
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
    if (view === "skills") renderSkills();

    setTab(view === "scene" || view === "product" ? "home" : view);
    window.scrollTo({ top: 0, behavior: "instant" in window ? "instant" : "auto" });

    let analyticsView = view;
    if (view === "product" && state.productId) analyticsView = `product:${state.productId}`;
    else if (view === "scene" && state.sceneId) analyticsView = `scene:${state.sceneId}`;
    else if (view === "news-detail" && state.newsId) analyticsView = `news-detail:${state.newsId}`;
    window.AIAnalytics?.logVisit?.({ view: analyticsView });
    if (sync) syncRoute();
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

    const t = e.target.closest("[data-nav], [data-open-scene], [data-open-category], [data-open-product], [data-open-news], [data-open-skill], [data-skill-category], [data-news-filter], [data-aihot-category-filter], [data-home-sub-filter], [data-scene-sub-filter], [data-home-section-page], [data-scroll], [data-brief-section]");
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
      if (t.dataset.nav === "home" || t.dataset.nav === "news" || t.dataset.nav === "skills") {
        state.history = [];
        clearSearch();
      }
      if (t.dataset.nav === "skills") {
        state.skillId = null;
      }
      showView(t.dataset.nav, { push: t.dataset.nav === "news" && state.view === "product" });
      return;
    }
    if (t.dataset.skillCategory) {
      state.skillCategory = t.dataset.skillCategory;
      state.skillId = null;
      renderSkills();
      syncRoute();
      return;
    }
    if (t.dataset.openSkill) {
      const skill = skillMap[t.dataset.openSkill];
      if (!skill) return;
      state.skillId = skill.id;
      state.skillCategory = skill.category;
      renderSkills();
      syncRoute();
      els.skillsDocPanel?.scrollIntoView({ behavior: "smooth", block: "start" });
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
      syncRoute();
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
      syncRoute();
      return;
    }
    if (t.dataset.aihotCategoryFilter !== undefined) {
      state.aihotCategoryFilter = t.dataset.aihotCategoryFilter;
      renderAihotCategoryDetail();
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

  window.addEventListener("hashchange", () => {
    if (restoreRouteFromHash()) {
      state.history = [];
      bindReveal();
    }
  });

  async function boot() {
    try {
      await Promise.all([loadNewsFeed(), loadAihotFeed()]);
      news = news.map(normalizeNewsItem);
      newsMap = Object.fromEntries(news.map((n) => [n.id, n]));
      if (!restoreRouteFromHash()) showView("home", { push: false, sync: false });
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
