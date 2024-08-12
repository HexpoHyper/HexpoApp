import React from "react";

// Styles
import "./PlanCard.css";

// Components
import Button from "../../global/components/button/Button.jsx";

const PlanCard = ({plan}) => {
    return (
        <div>
            <div className="plan-container">
                <text className="font-semibold title">{plan.name}</text>
                <text className="font-indigo font-italic font-bold">{plan.tag}</text>
                <text className="font-medium">{plan.message}</text>
                
                <div className="flex flex-row flex-space-between">
                    <text className="price font-indigo">${plan.price}</text>
                    <div className="flex flex-column">
                        <div className="flex flex-row">
                            <text className="font-medium font-indigo">MXN</text>
                            <text className="font-medium">/ Mes</text>
                        </div>
                        <text className="font-small">Contratación anual</text>
                    </div>
                </div>

                <a href={plan.paymentLink}>
                    <Button text={"Contratar"} className={"button"}/>
                </a>

                <div className="flex flex-column">
                    {
                        plan.secondaryFeatures.map((feature, index) => (
                            <div key={index} className="flex flex-row margin-1">
                                <img className="margin-right-1" src="https://uploads-ssl.webflow.com/65384f64fc0a1608e6828a1c/6559c7081f4650d9c5a40fa8_FlechaVector.png" alt="check"/>
                                <text>{feature}</text>
                            </div>
                        ))
                    }
                    {
                        plan.primaryFeatures.map((feature, index) => (
                            <div key={index} className="flex flex-row margin-1">
                                <img className="margin-right-1" src="https://uploads-ssl.webflow.com/65384f64fc0a1608e6828a1c/6559c7081f4650d9c5a40fa8_FlechaVector.png" alt="check"/>
                                <text className="font-semibold">{feature}</text>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    );
};

export default PlanCard;