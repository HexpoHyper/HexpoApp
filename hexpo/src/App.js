import './features/global/styles/global.css';
import { React } from 'react'
import { RouterProvider } from 'react-router-dom';
import AppRouter from './features/global/utils/navigation/appNavigation.jsx';
import AuthProvider, { useAuth } from './hooks/AuthProvider.jsx';

function App() {


  return (
    <div className='app'>
      <AuthProvider>
        <InnerApp/>
      </AuthProvider>
    </div>
  );
}

function InnerApp() {
  const { data, error, token } = useAuth();

  const useLogger = true;

  return (
    <>    
    {
      useLogger &&
      <div className='logger'>
        <text>{JSON.stringify(data  )}</text>
        <text>{error}</text>
      </div>
  }
    <RouterProvider router={AppRouter(token)} />
    </>
  );
}

export default App;
