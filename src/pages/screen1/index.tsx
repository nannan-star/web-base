import FooterPanel from './components/footer-panel';
import HeaderPanel from './components/header-panel';
import IndustryProportion from './components/industry-proportion';
import Map3DGlobe from './components/map-global';

import styles from './index.scss';

export default function Screen1() {
  return (
    <div className={styles['screen-root']}>
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
    </div>
  );
}
