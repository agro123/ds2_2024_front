import { Menu } from "antd";
import Sider from "antd/es/layout/Sider";
import {
    DesktopOutlined,
    PieChartOutlined,
} from '@ant-design/icons';
import { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';

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

    const items = [
        getItem(<Link to="/admin/dashboard">Dashboard</Link>, '1', <PieChartOutlined />),
        getItem(<Link to="/admin/users">Usuarios</Link>, '2', <DesktopOutlined />),
        getItem(<Link to="/admin/pqrsd">PQRSD</Link>, '3', <DesktopOutlined />),
    ];

    const [collapsed, setCollapsed] = useState(false);

    return (
        <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
            <div className="demo-logo-vertical" />
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
        </Sider>
    );
};
