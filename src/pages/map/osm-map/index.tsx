import { Map as OlMap, View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import { fromLonLat } from 'ol/proj';
import { OSM } from 'ol/source';
import { useEffect, useRef } from 'react';

const OSMMap = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<OlMap | null>(null);

  const initMap = () => {
    const osmLayer = new TileLayer({
      visible: true,
      // 使用XYZ源
      //   source: new XYZ({
      //     url: 'https://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      //     wrapX: true,
      //   }),
      // 使用OSM源
      source: new OSM(),
      properties: {
        type: 'baseLayer',
      },
    });

    if (!mapInstance.current && mapRef.current) {
      mapInstance.current = new OlMap({
        target: mapRef.current,
        layers: [osmLayer],
        view: new View({
          center: fromLonLat([110.189425, 35.164008]),
          projection: 'EPSG:3857',
          zoom: 4,
          extent: [-20026376.39, -20048966.1, 20026376.39, 20048966.1],
        }),
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

export default OSMMap;
