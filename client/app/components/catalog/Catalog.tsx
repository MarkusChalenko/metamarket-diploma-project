import React, { useEffect, useState } from 'react';

import styles from './Catalog.module.css'
import {CreateService} from "@/services/category/create.service";
import { TypeCategory } from '@/shared/types/category.types';

const Catalog = () => {
  const [categories, setCategories] = useState<TypeCategory[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await CreateService.getAllItem();
        setCategories(response);
      } catch (error) {
        console.error('Ошибка:', error);
      }
    };

    fetchCategories();
  }, []);

 return (
    <div className={styles.container}>
      <h2 className={styles.title}>Категория</h2>
      <div className={styles.categoryList}>
        {categories.map((category, index) => (
          <div key={index} className={styles.category}>
            <a href={`/?category=${category.id}`}>{category.name}</a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Catalog;
