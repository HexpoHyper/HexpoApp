// Libs
import {Outlet} from 'react-router-dom';

// Components
import Header from '../features/global/components/header/header.jsx';
import Navigator from '../features/global/components/navigator/navigator.jsx';
import { useAuth } from '../hooks/AuthProvider';

const RootLayout =() => {
    const uid = localStorage.getItem('user').id;
    const {data, error, loading} = useAuth();

    return(
        <>
            <Header/>
            <div className='flex flex-row' style={{height:"100%"}}>
                <Navigator/>
            <div className='app-container'>
                {loading && <p>Loading...</p>}
                {error && <p>{error}</p>}
                {!loading && !error && <Outlet/>}
            </div>
            </div>
        </>
    );
}

export default RootLayout;