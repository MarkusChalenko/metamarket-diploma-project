import { DetailedHTMLProps, HTMLAttributes } from "react";

import { TypeMaterialIcon } from "@/shared/types/icon.types";

export interface IDropdownItem
  extends DetailedHTMLProps<HTMLAttributes<HTMLLIElement>, HTMLLIElement> {
  icon: TypeMaterialIcon;
  title: string;
  link: string;
}

export interface IDropdown {
  appearance: "extended" | "simple";
  item: IDropdownItem;
}
