import Link from "next/link";
import { useRouter } from "next/router";
import { FC } from "react";

import { Button } from "@/ui/button/Button";

import { Meta } from "@/utils/meta/Meta";

import styles from "../Auth.module.scss";
import { IForm } from "../auth.interface";

import { RegisterFields } from "./RegisterFields";

export const RegisterForm: FC<IForm> = ({
  register,
  formState,
  isLoading,
  onSubmit,
  authFunction,
}): JSX.Element => {
  const { push } = useRouter();
  return (
    <Meta title="Register" description="Welcome to Unique Things market">
      <section className={styles.container}>
        <form onSubmit={onSubmit}>
          <h1 className="h1">Register</h1>
          <p className="font-light text-xl mt-4">
            Already a member?{" "}
            <Link href="/auth/login"><a className="text-primary">Log In</a></Link>
          </p>
          <RegisterFields register={register} formState={formState} isPasswordRequired
          />
          <Button title="Create an account" appearance="large" className="btn-primary mt-8"
            type="submit" onClick={() => {
              formState.isValid && push("/auth/login");
              authFunction;
            }} disabled={isLoading}
          />
        </form>
      </section>
    </Meta>
  );
};
