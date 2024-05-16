import { ISignItem } from "@/ui/sign/sign.interface";

import metamaskImage from "@/assets/images/metamask.png";
import phantomImage from "@/assets/images/phantom.png";
import walletConnectImage from "@/assets/images/walletconnect.png";
import coinbaseImage from "@/assets/images/walletlink.png";

export const walletArr: ISignItem[] = [
  {
    icon: metamaskImage,
    link: "/card",
    title: "MetaMask",
  },
  {
    icon: phantomImage,
    link: "/",
    title: "Phantom",
  },
  {
    icon: walletConnectImage,
    link: "/",
    title: "Coinbase Wallet",
  },
  {
    icon: coinbaseImage,
    link: "/",
    title: "WalletConnect",
  },
];
