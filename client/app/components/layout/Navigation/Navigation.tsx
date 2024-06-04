import { FC } from "react";

import { Logo } from "./Logo/Logo";
import { MenuContainer } from "./Menu/MenuContainer";

import styles from "./Navigation.module.scss";
import {SearchBar} from "@/components/searchBar/SearchBar";

const Navigation: FC = (): JSX.Element => {
  return (
    <div className={styles.nav}>
      <Logo />
      <SearchBar />
      <MenuContainer />
    </div>
  );
};

export default Navigation;
