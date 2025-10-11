"use client";
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';

import Trivia from '../../../components/Trivias/trivia/trivia';
import Result from '../../../components/Trivias/result/result';
import Banner from '../../../components/Trivias/banner/banner';
import TriviaSelector from '../../../containers/Trivias/TriviaSelector/triviaSelector';
import Loader from '../../../components/Loader';
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
          // select trivia by route param if available
          const found = !Number.isNaN(triviaIdNumber)
            ? triviasData.find((t: any) => Number(t.id) === triviaIdNumber)
            : undefined;
          setTrivia(found ?? triviasData[0]);
        }
        // Provide the full list for the selector
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
    return <Loader />;
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
