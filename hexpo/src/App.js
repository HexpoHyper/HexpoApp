import './features/global/styles/global.css';
import './features/global/styles/SkeletonLoader.css'
import { React } from 'react'
import { RouterProvider } from 'react-router-dom';
import AppRouter from './features/global/utils/navigation/appNavigation.jsx';
import AuthProvider, { useAuth } from './hooks/AuthProvider.jsx';
import EnterpriseProvider, {useEnterprise} from './hooks/EnterpriseProvider.jsx';

function App() {
  

  return (
    <div className='app'>
      <AuthProvider>
        <EnterpriseProvider>
          <InnerApp/>
        </EnterpriseProvider>
      </AuthProvider>
    </div>
  );
}

function InnerApp() {
  const { user, profile, token } = useAuth();
  const { enterpriseList, loading, error } = useEnterprise();

  const useLogger = false;

  return (
    <>    
    {
      useLogger &&
      <div className='logger flex flex-column'>
        <text>{"User: " + JSON.stringify(user?.id) }</text>
        <text>{"Profile data: " + JSON.stringify(profile)}</text>

        <text>{loading && "loading..."}</text>
        <text className='font-error font-bold'>{error && "error: " + error.message}</text>
        <text>{enterpriseList && JSON.stringify(enterpriseList)}</text>
      </div>
  }
    <RouterProvider router={AppRouter(token)} />
    </>
  );
}

export default App;
