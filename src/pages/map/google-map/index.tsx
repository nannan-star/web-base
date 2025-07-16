import { Loader } from '@googlemaps/js-api-loader';
import 'ol/ol.css';
import { useEffect, useRef } from 'react';

const GoogleMapWithOL = () => {
  const googleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loader = new Loader({
      apiKey: 'AIzaSyAiyqU2ScVi7prgkTKSb0O3fL7QFcDB4CY',
      version: 'weekly',
    });

    loader.load().then(() => {
      new google.maps.Map(googleRef.current!, {
        center: { lat: 39.9042, lng: 116.4074 }, // 北京
        zoom: 4,
        disableDefaultUI: true,
        // 关键配置：启用Vector Maps获得现代蓝色样式
        // renderingType: google.maps.RenderingType.VECTOR,
      });
    });
  }, []);

  return (
    <div style={{ position: 'relative', width: '100%', height: '500px' }}>
      <div ref={googleRef} style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }} />
    </div>
  );
};

export default GoogleMapWithOL;
