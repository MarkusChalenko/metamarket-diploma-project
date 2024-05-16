import { createSlice } from "@reduxjs/toolkit";

import { TypeItem } from "@/shared/types/item.types";

import { getStoreLocal } from "@/utils/string/localStorage";

import { createItem, getItemList, getOneItemById } from "./item.actions";
import { IItemInitialState } from "./item.interface";

const initialState: IItemInitialState = {
  item: {} as TypeItem,
  isLoading: false,
};

const itemSlice = createSlice({
  name: "item",
  initialState,
  reducers: {
    reset: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createItem.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createItem.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.item = payload;
      })
      .addCase(createItem.rejected, (state) => {
        state.isLoading = false;
        state.item = null;
      })
      .addCase(getItemList.fulfilled, (state, { payload }) => {})
      .addCase(getOneItemById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOneItemById.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        if (payload) {
          state.item = payload;
        }
      });
  },
});

export const { reducer } = itemSlice;
export const { actions } = itemSlice;
