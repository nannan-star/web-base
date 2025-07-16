import AMapLoader from '@amap/amap-jsapi-loader';
import 'ol/ol.css';
import { useEffect, useRef, useState } from 'react';

const AMapMapboxSwitch = () => {
  const mapRef = useRef(null);
  const amapToken = '6a47a47c0563af0c967d9a671178bc64';
  const [currentSource, setCurrentSource] = useState<'mapbox' | 'amap'>('amap');
  const [mapInstance, setMapInstance] = useState<any>(null);
  const [, setAMapInstance] = useState<any>(null);
  const [loadingStatus, setLoadingStatus] = useState<string>('正在初始化...');
  const mapboxToken = 'pk.eyJ1IjoiY2hjbmF2LXJkIiwiYSI6ImNtYnQ2aXRtdDAwY2MyanIzbTAzN2l6YzUifQ.HoMbNpKYLohiBFI2OGS8Ug';

  const initMap = () => {
    setLoadingStatus('正在加载高德地图引擎...');

    AMapLoader.load({
      key: amapToken,
      version: '2.0',
      plugins: ['AMap.Scale', 'AMap.Polygon', 'AMap.Marker', 'AMap.Geolocation'],
    })
      .then((AMap) => {
        setAMapInstance(AMap);
        setLoadingStatus('正在配置地图图层...');

        // === Mapbox 矢量图层 ===
        const mapboxVectorLayer = new AMap.TileLayer({
          zooms: [1, 18],
          opacity: 1,
          visible: false, // 默认隐藏
          getTileUrl: function (x: number, y: number, z: number) {
            // Mapbox Streets v12 样式
            return `https://api.mapbox.com/styles/v1/mapbox/streets-v12/tiles/512/${z}/${x}/${y}@2x?access_token=${mapboxToken}`;
          },
          // 高分辨率支持
          detectRetina: true,
        });

        // Mapbox 卫星图层 (可选)
        const mapboxSatelliteLayer = new AMap.TileLayer({
          zooms: [1, 18],
          opacity: 1,
          visible: false,
          getTileUrl: function (x: number, y: number, z: number) {
            return `https://api.mapbox.com/styles/v1/mapbox/satellite-v9/tiles/512/${z}/${x}/${y}@2x?access_token=${mapboxToken}`;
          },
          detectRetina: true,
        });

        // 创建地图实例 - 默认显示高德地图
        const map = new AMap.Map(mapRef.current, {
          viewMode: '2D',
          zoom: 8,
          center: [116.397428, 39.90923],
          // 启用高德地图默认图层
          layers: [],
          mapStyle: 'amap://styles/normal', // 高德矢量地图样式
          features: ['bg', 'road', 'building', 'point'], // 启用默认要素
        });

        // 添加Mapbox图层到地图（但默认隐藏）
        map.add([mapboxVectorLayer, mapboxSatelliteLayer]);

        // 添加比例尺控件
        map.addControl(new AMap.Scale());

        // 保存地图实例和图层引用
        setMapInstance({
          map,
          layers: {
            // Mapbox图层
            mapbox: {
              vectorLayer: mapboxVectorLayer,
              satelliteLayer: mapboxSatelliteLayer,
            },
          },
        });

        // 监听Mapbox图层加载事件
        mapboxVectorLayer.on('complete', () => {
          console.log('Mapbox矢量图层加载完成');
          if (currentSource === 'mapbox') {
            setLoadingStatus('Mapbox矢量图层加载完成');
          }
        });

        mapboxVectorLayer.on('error', (e: any) => {
          console.error('Mapbox矢量图层加载失败:', e);
          setLoadingStatus('Mapbox矢量图层加载失败: ' + JSON.stringify(e));
        });

        // 监听地图事件
        map.on('complete', () => {
          setLoadingStatus('地图加载完成 - 当前显示高德地图');
          console.log('当前地图中心:', map.getCenter());
          console.log('当前缩放级别:', map.getZoom());
          console.log('当前投影: EPSG:3857 (Web墨卡托)');
          console.log('地图features:', map.getFeatures());
        });

        // 监听地图错误事件
        map.on('error', (e: any) => {
          console.error('地图加载错误:', e);
          setLoadingStatus('地图加载错误: ' + JSON.stringify(e));
        });

        setLoadingStatus('地图初始化完成 - 显示高德地图');
      })
      .catch((e) => {
        console.error('高德地图加载失败:', e);
        setLoadingStatus('高德地图加载失败: ' + e.message);
      });
  };

  useEffect(() => {
    initMap();
  }, []);

  // 切换地图数据源 (Mapbox/高德地图)
  const switchSource = (source: 'mapbox' | 'amap') => {
    if (!mapInstance) return;

    const { map, layers } = mapInstance;

    if (source === 'mapbox') {
      // 显示Mapbox矢量图层
      layers.mapbox.vectorLayer.show();
      // 隐藏高德地图默认图层
      map.setFeatures([]);
      setLoadingStatus('正在加载Mapbox矢量图层...');
      console.log('切换到Mapbox地图');
    } else {
      // 隐藏Mapbox图层
      layers.mapbox.vectorLayer.hide();
      layers.mapbox.satelliteLayer.hide();
      // 显示高德地图默认图层
      map.setFeatures(['bg', 'road', 'building', 'point']);
      setLoadingStatus('已切换到高德地图');
      console.log('切换到高德地图');
    }

    setCurrentSource(source);
  };

  // 切换Mapbox图层类型 (矢量/卫星)
  const switchMapboxLayer = (layerType: 'vector' | 'satellite') => {
    if (!mapInstance || currentSource !== 'mapbox') return;

    const { layers } = mapInstance;

    if (layerType === 'satellite') {
      // 显示卫星图层，隐藏矢量图层
      layers.mapbox.satelliteLayer.show();
      layers.mapbox.vectorLayer.hide();
      setLoadingStatus('已切换到Mapbox卫星图');
    } else {
      // 显示矢量图层，隐藏卫星图层
      layers.mapbox.vectorLayer.show();
      layers.mapbox.satelliteLayer.hide();
      setLoadingStatus('已切换到Mapbox矢量图');
    }
  };

  return (
    <div style={{ position: 'relative', width: '100%', height: '500px' }}>
      {/* 地图容器 */}
      <div ref={mapRef} style={{ width: '100%', height: '100%', border: '1px solid #ccc' }} />

      {/* 地图控制面板 */}
      <div
        style={{
          position: 'absolute',
          top: '10px',
          right: '10px',
          zIndex: 1000,
          background: 'white',
          padding: '12px',
          borderRadius: '6px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
          minWidth: '220px',
        }}
      >
        {/* 数据源切换 */}
        <div style={{ marginBottom: '10px' }}>
          <div style={{ marginBottom: '6px', fontWeight: 'bold', fontSize: '13px' }}>地图数据源</div>
          <div style={{ display: 'flex', gap: '6px' }}>
            <button
              type="button"
              onClick={() => switchSource('amap')}
              style={{
                padding: '8px 14px',
                backgroundColor: currentSource === 'amap' ? '#1890ff' : '#f0f0f0',
                color: currentSource === 'amap' ? 'white' : 'black',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '12px',
                fontWeight: currentSource === 'amap' ? 'bold' : 'normal',
              }}
            >
              高德地图
            </button>
            <button
              type="button"
              onClick={() => switchSource('mapbox')}
              style={{
                padding: '8px 14px',
                backgroundColor: currentSource === 'mapbox' ? '#1890ff' : '#f0f0f0',
                color: currentSource === 'mapbox' ? 'white' : 'black',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '12px',
                fontWeight: currentSource === 'mapbox' ? 'bold' : 'normal',
              }}
            >
              Mapbox
            </button>
          </div>
        </div>

        {/* Mapbox图层类型切换 */}
        {currentSource === 'mapbox' && (
          <div style={{ marginBottom: '10px' }}>
            <div style={{ marginBottom: '6px', fontWeight: 'bold', fontSize: '13px' }}>Mapbox图层类型</div>
            <div style={{ display: 'flex', gap: '6px' }}>
              <button
                type="button"
                onClick={() => switchMapboxLayer('vector')}
                style={{
                  padding: '6px 12px',
                  backgroundColor: '#52c41a',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '11px',
                }}
              >
                矢量图
              </button>
              <button
                type="button"
                onClick={() => switchMapboxLayer('satellite')}
                style={{
                  padding: '6px 12px',
                  backgroundColor: '#722ed1',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '11px',
                }}
              >
                卫星图
              </button>
            </div>
          </div>
        )}
      </div>

      {/* 地图信息显示 */}
      <div
        style={{
          position: 'absolute',
          bottom: '10px',
          left: '10px',
          zIndex: 1000,
          background: 'rgba(0,0,0,0.7)',
          color: 'white',
          padding: '8px 12px',
          borderRadius: '4px',
          fontSize: '12px',
        }}
      >
        <div>引擎: 高德地图 SDK | 投影: EPSG:3857 (Web墨卡托)</div>
        <div>数据源: {currentSource === 'mapbox' ? 'Mapbox' : '高德地图'} | 分辨率: @2x高清</div>
      </div>

      {/* 加载状态显示 */}
      <div
        style={{
          position: 'absolute',
          bottom: '60px',
          left: '10px',
          zIndex: 1000,
          background: 'rgba(255,255,255,0.9)',
          color: '#333',
          padding: '6px 10px',
          borderRadius: '4px',
          fontSize: '11px',
          maxWidth: '350px',
        }}
      >
        状态: {loadingStatus}
      </div>

      {/* 功能说明 */}
      <div
        style={{
          position: 'absolute',
          top: '10px',
          left: '10px',
          zIndex: 1000,
          background: 'rgba(255,255,255,0.95)',
          padding: '10px',
          borderRadius: '6px',
          fontSize: '11px',
          maxWidth: '240px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        }}
      >
        <div style={{ fontWeight: 'bold', marginBottom: '6px', color: '#1890ff' }}>高德 + Mapbox 混合方案</div>
        <div style={{ marginBottom: '3px' }}>🗺️ 高德地图SDK引擎驱动</div>
        <div style={{ marginBottom: '3px' }}>🌐 统一EPSG:3857投影坐标系</div>
        <div style={{ marginBottom: '3px' }}>🔄 高德地图 ⇄ Mapbox地图切换</div>
        <div style={{ marginBottom: '3px' }}>🛰️ Mapbox矢量图/卫星图切换</div>
        <div style={{ marginBottom: '3px' }}>📱 @2x高分辨率支持</div>
      </div>
    </div>
  );
};

export default AMapMapboxSwitch;
