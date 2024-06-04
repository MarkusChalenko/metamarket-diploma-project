import React, { useEffect, useState } from 'react';
import styles from './ProductList.module.css';

type Product = {
  name: string;
  description: string;
  currency: string;
  creationDate: string;
  lastPrice: string;
  status: string;
};

const products: Product[] = [
  {
    name: 'Product 1',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...',
    currency: 'USDT',
    creationDate: '01.01.2024',
    lastPrice: '0 USD',
    status: 'Available',
  },
  // {
  //   name: 'Camera',
  //   description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...',
  //   currency: 'USDT',
  //   creationDate: '01.01.2024',
  //   lastPrice: '0 USD',
  //   status: 'Available',
  // },
  // {
  //   name: 'Soap',
  //   description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...',
  //   currency: 'USDT',
  //   creationDate: '01.01.2024',
  //   lastPrice: '0 USD',
  //   status: 'Available',
  // }
];

const ProductList: React.FC = () => {
  const [hasVisited, setHasVisited] = useState<boolean>(false);

  useEffect(() => {
    const visited = localStorage.getItem('hasVisited');
    if (visited === 'true') {
      setHasVisited(true);
      // localStorage.setItem('hasVisited', 'false');
    } else {
      // localStorage.setItem('hasVisited', 'true');
      setHasVisited(false);
    }
  }, []);

  return (
    <div className={styles.productList}>
      <div className={styles.sellerInfo}>
        <img src="/images/avagar.png" alt="avatar" className={styles.avatar} />
        <div className={styles.sellerDetails}>
          <h1>Noah Silliman</h1>
          <p>noah@ex.com - customer</p>
        </div>
      </div>
      <h2><b>Products</b></h2>
      {!hasVisited ? (
        <p>У вас еще нет товаров.</p>
      ) : (
        products.map((product, index) => (
          <div key={index} className={styles.productCard}>
            <img src={`/images/product${index+1}.webp`} alt={`product${index+1}`} className={styles.productImage}></img>
            <div className={styles.productDetails}>
              <h3><b>{product.name}</b></h3>
              <p>{product.description}</p>
              <p><strong>Currency:</strong> {product.currency}</p>
              {/*<p><strong>Creation Date:</strong> {product.creationDate}</p>*/}
              <p><strong>Last Price:</strong> {product.lastPrice}</p>
              <p><strong>Status:</strong> {product.status}</p>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default ProductList;
