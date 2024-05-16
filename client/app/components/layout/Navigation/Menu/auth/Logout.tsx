import { FC, MouseEvent } from "react";

import { useActions } from "@/hooks/useActions";

import styles from "../Menu.module.scss";

export const Logout: FC = (): JSX.Element => {
  const { logout, reset } = useActions();

  const handleLogout = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    logout();
    reset();
  };

  return (
    <div className="block">
      <a onClick={handleLogout}>
        <p className={styles.title}>Logout</p>
      </a>
    </div>
  );
};
