"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import TriviaList from '../../../../components/admin/Trivias/triviaList/triviaList';
import { getAllTriviasApi } from '../../../../components/api/trivias';
import styles from './listTrivia.module.css';

interface Trivia {
  id: number;
  imgSelector: string;
  title: string;
  color: string;
  trans: string;
}

const ListTrivias = () => {
  const [trivias, setTrivias] = useState<Trivia[]>([]);
  const [loading, setLoading] = useState(true);
  const { main, buttonContainer, volver, link, titles } = styles;

  useEffect(() => {
    fetchTrivias();
  }, []);

  const fetchTrivias = async () => {
    try {
      const triviasData = await getAllTriviasApi();
      setTrivias(triviasData);
      setLoading(false);
    } catch (error) {
      console.error('Error al obtener las trivias:', error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className={main}>
      <div className={titles}>
        <Link href={'/admin/Trivias'}>
          <a className={link}>
            <div className={volver}>
              <img src='/images/trivias/icono . retroceder.svg' alt='Icono de retroceder' />
              <div> Volver</div>
            </div>
          </a>
        </Link>
        <h2>Listados de trivias</h2>
      </div>
      <div className={buttonContainer}>
        <Link href='/admin/trivias/trivias/create'>
          <a>
            <button>Crear Trivias</button>
          </a>
        </Link>
      </div>
      <TriviaList trivias={trivias} canViewTrivias={true} />
    </div>
  );
};
export default ListTrivias;
