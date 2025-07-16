import { defineConfig } from '@umijs/max';
import proxy from './proxy';
import routes from './routes';

export default defineConfig({
  antd: {},
  model: {
    extraModels: [],
  },
  initialState: {},
  request: {
    dataField: '',
  },
  styledComponents: {},
  locale: {
    default: 'zh-CN',
    baseNavigator: true,
    baseSeparator: '-',
  },
  layout: false,
  routes: routes,
  proxy: proxy,
  npmClient: 'pnpm',
  // mfsu: false,
  // fastRefresh: false,
});
