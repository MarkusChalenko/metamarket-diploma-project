import { FC } from "react";

import { Logo } from "./Logo/Logo";
import { MenuContainer } from "./Menu/MenuContainer";

import styles from "./Navigation.module.scss";

const Navigation: FC = (): JSX.Element => {
  return (
    <div className={styles.nav}>
      <Logo />
      <MenuContainer />
    </div>
  );
};

export default Navigation;
