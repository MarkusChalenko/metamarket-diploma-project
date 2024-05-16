import { ReactNode } from "react";

export interface IModal {
  visible: boolean;
  onClose: () => void;
  children: ReactNode;
}
