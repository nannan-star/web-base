import type { MenuItem, RouteItem } from '@/types/common';
import type { SiderProps } from './type';

import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { history, useIntl, useLocation } from '@umijs/max';
import { Layout, Menu } from 'antd';

import styles from './index.less';

const { Sider } = Layout;

const CustomSider: React.FC<SiderProps> = ({ collapsed, onCollapse, routes }) => {
  const location = useLocation();
  const intl = useIntl();

  const generateMenuItems = (routes: RouteItem[]): MenuItem[] => {
    return routes.map((route) => {
      const label = intl.formatMessage({ id: `menu.${route.name}` });
      if (route.routes) {
        return {
          key: route.path,
          label,
          children: generateMenuItems(route.routes),
        };
      }
      return {
        key: route.path,
        label,
        onClick: () => history.push(route.path),
      };
    });
  };

  const menuItems = generateMenuItems(routes);

  return (
    <Sider width={240} collapsedWidth={65} trigger={null} collapsible collapsed={collapsed} className={styles.sider}>
      <div className={styles.trigger} onClick={() => onCollapse(!collapsed)}>
        {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
      </div>

      <Menu mode="inline" defaultSelectedKeys={[location.pathname]} items={menuItems} />
    </Sider>
  );
};

export default CustomSider;
