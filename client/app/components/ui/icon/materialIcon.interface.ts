import { DetailedHTMLProps, ImgHTMLAttributes } from "react";

import { TypeMaterialIcon } from "@/shared/types/icon.types";

export interface IIcon
  extends DetailedHTMLProps<
    ImgHTMLAttributes<HTMLImageElement>,
    HTMLImageElement
  > {
  name: TypeMaterialIcon;
}
