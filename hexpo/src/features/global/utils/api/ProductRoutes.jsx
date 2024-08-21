import api from "./Routing";

export async function postImage(data) {
    return fetch(api.prod.base + "/user/product/image", {
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