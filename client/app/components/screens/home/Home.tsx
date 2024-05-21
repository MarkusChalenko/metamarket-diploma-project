import Image from "next/image";
import { useRouter } from "next/router";
import { FC, useEffect, useState } from "react";
import { toastr } from "react-redux-toastr";

import { Button } from "@/components/ui/button/Button";

import Catalog from "@/components/catalog/Catalog"
import { SearchBar } from "@/components/searchBar/SearchBar"
import { MiniProductCard } from "@/components/product/MiniProductCard"

import { Meta } from "@/utils/meta/Meta";

import { MainBanner } from "./banner/MainBanner"

import mainImage from "@/assets/images/main.jpg";

import styles from "./Home.module.scss";
import {Product} from "@/components/product/Products";

export const Home: FC = (): JSX.Element => {
  const { push } = useRouter();

  return (
    <Meta title="Home page" description="Discover, collect, and sell extraordinary NFTs">
      <Catalog />
      <div className={styles.container}>
        <MainBanner/>
        <Product />
      </div>
    </Meta>
  );
};

