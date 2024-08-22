import api from '../../global/utils/api/Routing';

async function newInteraction(lead, interaction) {
    try {

        if (!lead.interactions) lead.interactions = [];
        lead.interactions.push(interaction);

        const response = await fetch(api.prod.base + `/user/lead/${lead.id}/interaction`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(lead),
        });

        if (!response.ok) {
            throw new Error(`Error Status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error:', error);
        throw error; 
    }
}

async function putInteraction(lead, interaction, user) {
    try {

            lead.interactions = lead.interactions.map(interact => interact.manager === user ? interaction : interact);
            const response = await fetch(api.prod.base + `/user/lead/${lead.id}/interaction`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(lead),
        });

        if (!response.ok) {
            throw new Error(`Error Status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error:', error);
        throw error; 
    }
}

export {newInteraction, putInteraction};
