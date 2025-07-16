import AMapLoader from '@amap/amap-jsapi-loader';
import 'ol/ol.css';
import { useEffect, useRef } from 'react';

const AMap = () => {
  const mapRef = useRef(null);
  const amapToken = '6a47a47c0563af0c967d9a671178bc64';

  const initMap = () => {
    AMapLoader.load({
      key: amapToken, //申请好的Web端开发者key，调用 load 时必填
      version: '2.0', //指定要加载的 JS API 的版本，缺省时默认为 1.4.15
      plugins: ['AMap.Scale', 'AMap.Polygon', 'AMap.Marker', 'AMap.Geolocation'], // 需要使用的插件
    })
      .then((AMap) => {
        const map = new AMap.Map(mapRef.current, {
          viewMode: '2D', //默认使用 2D 模式
          zoom: 11, //地图级别
          center: [116.397428, 39.90923], //地图中心点
        });
        map.addControl(new AMap.Scale());
      })
      .catch((e) => {
        console.error(e); //加载错误提示
      });
  };

  useEffect(() => {
    initMap();
  }, []);

  return <div ref={mapRef} style={{ width: '100%', height: '500px' }} />;
};

export default AMap;
