import { useState, useEffect } from 'react';

const useEnterpriseData = (userId, refresh) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!userId) return; 

      try {
        setLoading(true); 
        const response = await fetch(`http://localhost:8080/api/v1/user/enterprise?uid=${userId}`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' }
        });
        const responseData = await response.json();
        setData(responseData.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userId, refresh]); 

  

  return { data, loading, error };
};

export default useEnterpriseData;
