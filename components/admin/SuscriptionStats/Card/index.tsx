// src/components/CardStats.tsx

import React, { useEffect } from "react";

import styles from "./cardStats.module.css";

interface Stats {
  mensual_count: number;
  cuatri_count: number;
  anual_count: number
}

interface CardProps {
  type: string;
  suscriptions: Stats;
  color: string;
  isVisible: boolean
  onClick: () => void
}

const CardStats: React.FC<CardProps> = ({ type, suscriptions, color, isVisible, onClick }) => {
  const { cardContainer, cardBottom, cardTop, title, sub_type, stats, content, contentGrey, plans, subscriber } = styles
  const { mensual_count, cuatri_count, anual_count } = suscriptions
  const total = mensual_count + cuatri_count + anual_count

  useEffect(() => {
  }, [suscriptions]);

  return (
    <div className={cardContainer} onClick={onClick}>
      <div className={cardBottom} style={{ background: isVisible ? color : "#B0B0B0" }}>
        <div className={cardTop}>
          <div className={`${content} ${!isVisible ? contentGrey : ""}`}>
            <h3 className={`${title} ${!isVisible ? contentGrey : ""}`}> <span className={sub_type}>{type}</span></h3>
            <div className={stats}>
              <div className={plans}>
                <p>Mensuales: {mensual_count}</p>
                <p>Cuatrimestrales: {cuatri_count}</p>
                <p>Anuales: {anual_count}</p>
              </div>
              <div className={`${subscriber} ${!isVisible ? contentGrey : ""}`}>
                <p>{total}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardStats;


