import { FC } from "react";

import { useItem } from "@/hooks/useItem";

import { Menu } from "./Menu";
import styles from "./Menu.module.scss";
import { AuthItems } from "./auth/AuthItems";
import { createMenu, itemMenu } from "./menu.data";

export const MenuContainer: FC = (): JSX.Element => {
  const { item } = useItem();
  return (
    <div className={styles.container}>
      {/*{Object.keys(item).length !== 0 ? (*/}
      {/*  <Menu name={itemMenu} />*/}
      {/*) : (*/}
      {/*  <Menu name={createMenu} />*/}
      {/*)}*/}
      <AuthItems />
    </div>
  );
};
