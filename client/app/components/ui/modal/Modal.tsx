import { FC } from "react";

import styles from "./Modal.module.scss";
import { IModal } from "./modal.interface";

export const Modal: FC<IModal> = ({ visible, onClose, children }) => {
  if (!visible) {
    return null;
  }

  return (
    <div onClick={onClose} className={styles.modal}>
      <div className={styles.content} onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
};
