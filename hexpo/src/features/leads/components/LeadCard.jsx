import React from "react";

// Libs
import { NavLink } from "react-router-dom";

// Styles
import "./LeadCard.css";

const LeadCard = ({ lead }) => {
    return (
        <NavLink className="lead-card-container" to={"/prospectos/" + lead.id}>
            <div className="flex flex-column">
                <text className="font-bold">{lead.name}</text>
                <text className="font-semibold">{lead.company}</text>
                <text className="font-disabled">id: {lead.id}</text>
            </div>
            <text>{lead.email}</text>
            <text>{lead.phone}</text>
            <text>{lead.message}</text>
            <div>
                <text className="font-semibold">{lead.score}</text>
            </div>
        </NavLink>
    );
};

export default LeadCard;