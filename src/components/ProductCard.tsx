import React from "react";
import type { Product } from "../types/types";
import { useCart } from "../context/CartContext";

// (If you have CSS) Keep your import, Jest will mock it in tests.
import "./ProductCard.css";

// If you use a rating library, keep this import; our tests will stub it.
import { Rating } from "@smastrom/react-rating"

//
// ProductCard Component
// Renders image, title, price, and an “Add to Cart” button.
// Uses CartContext to add products to cart.
//

const ProductCard = ({ product }: { product: Product }) => {
  // Grab addToCart from our CartContext
  const { addToCart } = useCart();

  // Handler for clicking the “Add to Cart” button
  const handleAddToCart = () => {
    addToCart(product);
  };

  return (
    <div className="product-card" style={{ border: "1px solid #ccc", padding: "10px" }}>
      {/* Product image */}
      <img
        src={product.image}
        alt={product.title}
        style={{ width: "100%", maxWidth: "200px", height: "auto" }}
      />

      {/* Product title */}
      <h2>{product.title}</h2>

      {/* Product price */}
      <p style={{ fontWeight: "bold" }}>${product.price}</p>

      {/* Rating (from external library) */}
      <Rating style={{ maxWidth: 100 }} value={product.rating.rate} readOnly />

      {/* “Add to Cart” Button */}
      <button
        onClick={handleAddToCart}
        style={{
          marginTop: "8px",
          padding: "8px 12px",
          backgroundColor: "#28a745",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;
