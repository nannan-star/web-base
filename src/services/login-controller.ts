import { request } from '@umijs/max';

import { LoginForm } from '@/types/login';

/**
 * 登录
 * @param data
 * @returns 登录成功返回token
 */
export async function login(data: LoginForm, validateCodeToken: string) {
  return request('/api/app/login', {
    method: 'POST',
    headers: {
      'Validate-Code-Token': validateCodeToken,
    },
    data,
  });
}
