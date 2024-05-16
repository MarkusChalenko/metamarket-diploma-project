import { ButtonHTMLAttributes, DetailedHTMLProps } from "react";

export interface IButton
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  title: string;
  appearance: "small" | "large";
  arrow?: boolean;
}
