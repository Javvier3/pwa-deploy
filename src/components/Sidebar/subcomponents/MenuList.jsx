import {Menu} from 'antd';
import {EnvironmentOutlined,CarOutlined,UserOutlined,LogoutOutlined} from '@ant-design/icons';
import '../Sidebar.css';

const MenuList = ({darkTheme}) => {
  return (
    <Menu theme={darkTheme? 'dark' : 'light'} className="icons menu-bar" mode="inline">
        <Menu.Item key="viajes" icon={<EnvironmentOutlined/>}>
            Viajes
        </Menu.Item>

        <Menu.Item key="unidades" icon={<CarOutlined/>}>
            Unidades
        </Menu.Item>

        <Menu.Item key="conductores" icon={<UserOutlined/>}>
            Conductores
        </Menu.Item>


        <Menu.Item
            key="cerrarSesion" icon={<LogoutOutlined />}
            title=""
            style={{
                position: 'absolute',
                bottom: 0,
            }} >

              Cerrar sesión
        </Menu.Item>

    </Menu>
  )
}

export default MenuList
