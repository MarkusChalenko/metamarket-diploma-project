import { FC } from "react";

import { Field } from "@/ui/field/Field";

import { emailRegex } from "@/shared/regex/regex";

import { IAuthFields } from "../auth.interface";
import { FieldError } from "react-hook-form";

export const RegisterFields: FC<IAuthFields> = ({
  register,
  formState: { errors, isValid },
  isPasswordRequired = false,
}): JSX.Element => {
  const typedErrors = errors as Record<string, FieldError>;
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
        error={typedErrors.email}
      />
      <Field
        {...register("full_name", {
          required: "Full Name is required",
          minLength: {
            value: 4,
            message: "Full Name must be at least 4 characters",
          },
          maxLength: {
            value: 50,
            message: "Full Name must be less than 50 characters",
          },
        })}
        placeholder="Full Name"
        error={typedErrors.name}
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
        error={typedErrors.password}
      />
    </>
  );
};
