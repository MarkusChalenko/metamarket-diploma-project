import React from 'react';
import styles from './MiniProductCard.module.css';
import Image from "next/image";

import axios from 'axios';

import comment from "@/assets/images/comment.svg"
import { MiniProductCardProps } from './miniProductCard.interface';
import {CreateService} from "@/services/cart/create.service";

export const MiniProductCard: React.FC<MiniProductCardProps> = ({ product }) => {
  const imageUrl = product.image ? product.image : 'placeholder.jpg';

  const addToCart = async (productId: number) => {
    try {
      await CreateService.addProductToUserCart(productId);
      alert('Product added to cart');
    } catch (error) {
      console.error('Error adding product to cart:', error);
    }
  };

  return (
    <div className={styles.card}>
      <img src={imageUrl} alt={product.name} className={styles.image} />
      <h3 className={styles.name}>
        <a href={`/product/${product.id}`} className={styles.link}>
          {product.name}
        </a>
      </h3>
      <div className={styles.info}>
        <span className={styles.rating}>
          <span role="img" aria-label="star">⭐</span> {product.rating}
        </span>
        <span className={styles.comments}>
          <div className={styles.commentSVG}>
            <Image src={comment} alt={'comment'}/>
          </div>
          {product.comments} отзывов
        </span>
      </div>
      <button onClick={() => {alert('Product added to cart'); localStorage.setItem('hasVisited', 'true');
 }} className={styles.addButton}>В корзину</button>
    </div>
  );
};

