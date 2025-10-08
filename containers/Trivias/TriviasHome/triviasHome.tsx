
"use client";
"use client";
import { useEffect, useState } from 'react';

import TriviaSelector from '../TriviaSelector/triviaSelector';
import styles from './triviasHome.module.css';

interface Trivia {
  img: string;
  title: string;
  color: string;
  trans: string;
}

const TriviaHome = () => {
  const [trivias, setTrivias] = useState<Trivia[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrivias = async () => {
      try {
        const response = await fetch('/trivias.json');
        const triviasData = await response.json();
        const formattedTrivias = triviasData.map((trivia: any) => ({
          id: trivia.id,
          imgSelector: trivia.imgSelector,
          title: trivia.title,
          color: trivia.color,
          trans: trivia.trans,
        }));
        setTrivias(formattedTrivias);
        setLoading(false);
      } catch (error) {
        console.error('Error al obtener las trivias:', error);
      }
    };

    fetchTrivias();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.home}>
      <style jsx global>{`
        body {
          margin: 0px;
          padding: 0px;
        }
      `}</style>
      <img
        className={styles.premio}
        src='/images/trivias/Icono de premio.svg'
        alt=''
      />
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