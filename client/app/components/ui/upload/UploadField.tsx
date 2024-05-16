import cn from "classnames";
import { FC } from "react";

import { Button } from "../button/Button";
import { Picture } from "../picture/Picture";

import styles from "./UploadField.module.scss";
import { IUploadFiled } from "./uploadField.interface";
import { useUpload } from "./useUpload";

export const UploadField: FC<IUploadFiled> = ({
  value,
  onChange,
  error,
  style,
  placeholder,
}): JSX.Element => {
  const { isLoading, uploadImage } = useUpload(onChange);

  return (
    <div style={style}>
      <div className={styles.image}>
        {value ? (
          <Picture appearance="image" url={`${value}`} />
        ) : (
          <Picture appearance="upload" />
        )}
        {error && <div className={styles.message}>{error.message}</div>}
      </div>

      <div className={styles.upload}>
        <input
          type="file"
          accept="image/*"
          id="file"
          onChange={uploadImage}
          style={{ display: "none" }}
        />
        <label htmlFor="file">{placeholder}</label>
      </div>
    </div>
  );
};
