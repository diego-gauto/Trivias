import React, { useEffect, useState } from 'react';

import Link from 'next/link';

import TriviaList from '../../../../components/admin/Trivias/triviaList/triviaList';
import { getAllTriviasApi } from '../../../../components/api/trivias';
import {
  Background,
  LoaderContain,
  LoaderImage,
} from '../../../../screens/Login.styled';
import styles from './listTrivia.module.css';
import {
  Role,
  UserLevelValue,
} from '../../../../components/GenericQueries/UserRoles/UserRolesInterfaces';
import {
  generateUserIdQuery,
  generateUserRoleAccessQuery,
  generateUserRolesLevelQuery,
} from '../../../../components/GenericQueries/UserRoles/UserRolesQueries';
import { getGenericQueryResponse } from '../../../../components/api/admin';

interface Trivia {
  id: number;
  imgSelector: string;
  title: string;
  color: string;
  trans: string;
}

interface UserAccesssTrivias {
  canViewTrivias: boolean;
  canEditTrivias: boolean;
  canCreateTrivias: boolean;
}

const ListTrivias = () => {
  const [userAccessTrivias, setUserAccessTrivias] =
    useState<UserAccesssTrivias>({
      canCreateTrivias: false,
      canEditTrivias: false,
      canViewTrivias: false,
    });
  const [trivias, setTrivias] = useState<Trivia[]>([]);
  const [loading, setLoading] = useState(true);
  const [userLevel, setUserLevel] = useState<UserLevelValue>('user');

  const { canCreateTrivias, canEditTrivias, canViewTrivias } =
    userAccessTrivias;

  const { main, buttonContainer, volver, link, titles } = styles;

  useEffect(() => {
    getUserData();
    fetchTrivias();
  }, []);

  const fetchTrivias = async () => {
    try {
      const triviasData = await getAllTriviasApi();
      setTrivias(triviasData);
      setLoading(false);
      // setTrivias(triviasMock)
    } catch (error) {
      console.error('Error al obtener las trivias:', error);
    }
  };

  const getUserData = async () => {
    try {
      const email = localStorage.getItem('email');
      if (email === null) {
        throw new Error('No existe un email establecido para el usuario');
      }
      const userIdQuery = generateUserIdQuery(email);
      const userIdResponse = await getGenericQueryResponse(userIdQuery);
      const userId = userIdResponse.data.data[0]['id'];
      // Roles request
      const userRolesQuery = generateUserRoleAccessQuery(userId);
      const userRolesResponse = await getGenericQueryResponse(userRolesQuery);
      const userRoles = userRolesResponse.data.data as Role[];
      const roleTrivias = userRoles.find((role) => role.role === 'trivias');
      setUserAccessTrivias({
        canViewTrivias: roleTrivias?.view === 1,
        canEditTrivias: roleTrivias?.edit === 1,
        canCreateTrivias: roleTrivias?.create === 1,
      });
      // Role level
      const userLevelQuery = generateUserRolesLevelQuery(userId);
      const userLevelResponse = await getGenericQueryResponse(userLevelQuery);
      const userRoleLevel = userLevelResponse.data.data[0]['role'];
      setUserLevel(userRoleLevel);
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      }
    }
  };

  if (loading) {
    return (
      <Background style={{ alignItems: 'center', justifyContent: 'center' }}>
        <LoaderImage>
          <LoaderContain />
        </LoaderImage>
      </Background>
    );
  }

  return (
    <div className={main}>
      <div className={titles}>
        <Link href={'/admin/Trivias'}>
          <a className={link}>
            <div className={volver}>
              <img
                src='/images/trivias/icono . retroceder.svg'
                alt='Icono de retroceder'
              />
              <div> Volver</div>
            </div>
          </a>
        </Link>
        <h2>Listados de trivias</h2>
      </div>
      {((canCreateTrivias && userLevel === 'admin') ||
        userLevel === 'superAdmin') && (
        <div className={buttonContainer}>
          <Link href='/admin/trivias/trivias/create'>
            <a>
              <button>Crear Trivias</button>
            </a>
          </Link>
        </div>
      )}

      <TriviaList
        trivias={trivias}
        canViewTrivias={
          (canViewTrivias && userLevel === 'admin') ||
          userLevel === 'superAdmin'
        }
      />
    </div>
  );
};
export default ListTrivias;
