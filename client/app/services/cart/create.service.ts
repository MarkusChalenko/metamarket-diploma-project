import instance from "api/interceptors";

import { getCartUrl } from "@/configs/api.config";
import {IUser} from "@/shared/types/user.types";
import {IUserOrders} from "@/shared/types/order.types";

export const CreateService = {
  async removeFromCart(productId: string) {
    const response = await instance.post(getCartUrl('remove'), { productId });
    return response.data;
  },

  async getCart() {
    const response = await instance.get(getCartUrl(''));
    return response.data;
  },

  async addProductToUserCart(product_id: number) {
    const response = await instance.post(getCartUrl("add/"), {product_id});

    return response.data;
  },
};
