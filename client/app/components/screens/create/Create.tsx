import { FC, useEffect } from "react";

import { CategoryForm } from "./category/CategoryForm";
import { ICreate } from "./create.interface";
import { ItemForm } from "./item/ItemForm";
import { useCreateRedirect } from "./useCreateRedirect";

export const Create: FC<ICreate> = ({ appearance }): JSX.Element => {
  useCreateRedirect();

  const data = {
    category: <CategoryForm />,
    item: <ItemForm />,
  };
  return data[appearance];
};
