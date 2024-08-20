import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useAuth } from './AuthProvider';

const EnterpriseContext = createContext();

const retry = async (fn, retries = 3, delay = 1000) => {
    try {
        return await fn();
    } catch (error) {
        if (retries <= 0) throw error;
        await new Promise(res => setTimeout(res, delay));
        return retry(fn, retries - 1, delay);
    }
};

const EnterpriseProvider = ({ children }) => {
    const [enterpriseList, setEnterpriseList] = useState(() => JSON.parse(localStorage.getItem('enterpriseList')));
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [uniqueCategories, setUniqueCategories] = useState(() => JSON.parse(localStorage.getItem('uniqueCategories')));
    const { user } = useAuth();

    const fetchData = useCallback(async () => {
        try {
            await retry(async () => {
                if (!user || !user.id) {
                    throw new Error('User ID not found');
                }

                const response = await fetch(`https://hexpo-back.vercel.app/api/v1/user/enterprise?uid=${user.id}`, {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' }
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const responseData = await response.json();
                if (responseData && responseData.data) {
                    const enterprises = responseData.data;
                    setEnterpriseList(enterprises);
                    localStorage.setItem('enterpriseList', JSON.stringify(enterprises));
                    const categories = enterprises.flatMap(enterprise => enterprise.category || []);
                    setUniqueCategories([...new Set(categories)]);
                    localStorage.setItem('uniqueCategories', JSON.stringify([...new Set(categories)]));
                } else {
                    setEnterpriseList([]);
                    localStorage.setItem('enterpriseList', JSON.stringify([]));
                    setUniqueCategories([]);
                }
            }, 3, 1000); 
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    }, [user]);

    useEffect(() => {
        const interval = setInterval(() => {
            if (user && user.id) {
                clearInterval(interval);
                fetchData();
            }
        }, 1000); 

        return () => clearInterval(interval);
    }, [user, fetchData]);



    return (
        <EnterpriseContext.Provider value={{ 
            enterpriseList, 
            loading, 
            error, 
            setEnterpriseList,
            uniqueCategories
        }}>
            {children}
        </EnterpriseContext.Provider>
    );
};

export const useEnterprise = () => useContext(EnterpriseContext);

export default EnterpriseProvider;
