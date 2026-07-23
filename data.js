window.AI_DATA = {
  scenes: [
    {
      id: "llm",
      name: "通用 LLM",
      icon: "脑",
      parent: null,
      blurb: "文字推理、文档阅读、问答写作——AI 的基础大脑",
      audience: "小白入门、办公白领、学生",
      tip: "先搞懂 LLM 和 Agent 的区别：LLM 等你提问，Agent 能自己拆任务干活。",
      concept: "通用大语言模型：被动问答、多轮对话，自带轻度 Agent 能力。"
    },
    {
      id: "visual",
      name: "视觉 AI",
      icon: "画",
      parent: null,
      blurb: "文生图、插画、设计稿——以视觉产出为核心",
      audience: "设计师、运营、自媒体创作者",
      tip: "说清主体、风格、用途，比堆形容词更有效。",
      concept: "核心产出图片与视觉素材，部分产品内置简易智能体。"
    },
    {
      id: "agent",
      name: "专业智能体 Agent",
      icon: "动",
      parent: null,
      blurb: "自主规划、联网检索、多步骤自动执行复杂任务",
      audience: "想提效的职场人、创业者、开发者",
      tip: "Agent = 会自己拆解任务、调用工具、循环执行的升级版 AI。",
      concept: "具备自主规划与工具调用能力，能连续完成整套复杂任务。"
    },
    {
      id: "vertical",
      name: "垂直细分 AI",
      icon: "垂",
      parent: null,
      blurb: "视频、音频、3D 建模、行业专用——聚焦单一赛道的 AI 工具",
      audience: "内容创作者、企业用户",
      tip: "垂直工具往往比通用模型在单点任务上更顺手。",
      concept: "在视频、音频、3D 或特定行业流程中深度优化的 AI 产品。"
    },
    {
      id: "agent-platform",
      name: "智能体搭建平台",
      icon: "搭",
      parent: "agent",
      blurb: "零代码拖拽，自定义文案、运营、客服等专属 Agent",
      audience: "运营、产品经理、小团队",
      tip: "先从模板改起，再逐步接入自己的知识库。",
      concept: "无代码搭建智能体，普通人也能创建自动化 AI。"
    },
    {
      id: "agent-office",
      name: "办公自动化 Agent",
      icon: "办",
      parent: "agent",
      blurb: "自动处理文档、Excel、网页、日程等办公流",
      audience: "白领、行政、项目经理",
      tip: "把重复性流程写清楚，让 Agent 按步骤执行。",
      concept: "桌面或云端 Agent，替你完成日常办公琐事。"
    },
    {
      id: "agent-code",
      name: "编程开发 Agent",
      icon: "码",
      parent: "agent",
      blurb: "自动写代码、查 Bug、重构项目",
      audience: "开发者、计算机专业学生",
      tip: "先让 Agent 读懂项目结构，再提具体改动需求。",
      concept: "代码专用 Agent，可独立完成开发任务片段。"
    },
    {
      id: "agent-research",
      name: "科研调研 Agent",
      icon: "研",
      parent: "agent",
      blurb: "全网检索、整合资料、生成长报告",
      audience: "分析师、研究员、学生写论文",
      tip: "明确调研范围和时间边界，避免信息过载。",
      concept: "多步骤检索与汇总，输出带来源的结构化报告。"
    },
    {
      id: "vertical-video",
      name: "AI 视频生成",
      icon: "影",
      parent: "vertical",
      blurb: "文生视频、镜头控制、短片与广告分镜",
      audience: "短视频创作者、广告从业者",
      tip: "先写脚本和分镜，再生成 3–5 秒镜头片段。",
      concept: "用 AI 生成或辅助视频镜头与成片。"
    },
    {
      id: "vertical-audio",
      name: "AI 音频 / 音乐",
      icon: "音",
      parent: "vertical",
      blurb: "AI 作曲、配音、语音转写",
      audience: "播客、视频博主、会议记录者",
      tip: "音频类工具对中文场景要试发音和转写准确率。",
      concept: "音乐创作、语音合成与转写类垂直工具。"
    },
    {
      id: "vertical-3d",
      name: "AI 3D 建模",
      icon: "立",
      parent: "vertical",
      blurb: "文生 3D、图生模型、贴图与网格优化",
      audience: "游戏美术、工业设计师、3D 打印爱好者",
      tip: "先明确用途（游戏/打印/展示），再选支持对应导出格式的工具。",
      concept: "从文字或图片快速生成可编辑的三维网格、贴图与场景资产。"
    },
    {
      id: "vertical-enterprise",
      name: "企业行业 Agent",
      icon: "企",
      parent: "vertical",
      blurb: "客服、团队流程、HR 等行业专用智能体",
      audience: "企业 IT、业务负责人",
      tip: "企业级产品通常需要对接现有系统与权限。",
      concept: "面向私域、团队或行业流程的定制 Agent。"
    }
  ],

  products: [
    // ── 通用 LLM · 国内 ──
    {
      id: "doubao",
      name: "豆包",
      region: "国内",
      logoFallback: "./logos/doubao.svg",
      oneLiner: "字节多模态一体化助手，图文、生图、联网、文档全能。",
      forWho: "完全小白、想一个 App 搞定多种 AI 需求的用户",
      pricing: "free",
      pricingLabel: "免费为主",
      categories: ["llm"],
      links: [
        { label: "官网", url: "https://www.doubao.com/" },
        { label: "网页对话", url: "https://www.doubao.com/chat/" }
      ],
      steps: ["下载 App 或打开网页，手机号登录。", "直接描述任务：写周报、翻译、总结文档。", "需要图片时切换生图模式，不满意就追问修改。"],
      alternatives: ["kimi", "qwen", "chatgpt"]
    },
    {
      id: "kimi",
      name: "Kimi",
      region: "国内",
      logoFallback: "./logos/kimi.svg",
      oneLiner: "月之暗面出品，百万字超长上下文，文献与批量文档处理强。",
      forWho: "经常读 PDF、合同、研报的白领和学生",
      pricing: "mix",
      pricingLabel: "免费 + 会员",
      categories: ["llm"],
      links: [
        { label: "官网", url: "https://www.kimi.com/" },
        { label: "国内入口", url: "https://kimi.moonshot.cn/" }
      ],
      steps: ["上传 PDF 或粘贴链接，先让它「用大纲总结」。", "再提具体任务：提炼风险点、写结论段落。", "长文档分段提问，避免一次问太多。"],
      alternatives: ["doubao", "deepseek", "claude"]
    },
    {
      id: "zhipu",
      name: "智谱清言",
      region: "国内",
      logoFallback: "./logos/zhipu.svg",
      oneLiner: "智谱 GLM 自研，政企、学术、代码、行业分析表现稳。",
      forWho: "需要国产自研、偏专业分析的用户",
      pricing: "mix",
      pricingLabel: "免费 + 付费",
      categories: ["llm"],
      links: [
        { label: "官网", url: "https://chatglm.cn/" },
        { label: "智谱开放平台", url: "https://open.bigmodel.cn/" }
      ],
      steps: ["从真实工作问题开始提问，感受回答风格。", "代码类问题可要求分步骤解释。", "涉及数据时附上样例，减少幻觉。"],
      alternatives: ["qwen", "deepseek", "ernie"]
    },
    {
      id: "deepseek",
      name: "DeepSeek",
      region: "国内",
      logoFallback: "./logos/deepseek.svg",
      oneLiner: "深度求索，长文本 + 代码能力极强，开源生态活跃。",
      forWho: "开发者、需要深度推理和长文分析的用户",
      pricing: "mix",
      pricingLabel: "免费额度 + API",
      categories: ["llm"],
      links: [
        { label: "官网", url: "https://chat.deepseek.com/" },
        { label: "开放平台", url: "https://platform.deepseek.com/" }
      ],
      steps: ["打开网页版，用自然语言描述复杂问题。", "写代码时说明语言和框架，要求带注释。", "长文先摘要再深挖细节。"],
      alternatives: ["kimi", "zhipu", "chatgpt"]
    },
    {
      id: "ernie",
      name: "文心一言",
      region: "国内",
      logoFallback: "./logos/ernie.svg",
      oneLiner: "百度文心大模型，搜索结合紧，配套千帆智能体平台。",
      forWho: "偏好百度生态、需要搜索增强问答的用户",
      pricing: "mix",
      pricingLabel: "免费 + 会员",
      categories: ["llm"],
      links: [
        { label: "官网", url: "https://yiyan.baidu.com/" },
        { label: "千帆平台", url: "https://cloud.baidu.com/product/wenxinworkshop" }
      ],
      steps: ["从生活或工作问题直接提问。", "写作时附上提纲，让它扩写而非从零编。", "事实类问题要求标注不确定处。"],
      alternatives: ["doubao", "qwen", "zhipu"]
    },
    {
      id: "qwen",
      name: "通义千问",
      region: "国内",
      logoFallback: "./logos/qwen.svg",
      oneLiner: "阿里通义系列，办公、数据、行业模板覆盖广。",
      forWho: "习惯阿里生态、要一体多用的办公用户",
      pricing: "mix",
      pricingLabel: "免费 + 付费",
      categories: ["llm"],
      links: [
        { label: "千问", url: "https://www.qianwen.com/" },
        { label: "通义入口", url: "https://tongyi.aliyun.com/qianwen" }
      ],
      steps: ["从写周报、翻译邮件等真实任务开始。", "贴草稿请它改语气，而不是从零生成。", "表格问题粘贴样例行说明口径。"],
      alternatives: ["doubao", "ernie", "kimi"]
    },
    // ── 通用 LLM · 海外 ──
    {
      id: "claude",
      name: "Claude",
      region: "海外",
      logoFallback: "./logos/claude.svg",
      oneLiner: "Anthropic 出品，超大上下文，法律文书与长报告写作专业。",
      forWho: "对文字质量要求高、常处理长文档的用户",
      pricing: "mix",
      pricingLabel: "免费额度 + 订阅",
      categories: ["llm"],
      links: [
        { label: "官网", url: "https://claude.ai/" },
        { label: "产品介绍", url: "https://www.anthropic.com/claude" }
      ],
      steps: ["上传或粘贴原文，说明读者是谁。", "要求结构、语气、长度三选一优先。", "让它给出改动说明，方便学习写法。"],
      alternatives: ["chatgpt", "gemini", "kimi"]
    },
    {
      id: "chatgpt",
      name: "ChatGPT",
      region: "海外",
      logoFallback: "./logos/chatgpt.svg",
      oneLiner: "OpenAI GPT-4o/o1，全球通用，内置 Operator 网页操作智能体。",
      forWho: "需要英文沟通、创意 brainstorm 的用户",
      pricing: "mix",
      pricingLabel: "免费 + Plus",
      categories: ["llm"],
      links: [
        { label: "官网", url: "https://chatgpt.com/" },
        { label: "OpenAI", url: "https://openai.com/chatgpt/overview/" }
      ],
      steps: ["用一句话定义角色：「你是资深产品经理」。", "给背景、限制、输出格式。", "复杂任务让它先问 3 个澄清问题。"],
      alternatives: ["claude", "gemini", "doubao"]
    },
    {
      id: "gemini",
      name: "Gemini",
      region: "海外",
      logoFallback: "./logos/gemini.svg",
      oneLiner: "谷歌全模态模型，文本/图像/音频/视频，实时联网。",
      forWho: "谷歌生态用户、需要多模态与联网的用户",
      pricing: "mix",
      pricingLabel: "免费 + Advanced",
      categories: ["llm"],
      links: [
        { label: "Gemini", url: "https://gemini.google.com/" },
        { label: "Google AI", url: "https://ai.google.dev/" }
      ],
      steps: ["登录 Google 账号打开 Gemini。", "可上传图片、文档做多模态问答。", "需要最新信息时开启联网搜索。"],
      alternatives: ["chatgpt", "claude", "qwen"]
    },

    // ── 视觉 AI · 国产 ──
    {
      id: "jimeng",
      name: "即梦",
      region: "国内",
      logoFallback: "./logos/jimeng.svg",
      oneLiner: "字节出品，商用插画、实景、国风、海报，小白易上手。",
      forWho: "不想写英文提示词的创作者和运营",
      pricing: "mix",
      pricingLabel: "免费额度 + 付费",
      categories: ["visual"],
      links: [
        { label: "官网", url: "https://jimeng.jianying.com/" },
        { label: "创作入口", url: "https://jimeng.jianying.com/ai-tool/home" }
      ],
      steps: ["用中文写清画面里有什么。", "加风格词：扁平插画 / 写实 / 国风。", "保存满意结果后再局部修改。"],
      alternatives: ["tongyi-wanxiang", "midjourney", "lovart"]
    },
    {
      id: "lovart",
      name: "Lovart",
      region: "国内",
      logoFallback: "./logos/lovart.svg",
      oneLiner: "艺术向二次元、概念原画、氛围感插画生成。",
      forWho: "插画师、二次元爱好者、概念设计入门者",
      pricing: "mix",
      pricingLabel: "免费试用 + 付费",
      categories: ["visual"],
      links: [{ label: "官网", url: "https://www.lovart.ai/" }],
      steps: ["选择偏艺术/二次元的风格模板。", "描述角色、场景、光影氛围。", "多生成几版再精修方向。"],
      alternatives: ["jimeng", "midjourney", "yige"]
    },
    {
      id: "tongyi-wanxiang",
      name: "通义万相",
      region: "国内",
      logoFallback: "./logos/tongyi-wanxiang.svg",
      oneLiner: "阿里 AIGC，实景、商品图、人像修图全能。",
      forWho: "电商运营、需要商品图和海报的用户",
      pricing: "mix",
      pricingLabel: "免费额度 + 付费",
      categories: ["visual"],
      links: [{ label: "通义万相", url: "https://tongyi.aliyun.com/wanxiang/" }],
      steps: ["明确用途：商品主图、海报还是人像。", "上传参考图可提升一致性。", "导出前检查文字与 Logo 是否正确。"],
      alternatives: ["jimeng", "yige", "dalle3"]
    },
    {
      id: "yige",
      name: "文心一格",
      region: "国内",
      logoFallback: "./logos/yige.svg",
      oneLiner: "百度出品，国风、国画、文创设计有优势。",
      forWho: "文创、国风设计、传统文化相关创作",
      pricing: "mix",
      pricingLabel: "免费 + 付费",
      categories: ["visual"],
      links: [{ label: "文心一格", url: "https://yige.baidu.com/" }],
      steps: ["选择国风/水墨等风格预设。", "描述主体与构图，避免过于抽象。", "商用前确认授权说明。"],
      alternatives: ["jimeng", "tongyi-wanxiang", "lovart"]
    },
    // ── 视觉 AI · 海外 ──
    {
      id: "midjourney",
      name: "Midjourney",
      region: "海外",
      logoFallback: "./logos/midjourney.svg",
      oneLiner: "艺术质感天花板，插画与概念设计首选。",
      forWho: "设计师、追求高质量视觉的用户",
      pricing: "paid",
      pricingLabel: "付费订阅",
      categories: ["visual"],
      links: [
        { label: "官网", url: "https://www.midjourney.com/" },
        { label: "Web App", url: "https://www.midjourney.com/app/" }
      ],
      steps: ["用英文描述主体 + 风格 + 用途。", "先出 4 张挑方向，再 refine。", "商用前确认授权与品牌规范。"],
      alternatives: ["jimeng", "stable-diffusion", "dalle3"]
    },
    {
      id: "stable-diffusion",
      name: "Stable Diffusion",
      region: "海外",
      logoFallback: "./logos/stable-diffusion.svg",
      oneLiner: "开源可本地部署，高度自定义，社区模型丰富。",
      forWho: "有显卡、想深度控图的技术用户",
      pricing: "free",
      pricingLabel: "开源免费",
      categories: ["visual"],
      links: [
        { label: "Stability AI", url: "https://stability.ai/" },
        { label: "Hugging Face", url: "https://huggingface.co/stabilityai" }
      ],
      steps: ["选择 WebUI 或 ComfyUI 等前端。", "从基础模型和 LoRA 入门。", "小批量试参数再批量出图。"],
      alternatives: ["midjourney", "jimeng", "dalle3"]
    },
    {
      id: "dalle3",
      name: "DALL·E 3",
      region: "海外",
      logoFallback: "./logos/dalle3.svg",
      oneLiner: "OpenAI 文生图，写实、产品图、简单创意图表现好。",
      forWho: "已用 ChatGPT、需要快速出产品图的用户",
      pricing: "mix",
      pricingLabel: "随 ChatGPT / API",
      categories: ["visual"],
      links: [{ label: "ChatGPT 生图", url: "https://chatgpt.com/" }],
      steps: ["在 ChatGPT 中直接描述要生成的图。", "说明比例、风格、是否含文字。", "复杂构图分步描述。"],
      alternatives: ["midjourney", "tongyi-wanxiang", "jimeng"]
    },

    // ── Agent · 搭建平台 ──
    {
      id: "coze",
      name: "Coze 扣子",
      region: "国内",
      logoFallback: "./logos/coze.svg",
      oneLiner: "字节零代码平台，自媒体、电商、知识库智能体模板多。",
      forWho: "运营、自媒体、想自建 Bot 的非程序员",
      pricing: "mix",
      pricingLabel: "免费 + 付费",
      categories: ["agent-platform"],
      links: [
        { label: "扣子", url: "https://www.coze.cn/" },
        { label: "Coze 国际版", url: "https://www.coze.com/" }
      ],
      steps: ["选一个接近需求的模板。", "填入知识库或 FAQ 文档。", "测试多轮对话后发布到微信/飞书等。"],
      alternatives: ["dify", "qianfan", "bailian"]
    },
    {
      id: "qianfan",
      name: "百度千帆 AppBuilder",
      region: "国内",
      logoFallback: "./logos/qianfan.svg",
      oneLiner: "企业级智能体搭建，政务、工业、行业流程支持强。",
      forWho: "企业 IT、政务与行业数字化团队",
      pricing: "mix",
      pricingLabel: "企业付费",
      categories: ["agent-platform"],
      links: [{ label: "千帆 AppBuilder", url: "https://cloud.baidu.com/product/wenxinworkshop" }],
      steps: ["明确业务场景与数据源。", "用可视化流程编排 Agent。", "对接内部系统前先做小范围试点。"],
      alternatives: ["bailian", "coze", "dify"]
    },
    {
      id: "bailian",
      name: "阿里云百炼",
      region: "国内",
      logoFallback: "./logos/bailian.svg",
      oneLiner: "海量行业 Agent 模板，对接高德、无影等阿里生态。",
      forWho: "阿里云用户、需要行业模板的企业",
      pricing: "mix",
      pricingLabel: "按量 / 企业",
      categories: ["agent-platform"],
      links: [{ label: "百炼平台", url: "https://bailian.console.aliyun.com/" }],
      steps: ["在控制台创建应用或 Agent。", "选择模型与知识库插件。", "通过 API 或页面嵌入业务。"],
      alternatives: ["qianfan", "coze", "dify"]
    },
    {
      id: "dify",
      name: "Dify",
      region: "国内/开源",
      logoFallback: "./logos/dify.svg",
      oneLiner: "开源免费，自建知识库 + 智能体，适合个人与小团队。",
      forWho: "想私有化部署、有一定技术基础的用户",
      pricing: "free",
      pricingLabel: "开源 + 云服务",
      categories: ["agent-platform"],
      links: [
        { label: "官网", url: "https://dify.ai/" },
        { label: "GitHub", url: "https://github.com/langgenius/dify" }
      ],
      steps: ["Docker 一键部署或使用 Dify Cloud。", "创建知识库并上传文档。", "编排工作流后发布 API 或 WebApp。"],
      alternatives: ["coze", "bailian", "qianfan"]
    },
    {
      id: "arkclaw",
      name: "ArkClaw",
      region: "国内",
      logoFallback: "./logos/arkclaw.svg",
      oneLiner: "火山引擎云端自动化 Agent，处理表格、浏览器任务。",
      forWho: "字节/火山生态用户、需云端自动化的团队",
      pricing: "mix",
      pricingLabel: "企业 / 按量",
      categories: ["agent-platform"],
      links: [{ label: "火山引擎", url: "https://www.volcengine.com/" }],
      steps: ["了解火山方舟与 Agent 产品线。", "定义自动化任务边界。", "在测试环境验证后再上线。"],
      alternatives: ["coze", "dify", "multion"]
    },

    // ── Agent · 办公自动化 ──
    {
      id: "dumate",
      name: "DuMate 百度搭子",
      region: "国内",
      logoFallback: "./logos/dumate.svg",
      oneLiner: "桌面端办公 Agent，自动整理 Excel、生成 PPT、浏览器操作。",
      forWho: "重度 Excel/PPT 用户、想减少重复劳动的白领",
      pricing: "mix",
      pricingLabel: "免费试用 + 付费",
      categories: ["agent-office"],
      links: [{ label: "百度智能云", url: "https://cloud.baidu.com/" }],
      steps: ["安装桌面客户端并登录。", "描述要完成的一整套办公任务。", "先在小文件上试跑再批量用。"],
      alternatives: ["workbuddy", "lindy", "coze"]
    },
    {
      id: "workbuddy",
      name: "WorkBuddy",
      region: "国内",
      logoFallback: "./logos/workbuddy.svg",
      oneLiner: "腾讯个人办公 Agent，自动写周报、整理资料、定时任务。",
      forWho: "腾讯生态用户、需要个人办公助手的白领",
      pricing: "mix",
      pricingLabel: "内测 / 会员",
      categories: ["agent-office"],
      links: [{ label: "腾讯", url: "https://www.tencent.com/" }],
      steps: ["关注官方内测或发布渠道。", "连接日历、文档等常用工具。", "从周报、纪要等高频场景试起。"],
      alternatives: ["dumate", "lindy", "doubao"]
    },
    {
      id: "lindy",
      name: "Lindy",
      region: "海外",
      logoFallback: "./logos/lindy.svg",
      oneLiner: "海外私人助理 Agent，自动收发邮件、排日程、调研资料。",
      forWho: "涉外办公、邮件与日程繁忙的用户",
      pricing: "mix",
      pricingLabel: "订阅制",
      categories: ["agent-office"],
      links: [{ label: "官网", url: "https://www.lindy.ai/" }],
      steps: ["连接 Gmail、Calendar 等账号。", "创建自动化工作流（Workflow）。", "从单一任务开始逐步扩展。"],
      alternatives: ["multion", "workbuddy", "chatgpt"]
    },
    {
      id: "multion",
      name: "MultiOn",
      region: "海外",
      logoFallback: "./logos/multion.svg",
      oneLiner: "网页自动化 Agent，自动爬取、汇总网页数据。",
      forWho: "需要批量网页信息采集与分析的用户",
      pricing: "mix",
      pricingLabel: "免费 + Pro",
      categories: ["agent-office"],
      links: [{ label: "官网", url: "https://www.multion.ai/" }],
      steps: ["安装浏览器插件或客户端。", "描述要在网页上完成的操作链。", "遵守网站 robots 与合规要求。"],
      alternatives: ["lindy", "arkclaw", "deep-research"]
    },

    // ── Agent · 编程开发 ──
    {
      id: "cursor",
      name: "Cursor",
      region: "海外",
      logoFallback: "./logos/cursor.svg",
      oneLiner: "AI 原生 IDE，读懂全项目、查 Bug、批量改代码。",
      forWho: "开发者、想 AI 辅助写代码的程序员",
      pricing: "mix",
      pricingLabel: "免费 + Pro",
      categories: ["agent-code"],
      links: [
        { label: "官网", url: "https://cursor.com/" },
        { label: "下载", url: "https://cursor.com/downloads" }
      ],
      steps: ["用 Cursor 打开现有项目。", "Cmd+K 局部编辑，Chat 问架构问题。", "Agent 模式让它跨文件完成小功能。"],
      alternatives: ["trae", "claude-code", "devin"]
    },
    {
      id: "devin",
      name: "Devin",
      region: "海外",
      logoFallback: "./logos/devin.svg",
      oneLiner: "Cognition 全栈开发 Agent，可独立完成项目开发与部署。",
      forWho: "想体验「AI 程序员」的开发者与团队",
      pricing: "paid",
      pricingLabel: "企业订阅",
      categories: ["agent-code"],
      links: [{ label: "Cognition", url: "https://cognition.ai/" }],
      steps: ["申请或订阅 Devin 访问权限。", "用自然语言描述完整需求与验收标准。", "分阶段 review 代码与部署结果。"],
      alternatives: ["cursor", "claude-code", "trae"]
    },
    {
      id: "claude-code",
      name: "Claude Code",
      region: "海外",
      logoFallback: "./logos/claude-code.svg",
      oneLiner: "Claude 专属代码 Agent，擅长百万行级项目重构。",
      forWho: "大型代码库维护、重构需求的团队",
      pricing: "mix",
      pricingLabel: "随 Claude 订阅",
      categories: ["agent-code"],
      links: [
        { label: "Claude", url: "https://claude.ai/" },
        { label: "Anthropic 文档", url: "https://docs.anthropic.com/" }
      ],
      steps: ["在终端或 IDE 集成 Claude Code。", "先让它分析项目结构与依赖。", "小步提交，每步跑测试。"],
      alternatives: ["cursor", "devin", "deepseek"]
    },
    {
      id: "trae",
      name: "Trae",
      region: "国内",
      logoFallback: "./logos/trae.svg",
      oneLiner: "字节轻量化编程 Agent，免费轻量代码辅助。",
      forWho: "学生、初级开发者、想免费试编程 AI 的人",
      pricing: "free",
      pricingLabel: "免费为主",
      categories: ["agent-code"],
      links: [{ label: "Trae", url: "https://www.trae.ai/" }],
      steps: ["下载 Trae IDE 并导入项目。", "用对话描述要实现的函数或页面。", "结合官方教程熟悉快捷键。"],
      alternatives: ["cursor", "deepseek", "claude-code"]
    },

    // ── Agent · 科研调研 ──
    {
      id: "deep-research",
      name: "OpenAI Deep Research",
      region: "海外",
      logoFallback: "./logos/deep-research.svg",
      oneLiner: "多步骤全网调研，生成带引用的深度行业报告。",
      forWho: "分析师、投资研究、行业报告撰写者",
      pricing: "paid",
      pricingLabel: "ChatGPT Pro 等",
      categories: ["agent-research"],
      links: [{ label: "ChatGPT", url: "https://chatgpt.com/" }],
      steps: ["在 ChatGPT 中选择 Deep Research 模式。", "明确行业、时间范围、报告结构。", "核对引用来源与数据时效。"],
      alternatives: ["gpt-researcher", "aomni", "kimi"]
    },
    {
      id: "gpt-researcher",
      name: "GPT Researcher",
      region: "海外/开源",
      logoFallback: "./logos/gpt-researcher.svg",
      oneLiner: "学术与市场调研 Agent，自动溯源文献与网页。",
      forWho: "研究人员、写论文与行业报告的学生",
      pricing: "free",
      pricingLabel: "开源 + API 成本",
      categories: ["agent-research"],
      links: [{ label: "GitHub", url: "https://github.com/assafelovic/gpt-researcher" }],
      steps: ["本地部署或使用 Demo。", "输入研究主题与深度要求。", "检查参考文献链接有效性。"],
      alternatives: ["deep-research", "aomni", "kimi"]
    },
    {
      id: "aomni",
      name: "Aomni",
      region: "海外",
      logoFallback: "./logos/aomni.svg",
      oneLiner: "数据采集 Agent，批量抓取、清洗网页行业数据。",
      forWho: "市场研究、竞品分析、数据收集岗位",
      pricing: "mix",
      pricingLabel: "订阅制",
      categories: ["agent-research"],
      links: [{ label: "官网", url: "https://www.aomni.com/" }],
      steps: ["定义要采集的网站与字段。", "设置清洗与导出规则。", "合规前提下控制频率与范围。"],
      alternatives: ["multion", "gpt-researcher", "deep-research"]
    },

    // ── 垂直 · 视频 ──
    {
      id: "tapnow",
      name: "TapNow",
      region: "国内",
      logoFallback: "./logos/tapnow.svg",
      oneLiner: "智能体创意画布，统一调度多模型，从脚本到影视级成片一站式。",
      forWho: "广告、短片、电商视频创作者，想用节点工作流控全流程的人",
      pricing: "mix",
      pricingLabel: "免费额度 + 订阅",
      categories: ["vertical-video"],
      links: [
        { label: "官网", url: "https://www.tapnow.ai/zh" },
        { label: "开始创作", url: "https://app.tapnow.ai/" }
      ],
      steps: ["新建画布或选用社区工作流模板。", "用 Agent 对话拆解脚本与分镜。", "逐节点生成并微调镜头、光影与连续性。"],
      alternatives: ["libtv", "flova", "kling"]
    },
    {
      id: "libtv",
      name: "LibTV",
      region: "国内",
      logoFallback: "./logos/libtv.svg",
      oneLiner: "LiblibAI 出品，无限画布 + 节点流，从剧本到成片全自动。",
      forWho: "短剧、漫剧、广告分镜与 Agent 自动拍片创作者",
      pricing: "mix",
      pricingLabel: "会员 / 按量",
      categories: ["vertical-video"],
      links: [
        { label: "官网", url: "https://www.liblib.tv/" },
        { label: "LiblibAI", url: "https://www.liblib.art/" }
      ],
      steps: ["点击「开始创作」进入无限画布。", "串联剧本、分镜、图像与视频节点。", "需要全自动时可接入 LibTV Skill + Access Key。"],
      alternatives: ["tapnow", "flova", "kling"]
    },
    {
      id: "flova",
      name: "Flova",
      region: "海外",
      logoFallback: "./logos/flova.svg",
      oneLiner: "AI 视频 Agent，对话驱动脚本、分镜、配音配乐到成片剪辑。",
      forWho: "动画短片、影视预演、想用 Skill 固化工作流的创作者",
      pricing: "mix",
      pricingLabel: "免费试用 + 订阅",
      categories: ["vertical-video"],
      links: [
        { label: "官网", url: "https://www.flova.ai/zh-CN/" },
        { label: "文档", url: "https://www.flova.ai/docs/en/Getting-Started" }
      ],
      steps: ["用自然语言描述故事或上传参考素材。", "与 Agent 协作完成分镜与多模型生成。", "把常用流程保存为 Skill 复用。"],
      alternatives: ["tapnow", "libtv", "runway"]
    },
    {
      id: "kling",
      name: "可灵",
      region: "国内",
      logoFallback: "./logos/kling.svg",
      oneLiner: "快手 AI 视频，镜头控制与运动稳定性国内领先。",
      forWho: "短视频创作者、广告分镜试片",
      pricing: "mix",
      pricingLabel: "积分 / 会员",
      categories: ["vertical-video"],
      links: [
        { label: "官网", url: "https://klingai.com/" },
        { label: "国内入口", url: "https://klingai.kuaishou.com/" }
      ],
      steps: ["写 1 句镜头描述：人物、动作、场景。", "生成 5 秒片段评估稳定性。", "用剪辑软件拼接旁白字幕。"],
      alternatives: ["tapnow", "libtv", "runway", "pika", "jimeng"]
    },
    {
      id: "pika",
      name: "Pika",
      region: "海外",
      logoFallback: "./logos/pika.svg",
      oneLiner: "海外热门文生视频，特效与风格化镜头丰富。",
      forWho: "追求创意视频效果的创作者",
      pricing: "mix",
      pricingLabel: "免费 + 订阅",
      categories: ["vertical-video"],
      links: [{ label: "官网", url: "https://pika.art/" }],
      steps: ["注册并熟悉文生视频界面。", "短 prompt 先试再加长。", "注意各版本时长与分辨率限制。"],
      alternatives: ["tapnow", "flova", "kling", "sora"]
    },
    {
      id: "runway",
      name: "Runway",
      region: "海外",
      logoFallback: "./logos/runway.svg",
      oneLiner: "专业 AI 视频工具，Gen-3 等模型适合广告与短片。",
      forWho: "视频从业者、广告创意团队",
      pricing: "mix",
      pricingLabel: "订阅 + 积分",
      categories: ["vertical-video"],
      links: [{ label: "Runway", url: "https://runwayml.com/" }],
      steps: ["从 Gen-3 等模型入门。", "结合 Image to Video 工作流。", "导出后在专业软件里精修。"],
      alternatives: ["tapnow", "flova", "kling", "pika"]
    },
    {
      id: "sora",
      name: "Sora",
      region: "海外",
      logoFallback: "./logos/sora.svg",
      oneLiner: "OpenAI 文生视频，长镜头与物理模拟受关注。",
      forWho: "关注前沿视频 AI 的创作者与研究者",
      pricing: "mix",
      pricingLabel: "逐步开放",
      categories: ["vertical-video"],
      links: [{ label: "OpenAI Sora", url: "https://openai.com/sora" }],
      steps: ["关注 OpenAI 官方开放政策。", "准备清晰的场景与运镜描述。", "与传统剪辑流程结合使用。"],
      alternatives: ["tapnow", "libtv", "runway", "kling"]
    },

    // ── 垂直 · 音频 ──
    {
      id: "suno",
      name: "Suno",
      region: "海外",
      logoFallback: "./logos/suno.svg",
      oneLiner: "AI 作曲与歌曲生成，输入描述即可出完整音乐。",
      forWho: "视频配乐、音乐爱好者、内容创作者",
      pricing: "mix",
      pricingLabel: "免费 + Pro",
      categories: ["vertical-audio"],
      links: [{ label: "Suno", url: "https://suno.com/" }],
      steps: ["描述风格、情绪、是否含人声。", "生成多版选最贴近的。", "商用前查看版权与订阅条款。"],
      alternatives: ["elevenlabs", "iflytek"]
    },
    {
      id: "elevenlabs",
      name: "ElevenLabs",
      region: "海外",
      logoFallback: "./logos/elevenlabs.svg",
      oneLiner: "高质量 AI 配音与声音克隆，多语言支持。",
      forWho: "播客、视频旁白、多语言内容制作",
      pricing: "mix",
      pricingLabel: "免费 + 订阅",
      categories: ["vertical-audio"],
      links: [{ label: "官网", url: "https://elevenlabs.io/" }],
      steps: ["选择或克隆音色。", "粘贴文案调整语速与情感。", "导出音频接入剪辑流程。"],
      alternatives: ["suno", "iflytek"]
    },
    {
      id: "iflytek",
      name: "讯飞听见",
      region: "国内",
      logoFallback: "./logos/iflytek.svg",
      oneLiner: "语音转写与会议纪要，中文会议场景成熟。",
      forWho: "会议多、需要纪要与待办的职场人",
      pricing: "mix",
      pricingLabel: "免费额度 + 付费",
      categories: ["vertical-audio"],
      links: [{ label: "官网", url: "https://www.iflyrec.com/" }],
      steps: ["会议录音或上传音频。", "转写后按决议/待办/风险整理。", "同步待办到清单或群公告。"],
      alternatives: ["doubao", "kimi", "elevenlabs"]
    },

    // ── 垂直 · 3D 建模 ──
    {
      id: "meshy",
      name: "Meshy",
      region: "海外",
      logoFallback: "./logos/meshy.svg",
      oneLiner: "文生 3D / 图生 3D 热门工具，支持 PBR 贴图与多格式导出。",
      forWho: "游戏 indie 开发者、3D 打印、想快速出原型的创作者",
      pricing: "mix",
      pricingLabel: "免费额度 + 订阅",
      categories: ["vertical-3d"],
      links: [
        { label: "官网", url: "https://www.meshy.ai/" },
        { label: "工作台", url: "https://www.meshy.ai/workspace" }
      ],
      steps: ["用文字描述主体、风格与用途（游戏/打印）。", "生成后检查面数与拓扑，必要时重拓扑。", "导出 GLB/OBJ/FBX 接入 Blender 或 Unity。"],
      alternatives: ["tripo", "hunyuan3d", "rodin"]
    },
    {
      id: "tripo",
      name: "Tripo",
      region: "海外",
      logoFallback: "./logos/tripo.svg",
      oneLiner: "生成速度快，图生 3D 效果稳，适合概念草模与批量试形。",
      forWho: "需要快速迭代多个 3D 方案的产品与设计团队",
      pricing: "mix",
      pricingLabel: "免费 + 订阅",
      categories: ["vertical-3d"],
      links: [
        { label: "官网", url: "https://www.tripo3d.ai/" },
        { label: "创作入口", url: "https://studio.tripo3d.ai/" }
      ],
      steps: ["上传参考图或写简短 prompt。", "对比多个生成版本选方向。", "导出后在 DCC 软件里精修细节。"],
      alternatives: ["meshy", "rodin", "luma-genie"]
    },
    {
      id: "hunyuan3d",
      name: "腾讯混元 3D",
      region: "国内",
      logoFallback: "./logos/hunyuan3d.svg",
      oneLiner: "腾讯混元文/图生 3D，中文 prompt 友好，适合国内创作者。",
      forWho: "游戏、影视预览、电商 3D 展示等国内团队",
      pricing: "mix",
      pricingLabel: "免费试用 + 按量",
      categories: ["vertical-3d"],
      links: [
        { label: "混元 3D", url: "https://3d.hunyuan.tencent.com/" },
        { label: "混元大模型", url: "https://hunyuan.tencent.com/" }
      ],
      steps: ["用中文描述物体结构、材质与风格。", "生成后预览多视角，检查结构是否合理。", "导出模型接入现有渲染或引擎流程。"],
      alternatives: ["meshy", "tripo", "rodin"]
    },
    {
      id: "rodin",
      name: "Rodin (Hyper3D)",
      region: "海外",
      logoFallback: "./logos/rodin.svg",
      oneLiner: "Hyper3D 出品，高保真 3D 生成，角色与道具质感突出。",
      forWho: "追求模型质量的游戏美术、虚拟人相关创作",
      pricing: "mix",
      pricingLabel: "积分 / 订阅",
      categories: ["vertical-3d"],
      links: [
        { label: "Hyper3D", url: "https://hyper3d.ai/" },
        { label: "Rodin 生成", url: "https://hyper3d.ai/rodin" }
      ],
      steps: ["准备清晰的参考图或详细文字描述。", "选择偏角色/道具的生成模式。", "在 Blender 等工具中做绑定与动画前处理。"],
      alternatives: ["meshy", "tripo", "luma-genie"]
    },
    {
      id: "luma-genie",
      name: "Luma Genie",
      region: "海外",
      logoFallback: "./logos/luma-genie.svg",
      oneLiner: "Luma AI 文生 3D，操作轻量，适合快速概念验证。",
      forWho: "已用 Luma 视频工具、想试 3D 方向的创作者",
      pricing: "mix",
      pricingLabel: "免费 + 订阅",
      categories: ["vertical-3d"],
      links: [
        { label: "Luma Genie", url: "https://lumalabs.ai/genie" },
        { label: "Luma AI", url: "https://lumalabs.ai/" }
      ],
      steps: ["用英文描述物体形状与风格。", "生成后在预览中旋转检查结构。", "导出 GLB 用于 Web 展示或进一步编辑。"],
      alternatives: ["tripo", "meshy", "rodin"]
    },

    // ── 垂直 · 企业 ──
    {
      id: "tencent-yuanqi",
      name: "腾讯元器",
      region: "国内",
      logoFallback: "./logos/tencent-yuanqi.svg",
      oneLiner: "腾讯 Agent 平台，私域客服、微信生态智能体。",
      forWho: "做私域运营、微信服务号/企微的团队",
      pricing: "mix",
      pricingLabel: "免费 + 企业",
      categories: ["vertical-enterprise"],
      links: [{ label: "腾讯元器", url: "https://yuanqi.tencent.com/" }],
      steps: ["创建智能体并配置知识库。", "对接微信等发布渠道。", "监控对话质量持续优化。"],
      alternatives: ["coze", "ali-wukong", "qianfan"]
    },
    {
      id: "ali-wukong",
      name: "阿里悟空",
      region: "国内",
      logoFallback: "./logos/ali-wukong.svg",
      oneLiner: "阿里团队流程与协作 Agent，对接钉钉生态。",
      forWho: "用钉钉的企业、需要流程自动化的团队",
      pricing: "mix",
      pricingLabel: "企业付费",
      categories: ["vertical-enterprise"],
      links: [{ label: "钉钉", url: "https://www.dingtalk.com/" }],
      steps: ["在钉钉应用市场了解悟空能力。", "梳理团队重复流程。", "小团队试点后推广。"],
      alternatives: ["tencent-yuanqi", "bailian", "workbuddy"]
    }
  ],

  news: [
    {
      id: "n1",
      title: "豆包升级多模态，LLM 与轻度 Agent 进一步融合",
      summary: "通用 LLM 赛道：对话、文档、生图一个入口搞定。",
      date: "2026-07-22",
      categoryIds: ["llm"],
      productIds: ["doubao"],
      content: [
        "字节跳动旗下豆包近日进一步整合多模态能力，用户可以在同一个对话里完成：文字问答、文档总结、图片生成、轻度联网检索等任务，而不必在多个 App 之间切换。",
        "对小白用户来说，这意味着「一个入口学 AI」的路径更短——先用豆包熟悉提示词和任务描述，再按需尝试更专业的 Agent 或绘图工具。",
        "需要注意的是，多模合一并不等于每个方向都是最强。写长报告仍建议对比 Kimi / DeepSeek；专业绘图可再试即梦或 Midjourney。"
      ],
      highlights: ["一个 App 覆盖 LLM + 轻度 Agent", "适合入门者建立 AI 使用习惯", "复杂任务仍需选对专用工具"]
    },
    {
      id: "n2",
      title: "Kimi 超长上下文再扩容，批量读文档更稳",
      summary: "适合文献、合同、研报类 LLM 使用场景。",
      date: "2026-07-21",
      categoryIds: ["llm"],
      productIds: ["kimi"],
      content: [
        "Kimi（月之暗面）继续加强长文档处理能力，支持更大的附件上传与更稳定的全文理解，适合一次性丢入 PDF、合同、研报后做结构化总结。",
        "推荐工作流：① 上传文档 → ② 要求「大纲 + 关键结论」→ ③ 再追问「风险点 / 待办 / 给老板的三句话版本」。",
        "若你经常处理英文材料，可同时对比 Claude 的长文写作质量；若以代码为主，DeepSeek 也值得并行试用。"
      ],
      highlights: ["百万字级上下文是核心卖点", "适合论文、合同、方案批量阅读", "先摘要后深挖，效率更高"]
    },
    {
      id: "n3",
      title: "DeepSeek 代码与推理能力持续迭代",
      summary: "开发者关注的长文本 + 代码双强 LLM。",
      date: "2026-07-20",
      categoryIds: ["llm"],
      productIds: ["deepseek"],
      content: [
        "DeepSeek 在代码生成、逻辑推理与长文本理解上持续更新，国内开发者社区讨论度很高，且提供免费额度与开放 API，适合技术向学习者。",
        "非程序员也可以用它解释 Excel 公式、写简单脚本、把业务规则转成伪代码——但涉及生产环境部署仍建议人工复核。",
        "学习建议：用真实小项目练手（如批量改文件名、日志分析），比抽象提问更容易体会 LLM 的能力边界。"
      ],
      highlights: ["代码 + 推理双强", "免费额度友好", "开源生态活跃，适合进阶"]
    },
    {
      id: "n4",
      title: "即梦开放更多免费积分，视觉 AI 入门门槛降低",
      summary: "国产文生图练手首选之一。",
      date: "2026-07-19",
      categoryIds: ["visual"],
      productIds: ["jimeng"],
      content: [
        "即梦（字节）近期增加免费积分投放，降低新用户试玩 AI 绘图的门槛。中文提示词即可出图，适合海报、插画、封面等入门练习。",
        "练手建议：同一主题连续改 3 版 prompt——分别强调「主体 / 风格 / 用途」，观察哪一项对结果影响最大。",
        "与 Midjourney 相比，即梦上手更快、中文友好；若追求艺术质感上限，海外工具仍值得对比。"
      ],
      highlights: ["中文 prompt 友好", "免费积分适合练描述能力", "商用前确认授权条款"]
    },
    {
      id: "n5",
      title: "Midjourney V7 风格控制增强",
      summary: "海外视觉 AI 艺术向仍是标杆。",
      date: "2026-07-18",
      categoryIds: ["visual"],
      productIds: ["midjourney"],
      content: [
        "Midjourney 新版本在风格一致性、细节控制和构图稳定性上继续改进，插画与概念设计领域仍是许多创作者的首选。",
        "入门门槛在于英文 prompt 与 Discord/Web 使用习惯。建议先用即梦练中文描述，再迁移到英文 prompt 对比差异。",
        "学习路径：参考优秀作品的 prompt 结构 → 建立自己的风格词表 → 固定种子图做系列化输出。"
      ],
      highlights: ["艺术质感行业标杆", "需英文 prompt", "适合有一定基础后进阶"]
    },
    {
      id: "n6",
      title: "Coze 扣子模板库更新，运营类 Agent 一键复制",
      summary: "无代码搭建平台适合普通人先试。",
      date: "2026-07-17",
      categoryIds: ["agent-platform"],
      productIds: ["coze"],
      content: [
        "扣子（Coze）更新了大量面向自媒体、电商、客服的 Agent 模板，用户可在零代码条件下复制工作流，填入自己的知识库即可上线。",
        "这是理解「LLM  vs  Agent」差异的好入口：LLM 回答单次问题；Agent 可以按流程调用工具、查知识库、多轮完成任务。",
        "建议第一个项目：做一个「FAQ 客服 Bot」或「周报助手」，跑通后再尝试 Dify 私有化或千帆企业版。"
      ],
      highlights: ["零代码上手 Agent", "模板丰富，复制即用", "适合理解 Agent 工作流"]
    },
    {
      id: "n7",
      title: "Dify 2.x 工作流节点更丰富",
      summary: "开源 Agent 平台适合小团队私有化。",
      date: "2026-07-16",
      categoryIds: ["agent-platform"],
      productIds: ["dify"],
      content: [
        "开源平台 Dify 2.x 增强了工作流编排能力，支持更多节点类型与外部 API 对接，适合想自建知识库 + Agent 的小团队或个人开发者。",
        "与扣子相比，Dify 更灵活、可私有化部署，但需要一定部署与配置成本。Docker 一键启动是常见入门方式。",
        "学习重点：理解「知识库检索 → LLM 生成 → 工具调用」三段式流程，这是大多数 Agent 平台的通用逻辑。"
      ],
      highlights: ["开源可私有化", "工作流节点扩展", "适合有技术基础的学习者"]
    },
    {
      id: "n8",
      title: "Cursor Agent 模式支持更长任务链",
      summary: "编程 Agent 正在从补全走向小项目交付。",
      date: "2026-07-15",
      categoryIds: ["agent-code"],
      productIds: ["cursor"],
      content: [
        "Cursor IDE 的 Agent 模式可以跨文件理解项目、执行多步修改，正在从「代码补全」演进为「小功能交付助手」。",
        "对学习者：即使不是全职开发，也可用 Cursor 读开源项目、改小脚本、理解报错信息——但务必 review 每一行改动。",
        "安全习惯：小步提交、跑测试、不用 Agent 直接改生产数据库或密钥配置。"
      ],
      highlights: ["跨文件理解项目", "适合开发者进阶", "必须人工 Review 代码"]
    },
    {
      id: "n9",
      title: "OpenAI Deep Research 向更多用户开放",
      summary: "调研类 Agent 自动生成带引用长报告。",
      date: "2026-07-14",
      categoryIds: ["agent-research"],
      productIds: ["deep-research"],
      content: [
        "OpenAI Deep Research 模式可自动多轮检索网页与文档，输出带引用来源的行业报告，属于典型的「调研 Agent」而非普通对话 LLM。",
        "适用场景：行业扫描、竞品初研、投资备忘录草稿。不适用：需要实时股价或未公开内幕的信息。",
        "使用技巧：明确时间范围、地域、报告结构（如 SWOT / 市场规模 / 竞争格局），并逐条核对引用链接。"
      ],
      highlights: ["多步骤自动调研", "输出带引用", "需核对来源与时效"]
    },
    {
      id: "n10",
      title: "可灵视频镜头控制增强",
      summary: "垂直视频 AI：先脚本后分镜再生成。",
      date: "2026-07-13",
      categoryIds: ["vertical-video"],
      productIds: ["kling"],
      content: [
        "快手可灵在镜头运动、主体一致性上持续优化，国内创作者做 3–5 秒分镜试片更加方便，适合广告创意与短视频预演。",
        "推荐流程：写 15 秒脚本 → 拆成 3 个镜头 → 每个镜头单独生成 → 用剪映等工具拼接配音字幕。",
        "现阶段 AI 视频仍适合「片段素材」而非一键成片，预期管理很重要。"
      ],
      highlights: ["国内视频 AI 第一梯队", "先脚本后分镜", "适合短片段而非长片"]
    },
    {
      id: "n11",
      title: "Suno 支持更长歌曲结构",
      summary: "音频垂直：AI 作曲进入可用阶段。",
      date: "2026-07-12",
      categoryIds: ["vertical-audio"],
      productIds: ["suno"],
      content: [
        "Suno 扩展了歌曲长度与段落结构控制能力，自媒体创作者可以用 AI 快速生成 BGM、片头曲或 demo，降低配乐成本。",
        "注意版权：不同订阅档位的商用条款不同，发布到公开平台前务必阅读最新协议。",
        "可与 ElevenLabs（配音）、讯飞听见（转写）组合，覆盖「声音」方向的完整小型工作流。"
      ],
      highlights: ["AI 作曲实用化", "关注商用版权", "可配配音/转写工具"]
    },
    {
      id: "n12",
      title: "腾讯元器接入更多微信场景",
      summary: "企业行业 Agent 聚焦私域客服。",
      date: "2026-07-11",
      categoryIds: ["vertical-enterprise"],
      productIds: ["tencent-yuanqi"],
      content: [
        "腾讯元器进一步打通微信生态，企业可在服务号、企微等场景部署私域客服 Agent，结合知识库回答常见问题、引导留资。",
        "对个人学习者：即使不做企业项目，也可注册体验「搭建 → 发布 → 看对话日志」完整闭环，理解 ToB Agent 产品形态。",
        "对比 Coze：元器更偏微信私域；扣子覆盖渠道更广。按你的实际渠道选型即可。"
      ],
      highlights: ["微信私域场景强", "适合 ToB 学习", "可体验完整 Agent 闭环"]
    },
    {
      id: "n13",
      title: "Meshy、Tripo 等图生 3D 工具持续迭代",
      summary: "垂直 3D：从文字/图片到可导出模型，入门门槛快速下降。",
      date: "2026-07-10",
      categoryIds: ["vertical-3d"],
      productIds: ["meshy", "tripo"],
      content: [
        "AI 3D 建模工具（如 Meshy、Tripo、腾讯混元 3D）让非专业用户也能从文字或单张图片生成可导出的三维模型，大幅缩短概念草模阶段。",
        "推荐学习路径：① 用简单物体（杯子、椅子）练 prompt → ② 对比图生 3D 与文生 3D → ③ 导出 GLB/OBJ 在 Blender 里检查面数与拓扑 → ④ 再对接游戏引擎或 3D 打印。",
        "现阶段 AI 3D 更适合「原型与概念资产」，精细绑定、动画与工业级公差仍需人工在 DCC 软件中精修。"
      ],
      highlights: ["文/图生 3D 已可实用", "注意导出格式与面数", "精修仍依赖 Blender 等工具"]
    }
  ],

  featuredBanner: ["tapnow", "libtv", "flova", "kling", "runway", "jimeng", "cursor", "meshy"]
};
