import { Routes, Route, Navigate } from 'react-router-dom'
import { LoginView } from './login'
import { PqrsdView } from './pqrsd'


const SecurityRouter = () => {

    return (

        <Routes>
            <Route path='/login' element={<LoginView />} />
            <Route path='/pqrsd/' element={<PqrsdView />} />
            <Route path="*" element={<Navigate to="/pqrsd" />} /> 
        </Routes>

    )
}

export default SecurityRouter