import Link from "next/link";

import style from "./triviaRow.module.css";

interface Trivia {
  id: number;
  imgSelector: string;
  title: string;
  color: string;
  trans: string;
}

interface TriviaRowProps {
  trivia: Trivia;
  idTrivia: Number
}

const TriviaRow = ({ trivia, idTrivia }: TriviaRowProps) => {

  const { link } = style


  return (

    <tr className="pointer">

      <td>{trivia.id}</td>
      <td>
        <Link href={`/admin/trivias/trivias/${idTrivia}`}>
          <a className={link}>{trivia.title}</a>
        </Link>
      </td>
    </tr>

  );
};

export default TriviaRow;