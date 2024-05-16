import { ReactNode } from "react";

import { TypeComponentAuthFields } from "@/shared/types/auth.types";

export interface IAuthProvider extends TypeComponentAuthFields {
  children: ReactNode;
}
