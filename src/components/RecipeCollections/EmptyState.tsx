import React from "react";

interface EmptyStateProps {
  message: string;
  darkMode: boolean;
}

const EmptyState: React.FC<EmptyStateProps> = ({ message, darkMode }) => {
  return (
    <div
      className={`text-center py-8 flex items-center justify-center h-full ${
        darkMode ? "text-stone-400" : "text-gray-600"
      }`}
    >
      <p>{message}</p>
    </div>
  );
};

export default EmptyState;

