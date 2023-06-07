

import ConfettiComponent from "../confetti/confettiComponent";
import Reclamar from "../reclamar/reclamar";
import styles from "./result.module.css";

const Result = (props: any) => {
  const { title, body, img } = props.resultInfo;
  const { resultContainer, resultado, resultText, resultImg, share } = styles;

  const result = props.result;
  console.log(result);

  return (
    <>
      <ConfettiComponent />
      <div className={resultContainer}>
        <div className={resultado}>
          <div className={resultText}>
            <h2>Tu resultado:</h2>
            <h1>{title}</h1>
            <p>{body}</p>
          </div>
          <div className={resultImg}>
            <img src={img} alt="" />
          </div>
        </div>
        <div className={share}>
          <Reclamar result={result} />
        </div>
      </div>
    </>
  );
};

export default Result;
