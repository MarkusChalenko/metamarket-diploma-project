import { TypeItem } from "@/shared/types/item.types";

export interface IItemInitialState {
  item: TypeItem | null;
  isLoading: boolean;
}

export interface IItemResponse extends TypeItem {}
