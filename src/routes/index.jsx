import { Route, Routes, Navigate } from "react-router-dom"
import PublicRouter from "./public"
import AdminRouter from "./admin"
import ErrorView from "./error"

export const MainRouter = () => {
    return (
        <Routes>
            <Route path='/admin/*' element={<AdminRouter />} />
            <Route path='/*' element={<PublicRouter />} />
            <Route path="/error" element={<ErrorView />} />
            <Route path="*" element={<Navigate to="/error" />} />
        </Routes>
    )
}

export default MainRouter
