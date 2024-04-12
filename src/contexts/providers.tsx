"use client";

import React from "react";
import { CharactersProvider } from "./characters";
import { FavoritesProvider } from "./favorites";

export const Providers: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <FavoritesProvider>
      <CharactersProvider>{children}</CharactersProvider>
    </FavoritesProvider>
  );
};
