import cn from "classnames";
import Image from "next/image";
import { FC } from "react";

import uploadImage from "@/assets/images/camera.svg";
import qrcodeImage from "@/assets/images/qrcode.svg";

import styles from "./Picture.module.scss";
import { IPicture } from "./picture.interface";

export const Picture: FC<IPicture> = ({
  appearance,
  className,
  url,
  ...props
}): JSX.Element => {
  const data = {
    qr: (
      <Image
        src={qrcodeImage}
        width={280}
        height={280}
        alt="QR Code"
        draggable={false}
      />
    ),
    upload: (
      <Image
        src={uploadImage}
        width={280}
        height={280}
        alt="Upload Image"
        draggable={false}
      />
    ),
    image: url ? (
      <Image
        src={url}
        alt="Image"
        layout="fill"
        unoptimized
        className={styles.image}
      />
    ) : (
      <Image
        src={qrcodeImage}
        width={280}
        height={280}
        alt="QR Code"
        draggable={false}
      />
    ),
  };

  return (
    <>
      <div className={cn(className, styles.picture)} {...props}>
        {data[appearance]}
      </div>
    </>
  );
};
