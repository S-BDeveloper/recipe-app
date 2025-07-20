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

import { useState, useEffect } from "react";

interface PerformanceMonitorProps {
  darkMode: boolean;
}

const PerformanceMonitor = ({ darkMode }: PerformanceMonitorProps) => {
  const [metrics, setMetrics] = useState({
    loadTime: 0,
    firstContentfulPaint: 0,
    largestContentfulPaint: 0,
    cumulativeLayoutShift: 0,
    firstInputDelay: 0,
  });

  useEffect(() => {
    // Performance monitoring logic
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.entryType === "largest-contentful-paint") {
          setMetrics((prev) => ({
            ...prev,
            largestContentfulPaint: entry.startTime,
          }));
        }
      }
    });

    observer.observe({ entryTypes: ["largest-contentful-paint"] });

    // Log performance in development
    if (import.meta.env.DEV) {
      console.log("Performance Monitor Active");
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      className={`fixed bottom-4 right-4 p-2 rounded-lg text-xs ${
        darkMode
          ? "bg-gray-800 text-gray-200"
          : "bg-white text-gray-800 shadow-lg"
      }`}
      style={{ zIndex: 1000 }}
    >
      <div>LCP: {metrics.largestContentfulPaint.toFixed(0)}ms</div>
    </div>
  );
};

export default PerformanceMonitor;

