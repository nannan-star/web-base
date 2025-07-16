import type { ThemeConfig } from 'antd/es/config-provider/context';

/**
 * 主题相关类型定义
 */
export type ThemeMode = 'theme-light' | 'theme-dark';

/**
 * 主题算法类型
 */
export type AlgorithmType = 'default' | 'compact';

export interface ThemeProviderProps {
  children: React.ReactNode;
}

/**
 * 主题切换器属性
 */
export interface ThemeSwitcherProps {
  onClose: () => void;
}

/**
 * 主题配置枚举
 */
export interface ThemeEnum {
  // 浅色主题
  'theme-light': ThemeConfig;
  // 暗黑主题
  'theme-dark': ThemeConfig;
}
