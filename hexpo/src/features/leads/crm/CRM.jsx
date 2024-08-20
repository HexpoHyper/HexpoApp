import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

// Styles
import "./CRM.css";

// Components
import Button from "../../global/components/button/Button";
import Dropdown from "../../global/components/dropdown/Dropdown";
import TextInput from "../../global/components/textInput/TextInput";

// Hooks
import useLeads from "../../../hooks/useLeads";
import { useAuth } from "../../../hooks/AuthProvider";

// Functions
import { newInteraction, putInteraction } from "../utils/Interactions";

const contactWays = [
    { value: "", label: "Selecciona un medio" },
    { value: "requirement_email", label: "Correo" },
    { value: "phonenumber", label: "Teléfono" },
    { value: "whatsapp", label: "Whatsapp" }
];

const CRM = () => {
    const { id } = useParams();
    const { leads, loading } = useLeads();
    const { user } = useAuth();

    const navigate = useNavigate();

    const index = Number(id);
    const lead = leads ? leads[index] : null;

    const [interaction, setInteraction] = useState(
        lead?.interactions.find(interact => interact.manager === user.id) || {}
    );
    const [contactMedium, setContactMedium] = useState(interaction.contactMedium || '');
    const [response, setResponse] = useState(interaction.response || false);

    const handleTravel = (theta) => {
        const newIndex = index + theta;
        if (newIndex >= 0 && newIndex < (leads ? leads.length : 0)) {
            return "/prospectos/" + newIndex;
        }
        return "#";
    };

    const [formData, setFormData] = useState({
        senderName: user.name,
        senderEmail: "soporte@hexpo.mx",
        toName: lead ? lead.name : "",
        toEmail: lead ? lead.requirement_email : "",
        attachments: [],
        subject: "Cotización",
        message: ""
    });

    const updateInteraction = (field, value) => {
        const updatedInteraction = {
            ...interaction,
            [field]: value
        };

        setInteraction(updatedInteraction);
        putInteraction(lead, updatedInteraction, user.id);
    };

    const handleStatus = (status) => {
        updateInteraction('status', status);
        navigate("/prospectos");
    };

    const handleContactAttempts = (theta) => {
        if (interaction.contactAttempts + theta < 0) return;
        updateInteraction('contactAttempts', interaction.contactAttempts + theta);
    };

    useEffect(() => {
        if (lead) {
            const hasInteraction = lead.interactions.some(interact => interact.manager === user.id);

            if (!hasInteraction) {
                const interactionTemplate = {
                    manager: user.id,
                    reminders: 0,
                    status: 'seen',
                    response: false,
                    contactAttempts: 0,
                    score: null,
                    quote: null,
                    lastInteraction: new Date().toISOString(),
                };
                newInteraction(lead, interactionTemplate);
                setInteraction(interactionTemplate);
            } else {
                const userInteraction = lead.interactions.find(interact => interact.manager === user.id);
                setInteraction(userInteraction);
                setResponse(userInteraction.response);
            }
        }
    }, [lead, user.id]);

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setFormData({
            ...formData,
            [id]: value
        });
    };

    const handleCheckboxChange = (event) => {
        const checked = event.target.checked;
        setResponse(checked);
        updateInteraction('response', checked);
    };

    const handleQuoteSend = (e) => {
        e.preventDefault();
        const quote = {
            sender: {
                name: user.name,
                email: "soporte@hexpo.mx",
            },
            to: [
                {
                    name: lead.name,
                    email: lead.requirement_email,
                }
            ],
            subject: "",
            message: "",
        };

        // Further logic to handle quote sending
    };

    if (loading) return <div>Loading...</div>;

    if (!leads || !lead) return <div className="font-error font-large font-bold">Lead not found</div>;

    return (
        <div>
            <div className="flex flex-row leads-counter">
                <text className="font-semibold font-large">Prospectos</text>
                <div>
                    <text className="font-bold">{leads.length}</text>
                </div>
            </div>

            <div className="crm-header-grid">
                <div className="crm-header-left">
                    <Button icon="https://uploads-ssl.webflow.com/65384f64fc0a1608e6828a1c/66bfaddcbffc4d16d8c7817b_return-svgrepo-com.svg" link="/prospectos" />
                    <text className="margin-1 font-semibold font-medium">{lead.name}</text>
                    <text className="margin-1 font-medium">añadido desde formulario en </text>
                    <text className="margin-1 font-semibold font-medium">{(lead?.source ? lead.source : "desconocido")}</text>
                    <text className="margin-1 font-medium">el </text>
                    <text className="margin-1 font-semibold font-medium"> {lead.creationDate}</text>
                </div>
                <div className="crm-header-right flex-center">
                    <Button icon={"https://uploads-ssl.webflow.com/65384f64fc0a1608e6828a1c/66bcd3fc2b67d72e2221d79d_arrow-left-icon.svg"} link={handleTravel(-1)} />
                    <text className="font-semibold font-medium">{+index + 1 + " de " + leads.length}</text>
                    <Button icon={"https://uploads-ssl.webflow.com/65384f64fc0a1608e6828a1c/66bcd3fc1cb0fd9bd623c6f6_arrow-right-icon.svg"} link={handleTravel(1)} />
                </div>
            </div>
            <div className="crm-container">
                <div className="crm-section">
                    <text className="font-bold">Información</text>
                    <text className="crm-section-label">Correo</text>
                    <text className="crm-section-value">{lead.requirement_email}</text>
                    <text className="crm-section-label">Celular</text>
                    <text className="crm-section-value">{lead.phonenumber}</text>
                    <text className="crm-section-label">Empresa</text>
                    <text className="crm-section-value">{lead.enterprise ? lead.enterprise : "Sin registrar"}</text>
                    <text className="crm-section-label">Requerimiento</text>
                    <text className="crm-section-value">{lead.message}</text>
                </div>

                <div className="crm-section">
                    <text className="font-bold">Acciones</text>
                    <a href={'tel:' + lead.phonenumber} target="_blank">
                        <Button text="Llamada" />
                    </a>
                    <a href="" target="_blank">
                        <Button text="Enviar Correo" />
                    </a>
                    <a href={'https://wa.me/' + lead.phonenumber + '?text=Hola'} target="_blank">
                        <Button text="Enviar Whatsapp" />
                    </a>
                    <text className="font-disabled font-small">Al hacer click se archivará el contacto.</text>
                    <div className="flex flex-row flex-center">
                        <Button text="Ganado" backgroundColor="#3F00FF" onClick={() => handleStatus("won")} />
                        <Button text="Perdido" onClick={() => handleStatus("lost")} />
                    </div>
                </div>
                <div className="crm-section">
                    <text className="font-bold">Retroalimentación</text>
                    <text className="crm-section-label">Respuesta</text>
                    <div className="flex align-left">
                        <input
                            type="checkbox"
                            id="response"
                            name="response"
                            checked={response}
                            onChange={handleCheckboxChange}
                        />
                        <label htmlFor="response">Contestó</label>
                    </div>
                    <text className="crm-section-label">Intentos de Contacto</text>
                    <div className="flex flex-row flex-center">
                        <Button className="counter-button" icon="https://uploads-ssl.webflow.com/65384f64fc0a1608e6828a1c/669a4d3a1369544e5cc98be7_down-chevron-icon.svg" backgroundColor={"white"} onClick={() => handleContactAttempts(-1)} />
                        <text className="contact-attempts-counter">{interaction.contactAttempts}</text>
                        <Button className="counter-button" icon="https://uploads-ssl.webflow.com/65384f64fc0a1608e6828a1c/669a4d3a0afe3df01e965808_up-chevron-icon.svg" backgroundColor={"white"} onClick={() => handleContactAttempts(1)} />
                    </div>
                    <text className="font-semibold">Medio de Contacto</text>
                    <Dropdown options={contactWays} setSelected={(value) => setContactMedium(value)} />
                </div>
                <div className="crm-section">
                    <form id="quote" onSubmit={() => handleQuoteSend()}>
                        <text className="font-bold">Enviar Cotización </text>
                        <text className="crm-section-label">Asunto</text>
                        <TextInput
                            id="subject"
                            placeholder={"Cotización " + (lead?.source ? lead.source : "desconocido")}
                            value={formData.subject}
                            onChange={handleInputChange} />
                        <text className="crm-section-label">Mensaje</text>
                        <TextInput
                            type="area"
                            id="message"
                            placeholder="Mensaje"
                            value={formData.message} />
                        <div className="flex flex-center flex-column gap-1">
                            <input type="file" id="attachment" name="attachment" className="hidden" />
                            <label htmlFor="attachment" className="default-button">
                                <div className="flex flex-row gap-1">
                                    <text className="font-light">Adjuntar Archivo</text>
                                    <img src="https://uploads-ssl.webflow.com/65384f64fc0a1608e6828a1c/669a55387efc329590b72b96_upload-file.svg" className="icon" />
                                </div>
                            </label>
                        </div>
                        <Button text="Enviar" type={"submit"} />
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CRM;
