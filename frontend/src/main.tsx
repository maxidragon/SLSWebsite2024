import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "@cubing/icons";
import "@/lib/i18n.ts";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
