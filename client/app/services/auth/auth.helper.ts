import Cookies from "js-cookie";

import { ITokens } from "@/store/user/user.interface";
import { IAuthResponse } from "@/store/user/user.interface";

export const saveTokensStorage = (data: ITokens) => {
  Cookies.set("access_token", data.access_token);
  Cookies.set("refresh_token", data.refresh_token);
};

export const saveToStorage = (data: IAuthResponse) => {
  saveTokensStorage(data);
  localStorage.setItem("user", JSON.stringify(data));
};

export const removeTokensStorage = () => {
  Cookies.remove("access_token");
  Cookies.remove("refresh_token");
};

export const getTokensFromLocalStorage = () => {
  return {
    ...JSON.parse(localStorage.getItem("user") || ""),
  };
};
