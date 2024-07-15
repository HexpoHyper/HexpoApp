import React from 'react';

// Libs
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider} from 'react-router-dom';

// Components
import Dashboard from '../../../dashboard/dashboard';
import links from './links.json';

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<Dashboard />}>
            <Route path='/' element={<Dashboard />} />
        </Route>
    )
);

const AppNavigation = () => {
    return (
        <RouterProvider router = {router}/>
    )
    
}

export default AppNavigation;
