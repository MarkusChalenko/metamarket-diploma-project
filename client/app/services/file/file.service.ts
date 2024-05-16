import instance from "api/interceptors";
import axios from "api/interceptors";

import { TypeFile } from "@/shared/types/file.types";

import { getFileUrl } from "@/configs/api.config";

export const FileService = {
  async uploadFile(file: FormData) {
    return await axios.post<TypeFile>(getFileUrl("upload"), file, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
};
