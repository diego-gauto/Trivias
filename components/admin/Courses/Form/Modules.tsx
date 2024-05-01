import Link from 'next/link';
import React from 'react';
import { PurpleButton } from '../AllCourses.styled';
import { ModuleContainer } from './Modules.styled';

const Modules = () => {
  return (
    <ModuleContainer>
      <Link href='/admin/CourseAttributes'>
        <PurpleButton>Categorías</PurpleButton>
      </Link>
      <Link href='/admin/Materials'>
        <PurpleButton>Materiales</PurpleButton>
      </Link>
      <Link href='/admin/Teacher'>
        <PurpleButton>Instructores</PurpleButton>
      </Link>
    </ModuleContainer>
  );
};
export default Modules;
