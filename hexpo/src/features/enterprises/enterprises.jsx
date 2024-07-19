import React from "react";

// Components
import EnterpriseCard from "./components/EnterpriseCard";
import BranchCard from "./components/BranchCard";

// Styles
import './Enterprises.css';
import { NavLink } from "react-router-dom";

const testEnterprise = {
    id: 1,
    status: "Activa",
    name: "Mi empresa",
    description: "Empresa de prueba",
    logo: "https://picsum.photos/200",
    phone: "123456789",
    email: "test@test.com",
    state: "Nuevo León",
    city: "Monterrey"
}

const testEnterprises = [
    testEnterprise,
    testEnterprise,
    testEnterprise,
    testEnterprise,
    testEnterprise,
    testEnterprise,
    testEnterprise,
    testEnterprise
]

const testBranch = {
    id: 1,
    name: "Sucursal 1",
    phone: "123456789",
    email: ""
}

const testBranches = [
    testBranch,
    testBranch,
    testBranch,
    testBranch,
    testBranch,
    testBranch,
    testBranch,
    testBranch
]

function Enterprises(){
    return(
        <div>
            <h2>Empresa</h2>
            <p>Gestiona tu empresa y sucursales. Modifica el perfil, información de contacto y productos relacionados.</p>
            <div className="enterprise-card-grid">
                <EnterpriseCard/>
                {
                    testEnterprises.map((enterprise) => {
                        return <EnterpriseCard key={enterprise.id} enterprise={enterprise}/>
                    })
                }
            </div>
            <h2>Sucursales</h2>
            <div className="flex flex-row flex-space-between">
                <p>Administra las sucursales de tu empresa. Modifica la información de contacto y productos relacionados.</p>
                <NavLink to="/enterprises/branches/new" className="flex flex-row">
                        <img src="https://picsum.photos/200" alt="Agregar sucursal" className="icon"/>
                        <h4>Agregar sucursal</h4>
                </NavLink>
            </div>
            <div className="enterprise-branch-card-grid">
                {
                    testBranches.map((branch) => {
                        return <BranchCard key={branch.id} branch={branch}/>
                    })
                }
            </div>
        </div>
    )
}

export default Enterprises;