import Link from 'next/link';

import {
  Container,
  ButtonContainer,
  OptionText,
  SelectorTriviasButton,
} from './selectorTrivias.styled';
import { useEffect, useState } from 'react';
import {
  Role,
  UserLevelValue,
} from '../../GenericQueries/UserRoles/UserRolesInterfaces';
import { getGenericQueryResponse } from '../../api/admin';
import {
  generateUserIdQuery,
  generateUserRoleAccessQuery,
  generateUserRolesLevelQuery,
} from '../../GenericQueries/UserRoles/UserRolesQueries';

interface UserAccesssTrivias {
  canViewTrivias: boolean;
  canEditTrivias: boolean;
  canCreateTrivias: boolean;
}

interface UserAccesssTriviasList {
  canViewTriviasList: boolean;
  canDownloadTriviasList: boolean;
}

const SelectorTrivias = () => {
  const [userAccessTrivias, setUserAccessTrivias] =
    useState<UserAccesssTrivias>({
      canCreateTrivias: false,
      canEditTrivias: false,
      canViewTrivias: false,
    });
  const [userAccessTriviasList, setUserAccessTriviasList] =
    useState<UserAccesssTriviasList>({
      canDownloadTriviasList: false,
      canViewTriviasList: false,
    });
  const [userLevel, setUserLevel] = useState<UserLevelValue>('user');

  const { canCreateTrivias, canEditTrivias, canViewTrivias } =
    userAccessTrivias;
  const { canDownloadTriviasList, canViewTriviasList } = userAccessTriviasList;

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
      const roleTriviasList = userRoles.find(
        (role) => role.role === 'trivias_list',
      );
      setUserAccessTriviasList({
        canDownloadTriviasList: roleTriviasList?.download === 1,
        canViewTriviasList: roleTriviasList?.view === 1,
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

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <Container>
      {((userLevel === 'admin' &&
        canViewTrivias &&
        (canCreateTrivias || canEditTrivias)) ||
        userLevel === 'superAdmin') && (
        <ButtonContainer>
          <Link href='/admin/trivias/trivias'>
            <SelectorTriviasButton>Admin Trivias</SelectorTriviasButton>
          </Link>
          <OptionText>Creación y edición de trivias</OptionText>
        </ButtonContainer>
      )}
      {((userLevel === 'admin' &&
        (canViewTriviasList || canDownloadTriviasList)) ||
        userLevel === 'superAdmin') && (
        <ButtonContainer>
          <Link href='/admin/trivias/users'>
            <SelectorTriviasButton>Listados de usuarios</SelectorTriviasButton>
          </Link>
          <OptionText>
            Listados de usuarios que hayan jugado a las trivias
          </OptionText>
        </ButtonContainer>
      )}
    </Container>
  );
};
export default SelectorTrivias;
