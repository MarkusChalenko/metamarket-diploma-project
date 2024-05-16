import { FC, MouseEvent } from "react";

import { Sign } from "@/ui/sign/Sign";

import { useActions } from "@/hooks/useActions";

import styles from "./Wallet.module.scss";
import { walletArr } from "./wallet.data";

export const WalletFields: FC = (): JSX.Element => {
  const { loginInWeb3 } = useActions();

  const handleConnectWallet = async () => {
    loginInWeb3();
  };

  return (
    <ul className={styles.sign}>
      {walletArr.map((item) => (
        <Sign
          item={item}
          key={item.link}
          appearance="extended"
          onClick={handleConnectWallet}
        />
      ))}
    </ul>
  );
};
