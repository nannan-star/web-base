import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { useEffect, useRef } from 'react';

const MapboxInOL = () => {
  const mapRef = useRef(null);
  const mapboxToken = 'pk.eyJ1IjoiY2hjbmF2LXJkIiwiYSI6ImNtYm96dnliNDF5dXYya3F4dmFjOGlmYmsifQ.nx6U8lOX0n8yUEqOgyRBgg';

  const initMap = () => {
    mapboxgl.accessToken = mapboxToken;
    const map = new mapboxgl.Map({
      container: mapRef.current!,
      style: 'mapbox://styles/mapbox/satellite-streets-v12',
      projection: 'globe', // Display the map as a globe, since satellite-v9 defaults to Mercator
      zoom: 8,
      center: [121.31, 31.57],
    });

    map.addControl(new mapboxgl.NavigationControl());
    map.scrollZoom.enable(); // 启用滚轮缩放

    map.on('style.load', () => {
      map.setFog({}); // Set the default atmosphere style
    });

    // The following values can be changed to control rotation speed:

    // At low zooms, complete a revolution every two minutes.
    const secondsPerRevolution = 240;
    // Above zoom level 5, do not rotate.
    const maxSpinZoom = 5;
    // Rotate at intermediate speeds between zoom levels 3 and 5.
    const slowSpinZoom = 3;

    let userInteracting = false;
    const spinEnabled = true;

    function spinGlobe() {
      const zoom = map.getZoom();
      if (spinEnabled && !userInteracting && zoom < maxSpinZoom) {
        let distancePerSecond = 360 / secondsPerRevolution;
        if (zoom > slowSpinZoom) {
          // Slow spinning at higher zooms
          const zoomDif = (maxSpinZoom - zoom) / (maxSpinZoom - slowSpinZoom);
          distancePerSecond *= zoomDif;
        }
        const center = map.getCenter();
        center.lng -= distancePerSecond;
        // Smoothly animate the map over one second.
        // When this animation is complete, it calls a 'moveend' event.
        map.easeTo({ center, duration: 1000, easing: (n) => n });
      }
    }

    // Pause spinning on interaction
    map.on('mousedown', () => {
      userInteracting = true;
    });
    map.on('dragstart', () => {
      userInteracting = true;
    });

    // When animation is complete, start spinning if there is no ongoing interaction
    map.on('moveend', () => {
      spinGlobe();
    });

    spinGlobe();
  };

  useEffect(() => {
    initMap();
  }, []);

  return <div ref={mapRef} style={{ width: '100%', height: '500px' }} />;
};

export default MapboxInOL;
