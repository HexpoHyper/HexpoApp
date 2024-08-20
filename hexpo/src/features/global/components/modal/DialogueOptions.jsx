import React from "react";

// Components
import Button from "../button/Button";

// Styles
import './Modal.css';

const DialogueOptions = ({ options, handleOptionClick, show, text, title }) => {
    if (!show) return null;

    return (
        <div className="modal-wrapper">
            <div className="modal">
                {title && <h2>{title}</h2>}
                <p>{text}</p>
                {options?.map((option, index) => (
                    <Button 
                        key={index} 
                        text={option} 
                        onClick={() => {
                            console.log("Button clicked:", option); // Should log "Aceptar" or "Cancelar"
                            handleOptionClick(option); // Pass the option to the handler
                        }}
                    />
                ))}
            </div>
        </div>
    );
}


export default DialogueOptions;