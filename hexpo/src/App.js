import './features/global/styles/global.css';

// Libs
import { RouterProvider } from 'react-router-dom';

// Components
import Header from './features/global/components/header/header.jsx';
import Navigator from './features/global/components/navigator/navigator.jsx';
import AppNavigation from './features/global/utils/navigation/appNavigation.jsx';

function App() {

  return (
    <div className="app">
      <Header/>
      <div className='flex flex-row' style={{height:"100%"}}>
          <Navigator/>
        <div className='app-container'>
          <AppNavigation/>
        </div>
      </div>
    </div>
  );
}

export default App;
