// import "../containers/home.css";
import { useState } from "react";
import { useRouter } from "next/router";
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
  const {
    query: { triviaId },
  } = useRouter();
  //   const { id } = useParams();

  const RESULT_DIC = {
    5: 0,
    4: 1,
    3: 1,
    2: 2,
    1: 2,
    0: 2,
  };

  const titles = [
    "¿Qué tipo de maquilladora soy",
    "¿Cuánto conozco de uñas?",
    "¿Cuánto conozco de labiales?",
    "¿Cuánto se de maquillar pestañas",
  ];

  const trivias = [
    {
      id: 0,
      img: "/images/trivias/mujer1.svg",
      title: "¿Qué tipo de maquilladora soy",
      color: "#C57DFF",
      trans: "#9115f7",
    },
    {
      id: 1,
      img: "/images/trivias/mujer2-removebg-preview.png",
      title: "¿Cuánto conozco de uñas?",
      color: "#ffcb7d",
      trans: "#ffb800",
    },
    {
      id: 2,
      img: "/images/trivias/mujer3.svg",
      title: "¿Cuánto conozco de labiales?",
      color: "#7dffa2",
      trans: "#00c620",
    },
    {
      id: 3,
      img: "/images/trivias/mujer4.svg",
      title: "¿Cuánto se de maquillar pestañas",
      color: "#7de0ff",
      trans: "#156ff7",
    },
  ];

  const data = [
    [
      {
        id: 1,
        question: "Qué tipo de producto comercializa la firma Rolex?",
        answers: [
          {
            text: "Teléfonos",
            correct: false,
          },
          {
            text: "Relojes",
            correct: true,
          },
          {
            text: "Comida",
            correct: false,
          },
          {
            text: "Cosméticos",
            correct: false,
          },
        ],
      },
      {
        id: 2,
        question: "Cuándo fue lanzado el sitio web Facebook?",
        answers: [
          {
            text: "2004",
            correct: true,
          },
          {
            text: "2005",
            correct: false,
          },
          {
            text: "2006",
            correct: false,
          },
          {
            text: "2007",
            correct: false,
          },
        ],
      },
      {
        id: 3,
        question:
          "Qué actor es el protagonista de las películas de Harry Potter?",
        answers: [
          {
            text: "Johnny Deep",
            correct: false,
          },
          {
            text: "Leonardo Di Caprio",
            correct: false,
          },
          {
            text: "Denzel Washington",
            correct: false,
          },
          {
            text: "Daniel Red Cliff",
            correct: true,
          },
        ],
      },
    ],
    [
      {
        id: 1,
        question: "Qué tipo de producto comercializa la firma Renaul?",
        answers: [
          {
            text: "Zapatillas",
            correct: false,
          },
          {
            text: "Televisores",
            correct: false,
          },
          {
            text: "Celulares",
            correct: false,
          },
          {
            text: "Autimóviles",
            correct: true,
          },
        ],
      },
      {
        id: 2,
        question: "Cuándo fue lanzado el sitio web Google?",
        answers: [
          {
            text: "1995",
            correct: true,
          },
          {
            text: "1998",
            correct: false,
          },
          {
            text: "2000",
            correct: false,
          },
          {
            text: "2002",
            correct: false,
          },
        ],
      },
      {
        id: 3,
        question:
          "Qué actor es el protagonista de las películas de El Señor de los Anillos?",
        answers: [
          {
            text: "Elija Wood",
            correct: true,
          },
          {
            text: "James Franco",
            correct: false,
          },
          {
            text: "Tom Holland",
            correct: false,
          },
          {
            text: "Daniel Red Cliff",
            correct: false,
          },
        ],
      },
    ],
    [
      {
        title: "¿Qué nivel de manicurista eres?",
        questions: [
          {
            id: 1,
            question: "Es una característica del monómero con MMA.",
            answers: [
              {
                text: "Tiene bajo olor",
                correct: false,
              },
              {
                text: "Es un monómero dental de alto riesgo para la salud cuando se usa para aplicación de uñas",
                correct: true,
              },
              {
                text: "Ideal para uñas acrilicas",
                correct: false,
              },
              {
                text: "Es un monómero seguro",
                correct: false,
              },
            ],
          },
          {
            id: 2,
            question:
              "¿Con qué gramaje de lima es correcto preparar la uña natural?",
            answers: [
              {
                text: "100/100",
                correct: false,
              },
              {
                text: "80/80",
                correct: false,
              },
              {
                text: "150/150",
                correct: false,
              },
              {
                text: "180 0 220",
                correct: true,
              },
            ],
          },
          {
            id: 3,
            question:
              "¿Cuál es la posición correcta del pincel para sellar el acrílico en la zona de cutícula?",
            answers: [
              {
                text: "a 45 grados",
                correct: true,
              },
              {
                text: "a 90 grados",
                correct: false,
              },
              {
                text: "a 120 grados",
                correct: false,
              },
              {
                text: "a 180 grados",
                correct: false,
              },
            ],
          },
          {
            id: 4,
            question:
              "¿Que parte de la uña artificial es la encargada de  brindar soporte a la estructura?",
            answers: [
              {
                text: "El tip",
                correct: false,
              },
              {
                text: "El molde",
                correct: false,
              },
              {
                text: "El ápice o apex",
                correct: true,
              },
              {
                text: "La zona de cutícula",
                correct: false,
              },
            ],
          },
          {
            id: 5,
            question: "¿En cuántas fases se divide  una aplicación de uñas?",
            answers: [
              {
                text: "Pegado del tip, limado, abrillantado",
                correct: false,
              },
              {
                text: "Colocación del molde, limado , abrillantado",
                correct: false,
              },
              {
                text: "Aplicación de producto, limado, abrillantado",
                correct: false,
              },
              {
                text: "preparación de la uña natural, aplicación del producto, limado, finalizado",
                correct: true,
              },
            ],
          },
        ],
        result: [
          {
            title: "¡Toda una profesional!",
            body: `Se nota tu experiencia a kilómetros.
            Siéntete afortunada de poder vivir de hacer lo que más te gusta pero no olvides que el mundo de las uñas está en un cambio constante donde la capacitación y actualizaciones sobre las nuevas tendencias harán que tu crecimiento profesional no se detenga.
            Explota tus capacidades y lleva al máximo tus  habilidades.
            Comienza a prepararte para que  en poco tiempo puedas impartir cursos y ampliar también tu crecimiento económico.            
            `,
            img: "/images/trivias/mujerinfluencer.svg",
          },
          {
            title: "¡A un paso del éxito!",
            body: `Se notan tus ganas de crecer en este mágico mundo de las uñas.
            En esta apasionante profesión jamás dejamos de aprender, hay cientos de técnicas y diseños de tendencia para las cuales debemos estar preparadas.
            Eres una persona que aprovecha cada oportunidad para seguir aprendiendo y aunque a veces te  cuesta, con un poco de práctica logras siempre tus objetivos.
            No necesitas de grandes cantidades de productos para lograr  diseños increíbles y tienes personas muy cercanas que creen en ti y que son tu fuente de inspiración.            
            `,
            img: "/images/trivias/mujerinfluencer.svg",
          },
          {
            title: `¡Felicidades, valiente principiante en el arte de las uñas! Has dado el primer paso hacia un viaje lleno de creatividad y transformación.
            Recuerda, cada pincelada cuenta. Cada esmalte, cada diseño y cada técnica que aprendas te llevarán un paso más cerca de convertirte en una maestra de las uñas. No te desanimes si al principio tus creaciones no son perfectas. El progreso se logra a través de la práctica y la perseverancia.            
           `,
            img: "/images/trivias/mujerinfluencer.svg",
          },
        ],
      },
    ],
  ];

  // console.log(data[id][0]);

  return (
    <div className={styles.app}>
      <style jsx global>{`
        body {
          margin: 0px;
          padding: 0px;
        }
      `}</style>
      {questionNumber > 5 ? (
        <Result
          resultInfo={data[triviaId][0]?.result[RESULT_DIC[correct]]}
          result={RESULT_DIC[correct]}
        />
      ) : (
        // <div className={styles.app}>
          <div className={styles.main}>
            <div className={styles.trivia}>
              <Trivia
                triviaTitle={data[triviaId][0]?.title}
                data={data[triviaId][0]?.questions}
                questionNumber={questionNumber}
                setQuestionNumber={setQuestionNumber}
                setCorrect={setCorrect}
              />
            </div>
            <div className={styles.publicity}>
              <img src="/images/trivias/imgTrivia.png" alt="" />
            </div>
          </div>
        // {/* </div> */}
      )}
      <Banner />

      <h3 className={styles.subtitle} style={{ marginTop: 2 + "rem" }}>
        Más cuestionarios
      </h3>
      <div className={styles.triviaSelectorContainer}>
        <TriviaSelector trivias={trivias} />
      </div>
    </div>
  );
}

export default Trivias;
