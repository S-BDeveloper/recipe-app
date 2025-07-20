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

import { useState, useEffect, useRef } from "react";

interface RateLimitConfig {
  maxCalls: number;
  windowMs: number;
}

// Rate limiting configuration
const RATE_LIMITS: Record<string, RateLimitConfig> = {
  SEARCH: { maxCalls: 10, windowMs: 60000 }, // 30 searches per minute
  RECIPE_SUBMIT: { maxCalls: 2, windowMs: 60000 }, // 10 submissions per hour
  REVIEW: { maxCalls: 3, windowMs: 60000 }, // 50 reviews per day
  LOGIN: { maxCalls: 5, windowMs: 60000 }, // 5 login attempts per hour
  FAVORITE: { maxCalls: 10, windowMs: 60000 }, // 100 favorites per minute
  MEAL_PLAN: { maxCalls: 1, windowMs: 60000 }, // 20 meal plan updates per minute
};

export const useRateLimit = (actionType: keyof typeof RATE_LIMITS | string) => {
  const [isBlocked, setIsBlocked] = useState(false);
  const [remainingCalls, setRemainingCalls] = useState(
    RATE_LIMITS[actionType]?.maxCalls || 10,
  );
  const callsRef = useRef<number[]>([]);
  const limit: RateLimitConfig | undefined = RATE_LIMITS[actionType];

  useEffect(() => {
    if (!limit) return;

    const now = Date.now();
    const windowStart = now - limit.windowMs;

    // Remove old calls outside the time window
    callsRef.current = callsRef.current.filter(
      (timestamp) => timestamp > windowStart,
    );

    // Check if we're at the limit
    const currentCalls = callsRef.current.length;
    setRemainingCalls(Math.max(0, limit.maxCalls - currentCalls));
    setIsBlocked(currentCalls >= limit.maxCalls);

    // Auto-unblock when time window resets
    if (isBlocked && currentCalls < limit.maxCalls) {
      setIsBlocked(false);
    }
  }, [limit, isBlocked]);

  const checkRateLimit = () => {
    if (!limit) return { allowed: true, remaining: 0 };

    const now = Date.now();
    const windowStart = now - limit.windowMs;

    // Clean old calls
    callsRef.current = callsRef.current.filter(
      (timestamp) => timestamp > windowStart,
    );

    // Check if we can make another call
    const currentCalls = callsRef.current.length;
    const allowed = currentCalls < limit.maxCalls;

    if (allowed) {
      callsRef.current.push(now);
      setRemainingCalls(Math.max(0, limit.maxCalls - callsRef.current.length));
    }

    return {
      allowed,
      remaining: Math.max(0, limit.maxCalls - currentCalls),
      resetTime: windowStart + limit.windowMs,
    };
  };

  const resetRateLimit = () => {
    callsRef.current = [];
    setRemainingCalls(limit?.maxCalls || 10);
    setIsBlocked(false);
  };

  return {
    checkRateLimit,
    resetRateLimit,
    isBlocked,
    remainingCalls,
    limit: limit?.maxCalls || 10,
  };
};
