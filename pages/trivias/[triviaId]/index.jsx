// import "../containers/home.css";
import { useState, useEffect } from "react";
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
    "¿Cuánto te apoya tu esposo en tu emprendimiento de uñas?",
    "Gonvar te dice tu futuro en el mundo de las uñas",
    "¿Qué nivel de manicurista eres?",
    "Descubre tu bandera roja como manicurista",
  ];

  const trivias = [
    {
      id: 0,
      img: "/images/trivias/mujer1.svg",
      title: "¿Cuánto te apoya tu esposo en tu emprendimiento de uñas?",
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
      title: "Descubre tu bandera roja como manicurista",
      color: "#7de0ff",
      trans: "#156ff7",
    },
  ];

  const data = [
    {
      id: 0,
      imgSelector: "/images/trivias/mujer1.svg",
      imgTrivia:"/images/trivias/imgTrivia.png",
      color: "#C57DFF",
      trans: "#9115f7",
      title: "¿Cuánto te apoya tu esposo en tu emprendimiento de uñas?",
      questions: [
        {
          id: 1,
          question: "Cuando compras material tu esposo …",
          imgQuestion:"/images/trivias/imgTrivia.png",
          answers: [
            {
              text: "Te dice que compres lo que necesites y te da algo más de dinero para que compres algo que te gusto",
              correct: true,
            },
            {
              text: "Te dice que solo compres lo necesario",
              correct: false,
            },
            {
              text: "Te cuestiona preguntando si de verdad es necesario",
              correct: false,
            },
            {
              text: "Te dice que siempre gastas en cosas que no necesitas y te menciona otros gastos del hogar y los niños",
              correct: false,
            },
          ],
        },
        {
          id: 2,
          question: "Tu master favorito estará en tu ciudad, tu esposo …",
          imgQuestion:"/images/trivias/imgTrivia.png",
          answers: [
            {
              text: "Te dice que seguramente habrá otras fechas y además que el costo es muy alto",
              correct: false,
            },
            {
              text: "No quiero que vayas sola, podría haber peligros en el evento y quiero asegurarme de que estés a salvo",
              correct: false,
            },
            {
              text: "Tengo una importante reunión de trabajo ese mismo día y necesito tu apoyo y ayuda en casa. Sería complicado para mí manejar todas las responsabilidades sin ti",
              correct: false,
            },
            {
              text: "Tu felicidad es mi prioridad, ve y disfruta al máximo. Lo solucionaremos juntos",
              correct: true,
            },
          ],
        },
        {
          id: 3,
          question: "No te fue muy bien en tu curso básico, entonces planeas intentar con otro curso, tu esposo…",
          imgQuestion:"/images/trivias/imgTrivia.png",
          answers: [
            {
              text: "Te dice que siempre es lo mismo, que inicias las cosas y no avanzas",
              correct: false,
            },
            {
              text: "Te lo dije” solo te iban a robar el dinero y ahora no tienes el dinero y no aprendiste, todo fue una pérdida de tiempo y dinero",
              correct: false,
            },
            {
              text: "Te dice que primero trates de recuperar trabajando y despues tomas un curso más",
              correct: false,
            },
            {
              text: "Te dice que sin problema pero que esta vez elijas una academia de prestigio para que puedas aprender bien",
              correct: true,
            },
          ],
        },
        {
          id: 4,
          question: "Ya eres una experta aplicando uñas pero aún no tienes un salón, tu esposo…",
          imgQuestion:"/images/trivias/imgTrivia.png",
          answers: [
            {
              text: "Empieza manos a la obra para convertir tu cochera en tu propio salon",
              correct: true,
            },
            {
              text: "Te dice que en la casa no hay espacio u que no puedes trabajar fuera por que no hay quien cuide a los niños",
              correct: false,
            },
            {
              text: "Te dice que el te apoya pero te pone 1000 pretextos incluyendo el dinero y el tiempo",
              correct: false,
            },
            {
              text: "Sigue pensando que las uñas no son un trabajo de verdad y te ignora cuando hablas del tema",
              correct: false,
            },
          ],
        },
        {
          id: 5,
          question: "Estas atendiendo a una clienta y uno de tus hijos te dice que tiene hambre, tu esposo…",
          imgQuestion:"/images/trivias/imgTrivia.png",
          answers: [
            {
              text: "Hace como que no escucha y se mete al baño",
              correct: false,
            },
            {
              text: "Le dice a tu hijo que se espera hasta que termines",
              correct: false,
            },
            {
              text: "Se levanta y de inmediato le sirve la comida para que tu puedas trabajar tranquila",
              correct: true,
            },
            {
              text: "Se pone de mal humor y te dice que él también tiene hambre",
              correct: false,
            },
          ],
        },
      ],
      result: [
        {
          title: "¡Te sacaste la lotería!",
          body: `Querida amiga, tienes un esposo que vale oro. Su apoyo incondicional en tus sueños y emprendimiento de uñas es invaluable. No dejes de valorar cada gesto y palabra de aliento que te brinda. Revisa tu correo para leer tu predicción completa`,
          img: "/images/trivias/mujerinfluencer.svg",
          idTemplateBrevo:7,
        },
        {
          title: "¡A un paso del éxito!",
          body: `Recuerda que el apoyo y la motivación mutua son fundamentales para que cualquier emprendimiento prospere. Con una comunicación abierta, esfuerzo constante y demostración de resultados, podrán fortalecer su unidad como pareja y avanzar hacia un futuro económico próspero para toda la familia.
          Revisa tu correo para leer tu predicción completa`,
          img: "/images/trivias/mujerinfluencer.svg",
          idTemplateBrevo:7,
        },
        {
          title: `Una principiante muy  aesthetic`,
          body:`"Si sientes que la falta de apoyo está afectando seriamente tu relación, es importante abordar el tema de manera abierta y honesta con tu esposo. Comunicar tus sentimientos y tus razones para perseguir este emprendimiento puede ayudar a que él comprenda mejor tus motivaciones y, con el tiempo, quizás cambie de opinión o encuentre maneras de ofrecerte más apoyo.`,
          img: "/images/trivias/mujerinfluencer.svg",
          idTemplateBrevo:7,
        },
      ],
    },
    {
      id: 1,
      imgSelector: "/images/trivias/Trivia01/T01-Portada.png",
      imgTrivia:"/images/trivias/imgTrivia.png",
      color: "#ffcb7d",
      trans: "#ffb800",
      title: "Gonvar te dice tu futuro en el mundo de las uñas",
      questions: [
        {
          id: 1,
          question: "Actualmente ¿has tomado o estás  tomando alguna capacitación en uñas?",
          imgQuestion:"/images/trivias/Trivia01/T01Q1.jpg",
          answers: [
            {
              text: "Nunca  he tomado un curso, pero deseo aprender",
              correct: false,
            },
            {
              text: "Si, tomé alguno pero no me funcionó",
              correct: false,
            },
            {
              text: "Actualmente estoy cursando un entrenamiento básico acrilicas",
              correct: false,
            },
            {
              text: "Ya realizo aplicaciones y me  actualizo con cursos constantemente",
              correct: true,
            },
          ],
        },
        {
          id: 2,
          question: "Cuando elijo mis capacitaciones me dejo llevar por:",
          imgQuestion:"/images/trivias/Trivia01/T01Q2.jpg",
          answers: [
            {
              text: "El costo, siempre busco lo más barato",
              correct: false,
            },
            {
              text: "El instructor, elijo  siempre a alguien reconocido",
              correct: false,
            },
            {
              text: "No me gustan los cursos  en línea",
              correct: false,
            },
            {
              text: "Elijo mis cursos  de acuerdo al tema",
              correct: true,
            },
          ],
        },
        {
          id: 3,
          question:"Si  no obtengo resultados en los primeros intentos yo:",
          imgQuestion:"/images/trivias/Trivia01/T01Q3.jpg",
          answers: [
            {
              text: "Lo intento pero solo 3 veces y lo dejo por la paz",
              correct: false,
            },
            {
              text: "Me frustro un poco, pero lo sigo intentando",
              correct: false,
            },
            {
              text: "Analizo mis áreas de oportunidad, me doy un descanso y regreso con más fuerza",
              correct: true,
            },
            {
              text: "Me desanimo completamente y pienso que las uñas no es lo mio",
              correct: false,
            },
          ],
        },
        {
          id: 4,
          question: "Cuando termino algún curso yo:",
          imgQuestion:"/images/trivias/Trivia01/T01Q4.jpg",
          answers: [
            {
              text: "Sigo practicando y repasando para seguir mejorando",
              correct: true,
            },
            {
              text: "Cuelgo mi reconocimiento en la pared",
              correct: false,
            },
            {
              text: "Nunca  vuelvo  a hacer una práctica  porque mis clientas no me lo piden",
              correct: false,
            },
            {
              text: "Siempre quiero tomar otro  y otro más",
              correct: false,
            },
          ],
        },
        {
          id: 5,
          question: "Mi  mayor interés en el mundo de  las uñas es :",
          imgQuestion:"/images/trivias/Trivia01/T01Q5.jpg",
          answers: [
            {
              text: "Solo aplicarme a mí misma y a familiares cercanos",
              correct: false,
            },
            {
              text: "Autoemplearme y trabajar desde mi casa",
              correct: false,
            },
            {
              text: "Abrir un local dedicado a la aplicación y servicios de belleza",
              correct: false,
            },
            {
              text: "Abrir una academia y preparar a más personas en temas de belleza",
              correct: true,
            },
          ],
        },
      ],
      result: [
        {
          title: "La perseverancia te  llevará  al éxito",
          body: `Eres una persona increíblemente talentosa y dedicada en el mundo de las uñas. Tu arduo trabajo y pasión han formado el camino hacia un futuro verdaderamente prometedor. No hay límite para lo que puedes lograr. Cada golpe de pincel es un paso más hacia la realización de tus sueños. Tus habilidades son excepcionales y tu determinación es inspiradora. Los éxitos y las oportunidades están a punto de desplegarse ante ti. Sigue creyendo en ti misma, porque tus sueños están a punto de hacerse realidad.
          Revisa  tu correo para  ver tu futuro completo                                
          `,
          img: "/images/trivias/Trivia01/T01R1.png",
          idTemplateBrevo:7,
        },
        {
          title: "Tu esfuerzo será recompensado muy pronto",
          body: `Has trabajado incansablemente, y tus esfuerzos no pasarán desapercibidos. El mundo de las uñas espera ansioso tu llegada, donde tus sueños están a punto de materializarse. Tu dedicación y pasión te han preparado para un futuro prometedor. Con cada pincelada, construirás una carrera brillante, dejando huella en cada mano que toques. Las puertas se abrirán para ti, y te encontrarás rodeada de éxitos y oportunidades. Mantén la fe en ti misma, porque tus sueños están a punto de convertirse en realidad.
          Te envie un correo con algunos consejos para lograrlo                                
          `,
          img: "/images/trivias/Trivia01/T01R2.png",
          idTemplateBrevo:7,
        },
        {
          title: `Tus manos tienen el poder de pintar un camino lleno de éxito`,
          body:`Querida mujer, tu determinación y valentía son inquebrantables. Aunque puedas enfrentar desafíos y falta de apoyo, no permitas que eso te detenga. Con estudio, trabajo arduo y una pasión inagotable, el éxito en el mundo de las uñas está a punto de abrazarte. Tus habilidades brillantes y tu dedicación te llevarán lejos. Recuerda que las opiniones negativas no definen tu camino, sino tu fuerza interior. Sigue adelante con confianza y alcanzarás tus metas. El mundo espera ansiosamente tu talento. ¡No te rindas!            
         `,
          img: "/images/trivias/Trivia01/T01R3.png",
          idTemplateBrevo:7,
        },
      ],
    },
      {
        id: 2,
        imgSelector: "/images/trivias/Trivia02/T02-Portada.png",
        imgTrivia:"/images/trivias/imgTrivia.png",
        color: "#7dffa2",
        trans: "#00c620",
        title: "¿Qué nivel de manicurista eres?",
        questions: [
          {
            id: 1,
            question: "Es una característica del monómero con MMA.",
            imgQuestion:"/images/trivias/Trivia02/T02Q1.jpg",
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
            question:"¿Con qué gramaje de lima es correcto preparar la uña natural?",
            imgQuestion:"/images/trivias/Trivia02/T02Q2.jpg",
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
            question: "¿Cuál es la posición correcta del pincel para sellar el acrílico en la zona de cutícula?",
            imgQuestion:"/images/trivias/Trivia02/T02Q3.jpg",
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
            question: "¿Que parte de la uña artificial es la encargada de  brindar soporte a la estructura?",
            imgQuestion:"/images/trivias/Trivia02/T02Q4.jpg",
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
            imgQuestion:"/images/trivias/Trivia02/T02Q5.jpg",
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
            img: "/images/trivias/Trivia02/T02R1.jpg",
            idTemplateBrevo:7,
          },
          {
            title: "¡A un paso del éxito!",
            body: `Se notan tus ganas de crecer en este mágico mundo de las uñas.
            En esta apasionante profesión jamás dejamos de aprender, hay cientos de técnicas y diseños de tendencia para las cuales debemos estar preparadas.
            Eres una persona que aprovecha cada oportunidad para seguir aprendiendo y aunque a veces te  cuesta, con un poco de práctica logras siempre tus objetivos.
            No necesitas de grandes cantidades de productos para lograr  diseños increíbles y tienes personas muy cercanas que creen en ti y que son tu fuente de inspiración.            
            `,
            img: "/images/trivias/Trivia02/T02R2.jpg",
            idTemplateBrevo:7,
          },
          {
            title: `Una principiante muy  aesthetic`,
            body:`¡Felicidades, valiente principiante en el arte de las uñas! Has dado el primer paso hacia un viaje lleno de creatividad y transformación.
            Recuerda, cada pincelada cuenta. Cada esmalte, cada diseño y cada técnica que aprendas te llevarán un paso más cerca de convertirte en una maestra de las uñas. No te desanimes si al principio tus creaciones no son perfectas. El progreso se logra a través de la práctica y la perseverancia.                        
           `,
            img: "/images/trivias/Trivia02/T02R3.jpg",
            idTemplateBrevo:7,
          },
        ],
      },
      {
        id: 3,
        imgSelector: "/images/trivias/mujer4.svg",
        imgTrivia:"/images/trivias/imgTrivia.png",
        color: "#7de0ff",
        trans: "#156ff7",
        title: "Descubre tu bandera roja como manicurista",
        questions: [
          {
            id: 1,
            question: "Un día de poco trabajo en tu salón tu inviertes tu tiempo en …",
            imgQuestion:"/images/trivias/imgTrivia.png",
            answers: [
              {
                text: "Limpiar y ordenar cajas que tienes guardadas",
                correct: false,
              },
              {
                text: "Manejo de redes sociales para buscar clientes nuevos",
                correct: true,
              },
              {
                text: "Tomar ese curso en línea que dejaste en el olvido",
                correct: false,
              },
              {
                text: "Cierras y te vas a tu casa ",
                correct: false,
              },
            ],
          },
          {
            id: 2,
            question: "¿Cómo reaccionarías si una cliente te informa que se le rompió una uña pocos días después de realizarle la aplicación?",
            imgQuestion:"/images/trivias/imgTrivia.png",
            answers: [
              {
                text: "Lo siento, no podemos hacer nada al respecto. Las uñas postizas son frágiles y pueden romperse fácilmente",
                correct: false,
              },
              {
                text: "Debes haber sido muy descuidada con tus uñas para que se rompieran tan pronto. No puedo hacer nada al respecto",
                correct: false,
              },
              {
                text: "Es tu responsabilidad cuidar de tus uñas después de la aplicación. No nos hacemos cargo de roturas después de la cita",
                correct: false,
              },
              {
                text: "Si es un error de nuestra parte, lo corregiremos sin costo adicional. Siempre estamos dispuestos a ayudar y asegurarnos de que estés contenta con nuestros servicios",
                correct: true,
              },
            ],
          },
          {
            id: 3,
            question: "¿Cómo manejarías la situación si, a pesar de haber tomado 10 cursos, no estás logrando los resultados que deseas en tus aplicaciones de uñas?",
            imgQuestion:"/images/trivias/imgTrivia.png",
            answers: [
              {
                text: "Ignoraría la situación y seguiría aplicando las uñas de la misma manera",
                correct: false,
              },
              {
                text: "Pediría un reembolso por los cursos ya que no han sido útiles",
                correct: false,
              },
              {
                text: "Evaluaría críticamente mi progreso y buscaría retroalimentación de profesionales para identificar áreas de mejora y seguir capacitándome hasta alcanzar los resultados que deseo",
                correct: true,
              },
              {
                text: "Decidiría que no soy lo suficientemente talentoso para esto y abandonaría mi sueño de trabajar en el campo de las uñas",
                correct: false,
              },
            ],
          },
          {
            id: 4,
            question: "¿Cómo abordarías la situación si llegara una clienta que quiere un diseño de uñas que no sabes hacer?",
            imgQuestion:"/images/trivias/imgTrivia.png",
            answers: [
              {
                text: "Le expresaría sinceramente que no tengo experiencia en ese diseño específico, pero que estaría encantada de ofrecerle otras opciones de diseños que pueda realizar con confianza y habilidad. También podría ofrecerle referencias de otros profesionales que se especialicen en el diseño que está buscando",
                correct: true,
              },
              {
                text: "Le diría que no puedo hacer ese diseño y la mandaría a buscar otro lugar",
                correct: false,
              },
              {
                text: "Podría intentar diluir el monómero de baja calidad para estirar el producto y reducir costos",
                correct: false,
              },
              {
                text: "Le diría que espere mientras busco un tutorial en línea para intentar aprender el diseño en el momento",
                correct: false,
              },
            ],
          },
          {
            id: 5,
            question: "¿Cómo reaccionarías si un proveedor te ofrece monomero de baja calidad para disminuir los costos en tu negocio de aplicaciones de uñas?",
            imgQuestion:"/images/trivias/imgTrivia.png",
            answers: [
              {
                text: "Aceptaría el monómero de baja calidad para ahorrar dinero, aunque pueda afectar la calidad de mis aplicaciones",
                correct: false,
              },
              {
                text: "No importa la calidad del monómero, mientras sea barato, lo compraría sin problema",
                correct: false,
              },
              {
                text: "Podría intentar diluir el monómero de baja calidad para estirar el producto y reducir costos",
                correct: true,
              },
              {
                text: "Rechazaría el monómero de baja calidad, ya que la calidad de mis aplicaciones y la satisfacción de mis clientes son mi máxima prioridad. Buscaría un proveedor confiable que me ofrezca productos de alta calidad a precios razonables para garantizar un servicio excepcional",
                correct: false,
              },
            ],
          },
        ],
        result: [
          {
            title: "¡Te sacaste la lotería!",
            body: `Tu capacidad para actuar con calma y confianza en cada situación es asombrosa y te ha convertido en un referente en el mundo de la belleza. Sin duda, tu habilidad para aplicar uñas sin cometer errores y sin que aparezcan banderas rojas es excepcional, y ha dejado maravillados a todos aquellos que han tenido el placer de disfrutar de tus creaciones.
            revisa tu correo para revisar tu reporte completo
            `,
            img: "/images/trivias/mujerinfluencer.svg",
            idTemplateBrevo:7,
          },
          {
            title: "¡A un paso del éxito!",
            body: `¡Eres una estrella en ascenso en el arte de las uñas! Tu pasión y talento son evidentes, y aunque aún estás desarrollando tu experiencia, ¡lo estás haciendo genial! Si sueñas con perfeccionar tus habilidades y alcanzar nuevas alturas en este emocionante campo
            revisa tu correo para ver tu reporte completo
            `,
            img: "/images/trivias/mujerinfluencer.svg",
            idTemplateBrevo:7,
          },
          {
            title: `Una principiante muy  aesthetic`,
            body:`Sé que tienes una pasión innata por el arte de aplicar uñas y que actualmente sientes que la falta de capacitación y experiencia puede estar obstaculizando tu crecimiento profesional. Pero déjame decirte que estás a punto de descubrir una oportunidad única que cambiará tu vida de manera extraordinaria`,
            img: "/images/trivias/mujerinfluencer.svg",
            idTemplateBrevo:7,
          },
        ],
      },
  ];

  useEffect(() => {
    if (questionNumber > 5) {
      window.scrollTo(0, 0); // Desplazamiento hacia arriba al llegar a la pregunta 5
    }
  }, [questionNumber]);

  return (
    <div className={styles.app}>
      {/* <style jsx global>{`
        body {
          margin: 0px;
          padding: 0px;
        }
      `}</style> */}
      {questionNumber > 5 ? (
        <Result
          resultInfo={data[triviaId]?.result[RESULT_DIC[correct]]}
          result={RESULT_DIC[correct]}
        />
      ) : (
        // <div className={styles.app}>
          <div className={styles.main}>
            <div className={styles.trivia}>
              <Trivia
                triviaTitle={data[triviaId]?.title}
                data={data[triviaId]?.questions}
                questionNumber={questionNumber}
                setQuestionNumber={setQuestionNumber}
                setCorrect={setCorrect}
              />
            </div>
            <div className={styles.publicity}>
              <img src={data[triviaId]?.questions[questionNumber-1]?.imgQuestion} alt="" />
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
