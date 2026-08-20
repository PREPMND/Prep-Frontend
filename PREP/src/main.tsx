import React from "react";
import ReactDOM from "react-dom/client";

import App from "./app/App";
import { Providers } from "./app/provider";
import { setupApiInterceptors } from "./services/api";
import "../styles/global.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css'; 
setupApiInterceptors();

ReactDOM.createRoot(
  document.getElementById("root")!
).render(
  <React.StrictMode>
    <Providers>
      <App />
    </Providers>
  </React.StrictMode>
);