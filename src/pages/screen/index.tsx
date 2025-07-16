import { createScreenAdapter } from '@/utils/screen-adapter';
import { useEffect, useRef } from 'react';

import FooterPanel from './components/footer-panel';
import HeaderPanel from './components/header-panel';
import IndustryProportion from './components/industry-proportion';
import Map3DGlobe from './components/map-global';

import styles from './index.less';

export default function Screen() {
  const adapterRef = useRef<any>(null);

  useEffect(() => {
    // 初始化屏幕适配器
    adapterRef.current = createScreenAdapter({
      designWidth: 1920,
      designHeight: 1080,
      minScale: 0.8,
      maxScale: 2,
    });
    // 组件卸载时清理
    return () => {
      if (adapterRef.current) {
        adapterRef.current.destroy();
      }
    };
  }, []);

  return (
    <div className={styles['screen-root']}>
      {/* <div className={styles['screen-container']} data-screen-container> */}
      <HeaderPanel />
      <div className={styles['screen-main']}>
        <div className={styles['screen-left']}>
          <div className={styles['card-box']}>
            <div className={styles['card-title']}>行业占比</div>
            <IndustryProportion />
          </div>
          <div className={styles['card-box']}>
            <div className={styles['card-title']}>行业占比</div>
            <IndustryProportion />
          </div>
          <div className={styles['card-box']}>
            <div className={styles['card-title']}>行业占比</div>
            <IndustryProportion />
          </div>
        </div>
        <div className={styles['screen-center']}>
          {/* 统计数据面板 */}
          <div className={styles['screen-center-top']}>
            <div className={styles['screen-center-top-left']}>
              <div className={styles['screen-center-top-left-title']}>
                <span>统计数据</span>
                <span>统计数据</span>
              </div>
            </div>
            <div className={styles['screen-center-top-right']}>
              <div className={styles['screen-center-top-right-title']}>
                <span>统计数据</span>
                <span>统计数据</span>
              </div>
            </div>
          </div>
          <Map3DGlobe />
        </div>
        <div className={styles['screen-right']}>
          <div className={styles['card-box']}>
            <div className={styles['card-title']}>行业占比</div>
            <IndustryProportion />
          </div>
          <div className={styles['card-box']}>
            <div className={styles['card-title']}>行业占比</div>
            <IndustryProportion />
          </div>
          <div className={styles['card-box']}>
            <div className={styles['card-title']}>行业占比</div>
            <IndustryProportion />
          </div>
        </div>
      </div>
      <FooterPanel />
      {/* </div> */}
    </div>
  );
}
