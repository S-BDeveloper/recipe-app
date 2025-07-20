import stats from "./data";

const AboutStats = ({ darkMode }: { darkMode: boolean }) => (
  <div className="mb-16">
    <h2
      className={`text-3xl font-bold mb-8 text-center ${
        darkMode ? "text-green-300" : "text-gray-900"
      }`}
    >
      <span className="bg-gradient-to-r from-green-600 to-emerald-700 dark:from-green-400 dark:to-emerald-500 bg-clip-text text-transparent">
        CULINARIA
      </span>{" "}
      by the Numbers
    </h2>
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
      {stats.map((stat, idx) => (
        <div key={idx} className="text-center">
          <div
            className={`text-3xl md:text-4xl font-bold ${stat.colorClass} mb-2`}
          >
            {stat.value}
          </div>
          <div className={darkMode ? "text-stone-300" : "text-gray-600"}>
            {stat.label}
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default AboutStats;
