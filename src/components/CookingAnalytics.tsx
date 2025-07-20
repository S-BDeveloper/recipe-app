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

import React, { useState, useEffect, useCallback } from "react";
import { useAuth } from "../contexts/useAuth";

interface CuisineStat {
  cuisine: string;
  count: number;
  percentage: number;
}
interface DifficultyStat {
  difficulty: string;
  count: number;
  percentage: number;
}
interface TimeBreakdown {
  range: string;
  count: number;
  percentage: number;
}
interface WeeklyProgress {
  week: string;
  recipes: number;
  time: number;
}
interface MonthlyTrend {
  month: string;
  recipes: number;
  time: number;
}
interface IngredientStat {
  ingredient: string;
  count: number;
  percentage: number;
}
interface CookingGoals {
  weeklyRecipes: number;
  weeklyTime: number;
  monthlyVariety: number;
  currentWeekRecipes: number;
  currentWeekTime: number;
  currentMonthVariety: number;
}
interface Achievement {
  name: string;
  description: string;
  earned: string;
  icon: string;
}
interface AnalyticsData {
  totalRecipes: number;
  totalCookingTime: number;
  averageRating: number;
  favoriteCuisines: CuisineStat[];
  difficultyBreakdown: DifficultyStat[];
  cookingTimeBreakdown: TimeBreakdown[];
  weeklyProgress: WeeklyProgress[];
  monthlyTrends: MonthlyTrend[];
  topIngredients: IngredientStat[];
  cookingGoals: CookingGoals;
  achievements: Achievement[];
  [key: string]: unknown;
}
interface CookingAnalyticsProps {
  darkMode: boolean;
}

const CookingAnalytics: React.FC<CookingAnalyticsProps> = ({ darkMode }) => {
  const { currentUser, isDemoUser } = useAuth();
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [timeRange, setTimeRange] = useState<string>("month");
  const [loading, setLoading] = useState<boolean>(true);

  // Sample analytics data
  const getDemoAnalytics = (): AnalyticsData => ({
    totalRecipes: 47,
    totalCookingTime: 2840, // minutes
    averageRating: 4.3,
    favoriteCuisines: [
      { cuisine: "Italian", count: 12, percentage: 25.5 },
      { cuisine: "Mediterranean", count: 8, percentage: 17.0 },
      { cuisine: "Asian", count: 7, percentage: 14.9 },
      { cuisine: "American", count: 6, percentage: 12.8 },
      { cuisine: "Mexican", count: 5, percentage: 10.6 },
      { cuisine: "Indian", count: 4, percentage: 8.5 },
      { cuisine: "Other", count: 5, percentage: 10.6 },
    ],
    difficultyBreakdown: [
      { difficulty: "Easy", count: 20, percentage: 42.6 },
      { difficulty: "Medium", count: 18, percentage: 38.3 },
      { difficulty: "Hard", count: 9, percentage: 19.1 },
    ],
    cookingTimeBreakdown: [
      { range: "0-30 min", count: 15, percentage: 31.9 },
      { range: "30-60 min", count: 18, percentage: 38.3 },
      { range: "60-90 min", count: 10, percentage: 21.3 },
      { range: "90+ min", count: 4, percentage: 8.5 },
    ],
    weeklyProgress: [
      { week: "Week 1", recipes: 8, time: 420 },
      { week: "Week 2", recipes: 6, time: 380 },
      { week: "Week 3", recipes: 9, time: 520 },
      { week: "Week 4", recipes: 7, time: 450 },
    ],
    monthlyTrends: [
      { month: "Jan", recipes: 25, time: 1500 },
      { month: "Feb", recipes: 22, time: 1340 },
      { month: "Mar", recipes: 28, time: 1680 },
      { month: "Apr", recipes: 30, time: 1820 },
    ],
    topIngredients: [
      { ingredient: "Chicken", count: 15, percentage: 31.9 },
      { ingredient: "Rice", count: 12, percentage: 25.5 },
      { ingredient: "Tomatoes", count: 10, percentage: 21.3 },
      { ingredient: "Onions", count: 9, percentage: 19.1 },
      { ingredient: "Garlic", count: 8, percentage: 17.0 },
    ],
    cookingGoals: {
      weeklyRecipes: 8,
      weeklyTime: 480,
      monthlyVariety: 15,
      currentWeekRecipes: 6,
      currentWeekTime: 380,
      currentMonthVariety: 12,
    },
    achievements: [
      {
        name: "First Recipe",
        description: "Cooked your first recipe",
        earned: "2024-01-15",
        icon: "🥘",
      },
      {
        name: "Week Warrior",
        description: "Cooked 7 days in a row",
        earned: "2024-02-10",
        icon: "🔥",
      },
      {
        name: "Cuisine Explorer",
        description: "Tried 5 different cuisines",
        earned: "2024-03-05",
        icon: "🌍",
      },
      {
        name: "Time Master",
        description: "Spent 10 hours cooking",
        earned: "2024-03-20",
        icon: "⏰",
      },
    ],
  });

  const loadAnalytics = useCallback(() => {
    setLoading(true);
    try {
      if (isDemoUser) {
        setAnalytics(getDemoAnalytics());
      } else {
        // Load from localStorage
        const savedAnalytics = JSON.parse(
          localStorage.getItem(`analytics_${currentUser?.uid}`) || "null",
        );
        setAnalytics(savedAnalytics);
      }
    } catch (error) {
      console.error("Error loading analytics:", error);
      setAnalytics(null);
    }
    setLoading(false);
  }, [currentUser, isDemoUser]);

  useEffect(() => {
    if (currentUser) {
      loadAnalytics();
    }
  }, [currentUser, timeRange, loadAnalytics]);

  const formatTime = (minutes: number): string => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  const getProgressPercentage = (current: number, target: number): number => {
    return Math.min((current / target) * 100, 100);
  };

  const getProgressColor = (percentage: number): string => {
    if (percentage >= 80) return "text-green-500";
    if (percentage >= 60) return "text-yellow-500";
    if (percentage >= 40) return "text-orange-500";
    return "text-red-500";
  };

  const getProgressBgColor = (percentage: number): string => {
    if (percentage >= 80) return "bg-green-100 dark:bg-green-900";
    if (percentage >= 60) return "bg-yellow-100 dark:bg-yellow-900";
    if (percentage >= 40) return "bg-orange-100 dark:bg-orange-900";
    return "bg-red-100 dark:bg-red-900";
  };

  if (!currentUser) {
    return (
      <div
        className={`text-center py-8 ${
          darkMode ? "text-gray-300" : "text-gray-600"
        }`}
      >
        Please log in to view your cooking analytics.
      </div>
    );
  }

  if (loading) {
    return (
      <div
        className={`text-center py-8 ${
          darkMode ? "text-gray-300" : "text-gray-600"
        }`}
      >
        Loading analytics...
      </div>
    );
  }

  if (!analytics) {
    return (
      <div
        className={`text-center py-8 ${
          darkMode ? "text-gray-300" : "text-gray-600"
        }`}
      >
        No analytics data available.
      </div>
    );
  }

  return (
    <div
      className={`space-y-4 p-4 sm:p-6 rounded-lg ${
        darkMode
          ? "bg-gradient-to-br from-slate-900 to-gray-900 border border-slate-700 text-gray-100"
          : "bg-gradient-to-br from-slate-50 to-gray-50 border border-slate-200 text-gray-800"
      }`}
    >
      <div
        className={`rounded-lg p-4 ${
          darkMode
            ? "bg-slate-800/50 border border-slate-600"
            : "bg-white/80 border border-slate-300"
        }`}
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold">Cooking Analytics</h3>
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className={`px-3 py-1 rounded-lg text-sm ${
              darkMode
                ? "bg-slate-700 border-slate-500 text-white"
                : "bg-white border-slate-300 text-gray-800"
            }`}
          >
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="year">This Year</option>
            <option value="all">All Time</option>
          </select>
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
          <div
            className={`text-center p-4 rounded-lg ${
              darkMode ? "bg-slate-700/50" : "bg-slate-100"
            }`}
          >
            <div className="text-2xl font-bold text-slate-600 dark:text-slate-400">
              {analytics.totalRecipes || 0}
            </div>
            <div className="text-sm text-slate-600 dark:text-slate-300">
              Total Recipes
            </div>
          </div>
          <div
            className={`text-center p-4 rounded-lg ${
              darkMode ? "bg-slate-700/50" : "bg-slate-100"
            }`}
          >
            <div className="text-2xl font-bold text-slate-600 dark:text-slate-400">
              {formatTime(analytics.totalCookingTime || 0)}
            </div>
            <div className="text-sm text-slate-600 dark:text-slate-300">
              Total Time
            </div>
          </div>
          <div
            className={`text-center p-4 rounded-lg ${
              darkMode ? "bg-slate-700/50" : "bg-slate-100"
            }`}
          >
            <div className="text-2xl font-bold text-slate-600 dark:text-slate-400">
              {analytics.averageRating || 0}
            </div>
            <div className="text-sm text-slate-600 dark:text-slate-300">
              Avg Rating
            </div>
          </div>
          <div
            className={`text-center p-4 rounded-lg ${
              darkMode ? "bg-slate-700/50" : "bg-slate-100"
            }`}
          >
            <div className="text-2xl font-bold text-slate-600 dark:text-slate-400">
              {analytics.favoriteCuisines?.length || 0}
            </div>
            <div className="text-sm text-slate-600 dark:text-slate-300">
              Cuisines Tried
            </div>
          </div>
        </div>

        {/* Cooking Goals Progress */}
        {analytics.cookingGoals && (
          <div className="mb-6">
            <h4 className="font-medium mb-3">Cooking Goals Progress</h4>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>
                    Weekly Recipes ({analytics.cookingGoals.currentWeekRecipes}/
                    {analytics.cookingGoals.weeklyRecipes})
                  </span>
                  <span
                    className={getProgressColor(
                      getProgressPercentage(
                        analytics.cookingGoals.currentWeekRecipes,
                        analytics.cookingGoals.weeklyRecipes,
                      ),
                    )}
                  >
                    {Math.round(
                      getProgressPercentage(
                        analytics.cookingGoals.currentWeekRecipes,
                        analytics.cookingGoals.weeklyRecipes,
                      ),
                    )}
                    %
                  </span>
                </div>
                <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${getProgressBgColor(
                      getProgressPercentage(
                        analytics.cookingGoals.currentWeekRecipes,
                        analytics.cookingGoals.weeklyRecipes,
                      ),
                    )}`}
                    style={{
                      width: `${getProgressPercentage(
                        analytics.cookingGoals.currentWeekRecipes,
                        analytics.cookingGoals.weeklyRecipes,
                      )}%`,
                    }}
                  ></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>
                    Weekly Time (
                    {formatTime(analytics.cookingGoals.currentWeekTime)}/
                    {formatTime(analytics.cookingGoals.weeklyTime)})
                  </span>
                  <span
                    className={getProgressColor(
                      getProgressPercentage(
                        analytics.cookingGoals.currentWeekTime,
                        analytics.cookingGoals.weeklyTime,
                      ),
                    )}
                  >
                    {Math.round(
                      getProgressPercentage(
                        analytics.cookingGoals.currentWeekTime,
                        analytics.cookingGoals.weeklyTime,
                      ),
                    )}
                    %
                  </span>
                </div>
                <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${getProgressBgColor(
                      getProgressPercentage(
                        analytics.cookingGoals.currentWeekTime,
                        analytics.cookingGoals.weeklyTime,
                      ),
                    )}`}
                    style={{
                      width: `${getProgressPercentage(
                        analytics.cookingGoals.currentWeekTime,
                        analytics.cookingGoals.weeklyTime,
                      )}%`,
                    }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Favorite Cuisines */}
        {analytics.favoriteCuisines &&
          analytics.favoriteCuisines.length > 0 && (
            <div className="mb-6">
              <h4 className="font-medium mb-3">Favorite Cuisines</h4>
              <div className="space-y-2">
                {analytics.favoriteCuisines
                  .slice(0, 5)
                  .map((cuisine: CuisineStat, index: number) => (
                    <div
                      key={index}
                      className="flex items-center justify-between"
                    >
                      <span className="text-sm">{cuisine.cuisine}</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-24 bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                          <div
                            className="h-2 bg-slate-500 dark:bg-slate-400 rounded-full"
                            style={{ width: `${cuisine.percentage}%` }}
                          ></div>
                        </div>
                        <span className="text-xs text-slate-600 dark:text-slate-300 w-8">
                          {cuisine.count}
                        </span>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          )}

        {/* Difficulty Breakdown */}
        {analytics.difficultyBreakdown &&
          analytics.difficultyBreakdown.length > 0 && (
            <div className="mb-6">
              <h4 className="font-medium mb-3">Difficulty Breakdown</h4>
              <div className="grid grid-cols-3 gap-4">
                {analytics.difficultyBreakdown.map(
                  (item: DifficultyStat, index: number) => (
                    <div
                      key={index}
                      className={`text-center p-3 rounded-lg ${
                        darkMode ? "bg-slate-700/50" : "bg-slate-100"
                      }`}
                    >
                      <div className="text-lg font-bold text-slate-600 dark:text-slate-400">
                        {item.count}
                      </div>
                      <div className="text-sm text-slate-600 dark:text-slate-300">
                        {item.difficulty}
                      </div>
                      <div className="text-xs text-slate-500 dark:text-slate-400">
                        {item.percentage}%
                      </div>
                    </div>
                  ),
                )}
              </div>
            </div>
          )}

        {/* Top Ingredients */}
        {analytics.topIngredients && analytics.topIngredients.length > 0 && (
          <div className="mb-6">
            <h4 className="font-medium mb-3">Most Used Ingredients</h4>
            <div className="space-y-2">
              {analytics.topIngredients
                .slice(0, 5)
                .map((ingredient: IngredientStat, index: number) => (
                  <div
                    key={index}
                    className="flex items-center justify-between"
                  >
                    <span className="text-sm">{ingredient.ingredient}</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-20 bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                        <div
                          className="h-2 bg-slate-500 dark:bg-slate-400 rounded-full"
                          style={{ width: `${ingredient.percentage}%` }}
                        ></div>
                      </div>
                      <span className="text-xs text-slate-600 dark:text-slate-300 w-6">
                        {ingredient.count}
                      </span>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* Achievements */}
        {analytics.achievements && analytics.achievements.length > 0 && (
          <div className="mb-6">
            <h4 className="font-medium mb-3">Recent Achievements</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {analytics.achievements.map(
                (achievement: Achievement, index: number) => (
                  <div
                    key={index}
                    className={`p-3 rounded-lg border ${
                      darkMode
                        ? "bg-slate-700/50 border-slate-500"
                        : "bg-slate-100 border-slate-300"
                    }`}
                  >
                    <div className="flex items-center space-x-2">
                      <span className="text-xl">{achievement.icon}</span>
                      <div>
                        <div className="font-medium text-sm">
                          {achievement.name}
                        </div>
                        <div className="text-xs text-slate-600 dark:text-slate-300">
                          {achievement.description}
                        </div>
                        <div className="text-xs text-slate-500 dark:text-slate-400">
                          Earned: {achievement.earned}
                        </div>
                      </div>
                    </div>
                  </div>
                ),
              )}
            </div>
          </div>
        )}

        {/* Weekly Progress Chart */}
        {analytics.weeklyProgress && analytics.weeklyProgress.length > 0 && (
          <div className="mb-6">
            <h4 className="font-medium mb-3">Weekly Progress</h4>
            <div className="space-y-2">
              {analytics.weeklyProgress.map(
                (week: WeeklyProgress, index: number) => (
                  <div
                    key={index}
                    className="flex items-center justify-between"
                  >
                    <span className="text-sm">{week.week}</span>
                    <div className="flex items-center space-x-4">
                      <span className="text-xs text-slate-600 dark:text-slate-300">
                        {week.recipes} recipes
                      </span>
                      <span className="text-xs text-slate-600 dark:text-slate-300">
                        {formatTime(week.time)}
                      </span>
                    </div>
                  </div>
                ),
              )}
            </div>
          </div>
        )}

        {/* Insights */}
        <div className="p-4 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700">
          <h4 className="font-medium mb-2 text-slate-800 dark:text-slate-200">
            Cooking Insights:
          </h4>
          <ul className="text-sm text-slate-700 dark:text-slate-300 space-y-1">
            <li>
              • Your favorite cuisine is{" "}
              {analytics.favoriteCuisines?.[0]?.cuisine || "Italian"}
            </li>
            <li>
              • You prefer{" "}
              {analytics.difficultyBreakdown?.[0]?.difficulty || "Easy"} recipes
            </li>
            <li>
              • Average cooking time:{" "}
              {formatTime(
                Math.round(
                  (analytics.totalCookingTime || 0) /
                    (analytics.totalRecipes || 1),
                ),
              )}
            </li>
            <li>
              • You&apos;ve earned {analytics.achievements?.length || 0}{" "}
              achievements
            </li>
            <li>• Don&apos;t forget to log your meals for better analytics</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CookingAnalytics;

