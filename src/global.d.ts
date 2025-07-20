// Global type definitions for the recipe app

// Recipe types
export interface Recipe {
  idMeal: string;
  strMeal: string;
  strCategory: string;
  strArea: string;
  strInstructions: string;
  strMealThumb: string;
  strTags?: string;
  strYoutube?: string;
  strSource?: string;
  strImageSource?: string;
  strCreativeCommonsConfirmed?: string;
  dateModified?: string;
  [key: string]: string | undefined;
}

// User types
export interface User {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  premium?: boolean;
  [key: string]: unknown;
}

// Auth context types
export interface AuthContextType {
  currentUser: User | null;
  signup: (
    email: string,
    password: string,
    displayName?: string,
  ) => Promise<unknown>;
  login: (email: string, password: string) => Promise<unknown>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  loading: boolean;
  error: string | null;
  clearError: () => void;
  handleDemoLogin: (demoUser: User) => void;
  isDemoUser: boolean;
  updateUserProfile?: (profile: Partial<User>) => Promise<void>;
}

// Nutrition types
export interface NutritionData {
  Calories?: string;
  Protein?: string;
  Carbohydrates?: string;
  Fat?: string;
  Fiber?: string;
  Sugar?: string;
  Sodium?: string;
  [key: string]: string | undefined;
}

// Review types
export interface Review {
  id: string;
  recipeId: string;
  recipeName: string;
  userName: string;
  rating: number;
  comment?: string;
  timestamp: string;
  likes: number;
  helpful: number;
  difficulty?: number;
  cookingTime?: string;
  modifications?: string;
}

// User Profile types
export interface UserProfileData {
  displayName: string;
  dailyCalories: number;
  proteinGoal: number;
  carbsGoal: number;
  fatGoal: number;
  dietaryRestrictions: string[];
  favoriteCuisines: string[];
}

// Dark Mode context types
export interface DarkModeContextType {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

// Modal context types
export interface ModalContextType {
  openModal: (modalType: string) => void;
  closeModal: () => void;
  isModalOpen: boolean;
  modalType: string | null;
  notificationsCount: number;
}

// Shopping List types
export interface ShoppingListItem {
  id: string;
  name: string;
  quantity: string;
  category: string;
  completed: boolean;
}

// Meal types
export interface Meal {
  id?: number;
  name: string;
  ingredients: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  [key: string]: unknown;
}

// Nutrition Goals types
export interface NutritionGoals {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;
  sugar: number;
  sodium: number;
}

// Global window extensions
declare global {
  interface Window {
    __vite_plugin_react_router_prefetch?: (path: string) => void;
  }
}
