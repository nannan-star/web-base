import { Map, View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import 'ol/ol.css';
import XYZ from 'ol/source/XYZ';
import { useEffect, useRef } from 'react';

const MapboxInOL = () => {
  const mapRef = useRef(null);
  const mapboxToken = 'pk.eyJ1IjoiY2hjbmF2LXJkIiwiYSI6ImNtYm96dnliNDF5dXYya3F4dmFjOGlmYmsifQ.nx6U8lOX0n8yUEqOgyRBgg';

  const initMap = () => {
    new Map({
      target: mapRef.current!,
      layers: [
        new TileLayer({
          source: new XYZ({
            url: `https://api.mapbox.com/styles/v1/mapbox/streets-v12/tiles/512/{z}/{x}/{y}?access_token=${mapboxToken}`,
            tileSize: 512,
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
  };

  useEffect(() => {
    initMap();
  }, []);

  return <div ref={mapRef} style={{ width: '100%', height: '500px' }} />;
};

export default MapboxInOL;
