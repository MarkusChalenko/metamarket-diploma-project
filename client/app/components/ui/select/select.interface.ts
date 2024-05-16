import { DetailedHTMLProps, SelectHTMLAttributes } from "react";
import { ControllerRenderProps, FieldError } from "react-hook-form";
import { Options } from "react-select";

export interface ISelect
  extends DetailedHTMLProps<
    SelectHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  options: Options<IOptions>;
  field: ControllerRenderProps<any, any>;
  placeholder: string;
  isLoading?: false;
  isMulti?: boolean;
  error?: FieldError | undefined;
}

export interface IOptions {
  value: string;
  label: string;
}
