import { DetailedHTMLProps, HTMLAttributes } from "react";

export interface ISignItem
  extends DetailedHTMLProps<HTMLAttributes<HTMLLIElement>, HTMLLIElement> {
  link: string;
  icon: any;
  title: string;
}

export interface ISign
  extends DetailedHTMLProps<HTMLAttributes<HTMLLIElement>, HTMLLIElement> {
  appearance: "simple" | "extended";
  item: ISignItem;
}
