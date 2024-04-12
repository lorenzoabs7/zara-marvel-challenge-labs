import { Metadata } from "next";

export async function generateMetadata({ params }: CharacterComponentProps): Promise<Metadata> {
  const { id } = params;
  const character = await getCharacter(id);
  const { name } = character as CharacterProps;

  return {
    title: name ? `${name} | Marvel Universe -` : "Marvel Character",
    description: `Learn more about ${name} and their comics.`,
  };
}

import React from "react";
import styles from "@/styles/pages/character.module.scss";
import {
  CharacterProps,
  CharacterComponentProps,
} from "@/utils/interfaces";
import Card from "@/components/card";
import Comics from "@/components/comics";
import { getCharacter, getComics } from "@/api/apiUtils";


const Character = async ({ params }: CharacterComponentProps) => {
  const { id } = params;
  const character = await getCharacter(id);
  const comics = await getComics(id);
  const { name, imagePath, description } = character as CharacterProps;

  return (
    <div className={styles.character}>
      <Card
        key={`character_${id}`}
        link={`/character/${id}`}
        name={name}
        id={Number(id)}
        imagePath={imagePath}
        isMain={true}
        description={description}
      />
      <Comics comics={comics} />
    </div>
  );
};

export default Character;
