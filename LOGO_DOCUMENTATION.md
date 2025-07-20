# Culinaria Logo Documentation

## Overview

The Culinaria logo represents our commitment to professional cooking and culinary excellence. The design incorporates cooking utensils forming the letter "C" for Culinaria, topped with a chef's hat to symbolize culinary expertise.

## Design Elements

### Primary Components

- **Chef's Hat**: Represents culinary expertise and professional cooking
- **Cooking Utensils**: Whisk and spatula forming the letter "C" for Culinaria
- **Leaf Accent**: Symbolizes fresh ingredients and healthy cooking
- **Color Palette**: Green tones representing freshness and natural ingredients

### Symbolism

- **Chef's Hat**: Professional culinary skills and expertise
- **"C" Formation**: Direct connection to the Culinaria brand name
- **Whisk**: Versatility and precision in cooking
- **Leaf**: Fresh ingredients and healthy cooking philosophy
- **Green Colors**: Freshness, health, and natural ingredients

## Logo Versions

### 1. Full Logo (logo.svg)

- **Use**: Primary branding, headers, main navigation
- **Features**: Complete design with all elements and decorative accents
- **Size**: 48x48px (scalable)

### 2. Simple Logo (logo-simple.svg)

- **Use**: Secondary branding, smaller spaces
- **Features**: Clean design without decorative elements
- **Size**: 48x48px (scalable)

### 3. Flat Logo (logo-flat.svg)

- **Use**: Digital applications, web interfaces
- **Features**: Flat design style, no gradients or shadows
- **Size**: 48x48px (scalable)

### 4. Monochrome Logo (logo-monochrome.svg)

- **Use**: Single-color applications, printing
- **Features**: Black and white version for maximum contrast
- **Size**: 48x48px (scalable)

### 5. Favicon (favicon.svg)

- **Use**: Browser tabs, bookmarks, small applications
- **Features**: Simplified version optimized for small sizes
- **Size**: 32x32px (scalable)

## Color Specifications

### Primary Colors

- **Dark Green**: #059669 (Emerald-600)
- **Light Green**: #10B981 (Emerald-500)
- **Border Green**: #047857 (Emerald-700)

### Monochrome Version

- **Black**: #000000
- **White**: #FFFFFF (background)

## Usage Guidelines

### Minimum Size

- **Full Logo**: 24px minimum
- **Simple Logo**: 20px minimum
- **Favicon**: 16px minimum

### Clear Space

- Maintain clear space equal to the height of the chef's hat around all sides of the logo

### Background Requirements

- Use on light or dark backgrounds
- Ensure sufficient contrast for readability
- Avoid using on busy or patterned backgrounds

## File Locations

```
src/assets/
├── logo.svg              # Full logo
├── logo-simple.svg       # Simple version
├── logo-flat.svg         # Flat design
├── logo-monochrome.svg   # Monochrome version
└── favicon.svg           # Favicon
```

## Implementation

### React Component Usage

```jsx
import logo from "../assets/logo.svg";

<img src={logo} alt="Culinaria logo" className="h-8 w-8" />;
```

### CSS Background Usage

```css
.logo {
  background-image: url("../assets/logo.svg");
  background-size: contain;
  background-repeat: no-repeat;
}
```

## Brand Consistency

- Always use the appropriate logo version for the context
- Maintain consistent sizing and spacing
- Ensure proper contrast and visibility
- Use the full logo for primary branding
- Use simplified versions for smaller applications

## Copyright Notice

© 2024 Sabina Begum. All rights reserved.
This logo and associated branding materials are proprietary to Culinaria.
