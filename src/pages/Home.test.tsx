// src/pages/Home.test.tsx

import React from "react";
import { render, screen } from "@testing-library/react";
import Home from "./Home";

//
// Home.test.tsx
// Ensures the Home page shows its heading and a description paragraph.
// Again, we use RTL’s render() and screen.getBy… methods.
//

test("Home renders heading and description", () => {
  // Render the <Home /> component
  render(<Home />);

  // Grab the <h1> element (role="heading", level 1) and check its content
  const headingElement = screen.getByRole("heading", { level: 1 });
  expect(headingElement).toHaveTextContent("Home Page");

  // Now find the paragraph text that says “This is the home page…”
  const paragraphElement = screen.getByText(
    /This is the home page for our e-commerce app\./i
  );
  expect(paragraphElement).toBeInTheDocument();
});
