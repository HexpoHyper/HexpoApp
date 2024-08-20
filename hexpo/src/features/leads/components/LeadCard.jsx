import React from "react";
import { NavLink } from "react-router-dom";
import "./LeadCard.css";
import { useAuth } from "../../../hooks/AuthProvider";

const LeadCard = ({ lead, index }) => {
    const { user } = useAuth();

    // Check if lead is defined
    if (!lead) {
        return null;
    }

    // Ensure interactions is an array
    const interactions = Array.isArray(lead.interactions) ? lead.interactions : [];

    // Determine if the card should be hidden
    const shouldHideCard = interactions.some(interact =>
        interact.manager === user.id && (interact.status === "won" || interact.status === "lost")
    );

    if (shouldHideCard) {
        return null;
    }

    return (
        <NavLink className="lead-card-container gap-1" to={"/prospectos/" + index}>
            <div className="flex flex-column">
                <text className="font-bold">{lead.name}</text>
                <text className="font-semibold">{lead.enterprise}</text>
                <text className="font-disabled font-diminute">id: {lead.id}</text>
            </div>
            <text>{lead.requirement_email}</text>
            <text>{lead.phonenumber}</text>
            <text>{lead.message}</text>
            {/* <div>
                <text className="font-semibold">{lead.score}</text>
            </div> */}
        </NavLink>
    );
};

export default LeadCard;
