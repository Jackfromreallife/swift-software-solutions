import { createContext, useContext, useEffect, useState, ReactNode } from "react";

export type Lang = "en" | "zh";

const en = {
  langName: "English",
  header: {
    nav: { services: "Services", process: "Process", consultation: "Free Consultation", contact: "Contact" },
    getStarted: "Get Started",
    toggleMenu: "Toggle menu",
  },
  hero: {
    badge: "AI-Powered Development",
    titleBefore: "Modernize Your",
    titleHighlight: "Legacy Software",
    titleAfter: "in Days, Not Months",
    subBefore:
      "Rebuild aging applications with AI-powered tools. Migrate data to modern databases like MongoDB. Get a working prototype in",
    subHighlight: "1-3 working days",
    subAfter: ".",
    cta1: "Free Consultation",
    cta2: "See How It Works",
    stats: [
      { value: "1-3 Days", label: "Per Department Module" },
      { value: "100%", label: "Data Migration Success" },
      { value: "AI-Powered", label: "Modern Development" },
    ],
  },
  services: {
    label: "What I Offer",
    titleBefore: "Services Built for",
    titleHighlight: "Modern Business",
    subtitle: "End-to-end solutions to transform your legacy systems into powerful, modern applications.",
    items: [
      {
        title: "AI-Powered Rebuilding",
        description:
          "Leverage cutting-edge AI tools to rebuild your legacy applications faster than traditional development. Modern code, better performance.",
      },
      {
        title: "Database Migration",
        description:
          "Seamlessly migrate your data to modern databases like MongoDB, PostgreSQL, or cloud solutions. Zero data loss guaranteed.",
      },
      {
        title: "Modern Tech Stack",
        description:
          "Upgrade to React, Node.js, TypeScript, and other modern technologies. Future-proof your applications.",
      },
      {
        title: "Legacy Modernization",
        description:
          "Transform outdated systems into sleek, efficient applications. Keep your business logic, upgrade everything else.",
      },
      {
        title: "Secure Architecture",
        description:
          "Built with security-first principles. Modern authentication, encryption, and compliance standards.",
      },
      {
        title: "Scalable Design",
        description:
          "Architecture designed to grow with your business. From startup to enterprise-ready infrastructure.",
      },
    ],
  },
  process: {
    label: "How It Works",
    titleBefore: "From Idea to",
    titleHighlight: "Live Application",
    subtitle: "A streamlined process designed for busy businesses. See results in days, not months.",
    steps: [
      {
        title: "Share Your Requirements",
        description:
          "Tell me about your current system, pain points, and what you need. No technical jargon required—just explain your business needs.",
        highlight: "Simple conversation",
      },
      {
        title: "Free Feasibility Analysis",
        description:
          "Even without database credentials, I'll analyze your system's architecture and provide a comprehensive assessment of what's possible.",
        highlight: "No data access needed",
      },
      {
        title: "Watch It Being Built",
        description:
          "See your new application take shape in real-time. Using AI-powered development, I'll show you a working prototype within 1-3 working days.",
        highlight: "1-3 days delivery",
      },
      {
        title: "Deploy & Migrate",
        description:
          "Once approved, we'll safely migrate your data and deploy the new system. Full training and support included.",
        highlight: "Zero downtime",
      },
    ],
  },
  consultation: {
    label: "Free Consultation",
    titleBefore: "Let's Analyze Your",
    titleHighlight: "Legacy System",
    subtitle:
      "Even if you don't have access to database credentials, I can still analyze your system's feasibility for modernization. Get honest insights before committing to anything.",
    benefits: [
      "Free feasibility analysis—no obligations",
      "No database credentials required initially",
      "Understand migration complexity upfront",
      "Get a realistic timeline and cost estimate",
      "See examples of similar transformations",
    ],
    formTitle: "Request Free Analysis",
    name: "Your Name",
    email: "Email Address",
    company: "Company Name",
    currentSystem: "Current System Type",
    requirements: "Tell Me About Your Needs",
    placeholders: {
      name: "John Doe",
      email: "john@company.com",
      company: "Acme Inc.",
      currentSystem: "e.g., Access, Excel, Old ERP",
      requirements:
        "Describe your current system, what problems you're facing, and what you'd like to achieve...",
    },
    submitting: "Submitting...",
    submit: "Get Free Analysis",
    finePrint: "No spam. No obligations. Just honest analysis.",
    toastSuccess: "Thank you! I'll get back to you within 24 hours.",
    toastError: "Failed to send your request. Please try again or contact us directly at jack_li@reallife.sg",
    errorRequired: "Please fill in all required fields",
    errorEmail: "Please enter a valid email address",
  },
  contact: {
    label: "Get In Touch",
    titleBefore: "Ready to",
    titleHighlight: "Modernize",
    titleAfter: "?",
    subtitle: "Have questions? Want to discuss your project? I'm here to help.",
    email: "Email",
    consultation: "Consultation",
    bookCall: "Book a free call",
    location: "Location",
    remote: "Remote / Worldwide",
  },
  footer: {
    services: "Services",
    process: "Process",
    consultation: "Consultation",
    contact: "Contact",
    rights: "All rights reserved.",
  },
};

const zh: typeof en = {
  langName: "中文",
  header: {
    nav: { services: "服务", process: "流程", consultation: "免费咨询", contact: "联系我们" },
    getStarted: "立即开始",
    toggleMenu: "切换菜单",
  },
  hero: {
    badge: "AI 驱动开发",
    titleBefore: "现代化改造您的",
    titleHighlight: "遗留系统",
    titleAfter: "只需数天，而非数月",
    subBefore: "使用 AI 工具重建老旧应用，将数据迁移至 MongoDB 等现代数据库。",
    subHighlight: "1-3 个工作日内",
    subAfter: "交付可运行原型。",
    cta1: "免费咨询",
    cta2: "了解流程",
    stats: [
      { value: "1-3 天", label: "每个部门模块" },
      { value: "100%", label: "数据迁移成功率" },
      { value: "AI 驱动", label: "现代化开发" },
    ],
  },
  services: {
    label: "我们的服务",
    titleBefore: "为现代企业打造的",
    titleHighlight: "服务",
    subtitle: "一站式解决方案，将您的遗留系统转变为强大、现代的应用程序。",
    items: [
      {
        title: "AI 驱动重建",
        description: "利用前沿 AI 工具，以远超传统开发的速度重建您的遗留应用。现代化代码，更优性能。",
      },
      {
        title: "数据库迁移",
        description: "无缝将数据迁移至 MongoDB、PostgreSQL 等现代数据库或云端方案。保证零数据丢失。",
      },
      {
        title: "现代技术栈",
        description: "升级至 React、Node.js、TypeScript 等现代技术，让您的应用面向未来。",
      },
      {
        title: "遗留系统现代化",
        description: "将过时系统转变为流畅高效的应用。保留业务逻辑，升级其余一切。",
      },
      {
        title: "安全架构",
        description: "以安全优先为原则构建，采用现代认证、加密与合规标准。",
      },
      {
        title: "可扩展设计",
        description: "架构随业务成长而扩展，从初创到企业级基础设施。",
      },
    ],
  },
  process: {
    label: "运作方式",
    titleBefore: "从创意到",
    titleHighlight: "上线应用",
    subtitle: "为忙碌的企业打造的高效流程，数天即可见成效，而非数月。",
    steps: [
      {
        title: "分享您的需求",
        description: "告诉我您当前的系统、痛点和需求。无需技术术语——只需说明您的业务需求。",
        highlight: "简单沟通",
      },
      {
        title: "免费可行性分析",
        description: "即使没有数据库访问权限，我也会分析您的系统架构，并提供全面的可行性评估。",
        highlight: "无需数据访问权限",
      },
      {
        title: "观看构建过程",
        description: "实时见证新应用成形。通过 AI 驱动开发，我们将在 1-3 个工作日内向您展示可运行的原型。",
        highlight: "1-3 天交付",
      },
      {
        title: "部署与迁移",
        description: "批准后，我们将安全迁移您的数据并部署新系统，包含完整培训与支持。",
        highlight: "零停机",
      },
    ],
  },
  consultation: {
    label: "免费咨询",
    titleBefore: "让我们分析您的",
    titleHighlight: "遗留系统",
    subtitle:
      "即使您没有数据库访问权限，我们仍可分析您系统现代化的可行性。在做出任何承诺之前，获得诚实的评估。",
    benefits: [
      "免费可行性分析——无任何义务",
      "初期无需数据库凭据",
      "提前了解迁移复杂度",
      "获得切合实际的时间与成本估算",
      "查看类似转型案例",
    ],
    formTitle: "申请免费分析",
    name: "您的姓名",
    email: "电子邮箱",
    company: "公司名称",
    currentSystem: "当前系统类型",
    requirements: "请描述您的需求",
    placeholders: {
      name: "张三",
      email: "name@company.com",
      company: "某某公司",
      currentSystem: "例如：Access、Excel、旧版 ERP",
      requirements: "请描述您当前系统、遇到的问题以及期望实现的目标……",
    },
    submitting: "提交中……",
    submit: "获取免费分析",
    finePrint: "无垃圾邮件，无任何义务，只有诚实的分析。",
    toastSuccess: "谢谢！我们将在 24 小时内回复您。",
    toastError: "发送失败，请重试或直接联系我们：jack_li@reallife.sg",
    errorRequired: "请填写所有必填字段",
    errorEmail: "请输入有效的邮箱地址",
  },
  contact: {
    label: "联系我们",
    titleBefore: "准备好",
    titleHighlight: "现代化转型",
    titleAfter: "了吗？",
    subtitle: "有疑问？想讨论您的项目？我们随时为您提供帮助。",
    email: "邮箱",
    consultation: "免费咨询",
    bookCall: "预约免费通话",
    location: "服务范围",
    remote: "远程 / 全球",
  },
  footer: {
    services: "服务",
    process: "流程",
    consultation: "咨询",
    contact: "联系我们",
    rights: "版权所有。",
  },
};

const dictionaries: Record<Lang, typeof en> = { en, zh };

interface LangContextValue {
  lang: Lang;
  setLang: (lang: Lang) => void;
  dict: typeof en;
  t: (key: string) => string;
}

const LangContext = createContext<LangContextValue | null>(null);

function getByPath(obj: unknown, path: string): string {
  return path.split(".").reduce<unknown>((acc, part) => {
    if (acc && typeof acc === "object" && part in (acc as Record<string, unknown>)) {
      return (acc as Record<string, unknown>)[part];
    }
    return undefined;
  }, obj) as string;
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>(() => {
    const saved = typeof window !== "undefined" ? localStorage.getItem("agentdev-lang") : null;
    return saved === "zh" ? "zh" : "en";
  });

  const dict = dictionaries[lang];

  useEffect(() => {
    localStorage.setItem("agentdev-lang", lang);
    document.documentElement.lang = lang === "zh" ? "zh-CN" : "en";
    document.title =
      lang === "zh" ? "AgentDev · AI 驱动开发 · 遗留系统现代化" : "AgentDev · AI-Powered Development";
  }, [lang]);

  const t = (key: string) => getByPath(dict, key) ?? key;

  return <LangContext.Provider value={{ lang, setLang, dict, t }}>{children}</LangContext.Provider>;
}

export function useLang(): LangContextValue {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error("useLang must be used within LanguageProvider");
  return ctx;
}
