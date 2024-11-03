import { Routes, Route } from 'react-router-dom'
import { Dashboardview } from './dashboard'
import { UsersList } from './users'
import { PqrsdList } from './pqrdsList'


const AdminRouter = () => {

    return (
        <Routes>
            <Route path='/dashboard/' element={<Dashboardview />} />
            <Route path='/users/' element={<UsersList />} />
            <Route path='/pqrsd/' element={<PqrsdList />} />
        </Routes>
    )
}

export default AdminRouter