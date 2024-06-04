import {MiniProductCard} from "@/components/product/MiniProductCard";
import {FC, useEffect, useState} from "react";

import { useRouter } from 'next/router';


import styles from "./Products.module.css"
import {CreateService} from "@/services/product/create.service";
import {IProduct} from "@/shared/types/product.types";

const DEFAULT_CATEGORY_ID = "1"

export const Product: FC = (): JSX.Element => {
  // const [products, setProducts] = useState<[IProduct]>()
  // const [categoryId, setCategoryId] = useState(DEFAULT_CATEGORY_ID);
  // const router = useRouter();
  // const { category } = router.query;

  // useEffect(() => {
  //   // Если id присутствует в URL, используем его, иначе используем значение по умолчанию
  //   if (category) {
  //     setCategoryId(category);
  //   } else {
  //     setCategoryId(DEFAULT_CATEGORY_ID);
  //   }
  // }, [category]);

  // useEffect(() => {
  //   const fetchProductsFromCategory = async () => {
  //     try {
  //       if(categoryId) {
  //         console.log(categoryId)
  //         const response = await CreateService.getProductsInCategory(categoryId);
  //         setProducts(response);
  //       }
  //     } catch (error) {
  //       console.error('Ошибка:', error);
  //     }
  //   };
  //
  //   fetchProductsFromCategory();
  // }, [categoryId]);

  const products = [
    { id: 1, name: 'Product 1', image: '/images/product1.webp', rating: 5, comments: 1 },
    { id: 2, name: 'Product 2', image: '/images/product2.avif', rating: 4.5, comments: 2 },
    { id: 3, name: 'Product 3', image: '/images/product3.jpeg', rating: 4, comments: 0 },
    { id: 4, name: 'Product 4', image: '/images/product4.webp', rating: 4, comments: 0 },
    { id: 5, name: 'Product 5', image: '/images/product4.webp', rating: 5, comments: 0 },
    { id: 6, name: 'Product 6', image: '/images/product4.webp', rating: 2, comments: 0 },
  ];
  return (
    <div className={styles.productContainer}>
      {products.map((product) => (
        <MiniProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}
