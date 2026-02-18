import type { ComponentSchema } from "@/types";

// 组件注册表
export const componentRegistry: Record<string, ComponentSchema> = {
  // ============================================
  // 基础布局组件
  // ============================================
  container: {
    type: "container",
    category: "layout",
    name: "Container",
    description: "内容容器，控制最大宽度",
    icon: "layout",
    props: {
      maxWidth: {
        type: "select",
        label: "最大宽度",
        defaultValue: "1200px",
        options: [
          { label: "窄 (640px)", value: "640px" },
          { label: "中 (960px)", value: "960px" },
          { label: "宽 (1200px)", value: "1200px" },
          { label: "全宽", value: "100%" },
        ],
      },
      padding: {
        type: "select",
        label: "内边距",
        defaultValue: "md",
        options: [
          { label: "无", value: "none" },
          { label: "小", value: "sm" },
          { label: "中", value: "md" },
          { label: "大", value: "lg" },
          { label: "特大", value: "xl" },
        ],
      },
    },
    acceptChildren: true,
    componentPath: "@/builder-components/base/Container",
  },

  row: {
    type: "row",
    category: "layout",
    name: "Row",
    description: "行布局容器（横向排列）",
    icon: "rows",
    props: {
      gap: {
        type: "select",
        label: "间距",
        defaultValue: "md",
        options: [
          { label: "无", value: "0" },
          { label: "小", value: "sm" },
          { label: "中", value: "md" },
          { label: "大", value: "lg" },
          { label: "特大", value: "xl" },
        ],
      },
      align: {
        type: "select",
        label: "垂直对齐",
        defaultValue: "center",
        options: [
          { label: "起始", value: "flex-start" },
          { label: "居中", value: "center" },
          { label: "末尾", value: "flex-end" },
          { label: "拉伸", value: "stretch" },
        ],
      },
      justify: {
        type: "select",
        label: "水平对齐",
        defaultValue: "flex-start",
        options: [
          { label: "起始", value: "flex-start" },
          { label: "居中", value: "center" },
          { label: "末尾", value: "flex-end" },
          { label: "两端对齐", value: "space-between" },
          { label: "均匀分布", value: "space-around" },
        ],
      },
    },
    acceptChildren: true,
    componentPath: "@/builder-components/base/Row",
  },

  column: {
    type: "column",
    category: "layout",
    name: "Column",
    description: "列布局容器（纵向排列）",
    icon: "columns",
    props: {
      gap: {
        type: "select",
        label: "间距",
        defaultValue: "md",
        options: [
          { label: "无", value: "0" },
          { label: "小", value: "sm" },
          { label: "中", value: "md" },
          { label: "大", value: "lg" },
          { label: "特大", value: "xl" },
        ],
      },
      align: {
        type: "select",
        label: "水平对齐",
        defaultValue: "flex-start",
        options: [
          { label: "起始", value: "flex-start" },
          { label: "居中", value: "center" },
          { label: "末尾", value: "flex-end" },
        ],
      },
    },
    acceptChildren: true,
    componentPath: "@/builder-components/base/Column",
  },

  spacer: {
    type: "spacer",
    category: "layout",
    name: "Spacer",
    description: "间距占位",
    icon: "minus",
    props: {
      height: {
        type: "select",
        label: "高度",
        defaultValue: "32",
        options: [
          { label: "16px", value: "16" },
          { label: "32px", value: "32" },
          { label: "48px", value: "48" },
          { label: "64px", value: "64" },
          { label: "96px", value: "96" },
        ],
      },
    },
    acceptChildren: false,
    componentPath: "@/builder-components/base/Spacer",
  },

  divider: {
    type: "divider",
    category: "layout",
    name: "Divider",
    description: "分割线",
    icon: "minus",
    props: {
      style: {
        type: "select",
        label: "样式",
        defaultValue: "solid",
        options: [
          { label: "实线", value: "solid" },
          { label: "虚线", value: "dashed" },
          { label: "渐变", value: "gradient" },
        ],
      },
    },
    acceptChildren: false,
    componentPath: "@/builder-components/base/Divider",
  },

  // ============================================
  // 内容组件
  // ============================================
  text: {
    type: "text",
    category: "content",
    name: "Text",
    description: "文本内容",
    icon: "type",
    props: {
      variant: {
        type: "select",
        label: "样式",
        defaultValue: "body",
        options: [
          { label: "标题1", value: "h1" },
          { label: "标题2", value: "h2" },
          { label: "标题3", value: "h3" },
          { label: "标题4", value: "h4" },
          { label: "正文", value: "body" },
          { label: "小字", value: "small" },
          { label: "说明", value: "muted" },
          { label: "导语", value: "lead" },
        ],
      },
      align: {
        type: "select",
        label: "对齐",
        defaultValue: "left",
        options: [
          { label: "左对齐", value: "left" },
          { label: "居中", value: "center" },
          { label: "右对齐", value: "right" },
          { label: "两端对齐", value: "justify" },
        ],
      },
    },
    acceptChildren: true,
    componentPath: "@/builder-components/content/Text",
  },

  image: {
    type: "image",
    category: "content",
    name: "Image",
    description: "图片",
    icon: "image",
    props: {
      src: {
        type: "image",
        label: "图片",
        required: true,
      },
      alt: {
        type: "string",
        label: "替代文本",
        defaultValue: "",
      },
      width: {
        type: "select",
        label: "宽度",
        defaultValue: "full",
        options: [
          { label: "原始", value: "auto" },
          { label: "全宽", value: "full" },
          { label: "一半", value: "1/2" },
          { label: "三分之一", value: "1/3" },
          { label: "四分之一", value: "1/4" },
        ],
      },
      rounded: {
        type: "select",
        label: "圆角",
        defaultValue: "md",
        options: [
          { label: "无", value: "none" },
          { label: "小", value: "sm" },
          { label: "中", value: "md" },
          { label: "大", value: "lg" },
          { label: "圆形", value: "full" },
        ],
      },
    },
    acceptChildren: false,
    componentPath: "@/builder-components/content/Image",
  },

  button: {
    type: "button",
    category: "content",
    name: "Button",
    description: "按钮",
    icon: "mouse-pointer",
    props: {
      variant: {
        type: "select", label: "样式", defaultValue: "primary",
        options: [
          { label: "默认", value: "default" },
          { label: "主要", value: "primary" },
          { label: "次要", value: "secondary" },
          { label: "轮廓", value: "outline" },
          { label: "幽灵", value: "ghost" },
          { label: "链接", value: "link" },
        ],
      },
      size: {
        type: "select", label: "尺寸", defaultValue: "default",
        options: [
          { label: "小", value: "sm" },
          { label: "默认", value: "default" },
          { label: "大", value: "lg" },
        ],
      },
      href: { type: "string", label: "链接地址", defaultValue: "" },
    },
    acceptChildren: true,
    componentPath: "@/builder-components/content/Button",
  },

  video: {
    type: "video",
    category: "content",
    name: "Video",
    description: "视频嵌入",
    icon: "play",
    props: {
      url: { type: "string", label: "视频地址", defaultValue: "" },
      aspectRatio: {
        type: "select", label: "比例", defaultValue: "16/9",
        options: [
          { label: "16:9", value: "16/9" },
          { label: "4:3", value: "4/3" },
          { label: "1:1", value: "1/1" },
        ],
      },
    },
    acceptChildren: false,
    componentPath: "@/builder-components/content/Video",
  },

  icon: {
    type: "icon",
    category: "content",
    name: "Icon",
    description: "图标",
    icon: "star",
    props: {
      name: { type: "string", label: "图标字符", defaultValue: "⭐" },
      size: {
        type: "select", label: "尺寸", defaultValue: "md",
        options: [
          { label: "小", value: "sm" },
          { label: "中", value: "md" },
          { label: "大", value: "lg" },
        ],
      },
      color: { type: "string", label: "颜色", defaultValue: "" },
    },
    acceptChildren: false,
    componentPath: "@/builder-components/content/Icon",
  },

  link: {
    type: "link",
    category: "content",
    name: "Link",
    description: "链接",
    icon: "link",
    props: {
      text: { type: "string", label: "链接文字", defaultValue: "链接", required: true },
      href: { type: "string", label: "链接地址", defaultValue: "#" },
      target: {
        type: "select", label: "打开方式", defaultValue: "_self",
        options: [
          { label: "当前窗口", value: "_self" },
          { label: "新窗口", value: "_blank" },
        ],
      },
    },
    acceptChildren: false,
    componentPath: "@/builder-components/content/Link",
  },

  // ============================================
  // 高级组件
  // ============================================
  "hero-section": {
    type: "hero-section",
    category: "advanced",
    name: "Hero Section",
    description: "英雄区容器，用于页面顶部展示",
    icon: "layout",
    props: {
      backgroundImage: {
        type: "image",
        label: "背景图片",
      },
      alignment: {
        type: "select",
        label: "对齐方式",
        defaultValue: "center",
        options: [
          { label: "居左", value: "left" },
          { label: "居中", value: "center" },
          { label: "居右", value: "right" },
        ],
      },
      overlay: {
        type: "select",
        label: "背景遮罩",
        defaultValue: "true",
        options: [
          { label: "开启", value: "true" },
          { label: "关闭", value: "false" },
        ],
      },
      minHeight: {
        type: "select",
        label: "最小高度",
        defaultValue: "500px",
        options: [
          { label: "400px", value: "400px" },
          { label: "500px", value: "500px" },
          { label: "600px", value: "600px" },
          { label: "700px", value: "700px" },
        ],
      },
    },
    acceptChildren: true,
    componentPath: "@/builder-components/advanced/HeroSection",
    defaultStyles: {
      padding: { top: "xl", bottom: "xl" },
    },
  },

  "feature-grid": {
    type: "feature-grid",
    category: "advanced",
    name: "Feature Grid",
    description: "功能展示网格容器",
    icon: "grid",
    props: {
      columns: {
        type: "select",
        label: "列数",
        defaultValue: "3",
        options: [
          { label: "2列", value: "2" },
          { label: "3列", value: "3" },
          { label: "4列", value: "4" },
        ],
      },
      showBackground: {
        type: "select",
        label: "显示背景",
        defaultValue: "true",
        options: [
          { label: "开启", value: "true" },
          { label: "关闭", value: "false" },
        ],
      },
      padding: {
        type: "select",
        label: "内边距",
        defaultValue: "lg",
        options: [
          { label: "无", value: "none" },
          { label: "小", value: "sm" },
          { label: "中", value: "md" },
          { label: "大", value: "lg" },
        ],
      },
    },
    acceptChildren: true,
    componentPath: "@/builder-components/advanced/FeatureGrid",
  },

  "contact-form": {
    type: "contact-form",
    category: "advanced",
    name: "Contact Form",
    description: "联系表单",
    icon: "mail",
    props: {
      title: {
        type: "string",
        label: "标题",
        defaultValue: "联系我们",
      },
      description: {
        type: "text",
        label: "描述",
        defaultValue: "填写下面的表单，我们会尽快回复您。",
      },
    },
    acceptChildren: false,
    componentPath: "@/builder-components/advanced/ContactForm",
  },

  testimonials: {
    type: "testimonials",
    category: "advanced",
    name: "Testimonials",
    description: "客户评价",
    icon: "message-circle",
    props: {
      title: { type: "string", label: "标题", defaultValue: "客户评价" },
      layout: {
        type: "select", label: "布局", defaultValue: "grid",
        options: [
          { label: "网格", value: "grid" },
          { label: "列表", value: "list" },
        ],
      },
    },
    acceptChildren: false,
    componentPath: "@/builder-components/advanced/Testimonials",
  },

  "pricing-table": {
    type: "pricing-table",
    category: "advanced",
    name: "Pricing Table",
    description: "定价方案",
    icon: "credit-card",
    props: {
      title: { type: "string", label: "标题", defaultValue: "定价方案" },
    },
    acceptChildren: false,
    componentPath: "@/builder-components/advanced/PricingTable",
  },

  "stats-counter": {
    type: "stats-counter",
    category: "advanced",
    name: "Stats Counter",
    description: "数据统计",
    icon: "bar-chart",
    props: {},
    acceptChildren: false,
    componentPath: "@/builder-components/advanced/StatsCounter",
  },

  faq: {
    type: "faq",
    category: "advanced",
    name: "FAQ",
    description: "常见问题",
    icon: "help-circle",
    props: {
      title: { type: "string", label: "标题", defaultValue: "常见问题" },
    },
    acceptChildren: false,
    componentPath: "@/builder-components/advanced/FAQ",
  },

  navbar: {
    type: "navbar",
    category: "advanced",
    name: "Navbar",
    description: "导航栏",
    icon: "navigation",
    props: {
      logo: { type: "string", label: "Logo文字", defaultValue: "企业名称" },
      ctaText: { type: "string", label: "按钮文字", defaultValue: "免费试用" },
      ctaLink: { type: "string", label: "按钮链接", defaultValue: "#" },
    },
    acceptChildren: false,
    componentPath: "@/builder-components/advanced/Navbar",
  },

  footer: {
    type: "footer",
    category: "advanced",
    name: "Footer",
    description: "页脚",
    icon: "layout",
    props: {
      copyright: { type: "string", label: "版权信息", defaultValue: "© 2024 企业名称. All rights reserved." },
    },
    acceptChildren: false,
    componentPath: "@/builder-components/advanced/Footer",
  },
};

// 获取所有组件
export function getAllComponents() {
  return Object.values(componentRegistry);
}

// 按分类获取组件
export function getComponentsByCategory(category: string) {
  return Object.values(componentRegistry).filter((c) => c.category === category);
}

// 获取单个组件Schema
export function getComponentSchema(type: string): ComponentSchema | undefined {
  return componentRegistry[type];
}

// 按分类分组获取组件
export function getComponentsGroupedByCategory() {
  const groups: Record<string, ComponentSchema[]> = {
    layout: [],
    content: [],
    advanced: [],
  };

  for (const component of Object.values(componentRegistry)) {
    if (groups[component.category]) {
      groups[component.category].push(component);
    }
  }

  return groups;
}
