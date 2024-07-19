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
            <div className='flex flex-row flex-space-between'>
                <div className='flex flex-row font-small'>
                    <text className='font-disabled'>id:</text>
                    <text>{enterprise.id}</text>
                </div>
                <text className='font-semibold'>{enterprise.status}</text>
            </div>
            <div className='flex flex-row'>
                <img src={enterprise.logo} alt={enterprise.name} className="enterprise-card-logo"/>
                <text className='font-bold'>{enterprise.name}</text>
            </div>
            <div className='flex flex-row background-label'>
                <text className='font-disabled'>Estado: </text>
                <text className='font-semibold'>{enterprise.state}</text>
            </div>
            <div className='flex flex-row background-label'>
                <text className='font-disabled'>Ciudad: </text>
                <text className='font-semibold'>{enterprise.city}</text>
            </div>
            <NavLink to={`/enterprise/${enterprise.id}`}>
                <Button text="Editar Perfil" />
            </NavLink>
        </div>
    ) : (
        <NavLink to="/registrar-nueva-empresa" className="enterprise-card-container new-enterprise">
            <text >Registrar nueva empresa</text> 
            <text>Se creará una empresa que comenzará a mostrarse a compradores en Hexpo</text>       
        </NavLink>
    );    
};

export default EnterpriseCard;