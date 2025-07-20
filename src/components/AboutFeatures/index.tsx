import features from "./data";

const AboutFeatures = ({ darkMode }: { darkMode: boolean }) => (
  <div className="mb-16">
    <h2
      className={`text-3xl font-bold mb-8 text-center ${
        darkMode ? "text-green-300" : "text-gray-900"
      }`}
    >
      What Makes{" "}
      <span className="bg-gradient-to-r from-green-600 to-emerald-700 dark:from-green-400 dark:to-emerald-500 bg-clip-text text-transparent">
        CULINARIA
      </span>{" "}
      Special
    </h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {features.map((feature, idx) => (
        <div
          key={idx}
          className={`rounded-xl p-6 shadow-lg border ${
            darkMode
              ? "bg-neutral-900 border-neutral-700"
              : "bg-white border-gray-100"
          }`}
        >
          <div
            className={`w-12 h-12 ${feature.iconBg} rounded-lg flex items-center justify-center mb-4`}
          >
            {feature.svg}
          </div>
          <h3
            className={`text-xl font-semibold mb-2 ${
              darkMode ? "text-green-300" : "text-gray-900"
            }`}
          >
            {feature.title}
          </h3>
          <p className={darkMode ? "text-stone-300" : "text-gray-600"}>
            {feature.description}
          </p>
        </div>
      ))}
    </div>
  </div>
);

export default AboutFeatures;
