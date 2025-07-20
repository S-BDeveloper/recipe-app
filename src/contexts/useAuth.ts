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

import React, { useContext } from "react";
import { AuthContext } from "./AuthContextDef";

export const useAuth = () => {
  // Defensive check for React
  if (!React || !React.useContext) {
    console.warn("React or useContext is not available");
    return {
      currentUser: null,
      login: () => Promise.reject(new Error("Auth not available")),
      logout: () => Promise.reject(new Error("Auth not available")),
      signup: () => Promise.reject(new Error("Auth not available")),
      handleDemoLogin: () => {},
      isDemoUser: false,
    };
  }

  try {
    const context = useContext(AuthContext);
    if (!context) {
      console.warn("useAuth must be used within an AuthProvider");
      return {
        currentUser: null,
        login: () => Promise.reject(new Error("Auth not available")),
        logout: () => Promise.reject(new Error("Auth not available")),
        signup: () => Promise.reject(new Error("Auth not available")),
        handleDemoLogin: () => {},
        isDemoUser: false,
      };
    }
    return context;
  } catch (error) {
    console.warn("Error in useAuth:", error);
    return {
      currentUser: null,
      login: () => Promise.reject(new Error("Auth not available")),
      logout: () => Promise.reject(new Error("Auth not available")),
      signup: () => Promise.reject(new Error("Auth not available")),
      handleDemoLogin: () => {},
      isDemoUser: false,
    };
  }
};

