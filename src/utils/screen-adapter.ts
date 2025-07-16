/**
 * 大屏适配工具函数
 * 解决非16:9屏幕比例下的适配问题
 */

interface ScreenAdapterOptions {
  designWidth?: number;
  designHeight?: number;
  minScale?: number;
  maxScale?: number;
}

export class ScreenAdapter {
  private designWidth: number;
  private designHeight: number;
  private minScale: number;
  private maxScale: number;
  private container: HTMLElement | null = null;

  constructor(options: ScreenAdapterOptions = {}) {
    this.designWidth = options.designWidth || 1920;
    this.designHeight = options.designHeight || 1080;
    this.minScale = options.minScale || 0.9;
    this.maxScale = options.maxScale || 2;
  }

  /**
   * 初始化适配器
   * @param containerSelector 容器选择器
   */
  init(containerSelector: string = '.screen-container') {
    // 首先尝试使用传入的选择器
    this.container = document.querySelector(containerSelector);

    // 如果没有找到，尝试通过 CSS Modules 生成的类名查找
    if (!this.container) {
      // 查找包含 'screen-container' 的类名
      const elements = document.querySelectorAll('[class*="screen-container"]');
      if (elements.length > 0) {
        this.container = elements[0] as HTMLElement;
      }
    }

    // 如果还是没有找到，尝试通过 data 属性查找
    if (!this.container) {
      this.container = document.querySelector('[data-screen-container]');
    }
    if (!this.container) {
      console.warn('Screen adapter: Container not found');
      return;
    }

    this.updateScale();
    window.addEventListener('resize', this.handleResize.bind(this));
  }

  /**
   * 计算缩放比例
   */
  private calculateScale(): number {
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;

    // 计算宽高比
    const windowRatio = windowWidth / windowHeight;
    const designRatio = this.designWidth / this.designHeight;

    let scale: number;

    if (windowRatio > designRatio) {
      // 屏幕更宽，以高度为准
      scale = windowHeight / this.designHeight;
    } else {
      // 屏幕更高，以宽度为准
      scale = windowWidth / this.designWidth;
    }

    // 限制缩放范围
    return Math.max(this.minScale, Math.min(this.maxScale, scale));
  }

  /**
   * 更新缩放
   */
  private updateScale() {
    if (!this.container) return;
    const scale = this.calculateScale();
    console.log('updateScale', scale);
    this.container.style.transform = `scale(${scale})`;

    // 更新容器尺寸
    this.container.style.width = `${this.designWidth}px`;
    this.container.style.height = `${this.designHeight}px`;
  }

  /**
   * 处理窗口大小变化
   */
  private handleResize() {
    this.updateScale();
  }

  /**
   * 销毁适配器
   */
  destroy() {
    window.removeEventListener('resize', this.handleResize.bind(this));
    this.container = null;
  }

  /**
   * 获取当前缩放比例
   */
  getCurrentScale(): number {
    return this.calculateScale();
  }

  /**
   * 获取屏幕信息
   */
  getScreenInfo() {
    return {
      windowWidth: window.innerWidth,
      windowHeight: window.innerHeight,
      windowRatio: window.innerWidth / window.innerHeight,
      designRatio: this.designWidth / this.designHeight,
      scale: this.calculateScale(),
    };
  }
}

/**
 * 创建并初始化屏幕适配器
 */
export function createScreenAdapter(options?: ScreenAdapterOptions): ScreenAdapter {
  const adapter = new ScreenAdapter(options);
  adapter.init();
  return adapter;
}

/**
 * 简化的适配函数，直接设置缩放
 */
export function setScreenScale(container: HTMLElement, designWidth: number = 1920, designHeight: number = 1080) {
  const windowWidth = window.innerWidth;
  const windowHeight = window.innerHeight;

  const scaleX = windowWidth / designWidth;
  const scaleY = windowHeight / designHeight;
  const scale = Math.min(scaleX, scaleY);

  container.style.transform = `scale(${scale})`;
  container.style.transformOrigin = 'center center';

  return scale;
}
