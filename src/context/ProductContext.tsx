

import React, {createContext,useContext, useReducer, ReactNode, Dispatch } from "react";

import { Product } from "../types/types";
  
  // --- ACTION TYPES ---
  type ProductAction =
    | { type: "SET_PRODUCTS"; payload: Product[] }
    | { type: "SET_SELECTED_CATEGORY"; payload: string };
  
  // --- STATE STRUCTURE ---
  interface ProductState {
    products: Product[];
    selectedCategory: string;
  }
  
  // --- INITIAL STATE ---
  const initialState: ProductState = {
    products: [],
    selectedCategory: "",
  };
  
  // --- REDUCER FUNCTION ---
  const productReducer = (
    state: ProductState,
    action: ProductAction
  ): ProductState => {
    switch (action.type) {
      case "SET_PRODUCTS":
        return { ...state, products: action.payload };
      case "SET_SELECTED_CATEGORY":
        return { ...state, selectedCategory: action.payload };
      default:
        return state;
    }
  };
  
  // --- CONTEXT TYPE ---
  interface ProductContextType {
    products: Product[];
    selectedCategory: string;
    dispatch: Dispatch<ProductAction>;
  }
  
  // --- CREATE CONTEXT ---
  const ProductContext = createContext<ProductContextType | null>(null);
  
  // --- PROVIDER COMPONENT ---
  interface ProductProviderProps {
    children: ReactNode;
  }
  
  const ProductProvider: React.FC<ProductProviderProps> = ({ children }) => {
    const [state, dispatch] = useReducer(productReducer, initialState);
  
    return (
      <ProductContext.Provider value={{ ...state, dispatch }}>
        {children}
      </ProductContext.Provider>
    );
  };
  

  const useProductContext = (): ProductContextType => {
    const context = useContext(ProductContext);
    if (!context) {
      throw new Error("useProductContext must be used within a ProductProvider");
    }
    return context;
  };
  

  export { ProductProvider, useProductContext };
  