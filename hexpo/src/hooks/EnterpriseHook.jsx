import { useState } from 'react';

// Env variable
const REACT_APP_API_URL = process.env.REACT_APP_API_URL;

const EnterpriseHook = () => {
    const [enterpriseList, setEnterpriseList] = useState([]);

    const fetchList = async(id) => {
        try{
            const response = await fetch('http://localhost:8080/api/v1/enterprise', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({id: id})
            });
        }
        catch{
            console.error("Cannot fetch enterprise data")
        }
    }    
}

export default {EnterpriseHook};
