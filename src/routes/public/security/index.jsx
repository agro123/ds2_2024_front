import { Routes, Route, Navigate } from 'react-router-dom'
import { LoginView } from './login'
import { PqrsdView } from './pqrsd'


const SecurityRouter = () => {

    return (

        <Routes>
            <Route path='/login' element={<LoginView />} />
            <Route path='/pqrsd/' element={<PqrsdView />} />
            {/* {/* <Route path='/forgotpassword' element={<ForogotPasswordView />} /> */}
            <Route path="*" element={<Navigate to="/login" />} /> 
        </Routes>

    )
}

export default SecurityRouter