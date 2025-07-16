import type { HcSelectProps } from './type';

import { Select, theme } from 'antd';
import React from 'react';

/**
 * 下拉选择组件
 * 基于 antd Select 的二次封装
 * @param props - 组件属性
 * @returns 下拉选择组件
 */

const HcSelect: React.FC<HcSelectProps> & {
  Option: typeof Select.Option;
  OptGroup: typeof Select.OptGroup;
} = (props) => {
  const { token } = theme.useToken();
  console.log(token.colorText, token.colorBgContainer, 'token');

  const defaultGetPopupContainer = (triggerNode: HTMLElement) => triggerNode.parentElement || document.body;

  return (
    <Select
      getPopupContainer={defaultGetPopupContainer}
      style={{
        color: token.colorText,
        backgroundColor: token.colorBgContainer,
      }}
      {...props}
    />
  );
};

// 添加静态属性
HcSelect.Option = Select.Option;
HcSelect.OptGroup = Select.OptGroup;

export { HcSelect };
