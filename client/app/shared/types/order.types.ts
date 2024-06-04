import {IRole} from "@/shared/types/user.types";
import {IProduct} from "@/shared/types/product.types";

export interface IUserOrders {
  orders: [IOrder];
}

export interface IOrder {
  id: string,
  status: string,
  total_amount: number,
  user_id: string,
  created_at: string,
  products_details: [IProductsDetails]
}

export interface IProductsDetails {
  id: string,
  order_id: string,
  product_id: string,
  count: number,
  unit_price: number,
  product: [IProduct]
}
