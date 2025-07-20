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

import { useEffect } from "react";

interface HeadManagerProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
}

function HeadManager({
  title,
  description,
  keywords,
  image,
  url,
}: HeadManagerProps) {
  useEffect(() => {
    // Update document title
    if (title) {
      document.title = title;
    }

    // Update meta tags
    const updateMetaTag = (name: string, content: string) => {
      let meta = document.querySelector(
        `meta[name="${name}"]`,
      ) as HTMLMetaElement | null;
      if (!meta) {
        meta = document.createElement("meta");
        meta.name = name;
        document.head.appendChild(meta);
      }
      meta.content = content;
    };

    const updatePropertyTag = (property: string, content: string) => {
      let meta = document.querySelector(
        `meta[property="${property}"]`,
      ) as HTMLMetaElement | null;
      if (!meta) {
        meta = document.createElement("meta");
        meta.setAttribute("property", property);
        document.head.appendChild(meta);
      }
      meta.content = content;
    };

    // Update meta tags
    if (description) {
      updateMetaTag("description", description);
      updatePropertyTag("og:description", description);
      updatePropertyTag("twitter:description", description);
    }

    if (keywords) {
      updateMetaTag("keywords", keywords);
    }

    if (title) {
      updatePropertyTag("og:title", title);
      updatePropertyTag("twitter:title", title);
    }

    if (image) {
      updatePropertyTag("og:image", image);
      updatePropertyTag("twitter:image", image);
    }

    if (url) {
      updatePropertyTag("og:url", url);
    }

    // Set default meta tags
    updateMetaTag("author", "CULINARIA Team");
    updatePropertyTag("og:type", "website");
    updatePropertyTag("twitter:card", "summary_large_image");

    // Add structured data
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      name: "CULINARIA",
      description: "Professional Cooking Platform & Recipe Discovery",
      url: "https://culinaria.com",
      applicationCategory: "FoodAndDrinkApplication",
      operatingSystem: "Web Browser",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
      author: {
        "@type": "Organization",
        name: "CULINARIA Team",
      },
    };

    // Remove existing structured data script
    const existingScript = document.querySelector(
      'script[type="application/ld+json"]',
    );
    if (existingScript) {
      existingScript.remove();
    }

    // Add new structured data script
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.textContent = JSON.stringify(structuredData);
    document.head.appendChild(script);

    // Cleanup function
    return () => {
      // Remove the script we added
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, [title, description, keywords, image, url]);

  return null;
}

export default HeadManager;

