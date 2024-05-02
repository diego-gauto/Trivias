// import "../containers/home.css";
import { useState } from 'react';
import { useRouter } from 'next/router';

import Trivia from '../../../components/trivia/trivia';
import Result from '../../../components/result/result';
import Banner from '../../../components/banner/banner';
import TriviaSelector from '../../../containers/triviaSelector/triviaSelector';

import styles from './index.module.css';

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

  const trivias = [
    {
      id: 0,
      img: '/images/trivias/mujer1.svg',
      title: '¿Qué tipo de maquilladora soy',
      color: '#C57DFF',
      trans: '#9115f7',
    },
    {
      id: 1,
      img: '/images/trivias/mujer2-removebg-preview.png',
      title: 'Gonvar te dice tu futuro en el mundo de las uñas',
      color: '#ffcb7d',
      trans: '#ffb800',
    },
    {
      id: 2,
      img: '/images/trivias/mujer3.svg',
      title: '¿Cuánto conozco de labiales?',
      color: '#7dffa2',
      trans: '#00c620',
    },
    {
      id: 3,
      img: '/images/trivias/mujer4.svg',
      title: '¿Cuánto se de maquillar pestañas',
      color: '#7de0ff',
      trans: '#156ff7',
    },
  ];

  const data = [
    {
      id: 0,
      imgSelector: '/images/trivias/mujer1.svg',
      imgTrivia: '/images/trivias/imgTrivia.png',
      color: '#C57DFF',
      trans: '#9115f7',
      title: '¿Qué tipo de maquilladora soy?',
      questions: [
        {
          id: 1,
          question: 'Es una característica del monómero con MMA.',
          answers: [
            {
              text: 'Tiene bajo olor',
              correct: false,
            },
            {
              text: 'Es un monómero dental de alto riesgo para la salud cuando se usa para aplicación de uñas',
              correct: true,
            },
            {
              text: 'Ideal para uñas acrilicas',
              correct: false,
            },
            {
              text: 'Es un monómero seguro',
              correct: false,
            },
          ],
        },
        {
          id: 2,
          question:
            '¿Con qué gramaje de lima es correcto preparar la uña natural?',
          answers: [
            {
              text: '100/100',
              correct: false,
            },
            {
              text: '80/80',
              correct: false,
            },
            {
              text: '150/150',
              correct: false,
            },
            {
              text: '180 0 220',
              correct: true,
            },
          ],
        },
        {
          id: 3,
          question:
            '¿Cuál es la posición correcta del pincel para sellar el acrílico en la zona de cutícula?',
          answers: [
            {
              text: 'a 45 grados',
              correct: true,
            },
            {
              text: 'a 90 grados',
              correct: false,
            },
            {
              text: 'a 120 grados',
              correct: false,
            },
            {
              text: 'a 180 grados',
              correct: false,
            },
          ],
        },
        {
          id: 4,
          question:
            '¿Que parte de la uña artificial es la encargada de  brindar soporte a la estructura?',
          answers: [
            {
              text: 'El tip',
              correct: false,
            },
            {
              text: 'El molde',
              correct: false,
            },
            {
              text: 'El ápice o apex',
              correct: true,
            },
            {
              text: 'La zona de cutícula',
              correct: false,
            },
          ],
        },
        {
          id: 5,
          question: '¿En cuántas fases se divide  una aplicación de uñas?',
          answers: [
            {
              text: 'Pegado del tip, limado, abrillantado',
              correct: false,
            },
            {
              text: 'Colocación del molde, limado , abrillantado',
              correct: false,
            },
            {
              text: 'Aplicación de producto, limado, abrillantado',
              correct: false,
            },
            {
              text: 'preparación de la uña natural, aplicación del producto, limado, finalizado',
              correct: true,
            },
          ],
        },
      ],
      result: [
        {
          title: '¡Toda una profesional!',
          body: `Se nota tu experiencia a kilómetros.
          Siéntete afortunada de poder vivir de hacer lo que más te gusta pero no olvides que el mundo de las uñas está en un cambio constante donde la capacitación y actualizaciones sobre las nuevas tendencias harán que tu crecimiento profesional no se detenga.
          Explota tus capacidades y lleva al máximo tus  habilidades.
          Comienza a prepararte para que  en poco tiempo puedas impartir cursos y ampliar también tu crecimiento económico.            
          `,
          img: '/images/trivias/mujerinfluencer.svg',
          idTemplateBrevo: 7,
        },
        {
          title: '¡A un paso del éxito!',
          body: `Se notan tus ganas de crecer en este mágico mundo de las uñas.
          En esta apasionante profesión jamás dejamos de aprender, hay cientos de técnicas y diseños de tendencia para las cuales debemos estar preparadas.
          Eres una persona que aprovecha cada oportunidad para seguir aprendiendo y aunque a veces te  cuesta, con un poco de práctica logras siempre tus objetivos.
          No necesitas de grandes cantidades de productos para lograr  diseños increíbles y tienes personas muy cercanas que creen en ti y que son tu fuente de inspiración.            
          `,
          img: '/images/trivias/mujerinfluencer.svg',
          idTemplateBrevo: 7,
        },
        {
          title: `Una principiante muy  aesthetic`,
          body: `"¡Felicidades, valiente principiante en el arte de las uñas! Has dado el primer paso hacia un viaje lleno de creatividad y transformación.
          Recuerda, cada pincelada cuenta. Cada esmalte, cada diseño y cada técnica que aprendas te llevarán un paso más cerca de convertirte en una maestra de las uñas. No te desanimes si al principio tus creaciones no son perfectas. El progreso se logra a través de la práctica y la perseverancia.
         `,
          img: '/images/trivias/mujerinfluencer.svg',
          idTemplateBrevo: 7,
        },
      ],
    },
    {
      id: 1,
      imgSelector: '/images/trivias/mujer2-removebg-preview.png',
      imgTrivia: '/images/trivias/imgTrivia.png',
      color: '#ffcb7d',
      trans: '#ffb800',
      title: 'Gonvar te dice tu futuro en el mundo de las uñas',
      questions: [
        {
          id: 1,
          question:
            'Actualmente ¿has tomado o estás  tomando alguna capacitación en uñas?',
          answers: [
            {
              text: 'Nunca  he tomado un curso, pero deseo aprender',
              correct: false,
            },
            {
              text: 'Si, tomé alguno pero no me funcionó',
              correct: false,
            },
            {
              text: 'Actualmente estoy cursando un entrenamiento básico acrilicas',
              correct: false,
            },
            {
              text: 'Ya realizo aplicaciones y me  actualizo con cursos constantemente',
              correct: true,
            },
          ],
        },
        {
          id: 2,
          question: 'Cuando elijo mis capacitaciones me dejo llevar por:',
          answers: [
            {
              text: 'El costo, siempre busco lo más barato',
              correct: false,
            },
            {
              text: 'El instructor, elijo  siempre a alguien reconocido',
              correct: false,
            },
            {
              text: 'No me gustan los cursos  en línea',
              correct: false,
            },
            {
              text: 'Elijo mis cursos  de acuerdo al tema',
              correct: true,
            },
          ],
        },
        {
          id: 3,
          question: 'Si  no obtengo resultados en los primeros intentos yo:',
          answers: [
            {
              text: 'Lo intento pero solo 3 veces y lo dejo por la paz',
              correct: false,
            },
            {
              text: 'Me frustro un poco, pero lo sigo intentando',
              correct: false,
            },
            {
              text: 'Analizo mis áreas de oportunidad, me doy un descanso y regreso con más fuerza',
              correct: true,
            },
            {
              text: 'Me desanimo completamente y pienso que las uñas no es lo mio',
              correct: false,
            },
          ],
        },
        {
          id: 4,
          question: 'Cuando termino algún curso yo:',
          answers: [
            {
              text: 'Sigo practicando y repasando para seguir mejorando',
              correct: true,
            },
            {
              text: 'Cuelgo mi reconocimiento en la pared',
              correct: false,
            },
            {
              text: 'Nunca  vuelvo  a hacer una práctica  porque mis clientas no me lo piden',
              correct: false,
            },
            {
              text: 'Siempre quiero tomar otro  y otro más',
              correct: false,
            },
          ],
        },
        {
          id: 5,
          question: 'Mi  mayor interés en el mundo de  las uñas es :',
          answers: [
            {
              text: 'Solo aplicarme a mí misma y a familiares cercanos',
              correct: false,
            },
            {
              text: 'Autoemplearme y trabajar desde mi casa',
              correct: false,
            },
            {
              text: 'Abrir un local dedicado a la aplicación y servicios de belleza',
              correct: false,
            },
            {
              text: 'Abrir una academia y preparar a más personas en temas de belleza',
              correct: true,
            },
          ],
        },
      ],
      result: [
        {
          title: 'La perseverancia te  llevará  al éxito',
          body: `Eres una persona increíblemente talentosa y dedicada en el mundo de las uñas. Tu arduo trabajo y pasión han formado el camino hacia un futuro verdaderamente prometedor. No hay límite para lo que puedes lograr. Cada golpe de pincel es un paso más hacia la realización de tus sueños. Tus habilidades son excepcionales y tu determinación es inspiradora. Los éxitos y las oportunidades están a punto de desplegarse ante ti. Sigue creyendo en ti misma, porque tus sueños están a punto de hacerse realidad.
          Revisa  tu correo para  ver tu futuro completo                                
          `,
          img: '/images/trivias/mujerinfluencer.svg',
          idTemplateBrevo: 7,
        },
        {
          title: 'Tu esfuerzo será recompensado muy pronto',
          body: `Has trabajado incansablemente, y tus esfuerzos no pasarán desapercibidos. El mundo de las uñas espera ansioso tu llegada, donde tus sueños están a punto de materializarse. Tu dedicación y pasión te han preparado para un futuro prometedor. Con cada pincelada, construirás una carrera brillante, dejando huella en cada mano que toques. Las puertas se abrirán para ti, y te encontrarás rodeada de éxitos y oportunidades. Mantén la fe en ti misma, porque tus sueños están a punto de convertirse en realidad.
          Te envie un correo con algunos consejos para lograrlo                                
          `,
          img: '/images/trivias/mujerinfluencer.svg',
          idTemplateBrevo: 7,
        },
        {
          title: `Tus manos tienen el poder de pintar un camino lleno de éxito`,
          body: `Querida mujer, tu determinación y valentía son inquebrantables. Aunque puedas enfrentar desafíos y falta de apoyo, no permitas que eso te detenga. Con estudio, trabajo arduo y una pasión inagotable, el éxito en el mundo de las uñas está a punto de abrazarte. Tus habilidades brillantes y tu dedicación te llevarán lejos. Recuerda que las opiniones negativas no definen tu camino, sino tu fuerza interior. Sigue adelante con confianza y alcanzarás tus metas. El mundo espera ansiosamente tu talento. ¡No te rindas!            
         `,
          img: '/images/trivias/mujerinfluencer.svg',
          idTemplateBrevo: 7,
        },
      ],
    },
    {
      id: 2,
      imgSelector: '/images/trivias/mujer3.svg',
      imgTrivia: '/images/trivias/imgTrivia.png',
      color: '#7dffa2',
      trans: '#00c620',
      title: '¿Qué nivel de manicurista eres?',
      questions: [
        {
          id: 1,
          question: 'Es una característica del monómero con MMA.',
          answers: [
            {
              text: 'Tiene bajo olor',
              correct: false,
            },
            {
              text: 'Es un monómero dental de alto riesgo para la salud cuando se usa para aplicación de uñas',
              correct: true,
            },
            {
              text: 'Ideal para uñas acrilicas',
              correct: false,
            },
            {
              text: 'Es un monómero seguro',
              correct: false,
            },
          ],
        },
        {
          id: 2,
          question:
            '¿Con qué gramaje de lima es correcto preparar la uña natural?',
          answers: [
            {
              text: '100/100',
              correct: false,
            },
            {
              text: '80/80',
              correct: false,
            },
            {
              text: '150/150',
              correct: false,
            },
            {
              text: '180 0 220',
              correct: true,
            },
          ],
        },
        {
          id: 3,
          question:
            '¿Cuál es la posición correcta del pincel para sellar el acrílico en la zona de cutícula?',
          answers: [
            {
              text: 'a 45 grados',
              correct: true,
            },
            {
              text: 'a 90 grados',
              correct: false,
            },
            {
              text: 'a 120 grados',
              correct: false,
            },
            {
              text: 'a 180 grados',
              correct: false,
            },
          ],
        },
        {
          id: 4,
          question:
            '¿Que parte de la uña artificial es la encargada de  brindar soporte a la estructura?',
          answers: [
            {
              text: 'El tip',
              correct: false,
            },
            {
              text: 'El molde',
              correct: false,
            },
            {
              text: 'El ápice o apex',
              correct: true,
            },
            {
              text: 'La zona de cutícula',
              correct: false,
            },
          ],
        },
        {
          id: 5,
          question: '¿En cuántas fases se divide  una aplicación de uñas?',
          answers: [
            {
              text: 'Pegado del tip, limado, abrillantado',
              correct: false,
            },
            {
              text: 'Colocación del molde, limado , abrillantado',
              correct: false,
            },
            {
              text: 'Aplicación de producto, limado, abrillantado',
              correct: false,
            },
            {
              text: 'preparación de la uña natural, aplicación del producto, limado, finalizado',
              correct: true,
            },
          ],
        },
      ],
      result: [
        {
          title: '¡Toda una profesional!',
          body: `Se nota tu experiencia a kilómetros.
            Siéntete afortunada de poder vivir de hacer lo que más te gusta pero no olvides que el mundo de las uñas está en un cambio constante donde la capacitación y actualizaciones sobre las nuevas tendencias harán que tu crecimiento profesional no se detenga.
            Explota tus capacidades y lleva al máximo tus  habilidades.
            Comienza a prepararte para que  en poco tiempo puedas impartir cursos y ampliar también tu crecimiento económico.            
            `,
          img: '/images/trivias/mujerinfluencer.svg',
          idTemplateBrevo: 7,
        },
        {
          title: '¡A un paso del éxito!',
          body: `Se notan tus ganas de crecer en este mágico mundo de las uñas.
            En esta apasionante profesión jamás dejamos de aprender, hay cientos de técnicas y diseños de tendencia para las cuales debemos estar preparadas.
            Eres una persona que aprovecha cada oportunidad para seguir aprendiendo y aunque a veces te  cuesta, con un poco de práctica logras siempre tus objetivos.
            No necesitas de grandes cantidades de productos para lograr  diseños increíbles y tienes personas muy cercanas que creen en ti y que son tu fuente de inspiración.            
            `,
          img: '/images/trivias/mujerinfluencer.svg',
          idTemplateBrevo: 7,
        },
        {
          title: `Una principiante muy  aesthetic`,
          body: `¡Felicidades, valiente principiante en el arte de las uñas! Has dado el primer paso hacia un viaje lleno de creatividad y transformación.
            Recuerda, cada pincelada cuenta. Cada esmalte, cada diseño y cada técnica que aprendas te llevarán un paso más cerca de convertirte en una maestra de las uñas. No te desanimes si al principio tus creaciones no son perfectas. El progreso se logra a través de la práctica y la perseverancia.                        
           `,
          img: '/images/trivias/mujerinfluencer.svg',
          idTemplateBrevo: 7,
        },
      ],
    },
  ];

  // console.log(data[id][0]);

  return (
    <>
      <style jsx global>{`
        body {
          margin: 0px;
          padding: 0px;
        }
      `}</style>
      {questionNumber > 5 ? (
        <Result
          resultInfo={data[triviaId]?.result[RESULT_DIC[correct]]}
          result={RESULT_DIC[correct]}
        />
      ) : (
        <div className={styles.app}>
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
            <div className={styles.publicity}></div>
          </div>
        </div>
      )}
      <Banner />

      <h3 className={styles.subtitle} style={{ marginTop: 2 + 'rem' }}>
        Más cuestionarios
      </h3>
      <div className={styles.triviaSelectorContainer}>
        <TriviaSelector trivias={trivias} />
      </div>
    </>
  );
}

export default Trivias;
