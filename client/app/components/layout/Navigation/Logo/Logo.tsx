import Image from "next/image";
import Link from "next/link";
import { FC } from "react";

import logoImage from "@/assets/images/logo.svg";

export const Logo: FC = (): JSX.Element => {
  return (
    <Link href="/">
      <a className="flex items-center animate-fade">
        <Image
          src={logoImage}
          width={340}
          height={49}
          alt="MetaMarket"
          draggable={false}
        />
      </a>
    </Link>
  );
};
