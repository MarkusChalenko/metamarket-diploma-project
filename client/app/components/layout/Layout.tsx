import dynamic from "next/dynamic";
import { FC } from "react";

import styles from "./Layout.module.scss";
import { ILayout } from "./layout.interface";
import {Footer} from "@/components/layout/Footer/Footer";

const DynamicNavigation = dynamic(() => import("./Navigation/Navigation"), {
  ssr: false,
});

export const Layout: FC<ILayout> = ({ children }: ILayout): JSX.Element => {
  return (
    <div className={styles.layout}>
      <DynamicNavigation />
      <div>{children}</div>
      <Footer/>
    </div>
  );
};
