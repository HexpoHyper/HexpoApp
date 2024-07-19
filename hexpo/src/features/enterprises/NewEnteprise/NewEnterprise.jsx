import {React, useState} from "react";

// Components

// Styles
import './NewEnterprise.css';
import TextInput from "../../global/components/textInput/TextInput";

const NewEnterprise = () => {

    const [enterpriseLogo, setEnterpriseLogo] = useState("https://uploads-ssl.webflow.com/65384f64fc0a1608e6828a1c/664540526d239a8222c6db51_placeholder.png");

    function handleEnterpriseLogoChange(event){
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onload = (e) => {
            setEnterpriseLogo(e.target.result);
        }
        reader.readAsDataURL(file);
    }

    return(
        <div>
            <div className="new-enterprise-form">
                <form>
                    <div className="flex flex-row flex-space-between">
                        <div className="enterprise-logo-preview-container">
                            <text className="self-left">Logo de la empresa</text>

                            <div className="enterprise-logo-preivew-inner-container">
                                <img src={enterpriseLogo} alt="Logo de la Empresa" className="logo"/>
                            </div>
                            <input type="file" accept="image/*" id="enterprise-logo-input" className="enterprise-logo-input" onChange={(event) => handleEnterpriseLogoChange(event)}/>
                            <label htmlFor="enterprise-logo-input" className="default-button">
                                Subir Imagen
                            </label>
                        </div>
                        <div className="">
                            <TextInput type="text" label="Nombre de la Empresa" placeholder="Hexpo Enterprises"/>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default NewEnterprise;