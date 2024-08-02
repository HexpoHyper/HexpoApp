import React from "react";

// Components

// Styles
import './TextInput.css';

const TextInput = ({label, type, placeholder, value, onChange, className, maxLength, regex, name}) => {    

    const validate = (e) => {
        if(regex){
            const re = new RegExp(regex);
            if(!re.test(e.target.value)){
                e.target.setCustomValidity("Invalid field.");
            } else {
                e.target.setCustomValidity("");
            }
        }
    }

    const handleOnChange = (e) => {
        // validate(e);
        return onChange;
    }

    return(
       
        <div className="text-input-container">
            <label>{label}</label>
            {
                type === "area" ? 
                <textarea name={name ? name : ""} placeholder={placeholder} value={value} onChange={handleOnChange()} className={className ? className : "default-text-area"} maxLength={maxLength} /> 
                : 
                <input name={name ? name : ""} type={type} placeholder={placeholder} value={value} onChange={handleOnChange()} className={className ? className : "default-text-input"}/>
            }
        </div>
    )
}

export default TextInput;