import React from "react";

// Components
import ProductCard from "./components/ProductCard";

// Hooks
import { useEnterprise } from "../../hooks/EnterpriseProvider";

// Style
import './Products.css';
import { NavLink } from "react-router-dom";
import Button from "../global/components/button/Button";

const Products = () => {

    const { enterpriseList } = useEnterprise()

    const products = enterpriseList.flatMap(enterprise => enterprise.products);

    return(
        <div>
            <div>
                <div className="flex flex-column">
                    <text className="font-large font-semibold">Productos</text>
                    <text>Administra tus productos, crea y modifica productos para tu empresa.</text>
                </div>
                <div className="flex flex-row">
                    <NavLink to="/productos/registrar" className="button">
                        <Button text="Nuevo Producto" />
                    </NavLink>
                </div>
            </div>
            <div>
                <div className="products-grid-container">
                    {
                    products &&
                    products.map((product, index) => (
                        <ProductCard key={index} product={product} />
                    ))
                    }
                </div>
            </div>
        </div>
        
    )
}

export default Products;