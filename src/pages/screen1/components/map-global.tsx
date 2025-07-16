import mapboxgl from 'mapbox-gl';
import { useEffect, useRef } from 'react';

import 'mapbox-gl/dist/mapbox-gl.css';

import styles from '../index.scss';

export default function Map3DGlobe() {
  const mapRef = useRef(null);

  const initMap = () => {
    mapboxgl.accessToken =
      'pk.eyJ1IjoiY2hjbmF2LXJkIiwiYSI6ImNtYm96dnliNDF5dXYya3F4dmFjOGlmYmsifQ.nx6U8lOX0n8yUEqOgyRBgg';

    const map = new mapboxgl.Map({
      container: mapRef.current!,
      style: 'mapbox://styles/mapbox/streets-v12',
      projection: 'globe', // 将地图显示为地球，因为卫星样式默认为墨卡托投影
      zoom: 1.5,
      center: [30, 15],
    });

    map.addControl(new mapboxgl.NavigationControl());
    map.scrollZoom.disable();

    map.on('style.load', () => {
      map.setFog({}); // 设置默认的大气效果样式
    });

    // 在低缩放级别时，每两分钟完成一次完整旋转
    const secondsPerRevolution = 240;
    // 缩放级别5以上时不旋转
    const maxSpinZoom = 5;
    // 在缩放级别3和5之间以中等速度旋转
    const slowSpinZoom = 3;

    let userInteracting = false;
    const spinEnabled = true;

    function spinGlobe() {
      const zoom = map.getZoom();
      if (spinEnabled && !userInteracting && zoom < maxSpinZoom) {
        let distancePerSecond = 360 / secondsPerRevolution;
        if (zoom > slowSpinZoom) {
          // 在更高缩放级别时减慢旋转
          const zoomDif = (maxSpinZoom - zoom) / (maxSpinZoom - slowSpinZoom);
          distancePerSecond *= zoomDif;
        }
        const center = map.getCenter();
        center.lng -= distancePerSecond;
        // 在一秒内平滑地动画地图
        // 当此动画完成时，会触发 'moveend' 事件
        map.easeTo({ center, duration: 1000, easing: (n) => n });
      }
    }

    // 交互时暂停旋转
    map.on('mousedown', () => {
      userInteracting = true;
    });
    map.on('dragstart', () => {
      userInteracting = true;
    });

    // 当动画完成时，如果没有正在进行的交互，则开始旋转
    map.on('moveend', () => {
      spinGlobe();
    });

    spinGlobe();

    return () => map.remove();
  };

  useEffect(() => {
    initMap();
  }, []);

  return <div ref={mapRef} className={styles['map-box']} />;
}
