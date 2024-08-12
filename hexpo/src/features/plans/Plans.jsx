import React from "react";

// Styles
import "./Plans.css";

// Components
import PlanCard from "./PlanCard/PlanCard";

// Data
import plans from "./plans.json";


const Plans = () => {
  return (
    <div>
        <div className="flex flex-column">
            <text className="font-large font-semibold">Plan y facturación</text>
            <text>Conoce nuestros planes y funcionalidades premium</text>
        </div>
        <text>{}</text>
        
        <div className="plan-grid-container">
          <div className="plan-grid">
            {
              plans.map((plan) => (
                <PlanCard plan={plan} />
              ))
            }
          </div>
        </div>
        
    </div>
  );
};

export default Plans;