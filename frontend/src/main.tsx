import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import "./index.css";
import App from "./App.tsx";
import MyThemeProvider from "./providers/MyThemeProvider.tsx";
import AuthProvider from "./providers/AuthProvider.tsx";
import { Toaster } from "react-hot-toast";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <MyThemeProvider>
          <Toaster position="bottom-right" />
          <App />
        </MyThemeProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);

