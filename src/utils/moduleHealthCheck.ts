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

// Type definition for health check results
interface HealthCheckSection {
  healthy: boolean;
  issues: string[];
  timestamp: string;
}

interface HealthCheckResults {
  react: HealthCheckSection;
  imports: HealthCheckSection;
  storage: HealthCheckSection;
  circular: HealthCheckSection;
  overall?: {
    healthy: boolean;
    issueCount: number;
    issues: string[];
  };
  timestamp: string;
}

// Module health check utility
export const moduleHealthCheck = {
  // Check if React is available and properly imported
  checkReactHealth() {
    const issues = [];

    try {
      // Check if React is available
      if (typeof React === "undefined") {
        issues.push("React is undefined - possible import issue");
      } else if (!React.useState) {
        issues.push("React hooks not available - possible version mismatch");
      }

      // Check if React hooks are available
      const hooks = [
        "useState",
        "useEffect",
        "useContext",
        "useCallback",
        "useMemo",
      ];
      hooks.forEach((hook) => {
        if (!React[hook as keyof typeof React]) {
          issues.push(`React.${hook} is not available`);
        }
      });
    } catch (error: unknown) {
      issues.push(
        `Error checking React health: ${
          (error as unknown as { message?: string }).message
        }`,
      );
    }

    return {
      healthy: issues.length === 0,
      issues,
      timestamp: new Date().toISOString(),
    };
  },

  // Check for common import issues
  checkImportHealth() {
    const issues = [];

    try {
      // Check if common modules are available
      const requiredModules = {
        "react-router-dom": "React Router",
        "react-helmet-async": "React Helmet",
        "lucide-react": "Lucide Icons",
      };

      Object.entries(requiredModules).forEach(
        async ([moduleName, displayName]) => {
          try {
            // Try to dynamically import the module
            await import(moduleName);
          } catch (error: unknown) {
            issues.push(
              `${displayName} (${moduleName}) not available: ${
                (error as unknown as { message?: string }).message
              }`,
            );
          }
        },
      );
    } catch (error: unknown) {
      issues.push(
        `Error checking import health: ${
          (error as unknown as { message?: string }).message
        }`,
      );
    }

    return {
      healthy: issues.length === 0,
      issues,
      timestamp: new Date().toISOString(),
    };
  },

  // Check localStorage health
  checkStorageHealth() {
    const issues = [];

    try {
      if (typeof window === "undefined") {
        issues.push("Window object not available (SSR environment)");
        return { healthy: false, issues, timestamp: new Date().toISOString() };
      }

      if (!window.localStorage) {
        issues.push("localStorage not available");
      } else {
        // Test localStorage functionality
        const testKey = "__health_check__";
        const testValue = "test";

        try {
          localStorage.setItem(testKey, testValue);
          const retrieved = localStorage.getItem(testKey);
          localStorage.removeItem(testKey);

          if (retrieved !== testValue) {
            issues.push("localStorage read/write test failed");
          }
        } catch (error: unknown) {
          issues.push(
            `localStorage test failed: ${
              (error as unknown as { message?: string }).message
            }`,
          );
        }
      }
    } catch (error: unknown) {
      issues.push(
        `Error checking storage health: ${
          (error as unknown as { message?: string }).message
        }`,
      );
    }

    return {
      healthy: issues.length === 0,
      issues,
      timestamp: new Date().toISOString(),
    };
  },

  // Check for potential circular dependencies
  checkCircularDependencies() {
    const issues = [];

    try {
      // Common circular dependency patterns
      const suspiciousPatterns = [
        "contexts/useAuth.js",
        "components/SecurityWrapper.jsx",
        "components/navbar/Navbar.jsx",
      ];

      // This is a simplified check - in a real app you'd use a tool like madge
      suspiciousPatterns.forEach((pattern) => {
        if (window.location.href.includes(pattern)) {
          issues.push(`Potential circular dependency in ${pattern}`);
        }
      });
    } catch (error: unknown) {
      issues.push(
        `Error checking circular dependencies: ${
          (error as unknown as { message?: string }).message
        }`,
      );
    }

    return {
      healthy: issues.length === 0,
      issues,
      timestamp: new Date().toISOString(),
    };
  },

  // Run all health checks
  runAllChecks() {
    const results: HealthCheckResults = {
      react: this.checkReactHealth(),
      imports: this.checkImportHealth(),
      storage: this.checkStorageHealth(),
      circular: this.checkCircularDependencies(),
      timestamp: new Date().toISOString(),
    };

    results.overall = {
      healthy:
        results.react.healthy &&
        results.imports.healthy &&
        results.storage.healthy &&
        results.circular.healthy,
      issueCount:
        results.react.issues.length +
        results.imports.issues.length +
        results.storage.issues.length +
        results.circular.issues.length,
      issues: [
        ...results.react.issues,
        ...results.imports.issues,
        ...results.storage.issues,
        ...results.circular.issues,
      ],
    };

    return results;
  },

  // Log health check results
  logHealthCheck() {
    if (import.meta.env.DEV) {
      const results = this.runAllChecks();

      console.group("🔍 Module Health Check");
      if (results.overall) {
        console.log(
          "Overall Health:",
          results.overall.healthy ? "✅ Healthy" : "❌ Issues Found",
        );
        console.log("Issue Count:", results.overall.issueCount);

        if (results.overall.issues.length > 0) {
          console.group("Issues Found:");
          results.overall.issues.forEach((issue: string, index: number) => {
            console.warn(`${index + 1}. ${issue}`);
          });
          console.groupEnd();
        }
      }
      console.log("React Health:", results.react.healthy ? "✅" : "❌");
      console.log("Import Health:", results.imports.healthy ? "✅" : "❌");
      console.log("Storage Health:", results.storage.healthy ? "✅" : "❌");
      console.log(
        "Circular Dependencies:",
        results.circular.healthy ? "✅" : "❌",
      );
      console.groupEnd();

      return results;
    }

    return null;
  },
};

// Auto-run health check in development
if (import.meta.env.DEV) {
  // Run health check after a short delay to ensure modules are loaded
  setTimeout(() => {
    moduleHealthCheck.logHealthCheck();
  }, 1000);
}

export default moduleHealthCheck;
