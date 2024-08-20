import React from "react";

// Components
import EnterpriseCard from "./EnterpriseCard";

// Styles
import './EnterpriseGrid.css';

const EnterpriseGrid = ({ enterprises }) => {
    return (
        <div className="enterprise-card-grid">
        <EnterpriseCard />
        {enterprises ? (
            enterprises.map((enterprise, index) => (
            <EnterpriseCard key={enterprise.id} index={index} enterprise={enterprise} />
            ))
        ) : (
            enterprises === "No data found" && <text className="font-semibold font-medium">No se encontraron empresas, registra una nueva empresa para comenzar</text>
        )}
        </div>
    );
};

export default EnterpriseGrid;