import { BsXOctagon } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthProvider';

const ErrorView = () => {
    const navigate = useNavigate();
    const {userData} = useAuth();

    return (
        <div style={{height: '100vh', padding: '50px', display: 'flex', justifyContent: 'center'}}>
            <div >
                <h1>404 <BsXOctagon size={50} /></h1>
                <h3 >PAGINA NO ENCONTRADA!</h3>
                <button onClick={()=> userData ? navigate("/admin") : navigate("/")}>Volver</button>
            </div>
        </div>
    )
}

export default ErrorView;