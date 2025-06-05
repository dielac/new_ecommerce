

import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";

// 1. Mock the CSS import so Jest doesn’t try to parse “.product-card { … }”
jest.mock("./ProductCard.css", () => ({}));

// 2. Mock the exact path where Rating is imported from.
//    ProductCard.tsx does: import { Rating } from "@smastrom/react-rating/dist/index";
jest.mock("@smastrom/react-rating/dist/index", () => ({
  Rating: () => <div data-testid="fake-rating" />,
}));

// 3. Stub getBBox on SVGElement by casting to “any” so TS doesn’t complain.
//    JSDOM does not implement getBBox(), and the real <Rating> calls it on mount.
;(SVGElement.prototype as any).getBBox = () => ({
  x: 0,
  y: 0,
  width: 0,
  height: 0,
});

// 4. Pull in our CartProvider, ProductCard, and CartPage
import { CartProvider } from "../context/CartContext";
import ProductCard from "./ProductCard";
import CartPage from "../pages/CartPage";
import type { Product } from "../types/types";

test("adding a product shows up in the cart list", () => {
  // Create a fake product to use in the test
  const fakeProduct: Product = {
    id: 123,
    title: "Integration Test Shoe",
    price: 75,
    category: "footwear",
    description: "Just a test sneaker",
    image: "https://example.com/test-shoe.jpg",
    rating: { rate: 4.5, count: 10 },
  };

  // 5. Render ProductCard and CartPage inside the same CartProvider so they share state
  render(
    <CartProvider>
      {/* Render the card with an “Add to Cart” button */}
      <ProductCard product={fakeProduct} />

      {/* Render the CartPage, which initially should show “empty” */}
      <CartPage />
    </CartProvider>
  );

  // At first, CartPage should display “Your cart is currently empty.”
  expect(screen.getByText(/Your cart is currently empty/i)).toBeInTheDocument();

  // Find the “Add to Cart” button (ProductCard’s button) and click it
  const addButton = screen.getByRole("button", { name: /Add to Cart/i });
  fireEvent.click(addButton);

  // After clicking, the “empty” message should be gone:
  expect(screen.queryByText(/Your cart is currently empty/i)).not.toBeInTheDocument();

  // Now the CartPage should list “Integration Test Shoe”
  expect(screen.getByText(/Integration Test Shoe/i)).toBeInTheDocument();

  // Optionally also assert that the price appears
  expect(screen.getByText(/\$75/i)).toBeInTheDocument();
});
