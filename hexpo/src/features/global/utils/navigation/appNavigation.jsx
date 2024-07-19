import React from 'react';

// Libs
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider} from 'react-router-dom';

// Components
import Dashboard from '../../../dashboard/dashboard.jsx';
import Enterprises from '../../../enterprises/enterprises.jsx';
import Products from '../../../products/Products.jsx';
import Leads from '../../../leads/Leads.jsx';
import NewEnterprise from '../../../enterprises/NewEnteprise/NewEnterprise.jsx';
import Error from '../../../error/Error.jsx';
// Layouts
import RootLayout from '../../../../layouts/RootLayout.js';

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" errorElement={<Error/>} element={<RootLayout/>}>
            <Route path='/' element={<Dashboard />} />
            <Route path='/empresas' element={<Enterprises />} />
            <Route path='/productos' element={<Products />} />
            <Route path='/prospectos' element={<Leads />} />
            <Route path='/registrar-nueva-empresa' element={<NewEnterprise />} />   
        </Route>
    )
);


export {router};