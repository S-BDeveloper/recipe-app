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

interface ImageProps {
  src: string;
  alt?: string;
}

const Image: React.FC<ImageProps> = ({ src, alt }) => {
  return (
    <div className="flex items-center justify-center mb-6 sm:mb-8 lg:mb-12">
      <img
        src={src}
        alt={alt || "Recipe image"}
        className="max-w-full h-auto rounded-lg shadow-lg max-h-96 sm:max-h-[500px] lg:max-h-[600px] xl:max-h-[700px] object-cover"
      />
    </div>
  );
};
export default Image;

