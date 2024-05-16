import { createSlice } from "@reduxjs/toolkit";

import { getStoreLocal } from "@/utils/string/localStorage";

import { checkAuth, login, logout, register } from "./user.actions";
import { IInitialState } from "./user.interface";

const initialState: IInitialState = {
  user: getStoreLocal("user"),
  isLoading: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    clearStorage() {},
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.user = payload;
      })
      .addCase(register.rejected, (state) => {
        state.isLoading = false;
        state.user = null;
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.user = payload;
      })
      .addCase(login.rejected, (state) => {
        state.isLoading = false;
        state.user = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.isLoading = false;
        state.user = null;
      })
      .addCase(checkAuth.fulfilled, (state, { payload }) => {
        state.user = payload;
      });
  },
});

export const { reducer } = userSlice;
