import { createAsyncThunk } from "@reduxjs/toolkit";
import { toastr } from "react-redux-toastr";

import { TypeItem } from "@/shared/types/item.types";

import { CreateService } from "@/services/create/create.service";

import { toastrError } from "@/utils/string/toastrError";

import { IItemResponse } from "./item.interface";

export const createItem = createAsyncThunk<IItemResponse, TypeItem>(
  "item/create",
  async (item, thunkApi) => {
    try {
      const response = await CreateService.createItem(item);
      toastr.success("Create Item", "Completed successfully");

      return response;
    } catch (error) {
      toastrError(error);
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const getItemList = createAsyncThunk("item", async (_, thunkApi) => {
  try {
    const response = await CreateService.getAllItem();

    return response;
  } catch (error: any) {
    toastr.error("Error", error.message);
  }
});

export const getOneItemById = createAsyncThunk(
  "item/{id}",
  async (id: string, thunkApi) => {
    try {
      const response = await CreateService.getItemById(id);

      return response;
    } catch (error: any) {
      toastr.error("Error", error.message);
      return thunkApi.rejectWithValue(error);
    }
  }
);
