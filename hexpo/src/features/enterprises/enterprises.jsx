import React, { useEffect } from 'react';
import EnterpriseGrid from './components/EnterpriseGrid';
import BranchGrid from './components/BranchGrid';

import { useEnterprise } from '../../hooks/EnterpriseProvider';
import { useNavigate } from 'react-router-dom';

import './Enterprises.css';

const Enterprises = () => {
    const { enterpriseList, loading, error } = useEnterprise();

    if (loading) return <div>Loading...</div>;
    if (error) return <div className="font-error font-bold font-medium">{error.message}</div>;

    return (
        <div className="flex flex-column">
            <text className="font-semibold font-large">Empresa</text>
            <text>Gestiona tu empresa y sucursales. Modifica el perfil, información de contacto y productos relacionados.</text>
            {enterpriseList && (
                <div>
                    <EnterpriseGrid enterprises={enterpriseList} />
                    {/* <BranchGrid branches={enterpriseList.branches} /> */}
                </div>
            )}
        </div>
    );
}

export default Enterprises;
