import { createBrowserRouter, createRoutesFromElements, Route, Navigate } from 'react-router-dom';
import Dashboard from '../../../dashboard/dashboard.jsx';
import Enterprises from '../../../enterprises/enterprises.jsx';
import EnterpriseProfile from '../../../enterprises/EnterpriseProfile/EnterpriseProfile.jsx';
import Products from '../../../products/Products.jsx';
import NewEnterprise from '../../../enterprises/NewEnteprise/NewEnterprise.jsx';
import Leads from '../../../leads/Leads.jsx';
import CRM from '../../../leads/crm/CRM.jsx';
import Planes from '../../../plans/Plans.jsx';
import Login from '../../../login/Login.jsx';
import RootLayout from '../../../../layouts/RootLayout.js';
import SignUp from '../../../signUp/SignUp.jsx';
import NewProduct from '../../../products/newProduct/NewProduct.jsx';

const AppRouter = (user) => {
    return createBrowserRouter(
        createRoutesFromElements(
            <>
                <Route path='*' element={user ? <Navigate to="/empresas" replace/> : <Navigate to="/login" replace />} />
                <Route path='/login' element={<Login />} />
                <Route path='/registro' element={<SignUp />} />

                <Route element={user ? <RootLayout /> : <Navigate to="/login" replace />}>
                    <Route path='/dashboard' element={<Dashboard />} />
                    <Route path='/empresas' element={<Enterprises />} />
                    <Route path='/productos' element={<Products />} />
                    <Route path='/productos/registrar' element={<NewProduct />} />
                    <Route path='/productos/:id' element={<Products />} />
                    <Route path='/empresas/registrar' element={<NewEnterprise />} />
                    <Route path='/empresas/:id' element={<EnterpriseProfile />} />
                    <Route path='/prospectos/:id' element={<CRM />} />
                    <Route path='/prospectos' element={<Leads />} />
                    <Route path='/planes' element={<Planes />} />
                </Route>
            </>
        )
    );
};

export default AppRouter;
