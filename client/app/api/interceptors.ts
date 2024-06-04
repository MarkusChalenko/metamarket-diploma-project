import axios from "axios";
import Cookies from "js-cookie";

import { API_URL } from "@/configs/api.config";

import { removeTokensStorage } from "@/services/auth/auth.helper";
import { AuthService } from "@/services/auth/auth.service";

import { errorCatch } from "./api.helpers";

const instance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

instance.interceptors.request.use((config) => {
  const access_token = Cookies.get("access_token");
  if (config.headers && access_token)
    config.headers.Authorization = `Bearer ${access_token}`;

  return config;
});

// instance.interceptors.response.use(
//   (config) => config,
//   async (error) => {
//     const originalRequest = error.config;
//     if (
//       (error.response.status === 401 ||
//         errorCatch(error) === "jwt expired" ||
//         errorCatch(error) === "jwt must be provided") &&
//       error.config &&
//       !originalRequest._isRetry
//     ) {
//       originalRequest._isRetry = true;
//       try {
//         await AuthService.getNewTokens();
//
//         return instance.request(originalRequest);
//       } catch (error) {
//         removeTokensStorage();
//       }
//     }
//     throw error;
//   }
// );

export default instance;
