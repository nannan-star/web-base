import { HcButtonProps } from './type';

import { Button as AntdButton } from 'antd';
import './index.less';

export const HcButton = ({ customSize, customType, children, ...restProps }: HcButtonProps) => {
  const buttonSizeMap = {
    mini: 'mini',
    small: 'middle',
    regular: 'regular', // antd没有直接提供medium，但可以用middle代替或自定义
    large: 'large',
  };

  const buttonTypeMap = {
    primary: 'primary-custom', // 主要按钮样式
    secondary: 'secondary-custom', // 次要按钮样式
    // 你可以继续添加其他类型，如果需要的话
  };

  const buttonSize = buttonSizeMap[customSize as keyof typeof buttonSizeMap] || 'middle'; // 默认尺寸为middle
  const buttonType = buttonTypeMap[customType as keyof typeof buttonTypeMap] || 'default'; // 默认类型为default

  return (
    <AntdButton className={`hc-button ${buttonType} ${buttonSize}`} {...restProps}>
      {children}
    </AntdButton>
  );
};
