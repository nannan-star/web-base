/**
 * @file 测站相关接口
 * @description 测站相关接口
 * @date 2025-06-12
 */
import { RequestParams } from '@/types/common';
import { StationInfo } from '@/types/station';
import { request } from '@umijs/max';

/**
 * 获取测站列表
 * @param params 请求参数
 * @returns 测站列表
 */
export async function getStationList(params: RequestParams) {
  return request('/api/stream/stations', {
    method: 'GET',
    params: { ...params },
  });
}

/**
 * 获取所有测站信息
 * @returns 所有测站信息
 */
export async function getStationDynamicInfo() {
  return request('/api/stream/stations/dynamic-info/simple', {
    method: 'GET',
    getResponse: true,
  });
}

/**
 * 新增测站
 * @param params 请求参数
 * @returns 新增测站
 */
export async function addStation(params: StationInfo) {
  return request('/api/stream/stations', {
    method: 'POST',
    data: { ...params },
    getResponse: true,
  });
}

/**
 * 编辑测站
 * @param params 请求参数
 * @returns 编辑测站
 */
export async function editStation(id: string, params: StationInfo) {
  return request(`/api/stream/stations/${id}`, {
    method: 'PUT',
    data: { ...params },
    getResponse: true,
  });
}

/**
 * 删除测站
 * @param params 请求参数
 * @returns 删除测站
 */
export async function deleteStation(params: { ids: Array<number> }) {
  return request('/api/stream/stations/delete', {
    method: 'POST',
    data: { ...params },
    skipErrorHandler: true, // 跳过错误处理
    getResponse: true,
  });
}
