import './features/global/styles/global.css';

// Libs
import {RouterProvider} from 'react-router-dom';

// Components
import {router} from './features/global/utils/navigation/appNavigation.jsx';

function App() {

  return (
    <RouterProvider router={router}/>
  );
}

export default App;
