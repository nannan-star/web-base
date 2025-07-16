/**
 * @file 全局共享数据示例
 * @description 用于全局共享数据
 * @date 2025-06-04
 */
import { DEFAULT_NAME } from '@/constants';
import { useState } from 'react';

const useUser = () => {
  const [name, setName] = useState<string>(DEFAULT_NAME);
  return {
    name,
    setName,
  };
};

export default useUser;
