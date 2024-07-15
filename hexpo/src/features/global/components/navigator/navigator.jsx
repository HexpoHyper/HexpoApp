import React from 'react';

// Style
import './navigator.css';

// Libs
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider} from 'react-router-dom';
import { ReactSVG } from 'react-svg'

// Components
import Dashboard from '../../../dashboard/dashboard';
import links from '../../utils/navigation/links.json';
import Box from "../../assets/icons/box-icon.svg";

const Navigator = () => {

    const getNavLinkClassName = ({ isActive }) => {
        return isActive ? 'navigator-link navigator-link-active' : 'navigator-link';
     };

    return (
        <div className="navigator-container">
            <div className="flex flex-column">
                <ReactSVG src={Box}/>
                { links.routes.map((link, index) => {
                    return (
                        <div key={index} className="navigator-link">
                            <ReactSVG alt="Patata" src={link.media.icon}/>
                            {link.name}
                        </div>
                    )})
                }
            </div>
        </div>
    )
    
}

export default Navigator;
