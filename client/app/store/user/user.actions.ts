import { createAsyncThunk } from "@reduxjs/toolkit";
import { errorCatch } from "api/api.helpers";
import { toastr } from "react-redux-toastr";

import { AuthService } from "@/services/auth/auth.service";

import { toastrError } from "@/utils/string/toastrError";

import { ILoginData, IRegisterData } from "./user.interface";
import { IAuthResponse } from "./user.interface";

export const register = createAsyncThunk<IAuthResponse, IRegisterData>(
  "auth/reg",
  async ({ email, full_name, password }, thunkApi) => {
    try {
      const response = await AuthService.register(email, full_name, password);
      toastr.success("Registration", "Completed successfully");
      return response.data;
    } catch (error) {
      toastrError(error);
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const login = createAsyncThunk<IAuthResponse, ILoginData>(
  "auth/login",
  async ({ email, password }, thunkApi) => {
    try {
      const response = await AuthService.login(email, password);
      toastr.success("Login", "Completed successfully");
      return response.data;
    } catch (error) {
      toastrError(error);
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const logout = createAsyncThunk("auth/logout", async () => {
  await AuthService.logout();
});

export const checkAuth = createAsyncThunk<IAuthResponse>(
  "auth/refresh",
  async (_, thunkAPI) => {
    try {
      const response = await AuthService.getNewTokens();
      return response.data;
    } catch (error) {
      if (errorCatch(error) === "jwt expired") {
        toastr.error(
          "Logout",
          "Your authorization is finished, please log in again"
        );

        thunkAPI.dispatch(logout());
      }
      return thunkAPI.rejectWithValue(error);
    }
  }
);
