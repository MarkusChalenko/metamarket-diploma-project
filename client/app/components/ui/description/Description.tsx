import parse from "html-react-parser";
import { FC } from "react";

import { IDescription } from "./description.interface";

const Description: FC<IDescription> = ({ text, className = "", ...props }) => {
  return (
    <p
      className={`font-normal text-xl block text-slate-500 ${className}`}
      {...props}
    >
      {parse(text)}
    </p>
  );
};

export default Description;
