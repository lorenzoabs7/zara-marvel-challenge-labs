import type { Metadata } from "next";
import React from "react";
import { Roboto_Condensed } from "next/font/google";
import "@/styles/global.css";
import { Providers } from "@/contexts/providers";
import NavBar from "@/components/navBar";

const robotoCondensed = Roboto_Condensed({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Marvel Universe - LABS",
  description: "Created by Lorenzo Arian Blanda Serrano for Zara Web Challenge",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={robotoCondensed.className}>
        <Providers>
          <NavBar />
          {children}
        </Providers>
      </body>
    </html>
  );
}
