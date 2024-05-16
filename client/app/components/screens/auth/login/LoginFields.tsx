import { FC } from "react";

import { Field } from "@/components/ui/field/Field";

import { emailRegex } from "@/shared/regex/regex";

import { IAuthFields } from "../auth.interface";

export const LoginFields: FC<IAuthFields> = ({
  register,
  formState: { errors },
  isPasswordRequired = false,
}): JSX.Element => {
  return (
    <>
      <Field
        {...register(
          "email",
          isPasswordRequired
            ? {
                required: "Email is required",
                pattern: {
                  value: emailRegex,
                  message: "Please enter a valid email address",
                },
              }
            : {}
        )}
        placeholder="Email"
        error={errors?.email?.message?.toString()}
      />
      <Field
        {...register("password", {
          required: "Password is required",
          minLength: {
            value: 4,
            message: "Password must be at least 4 characters",
          },
          maxLength: {
            value: 28,
            message: "Password must be less than 28 characters",
          },
        })}
        placeholder="Password"
        type="password"
        error={errors?.password?.message?.toString()}
      />
    </>
  );
};
