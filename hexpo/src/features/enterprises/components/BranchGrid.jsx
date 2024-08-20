import React from "react";

// Components
import BranchCard from "./BranchCard";

// Libs
import { NavLink } from "react-router-dom";

// Styles
import './BranchGrid.css';

const BranchGrid = ({ branches }) => {
    return (
        <div>
            <text className="font-semibold font-big font-large">Sucursales</text>
            <div className="flex flex-row flex-space-between">
                <text>Administra las sucursales de tu empresa. Modifica la información de contacto y productos relacionados.</text>
                <NavLink to="/enterprises/branches/new" className="flex flex-row">
                        <img src="https://picsum.photos/200" alt="Agregar sucursal" className="icon"/>
                        <text>Agregar sucursal</text>
                </NavLink>
            </div>
            <div className="enterprise-branch-card-grid">
            {branches ? (
                branches.map((branch) => (
                <BranchCard key={branch.id} branch={branch} />
                ))
            ) : (
                <text className="font-semibold font-medium">No se encontraron sucursales</text>
            )}
            </div>
        </div>
    );
};

export default BranchGrid;