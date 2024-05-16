import { FC, useState } from "react";

import { Dropdown } from "@/components/ui/dropdown/Dropdown";

import styles from "./Menu.module.scss";
import { IMenu } from "./menu.interface";

export const Menu: FC<{ name: IMenu }> = ({
  name: { title, icon, items },
}): JSX.Element => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div
      className="block"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      <p className={styles.title}>{title}</p>
      {isVisible && items.length > 0 && (
        <ul className={styles.dropdown}>
          {items.map((item) => (
            <Dropdown appearance="extended" item={item} key={item.link} />
          ))}
        </ul>
      )}
    </div>
  );
};
