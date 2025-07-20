import { useState } from "react";

// Minimal Onboarding Modal for first-time users
interface OnboardingModalProps {
  open: boolean;
  onClose: () => void;
  darkMode: boolean;
}

const OnboardingModal = ({ open, onClose, darkMode }: OnboardingModalProps) => {
  const [step, setStep] = useState(0);
  const steps = [
    {
      title: "Welcome to the Recipe App!",
      content:
        "Discover, save, and create recipes. Plan meals, track nutrition, and more—all in one place.",
    },
    {
      title: "Personalized Experience",
      content:
        "Sign up to save favorites, create collections, and get AI-powered recommendations tailored to you.",
    },
    {
      title: "Explore Features",
      content:
        "Try step-by-step cooking mode, generate shopping lists, and plan your meals with the calendar.",
    },
  ];

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div
        className={`max-w-md w-full rounded-xl shadow-lg border p-8 relative ${
          darkMode
            ? "bg-black border-gray-700 text-stone-100"
            : "bg-white border-stone-200 text-stone-900"
        }`}
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-stone-400 hover:text-orange-500 text-xl font-bold"
          aria-label="Close onboarding"
        >
          ×
        </button>
        <h2 className="text-2xl font-bold mb-3 bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent">
          {steps[step].title}
        </h2>
        <p className="mb-6 text-base leading-relaxed">{steps[step].content}</p>
        <div className="flex gap-2 justify-end">
          {step > 0 && (
            <button
              onClick={() => setStep((s) => s - 1)}
              className="px-4 py-2 rounded bg-stone-200 hover:bg-stone-300 text-stone-900 font-medium"
            >
              Back
            </button>
          )}
          {step < steps.length - 1 ? (
            <button
              onClick={() => setStep((s) => s + 1)}
              className="px-4 py-2 rounded bg-orange-500 hover:bg-orange-600 text-white font-medium"
            >
              Next
            </button>
          ) : (
            <button
              onClick={onClose}
              className="px-4 py-2 rounded bg-orange-500 hover:bg-orange-600 text-white font-medium"
            >
              Get Started
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default OnboardingModal;

