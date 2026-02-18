import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import type { PageContent, ComponentNode, ViewMode, Device } from "@/types";

interface EditorState {
  // 当前页面
  currentPage: PageContent | null;

  // 选中状态
  selectedComponentId: string | null;
  hoveredComponentId: string | null;

  // 历史记录
  history: {
    past: PageContent[];
    present: PageContent | null;
    future: PageContent[];
  };

  // 视图状态
  viewMode: ViewMode;
  device: Device;

  // 面板状态
  panels: {
    left: boolean;   // 组件库
    right: boolean;  // 属性面板
    layers: boolean; // 图层面板
  };

  // Actions
  setCurrentPage: (page: PageContent) => void;
  selectComponent: (id: string | null) => void;
  hoverComponent: (id: string | null) => void;
  updateComponent: (id: string, updates: Partial<ComponentNode>) => void;
  addComponent: (parentId: string, component: ComponentNode, index?: number) => void;
  removeComponent: (id: string) => void;
  reorderComponents: (sourceId: string, targetId: string, position: string) => void;
  duplicateComponent: (id: string) => void;

  // 历史操作
  undo: () => void;
  redo: () => void;
  canUndo: () => boolean;
  canRedo: () => boolean;

  // 视图操作
  setViewMode: (mode: ViewMode) => void;
  setDevice: (device: Device) => void;
  togglePanel: (panel: keyof EditorState["panels"]) => void;
}

const useEditorStore = create<EditorState>()(
  devtools(
    persist(
      (set, get) => ({
        // 初始状态
        currentPage: null,
        selectedComponentId: null,
        hoveredComponentId: null,
        history: { past: [], present: null, future: [] },
        viewMode: "editor",
        device: "desktop",
        panels: { left: true, right: true, layers: false },

        // Actions
        setCurrentPage: (page) =>
          set({
            currentPage: page,
            history: { past: [], present: page, future: [] },
          }),

        selectComponent: (id) => set({ selectedComponentId: id }),

        hoverComponent: (id) => set({ hoveredComponentId: id }),

        updateComponent: (id, updates) => {
          const { currentPage, history } = get();
          if (!currentPage) return;

          // 保存当前状态到历史
          const newPast = [...history.past];
          if (history.present) {
            newPast.push(history.present);
          }

          // 更新组件
          const updatedContent = updateComponentInTree(currentPage, id, updates);

          set({
            currentPage: updatedContent,
            selectedComponentId: id,
            history: {
              past: newPast.slice(-50), // 限制历史记录数量
              present: currentPage,
              future: [],
            },
          });
        },

        addComponent: (parentId, component, index) => {
          const { currentPage, history } = get();
          if (!currentPage) return;

          const newPast = [...history.past];
          if (history.present) {
            newPast.push(history.present);
          }

          const updatedContent = addComponentToTree(currentPage, parentId, component, index);

          set({
            currentPage: updatedContent,
            selectedComponentId: component.id,
            history: {
              past: newPast.slice(-50),
              present: currentPage,
              future: [],
            },
          });
        },

        removeComponent: (id) => {
          const { currentPage, history } = get();
          if (!currentPage) return;

          const newPast = [...history.past];
          if (history.present) {
            newPast.push(history.present);
          }

          const updatedContent = removeComponentFromTree(currentPage, id);

          set({
            currentPage: updatedContent,
            selectedComponentId: null,
            history: {
              past: newPast.slice(-50),
              present: currentPage,
              future: [],
            },
          });
        },

        reorderComponents: (sourceId, targetId, position) => {
          const { currentPage, history } = get();
          if (!currentPage || sourceId === targetId) return;

          const newPast = [...history.past];
          if (history.present) {
            newPast.push(history.present);
          }

          // 1. Find and remove source node
          const sourceNode = findNodeById(currentPage.root, sourceId);
          if (!sourceNode) return;
          const afterRemove = removeComponentFromTree(currentPage, sourceId);

          // 2. Find target's parent and insert
          const updatedContent = insertNodeNear(afterRemove, targetId, sourceNode, position);

          set({
            currentPage: updatedContent,
            history: {
              past: newPast.slice(-50),
              present: currentPage,
              future: [],
            },
          });
        },

        duplicateComponent: (id) => {
          const { currentPage, history } = get();
          if (!currentPage) return;
          const node = findNodeById(currentPage.root, id);
          if (!node) return;

          const newPast = [...history.past];
          if (history.present) newPast.push(history.present);

          const cloned = deepCloneWithNewIds(node);
          const updatedContent = insertNodeNear(currentPage, id, cloned, "after");

          set({
            currentPage: updatedContent,
            selectedComponentId: cloned.id,
            history: { past: newPast.slice(-50), present: currentPage, future: [] },
          });
        },

        undo: () => {
          const { history } = get();
          if (history.past.length === 0) return;

          const previous = history.past[history.past.length - 1];
          const newPast = history.past.slice(0, -1);
          const newFuture = history.present ? [history.present, ...history.future] : history.future;

          set({
            currentPage: previous,
            history: {
              past: newPast,
              present: previous,
              future: newFuture,
            },
          });
        },

        redo: () => {
          const { history } = get();
          if (history.future.length === 0) return;

          const next = history.future[0];
          const newPast = [...history.past];
          if (history.present) {
            newPast.push(history.present);
          }
          const newFuture = history.future.slice(1);

          set({
            currentPage: next,
            history: {
              past: newPast,
              present: next,
              future: newFuture,
            },
          });
        },

        canUndo: () => get().history.past.length > 0,
        canRedo: () => get().history.future.length > 0,

        setViewMode: (mode) => set({ viewMode: mode }),
        setDevice: (device) => set({ device }),
        togglePanel: (panel) =>
          set((state) => ({
            panels: { ...state.panels, [panel]: !state.panels[panel] },
          })),
      }),
      { name: "editor-storage" }
    )
  )
);

// 辅助函数：在组件树中查找并更新组件
function updateComponentInTree(
  content: PageContent,
  id: string,
  updates: Partial<ComponentNode>
): PageContent {
  if (content.root.id === id) {
    return {
      ...content,
      root: { ...content.root, ...updates },
    };
  }

  return {
    ...content,
    root: updateNodeInTree(content.root, id, updates),
  };
}

function updateNodeInTree(
  node: ComponentNode,
  id: string,
  updates: Partial<ComponentNode>
): ComponentNode {
  if (node.id === id) {
    return { ...node, ...updates };
  }

  if (node.children) {
    return {
      ...node,
      children: node.children.map((child) => updateNodeInTree(child, id, updates)),
    };
  }

  return node;
}

// 辅助函数：在组件树中添加组件
function addComponentToTree(
  content: PageContent,
  parentId: string,
  component: ComponentNode,
  index?: number
): PageContent {
  if (content.root.id === parentId) {
    const children = content.root.children || [];
    const newChildren = index !== undefined
      ? [...children.slice(0, index), component, ...children.slice(index)]
      : [...children, component];

    return {
      ...content,
      root: { ...content.root, children: newChildren },
    };
  }

  return {
    ...content,
    root: addNodeToTree(content.root, parentId, component, index),
  };
}

function addNodeToTree(
  node: ComponentNode,
  parentId: string,
  component: ComponentNode,
  index?: number
): ComponentNode {
  if (node.id === parentId) {
    const children = node.children || [];
    const newChildren = index !== undefined
      ? [...children.slice(0, index), component, ...children.slice(index)]
      : [...children, component];

    return { ...node, children: newChildren };
  }

  if (node.children) {
    return {
      ...node,
      children: node.children.map((child) =>
        addNodeToTree(child, parentId, component, index)
      ),
    };
  }

  return node;
}

// 辅助函数：在组件树中删除组件
function removeComponentFromTree(content: PageContent, id: string): PageContent {
  if (content.root.id === id) {
    return content; // 不能删除根节点
  }

  return {
    ...content,
    root: removeNodeFromTree(content.root, id),
  };
}

function removeNodeFromTree(node: ComponentNode, id: string): ComponentNode {
  if (node.children) {
    return {
      ...node,
      children: node.children
        .filter((child) => child.id !== id)
        .map((child) => removeNodeFromTree(child, id)),
    };
  }
  return node;
}

// 辅助函数：按 ID 查找节点
function findNodeById(node: ComponentNode, id: string): ComponentNode | null {
  if (node.id === id) return node;
  if (node.children) {
    for (const child of node.children) {
      const found = findNodeById(child, id);
      if (found) return found;
    }
  }
  return null;
}

// 辅助函数：在目标节点附近插入
function insertNodeNear(
  content: PageContent,
  targetId: string,
  node: ComponentNode,
  position: string
): PageContent {
  return {
    ...content,
    root: insertNodeNearInTree(content.root, targetId, node, position),
  };
}

function insertNodeNearInTree(
  parent: ComponentNode,
  targetId: string,
  node: ComponentNode,
  position: string
): ComponentNode {
  if (!parent.children) return parent;

  const idx = parent.children.findIndex((c) => c.id === targetId);
  if (idx !== -1) {
    const newChildren = [...parent.children];
    const insertIdx = position === "before" ? idx : idx + 1;
    newChildren.splice(insertIdx, 0, node);
    return { ...parent, children: newChildren };
  }

  return {
    ...parent,
    children: parent.children.map((child) =>
      insertNodeNearInTree(child, targetId, node, position)
    ),
  };
}

// 辅助函数：深拷贝并生成新 ID
function deepCloneWithNewIds(node: ComponentNode): ComponentNode {
  return {
    ...node,
    id: `${node.type}-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
    children: node.children?.map(deepCloneWithNewIds),
  };
}

export default useEditorStore;
export { useEditorStore };
