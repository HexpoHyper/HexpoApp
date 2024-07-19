import React  from "react";

// Styles
import './Button.css';

const Button = ({text, onClick, type, disabled, className, backgroundColor, icon}) => {
    return (
        <div className="button-container">
            <button 
            className={className ? className : "default-button"} 
            onclick={() => onClick}
            type={type ? type : "button"}
            disabled={disabled ? disabled : false}
            style={{backgroundColor: backgroundColor ? backgroundColor : ""}}
            >
                {text}
                {icon ? <img src={icon} alt="icon" /> : null}
            </button>
        </div>
    );
}

export default Button;