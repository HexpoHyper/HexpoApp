import React from "react";

// Styles
import "./Plans.css";

// Components
import PlanCard from "./PlanCard/PlanCard";

// Data
import plans from "./plans.json";

// hooks
import { useAuth } from "../../hooks/AuthProvider";

const Plans = () => {
  // Const 30 days in milliseconds
  const thirtyDaysInMs = 30 * 24 * 60 * 60 * 1000;

  const { profile } = useAuth();

  // Function to format date
  const formatDate = (date) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(date).toLocaleDateString(undefined, options);
  };

  // Calculate the next payment date
  const lastPaymentDate = new Date(profile.last_payment);
  const nextPaymentDate = new Date(lastPaymentDate.getTime() + thirtyDaysInMs);

  return (
    <div>
      <div className="flex flex-column">
        <text className="font-large font-semibold">Plan y facturación</text>
        <text>Conoce nuestros planes y funcionalidades premium</text>
      </div>
      <div className="current-plan-container flex flex-row">
        <div className="flex flex-column gap-1">
          <div>
            <text className="font-bold font-dark">Estado del plan</text>
            <text className={`font-light plan-status ${profile.status ? "active" : "inactive"}`}>
              {profile.status ? "Activo" : "Inactivo"}
            </text>
          </div>
          <text>Nuestros planes te permiten acceder a un mayor número de oportunidades de negocio</text>
        </div>
        <div>
          <text className="font-bold font-large font-dark">
            {"$" + plans[profile.tier].price + " al mes"}
          </text>
          <div>
            <text className="font-indigo">{"Siguiente pago: "}</text>
            {profile.last_payment && <text className="font-semibold font-indigo">{formatDate(nextPaymentDate)}</text>}
          </div>
        </div>
      </div>
      
      <div className="plan-grid-container">
        <div className="plan-grid">
          {plans.map((plan) => (
            plan.id != 1 && <PlanCard key={plan.id} plan={plan} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Plans;
