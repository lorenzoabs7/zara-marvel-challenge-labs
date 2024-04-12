import { addCustomProps } from "@/utils/formatters";
import { fetchCharacterById, fetchList } from "./marvelApi";
import { CharacterProps, ComicProps } from "@/utils/interfaces";

export const getCharacter = async (id: string = "") => {
  if (id) {
    const data = await fetchCharacterById(false, id);
    return addCustomProps(data?.data?.results)[0] as CharacterProps;
  } 
  return [];
};

export const getComics = async (id: string) => {
  const data = await fetchList(false, `/characters/${id}/comics`, "", 20, 0);
  return addCustomProps(data?.data?.results, true) as ComicProps[];
};
