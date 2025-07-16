import type { RouteItem } from '@/types/common';

export interface BasicLayoutProps {
  children?: React.ReactNode;
}
/**
 * 侧边栏组件属性
 */
export interface SiderProps {
  collapsed: boolean;
  onCollapse: (collapsed: boolean) => void;
  routes: RouteItem[];
}
