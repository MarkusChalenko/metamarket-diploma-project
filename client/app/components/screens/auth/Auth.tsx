import { FC } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import { useActions } from "@/hooks/useActions";
import { useAuth } from "@/hooks/useAuth";

import { IAuth, IAuthInput } from "./auth.interface";
import { LoginForm } from "./login/LoginForm";
import { RegisterForm } from "./register/RegisterForm";
import { useAuthRedirect } from "./useAuthRedirect";
import { WalletForm } from "./web3/WalletForm";

export const Auth: FC<IAuth> = ({ appearance }): JSX.Element => {
  const { isLoading } = useAuth();
  const {
    register: registerInput,
    handleSubmit,
    formState,
    reset,
  } = useForm<IAuthInput>({
    mode: "onChange",
  });
  const { register, login } = useActions();

  useAuthRedirect();

  const onSubmit: SubmitHandler<IAuthInput> = (data) => {
    const onSubmitData = {
      register: register,
      login: login,
    };

    onSubmitData[appearance](data);
    reset();
  };

  const data = {
    login: (
      <LoginForm
        onSubmit={handleSubmit(onSubmit)}
        register={registerInput}
        formState={formState}
        isPasswordRequired
        isLoading={isLoading}
        authFunction={login}
      />
    ),
    register: (
      <RegisterForm
        onSubmit={handleSubmit(onSubmit)}
        register={registerInput}
        formState={formState}
        isPasswordRequired
        isLoading={isLoading}
        authFunction={register}
      />
    ),
  };

  return data[appearance];
};

export default Auth;
