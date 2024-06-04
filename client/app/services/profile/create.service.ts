import instance from "api/interceptors";

import {getOrderUrl, getUsersUrl} from "@/configs/api.config";
import {IUser} from "@/shared/types/user.types";
import {IUserOrders} from "@/shared/types/order.types";

export const CreateService = {
  async getProfile(): Promise<IUser> {
    const response = await instance.get<IUser>(getUsersUrl("profile/"));

    return response.data;
  },

  async getUserOrders(): Promise<IUserOrders> {
    const response = await instance.get<IUserOrders>(getOrderUrl("user/"));

    return response.data;
  },

};
