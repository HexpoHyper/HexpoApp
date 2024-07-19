import React  from "react";

// Styles
import './Button.css';

const Button = ({text, onClick, type, disabled, className}) => {
    return (
        <div className="button-container">
            <button 
            className={className ? className : "default-button"} 
            onclick={() => onClick}
            type={type ? type : "button"}
            disabled={disabled ? disabled : false}
            >
                {text}
            </button>
        </div>
    );
}

export default Button;