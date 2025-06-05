import React, { useEffect } from "react";
import { useProductContext } from "../context/ProductContext";
import ProductCard from "../components/ProductCard";
import { fetchProducts, fetchCategories } from "../api/api";
import { useQuery } from "@tanstack/react-query";
import "./Home.css";

const Home: React.FC = () => {
  const { products, dispatch, selectedCategory } = useProductContext();

  // --- Fetch all products from the API ---
  const {
    data: productsData,
    isLoading: productsLoading,
    isError: productsError,
  } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  // Whenever the productsData arrives, populate context state
  useEffect(() => {
    if (productsData?.data) {
      dispatch({
        type: "SET_PRODUCTS",
        payload: productsData.data,
      });
    }
  }, [productsData, dispatch]);

  // --- Fetch all categories from the API ---
  const {
    data: categoriesData,
    isLoading: categoriesLoading,
    isError: categoriesError,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });

  // Helper to filter products based on the selectedCategory
  const getFilteredProducts = () => {
    if (selectedCategory) {
      return products.filter((p) => p.category === selectedCategory);
    }
    return products;
  };

  const filteredProducts = getFilteredProducts();

  // Show a loading or error state if needed
  if (productsLoading || categoriesLoading) {
    return <div className="home-loading">Loading...</div>;
  }
  if (productsError || categoriesError) {
    return <div className="home-error">Something went wrong. Please try again.</div>;
  }

  return (
    <div className="home-container">
      {/* ——— Category Dropdown ——— */}
      <label htmlFor="category-select" className="home-label">
        Filter by Category:
      </label>
      <select
        id="category-select"
        className="home-select"
        onChange={(e) =>
          dispatch({
            type: "SET_SELECTED_CATEGORY",
            payload: e.target.value,
          })
        }
        value={selectedCategory}
      >
        <option value="">All Categories</option>
        {categoriesData?.data.map((category: string) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>

      {/* ——— Clear Filter Button ——— */}
      {selectedCategory && (
        <button
          className="home-clear-button"
          onClick={() =>
            dispatch({ type: "SET_SELECTED_CATEGORY", payload: "" })
          }
        >
          Clear Filter
        </button>
      )}

      {/* ——— Product Grid ——— */}
      <div className="product-grid">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <p className="home-no-results">No products found.</p>
        )}
      </div>
    </div>
  );
};

export default Home;
