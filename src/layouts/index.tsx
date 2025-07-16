import { BasicLayoutProps } from './type';

import { Outlet, useModel } from '@umijs/max';
import { ConfigProvider, Drawer, Layout } from 'antd';
import { useState } from 'react';

import { ThemeProvider as CSSThemeProvider } from '@/components/theme-provider';
import Header from './header';
import CustomSider from './sider';
import ThemeSwitcher from './theme-switcher';

import routes from '../../config/routes';

import styles from './index.less';

const { Content } = Layout;

const BasicLayout: React.FC<BasicLayoutProps> = () => {
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const [drawerVisible, setDrawerVisible] = useState<boolean>(false);
  const { themeConfig } = useModel('theme');

  return (
    <CSSThemeProvider>
      <ConfigProvider theme={themeConfig}>
        <Layout className={styles.layout}>
          <Header onSettingClick={() => setDrawerVisible(true)} />
          <Layout>
            <CustomSider collapsed={collapsed} onCollapse={setCollapsed} routes={routes[0].routes || []} />
            <Content className={styles.content}>
              <Outlet />
            </Content>
          </Layout>

          <Drawer title="主题设置" placement="right" onClose={() => setDrawerVisible(false)} open={drawerVisible}>
            <ThemeSwitcher onClose={() => setDrawerVisible(false)} />
          </Drawer>
        </Layout>
      </ConfigProvider>
    </CSSThemeProvider>
  );
};

export default BasicLayout;
