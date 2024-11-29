import { useEffect } from 'react';
import { Layout, theme } from 'antd';
import { SideBar } from '../../layouts/sidebar';
import { CustomFooter } from '../../layouts/footer';
import { Suspense } from 'react';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import { Dashboardview } from './dashboard';
import { UsersList } from './users';
import { PqrsdList } from './pqrdsList';
import { useAuth } from '../../context/AuthProvider';
import BreadCrumb from '../../components/breadCrumb/indes';

const authToken = localStorage.getItem('authToken');
const AdminRouter = () => {;
    const navigate = useNavigate();
    const {userData} = useAuth();

    const { Content, } = Layout;
    const { token: { colorBgContainer, borderRadiusLG }, } = theme.useToken();

    useEffect(() => {
        if(!authToken && !userData){
            navigate('/login')
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userData])

    return (

        <Layout
            style={{
                minHeight: '100vh',
            }}>
            <SideBar />
            <Layout>

                <Content
                    style={{
                        margin: '0 16px',
                    }}
                >
                    {/* CREAR COMPONENTE DE TIPO BREADCRUMB FUNCIONAL DE ACUERDO A LAS RUTAS 
                    <Breadcrumb
                        style={{
                            margin: '16px 0',
                        }}
                    >
                        <Breadcrumb.Item>Admin</Breadcrumb.Item>
                        <Breadcrumb.Item>Bill</Breadcrumb.Item>
                    </Breadcrumb>
                    */}
                    <BreadCrumb />
                    <div
                        style={{
                            padding: 24,
                            minHeight: 360,
                            background: colorBgContainer,
                            borderRadius: borderRadiusLG,
                        }}
                    >

                        <Suspense fallback={<></>}>
                            <div className="app-main flex-column flex-row-fluid " id="kt_app_main">
                                <div className="d-flex flex-column flex-column-fluid">
                                    <Routes>
                                        <Route path='/' element={<Navigate to="/admin/dashboard" />} />
                                        <Route path='/dashboard' element={<Dashboardview />} />
                                        <Route path='/users' element={<UsersList />} />
                                        <Route path='/pqrsd' element={<PqrsdList />} />
                                        <Route path="*" element={<Navigate to="/error" />} />
                                    </Routes>
                                </div>
                            </div>
                        </Suspense>
                    </div>
                </Content>
                <CustomFooter />
            </Layout>
        </Layout>
    );
};


export default AdminRouter