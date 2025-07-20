import AIRecommendations from "./AIRecommendations";

interface RecommendationsPageProps {
  darkMode: boolean;
}

const RecommendationsPage = ({ darkMode }: RecommendationsPageProps) => {
  // Placeholder user preferences; can be replaced with real user data
  const userPreferences = {
    favoriteCategories: ["Vegetarian", "Seafood", "Dessert"],
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-4">
      <h2 className="text-2xl font-bold mb-6">Smart Recipe Recommendations</h2>
      <AIRecommendations
        darkMode={darkMode}
        userPreferences={userPreferences}
      />
    </div>
  );
};

export default RecommendationsPage;

