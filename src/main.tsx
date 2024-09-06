import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import ExampleComponent from "./ExampleComponent";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ExampleComponent />
  </StrictMode>
);
