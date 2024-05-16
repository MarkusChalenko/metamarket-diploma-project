import { getContentType } from "api/api.helpers";
import instance from "api/interceptors";
import Cookies from "js-cookie";

import { IUser } from "@/shared/types/user.types";

import { API_URL } from "@/configs/api.config";

import { IAuthResponse } from "@/store/user/user.interface";

import { getAuthUrl, getUsersUrl } from "../../configs/api.config";
import { removeTokensStorage, saveToStorage } from "./auth.helper";

export const AuthService = {
  async register(email: string, full_name: string, password: string) {
    const response = await instance.post<IAuthResponse>(getAuthUrl("reg"), {
      email,
      full_name,
      password,
    });

    return response;
  },
  async login(email: string, password: string) {
    const response = await instance.post<IAuthResponse>(getAuthUrl("login"), {
      email,
      password,
    });

    if (response.data.access_token) {
      saveToStorage(response.data);
    }

    return response;
  },
  async logout() {
    removeTokensStorage();
    localStorage.removeItem("user");
    localStorage.clear();
  },
  async getNewTokens() {
    const access_token = Cookies.get("access_token");
    const refresh_token = Cookies.get("refresh_token");

    const response = await instance.post<IAuthResponse>(
      getAuthUrl("refresh"),
      {
        access_token,
        refresh_token,
      },
      {
        headers: getContentType(),
      }
    );

    if (response.data.access_token) {
      saveToStorage(response.data);
    }

    return response;
  },
  async getUser() {
    return instance.get<IUser>(getUsersUrl("profile"));
  },
};
