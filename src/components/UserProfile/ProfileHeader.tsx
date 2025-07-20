interface ProfileHeaderProps {
  isEditing: boolean;
  onToggleEdit: () => void;
  darkMode: boolean;
}

export default function ProfileHeader({
  isEditing,
  onToggleEdit,
  darkMode,
}: ProfileHeaderProps) {
  return (
    <div className="flex justify-between items-center mb-6">
      <h2 className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent">
        Profile Settings
      </h2>
      <button
        onClick={onToggleEdit}
        className={`px-4 py-2 rounded-lg font-medium transition-colors ${
          darkMode
            ? "bg-gray-700 hover:bg-gray-600 text-gray-100"
            : "bg-gray-100 hover:bg-gray-200 text-gray-800"
        }`}
      >
        {isEditing ? "Cancel" : "Edit Profile"}
      </button>
    </div>
  );
}

