import api from "./Routing";

export async function postImage(data) {
    return fetch(api.local.base + "/user/enterprise/image", {
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
    return fetch(api.local.base + "/user/enterprise", {
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