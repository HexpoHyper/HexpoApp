import React, { useEffect } from "react";
import './Modal.css';
import Button from "../button/Button";

const Modal = ({ children, onSubmit, onClose, show, noButtons }) => {

    if(!show) return null;

    return (
        <div className="modal-wrapper">
            <div className="modal">
                {children}
                {!noButtons && <div className="flex flex-row">
                    <Button onClick={() => onSubmit()} text="Aceptar"/>
                    <Button onClick={() => onClose()} text="Cancelar"/>
                </div>}
            </div>
        </div>
    );
};

export default Modal;
