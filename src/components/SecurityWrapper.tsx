/**
 * Copyright (c) 2024 Sabina Begum. All rights reserved.
 *
 * PROPRIETARY SOFTWARE - CONFIDENTIAL
 *
 * This file contains proprietary and confidential information.
 * Unauthorized copying, distribution, or use is strictly prohibited.
 *
 * For licensing inquiries: begumsabina81193@gmail.com
 *
 * Educational use only - Commercial use prohibited.
 */

import React, {
  useEffect,
  useState,
  createContext,
  useContext,
  ReactNode,
} from "react";

interface SecurityContextValue {
  securityToken: string;
  validateAction: (actionType: string) => { allowed: boolean; reason: string };
  logSecurityEvent: (event: string, details?: Record<string, unknown>) => void;
  checkSessionValidity: () => boolean;
}

const SecurityContext = createContext<SecurityContextValue | undefined>(
  undefined,
);

interface SecurityProviderProps {
  children: ReactNode;
}

export const SecurityProvider: React.FC<SecurityProviderProps> = ({
  children,
}) => {
  const [securityToken, setSecurityToken] = useState<string>("");
  const [lastActivity, setLastActivity] = useState<number>(Date.now());

  // Generate security token on mount
  useEffect(() => {
    setSecurityToken("test-token-" + Math.random().toString(36).substring(2));
  }, []);

  // Track user activity
  useEffect(() => {
    const updateActivity = () => {
      setLastActivity(Date.now());
    };

    const events = [
      "mousedown",
      "mousemove",
      "keypress",
      "scroll",
      "touchstart",
    ];
    events.forEach((event) => {
      document.addEventListener(event, updateActivity, true);
    });

    return () => {
      events.forEach((event) => {
        document.removeEventListener(event, updateActivity, true);
      });
    };
  }, []);

  const validateAction = () => {
    return { allowed: true, reason: "No rate limit for this action" };
  };

  const logSecurityEvent = (
    event: string,
    details: Record<string, unknown> = {},
  ) => {
    const timestamp = new Date().toISOString();
    const securityEvent = {
      timestamp,
      event,
      actionType: "general", // Use actionType for categorization
      userId: "anonymous",
      userEmail: "anonymous",
      ipAddress: "client-side", // In a real app, this would come from server
      userAgent: navigator.userAgent,
      details,
    };

    // Log to console in development
    if (import.meta.env.DEV) {
      console.log("Security Event:", securityEvent);
    }

    // In production, this would send to a security monitoring service
    // Example: sendToSecurityService(securityEvent);
  };

  const checkSessionValidity = () => {
    const now = Date.now();
    const sessionAge = now - lastActivity;

    // Session expires after 2 hours of inactivity
    if (sessionAge > 2 * 60 * 60 * 1000) {
      logSecurityEvent("SESSION_EXPIRED", { sessionAge });
      return false;
    }

    return true;
  };

  const securityValue: SecurityContextValue = {
    securityToken,
    validateAction,
    logSecurityEvent,
    checkSessionValidity,
  };

  return (
    <SecurityContext.Provider value={securityValue}>
      {children}
    </SecurityContext.Provider>
  );
};

interface SecurityWrapperProps {
  children: ReactNode;
  requiredAuth?: boolean;
}

export const SecurityWrapper: React.FC<SecurityWrapperProps> = ({
  children,
  requiredAuth = false,
}) => {
  const securityContext = useContext(SecurityContext);
  const [isValid, setIsValid] = useState<boolean>(true);

  useEffect(() => {
    const validateSession = () => {
      if (securityContext) {
        const sessionValid = securityContext.checkSessionValidity();

        if (!sessionValid) {
          securityContext.logSecurityEvent("INVALID_SESSION_ACCESS");
          setIsValid(false);
          return;
        }
      }

      if (requiredAuth) {
        // Check if user is logged in via localStorage
        let currentUser = null;
        try {
          const demoUser = localStorage.getItem("demoUser");
          if (demoUser) {
            currentUser = JSON.parse(demoUser);
          }
        } catch {
          // Ignore errors
        }

        if (!currentUser) {
          if (securityContext) {
            securityContext.logSecurityEvent("UNAUTHORIZED_ACCESS");
          }
          setIsValid(false);
          return;
        }
      }

      setIsValid(true);
    };

    validateSession();

    // Check session validity every 5 minutes
    const interval = setInterval(validateSession, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, [requiredAuth, securityContext]);

  return isValid ? (
    <>{children}</>
  ) : (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center p-8 bg-white rounded-lg shadow-lg">
        <div className="text-6xl mb-4">🔒</div>
        <h2 className="text-2xl font-bold mb-4">Session Expired</h2>
        <p className="text-gray-600 mb-4">
          Your session has expired for security reasons. Please log in again.
        </p>
        <button
          onClick={() => window.location.reload()}
          className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Reload Page
        </button>
      </div>
    </div>
  );
};

