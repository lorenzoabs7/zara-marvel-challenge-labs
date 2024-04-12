import { useFavorites } from "@/contexts/favorites";
import { searchBarFunctionalityProps, SearchBarPages } from "./interfaces";
export const searchBarFunctionality = ({
  query,
  page,
  searchParam,
  getCharacters,
  router,
}: searchBarFunctionalityProps) => {
  const isCharacters = page === SearchBarPages.CHARACTERS;
  if (isCharacters) {
    getCharacters(page, query);
  }
  router.push(`/${page}${query ? `?${searchParam}=${query}` : ""}`);
};

export const useSearchFavorites = (query: string = "") => {
  const { favorites } = useFavorites();

  return favorites.filter((item) => {
    return query ? item.name.toLowerCase().includes(query.toLowerCase()) : true;
  });
};
