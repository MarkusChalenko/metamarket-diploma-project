import {MiniProductCard} from "@/components/product/MiniProductCard";
import {FC, useState} from "react";

import styles from "./Products.module.css"

export const Product: FC = (): JSX.Element => {
  const [productTypes, setProductTypes] = useState<string[]>(['Clothes', 'For the house', 'Electronics', 'Electronics', 'Chemistry']);

  const products = [
    { id: 1, name: 'Product 1', image: 'product1.jpg', rating: 4.9, comments: 142 },
    { id: 2, name: 'Product 2', image: 'product2.jpg', rating: 4.9, comments: 142 },
    { id: 3, name: 'Product 3', image: 'product3.jpg', rating: 4.9, comments: 142 },
    { id: 4, name: 'Product 4', image: 'product4.jpg', rating: 4.9, comments: 142 },

  ];
  return (
    <div className={styles.productContainer}>
      {products.map((product) => (
        <MiniProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}
