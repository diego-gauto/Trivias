import React, { useEffect, useState } from "react";

import Link from "next/link";

import TriviaList from "../../../../components/admin/Trivias/triviaList/triviaList";

interface Trivia {
  id: number;
  imgSelector: string;
  title: string;
  color: string;
  trans: string;
}

const triviasMock = [
  {
    id: 0,
    imgSelector: "/images/trivias/mujer1.svg",
    title: "¿Qué tipo de maquilladora soy",
    color: "#C57DFF",
    trans: "#9115f7",
  },
  {
    id: 1,
    imgSelector: "/images/trivias/mujer2-removebg-preview.png",
    title: "Gonvar te dice tu futuro en el mundo de las uñas",
    color: "#ffcb7d",
    trans: "#ffb800",
  },
  {
    id: 2,
    imgSelector: "/images/trivias/mujer3.svg",
    title: "¿Cuánto conozco de labiales?",
    color: "#7dffa2",
    trans: "#00c620",
  },
  {
    id: 3,
    imgSelector: "/images/trivias/mujer4.svg",
    title: "¿Cuánto se de maquillar pestañas",
    color: "#7de0ff",
    trans: "#156ff7",
  },
];

const ListTrivias = () => {
  const [trivias, setTrivias] = useState<Trivia[]>([]);

  useEffect(() => {
    const fetchTrivias = async () => {
      try {
        // const triviasData = await getAllTriviasApi();
        // setTrivias(triviasData.data.data);
        setTrivias(triviasMock)
      } catch (error) {
        console.error('Error al obtener las trivias:', error);
      }
    };

    fetchTrivias();
  }, []);

  return (
    <div>
      <h2>Listados de trivias</h2>
      <Link href="/admin/trivias/trivias/create">
        <a>
          <button>Crear Trivias</button>
        </a>
      </Link>
      <TriviaList trivias={trivias} />
    </div>
  );
}
export default ListTrivias;