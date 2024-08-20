import React from 'react';

// Components
import LeadCard from './LeadCard';

const LeadsList = ({leads}) => {   

    return (
        <div className="leads-list-container">
            {leads?.map((lead, index) => (
                <LeadCard index={index} key={index} lead={lead} />
            ))}
        </div>
    )
}

export default LeadsList;