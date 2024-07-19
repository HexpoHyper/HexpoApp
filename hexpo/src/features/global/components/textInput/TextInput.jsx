import React from "react";

// Components

// Styles
import './TextInput.css';

const TextInput = ({label, type, placeholder, value, onChange, className, maxLength, regex}) => {

    

    return(
        <div className="text-input-container">
            <label>{label}</label>
            <input type={type} placeholder={placeholder} value={value} onChange={onChange} className={className ? className : "default-text-input"}/>
        </div>
    )
}

export default TextInput;