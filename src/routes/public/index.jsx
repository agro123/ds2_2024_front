import { Routes, Route } from 'react-router-dom'
import SecurityRouter from './security'

const PublicRouter = () => {

    return (
        <Routes>
            <Route path='/*' element={<SecurityRouter />} />
            {/* <Route path='/error' element={<ErrorView />} />
            <Route path="*" element={<Navigate to="/error" />} /> */}
        </Routes>
    )
}

export default PublicRouter