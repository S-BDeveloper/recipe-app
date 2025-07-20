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

// Refactored: All safe import functions now use dynamic import() and return Promises.
export const safeImports = {
  // Safely import React
  async getReact() {
    try {
      const mod = await import("react");
      return mod;
    } catch (error) {
      console.warn(
        "React not available:",
        (error as { message?: string }).message,
      );
      return null;
    }
  },

  // Safely import React hooks
  async getReactHooks() {
    const React = await this.getReact();
    if (!React) {
      return {
        useState: () => [null, () => {}],
        useEffect: () => {},
        useContext: () => null,
        useCallback: (fn: () => unknown) => fn,
        useMemo: (fn: () => unknown) =>
          typeof fn === "function" ? fn() : undefined,
        createContext: () => ({
          Provider: ({ children }: { children: React.ReactNode }) => children,
        }),
      };
    }
    return {
      useState: React.useState,
      useEffect: React.useEffect,
      useContext: React.useContext,
      useCallback: React.useCallback,
      useMemo: React.useMemo,
      createContext: React.createContext,
    };
  },

  // Safely import React Router
  async getReactRouter() {
    try {
      const mod = await import("react-router-dom");
      return {
        Link: mod.Link,
        useLocation: mod.useLocation,
        useNavigate: mod.useNavigate,
      };
    } catch (error) {
      console.warn(
        "React Router not available:",
        (error as { message?: string }).message,
      );
      return {
        Link: ({ to }: { to: string }) => <a href={to}>{to}</a>,
        useLocation: () => ({ pathname: window.location.pathname }),
        useNavigate: () => (to: string) => (window.location.href = to),
      };
    }
  },

  // Safely import React Helmet
  async getReactHelmet() {
    try {
      const mod = await import("react-helmet-async");
      return {
        Helmet: mod.Helmet,
        HelmetProvider: mod.HelmetProvider,
      };
    } catch (error) {
      console.warn(
        "React Helmet not available:",
        (error as { message?: string }).message,
      );
      return {
        Helmet: () => null,
        HelmetProvider: ({ children }: { children: React.ReactNode }) =>
          children,
      };
    }
  },

  // Safely import Lucide icons
  async getLucideIcons() {
    try {
      const lucide = await import("lucide-react");
      return {
        Crown: lucide.Crown || (() => <span>👑</span>),
        Search: lucide.Search || (() => <span>🔍</span>),
        Menu: lucide.Menu || (() => <span>☰</span>),
        X: lucide.X || (() => <span>✕</span>),
      };
    } catch (error) {
      console.warn(
        "Lucide icons not available:",
        (error as { message?: string }).message,
      );
      return {
        Crown: () => <span>👑</span>,
        Search: () => <span>🔍</span>,
        Menu: () => <span>☰</span>,
        X: () => <span>✕</span>,
      };
    }
  },

  // Safely import Firebase
  async getFirebase() {
    try {
      const mod = await import("firebase/app");
      return mod;
    } catch (error) {
      console.warn(
        "Firebase not available:",
        (error as { message?: string }).message,
      );
      return null;
    }
  },

  // Safely import Firebase Auth
  async getFirebaseAuth() {
    try {
      const mod = await import("firebase/auth");
      return mod;
    } catch (error) {
      console.warn(
        "Firebase Auth not available:",
        (error as { message?: string }).message,
      );
      return null;
    }
  },

  // Generic safe import function
  async safeRequire(moduleName: string, fallback: unknown = null) {
    try {
      const mod = await import(moduleName);
      return mod;
    } catch (error) {
      console.warn(
        `${moduleName} not available:`,
        (error as { message?: string }).message,
      );
      return fallback;
    }
  },

  // Check if a module is available
  async isModuleAvailable(moduleName: string) {
    try {
      await import(moduleName);
      return true;
    } catch {
      return false;
    }
  },

  // Get all available modules
  async getAvailableModules() {
    const modules = [
      "react",
      "react-dom",
      "react-router-dom",
      "react-helmet-async",
      "lucide-react",
      "firebase/app",
      "firebase/auth",
    ];
    const results: Record<string, boolean> = {};
    for (const module of modules) {
      results[module] = await this.isModuleAvailable(module);
    }
    return results;
  },
};

// Export individual safe imports for convenience
export const {
  getReact,
  getReactHooks,
  getReactRouter,
  getReactHelmet,
  getLucideIcons,
  getFirebase,
  getFirebaseAuth,
  safeRequire,
  isModuleAvailable,
  getAvailableModules,
} = safeImports;

export default safeImports;
