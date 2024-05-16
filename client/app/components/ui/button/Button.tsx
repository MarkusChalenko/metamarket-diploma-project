import cn from "classnames";
import { FC } from "react";

import { MaterialIcon } from "../icon/MaterialIcon";

import styles from "./Button.module.scss";
import { IButton } from "./button.interface";

export const Button: FC<IButton> = ({
  title,
  appearance,
  arrow = false,
  className,
  ...props
}): JSX.Element => {
  return (
    <button
      className={cn(className, {
        [styles.small]: appearance === "small",
        [styles.large]: appearance === "large",
      })}
      {...props}
    >
      {title}
      {arrow && (
        <span
          className={cn(styles.arrow, {
            [styles.visible]: arrow === true,
          })}
        >
          <MaterialIcon name="MdArrowRightAlt" />
        </span>
      )}
    </button>
  );
};
