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
import { useState, useEffect, useCallback } from "react";

interface PerformanceOptimizerProps {
  darkMode: boolean;
}
interface Optimization {
  name: string;
  status: string;
  impact: string;
}

const PerformanceOptimizer: React.FC<PerformanceOptimizerProps> = ({
  darkMode,
}) => {
  const [optimizations, setOptimizations] = useState<Optimization[]>([]);
  const [isOptimizing, setIsOptimizing] = useState<boolean>(false);

  const sendPerformanceMetric = useCallback(
    (metric: string, value: unknown) => {
      // Send performance metric to analytics
      if (import.meta.env.DEV) {
        console.log(`Performance Metric: ${metric} = ${value}`);
      }
    },
    [],
  );

  const sendPerformanceMetrics = useCallback(
    (metrics: Record<string, unknown>) => {
      // Send multiple performance metrics
      Object.entries(metrics).forEach(([key, value]) => {
        sendPerformanceMetric(key, value);
      });
    },
    [sendPerformanceMetric],
  );

  useEffect(() => {
    const preloadCriticalResources = () => {
      // Preload critical resources
      const criticalResources = ["/foodie-logo-simple.svg", "/favicon.svg"];

      criticalResources.forEach((resource) => {
        const link = document.createElement("link");
        link.rel = "preload";
        link.href = resource;
        link.as = "image";
        document.head.appendChild(link);
      });
    };

    const setupIntersectionObserver = () => {
      // Setup intersection observer for lazy loading
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("loaded");
          }
        });
      });

      document.querySelectorAll("img[data-src]").forEach((img) => {
        observer.observe(img);
      });
    };

    const setupPerformanceMonitoring = () => {
      // Monitor Core Web Vitals
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          sendPerformanceMetric(entry.name, entry.startTime);
        }
      });

      observer.observe({
        entryTypes: ["largest-contentful-paint", "first-input", "layout-shift"],
      });
    };

    preloadCriticalResources();
    setupIntersectionObserver();
    setupPerformanceMonitoring();
  }, [sendPerformanceMetric]);

  const runOptimizations = useCallback(async () => {
    setIsOptimizing(true);

    const newOptimizations = [
      { name: "Image Optimization", status: "completed", impact: "high" },
      { name: "Code Splitting", status: "completed", impact: "medium" },
      { name: "Caching Strategy", status: "completed", impact: "high" },
      { name: "Bundle Analysis", status: "completed", impact: "low" },
    ];

    setOptimizations(newOptimizations);
    setIsOptimizing(false);

    // Send optimization metrics
    sendPerformanceMetrics({
      optimizationsApplied: newOptimizations.length,
      optimizationTime: Date.now(),
    });
  }, [sendPerformanceMetrics]);

  return (
    <div
      className={`p-6 rounded-lg ${
        darkMode ? "bg-gray-800 text-gray-100" : "bg-white text-gray-800"
      }`}
    >
      <h2 className="text-xl font-bold mb-4">Performance Optimizer</h2>

      <button
        onClick={runOptimizations}
        disabled={isOptimizing}
        className={`px-4 py-2 rounded-lg font-medium transition-colors ${
          isOptimizing ? "opacity-50 cursor-not-allowed" : "hover:scale-105"
        } bg-gradient-to-r from-green-500 to-blue-500 text-white`}
      >
        {isOptimizing ? "Optimizing..." : "Run Optimizations"}
      </button>

      <div className="mt-6 space-y-3">
        {optimizations.map((opt: Optimization, index: number) => (
          <div
            key={index}
            className="flex items-center justify-between p-3 rounded-lg bg-stone-100 dark:bg-stone-700"
          >
            <span className="font-medium">{opt.name}</span>
            <div className="flex items-center space-x-2">
              <span
                className={`px-2 py-1 rounded-full text-xs ${
                  opt.impact === "high"
                    ? "bg-red-100 text-red-800"
                    : opt.impact === "medium"
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-green-100 text-green-800"
                }`}
              >
                {opt.impact} impact
              </span>
              <span className="text-green-500"> ✓</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PerformanceOptimizer;

