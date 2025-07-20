import techStack from "./data";

const AboutTech = ({ darkMode }: { darkMode: boolean }) => (
  <div className="mb-16">
    <h2
      className={`text-3xl font-bold mb-8 text-center ${
        darkMode ? "text-green-300" : "text-gray-900"
      }`}
    >
      Built with Modern Technology
    </h2>
    <div
      className={`rounded-2xl p-8 ${
        darkMode
          ? "bg-neutral-900 border border-neutral-700"
          : "bg-gradient-to-r from-gray-50 to-gray-100"
      }`}
    >
      <p
        className={`text-lg mb-6 text-center ${
          darkMode ? "text-stone-300" : "text-gray-700"
        }`}
      >
        CULINARIA is built with cutting-edge technologies to ensure fast,
        secure, and reliable performance.
      </p>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {techStack.map((tech, idx) => (
          <div key={idx} className="text-center">
            <div className={`text-2xl font-bold ${tech.colorClass} mb-1`}>
              {tech.name}
            </div>
            <div className={darkMode ? "text-stone-300" : "text-gray-600"}>
              {tech.description}
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default AboutTech;

