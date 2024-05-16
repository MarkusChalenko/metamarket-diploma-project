import { createSlice } from "@reduxjs/toolkit";

import { ICategoryController } from "@/components/screens/create/create.interface";

import { saveToStorage } from "@/services/auth/auth.helper";

import { getStoreLocal } from "@/utils/string/localStorage";

import { ICategoryInitialState } from "./category.interface";

const initialState: ICategoryInitialState = {
  category: getStoreLocal("category") as ICategoryController,
};

export const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    saveCategory(state, { payload }) {
      state.category = payload;
      if (state.category) {
        localStorage.setItem("category", JSON.stringify(state.category));
      }
    },
  },
  extraReducers: (builder) => {},
});

export const { actions } = categorySlice;
export const { reducer } = categorySlice;
