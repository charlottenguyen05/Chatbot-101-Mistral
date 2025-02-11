import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import "./index.css";
import App from "./App.tsx";
import MyThemeProvider from "./providers/MyThemeProvider.tsx";
import AuthProvider from "./providers/AuthProvider.tsx";
import { Toaster } from "react-hot-toast";
import axios from "axios";

axios.defaults.baseURL = process.env.VITE_APP_BACKEND_BASEURL;  // Ti nua phai sua thanh dia chi deploy
axios.defaults.withCredentials = true;

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

export { axios };
