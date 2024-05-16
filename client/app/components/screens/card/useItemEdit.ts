import { useRouter } from "next/router";
import { useEffect } from "react";
import { SubmitHandler, UseFormSetValue } from "react-hook-form";
import { useMutation, useQuery } from "react-query";
import { toastr } from "react-redux-toastr";

import { useItem } from "@/hooks/useItem";

import { CreateService } from "@/services/create/create.service";

import { toastrError } from "@/utils/string/toastrError";

import { IItemEditInput } from "./card.interface";

export const useItemEdit = (setValue: UseFormSetValue<IItemEditInput>) => {
  const { query, push } = useRouter();

  const { item } = useItem();

  const { isLoading, data } = useQuery(
    ["item", item.token_address],
    () => CreateService.getItemById(item.token_address),
    {
      onSuccess(data) {
        setValue("product_story", data.product_story);
      },
      onError(error) {
        toastrError(error, "Get item");
      },
    }
  );
  const { mutateAsync } = useMutation(
    "update item",
    (data: IItemEditInput) =>
      CreateService.updateItem(item.token_address, data),
    {
      onSuccess() {
        toastr.success("Update item", "update was successful");
        push("/card");
      },
      onError(error) {
        toastrError(error, "Update item");
      },
    }
  );

  const onSubmit: SubmitHandler<IItemEditInput> = async (data) => {
    await mutateAsync(data);
  };

  return { onSubmit, isLoading, editedItem: data };
};
