import { Breadcrumb, Layout, theme } from 'antd';
import { SideBar } from '../../layouts/sidebar';
import { CustomFooter } from '../../layouts/footer';
import { Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Dashboardview } from './dashboard';
import { UsersList } from './users';
import { PqrsdList } from './pqrdsList';

const AdminRouter = () => {

    const { Content, } = Layout;
    const { token: { colorBgContainer, borderRadiusLG }, } = theme.useToken();


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
                    {/* CREAR COMPONENTE DE TIPO BREADCRUMB FUNCIONAL DE ACUERDO A LAS RUTAS */}
                    <Breadcrumb
                        style={{
                            margin: '16px 0',
                        }}
                    >
                        <Breadcrumb.Item>Admin</Breadcrumb.Item>
                        <Breadcrumb.Item>Bill</Breadcrumb.Item>
                    </Breadcrumb>
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