import { FC } from "react";

import { useAuth } from "@/hooks/useAuth";
import { useWeb3Auth } from "@/hooks/useWeb3Auth";

import { Menu } from "../Menu";
import { accountMenu, loginMenu, profileMenu, walletMenu } from "../menu.data";

import { Logout } from "./Logout";
import { Wallet } from "./Wallet";

export const AuthItems: FC = (): JSX.Element => {
  const { user } = useAuth();
  const { account } = useWeb3Auth();

  accountMenu.items.map((item) => (item.title = `${account.slice(0, 16)}...`));

  return (
    <>
      {user ? (
        <>
          <Menu name={profileMenu} />
          {/*<>{account ? <Menu name={accountMenu} /> : <Wallet />}</>*/}
          <Logout />
        </>
      ) : (
        <>
          <Menu name={loginMenu} />
          {/*<>*/}
          {/*  {account ? <Menu name={accountMenu} /> : <Menu name={walletMenu} />}*/}
          {/*</>*/}
        </>
      )}
    </>
  );
};
