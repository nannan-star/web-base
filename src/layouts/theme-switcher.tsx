/**
 * @fileoverview 主题颜色切换
 * @description 提供主题颜色选择功能
 * @author 前端开发团队
 */
import type { ThemeSwitcherProps } from '@/types/theme';
import type { Color } from 'antd/es/color-picker';

import { useModel } from '@umijs/max';
import { ColorPicker, Space, Tooltip } from 'antd';

/**
 * 主题切换组件
 * @param props - 组件属性
 * @returns React组件
 */
const ThemeSwitcher: React.FC<ThemeSwitcherProps> = ({ onClose }) => {
  const { primaryColor, setPrimaryColor } = useModel('theme');

  /**
   * 处理主题色变更
   * @param color - 新的主题色
   */
  const handleColorChange = (color: Color) => {
    setPrimaryColor(color.toHexString() as '#FA853A');
    onClose();
  };

  return (
    <Space direction="vertical" style={{ width: '100%' }} size="large">
      <Tooltip title="切换主题色">
        <Space.Compact>
          <ColorPicker showText value={primaryColor} onChange={handleColorChange} />
        </Space.Compact>
      </Tooltip>
    </Space>
  );
};

export default ThemeSwitcher;
