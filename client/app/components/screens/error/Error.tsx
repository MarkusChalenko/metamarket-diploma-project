import { FC } from "react";

import { Meta } from "@/utils/meta/Meta";

import styles from "./Error.module.scss";
import { IError } from "./error.interface";

export const Error: FC<IError> = ({ appearance }): JSX.Element => {
  const data = {
    404: (
      <Meta title="404 Error" description="Page not found">
        <h1 className={styles.container}>404 - Page not found</h1>
      </Meta>
    ),
    500: (
      <Meta title="500 Error" description="Server side error occurred">
        <h1 className={styles.container}>500 - Server side error occurred</h1>
      </Meta>
    ),
  };

  return data[appearance];
};
