import { FC, MouseEvent } from "react";

import { useActions } from "@/hooks/useActions";

import styles from "../Menu.module.scss";

export const Wallet: FC = (): JSX.Element => {
  const { loginInWeb3 } = useActions();

  const handleConnectWallet = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    loginInWeb3();
  };

  return (
    <div className="block">
      <a onClick={handleConnectWallet}>
        <p className={styles.title}>Wallet</p>
      </a>
    </div>
  );
};
