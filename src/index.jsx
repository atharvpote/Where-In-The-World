import { StrictMode, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Details from "./components/details";
import Header from "./components/header";
import Home from "./components/home";

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <StrictMode>
    <App />
  </StrictMode>
);

function App() {
  useEffect(() => {
    if (window.matchMedia("(prefers-color-scheme: dark)").matches)
      document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#202d36]">
      <BrowserRouter>
        <main>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/:country" element={<Details />} />
          </Routes>
        </main>
      </BrowserRouter>
    </div>
  );
}
