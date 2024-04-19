import { Table } from "react-bootstrap";

import TriviaRow from "../triviaRow/triviaRow";

interface Trivia {
  id: number;
  imgSelector: string;
  title: string;
  color: string;
  trans: string;
}

interface TriviaListProps {
  trivias: Trivia[];
  canViewTrivias: boolean;
}

const TriviaList = ({ trivias, canViewTrivias }: TriviaListProps) => {

  if (!canViewTrivias) {
    return (<></>);
  }

  return (
    <div className="mt-2">
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Nº de Trivia</th>
            <th>Título</th>
          </tr>
        </thead>
        <tbody>
          {trivias.map((trivia, index) => (
            <TriviaRow key={index} trivia={trivia} idTrivia={index + 1} />
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default TriviaList;