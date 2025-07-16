import { Button, Card, Space } from 'antd';
import { Map, View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import 'ol/ol.css';
import XYZ from 'ol/source/XYZ';
import { useEffect, useRef, useState } from 'react';

const MapboxInOL = () => {
  const mapRef = useRef(null);
  const mapboxToken = 'pk.eyJ1IjoiY2hjbmF2LXJkIiwiYSI6ImNtYm96dnliNDF5dXYya3F4dmFjOGlmYmsifQ.nx6U8lOX0n8yUEqOgyRBgg';

  // 🎨 Mapbox 支持的所有瓦片 URL 样式
  const mapboxStyles = {
    'streets-v12': `https://api.mapbox.com/styles/v1/mapbox/streets-v12/tiles/256/{z}/{x}/{y}?access_token=${mapboxToken}`,
    'streets-v11': `https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/256/{z}/{x}/{y}?access_token=${mapboxToken}`,
    'outdoors-v12': `https://api.mapbox.com/styles/v1/mapbox/outdoors-v12/tiles/256/{z}/{x}/{y}?access_token=${mapboxToken}`,
    'light-v11': `https://api.mapbox.com/styles/v1/mapbox/light-v11/tiles/256/{z}/{x}/{y}?access_token=${mapboxToken}`,
    'dark-v11': `https://api.mapbox.com/styles/v1/mapbox/dark-v11/tiles/256/{z}/{x}/{y}?access_token=${mapboxToken}`,
    'satellite-v9': `https://api.mapbox.com/styles/v1/mapbox/satellite-v9/tiles/256/{z}/{x}/{y}?access_token=${mapboxToken}`,
    'satellite-streets-v12': `https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v12/tiles/256/{z}/{x}/{y}?access_token=${mapboxToken}`,
    'navigation-day-v1': `https://api.mapbox.com/styles/v1/mapbox/navigation-day-v1/tiles/256/{z}/{x}/{y}?access_token=${mapboxToken}`,
    'navigation-night-v1': `https://api.mapbox.com/styles/v1/mapbox/navigation-night-v1/tiles/256/{z}/{x}/{y}?access_token=${mapboxToken}`,
  };

  const [currentStyle, setCurrentStyle] = useState<keyof typeof mapboxStyles>('streets-v12');
  const [map, setMap] = useState<Map | null>(null);

  const initMap = () => {
    const newMap = new Map({
      target: mapRef.current!,
      layers: [
        new TileLayer({
          source: new XYZ({
            url: mapboxStyles[currentStyle],
            tileSize: 256,
            attributions: '© Mapbox © OpenStreetMap',
            crossOrigin: 'anonymous',
          }),
        }),
      ],
      view: new View({
        center: [0, 0], // EPSG:3857 坐标
        zoom: 2,
      }),
    });
    setMap(newMap);
  };

  useEffect(() => {
    initMap();
  }, []);

  useEffect(() => {
    // 当样式改变时，更新地图图层的数据源
    if (map) {
      const layer = map.getLayers().getArray()[0] as TileLayer<XYZ>;
      const source = layer.getSource();
      if (source) {
        source.setUrl(mapboxStyles[currentStyle]);
      }
    }
  }, [currentStyle, map]);

  const styleNames = {
    'streets-v12': '街道地图 v12',
    'streets-v11': '街道地图 v11',
    'outdoors-v12': '户外地图',
    'light-v11': '浅色地图',
    'dark-v11': '深色地图',
    'satellite-v9': '卫星影像',
    'satellite-streets-v12': '卫星+街道',
    'navigation-day-v1': '导航(白天)',
    'navigation-night-v1': '导航(夜间)',
  };

  return (
    <div>
      <Card title="🗺️ Mapbox 瓦片 URL 样式切换" style={{ marginBottom: 16 }}>
        <p style={{ marginBottom: 12, color: '#666' }}>✅ Mapbox 完全支持通过 URL 瓦片方式加载样式</p>
        <Space wrap>
          {Object.keys(mapboxStyles).map((styleKey) => (
            <Button
              key={styleKey}
              type={currentStyle === styleKey ? 'primary' : 'default'}
              size="small"
              onClick={() => setCurrentStyle(styleKey as keyof typeof mapboxStyles)}
            >
              {styleNames[styleKey as keyof typeof styleNames]}
            </Button>
          ))}
        </Space>
        <div style={{ marginTop: 12, padding: '8px', backgroundColor: '#f5f5f5', borderRadius: '4px' }}>
          <p style={{ margin: 0, fontSize: '12px', fontFamily: 'monospace' }}>当前 URL: {mapboxStyles[currentStyle]}</p>
        </div>
      </Card>

      <div ref={mapRef} style={{ width: '100%', height: '500px', border: '1px solid #ccc' }} />
    </div>
  );
};

export default MapboxInOL;
