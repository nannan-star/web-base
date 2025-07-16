/**
 * 颜色变量定义
 * @description 定义项目中所有主题相关的颜色常量
 * @date 2025-01-27
 */

/**
 * 浅色主题配色
 */
export const LIGHT_COLORS = {
  BRAND1: '#FFEFDE',
  BRAND2: '#FFD9B5',
  BRAND3: '#FFC08C',
  BRAND4: '#FFA463',
  BRAND5: '#FA853A',
  BRAND6: '#D46326',

  ERROR1: '#FFDCD6',
  ERROR2: '#FFB6AD',
  ERROR3: '#FF8D85',
  ERROR4: '#F75E59',
  ERROR5: '#EB2E2E',
  ERROR6: '#C41D23',

  WARNING1: '#FFF3D2',
  WARNING2: '#FFDC8A',
  WARNING3: '#FFCA61',
  WARNING4: '#FFB638',
  WARNING5: '#F89A0E',
  WARNING6: '#D17702',

  SUCCESS1: '#D7F7DD',
  SUCCESS2: '#A7EBB5',
  SUCCESS3: '#7ADE93',
  SUCCESS4: '#52D176',
  SUCCESS5: '#2DC45C',
  SUCCESS6: '#1C9E4A',

  GRAY1: '#F9F9F9',
  GRAY2: '#E9EBEC',
  GRAY3: '#DBDEE1',
  GRAY4: '#C8CCD0',
  GRAY5: '#BBBFC3',
  GRAY6: '#93989F',

  BACKGROUND: '#fff',

  FONT1: '#323232', // primary
  FONT2: '#646464', // secondary
  FONT3: '#969696', // placeholder
  FONT4: '#C9C9C9', // disabled
} as const;

/**
 * 深色主题配色
 */
export const DARK_COLORS = {
  BRAND1: '#FDECD4',
  BRAND2: '#FCD5AA',
  BRAND3: '#F8B57E',
  BRAND4: '#F1965D',
  BRAND5: '#E8682B',
  BRAND6: '#C74A1F',

  ERROR1: '#FDE2D3',
  ERROR2: '#FBBEA8',
  ERROR3: '#F5907B',
  ERROR4: '#EB6659',
  ERROR5: '#DF2727',
  ERROR6: '#BF1C2A',

  WARNING1: '#FEF2CB',
  WARNING2: '#FEE298',
  WARNING3: '#FECD65',
  WARNING4: '#FDB83F',
  WARNING5: '#FC9700',
  WARNING6: '#D87900',

  SUCCESS1: '#DAFBD7',
  SUCCESS2: '#B1F7B2',
  SUCCESS3: '#85E991',
  SUCCESS4: '#62D47B',
  SUCCESS5: '#35B85E',
  SUCCESS6: '#269E57',

  GRAY1: '#4E4F56',
  GRAY2: '#40424A',
  GRAY3: '#383A42',
  GRAY4: '#2F3137', // boder
  GRAY5: '#26272C', // divider
  GRAY6: '#212227',

  BACKGROUND: '#050505', // background

  FONT1: '#F9F9F9', // primary
  FONT2: '#999', // secondary
  FONT3: '#555', // placeholder
  FONT4: '#323232', // disabled
} as const;

/**
 * 主题配色映射
 */
export const THEME_COLORS_MAP = {
  'theme-light': LIGHT_COLORS,
  'theme-dark': DARK_COLORS,
} as const;
