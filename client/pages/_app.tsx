import { Web3ReactProvider } from "@web3-react/core";
import type { AppProps } from "next/app";
import { MainProvider } from "providers/main/MainProvider";
import Web3 from "web3";

import { TypeComponentAuthFields } from "@/shared/types/auth.types";

import "@/assets/styles/globals.scss";

function getLibrary(provider: any) {
  return new Web3(provider);
}

type TypeAppProps = AppProps & TypeComponentAuthFields;

function MyApp({ Component, pageProps }: TypeAppProps) {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <MainProvider Component={Component}>
        <Component {...pageProps} />
      </MainProvider>
    </Web3ReactProvider>
  );
}

export default MyApp;
