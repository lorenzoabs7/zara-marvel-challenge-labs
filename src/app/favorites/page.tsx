"use client";

import React, { Suspense } from "react";
import Characters from "@/components/characters";
import styles from "@/styles/pages/favorites.module.scss";
import { SearchBarPages, SearchBarSearchParams } from "@/utils/interfaces";
import { useSearchParams } from "next/navigation";
import { useSearchFavorites } from "@/utils/searchUtils";
import SearchBar from "@/components/searchBar";

const Favorites = () => {
  return (
    <div className={styles.favorites}>
      <h2 className={styles.favoriteTitle}>FAVORITES</h2>
      <SearchBar
        page={SearchBarPages.FAVORITES}
        searchParam={SearchBarSearchParams.NAME}
      />
      <Suspense fallback={<div>Loading...</div>}>
        <FavoritesContent />
      </Suspense>
    </div>
  );
};

const FavoritesContent = () => {
  const searchParams = useSearchParams();
  const search = searchParams.get(SearchBarSearchParams.NAME) || "";
  const characters = useSearchFavorites(search);

  return (
    <Characters characters={characters} />
  );
};

export default Favorites;