import { Map as OlMap, View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import { fromLonLat, get } from 'ol/proj';
import { XYZ } from 'ol/source';
import { useEffect, useRef } from 'react';

const TianDiTuMap = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<OlMap | null>(null);
  const tdtKey = 'd7077257b0ca8c279c3e1bf92fb437dc';
  const projection = get('EPSG:3857'); //提供两种1EPSG:4326；2EPSG:3857

  const initMap = () => {
    const tdtLayer = new TileLayer({
      visible: true,
      source: new XYZ({
        url: 'http://t{0-7}.tianditu.gov.cn/DataServer?T=vec_w&x={x}&y={y}&l={z}&tk=' + tdtKey,
        wrapX: true,
      }),
      properties: {
        type: 'baseLayer',
      },
    });
    // Note Layer
    const cvaLayer = new TileLayer({
      visible: true,
      source: new XYZ({
        url: 'http://t{0-7}.tianditu.gov.cn/DataServer?T=cva_w&x={x}&y={y}&l={z}&tk=' + tdtKey,
        wrapX: true,
      }),
      properties: {
        type: 'baseLayer',
        name: 'cva',
      },
    });

    if (!mapInstance.current && mapRef.current && projection) {
      mapInstance.current = new OlMap({
        target: mapRef.current,
        layers: [tdtLayer, cvaLayer],
        view: new View({
          center: projection.getCode() === 'EPSG:4326' ? [116.406393, 39.909006] : fromLonLat([116.406393, 39.909006]),
          projection: projection,
          zoom: 4,
        }),
        // view: new View({
        //   center: fromLonLat([110.189425, 35.164008]),
        //   projection: 'EPSG:3857',
        //   zoom: 4,
        //   extent: [-20026376.39, -20048966.1, 20026376.39, 20048966.1],
        // }),
        controls: [],
        maxTilesLoading: 4,
      });
    }
  };

  useEffect(() => {
    initMap();
  }, []);

  return <div ref={mapRef} style={{ width: '100%', height: '500px', border: '1px solid #ccc' }} />;
};

export default TianDiTuMap;
