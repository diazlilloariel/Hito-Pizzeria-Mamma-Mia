import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

import App from "./App.jsx";
import ThemeProvider from "./context/ThemeProvider.jsx";
import { CartProvider } from "./context/CartProvider.jsx";
import { PizzaProvider } from "./context/PizzaProvider.jsx"; 
import UserProvider from "./context/UserProvider.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <UserProvider>
        <ThemeProvider>
          <PizzaProvider>
            <CartProvider>
              <App />
            </CartProvider>
          </PizzaProvider>
        </ThemeProvider>
      </UserProvider>
    </BrowserRouter>
  </StrictMode>
);
