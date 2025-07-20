import team from "./data";

const AboutTeam = ({ darkMode }: { darkMode: boolean }) => (
  <div
    className={`rounded-2xl p-8 sm:p-12 mb-16 shadow-lg ${
      darkMode
        ? "bg-neutral-900 border border-neutral-700"
        : "bg-white border border-gray-200"
    }`}
  >
    <h2
      className={`text-3xl sm:text-4xl font-bold text-center mb-12 ${
        darkMode ? "text-green-300" : "text-green-900"
      }`}
    >
      Meet Our Team
    </h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {team.map((member, index) => (
        <div key={index} className="text-center">
          <div className="w-24 h-24 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 text-3xl font-bold text-white">
            {member.name
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </div>
          <h3
            className={`text-xl font-semibold mb-2 ${
              darkMode ? "text-green-300" : "text-green-900"
            }`}
          >
            {member.name}
          </h3>
          <p
            className={`font-medium mb-3 ${
              darkMode ? "text-green-400" : "text-green-600"
            }`}
          >
            {member.role}
          </p>
          <p
            className={`mb-4 leading-relaxed ${
              darkMode ? "text-stone-400" : "text-gray-600"
            }`}
          >
            {member.bio}
          </p>
          <a
            href={`mailto:${member.email}`}
            className={`font-medium ${
              darkMode
                ? "text-green-400 hover:text-green-300"
                : "text-green-600 hover:text-green-700"
            }`}
          >
            {member.email}
          </a>
        </div>
      ))}
    </div>
  </div>
);

export default AboutTeam;

