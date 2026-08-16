window.AI_DATA = {
  scenes: [
    {
      id: "llm",
      name: "通用 LLM",
      icon: "",
      parent: null,
      blurb: "文字推理、文档阅读、问答写作——AI 的基础大脑",
      audience: "小白入门、办公白领、学生",
      tip: "先搞懂 LLM 和 Agent 的区别：LLM 等你提问，Agent 能自己拆任务干活。",
      concept: "通用大语言模型：被动问答、多轮对话，自带轻度 Agent 能力。"
    },
    {
      id: "visual",
      name: "视听觉 Agent",
      icon: "",
      parent: null,
      blurb: "文生图、视频、音频、3D——以视听觉产出为核心的 Agent 工具",
      audience: "设计师、内容创作者、运营与 3D 爱好者",
      tip: "先明确产出形式（图/片/音/模型），再选对应子类工具。",
      concept: "核心产出图像、界面、视频、音频与 3D 资产，多具备 Agent 式工作流。"
    },
    {
      id: "visual-image",
      name: "文生图 / 插画",
      icon: "图",
      parent: "visual",
      blurb: "文生图、插画、概念设计与图像编辑",
      audience: "设计师、运营、自媒体创作者",
      tip: "说清主体、风格、用途，比堆形容词更有效。",
      concept: "以静态图像生成为核心的 AIGC 工具。"
    },
    {
      id: "vertical-video",
      name: "AI 视频生成",
      icon: "影",
      parent: "visual",
      blurb: "文生视频、镜头控制、短片与广告分镜",
      audience: "短视频创作者、广告从业者",
      tip: "先写脚本和分镜，再生成 3–5 秒镜头片段。",
      concept: "用 AI 生成或辅助视频镜头与成片。"
    },
    {
      id: "vertical-audio",
      name: "AI 音频 / 音乐",
      icon: "音",
      parent: "visual",
      blurb: "AI 作曲、配音、语音转写",
      audience: "播客、视频博主、会议记录者",
      tip: "音频类工具对中文场景要试发音和转写准确率。",
      concept: "音乐创作、语音合成与转写类工具。"
    },
    {
      id: "vertical-3d",
      name: "AI 3D 建模",
      icon: "立",
      parent: "visual",
      blurb: "文生 3D、图生模型、贴图与网格优化",
      audience: "游戏美术、工业设计师、3D 打印爱好者",
      tip: "先明确用途（游戏/打印/展示），再选支持对应导出格式的工具。",
      concept: "从文字或图片快速生成可编辑的三维网格、贴图与场景资产。"
    },
    {
      id: "agent",
      name: "专业智能体 Agent",
      icon: "",
      parent: null,
      blurb: "自主规划、联网检索、多步骤自动执行复杂任务",
      audience: "想提效的职场人、创业者、开发者",
      tip: "Agent = 会自己拆解任务、调用工具、循环执行的升级版 AI。",
      concept: "具备自主规划与工具调用能力，能连续完成整套复杂任务。"
    },
    {
      id: "vertical",
      name: "垂直细分 AI",
      icon: "",
      parent: null,
      blurb: "建筑空间、电商、旅游、政务等行业专用——聚焦单一赛道的 AI 工具",
      audience: "企业用户、行业从业者",
      tip: "垂直工具往往比通用模型在单点任务上更顺手。",
      concept: "在特定行业流程中深度优化的 AI 产品。"
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
      id: "vertical-enterprise",
      name: "企业行业 Agent",
      icon: "企",
      parent: "vertical",
      blurb: "客服、团队流程、HR 等行业专用智能体",
      audience: "企业 IT、业务负责人",
      tip: "企业级产品通常需要对接现有系统与权限。",
      concept: "面向私域、团队或行业流程的定制 Agent。"
    },
    {
      id: "vertical-space-design",
      name: "建筑·室内·景观·规划",
      icon: "空",
      parent: "vertical",
      blurb: "建筑方案、室内设计、景观彩平与城乡规划——空间设计全链路 AI",
      audience: "建筑师、室内/景观/规划设计师、学生与 Studio",
      tip: "上传 CAD/SU/户型图比纯文字描述更容易出可用方案；结构合规仍需专业复核。",
      concept: "从平面布局、软装渲染到总图彩平与城市方案的空间设计垂直工具。"
    },
    {
      id: "vertical-legal",
      name: "法律 AI",
      icon: "法",
      parent: "vertical",
      blurb: "法规检索、类案分析、合同审查与文书起草",
      audience: "律师、法务、合规与司法辅助人员",
      tip: "涉诉与对外文书务必人工核对引用，不可盲信 AI 输出。",
      concept: "基于法律数据库与 Agent 工作流的行业专用法律智能体。"
    },
    {
      id: "vertical-medical",
      name: "医疗 AI",
      icon: "医",
      parent: "vertical",
      blurb: "临床文档、问诊辅助、医学影像与运营提效",
      audience: "医生、护士、医疗机构 IT 与健康管理团队",
      tip: "医疗场景需确认 HIPAA/等保合规与 BAA 协议。",
      concept: "嵌入临床与运营流程的医疗垂直 AI 助手。"
    },
    {
      id: "vertical-finance",
      name: "金融 AI",
      icon: "金",
      parent: "vertical",
      blurb: "投研检索、财报分析、风控合规与智能投顾",
      audience: "分析师、基金经理、券商与银行从业者",
      tip: "金融决策需交叉验证数据源，AI 输出不能替代合规审批。",
      concept: "面向资本市场与企业金融的专业检索与分析 AI。"
    },
    {
      id: "vertical-education",
      name: "教育 AI",
      icon: "教",
      parent: "vertical",
      blurb: "个性化辅导、作业批改、课程生成与学习规划",
      audience: "学生、教师、培训机构与在线教育团队",
      tip: "把 AI 当「24 小时助教」，关键知识点仍要老师或家长把关。",
      concept: "适配 K12、高等教育与职业培训的 AI 学习助手。"
    },
    {
      id: "vertical-ecommerce",
      name: "电商 AI",
      icon: "商",
      parent: "vertical",
      blurb: "主图详情、Listing、智能客服与跨境选品运营",
      audience: "淘宝/京东/跨境卖家、电商运营与设计",
      tip: "先打通一个平台的全链路（图+文案+客服），再扩展多店。",
      concept: "覆盖商品视觉、内容生成与售前售后自动化的电商垂直 AI。"
    },
    {
      id: "vertical-hr",
      name: "HR AI",
      icon: "人",
      parent: "vertical",
      blurb: "简历解析、AI 面试、招聘流程与人事事务自动化",
      audience: "HR、招聘负责人、成长期企业人才团队",
      tip: "结构化评分卡 + AI 初筛，关键岗位仍要真人终面。",
      concept: "嵌入 ATS/HCM 的招聘与人事垂直智能体。"
    },
    {
      id: "vertical-government",
      name: "政务 AI",
      icon: "政",
      parent: "vertical",
      blurb: "一网通办、政策问答、城市治理与数字公务员",
      audience: "政务 IT、数字政府集成商、央国企信息化",
      tip: "政务场景需等保、国产化与数据不出域，选型先看合规。",
      concept: "面向 G 端办事大厅、热线与城市运行的行业大模型与智能体。"
    },
    {
      id: "vertical-travel",
      name: "旅游 AI",
      icon: "游",
      parent: "vertical",
      blurb: "行程规划、机票酒店比价、路书攻略与行中向导",
      audience: "自由行游客、亲子/商务出行、定制游与 OTA 用户",
      tip: "说清天数、预算与旅行风格；可预订的方案优先选接实时库存的平台。",
      concept: "从灵感、排程到订票订房的一站式 AI 旅行助手。"
    },
    {
      id: "vertical-ui",
      name: "UI 设计",
      icon: "界",
      parent: "vertical",
      blurb: "界面原型、设计系统与 AI 辅助 UX",
      audience: "产品、设计师、需要快速出原型的团队",
      tip: "先描述用户流程和页面结构，再微调组件细节。",
      concept: "用自然语言或截图生成可协作的界面与设计稿。"
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
      appUri: "doubao://",
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
      logo: "./logos/jimeng.svg",
      logoFallback: "./logos/jimeng.svg",
      preview: "https://s0.wp.com/mshots/v1/https%3A%2F%2Fjimeng.jianying.com%2Fai-tool%2Fhome?w=960",
      oneLiner: "字节剪映团队出品，文生图 / 文生视频 / 智能画布一站式创作，中文友好。",
      forWho: "短视频创作者、设计师、不想写英文提示词的运营",
      pricing: "mix",
      pricingLabel: "每日免费积分 + 付费",
      categories: ["visual-image"],
      links: [
        { label: "创作入口", url: "https://jimeng.jianying.com/ai-tool/home" },
        { label: "官网", url: "https://jimeng.jianying.com/" }
      ],
      steps: [
        "抖音或手机号登录网页版 jimeng.jianying.com，或下载「即梦 AI」App。",
        "图片：用中文写清主体、风格与用途；视频：描述镜头动作、比例与时长。",
        "智能画布可局部重绘、扩图；成片可导出或一键导入剪映继续剪辑。"
      ],
      alternatives: ["kling", "tongyi-wanxiang", "midjourney"]
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
      categories: ["visual-image"],
      links: [{ label: "官网", url: "https://www.lovart.ai/" }],
      steps: ["选择偏艺术/二次元的风格模板。", "描述角色、场景、光影氛围。", "多生成几版再精修方向。"],
      alternatives: ["jimeng", "midjourney", "tongyi-wanxiang"]
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
      categories: ["visual-image"],
      links: [{ label: "通义万相", url: "https://tongyi.aliyun.com/wanxiang/" }],
      steps: ["明确用途：商品主图、海报还是人像。", "上传参考图可提升一致性。", "导出前检查文字与 Logo 是否正确。"],
      alternatives: ["jimeng", "lovart", "dalle3"]
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
      categories: ["visual-image"],
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
      categories: ["visual-image"],
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
      categories: ["visual-image"],
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
      categories: ["agent-platform", "agent-code"],
      links: [
        { label: "扣子", url: "https://www.coze.cn/" },
        { label: "Coze 国际版", url: "https://www.coze.com/" }
      ],
      steps: ["选一个接近需求的模板。", "填入知识库或 FAQ 文档。", "测试多轮对话后发布到微信/飞书等。"],
      alternatives: ["dify", "bailian", "miaoda"]
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
      oneLiner: "阿里模型与应用开发平台，Agent 模板 + API，支持快速搭建智能体。",
      forWho: "阿里云用户、开发者、需要 Agent 与模型 API 的团队",
      pricing: "mix",
      pricingLabel: "按量 / 企业",
      categories: ["agent-platform", "agent-code"],
      links: [{ label: "百炼平台", url: "https://bailian.console.aliyun.com/" }],
      steps: ["在控制台创建应用或 Agent。", "选择模型与知识库插件。", "通过 API 或页面嵌入业务。"],
      alternatives: ["coze", "meoo", "qoder"]
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
      oneLiner: "腾讯全场景 AI 办公工作台，多 Agent 并行处理文档、表格、PPT 与本地文件。",
      forWho: "白领、运营、HR、产品经理，需要 AI 同事完成跨工具办公任务",
      pricing: "mix",
      pricingLabel: "免费 + 订阅",
      categories: ["agent-office", "agent-code"],
      links: [
        { label: "官网", url: "https://www.workbuddy.cn/" },
        { label: "腾讯云", url: "https://cloud.tencent.com/product/workbuddy" },
        { label: "下载", url: "https://www.codebuddy.cn/work/" }
      ],
      steps: ["下载桌面客户端并登录。", "用自然语言描述要完成的办公任务。", "授权本地文件夹，从周报、表格整理等场景试起。"],
      alternatives: ["dumate", "qoder", "lingguang"]
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
      id: "codex",
      name: "OpenAI Codex",
      region: "海外",
      logoFallback: "./logos/codex.svg",
      oneLiner: "OpenAI 云端编程 Agent，浏览器与 CLI 自主完成代码任务与 PR。",
      forWho: "开发者、需要在云端跑长时编程任务的用户",
      pricing: "mix",
      pricingLabel: "ChatGPT 订阅",
      categories: ["agent-code"],
      links: [
        { label: "Codex", url: "https://openai.com/codex/" },
        { label: "ChatGPT", url: "https://chatgpt.com/" }
      ],
      steps: ["在 ChatGPT 或 Codex CLI 中连接代码仓库。", "描述任务目标与验收标准。", "Review 生成的 diff 与测试结果后合并。"],
      alternatives: ["cursor", "claude-code", "devin"]
    },
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
      appUri: "cursor://",
      links: [
        { label: "官网", url: "https://cursor.com/" },
        { label: "下载", url: "https://cursor.com/downloads" }
      ],
      steps: ["用 Cursor 打开现有项目。", "Cmd+K 局部编辑，Chat 问架构问题。", "Agent 模式让它跨文件完成小功能。"],
      alternatives: ["codex", "claude-code", "devin"]
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
      appUri: "trae-cn://",
      links: [{ label: "Trae", url: "https://www.trae.ai/" }],
      steps: ["下载 Trae IDE 并导入项目。", "用对话描述要实现的函数或页面。", "结合官方教程熟悉快捷键。"],
      alternatives: ["cursor", "qoder", "raccoon"]
    },
    {
      id: "qoder",
      name: "Qoder CN",
      region: "国内",
      logoFallback: "./logos/qoder.svg",
      oneLiner: "原通义灵码升级版，IDE 插件 + 编程智能体，支持 Quest 多文件任务。",
      forWho: "Java / Python / Go 等主流语言开发者",
      pricing: "mix",
      pricingLabel: "免费 + 专业版",
      categories: ["agent-code"],
      links: [
        { label: "官网", url: "https://qoder.com.cn/" },
        { label: "文档", url: "https://docs.qoder.cn/" }
      ],
      steps: ["在 VS Code / JetBrains 安装 Qoder 插件。", "用对话描述跨文件改动或新功能。", "Quest 模式让它自主拆解并完成工程级任务。"],
      alternatives: ["trae", "cursor", "raccoon"]
    },
    {
      id: "raccoon",
      name: "代码小浣熊",
      region: "国内",
      logoFallback: "./logos/raccoon.svg",
      oneLiner: "商汤 AI 编程助手，补全、生成、重构与测试，支持 VS Code / IDEA。",
      forWho: "软件研发、编程学习、需要国产 IDE 插件的开发者",
      pricing: "mix",
      pricingLabel: "免费 + 企业版",
      categories: ["agent-code"],
      links: [
        { label: "官网", url: "https://www.sensetime.com/cn/product-detail?categoryId=51134384" },
        { label: "小浣熊家族", url: "https://xiaohuanxiong.com/login" }
      ],
      steps: ["在 VS Code 或 JetBrains 安装 Raccoon 插件。", "用侧边栏对话解释代码或生成函数。", "结合补全与重构建议小步迭代。"],
      alternatives: ["qoder", "trae", "cursor"]
    },
    {
      id: "lingguang",
      name: "灵光",
      region: "国内",
      logoFallback: "./logos/lingguang.svg",
      oneLiner: "蚂蚁消费级 Coding Agent，30 秒用自然语言生成可交互闪应用。",
      forWho: "非程序员、产品经理、想快速验证 App 想法的创作者",
      pricing: "free",
      pricingLabel: "免费",
      categories: ["agent-code"],
      links: [
        { label: "灵光官网", url: "https://www.lingguang.com/" },
        { label: "App Store", url: "https://apps.apple.com/app/id6751496092" }
      ],
      steps: ["描述想要的工具或小游戏。", "在对话中预览并微调闪应用。", "发布到灵光圈或分享给他人体验。"],
      alternatives: ["tusi", "qmuse", "weavefox"]
    },
    {
      id: "miaoda",
      name: "秒哒",
      region: "国内",
      logoFallback: "./logos/miaoda.svg",
      oneLiner: "百度无代码应用开发，多智能体协作，对话生成 Web / App / 小程序。",
      forWho: "运营、产品、中小企业快速搭业务系统",
      pricing: "mix",
      pricingLabel: "免费试用 + 按量",
      categories: ["agent-code"],
      links: [
        { label: "秒哒", url: "https://cloud.baidu.com/product-s/miaoda_home" },
        { label: "文档", url: "https://cloud.baidu.com/doc/MIAODA/index.html" }
      ],
      steps: ["用自然语言描述应用需求。", "与秒哒澄清功能细节。", "预览后一键发布 Web 或打包 App。"],
      alternatives: ["meoo", "coze", "tusi"]
    },
    {
      id: "meoo",
      name: "秒悟 Meoo",
      region: "国内",
      logoFallback: "./logos/meoo.svg",
      oneLiner: "阿里全栈 AI 开发平台，自然语言生成前后端并一键部署阿里云。",
      forWho: "产品、运营、独立开发者，想 1 分钟上线全栈应用",
      pricing: "mix",
      pricingLabel: "公测免费 + 订阅",
      categories: ["agent-code"],
      links: [{ label: "官网", url: "https://meoo.com/" }],
      steps: ["描述网站或工具需求，选择 Qwen / Kimi 等模型。", "在线预览并圈选修改界面。", "一键部署到阿里云或配合 Cursor 用 CLI 发布。"],
      alternatives: ["miaoda", "weavefox", "bailian"]
    },
    {
      id: "qmuse",
      name: "QMuse 妙思",
      region: "国内",
      logoFallback: "./logos/qmuse.svg",
      oneLiner: "蚂蚁 AI 团队空间，一句话生成可运行网页应用与协作工具。",
      forWho: "团队产品、运营、需要轻量内部工具的非技术同学",
      pricing: "mix",
      pricingLabel: "内测",
      categories: ["agent-code"],
      links: [{ label: "官网", url: "https://www.qmusespace.com/" }],
      steps: ["支付宝登录并输入邀请码。", "用中文描述网页或数据看板需求。", "点选页面区域继续对话微调。"],
      alternatives: ["lingguang", "weavefox", "tusi"]
    },
    {
      id: "tusi",
      name: "腾讯吐司",
      region: "国内",
      logoFallback: "./logos/tusi.svg",
      oneLiner: "Vibe Coding 造 App，自然语言生成原型并一键打包安卓 APK。",
      forWho: "普通用户、创意爱好者、想在手机上直接用自建 App 的人",
      pricing: "free",
      pricingLabel: "公测免费",
      categories: ["agent-code"],
      links: [{ label: "官网", url: "https://tusi.qq.com/" }],
      steps: ["用大白话描述想要的 App。", "多轮对话调整界面与功能。", "打包 APK 安装或分享到灵感广场。"],
      alternatives: ["lingguang", "miaoda", "qmuse"]
    },
    {
      id: "weavefox",
      name: "WeaveFox",
      region: "国内",
      logoFallback: "./logos/weavefox.svg",
      oneLiner: "蚂蚁免费 AI 应用创作平台，对话生成全栈 Web 应用并支持协作发布。",
      forWho: "个人开发者、OPC、非技术创作者",
      pricing: "free",
      pricingLabel: "免费",
      categories: ["agent-code"],
      links: [
        { label: "官网", url: "https://www.weavefox.cn/" },
        { label: "文档", url: "https://docs.weavefox.ai/" }
      ],
      steps: ["描述落地页、工具或品牌站需求。", "接入技能扩展与云服务。", "预览后发布并绑定自定义域名。"],
      alternatives: ["meoo", "qmuse", "lingguang"]
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
    {
      id: "ai-hot",
      name: "AI HOT",
      region: "国内",
      logoFallback: "./logos/ai-hot.svg",
      oneLiner: "AI 行业动态聚合，每日热点、精选解读与 AI 日报。",
      forWho: "产品经理、开发者、关注 AI 趋势的学习者与从业者",
      pricing: "free",
      pricingLabel: "免费",
      categories: ["agent-research"],
      links: [{ label: "官网", url: "https://aihot.virxact.com/" }],
      steps: ["打开首页查看「今日热点」与热度排行。", "浏览最新精选动态与每条推荐理由。", "用搜索筛选特定公司、模型或话题。"],
      alternatives: ["deep-research", "gpt-researcher", "kimi"]
    },

    // ── 垂直 · 视频 ──
    {
      id: "tapnow",
      name: "TapNow",
      region: "国内",
      logoFallback: "./logos/tapnow.svg",
      preview: "./previews/tapnow-home.png",
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
      alternatives: ["libtv", "flova", "kling", "wapoo"]
    },
    {
      id: "libtv",
      name: "LibTV",
      region: "国内",
      logoFallback: "./logos/libtv.svg",
      preview: "./previews/libtv-home.png",
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
      alternatives: ["tapnow", "flova", "kling", "wapoo"]
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
      alternatives: ["tapnow", "libtv", "runway", "wapoo"]
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
      alternatives: ["tapnow", "libtv", "runway", "kling", "wapoo"]
    },

    {
      id: "wapoo",
      name: "Wapoo",
      region: "海外",
      logoFallback: "./logos/wapoo.svg",
      oneLiner: "Playable Video 互动视频平台，观众可选分支、Twist 剧情并共创续集。",
      forWho: "互动短剧、UGC 叙事、社区共创型视频创作者",
      pricing: "free",
      pricingLabel: "App 免费",
      categories: ["vertical-video"],
      links: [
        { label: "官网", url: "https://wapoo.video/" },
        { label: "App Store", url: "https://apps.apple.com/us/app/wapoo-playable-video/id6752590312" },
        { label: "Discord", url: "https://discord.gg/ZZByg4jMm7" }
      ],
      steps: [
        "下载 iOS App 或访问官网了解 Playable Video 玩法。",
        "观看 Seed 视频，在分支点选择 Twist 改变剧情走向。",
        "发布 Seed 邀请社区续写，每条 Twist 可展开新的故事线。"
      ],
      alternatives: ["tapnow", "flova", "libtv"]
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
    },

    // ── 垂直 · 建筑·室内·景观·规划 ──
    {
      id: "jianzhuxuezhang",
      name: "建筑学长",
      region: "国内",
      logoFallback: "./logos/jianzhuxuezhang.svg",
      preview: "https://s0.wp.com/mshots/v1/https%3A%2F%2Fwww.jianzhuxuezhang.com%2F?w=960",
      oneLiner: "建筑|室内|景观|规划一站式 AI 创作平台，线稿上色、模型渲染、旧房改造、图生视频与 SU 插件。",
      forWho: "建筑/景观/规划设计师、学生、需要快速出汇报图的 Studio",
      pricing: "mix",
      pricingLabel: "免费资源 + 会员",
      categories: ["vertical-space-design"],
      links: [
        { label: "官网", url: "https://www.jianzhuxuezhang.com/" },
        { label: "AI 工具", url: "https://www.jianzhuxuezhang.com/" }
      ],
      steps: [
        "按场景选工具：建筑渲染、室内风格转换、彩平填色或旧房改造。",
        "上传草图、SU 截图、现场照片或 CAD 导出图。",
        "微调后导出效果图；需要深化时下载 SU/CAD 资源库素材。"
      ],
      alternatives: ["evai", "adai", "lookx", "promeai"]
    },
    {
      id: "maket",
      name: "Maket AI",
      region: "海外",
      logoFallback: "./logos/maket.svg",
      preview: "https://s0.wp.com/mshots/v1/https%3A%2F%2Fwww.maket.ai%2F?w=960",
      oneLiner: "对话生成住宅平面图，支持布局迭代与 3D 可视化，适合概念方案比选。",
      forWho: "建筑师、自建房业主、住宅方案早期探索",
      pricing: "mix",
      pricingLabel: "免费 + 订阅",
      categories: ["vertical-space-design"],
      links: [
        { label: "官网", url: "https://www.maket.ai/" },
        { label: "功能介绍", url: "https://www.maket.ai/features" }
      ],
      steps: ["描述房间数量、面积与风格偏好。", "对比 AI 生成的多套平面方案。", "在画布上微调后导出或交给专业建筑师复核。"],
      alternatives: ["autodesk-forma", "evai", "envisioneer"]
    },
    {
      id: "autodesk-forma",
      name: "Autodesk Forma",
      region: "海外",
      logoFallback: "./logos/autodesk-forma.svg",
      oneLiner: "Autodesk 建筑前期设计平台，AI 辅助用地分析、体块与方案比选。",
      forWho: "中大型设计团队、城市规划与建筑前期方案",
      pricing: "mix",
      pricingLabel: "订阅制",
      categories: ["vertical-space-design"],
      links: [
        { label: "Forma", url: "https://www.autodesk.com/products/forma/" },
        { label: "Autodesk", url: "https://www.autodesk.com/" }
      ],
      steps: ["导入地块与规划约束。", "用 AI 生成体块与方案变体。", "选定方向后衔接 Revit 等 BIM 深化。"],
      alternatives: ["maket", "evai", "envisioneer"]
    },
    {
      id: "evai",
      name: "EVAI 建筑大师",
      region: "国内",
      logoFallback: "./logos/evai.svg",
      oneLiner: "面向中国建筑室内行业的 AI 全流程平台，草图转效果图、视频与行业工作流。",
      forWho: "设计院、建筑与景观设计师、国内项目团队",
      pricing: "mix",
      pricingLabel: "免费试用 + 会员",
      categories: ["vertical-space-design"],
      links: [{ label: "官网", url: "https://www.openevai.com/" }],
      steps: ["上传草图、体块或参考图。", "选择建筑/室内/景观工作流模板。", "批量出图后在 CAD/SketchUp 中深化。"],
      alternatives: ["maket", "spacely", "3vjia-ai"]
    },
    {
      id: "envisioneer",
      name: "易美迅迩",
      region: "国内",
      logoFallback: "./logos/envisioneer.svg",
      oneLiner: "云端 BIM 建筑系统，AI 规划自建房/精装方案，实时 BOM 算量与 CAD 导出。",
      forWho: "自建房、家装工程队、需要算量报价的施工团队",
      pricing: "mix",
      pricingLabel: "灵感版免费 + 专业版",
      categories: ["vertical-space-design"],
      links: [{ label: "官网", url: "http://envisioneer.cn/" }],
      steps: ["输入宅基地或户型尺寸与风格。", "生成 3D 方案并查看物料清单。", "一键导出平立剖 CAD 用于施工对接。"],
      alternatives: ["evai", "3vjia-ai", "maket"]
    },
    {
      id: "lookx",
      name: "LookX AI",
      region: "国内",
      logoFallback: "./logos/lookx.svg",
      oneLiner: "建筑垂类 AI 云，自研模型 + SketchUp/Rhino 插件，支持风格训练与建筑词库。",
      forWho: "建筑师、学生、需要插件内出图的建模用户",
      pricing: "mix",
      pricingLabel: "免费额度 + 订阅",
      categories: ["vertical-space-design"],
      links: [
        { label: "官网", url: "https://www.lookx.ai/" },
        { label: "Cloud", url: "https://www.lookx.ai/" }
      ],
      steps: ["在网页或 SU/Rhino 插件登录。", "用建筑词库模板写 prompt 或训练自定义风格。", "图生图深化方案体块与立面。"],
      alternatives: ["jianzhuxuezhang", "veras", "evai"]
    },
    {
      id: "veras",
      name: "Veras",
      region: "海外",
      logoFallback: "./logos/veras.svg",
      oneLiner: "Chaos 出品，Revit/SketchUp/Rhino 插件 + 网页版，白模秒变照片级渲染。",
      forWho: "BIM 工作流设计师、用 SU/Revit 出方案的建筑师",
      pricing: "mix",
      pricingLabel: "Starter / Pro 订阅",
      categories: ["vertical-space-design"],
      links: [
        { label: "Veras", url: "https://www.chaos.com/veras" },
        { label: "EvolveLAB", url: "https://www.evolvelab.io/veras" }
      ],
      steps: ["在 SU/Revit 安装 Veras 插件或打开 Web App。", "调整 Geometry Slider 控制 AI 改动幅度。", "局部 Render Selection 替换家具或立面。"],
      alternatives: ["lookx", "spacely", "jianzhuxuezhang"]
    },
    {
      id: "finch3d",
      name: "Finch 3D",
      region: "海外",
      logoFallback: "./logos/finch3d.svg",
      oneLiner: "AI 原生建筑方案平台，自动生成平面图、面积统计与合规 test-fit。",
      forWho: "需要快速比选体量与单元分布的建筑团队",
      pricing: "mix",
      pricingLabel: "团队订阅",
      categories: ["vertical-space-design"],
      links: [{ label: "官网", url: "https://www.finch3d.com/" }],
      steps: ["输入地块与项目 brief。", "批量生成平面与面积指标。", "导出可编辑几何到既有 BIM 流程。"],
      alternatives: ["maket", "testfit", "autodesk-forma"]
    },
    {
      id: "testfit",
      name: "TestFit",
      region: "海外",
      logoFallback: "./logos/testfit.svg",
      oneLiner: "地产可行性 AI，自动生成 3D 排布并计算 zoning 与财务指标。",
      forWho: "开发商、规划顾问、前期策划团队",
      pricing: "paid",
      pricingLabel: "企业订阅",
      categories: ["vertical-space-design"],
      links: [{ label: "官网", url: "https://testfit.io/" }],
      steps: ["导入地块边界与规划约束。", "生成多种 building massing 方案。", "对比 FAR、停车与收益指标。"],
      alternatives: ["archistar", "finch3d", "autodesk-forma"]
    },
    {
      id: "archistar",
      name: "Archistar",
      region: "海外",
      logoFallback: "./logos/archistar.svg",
      oneLiner: "AI 分析 zoning、环境与地块约束，优化早期开发可行性。",
      forWho: "地产开发、投资尽调、多地块比选团队",
      pricing: "paid",
      pricingLabel: "企业订阅",
      categories: ["vertical-space-design"],
      links: [{ label: "官网", url: "https://www.archistar.ai/" }],
      steps: ["选定城市/地块数据库。", "运行合规与容量分析。", "导出方案给建筑师深化。"],
      alternatives: ["testfit", "finch3d", "archai"]
    },
    {
      id: "adai",
      name: "ADAI",
      region: "国内",
      logoFallback: "./logos/adai.svg",
      preview: "https://s0.wp.com/mshots/v1/https%3A%2F%2Fadai.archi%2F?w=960",
      oneLiner: "建筑行业无限画布，CAD 填色、鸟瞰渲染、总图与旧房改造一体化。",
      forWho: "建筑/规划设计师、需要彩平与鸟瞰同屏迭代者",
      pricing: "mix",
      pricingLabel: "免费试用 + 会员",
      categories: ["vertical-space-design"],
      links: [{ label: "官网", url: "https://adai.archi/" }],
      steps: ["在无限画布上传 CAD/SU 截图或照片。", "选室外/鸟瞰/户型填色/总图渲染模式。", "局部重绘直到满足汇报需求。"],
      alternatives: ["jianzhuxuezhang", "archai", "xkool"]
    },
    {
      id: "archai",
      name: "ArchAI",
      region: "国内",
      logoFallback: "./logos/archai.svg",
      oneLiner: "建筑方案工作台：解析任务书 → 概念总图 → 鸟瞰/人视效果图一条龙。",
      forWho: "产业园、城市设计、需要控规指标对齐的方案团队",
      pricing: "mix",
      pricingLabel: "免费试用 + 订阅",
      categories: ["vertical-space-design"],
      links: [{ label: "官网", url: "https://archai.art/" }],
      steps: ["上传任务书、红线与场地资料建立项目上下文。", "AI 生成概念总平面并迭代分区。", "选鸟瞰/透视模板输出效果图入库。"],
      alternatives: ["adai", "jianzhuxuezhang", "autodesk-forma"]
    },
    {
      id: "xkool",
      name: "小库科技",
      region: "国内",
      logoFallback: "./logos/xkool.svg",
      oneLiner: "ColorMaster 一键彩总：CAD 识图、景观自动排布、分层 PSD 导出。",
      forWho: "需要做彩色总图与景观深化的建筑/景观团队",
      pricing: "mix",
      pricingLabel: "免费试用 + 企业",
      categories: ["vertical-space-design"],
      links: [
        { label: "ColorMaster", url: "https://www.xkool.ai/zh/ColorMaster" },
        { label: "小库 AI", url: "https://www.xkool.ai/" }
      ],
      steps: ["导入建筑方案 CAD 图纸。", "AI 自动排布景观元素与阴影。", "导出分层 PSD 在 PS 中二次编辑。"],
      alternatives: ["adai", "armox", "jianzhuxuezhang"]
    },
    {
      id: "armox",
      name: "Armox AI",
      region: "海外",
      logoFallback: "./logos/armox.svg",
      oneLiner: "场地规划 AI 渲染，识别道路/建筑/开放空间，秒出彩平与 masterplan。",
      forWho: "景观、规划、需要总图可视化汇报的设计师",
      pricing: "mix",
      pricingLabel: "免费试用 + 订阅",
      categories: ["vertical-space-design"],
      links: [
        { label: "场地渲染", url: "https://armox.ai/zh/ai-architecture-rendering/site-plan-rendering" },
        { label: "Armox", url: "https://armox.ai/" }
      ],
      steps: ["上传 CAD 总图或场地平面。", "选择写实/水彩/分析图风格。", "调整植被密度与道路材质后导出。"],
      alternatives: ["xkool", "adai", "gstar-render"]
    },
    {
      id: "gstar-render",
      name: "GstarRender",
      region: "国内",
      logoFallback: "./logos/gstar-render.svg",
      oneLiner: "浩辰 AI 渲染引擎，线稿转写实，覆盖建筑/景观/规划与城市更新。",
      forWho: "用 CAD/浩辰生态的工程设计院与市政团队",
      pricing: "mix",
      pricingLabel: "免费试用 + 订阅",
      categories: ["vertical-space-design"],
      links: [{ label: "GstarRender", url: "https://www.gstarcad.com/ai/render/" }],
      steps: ["上传规划线稿或方案草图。", "选择建筑/景观/规划渲染模式。", "批量出图用于投标与汇报。"],
      alternatives: ["jianzhuxuezhang", "adai", "armox"]
    },
    {
      id: "tudingai",
      name: "图叮AI",
      region: "国内",
      logoFallback: "./logos/tudingai.svg",
      oneLiner: "网页 + PS 插件，建筑线稿上色、白模图生图与局部重绘，学生党友好。",
      forWho: "建筑学生、用 PS 工作流的设计师、快速出概念图者",
      pricing: "mix",
      pricingLabel: "免费试用 + 会员",
      categories: ["vertical-space-design"],
      links: [
        { label: "官网", url: "https://tudingai.cn/" },
        { label: "网页生图", url: "https://tudingai.cn/" }
      ],
      steps: ["上传清晰黑白线稿或 SU 白模截图。", "选线稿上色或图生图，控制重绘幅度。", "在 PS 插件中继续精修图层。"],
      alternatives: ["jianzhuxuezhang", "promeai", "lookx"]
    },

    {
      id: "spacely",
      name: "Spacely AI",
      region: "海外",
      logoFallback: "./logos/spacely.svg",
      preview: "https://s0.wp.com/mshots/v1/https%3A%2F%2Fwww.spacely.ai%2F?w=960",
      oneLiner: "草图/3D/照片秒出室内效果图，SketchUp 插件内直接渲染。",
      forWho: "室内设计师、软装团队、需要快速改稿的 Studio",
      pricing: "mix",
      pricingLabel: "免费额度 + 订阅",
      categories: ["vertical-space-design"],
      links: [
        { label: "官网", url: "https://www.spacely.ai/" },
        { label: "SketchUp 插件", url: "https://www.spacely.ai/tools" }
      ],
      steps: ["上传 SketchUp 场景或房间照片。", "用 prompt 调整灯光、材质与家具。", "秒级出图发给客户确认方向。"],
      alternatives: ["interior-ai", "promeai", "3vjia-ai"]
    },
    {
      id: "interior-ai",
      name: "Interior AI",
      region: "海外",
      logoFallback: "./logos/interior-ai.svg",
      oneLiner: "房间照片虚拟软装与风格改造，适合 staging 与灵感探索。",
      forWho: "软装设计师、房产 staging、想快速看装修效果的业主",
      pricing: "mix",
      pricingLabel: "按次 / 订阅",
      categories: ["vertical-space-design"],
      links: [{ label: "官网", url: "https://interiorai.com/" }],
      steps: ["上传空房或现有装修照片。", "选择现代、北欧等风格预设。", "对比多版效果图再定软装方向。"],
      alternatives: ["spacely", "promeai", "3vjia-ai"]
    },
    {
      id: "3vjia-ai",
      name: "三维家 AI 轻设计",
      region: "国内",
      logoFallback: "./logos/3vjia-ai.svg",
      oneLiner: "基于千万家装案例，AI 识户型、秒出全屋布局与 3D 渲染，导购也能出全案。",
      forWho: "定制家居、家装门店导购、全屋定制设计师",
      pricing: "mix",
      pricingLabel: "企业订阅",
      categories: ["vertical-space-design"],
      links: [
        { label: "AI 轻设计", url: "https://www.3vjia.com/solve/ailayout" },
        { label: "三维家", url: "https://www.3vjia.com/" }
      ],
      steps: ["导入或选择户型，AI 自动识别分区。", "一键切换 18+ 风格套系与全屋配齐。", "现场渲染 3D 方案加速签单。"],
      alternatives: ["envisioneer", "spacely", "evai"]
    },
    {
      id: "promeai",
      name: "PromeAI",
      region: "国内",
      logoFallback: "./logos/promeai.svg",
      oneLiner: "草图转效果图、室内风格迁移与局部重绘，设计师社区活跃。",
      forWho: "室内/建筑设计师、需要多方向比稿的创作者",
      pricing: "mix",
      pricingLabel: "免费 + Pro",
      categories: ["vertical-space-design"],
      links: [
        { label: "官网", url: "https://www.promeai.pro/" },
        { label: "室内渲染", url: "https://www.promeai.pro/sketch-rendering" }
      ],
      steps: ["上传线稿、Clay 模型或房间照片。", "选择写实/概念等渲染模式。", "局部重绘微调材质与家具。"],
      alternatives: ["spacely", "interior-ai", "evai"]
    },
    {
      id: "anke-ai",
      name: "暗壳AI",
      region: "国内",
      logoFallback: "./logos/anke-ai.svg",
      preview: "https://s0.wp.com/mshots/v1/https%3A%2F%2Fwww.ark.art%2F?w=960",
      oneLiner: "泛家居空间设计 Agent，100+ Skills 技能库，打通方案到供应链采购落地。",
      forWho: "软装/全屋定制、需要真实 SKU 落地的设计团队",
      pricing: "mix",
      pricingLabel: "免费试用 + 订阅",
      categories: ["vertical-space-design"],
      links: [{ label: "暗壳 AI", url: "https://www.ark.art/" }],
      steps: ["在 Agent 画布描述空间需求或上传参考。", "一键调用软装/渲染/视频等 Skills。", "从生态库选真实在售产品完成方案。"],
      alternatives: ["3vjia-ai", "jianzhuxuezhang", "spacely"]
    },
    {
      id: "decai",
      name: "DecAI",
      region: "海外",
      logoFallback: "./logos/decai.svg",
      oneLiner: "30 秒室内/室外/花园 redesign，家具替换、墙面地板 AI 改造。",
      forWho: "业主、软装灵感探索、轻量 staging 需求",
      pricing: "mix",
      pricingLabel: "免费 + 订阅",
      categories: ["vertical-space-design"],
      links: [
        { label: "官网", url: "https://decai.ai/zh" },
        { label: "室内设计", url: "https://decai.ai/zh/interior-design" }
      ],
      steps: ["上传空房或已装修照片。", "选现代/北欧等风格与房间类型。", "对比多版后下载或分享。"],
      alternatives: ["interior-ai", "anke-ai", "3vjia-ai"]
    },

    // ── 垂直 · 法律 AI ──
    {
      id: "harvey",
      name: "Harvey",
      region: "海外",
      logoFallback: "./logos/harvey.svg",
      oneLiner: "面向大型律所的法律 Agent 平台，自定义工作流与机构知识库。",
      forWho: "Am Law 100/200 大型律所、企业法务团队",
      pricing: "paid",
      pricingLabel: "企业订阅",
      categories: ["vertical-legal"],
      links: [{ label: "官网", url: "https://www.harvey.ai/" }],
      steps: ["与 Harvey 销售对接开通企业账号。", "用 Agent Builder 封装所内研究/尽调流程。", "所有对外文书必须律师终审。"],
      alternatives: ["cocounsel", "lexis-protege", "yuanadian-amicus"]
    },
    {
      id: "cocounsel",
      name: "CoCounsel",
      region: "海外",
      logoFallback: "./logos/cocounsel.svg",
      oneLiner: "Thomson Reuters 法律 AI，深度集成 Westlaw，擅长检索、合同审查与尽调。",
      forWho: "已用 Westlaw 的诉讼/交易律所与中大型团队",
      pricing: "paid",
      pricingLabel: "约 $225/用户/月起",
      categories: ["vertical-legal"],
      links: [
        { label: "CoCounsel", url: "https://legal.thomsonreuters.com/en/products/cocounsel-legal/corp" },
        { label: "Westlaw", url: "https://legal.thomsonreuters.com/en/westlaw" }
      ],
      steps: ["在 Westlaw 生态内启用 CoCounsel。", "用 Deep Research 提出结构化法律问题。", "核对 KeyCite 引证与结论后再用于文书。"],
      alternatives: ["harvey", "lexis-protege", "spellbook"]
    },
    {
      id: "lexis-protege",
      name: "Lexis+ Protégé",
      region: "海外",
      logoFallback: "./logos/lexis-protege.svg",
      oneLiner: "LexisNexis 法律 Agent 层，300+ 预置工作流，Shepard's 引证校验。",
      forWho: "已订阅 Lexis+ 的律所与法务部门",
      pricing: "paid",
      pricingLabel: "随 Lexis+ 订阅",
      categories: ["vertical-legal"],
      links: [{ label: "Lexis+", url: "https://www.lexisnexis.com/en-us/products/lexis-plus.page" }],
      steps: ["在 Lexis+ 账号中启用 Protégé。", "选择研究、起草或合规类工作流。", "用 Shepard's 验证案例仍有效。"],
      alternatives: ["cocounsel", "harvey", "tongyi-farui"]
    },
    {
      id: "spellbook",
      name: "Spellbook",
      region: "海外",
      logoFallback: "./logos/spellbook.svg",
      oneLiner: "Word 内 AI 合同起草与审查，适合交易律师快速改条款。",
      forWho: "合同律师、并购/投融资交易团队",
      pricing: "mix",
      pricingLabel: "订阅制",
      categories: ["vertical-legal"],
      links: [{ label: "官网", url: "https://www.spellbook.legal/" }],
      steps: ["安装 Word 插件并登录。", "上传合同模板或从零描述交易结构。", "逐条 review AI 建议的条款修改。"],
      alternatives: ["cocounsel", "tongyi-farui", "yuanadian-amicus"]
    },
    {
      id: "yuanadian-amicus",
      name: "元典 Amicus",
      region: "国内",
      logoFallback: "./logos/yuanadian-amicus.svg",
      oneLiner: "华宇元典法律智能体，法规/案例/企业信息检索，低幻觉中文法律研究。",
      forWho: "中国执业律师、法官助理、企业法务",
      pricing: "mix",
      pricingLabel: "公测免费 + 订阅",
      categories: ["vertical-legal"],
      links: [
        { label: "Amicus", url: "https://ami.ailaw.cn/" },
        { label: "元典智库", url: "https://yuandian.ailaw.cn/" }
      ],
      steps: ["注册元典账号进入 Amicus。", "选择法律研究、案例检索或文书辅助。", "用幻觉校验接口复核关键法条引用。"],
      alternatives: ["tongyi-farui", "cocounsel", "kimi"]
    },
    {
      id: "tongyi-farui",
      name: "通义法睿",
      region: "国内",
      logoFallback: "./logos/tongyi-farui.svg",
      preview: "https://s0.wp.com/mshots/v1/https%3A%2F%2Ftongyi.aliyun.com%2Ffarui%2F?w=960",
      oneLiner: "阿里云法律大模型，法律咨询、类案检索、合同审查与文书生成。",
      forWho: "国内法务、律师、需要合同风控的企业",
      pricing: "mix",
      pricingLabel: "免费试用 + API",
      categories: ["vertical-legal"],
      links: [
        { label: "法睿", url: "https://tongyi.aliyun.com/farui" },
        { label: "API 文档", url: "https://help.aliyun.com/zh/model-studio/tongyi-farui/" }
      ],
      steps: ["登录通义法睿选择咨询/审查/文书模块。", "上传合同或描述案情。", "导出意见后由律师终审再对外使用。"],
      alternatives: ["yuanadian-amicus", "kimi", "spellbook"]
    },

    // ── 垂直 · 医疗 AI ──
    {
      id: "abridge",
      name: "Abridge",
      region: "海外",
      logoFallback: "./logos/abridge.svg",
      oneLiner: "AI 临床对话转结构化病历，减轻医生写病历负担。",
      forWho: "门诊医生、医院信息化团队",
      pricing: "paid",
      pricingLabel: "机构订阅",
      categories: ["vertical-medical"],
      links: [{ label: "官网", url: "https://www.abridge.com/" }],
      steps: ["在支持的 EHR 环境部署或集成。", "问诊时开启 ambient 录音转写。", "医生 review 后一键写入病历系统。"],
      alternatives: ["nuance-dax", "iflyhealth"]
    },
    {
      id: "nuance-dax",
      name: "Nuance DAX Copilot",
      region: "海外",
      logoFallback: "./logos/nuance-dax.svg",
      oneLiner: "Microsoft 旗下 ambient 临床文档 AI，与 Epic 等 EHR 深度集成。",
      forWho: "已用 Epic/Cerner 的大型医疗系统",
      pricing: "paid",
      pricingLabel: "机构许可",
      categories: ["vertical-medical"],
      links: [
        { label: "DAX Copilot", url: "https://www.nuance.com/healthcare/dax-copilot.html" },
        { label: "Microsoft", url: "https://www.microsoft.com/en-us/health-solutions/clinical-workflow" }
      ],
      steps: ["与 IT 部门评估 EHR 集成方案。", "试点科室启用 ambient 文档。", "建立医生 review 与合规审计流程。"],
      alternatives: ["abridge", "iflyhealth"]
    },
    {
      id: "iflyhealth",
      name: "讯飞医疗",
      region: "国内",
      logoFallback: "./logos/iflyhealth.svg",
      oneLiner: "科大讯飞医疗 AI，语音病历、辅诊、医学影像与医院运营智能化。",
      forWho: "国内医院、基层医疗、健康管理机构",
      pricing: "paid",
      pricingLabel: "机构采购",
      categories: ["vertical-medical"],
      links: [
        { label: "讯飞医疗", url: "https://www.iflyhealth.com/" },
        { label: "讯飞开放平台", url: "https://www.xfyun.cn/" }
      ],
      steps: ["明确场景：病历、辅诊还是影像。", "与院方 IT 评估等保与部署方式。", "小科室试点后再全院推广。"],
      alternatives: ["abridge", "doubao", "kimi"]
    },

    // ── 垂直 · 金融 AI ──
    {
      id: "alpha-sense",
      name: "AlphaSense",
      region: "海外",
      logoFallback: "./logos/alpha-sense.svg",
      oneLiner: "投行级 AI 投研搜索，财报、研报、电话会与新闻语义检索。",
      forWho: "分析师、基金经理、企业战略与 IR 团队",
      pricing: "paid",
      pricingLabel: "企业订阅",
      categories: ["vertical-finance"],
      links: [{ label: "官网", url: "https://www.alpha-sense.com/" }],
      steps: ["用自然语言提问替代关键词堆叠。", "设置 Watchlist 跟踪竞品与行业。", "导出带引用的研究摘要。"],
      alternatives: ["iwencai", "wind-ai", "deep-research"]
    },
    {
      id: "iwencai",
      name: "同花顺 i问财",
      region: "国内",
      logoFallback: "./logos/iwencai.svg",
      oneLiner: "自然语言选股与条件筛选，A 股数据查询国民级入口。",
      forWho: "散户、研究员、需要快速筛股的金融从业者",
      pricing: "mix",
      pricingLabel: "免费 + 会员",
      categories: ["vertical-finance"],
      links: [
        { label: "i问财", url: "https://www.iwencai.com/" },
        { label: "同花顺", url: "https://www.10jqka.com.cn/" }
      ],
      steps: ["用中文描述选股条件（如「ROE>15% 且 PE<20」）。", "保存常用问句为模板。", "结合财报原文人工验证结论。"],
      alternatives: ["wind-ai", "alpha-sense", "qwen"]
    },
    {
      id: "wind-ai",
      name: "Wind Alice",
      region: "国内",
      logoFallback: "./logos/wind-ai.svg",
      oneLiner: "万得 Wind 内置 AI 助手，金融数据问答、研报摘要与 Excel 插件。",
      forWho: "已用 Wind 终端的券商、基金与研究机构",
      pricing: "paid",
      pricingLabel: "随 Wind 终端",
      categories: ["vertical-finance"],
      links: [
        { label: "Wind", url: "https://www.wind.com.cn/" },
        { label: "Wind 金融终端", url: "https://www.wind.com.cn/portal/zh/WFT/index.html" }
      ],
      steps: ["在 Wind 终端打开 Alice 对话。", "提问宏观、行业或个股数据。", "导出数据到 Excel 做二次建模。"],
      alternatives: ["iwencai", "alpha-sense", "metaso"]
    },

    // ── 垂直 · 教育 AI ──
    {
      id: "khanmigo",
      name: "Khanmigo",
      region: "海外",
      logoFallback: "./logos/khanmigo.svg",
      oneLiner: "Khan Academy AI 导师，苏格拉底式引导而非直接给答案。",
      forWho: "K12 学生、家长、想练批判性思维的学习者",
      pricing: "mix",
      pricingLabel: "捐赠 / 订阅",
      categories: ["vertical-education"],
      links: [
        { label: "Khanmigo", url: "https://www.khanacademy.org/khanmigo" },
        { label: "Khan Academy", url: "https://www.khanacademy.org/" }
      ],
      steps: ["注册 Khan Academy 并开通 Khanmigo。", "描述卡点，让 AI 用提问引导思路。", "做完题后请 AI 讲解错因。"],
      alternatives: ["squirrel-ai", "doubao", "chatgpt"]
    },
    {
      id: "squirrel-ai",
      name: "松鼠 AI",
      region: "国内",
      logoFallback: "./logos/squirrel-ai.svg",
      oneLiner: "自适应学习系统，AI 诊断知识漏洞并推送个性化练习。",
      forWho: "K12 学生、教培机构、想查漏补缺的家庭",
      pricing: "paid",
      pricingLabel: "课程 / 门店",
      categories: ["vertical-education"],
      links: [{ label: "官网", url: "https://www.squirrelai.com/" }],
      steps: ["完成入学测评定位薄弱知识点。", "按系统推荐路径刷题。", "定期复测验证掌握度。"],
      alternatives: ["khanmigo", "doubao", "kimi"]
    },
    {
      id: "gradescope",
      name: "Gradescope",
      region: "海外",
      logoFallback: "./logos/gradescope.svg",
      oneLiner: "AI 辅助作业批改与 rubric 评分，高校教师减负利器。",
      forWho: "高校教师、TA、在线教育平台",
      pricing: "mix",
      pricingLabel: "机构许可",
      categories: ["vertical-education"],
      links: [
        { label: "Gradescope", url: "https://www.gradescope.com/" },
        { label: "Turnitin", url: "https://www.turnitin.com/" }
      ],
      steps: ["创建作业并上传 rubric。", "批量扫描纸质答卷或在线提交。", "AI 分组相似答案，教师终审给分。"],
      alternatives: ["khanmigo", "chatgpt", "claude"]
    },

    // ── 垂直 · 电商 AI ──
    {
      id: "xiaoduo",
      name: "晓多语流 Agent",
      region: "国内",
      logoFallback: "./logos/xiaoduo.svg",
      oneLiner: "多 Agent 协同电商客服，自动建商品知识库，售前售后全闭环。",
      forWho: "天猫/京东/抖音等多店卖家、客服团队想降本增效",
      pricing: "mix",
      pricingLabel: "按店 / 按效果",
      categories: ["vertical-ecommerce"],
      links: [
        { label: "语流 Agent", url: "https://www.xiaoduoai.com/app/detail/app_mindflow" },
        { label: "晓多科技", url: "https://www.xiaoduoai.com/" }
      ],
      steps: ["授权店铺，系统自动解析商品详情建知识库。", "配置催付、尺码推荐、售后等 Agent 策略。", "监控人机协同报表，持续优化话术。"],
      alternatives: ["pic-copilot", "linkfox", "coze"]
    },
    {
      id: "pic-copilot",
      name: "Pic Copilot",
      region: "国内",
      logoFallback: "./logos/pic-copilot.svg",
      preview: "https://s0.wp.com/mshots/v1/https%3A%2F%2Fwww.piccopilot.com%2F?w=960",
      oneLiner: "阿里国际出品，上传商品图一键生成高点击率营销主图与场景图。",
      forWho: "跨境卖家、需要批量出主图详情页的电商设计",
      pricing: "free",
      pricingLabel: "免费为主",
      categories: ["vertical-ecommerce"],
      links: [{ label: "官网", url: "https://www.piccopilot.com/" }],
      steps: ["上传白底或简单商品图。", "选行业模板与目标市场风格。", "批量导出主图、抠图与多语言图。"],
      alternatives: ["duiyou", "linkfox", "tongyi-wanxiang"]
    },
    {
      id: "linkfox",
      name: "Linkfox",
      region: "国内",
      logoFallback: "./logos/linkfox.svg",
      oneLiner: "跨境 AI Agent OS：选品洞察、Listing 文案、商品套图与 Claw 自动执行。",
      forWho: "亚马逊/TikTok Shop/独立站跨境运营",
      pricing: "mix",
      pricingLabel: "免费试用 + 订阅",
      categories: ["vertical-ecommerce"],
      links: [
        { label: "Linkfox", url: "https://www.linkfoxai.com/" },
        { label: "Agent OS", url: "https://ai.linkfox.com/" }
      ],
      steps: ["用 Agent 拆解竞品评论找痛点。", "5 分钟生成 Listing 文案 + 场景套图。", "Claw 对话下达补货、调价等运营任务。"],
      alternatives: ["pic-copilot", "xiaoduo", "chatgpt"]
    },
    {
      id: "duiyou",
      name: "堆友AI",
      region: "国内",
      logoFallback: "./logos/duiyou.svg",
      oneLiner: "阿里设计出品，电商海报、AI 模特、商品图与视频一站式生成。",
      forWho: "电商运营、平面设计师、需要中文电商素材的团队",
      pricing: "mix",
      pricingLabel: "堆豆免费 + 会员",
      categories: ["vertical-ecommerce"],
      links: [{ label: "堆友", url: "https://d.design/" }],
      steps: ["注册领取堆豆，选海报/商品图/模特工具。", "输入卖点与风格或上传参考图。", "下载无水印素材用于店铺上架。"],
      alternatives: ["pic-copilot", "jimeng", "lovart"]
    },
    {
      id: "shopify-sidekick",
      name: "Shopify Sidekick",
      region: "海外",
      logoFallback: "./logos/shopify-sidekick.svg",
      oneLiner: "Shopify 内置 AI 助手，写商品描述、分析销售、生成营销建议。",
      forWho: "Shopify 独立站卖家、DTC 品牌",
      pricing: "mix",
      pricingLabel: "随 Shopify 订阅",
      categories: ["vertical-ecommerce"],
      links: [
        { label: "Shopify Magic", url: "https://www.shopify.com/magic" },
        { label: "Shopify", url: "https://www.shopify.com/" }
      ],
      steps: ["在 Shopify Admin 打开 Sidekick。", "问「这周销量异常原因」或「写一段产品描述」。", "确认建议后再应用到店铺。"],
      alternatives: ["linkfox", "gorgias", "chatgpt"]
    },
    {
      id: "gorgias",
      name: "Gorgias",
      region: "海外",
      logoFallback: "./logos/gorgias.svg",
      oneLiner: "Shopify 生态 AI 客服，整合邮件/聊天/社媒，基于订单历史个性化回复。",
      forWho: "Shopify 卖家、跨境 DTC 品牌客服团队",
      pricing: "paid",
      pricingLabel: "按工单量订阅",
      categories: ["vertical-ecommerce"],
      links: [{ label: "官网", url: "https://www.gorgias.com/" }],
      steps: ["连接 Shopify 与邮件/聊天渠道。", "配置 AI 自动回复常见物流/退换问题。", "复杂工单转人工并沉淀宏模板。"],
      alternatives: ["xiaoduo", "shopify-sidekick", "coze"]
    },

    // ── 垂直 · HR AI ──
    {
      id: "beisen",
      name: "北森 Mavens",
      region: "国内",
      logoFallback: "./logos/beisen.svg",
      oneLiner: "AI 原生 HR 专家平台，SenGPT + AI 招聘官/面试官/陪练等 15+ 数字 HR。",
      forWho: "中大型企业 HR、重视测评与人才科学的管理团队",
      pricing: "paid",
      pricingLabel: "企业订阅",
      categories: ["vertical-hr"],
      links: [
        { label: "北森 AI", url: "https://www.beisen.com/product/ai/ms" },
        { label: "北森", url: "https://www.beisen.com/" }
      ],
      steps: ["梳理招聘/绩效/发展场景优先级。", "启用 AI 招聘官完成找简历到约面。", "AI 面试报告与真人评估交叉验证。"],
      alternatives: ["moka", "feishu-hire", "greenhouse"]
    },
    {
      id: "moka",
      name: "Moka Eva",
      region: "国内",
      logoFallback: "./logos/moka.svg",
      oneLiner: "招聘/人事/BP 三款 Eva，AI 简历解析、人才推荐与 70% 事务自动化。",
      forWho: "200–1000 人快速成长公司、招聘量大的互联网团队",
      pricing: "paid",
      pricingLabel: "企业订阅",
      categories: ["vertical-hr"],
      links: [
        { label: "Moka", url: "https://www.mokahr.com/" },
        { label: "博客", url: "https://www.mokahr.com/blog/" }
      ],
      steps: ["接入多渠道简历到 Moka ATS。", "开 AI 推荐激活沉睡人才库。", "用人事 Eva 处理入转调离重复流程。"],
      alternatives: ["beisen", "feishu-hire", "lever"]
    },
    {
      id: "feishu-hire",
      name: "飞书招聘",
      region: "国内",
      logoFallback: "./logos/feishu-hire.svg",
      oneLiner: "字节系招聘系统，与飞书日历/音视频/审批深度打通，AI 简历解析领先。",
      forWho: "已用飞书协作、希望招聘流程一体化的企业",
      pricing: "mix",
      pricingLabel: "随飞书套件",
      categories: ["vertical-hr"],
      links: [
        { label: "飞书招聘", url: "https://hire.feishu.cn/" },
        { label: "飞书", url: "https://www.feishu.cn/" }
      ],
      steps: ["在飞书开通招聘模块并搭建职位。", "全员内推与视频面试走同一工作流。", "用 AI 解析附件简历并查重。"],
      alternatives: ["moka", "beisen", "doubao"]
    },
    {
      id: "greenhouse",
      name: "Greenhouse",
      region: "海外",
      logoFallback: "./logos/greenhouse.svg",
      oneLiner: "结构化招聘 ATS 标杆，AI 筛简历、排面试与分析漏斗数据。",
      forWho: "追求流程标准化与数据驱动招聘的海外/外企团队",
      pricing: "paid",
      pricingLabel: "按席位订阅",
      categories: ["vertical-hr"],
      links: [{ label: "官网", url: "https://www.greenhouse.io/" }],
      steps: ["为每个职位配置评分卡与面试计划。", "用 AI 辅助初筛与日程协调。", "复盘各阶段转化率优化 JD。"],
      alternatives: ["lever", "moka", "beisen"]
    },
    {
      id: "lever",
      name: "Lever",
      region: "海外",
      logoFallback: "./logos/lever.svg",
      oneLiner: "ATS + CRM 一体，擅长主动寻源与候选人长期关系管理。",
      forWho: "Tech 公司、Outbound 招聘为主的团队",
      pricing: "paid",
      pricingLabel: "按席位订阅",
      categories: ["vertical-hr"],
      links: [{ label: "官网", url: "https://www.lever.co/" }],
      steps: ["建立人才库标签与 nurture 序列。", "在 CRM 中跟踪所有历史互动。", "与 Greenhouse 类工具对比后选型。"],
      alternatives: ["greenhouse", "moka", "beisen"]
    },

    // ── 垂直 · 政务 AI ──
    {
      id: "huawei-gov-ai",
      name: "华为政务智能体",
      region: "国内",
      logoFallback: "./logos/huawei-gov-ai.svg",
      oneLiner: "盘古政务大模型 + 一网智办，边聊边办、智能校验与热线 98% 接通实践。",
      forWho: "省市级数字政府、政务云与一网通办集成项目",
      pricing: "paid",
      pricingLabel: "项目制",
      categories: ["vertical-government"],
      links: [
        { label: "政务行业", url: "https://e.huawei.com/cn/industries/government" },
        { label: "一网智办", url: "https://e.huawei.com/cn/news/2026/industries/government/global-public-service-solution" }
      ],
      steps: ["评估现有政务云与数据底座。", "试点智能客服 + 材料智能校验场景。", "区-街道-社区四级联动扩展。"],
      alternatives: ["linewell-gov", "iflytek-city", "aliyun-gov"]
    },
    {
      id: "linewell-gov",
      name: "南威 WellWork",
      region: "国内",
      logoFallback: "./logos/linewell-gov.svg",
      oneLiner: "政务智能体操作系统，数字公务员/民警，一网通办·协同·统管场景落地。",
      forWho: "政务服务集成商、深耕数字政府 20 年的区域项目",
      pricing: "paid",
      pricingLabel: "项目制",
      categories: ["vertical-government"],
      links: [
        { label: "南威软件", url: "https://www.linewell.com/" },
        { label: "华为联合方案", url: "https://e.huawei.com/cn/news/2026/industries/government/linewell-launch-public-serviceai-agent-solution" }
      ],
      steps: ["对接现有审批与事项库。", "用 WellWork 孵化办事咨询 Agent。", "跨系统协同与组织级记忆持续运营。"],
      alternatives: ["huawei-gov-ai", "aliyun-gov", "iflytek-city"]
    },
    {
      id: "iflytek-city",
      name: "讯飞城市智能体",
      region: "国内",
      logoFallback: "./logos/iflytek-city.svg",
      oneLiner: "星火大模型 + 114N 城市智能体架构，治理/就业/园区等多场景 Agent。",
      forWho: "智慧城市、城市大脑与全域数字化转型项目",
      pricing: "paid",
      pricingLabel: "项目制",
      categories: ["vertical-government"],
      links: [
        { label: "科大讯飞", url: "https://www.iflytek.com/" },
        { label: "星火认知", url: "https://xinghuo.xfyun.cn/" }
      ],
      steps: ["梳理城市算力与数据空间现状。", "在治理或政务大厅选 1 个高频场景试点。", "扩展虚拟人客服与多轮政策问答。"],
      alternatives: ["huawei-gov-ai", "aliyun-gov", "zhipu"]
    },
    {
      id: "aliyun-gov",
      name: "阿里云政务百炼",
      region: "国内",
      logoFallback: "./logos/aliyun-gov.svg",
      oneLiner: "百炼专属版 + 政务服务大模型，政策解析、证照识别与办事引导助手。",
      forWho: "已上阿里云政务云、需要自建行业智能体的政企客户",
      pricing: "paid",
      pricingLabel: "项目 / 专属版",
      categories: ["vertical-government"],
      links: [
        { label: "百炼专属版", url: "https://ue.aliyun.com/solution/dedicated-model-studio" },
        { label: "政企业务", url: "https://ue.aliyun.com/" }
      ],
      steps: ["在 VPC 或专有云部署百炼专属版。", "导入政策库与事项知识。", "搭建咨询/办事 Agent 并联调钉钉。"],
      alternatives: ["huawei-gov-ai", "qwen", "linewell-gov"]
    },
    {
      id: "baidu-gov",
      name: "百度智能云政务",
      region: "国内",
      logoFallback: "./logos/baidu-gov.svg",
      oneLiner: "文心政务大模型，智能问答、公文辅助与城市运行监测场景方案。",
      forWho: "百度生态政务云客户、需要 NLP 与搜索增强的 G 端项目",
      pricing: "paid",
      pricingLabel: "项目制",
      categories: ["vertical-government"],
      links: [
        { label: "智能云", url: "https://cloud.baidu.com/" },
        { label: "文心一言", url: "https://yiyan.baidu.com/" }
      ],
      steps: ["评估现有百度政务云资源。", "选用问答或公文类标准方案试点。", "对接本地事项库与身份核验。"],
      alternatives: ["aliyun-gov", "huawei-gov-ai", "ernie"]
    },

    // ── 垂直 · 旅游 AI ──
    {
      id: "ctrip-planner",
      name: "携程 AI 行程助手",
      region: "国内",
      logoFallback: "./logos/ctrip-planner.svg",
      preview: "https://s0.wp.com/mshots/v1/https%3A%2F%2Fwww.ctrip.com%2Ftripplanner%2F?w=960",
      oneLiner: "输入目的地与天数，AI 生成可拖拽地图行程，覆盖食住行游购，可直连预订。",
      forWho: "国内/出境自由行、需要权威开放时间与交通预估的用户",
      pricing: "free",
      pricingLabel: "免费规划 + 预订",
      categories: ["vertical-travel"],
      links: [
        { label: "Trip.Planner", url: "https://www.ctrip.com/tripplanner/" },
        { label: "携程", url: "https://www.ctrip.com/" }
      ],
      steps: ["选目的地、游玩天数与旅行风格。", "在地图视图拖拽调整每日顺序。", "需要落地时转人工定制师或 App 内预订。"],
      alternatives: ["fliggy-wenyiwen", "trip-com", "mafengwo-ai"]
    },
    {
      id: "fliggy-wenyiwen",
      name: "飞猪问一问",
      region: "国内",
      logoFallback: "./logos/fliggy-wenyiwen.svg",
      oneLiner: "多智能体 OTA 助手，20 秒出方案 + 实时比价，支持语音/方言与手绘攻略分享。",
      forWho: "阿里系用户、五一/长假家庭游、想一键订机票酒店者",
      pricing: "free",
      pricingLabel: "免费 + 平台预订",
      categories: ["vertical-travel"],
      links: [
        { label: "飞猪", url: "https://www.fliggy.com/" },
        { label: "阿里旅行", url: "https://www.alitrip.com/" }
      ],
      steps: ["在飞猪 App 底部行程栏点「问一问」。", "描述出发地、天数、人数与预算滑条。", "查看带商品卡片的方案并一键预订。"],
      alternatives: ["ctrip-planner", "trip-com", "qwen"]
    },
    {
      id: "trip-com",
      name: "Trip.com Trip.Planner",
      region: "海外",
      logoFallback: "./logos/trip-com.svg",
      oneLiner: "Trip.com 内置 AI 行程规划，整合全球 2000 万 POI 与实时机酒价格。",
      forWho: "跨境/港澳台出行、习惯 Trip.com 预订的用户",
      pricing: "free",
      pricingLabel: "免费 + 预订",
      categories: ["vertical-travel"],
      links: [
        { label: "Trip.com", url: "https://www.trip.com/" },
        { label: "Trip Genie", url: "https://www.trip.com/" }
      ],
      steps: ["在 App 打开 Trip.Planner。", "输入目的地、天数与旅行风格三要素。", "在地图路线中直接预订机酒与门票。"],
      alternatives: ["ctrip-planner", "layla", "mindtrip"]
    },
    {
      id: "mafengwo-ai",
      name: "马蜂窝 AI小蚂",
      region: "国内",
      logoFallback: "./logos/mafengwo-ai.svg",
      oneLiner: "接入 DeepSeek 的垂直旅行助手，实时问答 + AI 路书深度定制攻略。",
      forWho: "攻略党、小众目的地、需要互动式路书定制的旅行者",
      pricing: "free",
      pricingLabel: "免费为主",
      categories: ["vertical-travel"],
      links: [
        { label: "马蜂窝", url: "https://www.mafengwo.cn/" },
        { label: "马蜂窝官网", url: "https://www.mafengwo.cn/" }
      ],
      steps: ["在 App 首页搜索栏或 POI 页打开 AI 小蚂。", "用 AI 路书回答延展问题完善需求。", "导出含预算与贴士的完整路书。"],
      alternatives: ["ctrip-planner", "fliggy-wenyiwen", "deepseek"]
    },
    {
      id: "layla",
      name: "Layla",
      region: "海外",
      logoFallback: "./logos/layla.svg",
      preview: "https://s0.wp.com/mshots/v1/https%3A%2F%2Flayla.ai%2F?w=960",
      oneLiner: "AI 旅行代理，实时票价生成逐日行程，可纯 AI 或与真人专家协同预订。",
      forWho: "欧美自由行、多城联程/公路旅行、英文规划用户",
      pricing: "mix",
      pricingLabel: "免费 + $49/年 Pro",
      categories: ["vertical-travel"],
      links: [
        { label: "官网", url: "https://layla.ai/" },
        { label: "中文版", url: "https://layla.ai/zh" }
      ],
      steps: ["告诉 Layla 日期、目的地、预算与同行人。", "迭代 day-by-day 计划直到满意。", "需要时升级 Pro 或转真人代订。"],
      alternatives: ["mindtrip", "trip-com", "chatgpt"]
    },
    {
      id: "mindtrip",
      name: "Mindtrip",
      region: "海外",
      logoFallback: "./logos/mindtrip.svg",
      oneLiner: "聊天 + 地图 + 可编辑行程一体，支持 Sabre 机票与酒店/App 内一键结账。",
      forWho: "想 plan & book 同一窗口完成的全球旅行者",
      pricing: "free",
      pricingLabel: "核心功能免费",
      categories: ["vertical-travel"],
      links: [
        { label: "Mindtrip", url: "https://mindtrip.ai/" },
        { label: "开始规划", url: "https://mindtrip.ai/chat" }
      ],
      steps: ["在 chat 描述偏好与复杂航班条件。", "在地图视图发现路线绕路问题并微调。", "机酒活动在对话内直接比价预订。"],
      alternatives: ["layla", "trip-com", "ctrip-planner"]
    },
    {
      id: "wanderlog",
      name: "Wanderlog",
      region: "海外",
      logoFallback: "./logos/wanderlog.svg",
      oneLiner: "协作行程本 + AI 推荐，多人共编、预算追踪与离线地图。",
      forWho: "结伴出行、需要共享行程与费用分摊的小团体",
      pricing: "mix",
      pricingLabel: "免费 + Pro",
      categories: ["vertical-travel"],
      links: [
        { label: "官网", url: "https://wanderlog.com/" },
        { label: "Wanderlog", url: "https://wanderlog.com/home" }
      ],
      steps: ["用 AI 生成初版每日行程。", "邀请旅伴评论共编。", "导出离线地图与预订链接。"],
      alternatives: ["mindtrip", "layla", "mafengwo-ai"]
    },

    // ── 垂直 · UI 设计 ──
    {
      id: "figma",
      name: "Figma",
      region: "海外",
      logoFallback: "./logos/figma.svg",
      preview: "https://s0.wp.com/mshots/v1/https%3A%2F%2Fwww.figma.com%2F?w=960",
      oneLiner: "协作 UI/UX 设计行业标准，Figma AI 与 Make 支持自然语言生成界面与原型。",
      forWho: "产品、设计师、需要高保真界面与团队协作的创作者",
      pricing: "mix",
      pricingLabel: "免费 + 专业版",
      categories: ["vertical-ui"],
      links: [
        { label: "官网", url: "https://www.figma.com/" },
        { label: "Figma AI", url: "https://www.figma.com/ai/" }
      ],
      steps: [
        "注册 Figma 账号，新建 Design 或 FigJam 文件。",
        "用 Figma AI 描述页面结构、组件风格，或从截图/线框图生成初稿。",
        "组件化整理设计系统，与开发共享 Dev Mode 或导出给工程团队。"
      ],
      alternatives: ["google-stitch", "lovart", "dalle3"]
    },
    {
      id: "google-stitch",
      name: "Google Stitch",
      region: "海外",
      logoFallback: "./logos/google-stitch.svg",
      preview: "https://s0.wp.com/mshots/v1/https%3A%2F%2Fstitch.withgoogle.com%2F?w=960",
      oneLiner: "Google Labs 出品的 AI 原生 UI 画布，文字/语音/截图秒出多屏高保真界面，可导出 Figma 与 HTML。",
      forWho: "想快速验证 App/网页界面、从想法到可交付原型的产品与设计入门者",
      pricing: "free",
      pricingLabel: "免费（Google 账号）",
      categories: ["vertical-ui"],
      links: [
        { label: "Stitch", url: "https://stitch.withgoogle.com/" },
        { label: "Google 博客", url: "https://blog.google/innovation-and-ai/models-and-research/google-labs/stitch-ai-ui-design/" }
      ],
      steps: [
        "用 Google 账号登录 stitch.withgoogle.com，无需安装。",
        "用文字描述整段用户流程，或上传截图/线稿作为上下文，让 Agent 生成多屏界面。",
        "在画布上语音微调配色与布局，导出 Figma 文件或 HTML/CSS 交给开发/编码 Agent。"
      ],
      alternatives: ["figma", "dalle3", "lovart"]
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
      title: "即梦升级一站式 AI 创作：图片、视频与智能画布",
      summary: "国产文生图 / 文生视频练手首选之一。",
      date: "2026-07-19",
      categoryIds: ["visual-image"],
      productIds: ["jimeng"],
      content: [
        "即梦 AI（字节剪映）现已覆盖文生图、文生视频、智能画布与 Agent 灵感检索，接入 Seedream 图像与 Seedance 视频模型，中文提示词友好。",
        "练手建议：同一主题分别试「海报静图」和「5 秒镜头」，体会图片与视频 prompt 的写法差异。",
        "与可灵、Midjourney 相比，即梦上手更快、与剪映/抖音生态打通；追求极致艺术质感时可横向对比海外工具。"
      ],
      highlights: ["中文 prompt 友好", "图片 + 视频一体", "可导入剪映继续剪辑"]
    },
    {
      id: "n5",
      title: "Midjourney V7 风格控制增强",
      summary: "海外视觉 AI 艺术向仍是标杆。",
      date: "2026-07-18",
      categoryIds: ["visual-image"],
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

  featuredBanner: ["tapnow", "libtv", "flova", "kling", "runway", "jimeng", "cursor", "meshy"],

  categoryPins: {
    agent: ["workbuddy", "codex", "cursor"]
  }
};
