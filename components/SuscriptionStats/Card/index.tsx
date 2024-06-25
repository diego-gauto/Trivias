// src/components/CardStats.tsx

import React from "react";

import styles from "./cardStats.module.css";

interface Suscriptions {
  month: number;
  quarter: number;
  anual: number
}

interface CardProps {
  type: string;
  suscriptores: number;
  suscriptions: Suscriptions;
  color: string
}

const CardStats: React.FC<CardProps> = ({ type, suscriptores, suscriptions, color }) => {
  const { cardContainer, cardBottom, cardTop, title, sub_type, stats, content, plans, subscriber } = styles
  return (
    <div className={cardContainer}>
      <div className={cardBottom} style={{ background: color }}>
        <div className={cardTop}>
          <div className={content}>
            <h3 className={title}>Suscripciones <span className={sub_type}>{type}</span></h3>
            <div className={stats}>
              <div className={plans}>
                <p>Mensuales: {suscriptions.month}</p>
                <p>Cuatrimestrales: {suscriptions.quarter}</p>
                <p>Anuales: {suscriptions.anual}</p>
              </div>
              <div className={subscriber}>
                <p>{suscriptores}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardStats;


