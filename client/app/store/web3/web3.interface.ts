import Web3 from "web3";
import { Contract } from "web3-eth-contract";

export interface IWeb3InitialState {
  web3: Web3 | null;
  account: string;
}
