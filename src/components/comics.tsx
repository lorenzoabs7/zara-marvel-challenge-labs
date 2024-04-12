"use client";

import React from "react";
import styles from "@/styles/components/comics.module.scss";
import { ComicsComponentProps } from "@/utils/interfaces";
import Comic from "./comic";

const Comics = ({ comics }: ComicsComponentProps) => {
  return (
    <section className={styles.comics}>
      <div className={styles.comicsContainer}>
        <h2 className={styles.comicsTitle}>COMICS</h2>

        <div className={styles.scrollableComics}>
          {comics?.length ? comics.map((comic) => {
            const { saleYear, title, imagePath } = comic;

            return (
              <Comic
                key={`comic_${title}`}
                name={title}
                imagePath={imagePath}
                saleYear={saleYear || ""}
              />
            );
          }) : <p>No Comics found for this character</p>}
        </div>
      </div>
    </section>
  );
};

export default Comics;
