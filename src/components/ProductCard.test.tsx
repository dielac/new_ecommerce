/// <reference types="@testing-library/jest-dom" />
import { render, screen } from "@testing-library/react";
import ProductCard from "./ProductCard";
import type { Product } from "../types/types";

test("renders product title and price", () => {
  const fakeProduct: Product = {
    id: 1,
    title: "Test Shoe",
    price: 50,
    category: "footwear",
    description: "A comfy sneaker",
    image: "https://example.com/shoe.jpg",
    rating: { rate: 4.2, count: 10 }
  };

  render(<ProductCard product={fakeProduct} />);
  expect(screen.getByText(/Test Shoe/i)).toBeInTheDocument();
  expect(screen.getByText(/\$50/i)).toBeInTheDocument();
});
