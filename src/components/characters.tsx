"use client";

import React from "react";
import Card from "@/components/card";
import styles from "@/styles/components/characters.module.scss";
import { CharactersProps } from "@/utils/interfaces";

const Characters = ({ characters }: CharactersProps) => {
  return (
    <section className={styles.characters}>
      {characters?.map((character) => {
        const { id, name, imagePath } = character;

        return (
          <Card
            key={`character_${id}`}
            link={`/character/${id}`}
            name={name}
            id={id}
            imagePath={imagePath}
            isMain={false}
          />
        );
      })}
    </section>
  );
};

export default Characters;
