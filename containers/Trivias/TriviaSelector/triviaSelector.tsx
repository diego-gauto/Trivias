import Card from '../../../components/Trivias/card/Card';
// import "./triviaSelector.css";
import styles from './triviaSelector.module.css';

interface TriviaSelectorProps {
  trivias: any[];
  setQuestionNumber?: (num: number) => void;
}

const TriviaSelector = ({ trivias, setQuestionNumber }: TriviaSelectorProps) => {
  return (
    <div className={styles.triviaSelectorContainer}>
      {trivias.map((trivia, index) => (
        <Card triviaInfo={trivia} triviaId={index} key={index} />
      ))}
    </div>
  );
};

export default TriviaSelector;
