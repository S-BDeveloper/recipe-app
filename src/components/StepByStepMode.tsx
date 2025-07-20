import { useState } from "react";

interface StepByStepModeProps {
  steps: string[];
  darkMode: boolean;
}

const StepByStepMode = ({ steps, darkMode }: StepByStepModeProps) => {
  const [currentStep, setCurrentStep] = useState(0);

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const goToStep = (stepIndex: number) => {
    setCurrentStep(stepIndex);
  };

  return (
    <div
      className={`p-6 rounded-lg border ${
        darkMode
          ? "bg-neutral-800 border-neutral-600 text-white"
          : "bg-white border-gray-200 text-gray-900"
      }`}
    >
      <h3 className="text-xl font-semibold mb-4">Step-by-Step Mode</h3>

      {/* Step Progress */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm">
            Step {currentStep + 1} of {steps.length}
          </span>
          <span className="text-sm">
            {Math.round(((currentStep + 1) / steps.length) * 100)}% Complete
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-green-500 h-2 rounded-full transition-all duration-300"
            style={{
              width: `${((currentStep + 1) / steps.length) * 100}%`,
            }}
          ></div>
        </div>
      </div>

      {/* Current Step */}
      <div className="mb-6">
        <div
          className={`p-4 rounded-lg ${
            darkMode ? "bg-neutral-700" : "bg-gray-50"
          }`}
        >
          <p className="text-lg leading-relaxed">{steps[currentStep]}</p>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-between items-center">
        <button
          onClick={prevStep}
          disabled={currentStep === 0}
          className={`px-4 py-2 rounded-lg transition-colors ${
            currentStep === 0
              ? "opacity-50 cursor-not-allowed"
              : "hover:bg-gray-100"
          } ${
            darkMode
              ? "bg-neutral-700 text-white hover:bg-neutral-600"
              : "bg-white border border-gray-300 text-gray-700"
          }`}
        >
          Previous
        </button>

        <div className="flex space-x-2">
          {steps.map((_, idx: number) => (
            <button
              key={idx}
              onClick={() => goToStep(idx)}
              className={`w-8 h-8 rounded-full text-sm font-medium transition-colors ${
                idx === currentStep
                  ? "bg-green-500 text-white"
                  : darkMode
                    ? "bg-neutral-700 text-white hover:bg-neutral-600"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {idx + 1}
            </button>
          ))}
        </div>

        <button
          onClick={nextStep}
          disabled={currentStep === steps.length - 1}
          className={`px-4 py-2 rounded-lg transition-colors ${
            currentStep === steps.length - 1
              ? "opacity-50 cursor-not-allowed"
              : "hover:bg-gray-100"
          } ${
            darkMode
              ? "bg-green-600 text-white hover:bg-green-700"
              : "bg-green-500 text-white hover:bg-green-600"
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default StepByStepMode;

