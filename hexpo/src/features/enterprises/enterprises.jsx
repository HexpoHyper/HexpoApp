import React from "react";

// Components
import EnterpriseCard from "./components/EnterpriseCard";
import BranchCard from "./components/BranchCard";

// Styles
import './Enterprises.css';
import { NavLink } from "react-router-dom";

// Hook
import { useAuth } from "../../hooks/AuthProvider";

const testBranch = {
    id: 1,
    name: "Sucursal X",
    phone: "123456789",
    address: "Calle X #123",
    city: "Monterrey",
    status: "Active"
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
    const {data, error} = useAuth(); 

    const hasData = Array.isArray(data) && data.length > 0;

    return(
        <div>
            <div className="flex flex-column">
                <text className="font-semibold font-large">Empresa</text>
                <text>Gestiona tu empresa y sucursales. Modifica el perfil, información de contacto y productos relacionados.</text>
            </div>

            {
                error && <text className="font-error font-bold font-medium">{error}</text>
            }
            {
                hasData &&
                <div>
                    <div className="enterprise-card-grid">
                        <EnterpriseCard/>
                        {
                            data.map((enterprise) => {
                                return <EnterpriseCard key={enterprise.id} enterprise={enterprise}/>
                            })
                        }
                    </div>

                    <div className="hidden">
                        <text className="font-semibold font-big font-large">Sucursales</text>
                        <div className="flex flex-row flex-space-between">
                            <text>Administra las sucursales de tu empresa. Modifica la información de contacto y productos relacionados.</text>
                            <NavLink to="/enterprises/branches/new" className="flex flex-row">
                                    <img src="https://picsum.photos/200" alt="Agregar sucursal" className="icon"/>
                                    <text>Agregar sucursal</text>
                            </NavLink>
                        </div>

                        {
                            !data.branches &&
                            <text className="font-semibold font-medium">No se encontraron sucursales</text>
                        }

                        {
                            data.branches &&
                            <div className="enterprise-branch-card-grid">
                                {
                                    data.branches.map((branch) => {
                                        return <BranchCard key={branch.id} branch={branch}/>
                                    })
                                }
                            </div>
                        }
                    </div>
                </div>
            }
            {data === "No data found" && <text className="font-semibold font-medium">No se encontraron empresas</text>}
        </div>
    )
}

export default Enterprises;