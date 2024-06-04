import Link from "next/link";
import { useRouter } from "next/router";
import { FC } from "react";

import { MaterialIcon } from "../icon/MaterialIcon";

import styles from "./Dropdown.module.scss";
import { IDropdown } from "./dropdown.interface";

export const Dropdown: FC<IDropdown> = ({
  item: { icon, title, link },
  appearance,
}): JSX.Element => {
  const { asPath } = useRouter();
  const data = {
    extended: (
      <li className={styles.item}>
        <Link href={link}><a><MaterialIcon name={icon} /><span>{title}</span></a></Link>
      </li>
    ),
    simple: (<li className={styles.item}><span>{title}</span></li>),
  };
  return data[appearance];
};
