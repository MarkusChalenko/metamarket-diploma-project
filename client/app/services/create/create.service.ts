import instance from "api/interceptors";

import { IItemEditInput } from "@/components/screens/card/card.interface";

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

  async updateItem(id: string, data: IItemEditInput) {
    const response = await instance.put<IItemEditInput>(
      getItemUrl(`update/${id}`),
      data
    );

    return response.data;
  },
};
