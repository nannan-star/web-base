/**
 * @fileoverview UmiMax 运行时配置文件
 * @description 定义全局初始化、布局、请求拦截器等运行时配置
 * @author 前端开发团队
 */
import { App } from 'antd';
import MessageProvider from './utils/message';

import { request } from './utils/request';

export function rootContainer(container: any) {
  return (
    <App>
      <MessageProvider />
      {container}
    </App>
  );
}

export { request };
