import React, { useEffect, useState } from "react";

import Link from "next/link";
import { useRouter } from "next/router";

import { getTriviaApi, updateTriviaApi } from "../../../../../components/api/trivias";
import ITrivia, { ITriviaResult } from "../../../../../interfaces/iTrivias";
import { Background, LoaderContain, LoaderImage } from "../../../../../screens/Login.styled";
import styles from "./update.module.css";

const EditableTrivia = () => {

  const { container, inputGroup, inputGroupQuestion, inputGroupAnswers, inputGroupResult, button, buttonContainer } = styles

  const [loading, setLoading] = useState(true);

  const {
    query: { triviaId },
  } = useRouter();

  //   const data = [
  //     {
  //       id: 0,
  //       imgSelector: "/images/trivias/mujer1.svg",
  //       imgTrivia: "/images/trivias/imgTrivia.png",
  //       color: "#C57DFF",
  //       trans: "#9115f7",
  //       title: "¿Qué tipo de maquilladora soy?",
  //       questions: [
  //         {
  //           id: 1,
  //           question: "Es una característica del monómero con MMA.",
  //           imgQuestion: "/images/trivias/imgTrivia.png",
  //           answers: [
  //             {
  //               text: "Tiene bajo olor",
  //               correct: false,
  //             },
  //             {
  //               text: "Es un monómero dental de alto riesgo para la salud cuando se usa para aplicación de uñas",
  //               correct: true,
  //             },
  //             {
  //               text: "Ideal para uñas acrilicas",
  //               correct: false,
  //             },
  //             {
  //               text: "Es un monómero seguro",
  //               correct: false,
  //             },
  //           ],
  //         },
  //         {
  //           id: 2,
  //           question: "¿Con qué gramaje de lima es correcto preparar la uña natural?",
  //           imgQuestion: "/images/trivias/imgTrivia.png",
  //           answers: [
  //             {
  //               text: "100/100",
  //               correct: false,
  //             },
  //             {
  //               text: "80/80",
  //               correct: false,
  //             },
  //             {
  //               text: "150/150",
  //               correct: false,
  //             },
  //             {
  //               text: "180 0 220",
  //               correct: true,
  //             },
  //           ],
  //         },
  //         {
  //           id: 3,
  //           question: "¿Cuál es la posición correcta del pincel para sellar el acrílico en la zona de cutícula?",
  //           imgQuestion: "/images/trivias/imgTrivia.png",
  //           answers: [
  //             {
  //               text: "a 45 grados",
  //               correct: true,
  //             },
  //             {
  //               text: "a 90 grados",
  //               correct: false,
  //             },
  //             {
  //               text: "a 120 grados",
  //               correct: false,
  //             },
  //             {
  //               text: "a 180 grados",
  //               correct: false,
  //             },
  //           ],
  //         },
  //         {
  //           id: 4,
  //           question: "¿Que parte de la uña artificial es la encargada de  brindar soporte a la estructura?",
  //           imgQuestion: "/images/trivias/imgTrivia.png",
  //           answers: [
  //             {
  //               text: "El tip",
  //               correct: false,
  //             },
  //             {
  //               text: "El molde",
  //               correct: false,
  //             },
  //             {
  //               text: "El ápice o apex",
  //               correct: true,
  //             },
  //             {
  //               text: "La zona de cutícula",
  //               correct: false,
  //             },
  //           ],
  //         },
  //         {
  //           id: 5,
  //           question: "¿En cuántas fases se divide  una aplicación de uñas?",
  //           imgQuestion: "/images/trivias/imgTrivia.png",
  //           answers: [
  //             {
  //               text: "Pegado del tip, limado, abrillantado",
  //               correct: false,
  //             },
  //             {
  //               text: "Colocación del molde, limado , abrillantado",
  //               correct: false,
  //             },
  //             {
  //               text: "Aplicación de producto, limado, abrillantado",
  //               correct: false,
  //             },
  //             {
  //               text: "preparación de la uña natural, aplicación del producto, limado, finalizado",
  //               correct: true,
  //             },
  //           ],
  //         },
  //       ],
  //       result: [
  //         {
  //           title: "¡Toda una profesional!",
  //           body: `Se nota tu experiencia a kilómetros.
  //           Siéntete afortunada de poder vivir de hacer lo que más te gusta pero no olvides que el mundo de las uñas está en un cambio constante donde la capacitación y actualizaciones sobre las nuevas tendencias harán que tu crecimiento profesional no se detenga.
  //           Explota tus capacidades y lleva al máximo tus  habilidades.
  //           Comienza a prepararte para que  en poco tiempo puedas impartir cursos y ampliar también tu crecimiento económico.`,
  //           img: "/images/trivias/mujerinfluencer.svg",
  //           idTemplateBrevo: 7,
  //         },
  //         {
  //           title: "¡A un paso del éxito!",
  //           body: `Se notan tus ganas de crecer en este mágico mundo de las uñas.
  //           En esta apasionante profesión jamás dejamos de aprender, hay cientos de técnicas y diseños de tendencia para las cuales debemos estar preparadas.
  //           Eres una persona que aprovecha cada oportunidad para seguir aprendiendo y aunque a veces te  cuesta, con un poco de práctica logras siempre tus objetivos.
  //           No necesitas de grandes cantidades de productos para lograr  diseños increíbles y tienes personas muy cercanas que creen en ti y que son tu fuente de inspiración.`,
  //           img: "/images/trivias/mujerinfluencer.svg",
  //           idTemplateBrevo: 7,
  //         },
  //         {
  //           title: `Una principiante muy  aesthetic`,
  //           body: `"¡Felicidades, valiente principiante en el arte de las uñas! Has dado el primer paso hacia un viaje lleno de creatividad y transformación.
  //           Recuerda, cada pincelada cuenta. Cada esmalte, cada diseño y cada técnica que aprendas te llevarán un paso más cerca de convertirte en una maestra de las uñas. No te desanimes si al principio tus creaciones no son perfectas. El progreso se logra a través de la práctica y la perseverancia.`,
  //           img: "/images/trivias/mujerinfluencer.svg",
  //           idTemplateBrevo: 7,
  //         },
  //       ],
  //     },
  //     {
  //       id: 1,
  //       imgSelector: "/images/trivias/Trivia01/T01-Portada.png",
  //       imgTrivia: "/images/trivias/imgTrivia.png",
  //       color: "#ffcb7d",
  //       trans: "#ffb800",
  //       title: "Gonvar te dice tu futuro en el mundo de las uñas",
  //       questions: [
  //         {
  //           id: 1,
  //           question: "Actualmente ¿has tomado o estás  tomando alguna capacitación en uñas?",
  //           imgQuestion: "/images/trivias/Trivia01/T01Q1.jpg",
  //           answers: [
  //             {
  //               text: "Nunca  he tomado un curso, pero deseo aprender",
  //               correct: false,
  //             },
  //             {
  //               text: "Si, tomé alguno pero no me funcionó",
  //               correct: false,
  //             },
  //             {
  //               text: "Actualmente estoy cursando un entrenamiento básico acrilicas",
  //               correct: false,
  //             },
  //             {
  //               text: "Ya realizo aplicaciones y me  actualizo con cursos constantemente",
  //               correct: true,
  //             },
  //           ],
  //         },
  //         {
  //           id: 2,
  //           question: "Cuando elijo mis capacitaciones me dejo llevar por:",
  //           imgQuestion: "/images/trivias/Trivia01/T01Q2.jpg",
  //           answers: [
  //             {
  //               text: "El costo, siempre busco lo más barato",
  //               correct: false,
  //             },
  //             {
  //               text: "El instructor, elijo  siempre a alguien reconocido",
  //               correct: false,
  //             },
  //             {
  //               text: "No me gustan los cursos  en línea",
  //               correct: false,
  //             },
  //             {
  //               text: "Elijo mis cursos  de acuerdo al tema",
  //               correct: true,
  //             },
  //           ],
  //         },
  //         {
  //           id: 3,
  //           question: "Si  no obtengo resultados en los primeros intentos yo:",
  //           imgQuestion: "/images/trivias/Trivia01/T01Q3.jpg",
  //           answers: [
  //             {
  //               text: "Lo intento pero solo 3 veces y lo dejo por la paz",
  //               correct: false,
  //             },
  //             {
  //               text: "Me frustro un poco, pero lo sigo intentando",
  //               correct: false,
  //             },
  //             {
  //               text: "Analizo mis áreas de oportunidad, me doy un descanso y regreso con más fuerza",
  //               correct: true,
  //             },
  //             {
  //               text: "Me desanimo completamente y pienso que las uñas no es lo mio",
  //               correct: false,
  //             },
  //           ],
  //         },
  //         {
  //           id: 4,
  //           question: "Cuando termino algún curso yo:",
  //           imgQuestion: "/images/trivias/Trivia01/T01Q4.jpg",
  //           answers: [
  //             {
  //               text: "Sigo practicando y repasando para seguir mejorando",
  //               correct: true,
  //             },
  //             {
  //               text: "Cuelgo mi reconocimiento en la pared",
  //               correct: false,
  //             },
  //             {
  //               text: "Nunca  vuelvo  a hacer una práctica  porque mis clientas no me lo piden",
  //               correct: false,
  //             },
  //             {
  //               text: "Siempre quiero tomar otro  y otro más",
  //               correct: false,
  //             },
  //           ],
  //         },
  //         {
  //           id: 5,
  //           question: "Mi  mayor interés en el mundo de  las uñas es :",
  //           imgQuestion: "/images/trivias/Trivia01/T01Q5.jpg",
  //           answers: [
  //             {
  //               text: "Solo aplicarme a mí misma y a familiares cercanos",
  //               correct: false,
  //             },
  //             {
  //               text: "Autoemplearme y trabajar desde mi casa",
  //               correct: false,
  //             },
  //             {
  //               text: "Abrir un local dedicado a la aplicación y servicios de belleza",
  //               correct: false,
  //             },
  //             {
  //               text: "Abrir una academia y preparar a más personas en temas de belleza",
  //               correct: true,
  //             },
  //           ],
  //         },
  //       ],
  //       result: [
  //         {
  //           title: "La perseverancia te  llevará  al éxito",
  //           body: `Eres una persona increíblemente talentosa y dedicada en el mundo de las uñas. Tu arduo trabajo y pasión han formado el camino hacia un futuro verdaderamente prometedor. No hay límite para lo que puedes lograr. Cada golpe de pincel es un paso más hacia la realización de tus sueños. Tus habilidades son excepcionales y tu determinación es inspiradora. Los éxitos y las oportunidades están a punto de desplegarse ante ti. Sigue creyendo en ti misma, porque tus sueños están a punto de hacerse realidad.
  // Revisa  tu correo para  ver tu futuro completo`,
  //           img: "/images/trivias/Trivia01/T01R1.png",
  //           idTemplateBrevo: 7,
  //         },
  //         {
  //           title: "Tu esfuerzo será recompensado muy pronto",
  //           body: `Has trabajado incansablemente, y tus esfuerzos no pasarán desapercibidos. El mundo de las uñas espera ansioso tu llegada, donde tus sueños están a punto de materializarse. Tu dedicación y pasión te han preparado para un futuro prometedor. Con cada pincelada, construirás una carrera brillante, dejando huella en cada mano que toques. Las puertas se abrirán para ti, y te encontrarás rodeada de éxitos y oportunidades. Mantén la fe en ti misma, porque tus sueños están a punto de convertirse en realidad.
  // Te envie un correo con algunos consejos para lograrlo`,
  //           img: "/images/trivias/Trivia01/T01R2.png",
  //           idTemplateBrevo: 7,
  //         },
  //         {
  //           title: `Tus manos tienen el poder de pintar un camino lleno de éxito`,
  //           body: `Querida mujer, tu determinación y valentía son inquebrantables. Aunque puedas enfrentar desafíos y falta de apoyo, no permitas que eso te detenga. Con estudio, trabajo arduo y una pasión inagotable, el éxito en el mundo de las uñas está a punto de abrazarte. Tus habilidades brillantes y tu dedicación te llevarán lejos. Recuerda que las opiniones negativas no definen tu camino, sino tu fuerza interior. Sigue adelante con confianza y alcanzarás tus metas. El mundo espera ansiosamente tu talento. ¡No te rindas!`,
  //           img: "/images/trivias/Trivia01/T01R3.png",
  //           idTemplateBrevo: 7,
  //         },
  //       ],
  //     },
  //     {
  //       id: 2,
  //       imgSelector: "/images/trivias/Trivia02/T02-Portada.png",
  //       imgTrivia: "/images/trivias/imgTrivia.png",
  //       color: "#7dffa2",
  //       trans: "#00c620",
  //       title: "¿Qué nivel de manicurista eres?",
  //       questions: [
  //         {
  //           id: 1,
  //           question: "Es una característica del monómero con MMA.",
  //           imgQuestion: "/images/trivias/Trivia02/T02Q1.jpg",
  //           answers: [
  //             {
  //               text: "Tiene bajo olor",
  //               correct: false,
  //             },
  //             {
  //               text: "Es un monómero dental de alto riesgo para la salud cuando se usa para aplicación de uñas",
  //               correct: true,
  //             },
  //             {
  //               text: "Ideal para uñas acrilicas",
  //               correct: false,
  //             },
  //             {
  //               text: "Es un monómero seguro",
  //               correct: false,
  //             },
  //           ],
  //         },
  //         {
  //           id: 2,
  //           question: "¿Con qué gramaje de lima es correcto preparar la uña natural?",
  //           imgQuestion: "/images/trivias/Trivia02/T02Q2.jpg",
  //           answers: [
  //             {
  //               text: "100/100",
  //               correct: false,
  //             },
  //             {
  //               text: "80/80",
  //               correct: false,
  //             },
  //             {
  //               text: "150/150",
  //               correct: false,
  //             },
  //             {
  //               text: "180 0 220",
  //               correct: true,
  //             },
  //           ],
  //         },
  //         {
  //           id: 3,
  //           question: "¿Cuál es la posición correcta del pincel para sellar el acrílico en la zona de cutícula?",
  //           imgQuestion: "/images/trivias/Trivia02/T02Q3.jpg",
  //           answers: [
  //             {
  //               text: "a 45 grados",
  //               correct: true,
  //             },
  //             {
  //               text: "a 90 grados",
  //               correct: false,
  //             },
  //             {
  //               text: "a 120 grados",
  //               correct: false,
  //             },
  //             {
  //               text: "a 180 grados",
  //               correct: false,
  //             },
  //           ],
  //         },
  //         {
  //           id: 4,
  //           question: "¿Que parte de la uña artificial es la encargada de  brindar soporte a la estructura?",
  //           imgQuestion: "/images/trivias/Trivia02/T02Q4.jpg",
  //           answers: [
  //             {
  //               text: "El tip",
  //               correct: false,
  //             },
  //             {
  //               text: "El molde",
  //               correct: false,
  //             },
  //             {
  //               text: "El ápice o apex",
  //               correct: true,
  //             },
  //             {
  //               text: "La zona de cutícula",
  //               correct: false,
  //             },
  //           ],
  //         },
  //         {
  //           id: 5,
  //           question: "¿En cuántas fases se divide  una aplicación de uñas?",
  //           imgQuestion: "/images/trivias/Trivia02/T02Q5.jpg",
  //           answers: [
  //             {
  //               text: "Pegado del tip, limado, abrillantado",
  //               correct: false,
  //             },
  //             {
  //               text: "Colocación del molde, limado , abrillantado",
  //               correct: false,
  //             },
  //             {
  //               text: "Aplicación de producto, limado, abrillantado",
  //               correct: false,
  //             },
  //             {
  //               text: "preparación de la uña natural, aplicación del producto, limado, finalizado",
  //               correct: true,
  //             },
  //           ],
  //         },
  //       ],
  //       result: [
  //         {
  //           title: "¡Toda una profesional!",
  //           body: `Se nota tu experiencia a kilómetros.
  // Siéntete afortunada de poder vivir de hacer lo que más te gusta pero no olvides que el mundo de las uñas está en un cambio constante donde la capacitación y actualizaciones sobre las nuevas tendencias harán que tu crecimiento profesional no se detenga.
  // Explota tus capacidades y lleva al máximo tus  habilidades.
  // Comienza a prepararte para que  en poco tiempo puedas impartir cursos y ampliar también tu crecimiento económico.`,
  //           img: "/images/trivias/Trivia02/T02R1.jpg",
  //           idTemplateBrevo: 7,
  //         },
  //         {
  //           title: "¡A un paso del éxito!",
  //           body: `Se notan tus ganas de crecer en este mágico mundo de las uñas.
  // En esta apasionante profesión jamás dejamos de aprender, hay cientos de técnicas y diseños de tendencia para las cuales debemos estar preparadas.
  // Eres una persona que aprovecha cada oportunidad para seguir aprendiendo y aunque a veces te  cuesta, con un poco de práctica logras siempre tus objetivos.
  // No necesitas de grandes cantidades de productos para lograr  diseños increíbles y tienes personas muy cercanas que creen en ti y que son tu fuente de inspiración.`,
  //           img: "/images/trivias/Trivia02/T02R2.jpg",
  //           idTemplateBrevo: 7,
  //         },
  //         {
  //           title: `Una principiante muy  aesthetic`,
  //           body: `¡Felicidades, valiente principiante en el arte de las uñas!
  // Has dado el primer paso hacia un viaje lleno de creatividad y transformación.
  // Recuerda, cada pincelada cuenta. Cada esmalte, cada diseño y cada técnica que aprendas te llevarán un paso más cerca de convertirte en una maestra de las uñas. No te desanimes si al principio tus creaciones no son perfectas. El progreso se logra a través de la práctica y la perseverancia.`,
  //           img: "/images/trivias/Trivia02/T02R3.jpg",
  //           idTemplateBrevo: 7,
  //         },
  //       ],
  //     },
  //   ];


  const [updatedTrivia, setUpdatedTrivia] = useState<ITrivia | null>(null);
  const [imagePaths, setImagePaths] = useState<{ [key: string]: string }>({});

  // const trivia = data[Number(triviaId) - 1] || null;

  useEffect(() => {

    const fetchData = async () => {
      try {
        console.log(Number(triviaId))
        // const trivia = await getAllTriviasApi();
        const res = await getTriviaApi(Number(triviaId));
        const triviaTemp = res[0]
        // Parsear la cadena JSON en la propiedad "questions"
        triviaTemp.questions = JSON.parse(triviaTemp.questions);

        // Parsear la cadena JSON en la propiedad "result"
        triviaTemp.result = JSON.parse(triviaTemp.result);


        console.log(triviaTemp)

        if (triviaTemp) {
          // let prevTrivia = trivia;
          setUpdatedTrivia(triviaTemp);

          const initialImagePaths: { [key: string]: string } = {};

          initialImagePaths["imgPathSelector"] = triviaTemp.imgSelector;

          triviaTemp.questions.forEach((question: any) => {
            initialImagePaths[`imgPathQuestion-${question.id}`] = question.imgQuestion;
          });

          triviaTemp.result.forEach((result: any, index: any) => {
            initialImagePaths[`imgPathResult-${index}`] = result.img;
          });

          setImagePaths(initialImagePaths);
        }

        setLoading(false);

      } catch (error) {
        console.error('Error al obtener la trivia:', error);
      }

    };

    fetchData();

    // if (trivia) {
    //   let prevTrivia = trivia;
    //   setUpdatedTrivia(prevTrivia);

    //   const initialImagePaths: { [key: string]: string } = {};

    //   initialImagePaths["imgPathSelector"] = prevTrivia.imgSelector;

    //   prevTrivia.questions.forEach((question) => {
    //     initialImagePaths[`imgPathQuestion-${question.id}`] = question.imgQuestion;
    //   });

    //   prevTrivia.result.forEach((result, index) => {
    //     initialImagePaths[`imgPathResult-${index}`] = result.img;
    //   });

    //   setImagePaths(initialImagePaths);
    // }
  }, []);

  const isQuestionInput = (name: string) => name.startsWith("question-");
  const isAnswerInput = (name: string) => name.startsWith("answer-");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // Verificar si el input corresponde a una imagen de pregunta
    if (name.startsWith("imgPathQuestion-")) {
      const questionId = parseInt(name.split("-")[1] || "");
      setImagePaths((prevImagePaths) => ({
        ...prevImagePaths,
        [name]: value,
      }));
      setUpdatedTrivia((prevState) => {
        if (!prevState) return null;
        const updatedQuestions = prevState.questions.map((question) => {
          if (question.id === questionId) {
            return {
              ...question,
              imgQuestion: value,
            };
          }
          return question;
        });
        return {
          ...prevState,
          questions: updatedQuestions,
        };
      });
    }
    // Verificar si el input corresponde a una imagen de selector
    else if (name.startsWith("imgPathSelector")) {
      setImagePaths((prevImagePaths) => ({
        ...prevImagePaths,
        [name]: value,
      }));
      setUpdatedTrivia({
        ...updatedTrivia!,
        ["imgSelector"]: value,
      });
    }
    // Verificar si el input corresponde a una pregunta
    else if (isQuestionInput(name)) {
      const questionId = parseInt(name.split("-")[1] || "");
      setUpdatedTrivia((prevState) => {
        if (!prevState) return null;

        const updatedQuestions = prevState.questions.map((question) => {
          if (question.id === questionId) {
            return {
              ...question,
              question: value,
            };
          }
          return question;
        });

        return {
          ...prevState,
          questions: updatedQuestions,
        };
      });
    }
    // Verificar si el input corresponde a una respuesta
    else if (isAnswerInput(name)) {
      const [questionId, answerIndex] = name.split("-").slice(1).map((part) => parseInt(part));
      setUpdatedTrivia((prevState) => {
        if (!prevState) return null;

        const updatedQuestions = prevState.questions.map((question) => {
          if (question.id === questionId) {
            const updatedAnswers = question.answers.map((answer, index) => {
              if (index === answerIndex) {
                return {
                  ...answer,
                  text: value,
                };
              }
              return answer;
            });

            return {
              ...question,
              answers: updatedAnswers,
            };
          }
          return question;
        });

        return {
          ...prevState,
          questions: updatedQuestions,
        };
      });
    }
    // Actualizar otros campos de input
    else {
      setUpdatedTrivia({
        ...updatedTrivia!,
        [name]: value,
      });
    }
  };

  const handleQuestionChange = (questionId: number, answerIndex: number, isCorrect: boolean) => {
    setUpdatedTrivia((prevState: any) => {
      const updatedQuestions = prevState.questions.map((question: any) => {
        if (question.id === questionId) {
          const updatedAnswers = question.answers.map((answer: any, index: number) => {
            if (index === answerIndex) {
              return {
                ...answer,
                correct: isCorrect,
              };
            }
            return answer;
          });

          return {
            ...question,
            answers: updatedAnswers,
          };
        }
        return question;
      });

      return {
        ...prevState,
        questions: updatedQuestions,
      };
    });
  };

  const handleResultChange = (
    resultIndex: number,
    fieldName: keyof ITriviaResult,
    value: string | number
  ) => {
    setUpdatedTrivia((prevState) => {
      if (!prevState) return null;

      const updatedResult = prevState.result.map((result, index) => {
        if (index === resultIndex) {
          return {
            ...result,
            [fieldName]: value,
          };
        }
        return result;
      });

      return {
        ...prevState,
        result: updatedResult,
      };
    });

    // Solo actualizamos imagePaths si fieldName es "img"
    if (fieldName === "img") {
      setImagePaths((prevImagePaths) => {
        const updatedImagePaths = { ...prevImagePaths };
        updatedImagePaths[`imgPathResult-${resultIndex}`] = value.toString();
        return updatedImagePaths;
      });
    }
  };

  const handleCancel = () => {

  };

  const handleUpdate = () => {
    updateTriviaApi(Number(triviaId), updatedTrivia);
    console.log(updatedTrivia)
  };

  if (loading) {
    return (
      <Background style={{ "alignItems": "center", "justifyContent": "center" }}>
        <LoaderImage>
          <LoaderContain />
        </LoaderImage>
      </Background>
    )
  }

  return (
    <div className={container}>
      <div className={inputGroup}>
        <label htmlFor="title">Título:</label>
        <input
          type="text"
          id="title"
          name="title"
          value={updatedTrivia?.title}
          onChange={handleInputChange}
        />
      </div>

      <div className={inputGroup}>
        <label htmlFor="imgPathSelector">Imagen:</label>
        <input
          type="text"
          id="imgPathSelector"
          name="imgPathSelector"
          value={imagePaths["imgPathSelector"]}
          onChange={handleInputChange}
        />
        {imagePaths["imgPathSelector"] && (
          <img
            src={imagePaths["imgPathSelector"]}
            alt="Imagen 2"
            style={{ width: "100px" }}
          />
        )}
      </div>

      <div className={inputGroup}>
        <label htmlFor="color">Color principal:</label>
        <input
          type="text"
          id="color"
          name="color"
          value={updatedTrivia?.color}
          onChange={handleInputChange}
        />
      </div>

      <div className={inputGroup}>
        <label htmlFor="trans">Color de transparencia:</label>
        <input
          type="text"
          id="trans"
          name="trans"
          value={updatedTrivia?.trans}
          onChange={handleInputChange}
        />
      </div>

      {updatedTrivia?.questions.map((question) => (
        <div key={question.id} className={inputGroupQuestion}>
          <label htmlFor={`question-${question.id}`}>Pregunta {question.id}:</label>
          <input
            type="text"
            id={`question-${question.id}`}
            name={`question-${question.id}`}
            value={question.question}
            onChange={handleInputChange}
          />

          <label htmlFor={`imgPathQuestion-${question.id}`}>Imagen:</label>
          <input
            type="text"
            id={`imgPathQuestion-${question.id}`}
            name={`imgPathQuestion-${question.id}`}
            value={imagePaths[`imgPathQuestion-${question.id}`]}
            onChange={handleInputChange}
          />
          {imagePaths[`imgPathQuestion-${question.id}`] && (
            <img
              src={imagePaths[`imgPathQuestion-${question.id}`]}
              alt={imagePaths[`imgPathQuestion-${question.id}`]}
              style={{ width: "100px" }}
            />
          )}

          {question.answers.map((answer, index) => (
            <div key={index} className={inputGroupAnswers}>
              <label htmlFor={`answer-${question.id}-${index}`}>Respuesta {index + 1}:</label>
              <input
                type="text"
                id={`answer-${question.id}-${index}`}
                name={`answer-${question.id}-${index}`}
                value={answer.text}
                onChange={handleInputChange}
              />

              <input
                type="checkbox"
                checked={answer.correct}
                onChange={(e) =>
                  handleQuestionChange(
                    question.id,
                    index,
                    e.target.checked
                  )
                }
              />
            </div>
          ))}
        </div>
      ))}

      {updatedTrivia?.result.map((result, index) => (
        <div key={index} className={inputGroupResult}>
          <label htmlFor={`result-title-${index}`}>Título del resultado {index + 1}:</label>
          <input
            type="text"
            id={`result-title-${index}`}
            name={`result-title-${index}`}
            value={result.title}
            onChange={(e) => handleResultChange(index, 'title', e.target.value)}
          />

          <label htmlFor={`result-body-${index}`}>Cuerpo del resultado {index + 1}:</label>
          <textarea
            id={`result-body-${index}`}
            name={`result-body-${index}`}
            rows={4}
            value={result.body}
            onChange={(e) => handleResultChange(index, 'body', e.target.value)}
          />

          <label htmlFor={imagePaths[`imgPathResult-${index}`]}>Imagen del resultado {index + 1}:</label>
          <input
            type="text"
            id={imagePaths[`imgPathResult-${index}`]}
            name={imagePaths[`imgPathResult-${index}`]}
            value={imagePaths[`imgPathResult-${index}`]}
            onChange={(e) => handleResultChange(index, 'img', e.target.value)}
          />
          {imagePaths[`imgPathResult-${index}`] && (
            <img
              src={imagePaths[`imgPathResult-${index}`]}
              alt={imagePaths[`imgPathResult-${index}`]}
              style={{ width: "100px" }}
            />
          )}

          <label htmlFor={`result-idTemplateBrevo-${index}`}>ID del template Brevo del resultado {index + 1}:</label>
          <input
            type="number"
            id={`result-idTemplateBrevo-${index}`}
            name={`result-idTemplateBrevo-${index}`}
            value={result.idTemplateBrevo}
            onChange={(e) =>
              handleResultChange(index, 'idTemplateBrevo', parseInt(e.target.value))
            }
          />
        </div>
      ))}
      <div className={buttonContainer}>
        <Link href={"/admin/trivias/trivias"}>
          <a>
            <button className={button}>Cancelar</button>
          </a>
        </Link>
        <button className={button} onClick={handleUpdate}>Actualizar trivia</button>
      </div>
    </div>
  );
};

export default EditableTrivia;
