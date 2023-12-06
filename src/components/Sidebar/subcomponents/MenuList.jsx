import { Menu } from 'antd';
import { EnvironmentOutlined, CarOutlined, UserOutlined, LogoutOutlined } from '@ant-design/icons';
import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import '../Sidebar.css';

const MenuList = ({ darkTheme }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [selectedKey, setSelectedKey] = useState(null);
  const [collapsed, setCollapsed] = useState(localStorage.getItem('menuCollapsed') === 'true');

  const handleMenuClick = (e) => {
    const key = e.key;
    setSelectedKey(key);

    if (key === 'viajes') {
      navigate('/viajes');
    } else if (key === 'unidades') {
      navigate('/unidades');
    } else if (key === 'conductores') {
      navigate('/conductores');
    } else if (key === 'cerrarSesion') {
      navigate('/logout');
    }
  };

  const toggleCollapsed = () => {
    const newCollapsed = !collapsed;
    setCollapsed(newCollapsed);
    localStorage.setItem('menuCollapsed', newCollapsed);
  };

  useEffect(() => {
    const path = location.pathname;
    if (path === '/viajes' || path === '/unidades' || path === '/conductores' || path === '/logout') {
      setSelectedKey(path.slice(1)); // Quita la barra inicial para coincidir con las claves
    } else {
      setSelectedKey(null);
    }
  }, [location.pathname]);

  useEffect(() => {
    // Cargar el estado del menú colapsado desde localStorage
    const storedCollapsed = localStorage.getItem('menuCollapsed') === 'true';
    setCollapsed(storedCollapsed);
  }, []);

  return (
    <Menu
      theme={darkTheme ? 'dark' : 'light'}
      className="icons menu-bar"
      mode="inline"
      selectedKeys={[selectedKey]}
      onClick={handleMenuClick}
      inlineCollapsed={collapsed}
    >
      <Menu.Item key="viajes" icon={<EnvironmentOutlined />}>
        Viajes
      </Menu.Item>

      <Menu.Item key="unidades" icon={<CarOutlined />}>
        Unidades
      </Menu.Item>

      <Menu.Item key="conductores" icon={<UserOutlined />}>
        Conductores
      </Menu.Item>

      <Menu.Item
        key="cerrarSesion"
        icon={<LogoutOutlined />}
        title=""
        onClick={toggleCollapsed}
        style={{
          position: 'absolute',
          bottom: 0,
        }}
      >
        Cerrar Sesión
      </Menu.Item>
    </Menu>
  );
};

export default MenuList;
