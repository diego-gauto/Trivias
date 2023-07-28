import Card from "../../../components/Trivias/card/Card";
// import "./triviaSelector.css";
import styles from "./triviaSelector.module.css";

const TriviaSelector = (trivias: { trivias: any[]; }) => {
  return (
    <div className={styles.triviaSelectorContainer}>
      {trivias.trivias.map((trivia, index) => (
        <Card triviaInfo={trivia} triviaId={index} key={index} />
      ))}
    </div>
  );
};

export default TriviaSelector;
