import api from "./Routing";

import { setEnterpriseList, enterpriseList } from "../../../../hooks/EnterpriseProvider";

export async function postImage(data) {
    return fetch(api.prod.base + "/user/enterprise/image", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        if(response.ok) {
            return response.json();
        }
        throw new Error("Error uploading image");
    });
}


export async function postEnterprise (data) {
    return fetch(api.prod.base + "/user/enterprise", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        if(response.ok){
            return response.json();
        }
        throw new Error("Error al crear la empresa");
    })  
}

export async function putEnterprise(data) {
    try {
        const response = await fetch(`${api.prod.base}/user/enterprise`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error("Error al actualizar la empresa");
        }

        const updatedEnterprise = await response.json();
        return updatedEnterprise;
    } catch (error) {
        console.error(error);
        throw new Error("Error al actualizar la empresa");
    }
}
