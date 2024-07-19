import React, { useState } from "react";
import { Link, NavLink, useParams } from "react-router-dom";

// Styles
import "./CRM.css";

// Components
import Button from "../../global/components/button/Button";
import Dropdown from "../../global/components/dropdown/Dropdown";
import TextInput from "../../global/components/textInput/TextInput";


const testLead = {
    id: 1,
    company: "Company Name",
    name: "Lead Name",
    email: "test@test.com",
    phone: "555 555 5555",
    score: 100,
    message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam",
    source: "acero",
    interactions: {
        contactAttempts: 1,
        response: true,
        contactMedium: "email"
    },
    creationDate: "01/01/2021"
}

const testLeads = [
    testLead,
    testLead,
    testLead,
    testLead,
    testLead,
    testLead,
    testLead,
    testLead,
]

const contactWays = [
    {
        value: "",
        label: "Selecciona un medio"
    },
    {
        value: "email",
        label: "Correo"
    },
    {
        value: "phone",
        label: "Teléfono"
    },
    {
        value: "whatsapp",
        label: "Whatsapp"
    }
]

const CRM = () => {

    const { id } = useParams();

    const lead = testLead;
    const leadsList = testLeads;
    const index = 0;
    const [contactMedium, setContactMedium] = useState(lead.interactions.contactMedium);

    return (
        <div>
            <div className="flex flex-row leads-counter">
                <text className="font-semibold font-large">Prospectos</text>
                <div>
                    <text className="font-bold">{testLeads.length}</text>
                </div>
            </div>

            <div className="crm-header-grid">
                <div className="crm-header-left">
                    <Button icon=""/>
                    <text className="margin-1 font-semibold font-medium">{lead.name}</text>
                    <text className="margin-1 font-medium">añadido desde formulario en </text>
                    <text className="margin-1 font-semibold font-medium">{lead.source}</text>
                    <text className="margin-1 font-medium">el </text>
                    <text className="margin-1 font-semibold font-medium"> {lead.creationDate}</text>
                </div>
                <div className="crm-header-right flex-center">
                    <Button />
                    <text className="font-semibold font-medium">{index + " de " + leadsList.length}</text>
                    <Button />
                </div>
            </div>
            <div className="crm-container">
                <div className="crm-section">
                    <text className="font-bold">
                        Información
                    </text>

                    <text className="crm-section-label">
                        Correo
                    </text>
                    <text className="crm-section-value">
                        {lead.email}
                    </text>


                    <text className="crm-section-label">
                        Celular
                    </text>
                    <text className="crm-section-value">
                        {lead.phone}
                    </text>

                    <text className="crm-section-label">
                        Empresa
                    </text>
                    <text className="crm-section-value">
                        {lead.company}
                    </text>

                    <text className="crm-section-label">
                        Requerimiento
                    </text>
                    <text className="crm-section-value">
                        {lead.message}
                    </text>
                </div>

                <div className="crm-section">
                    <text className="font-bold">
                        Acciones
                    </text>

                    <Link to={""} target="_blank">
                        <Button text="Llamada" />
                    </Link>
                    <Link to={""} target="_blank">
                        <Button text="Enviar Correo" />
                    </Link>
                    <Link to={""} target="_blank">
                        <Button text="Enviar Whatsapp" />
                    </Link>

                    <text className="font-disabled font-medium">
                        Al hacer click se archivará el contacto.
                    </text>
                    <div className="flex flex-row flex-center">
                        <Button text="Ganado" backgroundColor="#3F00FF"/>
                        <Button text="Perdido"/>
                    </div>
                </div>
                <div className="crm-section">
                    <text className="font-bold">
                        Retroalimentación
                    </text>

                    <text className="crm-section-label">
                        Respuesta
                    </text>
                    <div className="flex align-left">
                        <input type="checkbox" id="response" name="response" value="response"/>
                        <label for="response">Contestó</label>
                    </div>

                    <text className="crm-section-label">
                        Intentos de Contacto
                    </text>
                    <div className="flex flex-row flex-center">         
                        <Button className="counter-button" icon="https://uploads-ssl.webflow.com/65384f64fc0a1608e6828a1c/669a4d3a1369544e5cc98be7_down-chevron-icon.svg" backgroundColor={"white"}/>
                        <text className="contact-attempts-counter">{lead.interactions.contactAttempts}</text>
                        <Button className="counter-button" icon="https://uploads-ssl.webflow.com/65384f64fc0a1608e6828a1c/669a4d3a0afe3df01e965808_up-chevron-icon.svg" backgroundColor={"white"}/>
                    </div>

                    <text className="font-semibold">
                        Medio de Contacto
                    </text>       
                    <Dropdown options={contactWays} setSelected={(value) => setContactMedium(value)}/>
                </div>
                <div className="crm-section">
                    <form id="quote">
                        <text className="font-bold">
                            Enviar Cotización
                        </text>

                        <text className="crm-section-label">
                            Asunto
                        </text>
                        <TextInput id="subject" placeholder={"Cotización" + lead.source}/>
                        <text className="crm-section-label">
                            Mensaje
                        </text>
                        <TextInput type="area" id="message" placeholder="Mensaje"/>
                        <div className="flex flex-center flex-column gap-1">
                            <input type="file" id="attachment" name="attachment" className="none"/>
                            <label for="attachment" className="default-button">
                                <div className="flex flex-row gap-1">
                                    <text className="font-light">Adjuntar Archivo</text>
                                    <img src="https://uploads-ssl.webflow.com/65384f64fc0a1608e6828a1c/669a55387efc329590b72b96_upload-file.svg" className="icon"/>
                                </div>
                            </label>
                        </div>
                        <Button text="Enviar"/>
                    </form>

                </div>
            </div>
        </div>
    );
}

export default CRM;