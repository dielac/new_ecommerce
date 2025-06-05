
import axios from "axios";

export const fetchProducts = async () => {
  return await axios.get("https://fakestoreapi.com/products");
};

export const fetchCategories = async () => {
  return await axios.get("https://fakestoreapi.com/products/categories");
};
