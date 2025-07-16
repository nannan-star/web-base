import type { ThemeMode } from '@/types/theme';

import { BgColorsOutlined, GlobalOutlined, SettingOutlined } from '@ant-design/icons';
import { setLocale, useModel } from '@umijs/max';
import { Dropdown, Layout } from 'antd';

import { HcButton } from '@/components/ui';

import styles from './index.less';

interface HeaderProps {
  onSettingClick: () => void;
}
const { Header } = Layout;
const CustomHeader: React.FC<HeaderProps> = ({ onSettingClick }) => {
  const languageItems = [
    {
      key: 'zh-CN',
      label: '中文',
    },
    {
      key: 'en-US',
      label: 'English',
    },
  ];

  // 主题相关
  const { themeMode, setThemeMode, algorithm, setAlgorithm } = useModel('theme');
  const themeItems = [
    {
      key: 'theme-light',
      label: '默认主题',
    },
    {
      key: 'theme-dark',
      label: '暗黑主题',
    },
    {
      key: 'compact',
      label: '紧凑主题',
    },
  ];

  const handleLanguageChange = ({ key }: { key: string }) => {
    setLocale(key, false);
  };

  // 主题切换逻辑
  const handleThemeChange = ({ key }: { key: string }) => {
    if (key === 'compact') {
      setAlgorithm(algorithm === 'default' ? 'compact' : 'default');
    } else {
      setThemeMode(key as ThemeMode);
    }
  };

  return (
    <Header className={styles.header}>
      <div className={styles.title}>华测导航</div>
      <div className={styles.headerActions}>
        <Dropdown
          menu={{
            items: languageItems,
            onClick: handleLanguageChange,
          }}
          placement="bottomRight"
        >
          <HcButton type="text" icon={<GlobalOutlined />} className={styles.headerButton} />
        </Dropdown>
        <Dropdown
          menu={{
            items: themeItems,
            onClick: handleThemeChange,
            selectable: true,
            selectedKeys: [algorithm === 'compact' ? 'compact' : themeMode],
          }}
          placement="bottomRight"
        >
          <HcButton type="text" icon={<BgColorsOutlined />} className={styles.headerButton} />
        </Dropdown>
        <HcButton type="text" icon={<SettingOutlined />} onClick={onSettingClick} className={styles.headerButton} />
      </div>
    </Header>
  );
};

export default CustomHeader;
