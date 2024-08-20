import React from "react";
import TextInput from "../../global/components/textInput/TextInput";
import Dropdown from "../../global/components/dropdown/Dropdown";

import mexicoData from "../../global/utils/data/mexicoData";

const EnterpriseProfileCard = ({enterprise}) => {
    return(
        <>
            <div className="profile-card flex flex-column gap-1">
                <div className="flex flex-row flex-space-between">
                    <div>
                        <img src={enterprise.logo_url} className="icon" />
                        <img src="https://uploads-ssl.webflow.com/65384f64fc0a1608e6828a1c/66c04ae55c1ae24e046acecf_check-icon.svg" className="icon"/>
                    </div>
                    <text>{enterprise.status}</text>
                    <div className="customer-label">
                        <img src="https://uploads-ssl.webflow.com/65384f64fc0a1608e6828a1c/66c04c0cdcbe1e8d044b6c1a_triangle-up.svg" className="icon-mini"/>
                        <text>{enterprise.leads}</text>
                    </div>
                </div>
                <div className="flex flex-column">
                    <text className="font-dark font-large">{enterprise.name}</text>
                    <text className="font-disabled font-small">{enterprise.description}</text>
                </div>
                <div className="flex flex-row flex-space-between">
                    <text className="background-label font-dark">Producto 1</text>
                    <text className="background-label font-dark">Producto 2</text>
                    <text className="background-label font-dark">Producto 3</text>
                </div>

                <div className="flex flex-row gap-1">
                    <div className="flex flex-row font-small gap-1">
                        <img src="https://uploads-ssl.webflow.com/65384f64fc0a1608e6828a1c/65d3ed354905a14d4c061eec_Vector.svg" className="icon"/>
                        <text className="font-dark font-semibold">Ubicación:</text>
                        <text className="font-indigo">{enterprise.contact.address}</text>
                    </div>
                    <div className="flex flex-row font-small gap-1">
                        <img src="https://uploads-ssl.webflow.com/65384f64fc0a1608e6828a1c/65d3ed514905a14d4c0629fa_Capa_1.png" className="icon"/>
                        <text className="font-dark font-semibold">Cobertura:</text>
                        <text className="font-indigo">{enterprise.scope}</text>
                    </div>
                </div>

            </div>
        </>
    )
}

export default EnterpriseProfileCard;