import React from "react";

// Components

// Styles
import './Leads.css';
import LeadCard from "./components/LeadCard";

const testLead = {
    id: 1,
    company: "Company Name",
    name: "Lead Name",
    email: "test@test.com",
    phone: "555 555 5555",
    score: 100,
    message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam"
}

const testLeads = [
    testLead,
    testLead,
    testLead,
    testLead,
    testLead,
    testLead,
    testLead,
    testLead,
]

const Leads = () => {


    return(
        <>
            <div className="flex flex-row leads-counter">
                <text className="font-semibold font-large">Prospectos</text>
                <div>
                    <text className="font-bold">{testLeads.length}</text>
                </div>
            </div>
            <div className="flex flex-row leads-list-header font-semibold">
                <text>Perfil</text>
                <text>Coreo</text>
                <text>Celular</text>
                <text>Mensaje</text>
                <text>Score</text>
            </div>
            <div className="leads-list-container">
                {testLeads.map((lead, index) => (
                    <LeadCard key={index} lead={lead} />
                ))}
            </div>
        </>
    )
}

export default Leads;