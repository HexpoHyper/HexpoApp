import React from "react";
import "./Notifications.css";

const Notifications = () => {
    const notifications = 0;
    return (
        <>
            <div className="notifications-wrapper">
                <div className="notification-button">
                    <img className="icon shake" src="https://uploads-ssl.webflow.com/65384f64fc0a1608e6828a1c/66bffa2e7358f90b7a5951c4_bell-icon.svg" alt="notification-icon"/>
                    <text className="notification-label">{notifications}</text>
                </div>
            </div>
        </>
    );
}

export default Notifications;