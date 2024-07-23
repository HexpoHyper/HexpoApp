import {React, useState} from "react";

// Components

// Data
import mexicoData from "./mexicoData.json"

// Styles
import './NewEnterprise.css';
import TextInput from "../../global/components/textInput/TextInput";
import Dropdown from "../../global/components/dropdown/Dropdown";

const NewEnterprise = () => {

    const [enterpriseLogo, setEnterpriseLogo] = useState("https://uploads-ssl.webflow.com/65384f64fc0a1608e6828a1c/664540526d239a8222c6db51_placeholder.png");
    const [enterpriseName, setEnterpriseName] = useState("");
    const [enterpriseDescription, setEnterpriseDescription] = useState("");
    const [enterpriseState, setEnterpriseState] = useState("");
    const [enterpriseCity, setEnterpriseCity] = useState("");
    const [enterpriseScope, setEnterpriseScope] = useState("");

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
                        <div className="enterprise-dual">
                            <text>Información general</text>
                            <TextInput name="name" type="text" placeholder="Hexpo Enterprises"/>
                            <Dropdown options={mexicoData.states_MX} selected={enterpriseState} setSelected={setEnterpriseState}/>
                            <TextInput name="description" type="text" placeholder="Descripción"/>
                            <Dropdown options={mexicoData.city_state_MX[enterpriseState]} selected={enterpriseCity} setSelected={setEnterpriseCity} type={"array"} disabled={enterpriseState != "" ? false : true}/>
                            <Dropdown options={mexicoData.scope} selected={enterpriseScope} setSelected={setEnterpriseScope}/>
                        </div>
                    </div>
                    <div className="enterprise-form-section">
                        <text>Datos de contacto</text>
                        <TextInput name="address" type="text" placeholder="Dirección"/>
                        <TextInput name="email" type="text" placeholder="Correo para ventas"/>
                        <TextInput name="phonenumber" type="text" placeholder="Teléfono comercial"/>
                        <TextInput name="whatsapp" type="text" placeholder="Whatsapp comercial"/>
                    </div>
                    <input type="submit" value="Crear Empresa" className="default-button margin-top-3"/>
                </form>
            </div>
        </div>
    )
}

export default NewEnterprise;