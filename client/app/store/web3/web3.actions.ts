import { createAsyncThunk } from "@reduxjs/toolkit";
import { toastr } from "react-redux-toastr";
import Web3 from "web3";

import { IWeb3InitialState } from "./web3.interface";

export const loginInWeb3 = createAsyncThunk<IWeb3InitialState>(
  "web3/login",
  async (_, thunkApi) => {
    const payload = {
      web3: null as unknown as Web3,
      account: "",
    };

    try {
      const web3 = new Web3(Web3.givenProvider);
      const accounts = await web3.eth.requestAccounts();

      payload.web3 = web3;
      payload.account = accounts[0];

      return payload;
    } catch (error: any) {
      toastr.error("Error", error.message);
      return thunkApi.rejectWithValue(error);
    }
  }
);
