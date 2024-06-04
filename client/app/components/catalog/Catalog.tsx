import React, { useEffect, useState } from 'react';

import styles from './Catalog.module.css'
import {CreateService} from "@/services/category/create.service";
import { TypeCategory } from '@/shared/types/category.types';

const Catalog = () => {
  const [categories, setCategories] = useState<TypeCategory[]>([
    {id: 1, name: "Одежда", description: ""},
    {id: 2, name: "Обувь", description: ""},
    {id: 3, name: "Для дома", description: ""},
    {id: 4, name: "Детские товары", description: ""},
    {id: 5, name: "Спорт и отдых", description: ""},
  ]);

  // useEffect(() => {
  //   const fetchCategories = async () => {
  //     try {
  //       const response = await CreateService.getAllItem();
  //       setCategories(response);
  //     } catch (error) {
  //       console.error('Ошибка:', error);
  //     }
  //   };
  //
  //   fetchCategories();
  // }, []);

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
