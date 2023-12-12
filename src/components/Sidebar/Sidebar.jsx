import React from "react";
import { useState } from "react";
import { Button, Layout, theme} from "antd";
import { MenuUnfoldOutlined, MenuOutlined } from '@ant-design/icons'
import './Sidebar.css';
import MenuList from "./subcomponents/MenuList";
import LogoX from "./subcomponents/LogoX";

const { Header, Sider, Content } = Layout;

const Sidebar = ({ children }) => {
  const [darkTheme, setDarkTheme] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  const toggleThemeFn = () => {
    setDarkTheme(!darkTheme);
  };

  const {
    token: { colorBgContainer }
  } = theme.useToken();

  return (
    <Layout>
      <Sider
        collapsed={collapsed}
        collapsible
        trigger={null}
        theme={darkTheme ? 'dark' : 'light'}
        className="sidebar"
      >
        <LogoX darkTheme={darkTheme} collapsed={collapsed} />

        <div className="line-divider" />

        <MenuList darkTheme={darkTheme} />

        {/*<ToggleThemeButton darkTheme={darkTheme} toggleTheme={toggleThemeFn} />*/}
 
      </Sider>

      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Button
              type='text'
              className="toggle"
              onClick={() => setCollapsed(!collapsed)}
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuOutlined />}
            />
            <p className="srTitle">Hola, Admin !</p>
          </div>
        </Header>

        <Content style={{ padding: '30px' }}>
          {/* Aquí puedes agregar el contenido proporcionado por la página */}
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default Sidebar;
