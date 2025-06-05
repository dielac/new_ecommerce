import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ProductProvider } from "./context/ProductContext";
import App from "./App";

const queryClient = new QueryClient();
const container = document.getElementById("root");
if (!container) throw new Error("Could not find #root in index.html");

ReactDOM.createRoot(container).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ProductProvider>
        <App />
      </ProductProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
