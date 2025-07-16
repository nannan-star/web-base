import type { RequestConfig } from '@umijs/max';

import { getLocale, history } from '@umijs/max';
import queryString from 'query-string';

import { TOKEN_KEY } from '@/constants';
import { message } from '@/utils/message';

/**
 * HTTP状态码错误消息映射
 */
const HTTP_ERROR_MESSAGES: Record<number, string> = {
  400: '请求参数错误，请检查输入内容',
  401: '登录已过期，请重新登录',
  403: '权限不足，无法访问该资源',
  404: '请求的资源不存在',
  405: '请求方法不被允许',
  408: '请求超时，请稍后重试',
  422: '请求的数据格式错误',
  429: '请求过于频繁，请稍后重试',
  500: '服务器内部错误，请稍后重试',
  502: '网关错误，请稍后重试',
  503: '服务暂时不可用，请稍后重试',
  504: '网关超时，请稍后重试',
};

/**
 * 处理HTTP状态码错误
 */
const handleHttpStatusError = (status: number, data: any): void => {
  const getErrorMessage = (defaultMsg: string): string => {
    return data?.msg || defaultMsg;
  };

  switch (status) {
    case 401:
      message.error(getErrorMessage(HTTP_ERROR_MESSAGES[401]));
      localStorage.removeItem(TOKEN_KEY);
      history.push('/login');
      break;

    default:
      if (HTTP_ERROR_MESSAGES[status]) {
        message.error(getErrorMessage(HTTP_ERROR_MESSAGES[status]));
      } else {
        if (status >= 400 && status < 500) {
          message.error(getErrorMessage(`客户端错误 (${status})`));
        } else if (status >= 500) {
          message.error(getErrorMessage(`服务器错误 (${status})`));
        } else {
          message.error(getErrorMessage(`请求失败 (${status})`));
        }
      }
      break;
  }
};

/**
 * 请求拦截器
 */
const requestInterceptor = (url: string, options: any) => {
  const tokenObj = JSON.parse(localStorage.getItem(TOKEN_KEY) || '{}');
  const { tokenHead = 'Bearer', token } = tokenObj;
  options.headers = options.headers || {};

  if (token) {
    options.headers.Authorization = `${tokenHead} ${token}`;
  }

  if (options.data instanceof FormData) {
    options.headers['Content-type'] = 'multipart/form-data';
  }

  const language = getLocale();
  options.headers['Accept-Language'] = language;

  return { url, options };
};

/**
 * 响应拦截器
 */
const responseInterceptor = (response: any) => {
  // 响应拦截器（处理业务状态码）
  const { data, config } = response;

  // 如果设置了跳过错误处理，直接返回数据
  if (config?.skipErrorHandler) {
    return data;
  }

  if (data?.code !== 'SUCCESS') {
    console.log('响应拦截器（处理业务状态码）', data);
    message.error(data.msg || '请求失败');
  }
  return data;
};

/**
 * 错误处理器
 */
const errorHandler = (error: any, opts: any) => {
  // 如果设置了跳过错误处理，直接抛出错误
  if (opts?.skipErrorHandler) {
    throw error;
  }
  console.log(error, 'HTTP_ERROR');
  if (error.response) {
    const { data, status } = error.response;
    handleHttpStatusError(status, data);
  } else if (error.request) {
    message.error('网络请求失败，请检查网络连接');
  } else {
    message.error('请求发生错误，请稍后重试');
  }
};

/**
 * 请求配置
 */
export const request: RequestConfig = {
  timeout: 30 * 1000,
  withCredentials: true,
  headers: { 'X-Requested-With': 'XMLHttpRequest', 'Content-Type': 'application/json;charset=UTF-8' },

  paramsSerializer(params: object): string {
    return queryString.stringify(params);
  },

  errorConfig: {
    errorHandler,
  },
  requestInterceptors: [requestInterceptor],
  responseInterceptors: [responseInterceptor],
};
