import React from "react";

// Libs
import { NavLink } from "react-router-dom";

// Styles
import "./ProductCard.css";

// Components
import Button from "../../global/components/button/Button";

const ProductCard = ({ product }) => {
    return (
        <div className="product-card-container">
            <img src=""/>
            <div className="flex flex-row flex-space-between">
                <div className="flex flex-row">
                    <text className="font-disabled">id: {product.id}</text>
                </div>
                <text>{product.status}</text>
            </div>
            <text className="margin-0">{product.name}</text>
            <p>{product.description}</p>
            <img src={product.image} alt={product.name} className="product-card-image"/>
            {product.brand && <div className="background-label"><text>Marca: {product.brand}</text></div>}
            {product.model && <div className="background-label"><text>Modelo: {product.model}</text></div>}
            <NavLink to={`/productos/${product.id}`}>
                <Button text="Ver detalles" />
            </NavLink>
        </div>
    );
};

export default ProductCard;