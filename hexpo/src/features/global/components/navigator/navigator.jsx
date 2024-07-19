import React from 'react';
import { BrowserRouter as Router, NavLink } from 'react-router-dom';
import {ReactSVG} from 'react-svg';
import links from '../../utils/navigation/links.json';
import { navigatorIconsMap } from '../../assets/icons/index.js';
import './navigator.css';

const Navigator = () => {
    return (
        <div className="navigator-container">
            <div className="flex flex-column">
                {links.routes.map((link, index) => {
                    return (
                        <NavLink 
                            key={link.name} 
                            to={link.path} 
                            className={({ isActive }) => isActive ? 'navigator-link-active' : 'navigator-link'}
                        >
                        <div key={index} className='flex flex-row gap-1' >
                            <ReactSVG className='navigator-icon' src={navigatorIconsMap[link.media.icon]} /> 
                            <text>{link.name}</text>
                        </div>
                        <ReactSVG className='navigator-icon' src={navigatorIconsMap['arrow']} />
                        </NavLink>
                    );
                })}
            </div>
        </div>
    );
};

export default Navigator;
