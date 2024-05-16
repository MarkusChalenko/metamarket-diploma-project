import { FC } from "react";

import { Meta } from "@/utils/meta/Meta";

import styles from "../Auth.module.scss";

import { WalletFields } from "./WalletFields";

export const WalletForm: FC = (): JSX.Element => {
  return (
    <Meta title="Web3 Log In" description="Welcome to Unique Things market">
      <div className={styles.container}>
        <div>
          <h1 className="h1">Connect Wallet</h1>
          <WalletFields />
        </div>
      </div>
    </Meta>
  );
};
