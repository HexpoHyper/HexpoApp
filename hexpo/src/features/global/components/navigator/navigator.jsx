import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, NavLink, useLocation as location } from 'react-router-dom';
import {ReactSVG} from 'react-svg';
import links from '../../utils/navigation/links.json';
import { navigatorIconsMap } from '../../assets/icons/index.js';
import './navigator.css';

const Navigator = () => {

    const [activeLink, setActiveLink] = useState('');

    return (
        <div className="navigator-container">
            <div className="flex flex-column">
                {links.routes.map((link, index) => {
                    return (
                        <NavLink 
                            key={link.name} 
                            to={link.path} 
                            className={({ isActive }) => isActive ? 'navigator-link-active' : 'navigator-link'}
                            onClick={() => setActiveLink(link.path)}
                        >
                        <div key={index} className='flex flex-row' >
                            <ReactSVG className="navigator-icon" src={navigatorIconsMap[ activeLink === link.path ? link.media['icon-active'] : link.media['icon']]}/> 
                            <text>{link.name}</text>
                        </div>
                        <ReactSVG className='navigator-icon' src={navigatorIconsMap[ activeLink === link.path ? 'arrow-light' : 'arrow']} />
                        </NavLink>
                    );
                })}
            </div>
        </div>
    );
};

export default Navigator;
