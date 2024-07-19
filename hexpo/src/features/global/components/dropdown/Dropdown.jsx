import React from "react";

// Styles
import './Dropdown.css';

const Dropdown = ({options, selected, setSelected}) => {
    return (
        <div className="dropdown-container">
            <select
                value={selected}
                onChange={(e) => setSelected(e.target.value)}
            >
                {options.map((option, index) => (
                    <option key={index} value={option.value}>{option.label}</option>
                ))}
            </select>
        </div>
    );
}

export default Dropdown;

