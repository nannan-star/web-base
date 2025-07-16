import CURRENT from '../env/current.json';
import ENV_CONFIG from '../env/index.json';
const globalConf = ENV_CONFIG[CURRENT?.env as keyof typeof ENV_CONFIG];

export default {
  '/api/': {
    target: globalConf.api,
    changeOrigin: true,
    ws: false,
    pathRewrite: {
      '^/api/': '/',
    },
  },
};
