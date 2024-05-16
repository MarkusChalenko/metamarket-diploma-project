import { useState } from "react";
import { SubmitHandler, UseFormSetValue } from "react-hook-form";
import { useMutation, useQuery } from "react-query";

import { IUser } from "@/shared/types/user.types";

import { AuthService } from "@/services/auth/auth.service";

import { toastrError } from "@/utils/string/toastrError";

export const useUser = () => {
  const { data, status } = useQuery(
    "user/profile",
    () => AuthService.getUser(),
    {
      onSuccess({ data }) {},
      onError(error) {
        toastrError(error, "Get user");
      },
    }
  );

  return { user: data?.data };
};
