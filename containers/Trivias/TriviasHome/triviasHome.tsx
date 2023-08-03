import { useEffect, useState } from "react";

import { getAllTriviasApi } from "../../../components/api/trivias";
import TriviaSelector from "../TriviaSelector/triviaSelector";
import styles from "./triviasHome.module.css";

interface Trivia {
  id: number;
  img: string;
  title: string;
  color: string;
  trans: string;
}

const TriviaHome = () => {
  const triviasMock = [
    {
      id: 0,
      img: "/images/trivias/Trivia00/T00-Portada.png",
      title: "¿Cuánto te apoya tu esposo en tu emprendimiento?",
      color: "#C57DFF",
      trans: "#9115f7",
    },
    {
      id: 1,
      img: "/images/trivias/Trivia01/T01-Portada.png",
      title: "Gonvar te dice tu futuro en el mundo de las uñas",
      color: "#ffcb7d",
      trans: "#ffb800",
    },
    {
      id: 2,
      img: "/images/trivias/Trivia02/T02-Portada.png",
      title: "¿Qué nivel de manicurista eres?",
      color: "#7dffa2",
      trans: "#00c620",
    },
    {
      id: 3,
      img: "/images/trivias/mujer4.svg",
      title: "Descubre  tu bandera roja como manicurista",
      color: "#7de0ff",
      trans: "#156ff7",
    },
  ];

  const [trivias, setTrivias] = useState<Trivia[]>([]);

  useEffect(() => {
    const fetchTrivias = async () => {
      try {
        const triviasData = await getAllTriviasApi();
        console.log(triviasData)
        setTrivias(triviasData);
        // setTrivias(triviasMock)
      } catch (error) {
        console.error('Error al obtener las trivias:', error);
      }
    };

    fetchTrivias();
  }, []);

  return (
    <div className={styles.home}>
      <style jsx global>{`
        body {
          margin: 0px;
          padding: 0px;
        }
      `}</style>
      <img className={styles.premio} src="/images/trivias/Icono de premio.svg" alt="" />
      <h1 className={styles.title}>¡Comienza a jugar!</h1>
      <h3 className={styles.subtitle}>
        ¡Elige tu trivia favorita y gana un premio!
      </h3>

      <div className={styles.card_container}>
        <TriviaSelector trivias={trivias} />
      </div>
    </div>
  );
};

export default TriviaHome;
