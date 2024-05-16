import Head from "next/head";
import { useRouter } from "next/router";
import { FC } from "react";

import { siteName, titleMerge } from "@/configs/meta.config";

import { clearDescription } from "../string/clearDescription";

import { IMeta } from "./meta.interface";

export const Meta: FC<IMeta> = ({
  title,
  description,
  image,
  children,
}): JSX.Element => {
  const { asPath } = useRouter();
  const currentUrl = `${process.env.APP_URL}${asPath}`;

  return (
    <>
      <Head>
        <title>{titleMerge(title)}</title>
        {description ? (
          <>
            <meta name="description" content={clearDescription(description)} />
            <link rel="canonical" href={currentUrl} />
            <meta name="keywords" content="nft, metamarket, unique things" />

            <meta property="og:site_name" content={siteName} />
            <meta property="og:title" content={titleMerge(title)} />
            <meta
              property="og:description"
              content={clearDescription(description, 197)}
            />
            <meta property="og:url" content={currentUrl} />
            <meta property="og:image" content={image} />
          </>
        ) : (
          <meta name="robots" content="noindex, nofollow" />
        )}
      </Head>
      {children}
    </>
  );
};
