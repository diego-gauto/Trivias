import { useEffect, useState } from "react";

import ProgressBar from "../progressBar/progressBar";
import styles from "./trivia.module.css";

const {
  trivia,
  trivia_title,
  progressBarContainer,
  pregunta,
  question,
  answer,
  answers,
  button,
  active,
  popup
} = styles;

export default function Trivia({
  triviaTitle,
  data,
  questionNumber,
  setQuestionNumber,
  setCorrect,
}: any) {
  const [questionTrivia, setQuestionTrivia]: any = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [correcta, setCorrecta] = useState(false);
  const [className, setClassName] = useState(answer);
  const [showPopup, setShowPopup] = useState(false);

  const handleMouseEnter = () => {
    if (isButtonDisabled) {
      setShowPopup(true);
    }
    console.log("adentro del boton")
  };

  const handleMouseLeave = () => {
    setShowPopup(false);
    console.log("saliendo del boton")

  };


  useEffect(() => {
    setQuestionTrivia(data[questionNumber - 1]);
  }, [questionNumber, data, showPopup]);

  const handleClickOption = (a: any) => {
    setSelectedAnswer(a.text);
    setClassName(active);
    setCorrecta(a.correct);

    // if (a.correct) {
    //   setCorrect((prev) => prev + 1);
    // }

    // setQuestionNumber((prev) => prev + 1);
    // setSelectedAnswer(null);
  };

  const handleClickButton = () => {
    if (correcta) {
      setCorrect((prev: any) => prev + 1);
    }

    setQuestionNumber((prev: any) => prev + 1);
    setSelectedAnswer(null);
  };

  const isButtonDisabled = selectedAnswer === null;

  console.log(showPopup)

  return (
    <div className={trivia}>
      <div className={trivia_title}>{triviaTitle}</div>
      <div className={progressBarContainer}>
        {" "}
        <ProgressBar value={questionNumber - 1} />
      </div>
      <div className={pregunta}>Pregunta {questionNumber}/5</div>
      <div className={styles.question}>{questionTrivia?.question}</div>
      <div className={answers}>
        {questionTrivia?.answers.map((a: any, index: any) => (
          <div
            className={selectedAnswer === a.text ? className : styles.answer}
            onClick={() => handleClickOption(a)}
            key={index}
          >
            {a.text}
          </div>
        ))}
      </div>
      <button
        className={`${button} ${isButtonDisabled ? styles.disabled : ""}`}
        onClick={() => handleClickButton()}
        onMouseEnter={() => { console.log("onMouseEnter"); handleMouseEnter() }}
        onMouseLeave={() => { console.log("onMouseLeave"); handleMouseLeave() }}
        disabled={isButtonDisabled}>
        Próxima pregunta
      </button>
      {showPopup && isButtonDisabled && (
        <div className={popup}>
          Por favor selecciona una respuesta antes de continuar.
        </div>
      )}
    </div>
  );
}
