import { Helmet } from "react-helmet-async";

export default function MetaHelmet() {
  return (
    <Helmet>
      <title>
        CULINARIA - Professional Cooking Platform & Recipe Discovery
      </title>
      <meta
        name="description"
        content="CULINARIA: Your comprehensive cooking platform. Discover thousands of recipes, track nutrition, plan meals, and master culinary skills with professional guidance."
      />
      <meta
        name="keywords"
        content="culinaria, recipes, cooking, nutrition tracking, meal planning, culinary skills, professional cooking, healthy recipes, cooking platform"
      />
      <meta name="author" content="CULINARIA Team" />
      <meta
        property="og:title"
        content="CULINARIA - Professional Cooking Platform & Recipe Discovery"
      />
      <meta
        property="og:description"
        content="CULINARIA: Your comprehensive cooking platform. Discover thousands of recipes, track nutrition, plan meals, and master culinary skills."
      />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://culinaria.com" />
      <meta property="og:image" content="/foodie-logo-simple.svg" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta
        name="twitter:title"
        content="CULINARIA - Professional Cooking Platform & Recipe Discovery"
      />
      <meta
        name="twitter:description"
        content="CULINARIA: Your comprehensive cooking platform. Discover thousands of recipes, track nutrition, plan meals, and master culinary skills."
      />
      <meta name="twitter:image" content="/foodie-logo-simple.svg" />
      <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
      <link rel="canonical" href="https://culinaria.com" />
      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify({
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
        })}
      </script>
    </Helmet>
  );
}

