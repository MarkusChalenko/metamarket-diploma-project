import { TypeItem } from "@/shared/types/item.types";

export interface ICategory {
  type: string;
  categoryArr: ICategory[];
}

export interface ICreate {
  appearance: "category" | "item";
}

export interface ICategoryController {
  type: string;
  categoryName: string;
  subCategories: string;
}

export interface IItemInputAndController
  extends Pick<TypeItem, "name" | "description" | "image_url" | "qr_url"> {
  blockchain: string;
  slug: string;
}
