import { combineReducers } from "@reduxjs/toolkit";
import { AnyAction, Reducer } from "@reduxjs/toolkit";
import { reducer as toastrReducer } from "react-redux-toastr";

import { reducer as categoryReducer } from "./category/category.slice";
import { reducer as itemReducer } from "./item/item.slice";
import { reducer as userReducer } from "./user/user.slice";
import { reducer as web3Reducer } from "./web3/web3.slice";

export const reducers = combineReducers({
  user: userReducer,
  category: categoryReducer,
  web3: web3Reducer,
  item: itemReducer,
  toastr: toastrReducer,
});

const rootReducer: Reducer = (state: RootState, action: AnyAction) => {
  return reducers(state, action);
};

export default rootReducer;
export type RootState = ReturnType<typeof reducers>;
