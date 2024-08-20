import React from "react";

// Styles
import './TextInput.css';

const TextInput = ({ label, type, placeholder, value, onChange, className, maxLength, regex, name }) => {

    const validate = (e) => {
        if (regex) {
            const re = new RegExp(regex);
            if (!re.test(e.target.value)) {
                e.target.setCustomValidity("Invalid field.");
            } else {
                e.target.setCustomValidity("");
            }
        } else {
            e.target.setCustomValidity("");
        }
    }

    const handleOnChange = (e) => {
        validate(e);
        onChange(e);
    }

    return (
        <div className="text-input-container">
            {label && <label>{label}</label>}
            {
                type === "area" ?
                    <textarea
                        name={name ? name : ""}
                        placeholder={placeholder}
                        value={value}
                        onChange={handleOnChange} // Call the new handleOnChange method
                        className={className ? className : "default-text-area"}
                        maxLength={maxLength}
                    />
                    :
                    <input
                        name={name ? name : ""}
                        type={type}
                        placeholder={placeholder}
                        value={value}
                        onChange={handleOnChange} // Call the new handleOnChange method
                        className={className ? className : "default-text-input"}
                        maxLength={maxLength}
                    />
            }
        </div>
    );
}

export default TextInput;
