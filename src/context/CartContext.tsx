import React, { createContext, useContext, useState, ReactNode } from "react";
import type { Product } from "../types/types";

//
// CartContext & CartProvider
// Holds an array of products in the cart, and lets you add items.
//
type CartContextType = {
  cartItems: Product[];
  addToCart: (product: Product) => void;
};

// Create the context with default values (won’t actually be used—just for typing)
const CartContext = createContext<CartContextType>({
  cartItems: [],
  addToCart: () => {
    // no‐op default
  },
});

// CartProvider wraps any part of the app that needs cart state
export const CartProvider = ({ children }: { children: ReactNode }) => {
  // Use state to hold an array of products in the cart
  const [cartItems, setCartItems] = useState<Product[]>([]);

  // Function to add a product—just appends to the array
  const addToCart = (product: Product) => {
    setCartItems((prev) => [...prev, product]);
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart }}>
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to consume the cart context
export const useCart = () => {
  return useContext(CartContext);
};
