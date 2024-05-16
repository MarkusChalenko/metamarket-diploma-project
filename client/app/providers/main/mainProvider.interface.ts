import { ReactNode } from "react";

import { TypeComponentAuthFields } from "@/shared/types/auth.types";

export interface IMainProvider extends TypeComponentAuthFields {
  children: ReactNode;
}
