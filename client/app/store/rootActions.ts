import { actions as categoryActions } from "./category/category.slice";
import * as itemActions from "./item/item.actions";
import { actions as testActions } from "./item/item.slice";
import * as userActions from "./user/user.actions";
import * as web3Actions from "./web3/web3.actions";

export const actions = {
  ...userActions,
  ...itemActions,
  ...web3Actions,
  ...categoryActions,
  ...testActions,
};
