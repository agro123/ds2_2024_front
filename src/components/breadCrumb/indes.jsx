import { Breadcrumb , Tooltip} from 'antd';
import { RightOutlined } from '@ant-design/icons';
import { Link, useLocation } from 'react-router-dom';

// Función para transformar un segmento de ruta en un nombre legible
const capitalize = (s) => s.charAt(0).toUpperCase() + s.slice(1);

const BreadCrumb = () => {
    const location = useLocation();

    // Divide la ruta actual en segmentos
    const pathSnippets = location.pathname.split('/').filter((i) => i);

    // Acumula el path para cada segmento
    const breadcrumbItems = pathSnippets.map((_, index) => {
        const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;
        const currentPath = pathSnippets[index];

        const breadcrumbNameMap = {
            inicio: 'Inicio',
            pqrsd: 'PQRSD',
            lista: 'Lista de PQRSD',
        };

        return {
            title: breadcrumbNameMap[currentPath] || capitalize(currentPath),
            path: url,
        };
    });

    // Agrega un elemento raíz "Inicio" si no está presente
    const firstBreadcrumb = {
        title: 'Inicio',
        path: '/',
    };

    const fullBreadcrumbItems = [firstBreadcrumb, ...breadcrumbItems];

    return (
        <div className="breadcrumb-container">           
            <Breadcrumb
                items={fullBreadcrumbItems.map((item, index) => {
                    // Determinar si es el último elemento
                    const isLast = index === fullBreadcrumbItems.length - 1;

                    return {
                        key: item.key,
                        href: isLast ? undefined : item.href,
                        title: isLast ? (
                            <span className="breadcrumb-current">{item.title}</span>
                        ) : (
                            <Tooltip title={typeof item.title === 'string' ? item.title : ''}>
                                <Link to={item.href} className="breadcrumb-link" style={{ color: '#1890ff' }}>
                                    {item.title}
                                </Link>
                            </Tooltip>
                        ),
                    };
                })}
                separator={<RightOutlined style={{ color: '#1890ff', fontSize: '10px' }} />}
                style={{ padding: '.2rem .2rem', borderBottom: '1px solid gray', margin: '1rem 0', width: 'max-content' }}
            />
        </div>
    );
};

export default BreadCrumb;
