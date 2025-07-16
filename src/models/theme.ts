import type { AlgorithmType, ThemeEnum, ThemeMode } from '@/types/theme';
import type { ThemeConfig } from 'antd/es/config-provider/context';

import { THEME_COLORS_MAP } from '@/constants/colors';

import { theme } from 'antd';
import { useState } from 'react';

/**
 * 生成主题配置
 * @param ThemeMode 主题类型
 * @returns 主题配置
 */
const generateThemeConfig = (ThemeMode: ThemeMode) => {
  const colors = THEME_COLORS_MAP[ThemeMode as keyof typeof THEME_COLORS_MAP];

  console.log(colors);
  return {
    token: {
      colorPrimary: colors.BRAND5,
      colorText: colors.FONT1,
    },
    components: {
      Layout: {
        headerBg: colors.BACKGROUND,
        siderBg: colors.BACKGROUND,
        bodyBg: colors.BACKGROUND,
        headerColor: colors.FONT1,
      },
      Menu: {},
      Dropdown: {},
      Button: {},
      Typography: {},
    },
  };
};

/**
 * 主题样式枚举
 */
const THEME_STYLE_ENUM: ThemeEnum = {
  'theme-light': generateThemeConfig('theme-light'),
  'theme-dark': generateThemeConfig('theme-dark'),
};

export default function useThemeModel() {
  const [algorithm, setAlgorithm] = useState<AlgorithmType>('default');
  const [primaryColor, setPrimaryColor] = useState(THEME_COLORS_MAP['theme-light'].BRAND5);
  const [themeMode, setThemeMode] = useState<ThemeMode>('theme-light');

  const { defaultAlgorithm, compactAlgorithm, darkAlgorithm } = theme;

  // 主题算法组合逻辑
  let baseAlgorithm = themeMode === 'theme-light' ? defaultAlgorithm : darkAlgorithm;
  let algorithms = [baseAlgorithm];
  if (algorithm === 'compact') {
    algorithms.push(compactAlgorithm);
  }

  const themeConfig: ThemeConfig = {
    token: {
      ...THEME_STYLE_ENUM[themeMode].token,
      colorPrimary: primaryColor,
    },
    components: {
      ...THEME_STYLE_ENUM[themeMode].components,
    },
    algorithm: algorithms,
  };

  return {
    algorithm,
    primaryColor,
    themeMode,
    themeConfig,
    setAlgorithm,
    setPrimaryColor,
    setThemeMode,
  };
}
