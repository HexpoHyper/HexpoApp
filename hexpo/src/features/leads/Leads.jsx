import React from "react";

// Components
import LeadsList from "./components/LeadsList";
import LeadCard from "./components/LeadCard";
import Skeleton from "../global/components/Skeleton";

// Styles
import './Leads.css';

// Hooks
import useLeads from "../../hooks/useLeads";
import { useAuth } from "../../hooks/AuthProvider";
import { useEnterprise } from "../../hooks/EnterpriseProvider";

const Leads = () => {

    const { user } = useAuth();
    const { enterpriseList, uniqueCategories } = useEnterprise();
    
    const { leads, loading } = useLeads(user.id, uniqueCategories);

    if (loading) {
        return (
            <div>
                {Array.from({ length: 10 }, (_, index) => (
                    <Skeleton key={index}>
                        <LeadCard />
                    </Skeleton>
                ))}
            </div>
        );
    }

    return(
        <>
            <div className="flex flex-row leads-counter">
                <text className="font-semibold font-large">Prospectos</text>
                <div>
                    {!loading && <text className="font-bold">{leads.length}</text>}
                </div>
            </div>
            <div className="flex flex-row leads-list-header font-semibold gap-1">
                <text>Perfil</text>
                <text>Correo</text>
                <text>Celular</text>
                <text>Mensaje</text>
                {/* <text>Score</text> */}
            </div>
            <LeadsList leads={leads}/>
        </>
    )
}

export default Leads;