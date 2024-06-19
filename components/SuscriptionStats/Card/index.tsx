// src/components/CardStats.tsx

import React from "react";

import styles from "./cardStats.module.css";

interface CardProps {
  type: string;
  suscriptores: number;
}

const CardStats: React.FC<CardProps> = ({ type, suscriptores }) => {
  return (
    <div className={styles.cardContainer}>
      <div className={styles.cardTop}></div>
      <div className={styles.card}>
        <h3 className={styles.title}>Suscripciones</h3>
        <h4>{type}</h4>
        <div className={styles.content}>
          <p>{suscriptores}</p>
        </div>
      </div>
      <div className={styles.cardBackground}></div>
    </div>
  );
};

export default CardStats;


