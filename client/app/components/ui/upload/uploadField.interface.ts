import { CSSProperties, ChangeEvent } from "react";
import { FieldError } from "react-hook-form";

import { TypeFile } from "@/shared/types/file.types";

export type TypeUpload = (onChange: (...event: any[]) => void) => {
  uploadImage: (e: ChangeEvent<HTMLInputElement>) => Promise<void>;
  isLoading: boolean;
};

export interface IUploadFiled {
  value?: string;
  onChange: (...event: any[]) => void;
  error?: FieldError;
  style?: CSSProperties;
  placeholder: string;
}
