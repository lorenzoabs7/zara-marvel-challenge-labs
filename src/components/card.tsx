"use client";

import React, { useState } from "react";
import styles from "@/styles/components/card.module.scss";
import favSelected from "@/assets/favSelected.svg";
import favSelectedHover from "@/assets/favSelectedHover.svg";
import favEmpty from "@/assets/favEmpty.svg";
import Image from "next/image";
import Link from "next/link";
import { useFavorites } from "@/contexts/favorites";
import { CardProps } from "@/utils/interfaces";

const Card = ({
  link,
  name,
  id,
  imagePath,
  isMain = false,
  description,
}: CardProps) => {
  const { favorites, addFavorite, removeFavorite } = useFavorites();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const isFavorite = Boolean(favorites?.find((fav) => fav.id === id));
  const onToggleFavorite = () => {
    return isFavorite
      ? removeFavorite(id)
      : addFavorite({ link, name, id, imagePath });
  };

  const CARD_SIZE = isMain ? 320 : 190; // defined in _variables aswell
  const FAVORITE_SIZE = isMain ? 24 : 12;

  const Markup = isMain ? "h1" : Link;
  return (
    <div
      className={`${styles.card} ${isMain ? styles.isMain : ""} ${
        isLoading ? styles.isLoading : ""
      }`}
      key={id}
    >
      <span className={styles.image}>
        <Link
          as={link}
          href={link}
          className={styles.name}
          aria-label={`View ${name}`}
        >
          <Image
            onClick={() => setIsLoading(true)}
            width={CARD_SIZE}
            height={CARD_SIZE}
            src={imagePath}
            alt={name}
            priority
            role="img"
          />
        </Link>
      </span>
      <div className={styles.contentContainer}>
        <div className={styles.content}>
          <Markup
            aria-labelledby={`character-${name}`}
            href={link}
            className={styles.name}
          >
            {isMain ? name.toUpperCase() : name}
          </Markup>

          <button
            aria-pressed={isFavorite}
            className={`${styles.favoriteButton} ${
              isFavorite ? styles.isFavorite : ""
            }`}
            onClick={onToggleFavorite}
          >
            {isFavorite ? (
              <>
                <Image
                  className={`${styles.favoriteIcon}`}
                  src={favSelected}
                  alt="❤️"
                  width={FAVORITE_SIZE}
                  height={FAVORITE_SIZE}
                />
                <Image
                  className={`${styles.favoriteIcon} ${styles.favoriteIcon__hovered}`}
                  src={favSelectedHover}
                  alt="❤️"
                  width={FAVORITE_SIZE}
                  height={FAVORITE_SIZE}
                />
              </>
            ) : (
              <Image
                className={styles.favoriteIcon}
                src={favEmpty}
                alt="♡"
                width={FAVORITE_SIZE}
                height={FAVORITE_SIZE}
              />
            )}
          </button>
        </div>
        {!!description && (
          <div className={styles.description}>{description}</div>
        )}
      </div>
    </div>
  );
};

export default Card;
