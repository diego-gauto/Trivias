import React, { useEffect, useState } from "react";

import styles from "./countdown.module.css";

const COUNTDOWN_TARGET = new Date();
COUNTDOWN_TARGET.setMinutes(COUNTDOWN_TARGET.getMinutes() + 7);

const formatTime = (value: number) => value.toString().padStart(2, '0');

const getTimeLeft = () => {
  const now = new Date();
  const totalTimeLeft: number = COUNTDOWN_TARGET.getTime() - now.getTime();
  const minutos = Math.floor((totalTimeLeft / (1000 * 60)) % 60);
  const segundos = Math.floor((totalTimeLeft / 1000) % 60);
  return { minutos, segundos };
};

const Countdown = () => {

  const { countdown, content, box, valor, etiqueta } = styles
  const [timeLeft, setTimeLeft] = useState(() => getTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      const updatedTimeLeft = getTimeLeft();
      // Verificar si el tiempo restante es mayor que cero antes de actualizar el estado
      if (updatedTimeLeft.minutos >= 0 && updatedTimeLeft.segundos >= 0) {
        setTimeLeft(updatedTimeLeft);
      } else {
        // Detener el intervalo cuando el tiempo llega a cero
        clearInterval(timer);
      }
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <div className={countdown}>
      <h2>Cuentas con 7 minutos para <b>enviar tu solicitud</b></h2>
      <div className={content}>
        {Object.entries(timeLeft).map((el) => {
          const label = el[0];
          const value = el[1];
          return (
            <div className={box} key={label}>
              <div className={valor}>
                <span>{formatTime(value)}</span>
              </div>
              <span className={etiqueta}> {label} </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Countdown;