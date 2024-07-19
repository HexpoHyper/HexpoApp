import React from "react";

// Components
import ProductCard from "./components/ProductCard";

// Style
import './Products.css';

const testProduct = {
    id: 182050281412,
    name: 'Test Product',
    status: 'Active',
    description: "Donec eget tempus nulla. Duis eu elit vitae augue eleifend interdum eu a urna. Sed sagittis sem in magna pretium, quis euismod ipsum aliquam. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos lectus.",
    price: 100,
    image: 'https://via.placeholder.com/150',
    brand: 'Test Brand',
    model: 'Test Model'
}

const testProducts = [
    testProduct,
    testProduct,
    testProduct,
    testProduct,
    testProduct
]

const Products = () => {
    return(
        <div>
            <div>
                <h2>Productos</h2>
                <p>Administra tus productos, crea y modifica productos para tu empresa.</p>
            </div>
            <div>
                <div className="products-grid-container">
                    {testProducts.map((product, index) => (
                        <ProductCard key={index} product={product} />
                    ))}
                </div>
            </div>
        </div>
        
    )
}

export default Products;