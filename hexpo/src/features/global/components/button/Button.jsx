import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import './Button.css';

const Button = ({ text, onClick, type, disabled, className, backgroundColor, icon, link }) => {
    const [loading, setLoading] = useState(false);

    const handleClick = async () => {
        if (onClick) {
            setLoading(true);
            try {
                await onClick(); // Await the onClick function if it's a promise
            } finally {
                setLoading(false);
            }
        }
    };

    return (
        <div className="button-container">
            {link ? (
                <NavLink className="default-button" to={link}>
                    {!loading && text}
                    {!loading && icon ? <img src={icon} alt="icon" className="icon"/> : null}
                    {loading && <img src="https://uploads-ssl.webflow.com/65384f64fc0a1608e6828a1c/66bcd2199f0b0a2aa15047fa_loading-icon.gif"/>}
                </NavLink>
            ) : (
                <button
                    className={className ? className : "default-button"}
                    onClick={handleClick} // Directly pass handleClick
                    type={type ? type : "button"}
                    disabled={disabled ? disabled : false}
                    style={{ backgroundColor: backgroundColor ? backgroundColor : "" }}
                >
                    {!loading && text}
                    {!loading && icon ? <img src={icon} alt="icon" className="icon"/> : null}
                    {loading && <img src="https://uploads-ssl.webflow.com/65384f64fc0a1608e6828a1c/66bcd2199f0b0a2aa15047fa_loading-icon.gif"/>}
                </button>
            )}
        </div>
    );
};

export default Button;
