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

import React, { useState, useEffect, useCallback, useMemo } from "react";
import { auth } from "../firebase/config";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
  sendPasswordResetEmail,
} from "firebase/auth";
import { AuthContext } from "./AuthContextDef";
import type { User } from "../global";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isDemoUser, setIsDemoUser] = useState(false);

  // Memoized signup function with useCallback
  const signup = useCallback(
    async (email: unknown, password: unknown, displayName: unknown) => {
      try {
        setError(null);
        setLoading(true);
        const result = await createUserWithEmailAndPassword(
          auth,
          email as string,
          password as string
        );

        // Update profile with display name
        if (displayName) {
          await updateProfile(result.user, {
            displayName: displayName as string,
          });
        }

        return result;
      } catch (error: unknown) {
        const errorMessage = (error as { message?: string }).message;
        setError(errorMessage || "An error occurred");
        throw error;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  // Memoized login function with useCallback
  const login = useCallback(async (email: unknown, password: unknown) => {
    try {
      setError(null);
      setLoading(true);
      return await signInWithEmailAndPassword(
        auth,
        email as string,
        password as string
      );
    } catch (error: unknown) {
      const errorMessage = (error as { message?: string }).message;
      setError(errorMessage || "An error occurred");
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  // Memoized logout function with useCallback
  const logout = useCallback(async () => {
    try {
      setError(null);
      localStorage.removeItem("demoUser"); // Clear demo user
      setCurrentUser(null); // Immediately clear user
      setIsDemoUser(false); // Immediately clear demo flag
      await signOut(auth);
    } catch (error: unknown) {
      const errorMessage = (error as { message?: string }).message;
      setError(errorMessage || "An error occurred");
      throw error;
    }
  }, []);

  // Memoized password reset function with useCallback
  const resetPassword = useCallback(async (email: unknown) => {
    try {
      setError(null);
      await sendPasswordResetEmail(auth, email as string);
    } catch (error: unknown) {
      const errorMessage = (error as { message?: string }).message;
      setError(errorMessage || "An error occurred");
      throw error;
    }
  }, []);

  // Memoized error clear function with useCallback
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  // Demo login handler
  const handleDemoLogin = useCallback((demoUser: User) => {
    setCurrentUser(demoUser);
    setIsDemoUser(true);
  }, []);

  // Auth state change listener with useCallback
  const handleAuthStateChange = useCallback((user: unknown) => {
    // Always check for demo user first
    const demoUser = localStorage.getItem("demoUser");
    if (demoUser) {
      setCurrentUser(JSON.parse(demoUser) as User);
      setIsDemoUser(true);
      setLoading(false);
      return;
    }
    setCurrentUser(user as User | null);
    setIsDemoUser(false);
    setLoading(false);
  }, []);

  // Effect for auth state changes and demo user persistence
  useEffect(() => {
    // Always check for demo user first
    const demoUser = localStorage.getItem("demoUser");
    if (demoUser) {
      setCurrentUser(JSON.parse(demoUser));
      setIsDemoUser(true);
      setLoading(false);
      return;
    }
    // Otherwise, listen to Firebase auth
    const unsubscribe = onAuthStateChanged(auth, handleAuthStateChange);
    return unsubscribe;
  }, [handleAuthStateChange]);

  // Memoized context value
  const value = useMemo(
    () => ({
      currentUser,
      signup,
      login,
      logout,
      resetPassword,
      loading,
      error,
      clearError,
      handleDemoLogin,
      isDemoUser,
    }),
    [
      currentUser,
      signup,
      login,
      logout,
      resetPassword,
      loading,
      error,
      clearError,
      handleDemoLogin,
      isDemoUser,
    ]
  );

  // Remove debug log
  // console.log("AuthProvider:", { currentUser, isDemoUser });

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
