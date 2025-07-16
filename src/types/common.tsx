/**
 * 请求参数
 * @description 请求参数
 * @interface RequestParams
 * @property {number} page 页码
 * @property {number} size 每页条数
 * @property {[searchField: string]: string | number} [searchField] 搜索字段
 */
export interface RequestParams {
  page: number;
  size: number;
  [searchField: string]: string | number;
}

/**
 * 菜单项接口定义
 * @interface MenuItem
 * @property {string} key - 菜单项的唯一标识
 * @property {string} label - 菜单项的显示文本
 * @property {MenuItem[]} [children] - 子菜单项数组
 * @property {() => void} [onClick] - 点击事件处理函数
 */
export interface MenuItem {
  key: string;
  label: string;
  children?: MenuItem[];
  onClick?: () => void;
}

/**
 * 路由项接口定义
 * @interface RouteItem
 * @property {string} name - 路由名称
 * @property {string} path - 路由路径
 * @property {RouteItem[]} [routes] - 子路由数组
 * @property {string} [component] - 组件路径
 */
export interface RouteItem {
  name: string;
  path: string;
  routes?: RouteItem[];
  component?: string;
}
