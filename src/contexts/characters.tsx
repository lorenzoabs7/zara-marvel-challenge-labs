import React, { createContext, useContext, useState } from "react";
import { fetchList } from "@/api/marvelApi";
import { addCustomProps } from "@/utils/formatters";
import { CharacterProps, CharactersContextType } from "@/utils/interfaces";

const defaultContextValue: CharactersContextType = {
  characters: [],
  getCharacters: () => {},
  loading: false,
  setLoading: () => {},
};

const CharactersContext =
  createContext<CharactersContextType>(defaultContextValue);

export const useCharacters = () => useContext(CharactersContext);

const CACHE_DURATION = 3600000;

export const CharactersProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [charactersCache, setCharactersCache] = useState<{
    lastFetch: number;
    lastQuery: string;
    data: CharacterProps[];
  }>({
    lastFetch: 0,
    lastQuery: "",
    data: [],
  });

  const getCharacters = async (path = "", query = "") => {
    setLoading(true);
    const now = new Date().getTime();
    const isCacheValid = now - charactersCache.lastFetch < CACHE_DURATION;
    const isSameQuery = query === charactersCache.lastQuery;

    if (isCacheValid && isSameQuery) {
      setLoading(false);
      return;
    }

    try {
      if (!charactersCache?.data?.length && loading) {
        const data = await fetchList(true, path, query, 50, 0);

        if (data?.data?.results) {
          const characters = addCustomProps(data.data.results) as CharacterProps[];
          setCharactersCache({
            lastFetch: now,
            lastQuery: query,
            data: characters,
          });
        }
      }
    } catch (error) {
      console.error("Failed to fetch characters:", error);
      if (charactersCache.data.length !== 0) {
        setCharactersCache((prev) => ({ ...prev, data: [] }));
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <CharactersContext.Provider
      value={{
        characters: charactersCache.data,
        getCharacters,
        loading,
        setLoading,
      }}
    >
      {children}
    </CharactersContext.Provider>
  );
};
