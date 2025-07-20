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

// Explicitly reference global types for browser APIs
type RequestInit = globalThis.RequestInit;
type IntersectionObserverCallback = globalThis.IntersectionObserverCallback;
type IntersectionObserverInit = globalThis.IntersectionObserverInit;

// Performance optimization service for CULINARIA
class PerformanceService {
  cache: Map<string, unknown>;
  imageCache: Map<string, HTMLImageElement>;
  apiCache: Map<string, unknown>;
  cacheExpiry: number;
  maxCacheSize: number;
  constructor() {
    this.cache = new Map();
    this.imageCache = new Map();
    this.apiCache = new Map();
    this.cacheExpiry = 5 * 60 * 1000; // 5 minutes
    this.maxCacheSize = 100;
  }

  // Debounce function for search optimization
  debounce<T extends unknown[]>(fn: (...args: T) => void, delay: number) {
    let timeoutId: ReturnType<typeof setTimeout>;
    return (...args: T) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        fn(...args);
      }, delay);
    };
  }

  // Throttle function for scroll and resize events
  throttle<T extends unknown[]>(func: (...args: T) => void, limit: number) {
    let inThrottle = false;
    return (...args: T) => {
      if (!inThrottle) {
        func(...args);
        inThrottle = true;
        setTimeout(() => (inThrottle = false), limit);
      }
    };
  }

  // Cache management
  setCache(key: string, data: unknown, expiry: number = this.cacheExpiry) {
    if (this.cache.size >= this.maxCacheSize) {
      const firstKey = this.cache.keys().next().value as string;
      this.cache.delete(firstKey);
    }

    this.cache.set(key, {
      data,
      expiry: Date.now() + expiry,
    });
  }

  getCache(key: string) {
    const cached = this.cache.get(key);
    if (!cached) return null;

    if (Date.now() > (cached as { expiry: number }).expiry) {
      this.cache.delete(key);
      return null;
    }

    return (cached as { data: unknown }).data;
  }

  // API response caching
  async cachedFetch(url: string, options: RequestInit = {}) {
    const cacheKey = `${url}-${JSON.stringify(options)}`;
    const cached = this.getCache(cacheKey);

    if (cached) {
      return cached;
    }

    try {
      const response = await fetch(url, options);
      const data = await response.json();

      this.setCache(cacheKey, data);
      return data;
    } catch (error) {
      console.error("Cached fetch error:", error);
      throw error;
    }
  }

  // Image preloading and optimization
  preloadImage(src: string): Promise<HTMLImageElement> {
    if (this.imageCache.has(src)) {
      return Promise.resolve(this.imageCache.get(src)!);
    }

    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        this.imageCache.set(src, img);
        resolve(img);
      };
      img.onerror = reject;
      img.src = src;
    });
  }

  // Preload critical images
  preloadCriticalImages(
    imageUrls: string[],
  ): Promise<PromiseSettledResult<HTMLImageElement>[]> {
    return Promise.allSettled(imageUrls.map((url) => this.preloadImage(url)));
  }

  // Intersection Observer for lazy loading
  createIntersectionObserver(
    callback: IntersectionObserverCallback,
    options: IntersectionObserverInit = {},
  ) {
    const defaultOptions = {
      root: null,
      rootMargin: "50px",
      threshold: 0.1,
      ...options,
    };

    return new IntersectionObserver(callback, defaultOptions);
  }

  // Virtual scrolling helper
  createVirtualScroller<T>(
    items: T[],
    itemHeight: number,
    containerHeight: number,
  ) {
    const visibleCount = Math.ceil(containerHeight / itemHeight);
    const totalHeight = items.length * itemHeight;

    return {
      getVisibleItems: (scrollTop: number) => {
        const startIndex = Math.floor(scrollTop / itemHeight);
        const endIndex = Math.min(startIndex + visibleCount, items.length);
        return items.slice(startIndex, endIndex);
      },
      getOffset: (index: number) => index * itemHeight,
      totalHeight,
    };
  }

  // Memory management
  clearCache() {
    this.cache.clear();
    this.imageCache.clear();
    this.apiCache.clear();
  }

  // Performance monitoring
  measurePerformance<T>(name: string, fn: () => T): T {
    const start = performance.now();
    const result = fn();
    const end = performance.now();

    console.log(`${name} took ${end - start}ms`);
    return result;
  }

  // Service Worker registration for caching
  async registerServiceWorker() {
    if ("serviceWorker" in navigator) {
      try {
        const registration = await navigator.serviceWorker.register("/sw.js");
        console.log("Service Worker registered:", registration);
        return registration;
      } catch (error) {
        console.error("Service Worker registration failed:", error);
      }
    }
  }

  // Web Vitals monitoring
  measureWebVitals() {
    if ("PerformanceObserver" in window) {
      // Measure Largest Contentful Paint (LCP)
      const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];
        console.log("LCP:", lastEntry.startTime);
      });
      lcpObserver.observe({ entryTypes: ["largest-contentful-paint"] });

      // Measure First Input Delay (FID)
      const fidObserver = new PerformanceObserver(
        (list: PerformanceObserverEntryList) => {
          const entries = list.getEntries();
          entries.forEach((entry) => {
            if ("processingStart" in entry) {
              // @ts-expect-error: processingStart is not in the base type
              console.log("FID:", entry.processingStart - entry.startTime);
            }
          });
        },
      );
      fidObserver.observe({ entryTypes: ["first-input"] });

      // Measure Cumulative Layout Shift (CLS)
      const clsObserver = new PerformanceObserver((list) => {
        let clsValue = 0;
        const entries = list.getEntries();
        entries.forEach((entry) => {
          // Type guard for LayoutShift
          if (
            "hadRecentInput" in entry &&
            typeof (entry as { hadRecentInput: unknown }).hadRecentInput ===
              "boolean" &&
            "value" in entry &&
            typeof (entry as { value: unknown }).value === "number"
          ) {
            if (!(entry as { hadRecentInput: boolean }).hadRecentInput) {
              clsValue += (entry as { value: number }).value;
            }
          }
        });
        console.log("CLS:", clsValue);
      });
      clsObserver.observe({ entryTypes: ["layout-shift"] });
    }
  }

  // Optimize images with WebP support
  getOptimizedImageUrl(url: string): string {
    if (!url) return url;

    // Check if WebP is supported
    const supportsWebP =
      document
        .createElement("canvas")
        .toDataURL("image/webp")
        .indexOf("data:image/webp") === 0;

    if (supportsWebP && url.includes("themealdb.com")) {
      // For external images, we can't optimize, but we can add width
      return url;
    }

    return url;
  }

  // Batch DOM updates
  batchDOMUpdates(updates: Array<() => void>) {
    updates.forEach((update) => update());
  }
}

// Create singleton instance
const performanceService = new PerformanceService();

export default performanceService;
