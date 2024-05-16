import { FormState, UseFormRegister } from "react-hook-form";

type TypeArrowFunction = (data: any) => any;

export interface IAuthInput {
  email: string;
  full_name: string;
  password: string;
}

export interface IAuth {
  appearance: "login" | "register" | "web3";
}

export interface IAuthFields {
  register: UseFormRegister<any>;
  formState: FormState<any>;
  isPasswordRequired?: boolean;
}

export interface IForm extends IAuthFields {
  isLoading: boolean;
  authFunction: TypeArrowFunction;
  onSubmit: React.FormEventHandler;
}
