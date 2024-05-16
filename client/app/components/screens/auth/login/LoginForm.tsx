import Link from "next/link";
import { FC } from "react";

import { Button } from "@/ui/button/Button";

import { Meta } from "@/utils/meta/Meta";

import styles from "../Auth.module.scss";
import { IForm } from "../auth.interface";
import { useAuthRedirect } from "../useAuthRedirect";

import { LoginFields } from "./LoginFields";

export const LoginForm: FC<IForm> = ({
  register,
  formState,
  isPasswordRequired,
  onSubmit,
  isLoading,
  authFunction,
}): JSX.Element => {
  return (
    <Meta title="Log In" description="Welcome to Unique Things market">
      <section className={styles.container}>
        <form onSubmit={onSubmit}>
          <h1 className="h1">Log In</h1>
          <p className="font-light text-xl mt-4">
            Not a member?{" "}
            <Link href="/auth/register">
              <a className="text-primary">Register</a>
            </Link>
          </p>
          <LoginFields
            register={register}
            formState={formState}
            isPasswordRequired={isPasswordRequired}
          />
          <Button
            title="Login"
            appearance="large"
            className="btn-primary mt-8"
            type="submit"
            onClick={() => authFunction}
            disabled={isLoading}
          />
        </form>
      </section>
    </Meta>
  );
};
