import React, { useEffect, useState } from 'react';

import Link from 'next/link';

import {
  Background,
  LoaderContain,
  LoaderImage,
} from '../../../screens/Login.styled';
import { getAllFormsApi } from '../../api/form';
import FormList from './formList/formList';
import styles from './selectorForms.module.css';
import {
  Role,
  UserLevelValue,
} from '../../GenericQueries/UserRoles/UserRolesInterfaces';
import {
  generateUserIdQuery,
  generateUserRoleAccessQuery,
  generateUserRolesLevelQuery,
} from '../../GenericQueries/UserRoles/UserRolesQueries';
import { getGenericQueryResponse } from '../../api/admin';

interface Form {
  id: number;
  name: string;
  createdAt: string;
  editedAt: string;
}

interface UserAccesss {
  canView: boolean;
  canEdit: boolean;
  canCreate: boolean;
}

const SelectorForms = () => {
  const [forms, setForms] = useState<Form[]>([]);
  const [loading, setLoading] = useState(true);

  const [userAccess, setUserAccess] = useState<UserAccesss>({
    canView: false,
    canCreate: false,
    canEdit: false,
  });
  const [userLevel, setUserLevel] = useState<UserLevelValue>('user');

  const { canCreate, canEdit, canView } = userAccess;

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
      const role = userRoles.find((role) => role.role === 'forms');
      console.log({ role });
      setUserAccess({
        canView: role?.view === 1,
        canEdit: role?.edit === 1,
        canCreate: role?.create === 1,
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

  const { main, buttonContainer, volver, link, titles } = styles;
  useEffect(() => {
    getUserData();
    fetchForms();
  }, []);

  const fetchForms = async () => {
    try {
      const formsData = await getAllFormsApi();
      setForms(formsData);
      const nextFormId = formsData.length + 1;
      localStorage.setItem('nextFormId', nextFormId);
      setLoading(false);
    } catch (error) {
      console.error('Error al obtener las trivias:', error);
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
        <h2>Listados de Formularios</h2>
      </div>
      <div className={buttonContainer}>
        {((canCreate && userLevel === 'admin') ||
          userLevel === 'superAdmin') && (
          <Link href='/admin/forms/createForm'>
            <a>
              <button>Crear Nuevo Formulario</button>
            </a>
          </Link>
        )}
      </div>
      <FormList
        forms={forms}
        canView={canView}
        userLevel={userLevel}
        canEdit={canEdit}
      />
    </div>
  );
};
export default SelectorForms;
