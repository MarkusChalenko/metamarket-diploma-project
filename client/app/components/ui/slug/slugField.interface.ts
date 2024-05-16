import { FieldError, UseFormRegister } from "react-hook-form";

export interface ISlugField {
  error?: FieldError;
  register: UseFormRegister<any>;
  generate: () => void;
  edit: () => void;
  isDisabled?: boolean;
  link: any;
}
