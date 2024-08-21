import { React, useState } from 'react';

import TextInput from '../../global/components/textInput/TextInput';
import Button from '../../global/components/button/Button';
import './NewProduct.css';
import Dropdown from '../../global/components/dropdown/Dropdown';
import { useEnterprise } from '../../../hooks/EnterpriseProvider';
import { useAuth } from '../../../hooks/AuthProvider';
import { postImage } from '../../global/utils/api/ProductRoutes';
import api from '../../global/utils/api/Routing';

const NewProduct = () => {
    const { enterpriseList, setEnterpriseList } = useEnterprise();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const { user } = useAuth();

    const enterpriseMap = enterpriseList.map((enterprise) => ({
        label: enterprise.name,
        value: enterprise.id
    }));

    const [formData, setFormData] = useState({
        id: crypto.randomUUID(),
        name: '',
        description: '',
        image: 'https://uploads-ssl.webflow.com/65384f64fc0a1608e6828a1c/664540526d239a8222c6db51_placeholder.png',
        brand: '',
        model: '',
        enterprise: enterpriseMap[0].value
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleDropdownChange = (value) => {
        setFormData({
            ...formData,
            enterprise: value
        });
    };

    const handleImageChange = async (event) => {
        const file = event.target.files[0];
        if (!file) return;

        setLoading(true);

        try {
            const reader = new FileReader();

            reader.onloadend = async () => {
                const base64 = reader.result.split(',')[1];
                const imageData = {
                    userID: user.id,
                    orgID: formData.enterprise,
                    prodID: formData.id,
                    image: base64
                };

                const imageResponse = await postImage(imageData);
                const imageUrl = imageResponse.data.url;

                setFormData((prevState) => ({
                    ...prevState,
                    image: imageUrl
                }));
            };

            reader.readAsDataURL(file);
        } catch (error) {
            console.error("Error uploading image:", error.message);
            alert("Failed to upload image. Please try again.");
            setError({ message: "Failed to upload image. Please try again." });
        } finally {
            setLoading(false);
        }
    };

    const getEnterpriseLabel = (id) => {
        const enterprise = enterpriseMap.find((e) => e.value === id);
        return enterprise ? enterprise.label : 'Unknown';
    };

    const checkData = () => {
        return formData.name !== "" && formData.description !== "" && formData.enterprise !== "";
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!checkData()) return;

        // Create the new product object
        const newProduct = { ...formData };

        // Find the index of the enterprise to update
        const enterpriseIndex = enterpriseList.findIndex((enterprise) => enterprise.id === formData.enterprise);

        if (enterpriseIndex === -1) {
            alert("Enterprise not found");
            return;
        }

        // Update the products list for the selected enterprise
        const updatedEnterpriseList = [...enterpriseList];
        updatedEnterpriseList[enterpriseIndex] = {
            ...updatedEnterpriseList[enterpriseIndex],
            products: [...updatedEnterpriseList[enterpriseIndex].products, newProduct]
        };

        try {
            // Call to API to save product (adjust URL as necessary)
            const response = await fetch(api.local.base + "/user/enterprise", {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedEnterpriseList[enterpriseIndex])
            });

            if (response.ok) {
                // Update state with the new enterprise list
                setEnterpriseList(updatedEnterpriseList);
                alert("Product saved successfully");
            } else {
                alert("Failed to save product");
            }
        } catch (error) {
            console.error("Error saving product:", error.message);
            alert("Failed to save product. Please try again.");
        }
    };

    return (
        <>
            <text className='font-large font-semibold'>Nuevo Producto</text>

            <div className='flex flex-row gap-1 wrapper'>
                <div className='new-product-form-container'>
                    <form className='flex flex-column gap-1' onSubmit={handleSubmit}>
                        <TextInput label='Nombre del producto' value={formData.name} name="name" onChange={handleChange} />
                        <TextInput label='Descripción' value={formData.description} name="description" onChange={handleChange} />
                        <TextInput label='Marca' value={formData.brand} name="brand" onChange={handleChange} />
                        <TextInput label='Modelo' value={formData.model} name="model" onChange={handleChange} />
                        <Dropdown label='Empresa' options={enterpriseMap} selected={formData.enterprise} setSelected={handleDropdownChange} />
                        <div>
                            <input
                                disabled={formData.name === "" ? true : false}
                                type="file"
                                accept="image/*"
                                id="product-logo-input"
                                className="hidden"
                                onChange={handleImageChange}
                            />
                            <label htmlFor="product-logo-input" className={`default-button ${formData.name === "" ? "blocked" : ""}`}>
                                Subir Imagen
                            </label>
                        </div>
                        <Button text='Guardar' type="submit" />
                    </form>
                </div>
                <div className='new-product-preview-container'>
                    <div className='flex flex-row flex-space-between'>
                        <text className='font-disabled margin-1'>id: {formData.id}</text>
                        <text>Activo</text>
                    </div>
                    <text className='font-semibold'>{formData.name}</text>
                    <img className="product-image" src={formData.image} alt="Product" />
                    <text>{formData.description}</text>
                    <div className='flex flex-column'>
                        <div className='product-label'>
                            <text className='font-disabled'>Empresa: </text>
                            <text className='font-disabled'>{getEnterpriseLabel(formData.enterprise)}</text>
                        </div>
                        {formData.brand && <div className='product-label'>
                            <text className='font-disabled'>Marca: </text>
                            <text className='font-disabled'>{formData.brand}</text>
                        </div>}
                        {formData.model && <div className='product-label'>
                            <text className='font-disabled'>Modelo: </text>
                            <text className='font-disabled'>{formData.model}</text>
                        </div>}
                    </div>
                </div>
            </div>
        </>
    );
};

export default NewProduct;
