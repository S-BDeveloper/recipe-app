/**
 * Image optimization utilities for better performance
 */

// Lazy loading for images
export const lazyLoadImage = (_src: string, placeholder?: string): string => {
  return (
    placeholder ||
    "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjNmNGY2Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzY2NzM4NyIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkxvYWRpbmcuLi48L3RleHQ+PC9zdmc+"
  );
};

// Image preloading for critical images
export const preloadImage = (src: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = reject;
    img.src = src;
  });
};

// Responsive image sizes
export const getResponsiveImageSizes = (
  baseUrl: string,
  sizes: number[] = [200, 400, 600, 800],
): string[] => {
  return sizes.map((size) => `${baseUrl}?w=${size}`);
};

// WebP support detection
export const supportsWebP = (): boolean => {
  const canvas = document.createElement("canvas");
  canvas.width = 1;
  canvas.height = 1;
  return canvas.toDataURL("image/webp").indexOf("data:image/webp") === 0;
};

// Optimize image URL based on format support
export const getOptimizedImageUrl = (url: string, width?: number): string => {
  if (!url) return url;

  const params = new URLSearchParams();
  if (width) params.append("w", width.toString());
  if (supportsWebP()) params.append("fm", "webp");

  const separator = url.includes("?") ? "&" : "?";
  return params.toString() ? `${url}${separator}${params.toString()}` : url;
};
