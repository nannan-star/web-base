import type { ButtonProps } from 'antd';
import { ReactNode } from 'react';

export type HcButtonProps = Omit<ButtonProps, 'type'> & {
  customSize?: 'mini' | 'small' | 'regular' | 'large';
  customType?: 'primary' | 'secondary';
  children?: ReactNode;
  [key: string]: any;
};
