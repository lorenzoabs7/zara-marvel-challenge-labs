"use client";

import React from "react";
import styles from "@/styles/components/comic.module.scss";
import Image from "next/image";
import { ComicComponentProps } from "@/utils/interfaces";

const Comic = ({ name, imagePath, saleYear }: ComicComponentProps) => {
  const COMIC_WIDTH = 180; // defined in _variables aswell
  return (
    <div
      className={styles.comic}
      key={`comic_${imagePath}`}
      aria-labelledby={`comic-title-${name}`}
    >
      <Image
        width={COMIC_WIDTH}
        height={(COMIC_WIDTH * 3) / 2}
        src={imagePath}
        alt={name}
        role="img"
      />
      <h2 id={`comic-title-${name}`} className={styles.name}>
        {name}
      </h2>
      <p className={styles.saleYear}>{saleYear}</p>
    </div>
  );
};

export default Comic;
