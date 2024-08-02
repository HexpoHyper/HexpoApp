import React from "react";

// Components

// Styles
import './BranchCard.css';

const BranchCard = ({branch}) => {
    return(
        <div className="branch-card-container">
            <div className="flex flex-row flex-space-between">
                <div className="flex flex-row">
                    <text>id: </text>
                    <text>{branch.id}</text>
                </div>
                <text className="font-semibold font-indigo">{branch.status}</text>
            </div>
            <div>
                <text className="font-semibold font-medium font-indigo">{branch.name}</text>
            </div>
            <div className="background-label flex flex-row">
                <text className="font-disabled">Ciudad: </text>
                <text>{branch.city}</text>
            </div>
            <div className="background-label flex flex-row">
                <text className="font-disabled">Dirección: </text>
                <text>{branch.address}</text>
            </div>
            <div className="background-label flex flex-row">
                <text className="font-disabled">Celular: </text>
                <text>{branch.phone}</text>
            </div>
        </div>
    )
}

export default BranchCard;