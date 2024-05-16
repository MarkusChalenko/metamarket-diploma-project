import { erc721Abi, erc721Address } from "abi-address/erc721";
import Web3 from "web3";

export const erc721Contract = (web3: Web3) =>
  new web3.eth.Contract(JSON.parse(erc721Abi), erc721Address);
