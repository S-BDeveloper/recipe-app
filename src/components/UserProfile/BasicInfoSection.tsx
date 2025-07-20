interface BasicInfoSectionProps {
  profile: { displayName: string };
  setProfile: (profile: { displayName: string }) => void;
  isEditing: boolean;
  darkMode: boolean;
}

export default function BasicInfoSection({
  profile,
  setProfile,
  isEditing,
  darkMode,
}: BasicInfoSectionProps) {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-3">Basic Information</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">Display Name</label>
          <input
            type="text"
            value={profile.displayName}
            onChange={(e) =>
              setProfile({ ...profile, displayName: e.target.value })
            }
            disabled={!isEditing}
            className={`w-full px-3 py-2 rounded-lg border ${
              darkMode
                ? "bg-gray-800 border-gray-600 text-gray-100"
                : "bg-white border-gray-300 text-gray-800"
            } ${!isEditing ? "opacity-50" : ""}`}
          />
        </div>
      </div>
    </div>
  );
}

