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

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/useAuth";

const Signup = ({ darkMode }: { darkMode: boolean }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSwitchToLogin = () => {
    navigate("/login");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email || !password || !confirmPassword) {
      setError("Please fill in all required fields");
      return;
    }

    if (password !== confirmPassword) {
      return setError("Passwords do not match");
    }

    if (password.length < 6) {
      return setError("Password must be at least 6 characters long");
    }

    try {
      setError("");
      setLoading(true);
      await signup(email, password, displayName);
      // Navigate to home page after successful signup
      navigate("/");
    } catch (error: unknown) {
      console.error("Signup error:", error);
      if (
        typeof error === "object" &&
        error !== null &&
        "code" in error &&
        typeof (error as { code?: string }).code === "string"
      ) {
        const code = (error as { code: string }).code;
        if (code === "auth/email-already-in-use") {
          setError(
            "An account with this email already exists. Please try logging in instead."
          );
        } else if (code === "auth/invalid-email") {
          setError("Please enter a valid email address.");
        } else if (code === "auth/weak-password") {
          setError("Password is too weak. Please choose a stronger password.");
        } else if (code === "auth/operation-not-allowed") {
          setError(
            "Email/password accounts are not enabled. Please contact support."
          );
        } else {
          setError("Failed to create an account. Please try again.");
        }
      } else {
        setError("Failed to create an account. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative ${
        darkMode ? "bg-black text-stone-300" : "bg-stone-100 text-gray-800"
      }`}
    >
      <div
        className={`rounded-2xl shadow-2xl border-2 py-6 sm:py-8 lg:py-10 px-6 sm:px-8 lg:px-10 ${
          darkMode
            ? "bg-neutral-900 border-neutral-700"
            : "bg-white border-gray-200"
        }`}
      >
        <h2 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent">
          Create Your Account
        </h2>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto">
          <div>
            <label className="block text-sm font-medium mb-2">
              Display Name
            </label>
            <input
              type="text"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              className={`w-full px-3 py-2 rounded-lg border ${
                darkMode
                  ? "bg-neutral-800 border-neutral-600 text-stone-300"
                  : "bg-white border-gray-300 text-gray-800"
              }`}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className={`w-full px-3 py-2 rounded-lg border ${
                darkMode
                  ? "bg-neutral-800 border-neutral-600 text-stone-300"
                  : "bg-white border-gray-300 text-gray-800"
              }`}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              className={`w-full px-3 py-2 rounded-lg border ${
                darkMode
                  ? "bg-neutral-800 border-neutral-600 text-stone-300"
                  : "bg-white border-gray-300 text-gray-800"
              }`}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Confirm Password
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className={`w-full px-3 py-2 rounded-lg border ${
                darkMode
                  ? "bg-neutral-800 border-neutral-600 text-stone-300"
                  : "bg-white border-gray-300 text-gray-800"
              }`}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-4 px-6 rounded-xl text-lg font-semibold transition-all duration-200 ${
              loading
                ? "opacity-50 cursor-not-allowed"
                : "hover:scale-105 hover:shadow-lg"
            } bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-md`}
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        <div className="text-center mt-4">
          <p
            className={`text-sm ${
              darkMode ? "text-stone-400" : "text-gray-600"
            }`}
          >
            Already have an account?{" "}
            <button
              onClick={handleSwitchToLogin}
              className="text-orange-500 hover:text-orange-400 font-medium"
            >
              Login
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
