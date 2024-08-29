// Libs
import {Outlet} from 'react-router-dom';

// Components
import Header from '../features/global/components/header/header.jsx';
import Navigator from '../features/global/components/navigator/navigator.jsx';
import { useAuth } from '../hooks/AuthProvider';
import Notifications from '../features/global/components/inbox/Notifications.jsx';
import { useState } from 'react';

const RootLayout =() => {
    const uid = localStorage.getItem('user').id;
    const {data, error, loading} = useAuth();

    const [notificationsTrigger, setNotificationsTrigger] = useState(false);

    return(
        <>
            <Header/>
            <div className='flex flex-row'>
                <Navigator/>
                <div className='app-container'>
                    {loading && <p>Loading...</p>}
                    {error && <p>{error}</p>}
                    {!loading && !error && <Outlet/>}
                </div>
            </div>
            <Notifications showPanel={notificationsTrigger}/>
        </>
    );
}

export default RootLayout;