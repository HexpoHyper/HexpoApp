import {React, useState} from "react";

// Hooks
import { useEnterprise } from '../../../hooks/EnterpriseProvider';
import { useParams } from "react-router-dom";

// Utils
import { postImage, putEnterprise } from "../../global/utils/api/EnterpriseRoutes";

// Data
import mexicoData from "../../global/utils/data/mexicoData";

// Components
import Button from "../../global/components/button/Button";
import Modal from "../../global/components/modal/Modal";
import DialogueOptions from "../../global/components/modal/DialogueOptions";

// Libs
import { HexColorPicker } from "react-colorful";

// Styles
import './EnterpriseProfile.css';
import TextInput from "../../global/components/textInput/TextInput";
import Dropdown from "../../global/components/dropdown/Dropdown";
import { useAuth } from "../../../hooks/AuthProvider";
import EnterpriseProfileCard from "./EnterpriseProfileCard";

const EnterpriseProfile = () => {

    const { enterpriseList, loading, error, setEnterpriseList } = useEnterprise();
    const [imageLoading, setImageLoading] = useState(false);
    const [uploadError, setUploadError] = useState(null);
    const [modalTrigger, setModalTrigger] = useState(false);
    const [dialogueOptionsTrigger, setDialogueOptionsTrigger] = useState(false);

    const { user } = useAuth();
    const index = useParams().id;

    const [enterprise, setEnterprise] = useState(enterpriseList[index]);

    const [formData, setFormData] = useState({
        enterpriseID: enterprise.id,
        enterpriseLogo: enterprise.logo_url,
        enterpriseName: enterprise.name,
        enterpriseScope: enterprise.scope,
        enterpriseDescription: enterprise.description,
        enterpriseState: enterprise.state,
        enterpriseCity: enterprise.city,
        enterpriseLogoBase64: "",
        enterpriseCategory: enterprise.category,
        enterpriseAddress: enterprise.contact.address,
        enterpriseEmail: enterprise.contact.email,
        enterprisePhonenumber: enterprise.contact.phonenumber,
        enterpriseWhatsapp: enterprise.contact.whatsapp,
        enterpriseColor: enterprise.brand_color
    });

    const [originalData, setOriginalData] = useState({
        enterpriseID: enterprise.id,
        enterpriseLogo: enterprise.logo_url,
        enterpriseName: enterprise.name,
        enterpriseScope: enterprise.scope,
        enterpriseDescription: enterprise.description,
        enterpriseState: enterprise.state,
        enterpriseCity: enterprise.city,
        enterpriseLogoBase64: "",
        enterpriseCategory: enterprise.category,
        enterpriseAddress: enterprise.contact.address,
        enterpriseEmail: enterprise.contact.email,
        enterprisePhonenumber: enterprise.contact.phonenumber,
        enterpriseWhatsapp: enterprise.contact.whatsapp,
        enterpriseColor: enterprise.brand_color
    });

    const checkChanges = () => {
        return Object.keys(formData).some(key => formData[key] !== originalData[key]);
    };

    if(loading) return <div>Loading...</div>;

    const handleEnterpriseLogoChange = async (event) => {
        const file = event.target.files[0];
        if (!file) return;
    
        setImageLoading(true);
    
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
    
                const imageResponse = await postImage(imageData);
                const imageUrl = imageResponse.data.url;
    
                setFormData(prevState => ({
                    ...prevState,
                    enterpriseLogo: imageUrl,
                }));
            };
            reader.readAsDataURL(file);
        } catch (error) {
            alert("Error uploading image:", error.message);
            setUploadError({ message: "Failed to upload image. Please try again." });
        } finally {
            setImageLoading(false);
        }
    };

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

    const handleDialogueOptions = (option) => {
        if(option === "Aceptar") {
            handleUpdate(formData);
        } 
        setDialogueOptionsTrigger(false);
    };

    const handleUpdate = (formData) => {
        if(checkChanges()) {            
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
                products: formData.enterpriseProducts,
                brand_color: formData.enterpriseColor,
                branches: formData.enterpriseBranches,
                contact: {
                    address: formData.enterpriseAddress,
                    email: formData.enterpriseEmail,
                    phone: formData.enterprisePhonenumber,
                    whatsapp: formData.enterpriseWhatsapp
                }
            };
            putEnterprise(enterpriseData).then((response) => {
                setEnterpriseList(enterpriseList =>
                    enterpriseList.map(enterprise =>
                        enterprise.id === enterpriseData.id ? enterpriseData : enterprise
                    )
                );
                setOriginalData(response.data);
                alert("Cambios guardados exitosamente");
            }).catch((error) => {
                alert("Error al guardar los cambios");
                console.error(error);
            });
        } else {
            alert("No se han realizado cambios");
        }
    }

    return (
        <>
            <div className="flex flex-column gap-1">
                <text className="font-bold font-large font-dark">{enterprise?.name}</text>
                <div className="flex flex-column">
                    <text className="font-dark">Gestiona tu empresa y sucursales. Modifica el perfil, información de contacto y productos relacionados.</text>
                    <text className="font-diminute font-disabled">id: {enterprise?.id}</text>
                </div>
            </div>

            <div className="enterprise-profile-grid">

                <div className="section enterprise-form-container">
                    <form className="flex flex-column gap-1">
                        <div>              
                            <text className="font-semibold font-dark">Información general</text>
                            <TextInput name="enterpriseName" placeholder="Nombre" value={formData.enterpriseName} onChange={handleInputChange}/>
                        </div>

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
                        <TextInput label="Descripción" value={formData.enterpriseDescription} onChange={handleInputChange}/>
                        <Dropdown
                            options={mexicoData.states_MX}
                            selected={formData.enterpriseState}
                            setSelected={(value) => handleDropdownChange("enterpriseState", value)}
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
                        <div className="flex flex-row">
                    <Button text="Color de la empresa" onClick={() => setModalTrigger(true)}/>
                    <div className="enterprise-color-preview" style={{backgroundColor: formData.enterpriseColor}}/>
                </div>
                    <Modal show={modalTrigger} onClose={() => setModalTrigger(false)} onSubmit={() => setModalTrigger(false)}>
                        <div className="enterprise-form-section hidden">
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
                        </div>                
                    </Modal>
                    </form>

                </div>

                <div className="section enterprise-preview-container">
                    <div className="flex flex-column">
                        <text className="font-dark font-semibold">Vista previa</text>
                        <text>Se genera una ficha de negocio que se mostrara en las categorias relacionadas a tu empresa y productos.</text>
                    </div>
                    <div className="flex flex-center">
                        <EnterpriseProfileCard enterprise={enterprise}/>
                    </div>
                <text>*Los productos se pueden editar desde la sección de productos, recomendamos agregar minimo 3 productos o servicios.</text>
                    <text className="font-dark font-semibold font-medium">Información de contacto</text>
                    <div>
                        <form className="flex flex-column gap-1">
                            <TextInput name="enterpriseAddress" placeholder="Dirección" value={formData.enterpriseAddress} onChange={handleInputChange}/>
                            <TextInput name="enterpriseWhatsapp" placeholder="Whatsapp" value={formData.enterpriseWhatsapp} onChange={handleInputChange}/>
                            <TextInput name="enterprisePhonenumber" placeholder="Teléfono" value={formData.enterprisePhonenumber} onChange={handleInputChange}/>
                            <TextInput name="enterpriseEmail" placeholder="Correo Electrónico" value={formData.enterpriseEmail} onChange={handleInputChange}/>
                            <Button text="Guardar cambios" onClick={() => setDialogueOptionsTrigger(!dialogueOptionsTrigger)}/>
                        </form>

                        <DialogueOptions 
                        title={"Guardar cambios"}
                        text={"¿Estás seguro de guardar los cambios realizados?"}
                        show={dialogueOptionsTrigger}
                        options={["Aceptar", "Cancelar"]}
                        handleOptionClick={(option) => handleDialogueOptions(option)}
                        />
                    </div>
                </div>

                

            </div>
        </>
    );
}

export default EnterpriseProfile;