import { DetailedHTMLProps, HTMLAttributes } from "react";

import { IDropdownItem } from "@/components/ui/dropdown/dropdown.interface";

import { TypeMaterialIcon } from "@/shared/types/icon.types";

export interface IMenu
  extends DetailedHTMLProps<
    HTMLAttributes<HTMLUListElement>,
    HTMLUListElement
  > {
  title?: string;
  icon?: TypeMaterialIcon;
  items: IDropdownItem[];
}
