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
}

const TriviaList = ({ trivias }: TriviaListProps) => {
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
          {trivias.map((trivia) => (
            <TriviaRow key={trivia.id} trivia={trivia} />
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default TriviaList;