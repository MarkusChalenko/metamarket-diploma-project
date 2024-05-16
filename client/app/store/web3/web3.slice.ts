import { createSlice } from "@reduxjs/toolkit";

import { loginInWeb3 } from "./web3.actions";
import { IWeb3InitialState } from "./web3.interface";

const initialState: IWeb3InitialState = {
  web3: null,
  account: "",
};

const web3Slice = createSlice({
  name: "web3",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(loginInWeb3.fulfilled, (state, { payload }) => {
        state.web3 = payload.web3;
        state.account = payload.account;
      })
      .addCase(loginInWeb3.rejected, (state) => {});
  },
});

export const { reducer } = web3Slice;
