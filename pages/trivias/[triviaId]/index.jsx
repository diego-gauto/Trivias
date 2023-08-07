// import "../containers/home.css";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

import {getAllTriviasApi, getTriviaApi} from "../../../components/api/trivias"
// import { useParams } from "react-router-dom";
import Trivia from "../../../components/Trivias/trivia/trivia";
import Result from "../../../components/Trivias/result/result";
import Banner from "../../../components/Trivias/banner/banner";
import TriviaSelector from "../../../containers/Trivias/TriviaSelector/triviaSelector";
// import mujer1 from "../assets/Mujer1.svg";
// import mujer2 from "../assets/mujer2-removebg-preview.png";
// import mujer3 from "../assets/mujer3.svg";
// import mujer4 from "../assets/mujer4.svg";
// import imgResult from "../assets/mujerinfluencer.svg";

import styles from "./index.module.css";

function Trivias() {
  const [questionNumber, setQuestionNumber] = useState(1);
  const [correct, setCorrect] = useState(0);
  const [trivia, setTrivia] = useState({})
  const [trivias, setTrivias] = useState([])
  const {
    query: { triviaId },
  } = useRouter();
  const router = useRouter();

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

        const triviasRes = await getAllTriviasApi()
        if (triviasRes) {
          const triviasFilter = triviasRes.filter(trivia => trivia.id !== Number(triviaId))
          // let prevTrivia = trivia;
          setTrivias(triviasFilter);
        }

        const res = await getTriviaApi(Number(triviaId));

        const triviaTemp = res[0]

        // Parsear la cadena JSON en la propiedad "questions"
        triviaTemp.questions = JSON.parse(triviaTemp.questions);

        // Parsear la cadena JSON en la propiedad "result"
        triviaTemp.result = JSON.parse(triviaTemp.result);

        if (triviaTemp) {
          // let prevTrivia = trivia;
          setTrivia(triviaTemp);
        }
        setQuestionNumber(1)
      } catch (error) {
        console.error('Error al obtener los datos de la trivia:', error);
      }

    };

    fetchData();

  }, [triviaId]);

  useEffect(() => {
    if (questionNumber > 5) {
      window.scrollTo(0, 0); // Desplazamiento hacia arriba al llegar a la pregunta 5
    }
  }, [questionNumber]);


  return (
    <div className={styles.app}>
          {trivia?.questions ? (
      questionNumber > 5 ? (
        <Result
          resultInfo={trivia?.result[RESULT_DIC[correct]]}
          result={RESULT_DIC[correct]}
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
            <img src={trivia?.questions[questionNumber - 1]?.imgQuestion} alt="" />
          </div>
        </div>
      )
    ) : (
      <p>Cargando...</p>
    )}
      <Banner />

      <h3 className={styles.subtitle} style={{ marginTop: 2 + "rem" }}>
        Más cuestionarios
      </h3>
      <div className={styles.triviaSelectorContainer}>
        <TriviaSelector trivias={trivias} setQuestionNumber={setQuestionNumber}/>
      </div>
    </div>
  );
}

export default Trivias;
