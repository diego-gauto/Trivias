import Link from "next/link";

interface Trivia {
  id: number;
  imgSelector: string;
  title: string;
  color: string;
  trans: string;
}

interface TriviaRowProps {
  trivia: Trivia;
}

const TriviaRow = ({ trivia }: TriviaRowProps) => {


  return (

    <tr className="pointer">

      <td>{trivia.id + 1}</td>
      <td>
        <Link href={`/admin/trivias/trivias/${trivia.id}`}>
          <a>{trivia.title}</a>
        </Link>
      </td>
    </tr>

  );
};

export default TriviaRow;