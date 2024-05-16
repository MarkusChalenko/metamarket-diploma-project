import { TypeItem } from "@/shared/types/item.types";

export interface ICard {}

export interface IItemEditInput extends Pick<TypeItem, "product_story"> {}
