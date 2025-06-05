// src/pages/Profile.test.tsx

import React from "react";
import { render, screen } from "@testing-library/react";
import Profile from "./Profile";

//
// Profile.test.tsx
// Verifies that the Profile page renders its heading and paragraph.
// We use React Testing Library to “render” and then “screen.getBy…” to find text.
//

test("Profile renders heading and paragraph", () => {
  // Render the <Profile /> component inside a virtual DOM
  render(<Profile />);

  // Find the <h1> element (role="heading", level 1) and check its text
  const headingElement = screen.getByRole("heading", { level: 1 });
  expect(headingElement).toHaveTextContent("Profile Page");

  // Find the paragraph text. We use a regex to match the sentence (ignore case).
  const paragraphElement = screen.getByText(
    /Welcome to your profile\. You can customize this page with user info, settings, and more!/i
  );
  expect(paragraphElement).toBeInTheDocument();
});
