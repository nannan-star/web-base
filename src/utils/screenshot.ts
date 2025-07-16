/**
 * @file 页面截图工具
 * @description 提供将页面元素保存为图片的功能
 */
import { message } from '@/utils/message';
import html2canvas from 'html2canvas';

interface ScreenshotOptions {
  /** 文件名，默认为 screenshot.png */
  filename?: string;
  /** 缩放比例，默认为 2，值越大图片越清晰 */
  scale?: number;
  /** 是否显示加载和结果提示，默认为 true */
  showMessage?: boolean;
  /** 背景颜色，默认为白色 */
  backgroundColor?: string;
  /** 自定义消息配置 */
  customMessages?: {
    loading?: string;
    success?: string;
    error?: string;
  };
}

/**
 * 将 DOM 元素保存为图片
 *
 * @param element 要截图的 DOM 元素
 * @param options 截图配置选项
 * @returns Promise<string | null> 成功时返回图片的 Data URL，失败时返回 null
 */
export const saveElementAsImage = async (element: HTMLElement, options?: ScreenshotOptions): Promise<string | null> => {
  if (!element) return null;

  const {
    filename = 'screenshot.png',
    scale = 2,
    showMessage = true,
    backgroundColor = '#ffffff',
    customMessages = {
      loading: '正在生成页面截图...',
      success: '截图已保存',
      error: '截图生成失败',
    },
  } = options || {};

  const messageKey = 'screenshot-' + Date.now();

  try {
    // 显示加载提示
    if (showMessage) {
      message.loading({
        content: customMessages.loading,
        key: messageKey,
      });
    }

    // 使用html2canvas库进行截图
    const canvas = await html2canvas(element, {
      allowTaint: true, // 允许加载跨域图片
      useCORS: true, // 尝试使用CORS加载跨域图片
      scale, // 提高截图质量
      backgroundColor, // 设置背景色
      logging: false, // 关闭日志
      scrollX: 0, // 避免滚动影响
      scrollY: 0,
    });

    // 将canvas转换为图片URL
    const imgData = canvas.toDataURL('image/png');

    // 创建下载链接
    const downloadLink = document.createElement('a');
    downloadLink.href = imgData;
    downloadLink.download = filename;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);

    // 显示成功消息
    if (showMessage) {
      message.success({
        content: customMessages.success,
        key: messageKey,
        duration: 2,
      });
    }

    return imgData;
  } catch (error) {
    console.error('截图生成或保存失败:', error);

    if (showMessage) {
      message.error({
        content: customMessages.error,
        key: messageKey,
        duration: 3,
      });
    }

    return null;
  }
};

/**
 * 将指定的 React ref 元素保存为图片
 *
 * @param ref React ref 对象
 * @param options 截图配置选项
 * @returns Promise<string | null> 成功时返回图片的 Data URL，失败时返回 null
 */
export const saveRefAsImage = async (
  ref: React.RefObject<HTMLElement>,
  options?: ScreenshotOptions,
): Promise<string | null> => {
  if (!ref || !ref.current) {
    console.error('截图失败: ref 不存在或为空');
    return null;
  }

  return saveElementAsImage(ref.current, options);
};

export default {
  saveElementAsImage,
  saveRefAsImage,
};
