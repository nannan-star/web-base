import styles from '../index.less';

export default function HeaderPanel() {
  return (
    <div className={styles['screen-header']}>
      <div className={styles['screen-title']}>
        <span>高精度位置服务监测系统</span>
      </div>
    </div>
  );
}
