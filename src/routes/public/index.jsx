import { Routes, Route, Navigate } from 'react-router-dom'
import SecurityRouter from './security'

const PublicRouter = () => {

    return (
        <Routes>
            <Route path='/*' element={<SecurityRouter />} />
            <Route path="*" element={<Navigate to="/error" />} />
        </Routes>
    )
}

export default PublicRouter