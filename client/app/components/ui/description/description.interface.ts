import { DetailedHTMLProps, HTMLAttributes } from "react";

export interface IDescription
  extends DetailedHTMLProps<
    HTMLAttributes<HTMLParagraphElement>,
    HTMLParagraphElement
  > {
  text: string;
}
