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

import React, { useState, useEffect, useRef } from "react";
import performanceService from "../../services/performanceService";

interface OptimizedImageProps extends React.HTMLAttributes<HTMLDivElement> {
  src: string;
  alt: string;
  width?: number | string;
  height?: number | string;
  className?: string;
  lazy?: boolean;
  priority?: boolean;
  fallbackSrc?: string;
}

export default function OptimizedImage({
  src,
  alt,
  width,
  height,
  className = "",
  lazy = false,
  priority = false,
  fallbackSrc = "",
  ...props
}: OptimizedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isInView, setIsInView] = useState(!lazy);
  const imgRef = useRef<HTMLDivElement | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    if (!lazy || priority) {
      setIsInView(true);
      return;
    }

    if (imgRef.current) {
      observerRef.current = performanceService.createIntersectionObserver(
        (entries: IntersectionObserverEntry[]) => {
          entries.forEach((entry: IntersectionObserverEntry) => {
            if (entry.isIntersecting) {
              setIsInView(true);
              if (observerRef.current) {
                observerRef.current.disconnect();
              }
            }
          });
        },
        { rootMargin: "50px" },
      );
      observerRef.current.observe(imgRef.current);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [lazy, priority]);

  useEffect(() => {
    if (!isInView) return;

    const loadImage = async () => {
      try {
        await performanceService.preloadImage(src);
        setIsLoaded(true);
      } catch (error) {
        console.error("Image load error:", error);
        setIsError(true);
      }
    };

    loadImage();
  }, [src, isInView]);

  const optimizedSrc = performanceService.getOptimizedImageUrl(src);
  const displaySrc = isError ? fallbackSrc : optimizedSrc;

  // If width and height are provided, use fixed dimensions
  const hasFixedDimensions = width && height;
  const containerStyle = hasFixedDimensions ? { width, height } : {};
  const containerClass = hasFixedDimensions
    ? "relative overflow-hidden"
    : "relative";

  return (
    <div
      ref={imgRef}
      className={`${containerClass} ${className}`}
      style={containerStyle}
      {...props}
    >
      {/* Placeholder/Skeleton */}
      {!isLoaded && !isError && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-gray-300 border-t-green-600 rounded-full animate-spin"></div>
        </div>
      )}

      {/* Error state */}
      {isError && (
        <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
          <div className="text-gray-400 text-center">
            <svg
              className="w-12 h-12 mx-auto mb-2"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                clipRule="evenodd"
              />
            </svg>
            <p className="text-sm">Image unavailable</p>
          </div>
        </div>
      )}

      {/* Actual image */}
      {isInView && (
        <img
          src={displaySrc}
          alt={alt}
          className={`w-full h-full object-cover transition-opacity duration-300 ${
            isLoaded ? "opacity-100" : "opacity-0"
          }`}
          loading={lazy ? "lazy" : "eager"}
          decoding="async"
          onLoad={() => setIsLoaded(true)}
          onError={() => setIsError(true)}
        />
      )}
    </div>
  );
}

