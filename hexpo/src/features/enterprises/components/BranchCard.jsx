import React from "react";

// Components

// Styles
import './BranchCard.css';

const BranchCard = ({branch}) => {
    return(
        <div className="branch-card-container">
            <h3>{branch.name}</h3>
            <p>{branch.phone}</p>
            <p>{branch.email}</p>
        </div>
    )
}

export default BranchCard;