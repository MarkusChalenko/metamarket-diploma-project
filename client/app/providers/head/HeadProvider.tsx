import Head from "next/head";
import { default as NextProgressBar } from "nextjs-progressbar";
import { FC } from "react";

import { primaryColor } from "@/configs/constants";

import { FavIcons } from "./FavIcons";
import { IHeadProvider } from "./headProvider.interface";

export const HeadProvider: FC<IHeadProvider> = ({ children }): JSX.Element => {
  return (
    <>
      <NextProgressBar
        color={primaryColor}
        startPosition={0.3}
        stopDelayMs={200}
        height={3}
      />
      <Head>
        <FavIcons />
      </Head>
      {children}
    </>
  );
};
