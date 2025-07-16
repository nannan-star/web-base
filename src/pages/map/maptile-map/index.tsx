import { Map, View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import 'ol/ol.css';
import XYZ from 'ol/source/XYZ';
import { useEffect, useRef } from 'react';

const MapTilerMap = () => {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const apiKey = '5fOf5t8mqWBN4p8O3MGJ';
  useEffect(() => {
    new Map({
      target: mapRef.current!,
      layers: [
        new TileLayer({
          source: new XYZ({
            url: `https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key=${apiKey}`,
            attributions:
              '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>',
            tileSize: 512,
            crossOrigin: 'anonymous',
          }),
        }),
      ],
      view: new View({
        center: [0, 0], // 默认中心点，单位是 EPSG:3857
        zoom: 2,
      }),
    });
  }, []);
  //可选不同风格，替换XYZ的url即可
  // const mapStyles = {
  //   streets: `https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key=${apiKey}`,
  //   basic: `https://api.maptiler.com/maps/basic/{z}/{x}/{y}.png?key=${apiKey}`,
  //   bright: `https://api.maptiler.com/maps/bright/{z}/{x}/{y}.png?key=${apiKey}`,
  //   dark: `https://api.maptiler.com/maps/dark/{z}/{x}/{y}.png?key=${apiKey}`,
  //   pastel: `https://api.maptiler.com/maps/pastel/{z}/{x}/{y}.png?key=${apiKey}`,
  //   winter: `https://api.maptiler.com/maps/winter/{z}/{x}/{y}.png?key=${apiKey}`,
  //   hybrid: `https://api.maptiler.com/maps/hybrid/{z}/{x}/{y}.png?key=${apiKey}`,
  //   satellite: `https://api.maptiler.com/maps/satellite/{z}/{x}/{y}.jpg?key=${apiKey}`,
  // };
  return <div ref={mapRef} style={{ width: '100%', height: '500px', border: '1px solid #ccc' }} />;
};

export default MapTilerMap;
