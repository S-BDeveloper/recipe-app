import contactInfo from "./data";

const AboutContact = ({ darkMode }: { darkMode: boolean }) => (
  <div
    className={`rounded-2xl p-8 sm:p-12 mt-16 shadow-lg ${
      darkMode
        ? "bg-neutral-900 border border-neutral-700"
        : "bg-white border border-gray-200"
    }`}
  >
    <h2
      className={`text-3xl sm:text-4xl font-bold text-center mb-8 ${
        darkMode ? "text-green-300" : "text-green-900"
      }`}
    >
      Get in Touch
    </h2>
    <div className="text-center">
      <p
        className={`text-lg mb-6 ${
          darkMode ? "text-stone-400" : "text-gray-600"
        }`}
      >
        {contactInfo.cta}
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
        <a
          href={`mailto:${contactInfo.email}`}
          className="px-6 py-3 rounded-lg font-semibold transition-colors bg-green-600 hover:bg-green-700 text-white"
        >
          {contactInfo.button}
        </a>
        <span className={darkMode ? "text-stone-400" : "text-gray-600"}>
          {contactInfo.email}
        </span>
      </div>
    </div>
  </div>
);

export default AboutContact;

