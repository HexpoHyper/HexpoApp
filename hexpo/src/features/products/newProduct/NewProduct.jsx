import {React, useState} from 'react';

import TextInput from '../../global/components/textInput/TextInput';
import Button from '../../global/components/button/Button';
import './NewProduct.css';
import Dropdown from '../../global/components/dropdown/Dropdown';
import { useEnterprise } from '../../../hooks/EnterpriseProvider';

const NewProduct = () => {

    const { enterpriseList } = useEnterprise();

    const enterpriseMap = enterpriseList.map((enterprise) => {
        return {
            label: enterprise.name,
            value: enterprise.id
        }
    });

    const [formData, setFormData] = useState({
        id: crypto.randomUUID(),
        name: '',
        description: '',
        image: 'https://uploads-ssl.webflow.com/65384f64fc0a1608e6828a1c/664540526d239a8222c6db51_placeholder.png',
        brand: '',
        model: '',
        enterprise: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    }

    const handleDropdownChange = (value) => {
        setFormData({
            ...formData,
            enterprise: value
        });
    }

    return (
        <>
            <text className='font-large font-semibold'>Nuevo Producto</text>

            <div className='flex flex-row gap-1 wrapper'>
                <div className='new-product-form-container'>
                    <form className='flex flex-column gap-1'>
                        <TextInput label='Nombre del producto' value={formData.name} name="name" onChange={handleChange}/>
                        <TextInput label='Descripción' value={formData.description} name="description" onChange={handleChange}/>
                        <TextInput label='Marca' value={formData.brand} name="brand" onChange={handleChange}/>
                        <TextInput label='Modelo' value={formData.model} name="model" onChange={handleChange}/>
                        <Button text='Guardar' type="submit"/>
                        <Dropdown label='Empresa' options={enterpriseMap} selected={formData.enterprise} setSelected={handleDropdownChange}/>
                    </form>
                </div>
                <div className='new-product-preview-container'>
                    <div className='flex flex-row flex-space-between'>
                        <text className='font-disabled margin-1'>id: {formData.id}</text>
                        <text>Activo</text>
                    </div>
                    <text className='font-semibold'>{formData.name}</text>
                    <img className="product-image" src={formData.image}/>
                    <text>{formData.description}</text>
                    <div className='flex flex-column'>
                        <div className='product-label'>
                            <text className='font-disabled'>Empresa: </text>
                            <text className='font-disabled'>{formData.enterprise}</text>
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
}

export default NewProduct;