import "./index.css";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { initializeIcons } from "@fluentui/react";
import { Provider } from "./context/Context.tsx";
import { BrowserRouter } from "react-router-dom";

initializeIcons();
createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Provider>
      <App />
    </Provider>
  </BrowserRouter>
);
