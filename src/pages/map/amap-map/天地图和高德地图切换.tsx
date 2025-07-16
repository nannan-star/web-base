import AMapLoader from '@amap/amap-jsapi-loader';
import 'ol/ol.css';
import { useEffect, useRef, useState } from 'react';

const AMap = () => {
  const mapRef = useRef(null);
  const amapToken = '6a47a47c0563af0c967d9a671178bc64';
  const tdtKey = '9236fa626fb225c13bf71946e421b06a';
  const [currentSource, setCurrentSource] = useState<'tianditu' | 'amap'>('amap');
  const [mapInstance, setMapInstance] = useState<any>(null);
  const [, setAMapInstance] = useState<any>(null);
  const [loadingStatus, setLoadingStatus] = useState<string>('正在初始化...');

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

        // === 天地图矢量图层 (EPSG:3857投影) ===

        // 天地图矢量底图 - 使用负载均衡的URL生成函数
        const tdtVectorLayer = new AMap.TileLayer({
          zooms: [1, 18],
          opacity: 1,
          visible: false, // 默认隐藏
          getTileUrl: function (x: number, y: number, z: number) {
            const serverNum = (x + y) % 8; // 0-7轮询
            return `https://t${serverNum}.tianditu.gov.cn/DataServer?T=vec_w&x=${x}&y=${y}&l=${z}&tk=${tdtKey}`;
          },
        });

        // 天地图矢量注记 - 使用负载均衡的URL生成函数
        const tdtVectorLabelLayer = new AMap.TileLayer({
          zooms: [1, 18],
          opacity: 1,
          visible: false, // 默认隐藏
          getTileUrl: function (x: number, y: number, z: number) {
            const serverNum = (x + y) % 8; // 0-7轮询
            return `https://t${serverNum}.tianditu.gov.cn/DataServer?T=cva_w&x=${x}&y=${y}&l=${z}&tk=${tdtKey}`;
          },
        });

        // === 高德地图矢量图层 ===

        // 创建地图实例 - 默认显示高德地图
        const map = new AMap.Map(mapRef.current, {
          viewMode: '2D',
          zoom: 8,
          center: [116.397428, 39.90923],
          // 启用高德地图默认图层
          layers: [], // 先不添加自定义图层
          mapStyle: 'amap://styles/normal', // 高德矢量地图样式
          features: ['bg', 'road', 'building', 'point'], // 启用默认要素
        });

        // 添加天地图图层到地图（但默认隐藏）
        map.add([tdtVectorLayer, tdtVectorLabelLayer]);

        // 添加比例尺控件
        map.addControl(new AMap.Scale());

        // 保存地图实例和图层引用
        setMapInstance({
          map,
          layers: {
            // 天地图矢量图层
            tdt: {
              vectorLayer: tdtVectorLayer,
              vectorLabelLayer: tdtVectorLabelLayer,
            },
          },
        });

        // 监听天地图图层加载事件
        tdtVectorLayer.on('complete', () => {
          console.log('天地图矢量图层加载完成');
          setLoadingStatus('天地图矢量图层加载完成');
        });

        tdtVectorLayer.on('error', (e: any) => {
          console.error('天地图矢量图层加载失败:', e);
          setLoadingStatus('天地图矢量图层加载失败: ' + JSON.stringify(e));
        });

        tdtVectorLabelLayer.on('complete', () => {
          console.log('天地图注记图层加载完成');
        });

        tdtVectorLabelLayer.on('error', (e: any) => {
          console.error('天地图注记图层加载失败:', e);
          setLoadingStatus('天地图注记图层加载失败: ' + JSON.stringify(e));
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

  // 切换地图数据源 (天地图矢量/高德地图矢量)
  const switchSource = (source: 'tianditu' | 'amap') => {
    if (!mapInstance) return;

    const { map, layers } = mapInstance;

    if (source === 'tianditu') {
      // 显示天地图矢量图层
      layers.tdt.vectorLayer.show();
      layers.tdt.vectorLabelLayer.show();
      // 隐藏高德地图默认图层
      map.setFeatures([]);
      setLoadingStatus('正在加载天地图矢量图层...');
    } else {
      // 隐藏天地图图层
      layers.tdt.vectorLayer.hide();
      layers.tdt.vectorLabelLayer.hide();
      // 显示高德地图默认图层
      map.setFeatures(['bg', 'road', 'building', 'point']);
      setLoadingStatus('已切换到高德地图矢量图');
    }

    setCurrentSource(source);
    console.log(`切换到${source === 'tianditu' ? '天地图' : '高德地图'}矢量图`);
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
          <div style={{ marginBottom: '6px', fontWeight: 'bold', fontSize: '13px' }}>矢量地图数据源</div>
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
              onClick={() => switchSource('tianditu')}
              style={{
                padding: '8px 14px',
                backgroundColor: currentSource === 'tianditu' ? '#1890ff' : '#f0f0f0',
                color: currentSource === 'tianditu' ? 'white' : 'black',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '12px',
                fontWeight: currentSource === 'tianditu' ? 'bold' : 'normal',
              }}
            >
              天地图
            </button>
          </div>
        </div>
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
        <div>引擎: 高德地图 | 投影: EPSG:3857 (Web墨卡托)</div>
        <div>数据源: {currentSource === 'tianditu' ? '天地图' : '高德地图'} | 图层: 矢量地图</div>
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
        <div style={{ fontWeight: 'bold', marginBottom: '6px', color: '#1890ff' }}>矢量地图双数据源方案</div>
        <div style={{ marginBottom: '3px' }}>🗺️ 高德地图引擎驱动</div>
        <div style={{ marginBottom: '3px' }}>🌐 统一EPSG:3857投影坐标系</div>
        <div style={{ marginBottom: '3px' }}>🔄 高德地图 ⇄ 天地图矢量切换</div>
      </div>
    </div>
  );
};

export default AMap;
