"use client";
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';

import Trivia from '../../../components/Trivias/trivia/trivia';
import Result from '../../../components/Trivias/result/result';
import Banner from '../../../components/Trivias/banner/banner';
import TriviaSelector from '../../../containers/Trivias/TriviaSelector/triviaSelector';
import {
  Background,
  LoaderContain,
  LoaderImage,
} from '../../../components/Loader.styled';
import styles from './index.module.css';

export default function TriviaPage() {
  const [questionNumber, setQuestionNumber] = useState(1);
  const [correct, setCorrect] = useState(0);
  const [trivia, setTrivia] = useState<any>({});
  const [trivias, setTrivias] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const params = useParams();
  const triviaIdNumber = Number(params?.triviaId);

  const RESULT_DIC = {
    5: 0,
    4: 1,
    3: 1,
    2: 2,
    1: 2,
    0: 2,
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/trivias.json');
        const triviasData = await response.json();
        if (triviasData && triviasData.length > 0) {
          setTrivia(triviasData[0]);
        }
        // Poner los datos completos en el selector para que las cards reciban triviaInfo.correctamente
        setTrivias(triviasData);
        setQuestionNumber(1);
        setCorrect(0);
        setLoading(false);
      } catch (error) {
        console.error('Error al obtener los datos de la trivia:', error);
      }
    };
    fetchData();
  }, [triviaIdNumber]);

  useEffect(() => {
    if (questionNumber > 5) {
      window.scrollTo(0, 0);
    }
  }, [questionNumber]);

  if (loading) {
    return (
      <Background className={styles.backgroundCenter}>
        <LoaderImage>
          <LoaderContain />
        </LoaderImage>
      </Background>
    );
  }

  return (
    <div className={styles.app}>
      {questionNumber > 5 ? (
        <Result
          resultInfo={trivia?.result?.[RESULT_DIC[correct as keyof typeof RESULT_DIC]]}
          result={RESULT_DIC[correct as keyof typeof RESULT_DIC]}
        />
      ) : (
        <div className={styles.main}>
          <div className={styles.trivia}>
            <Trivia
              triviaTitle={trivia?.title}
              data={trivia?.questions}
              questionNumber={questionNumber}
              setQuestionNumber={setQuestionNumber}
              setCorrect={setCorrect}
            />
          </div>
          <div className={styles.publicity}>
            <img
              src={trivia?.questions[questionNumber - 1]?.imgQuestion}
              alt=''
            />
          </div>
        </div>
      )}
      <Banner />
      <h3 className={`${styles.subtitle} ${styles.subtitleMargin}`}>
        Más cuestionarios
      </h3>
      <div className={styles.triviaSelectorContainer}>
        <TriviaSelector trivias={trivias} setQuestionNumber={setQuestionNumber} />
      </div>
    </div>
  );
}
