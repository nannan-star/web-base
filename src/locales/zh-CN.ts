import core from './index';
import { getLocaleRes } from './transform';

export default {
  ...getLocaleRes({ ...core }, 'zh-CN'),
};
