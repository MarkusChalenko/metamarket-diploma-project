import instance from "api/interceptors";

import { TypeCategory } from "@/shared/types/category.types";

import { getCategoryUrl } from "@/configs/api.config";

export const CreateService = {
  async getAllItem(): Promise<TypeCategory[]> {
    const response = await instance.get<TypeCategory[]>(getCategoryUrl(""));

    return response.data;
  },
};
