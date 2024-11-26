import { Menu, Avatar, Button } from "antd";
import Sider from "antd/es/layout/Sider";
import {
    DesktopOutlined,
    PieChartOutlined,
    UserOutlined,
    LogoutOutlined
} from '@ant-design/icons';
import { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthProvider';

function getItem(label, key, icon, children, path) {
    return {
        key,
        icon,
        children,
        label,
        path,
    };
}

export const SideBar = () => {
    const navigate = useNavigate(); // Hook para navegar programáticamente
    const { userData, clearSavedData } = useAuth();

    const items = [
        getItem(<Link to="/admin/dashboard">Dashboard</Link>, '1', <PieChartOutlined />),
        getItem(<Link to="/admin/users">Usuarios</Link>, '2', <DesktopOutlined />),
        getItem(<Link to="/admin/pqrsd">PQRSD</Link>, '3', <DesktopOutlined />),
    ];

    const [collapsed, setCollapsed] = useState(false);

    // Función para manejar el cierre de sesión
    const handleLogout = () => {
        clearSavedData();
        navigate('/login'); // Redirige al usuario a la página de login
    };

    return (
        <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)} >
            <section style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                <div className="sidebar-header">
                    <div style={{ textAlign: 'center', padding: '3rem 0' }}>
                        <Avatar
                            size="large"
                            icon={<UserOutlined />}
                            style={{ backgroundColor: '#1890ff' }}
                        />
                        
                            <div className="user-info">
                                <h4 style={{ textAlign: 'center', color: 'white', marginTop: '.5rem' }}>{!collapsed && userData && (userData.name)}</h4>
                            </div>
                        
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <Button
                                type="text"
                                icon={<LogoutOutlined />}
                                aria-label="Salir"
                                style={{
                                    width: '50%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    color: '#ffffff',
                                    fontSize: '14px',
                                    padding: '0px 8px',
                                    borderRadius: '4px',
                                    background: 'red'
                                }}
                                onClick={handleLogout}
                            >
                                {!collapsed && "Salir"}
                            </Button>
                        </div>
                    </div>
                </div>
                <Menu
                    theme="dark"
                    defaultSelectedKeys={['1']}
                    mode="inline"
                    items={items}
                    onClick={({ key }) => {
                        const item = items.find(item => item.key === key || item.children?.some(child => child.key === key));
                        if (item) {
                            const target = item.path || item.children?.find(child => child.key === key)?.path;
                            if (target) navigate(target);
                        }
                    }}
                />
                {/* Botón de cierre de sesión */}
                <div style={{ height: '100%', display: 'flex', alignItems: 'flex-end' }}>

                </div>
            </section>

        </Sider >
    );
};
