import { ChangeEvent, useCallback, useMemo, useState } from "react";
import { useMutation } from "react-query";

import { FileService } from "@/services/file/file.service";

import { toastrError } from "@/utils/string/toastrError";

import { TypeUpload } from "./uploadField.interface";

export const useUpload: TypeUpload = (onChange) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { mutateAsync } = useMutation(
    "upload file",
    (data: FormData) => FileService.uploadFile(data),
    {
      onSuccess: ({ data }) => {
        onChange(data.image_url);
      },
      onError: (error) => {
        toastrError(error, "Upload file");
      },
    }
  );

  const uploadImage = useCallback(
    async (e: ChangeEvent<HTMLInputElement>) => {
      setIsLoading(true);

      const files = e.target.files;
      if (!files?.length) {
        return;
      }

      const formData = new FormData();
      formData.append("image", files[0]);

      await mutateAsync(formData);

      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    },
    [mutateAsync]
  );

  return useMemo(
    () => ({
      uploadImage,
      isLoading,
    }),
    [uploadImage, isLoading]
  );
};
