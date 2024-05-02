import { useState } from 'react';

import { useRouter } from 'next/router';

import { ITriviaResult } from '../../../interfaces/iTrivias';
import ConfettiComponent from '../confetti/confettiComponent';
import Reclamar from '../reclamar/reclamar';
import styles from './result.module.css';

const Result = (props: any) => {
  console.log(props);
  const [resultInfo, setResultInfo] = useState<ITriviaResult>({
    title: '',
    body: '',
    img: '',
    idTemplateBrevo: 0,
  });
  const { title, body, img, idTemplateBrevo } = props.resultInfo;
  const { resultContainer, resultado, resultText, resultImg, share } = styles;

  const {
    query: { triviaId },
  } = useRouter();

  const result = props.result;
  console.log(result);

  // useEffect(() => {

  //   const fetchData = async () => {
  //     try {

  //       const res = await getTriviaApi(Number(triviaId));

  //       const resultTemp = JSON.parse(res[0].result)[result]

  //       if (resultTemp) {
  //         // let prevTrivia = trivia;
  //         setResultInfo(resultTemp);
  //         console.log(resultTemp)
  //       }
  //     } catch (error) {
  //       console.error('Error al obtener los datos de la trivia:', error);
  //     }

  //   };

  //   fetchData();

  // }, []);

  return (
    <>
      <ConfettiComponent />
      <div className={resultContainer}>
        <div className={resultado}>
          <div className={resultText}>
            <h2>Tu resultado:</h2>
            <h1>{title}</h1>
            <p>{body}</p>
            <h3>
              Haz click en Ver regalo para recibir una sorpresa y tus resultados
              completos
            </h3>
          </div>
          <div className={resultImg}>
            <img src={img} alt='' />
          </div>
        </div>
        <div className={share}>
          <Reclamar result={result} idTemplateBrevo={idTemplateBrevo} />
        </div>
      </div>
    </>
  );
};

export default Result;
