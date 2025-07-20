/**
 * Copyright (c) 2024 Sabina Begum. All rights reserved.
 *
 * PROPRIETARY SOFTWARE - CONFIDENTIAL
 *
 * This file contains proprietary and confidential information.
 * Unauthorized copying, distribution, or use is strictly prohibited.
 *
 * For licensing inquiries: begumsabina81193@gmail.com
 *
 * Educational use only - Commercial use prohibited.
 */

import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";

import App from "./App";
import { SecurityProvider } from "./components/SecurityWrapper";
import { ModalProvider } from "./contexts/ModalContext";
import { DarkModeProvider } from "./contexts/DarkModeContext";
import Watermark, { ConsoleWatermark } from "./components/Watermark";

import "./index.css";

const container = document.getElementById("root");

if (!container) {
  throw new Error("Failed to find the root element");
}

const root = createRoot(container);

root.render(
  <React.StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <SecurityProvider>
          <DarkModeProvider>
            <ModalProvider>
              <App />
              <Watermark />
              <ConsoleWatermark />
            </ModalProvider>
          </DarkModeProvider>
        </SecurityProvider>
      </BrowserRouter>
    </HelmetProvider>
  </React.StrictMode>,
);

// Service worker registration (if available)
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/sw.js")
      .then((registration) => {
        console.log("SW registered: ", registration);
      })
      .catch((registrationError) => {
        console.log("SW registration failed: ", registrationError);
      });
  });
}
