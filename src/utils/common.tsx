/**
 * Echarts图表字体、间距自适应
 * @param size 需要处理的像素大小
 * @param defalteWidth 网页宽度
 * @returns
 */
export const fitChartSize = (size: number, defalteWidth = 1920) => {
  let clientWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
  if (!clientWidth) return size;
  let scale = clientWidth / defalteWidth;
  return Number((size * scale).toFixed(3));
};
