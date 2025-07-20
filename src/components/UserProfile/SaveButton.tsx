interface SaveButtonProps {
  isEditing: boolean;
  loading: boolean;
  onSave: () => void;
}

export default function SaveButton({
  isEditing,
  loading,
  onSave,
}: SaveButtonProps) {
  if (!isEditing) return null;

  return (
    <div className="flex justify-end">
      <button
        onClick={onSave}
        disabled={loading}
        className={`px-6 py-2 rounded-lg font-medium transition-colors ${
          loading ? "opacity-50 cursor-not-allowed" : "hover:scale-105"
        } bg-gradient-to-r from-orange-500 to-amber-500 text-white`}
      >
        {loading ? "Saving..." : "Save Profile"}
      </button>
    </div>
  );
}

