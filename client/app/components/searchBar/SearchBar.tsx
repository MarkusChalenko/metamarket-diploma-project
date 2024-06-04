import React, { useState } from 'react';
import { useRouter } from 'next/router';
import styles from './SearchBar.module.css'; // CSS стили
import Image from "next/image";
import zoomImage from "@/assets/images/zoom.svg";

export const SearchBar: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Перенаправление на страницу с результатами поиска
    router.push(`/search?term=${encodeURIComponent(searchTerm)}`);
    // Очистка поля поиска после отправки
    setSearchTerm('');
  };

  return (
    <form onSubmit={handleSearch} className={styles.searchForm}>
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className={styles.searchInput}
      />
      <button type="submit" className={styles.searchButton}>
        <Image
          src={zoomImage}
          width={30}
          height={30}
          alt="Zoom"
          draggable={false}
        />
      </button>
    </form>
  );
};

