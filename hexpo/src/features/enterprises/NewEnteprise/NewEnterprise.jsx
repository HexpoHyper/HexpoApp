import React, { useState } from "react";
import { HexColorPicker } from "react-colorful";
import mexicoData from "./mexicoData.json";
import categoryData from "../../global/utils/data/categories.json";
import './NewEnterprise.css';
import TextInput from "../../global/components/textInput/TextInput";
import Dropdown from "../../global/components/dropdown/Dropdown";
import { postImage, postEnterprise } from "../../global/utils/api/EnterpriseRoutes";

import { useNavigate } from "react-router-dom";

import { useAuth } from "../../../hooks/AuthProvider";


const NewEnterprise = () => {

    const navigator = useNavigate();

    const { token, user, updateEnterpriseData } = useAuth();

    const [formData, setFormData] = useState({
        enterpriseID: crypto.randomUUID(),
        enterpriseLogo: "https://uploads-ssl.webflow.com/65384f64fc0a1608e6828a1c/664540526d239a8222c6db51_placeholder.png",
        enterpriseName: "",
        enterpriseScope: "",
        enterpriseDescription: "",
        enterpriseState: "",
        enterpriseCity: "",
        enterpriseLogoBase64: "",
        enterpriseCategory: "",
        enterpriseAddress: "",
        enterpriseEmail: "",
        enterprisePhonenumber: "",
        enterpriseWhatsapp: "",
        enterpriseColor: ""
    });

    const [error, setError] = useState({ message: "" });
    const [loading, setLoading] = useState(false); 

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleDropdownChange = (name, value) => {
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleEnterpriseLogoChange = async (event) => {
        const file = event.target.files[0];
        if (!file) return;
    
        setLoading(true);
    
        try {
            const reader = new FileReader();
            reader.onloadend = async () => {
                const base64 = reader.result.split(',')[1]; 
                const imageData = {
                    userID: user.id,
                    orgID: formData.enterpriseID,
                    name: formData.enterpriseName,
                    image: base64
                };
    
                const imageResponse = await postImage(imageData, token);
                const imageUrl = imageResponse.data.url;
    
                setFormData(prevState => ({
                    ...prevState,
                    enterpriseLogo: imageUrl,
                }));
            };
            reader.readAsDataURL(file);
        } catch (error) {
            alert("Error uploading image:", error.message);
            setError({ message: "Failed to upload image. Please try again." });
        } finally {
            setLoading(false);
        }
    };
    

    const checkEnterpriseData = () => {
        const { enterpriseName, enterpriseDescription, enterpriseState, enterpriseCity, enterpriseScope } = formData;
        if (enterpriseName === "" || enterpriseDescription === "" || enterpriseState === "" || enterpriseCity === "" || enterpriseScope === "") {
            setError({ message: "Por favor llena todos los campos." });
            return false;
        }
        return true;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!checkEnterpriseData()) {
            return;
        }

        const enterpriseData = {
            id: formData.enterpriseID,
            manager_uid: user.id,
            name: formData.enterpriseName,
            category: formData.enterpriseCategory,      
            description: formData.enterpriseDescription,
            logo_url: formData.enterpriseLogo,
            scope: formData.enterpriseScope,
            city: formData.enterpriseCity,
            state: formData.enterpriseState,
            products: [],
            brand_color: "",
            branches: [],
            contact: {
                address: formData.enterpriseAddress,
                email: formData.enterpriseEmail,
                phone: formData.enterprisePhonenumber,
                whatsapp: formData.enterpriseWhatsapp
            }
        };
        setLoading(true);

        try {
            await postEnterprise(enterpriseData);
        } catch (error) {
            console.error("Error submitting data:", error);
            setError({ message: "Failed to create enterprise. Please try again." });
        } finally {
            updateEnterpriseData(enterpriseData);
            setLoading(false);
            navigator("/empresas");
        }
    };

    return (
        <div className="new-enterprise-form">
            <form onSubmit={handleSubmit}>
                <text className="font-disabled margin-1">{formData.enterpriseID}</text>
                <div className="flex flex-row flex-space-between">
                    <div className="enterprise-logo-preview-container">
                        <text className="self-left">Logo de la empresa</text>
                        <div className="enterprise-logo-preview-inner-container">
                            <img src={formData.enterpriseLogo} alt="Logo de la Empresa" className="logo big" />
                        </div>
                        <input
                            disabled={formData.enterpriseName === "" ? true : false}
                            type="file"
                            accept="image/*"
                            id="enterprise-logo-input"
                            className="enterprise-logo-input"
                            onChange={handleEnterpriseLogoChange}
                        />
                        <label htmlFor="enterprise-logo-input" className="default-button">
                            Subir Imagen
                        </label>
                    </div>
                    <div className="enterprise-dual">
                        <text>Información general</text>
                        <TextInput
                            name="enterpriseName"
                            type="text"
                            placeholder="Hexpo Enterprises"
                            value={formData.enterpriseName}
                            onChange={handleInputChange}
                        />
                        <Dropdown
                            options={mexicoData.states_MX}
                            selected={formData.enterpriseState}
                            setSelected={(value) => handleDropdownChange("enterpriseState", value)}
                        />
                        <TextInput
                            name="enterpriseDescription"
                            type="text"
                            placeholder="Descripción"
                            value={formData.enterpriseDescription}
                            onChange={handleInputChange}
                        />
                        <Dropdown
                            options={mexicoData.city_state_MX[formData.enterpriseState]}
                            selected={formData.enterpriseCity}
                            setSelected={(value) => handleDropdownChange("enterpriseCity", value)}
                            type={"array"}
                            disabled={formData.enterpriseState === "" ? true : false}
                        />
                        <Dropdown
                            options={mexicoData.scope}
                            selected={formData.enterpriseScope}
                            setSelected={(value) => handleDropdownChange("enterpriseScope", value)}
                        />
                        <Dropdown
                            options={categoryData}
                            selected={formData.enterpriseCategory}
                            setSelected={(value) => handleDropdownChange("enterpriseCategory", value)}
                        />
                    </div>
                </div>
                <div className="enterprise-form-section">
                    <text>Datos de contacto</text>
                    <TextInput
                        name="enterpriseAddress"
                        type="text"
                        placeholder="Dirección"
                        value={formData.enterpriseAddress}
                        onChange={handleInputChange}
                    />
                    <TextInput
                        name="enterpriseEmail"
                        type="text"
                        placeholder="Correo para ventas"
                        value={formData.enterpriseEmail}
                        onChange={handleInputChange}
                    />
                    <TextInput
                        name="enterprisePhonenumber"
                        type="text"
                        placeholder="Teléfono comercial"
                        value={formData.enterprisePhonenumber}
                        onChange={handleInputChange}
                    />
                    <TextInput
                        name="enterpriseWhatsapp"
                        type="text"
                        placeholder="Whatsapp comercial"
                        value={formData.enterpriseWhatsapp}
                        onChange={handleInputChange}
                    />
                </div>
                {/* <div className="enterprise-form-section hidden">
                    <text>Identidad</text>
                    <div className="flex flex-row">
                        <div className="flex flex-row" style={{ borderLeftColor: formData.enterpriseColor }}>
                            <text className="font-semibold" style={{ color: formData.enterpriseColor }}>Color de la empresa: </text>
                            <TextInput
                                name="enterpriseColor"
                                type="text"
                                value={formData.enterpriseColor}
                                onChange={handleInputChange}
                            />
                        </div>
                        <HexColorPicker color={formData.enterpriseColor} onChange={(color) => handleDropdownChange("enterpriseColor", color)} />
                    </div>
                </div> */}
                <input type="submit" value="Crear Empresa" className="default-button margin-top-3" disabled={loading} />
                <text>{error.message}</text>
            </form>
        </div>
    );
};

export default NewEnterprise;
