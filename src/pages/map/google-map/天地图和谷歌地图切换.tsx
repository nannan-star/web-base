import { Loader } from '@googlemaps/js-api-loader';
import 'ol/ol.css';
import { useEffect, useRef, useState } from 'react';

const GoogleMapWithCustomSources = () => {
  const googleRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [currentMapType, setCurrentMapType] = useState<string>('roadmap');

  // 控制Google Logo的显示/隐藏
  const controlGoogleLogo = (mapTypeId: string) => {
    const isTiandituMap = mapTypeId.startsWith('tianditu');

    // 查找Google Logo元素并控制显示
    setTimeout(() => {
      const logoElements = document.querySelectorAll('a[href^="https://maps.google.com/maps?ll="]');
      const brandingElements = document.querySelectorAll('.gm-style .gmnoprint');

      logoElements.forEach((element) => {
        (element as HTMLElement).style.display = isTiandituMap ? 'none' : 'block';
      });

      // 隐藏包含Google商标的其他元素
      brandingElements.forEach((element) => {
        const htmlElement = element as HTMLElement;
        if (htmlElement.innerText && htmlElement.innerText.includes('Google')) {
          htmlElement.style.display = isTiandituMap ? 'none' : 'block';
        }
      });

      // 隐藏右下角的Google链接
      const googleLinks = document.querySelectorAll('a[target="_blank"][href*="google"]');
      googleLinks.forEach((link) => {
        (link as HTMLElement).style.display = isTiandituMap ? 'none' : 'block';
      });
    }, 100);
  };
  useEffect(() => {
    const loader = new Loader({
      apiKey: 'AIzaSyAiyqU2ScVi7prgkTKSb0O3fL7QFcDB4CY',
      version: 'weekly',
    });

    loader.load().then(() => {
      const mapInstance = new google.maps.Map(googleRef.current!, {
        center: { lat: 39.9042, lng: 116.4074 }, // 北京
        zoom: 10,
        disableDefaultUI: true,
        mapTypeId: 'roadmap',
        mapTypeControlOptions: {
          mapTypeIds: ['roadmap', 'satellite', 'osm', 'tianditu_vec', 'tianditu_sat'],
          style: google.maps.MapTypeControlStyle.DROPDOWN_MENU,
        },
        mapTypeControl: true,
      });

      // === OpenStreetMap 图层 ===
      const osmMapType = new google.maps.ImageMapType({
        getTileUrl: function (coord, zoom) {
          // OpenStreetMap 标准瓦片服务
          return `https://tile.openstreetmap.org/${zoom}/${coord.x}/${coord.y}.png`;
        },
        tileSize: new google.maps.Size(256, 256),
        maxZoom: 19,
        minZoom: 0,
        name: 'OpenStreetMap',
        alt: 'OpenStreetMap地图',
      });

      // === 天地图矢量图层 ===
      const tiandituVecMapType = new google.maps.ImageMapType({
        getTileUrl: function (coord, zoom) {
          // 天地图矢量底图
          const tkKey = '9236fa626fb225c13bf71946e421b06a'; // 替换为您的天地图密钥
          const serverNum = (coord.x + coord.y) % 8;
          return `https://t${serverNum}.tianditu.gov.cn/DataServer?T=vec_w&x=${coord.x}&y=${coord.y}&l=${zoom}&tk=${tkKey}`;
        },
        tileSize: new google.maps.Size(256, 256),
        maxZoom: 18,
        minZoom: 0,
        name: '天地图矢量',
        alt: '天地图矢量地图',
      });

      // === 天地图卫星图层 ===
      const tiandituSatMapType = new google.maps.ImageMapType({
        getTileUrl: function (coord, zoom) {
          // 天地图卫星底图
          const tkKey = '9236fa626fb225c13bf71946e421b06a';
          const serverNum = (coord.x + coord.y) % 8;
          return `https://t${serverNum}.tianditu.gov.cn/DataServer?T=img_w&x=${coord.x}&y=${coord.y}&l=${zoom}&tk=${tkKey}`;
        },
        tileSize: new google.maps.Size(256, 256),
        maxZoom: 18,
        minZoom: 0,
        name: '天地图卫星',
        alt: '天地图卫星地图',
      });

      // === 天地图矢量中文注记层 ===
      const tiandituVecLabelMapType = new google.maps.ImageMapType({
        getTileUrl: function (coord, zoom) {
          // 天地图矢量注记层
          const tkKey = '9236fa626fb225c13bf71946e421b06a';
          const serverNum = (coord.x + coord.y) % 8;
          return `https://t${serverNum}.tianditu.gov.cn/DataServer?T=cva_w&x=${coord.x}&y=${coord.y}&l=${zoom}&tk=${tkKey}`;
        },
        tileSize: new google.maps.Size(256, 256),
        maxZoom: 18,
        minZoom: 0,
        name: '天地图矢量注记',
        alt: '天地图矢量注记层',
      });

      // === 天地图卫星中文注记层 ===
      const tiandituSatLabelMapType = new google.maps.ImageMapType({
        getTileUrl: function (coord, zoom) {
          // 天地图卫星注记层
          const tkKey = '9236fa626fb225c13bf71946e421b06a';
          const serverNum = (coord.x + coord.y) % 8;
          return `https://t${serverNum}.tianditu.gov.cn/DataServer?T=cia_w&x=${coord.x}&y=${coord.y}&l=${zoom}&tk=${tkKey}`;
        },
        tileSize: new google.maps.Size(256, 256),
        maxZoom: 18,
        minZoom: 0,
        name: '天地图卫星注记',
        alt: '天地图卫星注记层',
      });

      // 注册自定义地图类型到地图类型注册表
      mapInstance.mapTypes.set('osm', osmMapType);
      mapInstance.mapTypes.set('tianditu_vec', tiandituVecMapType);
      mapInstance.mapTypes.set('tianditu_sat', tiandituSatMapType);

      // 存储注记层引用，用于动态控制显示
      (mapInstance as any).tiandituLabels = {
        vecLabel: tiandituVecLabelMapType,
        satLabel: tiandituSatLabelMapType,
      };

      // 监听地图类型变化，动态添加/移除注记层和控制Logo显示
      mapInstance.addListener('maptypeid_changed', () => {
        const mapTypeId = mapInstance.getMapTypeId();
        setCurrentMapType(mapTypeId || 'roadmap');

        // 清除所有注记层
        mapInstance.overlayMapTypes.clear();

        // 根据地图类型添加相应的注记层
        if (mapTypeId === 'tianditu_vec') {
          // 天地图矢量模式：添加矢量注记层
          mapInstance.overlayMapTypes.push(tiandituVecLabelMapType);
        } else if (mapTypeId === 'tianditu_sat') {
          // 天地图卫星模式：添加卫星注记层
          mapInstance.overlayMapTypes.push(tiandituSatLabelMapType);
        }

        // 控制Google Logo显示/隐藏
        controlGoogleLogo(mapTypeId || 'roadmap');
      });

      setMap(mapInstance);
    });
  }, []);

  // 手动切换地图类型
  const switchMapType = (mapTypeId: string) => {
    if (map) {
      map.setMapTypeId(mapTypeId);
    }
  };

  const getMapTypeDisplayName = (mapTypeId: string) => {
    const names: Record<string, string> = {
      roadmap: 'Google道路图',
      satellite: 'Google卫星图',
      osm: 'OpenStreetMap',
      tianditu_vec: '天地图矢量',
      tianditu_sat: '天地图卫星',
    };
    return names[mapTypeId] || mapTypeId;
  };

  return (
    <div style={{ position: 'relative', width: '100%', height: '500px' }}>
      {/* 地图容器 */}
      <div ref={googleRef} style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }} />

      {/* 自定义地图切换控件 */}
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
          minWidth: '200px',
        }}
      >
        <div style={{ marginBottom: '8px', fontWeight: 'bold', fontSize: '14px' }}>地图数据源切换</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          {['roadmap', 'satellite', 'osm', 'tianditu_vec', 'tianditu_sat'].map((mapTypeId) => (
            <button
              type="button"
              key={mapTypeId}
              onClick={() => switchMapType(mapTypeId)}
              style={{
                padding: '8px 12px',
                backgroundColor: currentMapType === mapTypeId ? '#1890ff' : '#f0f0f0',
                color: currentMapType === mapTypeId ? 'white' : 'black',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '12px',
                fontWeight: currentMapType === mapTypeId ? 'bold' : 'normal',
                textAlign: 'left',
              }}
            >
              {getMapTypeDisplayName(mapTypeId)}
            </button>
          ))}
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
        <div>引擎: Google Maps SDK | 投影: EPSG:3857</div>
        <div>当前图源: {getMapTypeDisplayName(currentMapType)}</div>
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
          maxWidth: '250px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        }}
      >
        <div style={{ fontWeight: 'bold', marginBottom: '6px', color: '#1890ff' }}>Google Maps + 自定义图源</div>
        <div style={{ marginBottom: '3px' }}>🗺️ Google Maps SDK 驱动</div>
        <div style={{ marginBottom: '3px' }}>🌐 支持 OSM、天地图等图源</div>
        <div style={{ marginBottom: '3px' }}>📡 ImageMapType 瓦片加载</div>
        <div style={{ marginBottom: '3px' }}>🔄 动态地图类型切换</div>
        <div style={{ marginBottom: '3px' }}>📝 天地图中文注记层</div>
        <div style={{ marginBottom: '3px' }}>🎯 统一坐标系和控件</div>
      </div>
    </div>
  );
};

export default GoogleMapWithCustomSources;
