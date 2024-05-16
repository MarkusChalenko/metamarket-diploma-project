import instance from "api/interceptors";

import { TypeItem } from "@/shared/types/item.types";

import { getItemUrl } from "@/configs/api.config";

export const CreateService = {
  async getAllItem(): Promise<TypeItem[]> {
    const response = await instance.get<TypeItem[]>(getItemUrl(""));

    return response.data;
  },

  async createItem(item: TypeItem): Promise<TypeItem> {
    const response = await instance.post<TypeItem>(getItemUrl("create"), item);
    return response.data;
  },

  async getItemById(id: string): Promise<TypeItem> {
    const response = await instance.get<TypeItem>(getItemUrl(id));

    return response.data;
  },
};
