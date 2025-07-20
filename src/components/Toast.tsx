import React, { useEffect } from "react";

export interface ToastProps {
  message: string;
  onClose: () => void;
  duration?: number;
}

const Toast: React.FC<ToastProps> = ({ message, onClose, duration = 3000 }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [onClose, duration]);

  return (
    <div
      className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 bg-stone-900 text-white px-6 py-3 rounded-lg shadow-lg text-base font-medium animate-fade-in"
      style={{ minWidth: 200, maxWidth: 400 }}
      role="alert"
    >
      {message}
    </div>
  );
};

export default Toast;

