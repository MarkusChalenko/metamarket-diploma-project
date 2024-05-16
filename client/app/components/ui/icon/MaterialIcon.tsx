import { FC } from "react";
import * as MaterialIcons from "react-icons/md";

import { IIcon } from "./materialIcon.interface";

export const MaterialIcon: FC<IIcon> = ({ name, ...props }): JSX.Element => {
  const IconComponent = MaterialIcons[name];

  return (
    (
      <div {...props}>
        <IconComponent />
      </div>
    ) || <MaterialIcons.MdDragIndicator />
  );
};
