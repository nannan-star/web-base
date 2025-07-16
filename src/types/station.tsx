/**
 * 测站类型定义
 * @file src/types/station.ts
 */
export interface StationInfo {
  id: string;
  stationName: string;
  identifier: string;
  receiverType: string;
  dataType: string;
  status: 'running' | 'stopped' | 'offline';
  network: 'online' | 'offline';
  epochTime: string;
  dataDelay: number;
  satelliteCount: string;
  [key: string]: any;
}

/**
 * 测站列表响应
 * @interface StationListResponse
 * @property {StationInfo[]} data - 测站列表
 * @property {number} total - 总条数
 * @property {boolean} success - 是否成功
 */
export interface StationListResponse {
  data: StationInfo[];
  total: number;
  success: boolean;
}

/**
 * 测站操作类型
 * @type {('create' | 'edit' | 'delete' | 'import')}
 */
export type StationOperation = 'create' | 'edit' | 'delete' | 'import';

/**
 * ProTable request 参数类型
 * @interface ProTableParams
 */
export interface ProTableParams {
  current?: number;
  pageSize?: number;
  keyword?: string;
  [key: string]: any;
}
