import Image from "next/image";
import { useRouter } from "next/router";
import { FC } from "react";
import { toastr } from "react-redux-toastr";

import { Button } from "@/components/ui/button/Button";

import { Meta } from "@/utils/meta/Meta";

import mainImage from "@/assets/images/main.jpg";

import styles from "./Home.module.scss";

export const Home: FC = (): JSX.Element => {
  const { push } = useRouter();

  return (
    <Meta
      title="Home page"
      description="Discover, collect, and sell extraordinary NFTs"
    >
      <div className={styles.container}>
        <div>
          <h1 className="h1">Discover, collect, and sell extraordinary NFTs</h1>
          <p className="font-light text-xl mt-4">
            Buy, Sell, and discover exclusive digital assets.
          </p>
          <Button
            title="Creare Item"
            appearance="large"
            className="btn-primary mt-8"
            arrow
            onClick={() => push("/create/category")}
          />
        </div>
        <div>
          <Image
            src={mainImage}
            width={700}
            height={700}
            alt="Main image"
            draggable={false}
            className="rounded-2xl"
          />
        </div>
      </div>
    </Meta>
  );
};
