import { FavoriteItem, FavoritesContextType } from "@/utils/interfaces";
import React, { createContext, useContext, useState, useEffect } from "react";

const FavoritesContext = createContext<FavoritesContextType>({
  favorites: [],
  addFavorite: () => {},
  removeFavorite: () => {},
});

export const useFavorites = () => useContext(FavoritesContext);

const FAVORITES = "favorites";

export const FavoritesProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedFavorites = localStorage.getItem(FAVORITES);
      if (storedFavorites) {
        setFavorites(JSON.parse(storedFavorites));
      }
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined" && favorites.length) {
      localStorage.setItem(FAVORITES, JSON.stringify(favorites));
    }
  }, [favorites]);

  const addFavorite = (item: FavoriteItem) => {
    setFavorites((prevFavorites) => {
      return prevFavorites.some((fav) => fav.id === item.id)
        ? prevFavorites
        : [...prevFavorites, item];
    });
  };

  const removeFavorite = (id: number) => {
    setFavorites((prevFavorites) =>
      prevFavorites.filter((item) => item.id !== id)
    );
  };

  return (
    <FavoritesContext.Provider
      value={{ favorites, addFavorite, removeFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};
