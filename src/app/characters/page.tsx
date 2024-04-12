"use client";

import React from "react";
import Characters from "@/components/characters";
import styles from "@/styles/pages/characters.module.scss";
import SearchBar from "@/components/searchBar";
import { useCharacters } from "@/contexts/characters";
import Loader from "@/components/loader";
import { SearchBarPages, SearchBarSearchParams } from "@/utils/interfaces";

const CharactersContainer = () => {
  const { characters, loading } = useCharacters();

  return (
    <>
      {!!loading && <Loader />}
      <div className={styles.characters}>
        <SearchBar
          page={SearchBarPages.CHARACTERS}
          searchParam={SearchBarSearchParams.NAME}
        />
        <Characters characters={characters} />
      </div>
    </>
  );
};

export default CharactersContainer;
