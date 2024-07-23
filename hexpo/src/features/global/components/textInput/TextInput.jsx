import React from "react";

// Components

// Styles
import './TextInput.css';

const TextInput = ({label, type, placeholder, value, onChange, className, maxLength, regex, name}) => {    

    return(
       
        <div className="text-input-container">
            <label>{label}</label>
            {
                type === "area" ? 
                <textarea name={name ? name : ""} placeholder={placeholder} value={value} onChange={onChange} className={className ? className : "default-text-area"} maxLength={maxLength} /> 
                : 
                <input name={name ? name : ""} type={type} placeholder={placeholder} value={value} onChange={onChange} className={className ? className : "default-text-input"}/>
            }
        </div>
    )
}

export default TextInput;