/* eslint-disable @typescript-eslint/no-unused-vars */

import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export interface CharacterMin {
  id: number;
  name: string;
  description: string;
  imagePath: string;
}

export interface Dates {
  type: string;
  date: string;
}
export interface CharacterProps extends CharacterMin {
  modified: string;
  thumbnail: {
    path: string;
    extension: string;
  };
  resourceURI: string;
  comics: Collection;
  series: Collection;
  stories: Collection;
  events: Collection;
  urls: Url[];
}

export interface ComicProps {
  modified: string;
  thumbnail: {
    path: string;
    extension: string;
  };
  resourceURI: string;
  comics: Collection;
  series: Collection;
  stories: Collection;
  events: Collection;
  urls: Url[];
  dates: Dates[];
  title: string;
  imagePath: string;
  saleYear: string;
}

export interface ComicsComponentProps {
  comics: ComicProps[];
}
interface Collection {
  available: number;
  collectionURI: string;
  items: Summary[];
  returned: number;
}

interface Url {
  type: string;
  url: string;
}

interface Summary {
  resourceURI: string;
  name: string;
  type?: string;
}

export interface CardProps {
  link: string;
  name: string;
  id: number;
  imagePath: string;
  isMain: boolean;
  description?: string;
}

export interface ComicComponentProps {
  name: string;
  imagePath: string;
  saleYear: string;
}

interface FavoritesItem {
  link: string;
  name: string;
  id: number;
  imagePath: string;
}

export interface CharactersProps {
  characters: CharacterProps[] | FavoritesItem[];
}

export interface SearchBarParams {
  page?: string;
  searchParam?: string;
}

export interface FavoriteItem {
  id: number;
  link: string;
  name: string;
  imagePath: string;
}

export interface FavoritesContextType {
  favorites: FavoriteItem[];
  addFavorite: (item: FavoriteItem) => void;
  removeFavorite: (id: number) => void;
}

export interface CharactersContextType {
  characters: CharacterProps[];
  getCharacters: (path: string, query: string) => void;
  loading: boolean;
  setLoading: (bool: boolean) => void;
}

export interface searchBarFunctionalityProps {
  query: string;
  page: string;
  searchParam: string;
  getCharacters: (path: string, query: string) => void;
  router: AppRouterInstance;
}

export interface CharacterComponentProps {
  params: {
    id: string;
  };
}

export enum SearchBarPages {
  CHARACTERS = "characters",
  FAVORITES = "favorites",
}

export enum SearchBarSearchParams {
  NAME = "name",
}
