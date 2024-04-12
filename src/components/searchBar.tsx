"use client";

import React, { ChangeEvent, useEffect, useState } from "react";
import styles from "@/styles/components/searchBar.module.scss";
import Image from "next/image";
import magnifier from "@/assets/magnifier.svg";
import { useRouter } from "next/navigation";
import { useDebounce } from "use-debounce";
import { SearchBarPages, SearchBarParams } from "@/utils/interfaces";
import { useCharacters } from "@/contexts/characters";
import {
  searchBarFunctionality,
  useSearchFavorites,
} from "@/utils/searchUtils";

const SearchBar = ({ page = "", searchParam = "" }: SearchBarParams) => {
  const { characters, getCharacters } = useCharacters();
  const router = useRouter();

  const [searchQuery, setSearchQuery] = useState("");
  const [query] = useDebounce(searchQuery, 1000);
  const MAGNIFIER = 14;

  const useFilteredFavoritesLength = useSearchFavorites(query)?.length;
  const useCounter = () => {
    switch (page) {
    case SearchBarPages.CHARACTERS:
      return characters?.length || 0;
    case SearchBarPages.FAVORITES:
      return useFilteredFavoritesLength || 0;
    default:
      return "";
    }
  };

  useEffect(() => {
    searchBarFunctionality({ query, page, searchParam, getCharacters, router });
  }, [query, page, searchParam, getCharacters, router]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    getCharacters(page, searchQuery);
    router.push(`/${page}?${searchParam}=${searchQuery}`);
  };

  return (
    <div className={styles.searchBar}>
      <div className={styles.searchInputContainer}>
        <Image
          src={magnifier}
          alt="find"
          width={MAGNIFIER}
          height={MAGNIFIER}
        />
        <form className={styles.formSearchInput} onSubmit={handleSubmit}>
          <input
            type="text"
            className={styles.searchInput}
            placeholder="SEARCH A CHARACTER..."
            value={searchQuery}
            onSubmit={handleSubmit}
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              setSearchQuery(event.target.value)
            }
          />
        </form>
      </div>
      <hr className={styles.divider} />
      <div className={styles.resultCount}>{useCounter()} RESULTS</div>
    </div>
  );
};

export default SearchBar;
