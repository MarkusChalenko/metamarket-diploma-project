import { DetailedHTMLProps, HTMLAttributes } from "react";

export interface IPicture
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  appearance: "qr" | "upload" | "image";
  url?: any;
}
