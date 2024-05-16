import cn from "classnames";
import { forwardRef } from "react";

import styles from "./Field.module.scss";
import { IField } from "./field.interface";

export const Field = forwardRef<HTMLInputElement, IField>(
  (
    { placeholder, error, inputPlaceholder, type = "text", ...props },
    ref
  ): JSX.Element => {
    return (
      <div className={cn(styles.field)}>
        <label>
          <span>{placeholder}</span>
          <input
            ref={ref}
            type={type}
            {...props}
            placeholder={inputPlaceholder}
          />
        </label>
        {error && <div className={styles.message}>{error.message}</div>}
      </div>
    );
  }
);

Field.displayName = "Field";
