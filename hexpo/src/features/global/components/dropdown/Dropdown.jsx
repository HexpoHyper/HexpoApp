import React, { useEffect } from "react";

// Styles
import './Dropdown.css';

const Dropdown = ({options, selected, setSelected, label, type, disabled, name}) => {
    
    return (
        <div className="dropdown-container">
            <label>{label}</label>
            <select
                name={name ? name : "label"}
                value={selected}
                onChange={(e) => setSelected(e.target.value)}
                className="dropdown"
                disabled={disabled}
            >
                {
                    type != "array" ?
                        options.map((option, index) => (
                            <option key={index} value={option.value}>{option.label}</option>
                        ))
                    :
                    type === "array" ?
                        options.map((option, index) => (
                            <option key={index} value={option}>{option}</option>
                    )) 
                    :
                    null
                }
            </select>
        </div>
    );
}

export default Dropdown;

