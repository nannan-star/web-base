/**
 * 项目token
 * @type {string}
 */
const TOKEN_KEY = 'PROJECT_TOKEN';

/**
 * 默认名称
 * @type {string}
 */
const DEFAULT_NAME = 'Umi Max';

/**
 * 状态映射
 * @type {Record<string, { color: string, text: string }>}
 */
const STATUS_MAP = {
  running: { color: 'blue', text: '启动' },
  stopped: { color: 'default', text: '停止' },
  offline: { color: 'red', text: '离线' },
};
/**
 * 网络状态映射
 * @type {Record<string, { status: string, text: string }>}
 */
const NETWORK_MAP = {
  online: { status: 'success', text: '在线' },
  offline: { status: 'error', text: '离线' },
};

export { DEFAULT_NAME, NETWORK_MAP, STATUS_MAP, TOKEN_KEY };
