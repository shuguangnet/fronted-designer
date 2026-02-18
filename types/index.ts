// ============================================
// 组件类型
// ============================================

export interface ComponentNode {
  id: string;
  type: string;
  props: Record<string, any>;
  styles?: StyleConfig;
  responsive?: {
    md?: Partial<StyleConfig>;
    lg?: Partial<StyleConfig>;
    xl?: Partial<StyleConfig>;
  };
  children?: ComponentNode[];
  visible?: boolean;
  animation?: {
    type?: string;
    duration?: number;
    delay?: number;
  };
}

export interface StyleConfig {
  // 布局
  display?: "block" | "flex" | "grid" | "inline" | "inline-block";
  flexDirection?: "row" | "column" | "row-reverse" | "column-reverse";
  justifyContent?: "flex-start" | "center" | "flex-end" | "space-between" | "space-around";
  alignItems?: "flex-start" | "center" | "flex-end" | "stretch";
  gap?: string;

  // 间距
  padding?: string | { top?: string; right?: string; bottom?: string; left?: string };
  margin?: string | { top?: string; right?: string; bottom?: string; left?: string };

  // 尺寸
  width?: string;
  height?: string;
  maxWidth?: string;
  minHeight?: string;

  // 背景
  background?: string;
  backgroundImage?: string;
  backgroundSize?: string;
  backgroundPosition?: string;

  // 边框
  border?: string;
  borderRadius?: string;

  // 阴影
  boxShadow?: string;

  // 文本
  textAlign?: "left" | "center" | "right" | "justify";
}

export interface ComponentSchema {
  type: string;
  category: "layout" | "content" | "form" | "media" | "advanced";
  name: string;
  description?: string;
  icon?: string;

  props: Record<string, PropDefinition>;

  acceptChildren?: boolean;
  acceptTypes?: string[];

  componentPath?: string;
  defaultStyles?: StyleConfig;
}

export interface PropDefinition {
  type: "string" | "number" | "boolean" | "color" | "image" | "select" | "text" | "code" | "array";
  label: string;
  defaultValue?: any;
  required?: boolean;
  options?: { label: string; value: any }[];
  placeholder?: string;
}

// ============================================
// 页面类型
// ============================================

export interface PageContent {
  version: string;
  meta: {
    title: string;
    description?: string;
  };
  root: ComponentNode;
}

export interface Page {
  id: string;
  slug: string;
  title: string;
  description?: string;
  status: "DRAFT" | "PUBLISHED" | "ARCHIVED";
  content: PageContent;
  themeId?: string;
  theme?: Theme;
  authorId: string;
  author?: User;
  createdAt: Date;
  updatedAt: Date;
  publishedAt?: Date;
}

// ============================================
// 主题类型
// ============================================

export interface ThemeConfig {
  id: string;
  name: string;
  version?: string;

  colors: {
    primary: string;
    secondary: string;
    accent: string;
    neutral: string;
    background: string;
    foreground: string;
    card: string;
    cardForeground: string;
    muted: string;
    mutedForeground: string;
    border: string;
    input: string;
    ring: string;
    destructive: string;
    destructiveForeground: string;
  };

  typography: {
    fontFamily: {
      sans: string[];
      serif?: string[];
      mono?: string[];
    };
    fontSize: Record<string, string>;
    fontWeight: {
      normal: number;
      medium: number;
      semibold: number;
      bold: number;
    };
    lineHeight: {
      tight: number;
      normal: number;
      relaxed: number;
    };
  };

  spacing: Record<string, string>;
  borderRadius: Record<string, string>;
  shadows: Record<string, string>;
}

export interface Theme {
  id: string;
  name: string;
  displayName: string;
  description?: string;
  preview?: string;
  config: ThemeConfig;
  customCSS?: string;
  category?: string;
  isBuiltin: boolean;
  usageCount: number;
  createdAt: Date;
  updatedAt: Date;
}

// ============================================
// 用户类型
// ============================================

export type UserRole = "ADMIN" | "EDITOR" | "USER";

export interface User {
  id: string;
  name?: string;
  email: string;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
}

// ============================================
// 构建器类型
// ============================================

export interface DragData {
  type: string;
  componentId?: string;
  source: "component-library" | "canvas" | "layer-tree";
  position?: { x: number; y: number };
}

export interface DropTarget {
  containerId: string;
  index: number;
  position: "before" | "after" | "inside";
}

export type ViewMode = "editor" | "preview" | "code";
export type Device = "desktop" | "tablet" | "mobile";
