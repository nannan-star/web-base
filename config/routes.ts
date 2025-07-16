export default [
  {
    path: '/',
    redirect: '/screen',
    routes: [
      {
        name: 'document',
        path: '/doc',
        routes: [
          {
            name: 'umi',
            path: '/doc/umi',
            component: './doc/umi',
          },
          {
            name: 'package',
            path: '/doc/package',
            component: './doc/package',
          },
          {
            name: 'code-standard',
            path: '/doc/code-standard',
            component: './doc/code-standard',
          },
          {
            name: 'ui',
            path: '/doc/ui',
            component: './doc/ui',
          },
          {
            name: 'i18n',
            path: '/doc/i18n',
            component: './doc/i18n',
          },
          {
            name: 'error-boundary',
            path: '/doc/error-boundary',
            component: './doc/error-boundary',
          },
          {
            name: 'screen',
            path: '/doc/screen',
            component: './doc/screen',
          },
        ],
      },
      {
        name: 'ui',
        path: '/ui',
        routes: [
          // {
          //   name: 'hc-colors',
          //   path: '/ui/hc-colors',
          //   component: './ui/hc-colors',
          // },
          {
            name: 'hc-button',
            path: '/ui/hc-button',
            component: './ui/hc-button',
          },
          {
            name: 'hc-select',
            path: '/ui/hc-select',
            component: './ui/hc-select',
          },
        ],
      },
      {
        name: 'station',
        path: '/station',
        routes: [
          {
            name: 'station-list',
            path: '/station/station-list',
            component: './station/station-list',
          },
        ],
      },

      {
        name: 'map',
        path: '/map',
        routes: [
          {
            name: 'google-map',
            path: '/map/google-map',
            component: './map/google-map',
          },
          {
            name: 'maptile-map',
            path: '/map/maptile-map',
            component: './map/maptile-map',
          },
          {
            name: 'mapbox-map',
            path: '/map/mapbox-map',
            component: './map/mapbox-map',
          },
          {
            name: 'tianditu-map',
            path: '/map/tianditu-map',
            component: './map/tianditu-map',
          },
          {
            name: 'amap-map',
            path: '/map/amap-map',
            component: './map/amap-map',
          },
          {
            name: 'osm-map',
            path: '/map/osm-map',
            component: './map/osm-map',
          },
        ],
      },
    ],
  },
  {
    name: 'screen',
    path: '/screen',
    layout: false,
    component: './screen',
  },
  {
    name: 'screen1',
    path: '/screen1',
    layout: false,
    component: './screen1',
  },
  {
    path: '/login',
    layout: false,
    component: './login',
  },
];
