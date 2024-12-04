import { ProLayoutProps } from '@ant-design/pro-components';

/**
 * @name
 */
const Settings: ProLayoutProps & {
  pwa?: boolean;
  logo?: string;
} = {
  title: '算想未来',
  navTheme: 'light',
  colorPrimary: '#722ED1',
  layout: 'top',
  contentWidth: 'Fluid',
  fixedHeader: true,
  fixSiderbar: true,
  pwa: true,
  logo: void 0,
  token: {
    bgLayout: '#f3f6fd',
    sider: {
      colorBgCollapsedButton: '#5a47e5',
      colorTextCollapsedButtonHover: '#fff',
      colorTextCollapsedButton: '#fff',
      colorMenuBackground: '#26293b',
      colorTextMenuSelected: '#fff',
      colorTextMenuItemHover: '#fff',
      colorTextMenuActive: '#fff',
      colorTextMenu: '#fff',
      colorTextMenuSecondary: '#fff',
      colorTextMenuTitle: '#fff',
    },
    header: {
      colorBgHeader: '#26293b',
      colorHeaderTitle: '#fff',
      colorTextMenu: '#fff',
      colorBgMenuItemHover: '#fff',
      colorBgMenuElevated: '#fff',
      colorBgMenuItemSelected: '#26293b',
      colorTextMenuSelected: '#fff',
      colorTextMenuActive: '#fff',
      colorTextRightActionsItem: '#fff',
    },
    pageContainer: {
      paddingInlinePageContainerContent: 0,
    },
  },
  splitMenus: false,
  siderMenuType: 'sub',
  footerRender: () => '',
};

export default Settings;
