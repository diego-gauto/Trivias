import { useEffect, useState } from 'react';

import { getAllTriviasApi } from '../../../components/api/trivias';
import {
  Background,
  LoaderContain,
  LoaderImage,
} from '../../../screens/Login.styled';
import TriviaSelector from '../TriviaSelector/triviaSelector';
import styles from './triviasHome.module.css';

interface Trivia {
  id: number;
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
        const triviasData = await getAllTriviasApi();
        setTrivias(triviasData);
        setLoading(false);
      } catch (error) {
        console.error('Error al obtener las trivias:', error);
      }
    };

    fetchTrivias();
  }, []);

  if (loading) {
    return (
      <Background style={{ alignItems: 'center', justifyContent: 'center' }}>
        <LoaderImage>
          <LoaderContain />
        </LoaderImage>
      </Background>
    );
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
