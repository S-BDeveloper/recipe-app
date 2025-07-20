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

import React, { useEffect } from "react";
import { useDarkMode } from "../contexts/DarkModeContext";

/**
 * @file Watermark.jsx
 * @description Displays a subtle watermark and a console message for copyright.
 * The watermark is subtle to avoid distracting the user.
 * It is intended to be a non-intrusive reminder of the product's ownership.
 * The console message provides more detailed copyright information.
 * This component is used in the main layout of the application.
 * It is not intended to be used in any other context.
 * The component is not configurable and does not accept any props.
 * It is a simple, self-contained component.
 * It is not connected to any external data sources.
 * It does not dispatch any actions or events.
 * It does not have any internal state.
 * @requires react
 * @exports Watermark
 * @exports ConsoleWatermark
 */

// Subtle watermark component
const Watermark = () => {
  const darkModeContext = useDarkMode();
  const darkMode = darkModeContext?.darkMode || false;
  const watermarkStyle: React.CSSProperties = {
    position: "fixed",
    bottom: "1rem",
    right: "1rem",
    backgroundColor: darkMode ? "var(--card)" : "var(--card)",
    padding: "0.5rem 1rem",
    borderRadius: "0.5rem",
    zIndex: 9999,
    pointerEvents: "none" as React.CSSProperties["pointerEvents"],
    fontSize: "0.9rem",
    color: darkMode ? "var(--card-foreground)" : "var(--card-foreground)",
  };
  const year = new Date().getFullYear();

  return <div style={watermarkStyle}>&copy; {year} CULINARIA</div>;
};

// Console watermark
export const ConsoleWatermark = () => {
  const darkModeContext = useDarkMode();
  const darkMode = darkModeContext?.darkMode || false;

  const consoleCopyrightStyle = [
    `color: ${
      darkMode ? "#f59e0b" : "#c2410c"
    }; font-weight: bold; font-size: 14px;`,
    `color: ${
      darkMode ? "#059669" : "#059669"
    }; font-weight: bold; font-size: 12px;`,
    `color: ${darkMode ? "#059669" : "#059669"}; font-size: 11px;`,
    `color: ${darkMode ? "#059669" : "#059669"}; font-size: 10px;`,
  ];

  useEffect(() => {
    if (typeof window !== "undefined" && import.meta.env.PROD) {
      const year = new Date().getFullYear();
      console.log(
        "%c🔒 PROPRIETARY SOFTWARE - CONFIDENTIAL\n" +
          `%c© ${year} Sabina Begum. All rights reserved.\n` +
          "%cEducational use only - Commercial use prohibited.\n" +
          "%cFor licensing inquiries: begumsabina81193@gmail.com",
        consoleCopyrightStyle[0],
        consoleCopyrightStyle[1],
        consoleCopyrightStyle[2],
        consoleCopyrightStyle[3],
      );
    }
  }, [darkMode, consoleCopyrightStyle]);

  return null;
};

export default Watermark;

