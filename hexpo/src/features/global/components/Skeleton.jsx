import React from "react";

const Skeleton = ({ children }) => {
    return (
        <div className="loader">
            <div style={{visibility: "hidden"}}>
                {children}
            </div>
        </div>
    );
}

export default Skeleton;