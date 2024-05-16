import { IMenu } from "./menu.interface";

export const createMenu: IMenu = {
  title: "Create",
  items: [
    {
      icon: "MdCreate",
      link: "/create/category",
      title: "Create",
    },
    {
      icon: "MdUpload",
      link: "/upload",
      title: "Upload",
    },
  ],
};

export const profileMenu: IMenu = {
  title: "Profile",
  items: [
    {
      icon: "MdSettings",
      link: "/profile",
      title: "Profile",
    },
  ],
};

export const loginMenu: IMenu = {
  title: "Login",
  items: [
    {
      icon: "MdLogin",
      link: "/auth/login",
      title: "Login",
    },
  ],
};

export const walletMenu: IMenu = {
  title: "Wallet",
  items: [
    {
      icon: "MdAccountBalanceWallet",
      link: "/auth/web3",
      title: "Wallet",
    },
  ],
};

export const accountMenu: IMenu = {
  title: "Web3",
  items: [
    {
      icon: "MdAccountBalanceWallet",
      link: "/",
      title: "",
    },
  ],
};

export const itemMenu: IMenu = {
  title: "Item",
  items: [
    {
      icon: "MdCardMembership",
      link: "/card",
      title: "Show Item",
    },
  ],
};
