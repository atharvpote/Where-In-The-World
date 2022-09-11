import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <StrictMode>
    <h1>Where in the world?</h1>
  </StrictMode>
);
