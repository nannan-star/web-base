import type { ThemeProviderProps } from '@/types/theme';

import { useModel } from '@umijs/max';
import { useEffect } from 'react';

/**
 * 主题提供者组件
 */
export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const { themeMode, primaryColor } = useModel('theme');

  useEffect(() => {
    const root = document.documentElement;
    // 通过修改根元素的 data-theme 属性
    root.setAttribute('data-theme', themeMode);

    // 通过动态修改 CSS 变量
    root.style.setProperty('--primary-color', primaryColor);
  }, [themeMode, primaryColor]);

  return <>{children}</>;
};
