import { useState, useCallback, useEffect } from "react";

export interface Recipe {
  idMeal?: string;
  id?: string;
  recipeId?: string;
  strMeal?: string;
  title?: string;
  strMealThumb?: string;
  image?: string;
  strInstructions?: string;
  description?: string;
  cookTime?: string;
  strCookTime?: string;
  rating?: string;
  strRating?: string;
  strCategory?: string;
  category?: string;
  [key: string]: unknown;
}

export interface User {
  uid?: string;
  demoData?: {
    favorites?: Recipe[];
  };
  isDemoUser?: boolean;
  [key: string]: unknown;
}

function normalizeFavorite(recipe: Recipe) {
  return {
    id: recipe.idMeal || recipe.id || recipe.recipeId,
    title: recipe.strMeal || recipe.title || "Untitled Recipe",
    image: recipe.strMealThumb || recipe.image || "",
    description:
      recipe.strInstructions?.slice(0, 120) ||
      recipe.description ||
      "No description available.",
    cookTime: recipe.cookTime || recipe.strCookTime || "-",
    rating: recipe.rating || recipe.strRating || "-",
    category: recipe.strCategory || recipe.category || "Other",
    // Keep all original fields for detail page
    ...recipe,
  };
}

export function useFavorites(
  currentUser: User | null,
  selected: Recipe | null,
  isDemoUser: boolean,
) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [favoriteLoading, setFavoriteLoading] = useState(false);

  // Migrate old favorites to normalized format
  const migrateFavorites = useCallback(() => {
    if (!currentUser) return;
    const key = isDemoUser ? "demoUser" : `favorites_${currentUser.uid}`;
    let favorites: Recipe[] = [];
    if (isDemoUser) {
      favorites = currentUser.demoData?.favorites || [];
    } else {
      favorites = JSON.parse(localStorage.getItem(key) || "[]");
    }
    const normalized = favorites.map(normalizeFavorite);
    if (isDemoUser) {
      const updatedDemoUser = {
        ...currentUser,
        demoData: {
          ...currentUser.demoData,
          favorites: normalized,
        },
      };
      localStorage.setItem("demoUser", JSON.stringify(updatedDemoUser));
    } else {
      localStorage.setItem(key, JSON.stringify(normalized));
    }
  }, [currentUser, isDemoUser]);

  useEffect(() => {
    migrateFavorites();
  }, []);

  const checkIfFavorite = useCallback(() => {
    if (!currentUser || !selected) return;

    if (isDemoUser) {
      const demoFavorites = currentUser.demoData?.favorites || [];
      const isInFavorites = demoFavorites.some(
        (fav: Recipe) => fav.id === (selected.idMeal || selected.id),
      );
      setIsFavorite(isInFavorites);
    } else {
      const userFavorites: Recipe[] = JSON.parse(
        localStorage.getItem(`favorites_${currentUser.uid}`) || "[]",
      );
      const isInFavorites = userFavorites.some(
        (fav: Recipe) => fav.id === (selected.idMeal || selected.id),
      );
      setIsFavorite(isInFavorites);
    }
  }, [currentUser, selected, isDemoUser]);

  useEffect(() => {
    if (selected && currentUser) {
      checkIfFavorite();
    }
  }, [selected, currentUser, checkIfFavorite]);

  const toggleFavorite = async () => {
    if (!currentUser) {
      alert("Please log in to save favorites");
      return;
    }
    setFavoriteLoading(true);
    try {
      if (isDemoUser) {
        const demoFavorites = currentUser.demoData?.favorites || [];
        let updatedFavorites;
        if (isFavorite) {
          updatedFavorites = demoFavorites.filter(
            (fav: Recipe) => fav.id !== (selected?.idMeal || selected?.id),
          );
        } else {
          updatedFavorites = [...demoFavorites, normalizeFavorite(selected!)];
        }
        const updatedDemoUser = {
          ...currentUser,
          demoData: {
            ...currentUser.demoData,
            favorites: updatedFavorites,
          },
        };
        localStorage.setItem("demoUser", JSON.stringify(updatedDemoUser));
        setIsFavorite(!isFavorite);
      } else {
        const key = `favorites_${currentUser.uid}`;
        const userFavorites: Recipe[] = JSON.parse(
          localStorage.getItem(key) || "[]",
        );
        let updatedFavorites;
        if (isFavorite) {
          updatedFavorites = userFavorites.filter(
            (fav: Recipe) => fav.id !== (selected?.idMeal || selected?.id),
          );
        } else {
          updatedFavorites = [...userFavorites, normalizeFavorite(selected!)];
        }
        localStorage.setItem(key, JSON.stringify(updatedFavorites));
        setIsFavorite(!isFavorite);
      }
    } catch (error) {
      console.error("Error updating favorites:", error);
    } finally {
      setFavoriteLoading(false);
    }
  };

  return { isFavorite, favoriteLoading, toggleFavorite, checkIfFavorite };
}
