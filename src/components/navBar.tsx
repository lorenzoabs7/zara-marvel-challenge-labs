"use client";

import React from "react";
import styles from "@/styles/components/navBar.module.scss";
import favSelected from "@/assets/favSelected.svg";
import marvelLogo from "@/assets/marvelLogo.png";
import Image from "next/image";
import { useFavorites } from "@/contexts/favorites";
import Link from "next/link";

const NavBar = () => {
  const { favorites } = useFavorites();

  const FAVORITE_SIZE = 24;

  return (
    <header className={styles.navBar}>
      <Link href={"/"}>
        <Image
          className={styles.logo}
          src={marvelLogo}
          alt="Marvel Logo"
          priority
        />
      </Link>
      <Link className={styles.favoriteContainer} href={"/favorites"}>
        <Image
          width={FAVORITE_SIZE}
          height={FAVORITE_SIZE}
          className={styles.favoriteIcon}
          src={favSelected}
          alt="❤️"
        />
        <span>{favorites?.length}</span>
      </Link>
    </header>
  );
};

export default NavBar;
