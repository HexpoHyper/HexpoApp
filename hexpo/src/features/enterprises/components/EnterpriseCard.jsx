import React from 'react';

// Libs
import { Link, NavLink } from 'react-router-dom';

// Components
import Button from '../../global/components/button/Button';

// Styles
import './EnterpriseCard.css';

const EnterpriseCard = ({enterprise}) => {

    return enterprise ? (
        <div className="enterprise-card-container">
            <div>
                <div className='flex flex-row flex-space-between'>
                    <div className='flex flex-row'>
                        <h6 className='font-disabled'>id:</h6>
                        <h6>{enterprise.id}</h6>
                    </div>
                    <h6>{enterprise.status}</h6>
                </div>
                <div className='flex flex-row'>
                    <img src={enterprise.logo} alt={enterprise.name} className="enterprise-card-logo"/>
                    <h5>{enterprise.name}</h5>
                </div>
                <div className='flex flex-row enterprise-card-background-label'>
                    <h6 className='font-disabled'>Estado: </h6>
                    <h6>{enterprise.state}</h6>
                </div>
                <div className='flex flex-row enterprise-card-background-label'>
                    <h6 className='font-disabled'>Ciudad: </h6>
                    <h6>{enterprise.city}</h6>
                </div>
                <NavLink to={`/enterprise/${enterprise.id}`}>
                    <Button text="Editar Perfil" />
                </NavLink>
            </div>
        </div>
    ) : (
        <NavLink to="/registrar-nueva-empresa" className="enterprise-card-container new-enterprise">
            <h5>Registrar nueva empresa</h5>        
        </NavLink>
    );    
};

export default EnterpriseCard;