import instance from "api/interceptors";

import { getOrderUrl } from "@/configs/api.config";
import {IUser} from "@/shared/types/user.types";
import {IUserOrders} from "@/shared/types/order.types";

export const CreateService = {
  async getUserOrders(): Promise<IUserOrders> {
    const response = await instance.get<IUserOrders>(getOrderUrl("order/user/"));

    return response.data;
  },
};
