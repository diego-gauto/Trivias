import React, { useEffect, useState } from "react";

import styles from "./countdown30s.module.css";

const COUNTDOWN_TARGET = new Date();
COUNTDOWN_TARGET.setSeconds(COUNTDOWN_TARGET.getSeconds() + 31);

const formatTime = (value: number) => value.toString().padStart(2, '0');

const getTimeLeft = (targetTime: Date) => {
  const now = new Date();
  const totalTimeLeft: number = targetTime.getTime() - now.getTime();
  const segundos = Math.floor((totalTimeLeft / 1000) % 60);
  return { segundos };
};

const Countdown30Seconds = () => {
  const { countdown, content, box, valor, etiqueta } = styles;
  const [countdownTarget, setCountdownTarget] = useState(new Date());
  const [timeLeft, setTimeLeft] = useState(() => getTimeLeft(countdownTarget));

  useEffect(() => {
    // Set the countdown target time to 30 seconds from now every time the component mounts
    const newTarget = new Date();
    newTarget.setSeconds(newTarget.getSeconds() + 31);
    setCountdownTarget(newTarget);

    const timer = setInterval(() => {
      const updatedTimeLeft = getTimeLeft(newTarget);
      if (updatedTimeLeft.segundos >= 0) {
        setTimeLeft(updatedTimeLeft);
      } else {
        clearInterval(timer);
      }
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <div className={countdown}>
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

export default Countdown30Seconds;
