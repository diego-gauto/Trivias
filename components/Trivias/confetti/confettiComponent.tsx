import Confetti from "react-confetti";
import { useWindowSize } from "react-use";
import React, { useState, useEffect } from "react";

const ConfettiComponent = () => {
  const [showConfetti, setShowConfetti] = useState(true);
  const { width, height } = useWindowSize();

  useEffect(() => {
    let timer = setTimeout(() => {
      setShowConfetti(false);
    }, 8000);
    console.log(showConfetti); // Agrega este console.log
    return () => clearTimeout(timer);
  }, [showConfetti]);

  return <>{showConfetti && <Confetti width={width} height={height} />}</>;
};

export default ConfettiComponent;
