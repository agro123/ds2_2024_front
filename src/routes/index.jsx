import { Route, Routes } from "react-router-dom"
import PublicRouter from "./public"

export const MainRouter = () => {
    return (
        <Routes>
            {/* <Route path='/' element={<Navigate to="/admin" />} /> */}
            <Route path='/*' element={<PublicRouter />} />
            {/* <Route path='/admin/*' element={<AdminRouter />} /> */}
            {/* <Route path="*" element={<Navigate to="/error" />} /> */}
        </Routes>
    )
}

export default MainRouter
