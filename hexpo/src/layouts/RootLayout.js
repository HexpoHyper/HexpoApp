// Libs
import {Outlet} from 'react-router-dom';

// Components
import Header from '../features/global/components/header/header.jsx';
import Navigator from '../features/global/components/navigator/navigator.jsx';

const RootLayout =() => {
    return(
        <div className="app">
            <Header/>
            <div className='flex flex-row' style={{height:"100%"}}>
                <Navigator/>
            <div className='app-container'>
                <Outlet/>
            </div>
            </div>
        </div>
    );
}

export default RootLayout;