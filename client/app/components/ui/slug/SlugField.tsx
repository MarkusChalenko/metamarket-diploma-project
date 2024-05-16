import cn from "classnames";
import Image from "next/image";
import { FC } from "react";

import { Field } from "@/components/ui/field/Field";

import addImage from "@/assets/images/add.svg";
import addlinkImage from "@/assets/images/addlink.svg";
import editImage from "@/assets/images/edit.svg";

import styles from "./SlugField.module.scss";
import { ISlugField } from "./slugField.interface";

export const SlugField: FC<ISlugField> = ({
  generate,
  edit,
  isDisabled,
  register,
  error,
  link,
}): JSX.Element => {
  return (
    <div className="relative">
      {isDisabled ? (
        <div className="relative z-0">
          <div className={styles.defaultValue}>{link}</div>
          <Field
            {...register("slug", {
              required: "Slug field is required",
            })}
            placeholder="NFT Digital Proof check link"
            error={error}
            disabled={isDisabled}
            className={cn(styles.customField, "!bg-white !h-20")}
          />

          <div className={styles.badge}>
            <div className={styles.addLink} onClick={generate}>
              <Image
                src={addlinkImage}
                width={25}
                height={25}
                alt="Add Link"
                draggable={false}
              />
            </div>
            <div className={styles.editLink} onClick={edit}>
              <Image
                src={editImage}
                width={25}
                height={25}
                alt="Add Link"
                draggable={false}
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="relative">
          <Field
            {...register("slug", {
              required: "Slug field is required",
            })}
            placeholder="NFT Digital Proof check link"
            error={error}
            inputPlaceholder="https://nft-check.io/"
            disabled={isDisabled}
          />

          <div className={styles.saveLink} onClick={generate}>
            <Image
              src={addImage}
              width={25}
              height={25}
              alt="Add Link"
              draggable={false}
            />
          </div>
        </div>
      )}
    </div>
  );
};
