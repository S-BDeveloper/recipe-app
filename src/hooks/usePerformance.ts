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

import { useEffect, useState, useCallback } from "react";

interface PerformanceMetrics {
  loadTime: number;
  firstContentfulPaint: number;
  largestContentfulPaint: number;
  cumulativeLayoutShift: number;
  firstInputDelay: number;
}

export function usePerformance() {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    loadTime: 0,
    firstContentfulPaint: 0,
    largestContentfulPaint: 0,
    cumulativeLayoutShift: 0,
    firstInputDelay: 0,
  });

  // Use _setMetrics for internal performance tracking
  const _setMetrics = useCallback(
    (
      newMetrics:
        | PerformanceMetrics
        | ((prev: PerformanceMetrics) => PerformanceMetrics),
    ) => {
      // Track performance metrics internally
      const timestamp = new Date().toISOString();
      const currentMetrics =
        typeof newMetrics === "function" ? newMetrics(metrics) : newMetrics;
      const performanceLog = {
        timestamp,
        metrics: currentMetrics,
        url: window.location.href,
        userAgent: navigator.userAgent,
      };

      // Log to console in development
      if (import.meta.env.DEV) {
        console.log("Performance metrics:", performanceLog);
      }

      // In production, this would send to a performance monitoring service
      // Example: sendToPerformanceService(performanceLog);

      // Update the main metrics state
      setMetrics(newMetrics);
    },
    [setMetrics, metrics],
  );

  useEffect(() => {
    // Use _setMetrics to track initial load performance
    const trackInitialLoad = () => {
      const loadTime = performance.now();
      _setMetrics((prev) => ({ ...prev, loadTime }));
    };

    if (document.readyState === "complete") {
      trackInitialLoad();
    } else {
      window.addEventListener("load", trackInitialLoad);
      return () => window.removeEventListener("load", trackInitialLoad);
    }
  }, [_setMetrics]);

  return { metrics, setMetrics: _setMetrics };
}
