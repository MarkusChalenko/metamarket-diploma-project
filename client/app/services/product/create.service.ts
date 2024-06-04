import instance from "api/interceptors";

import {getOrderUrl, getProductUrl} from "@/configs/api.config";
import {IUser} from "@/shared/types/user.types";
import {IUserOrders} from "@/shared/types/order.types";
import {IProduct} from "@/shared/types/product.types";

export const CreateService = {
  async addProduct(product: IProduct) {
    const response = await instance.post(getProductUrl(''), product);
    return response.data;
  },
  async updateProduct(productId: string, product: IProduct) {
    const response = await instance.put(getProductUrl(productId), product);
    return response.data;
  },
  async deleteProduct(productId: string) {
    const response = await instance.delete(getProductUrl(productId));
    return response.data;
  },
  async getProductsInCategory(category_id: string): Promise<[IProduct]> {
    const response = await instance.get<[IProduct]>(getProductUrl(`category/${category_id}`));
    return response.data;
  },
};
