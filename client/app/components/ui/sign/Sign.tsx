import Image from "next/image";
import Link from "next/link";
import { FC } from "react";

import styles from "./Sign.module.scss";
import { ISign } from "./sign.interface";

export const Sign: FC<ISign> = ({
  item: { link, icon, title },
  appearance,
  ...props
}): JSX.Element => {
  return (
    <li className={styles.item} {...props}>
      <Link href={link}>
        <a className="flex items-center animate-fade">
          <Image
            src={icon}
            width={30}
            height={30}
            alt={title}
            draggable={false}
          />
          <span>{title}</span>
        </a>
      </Link>
    </li>
  );
};
