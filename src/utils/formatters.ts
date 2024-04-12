import { CharacterProps, ComicProps } from "./interfaces";

export const addCustomProps = (
  items: CharacterProps[] | ComicProps[],
  addSaleYear?: boolean
) => {
  return items?.map((item) => {
    return {
      ...item,
      imagePath: `${item.thumbnail.path}.${item.thumbnail.extension}`,
      ...(addSaleYear
        ? {
          saleYear: new Date(
              (item as ComicProps)?.dates?.find(
                (date) => date.type === "onsaleDate"
              )?.date as string
          )?.getFullYear(),
        }
        : {}),
    };
  });
};
