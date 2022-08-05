import Link from 'next/link';
import React, { useState } from 'react'
import SideBar from '../SideBar';
import { AdminContain } from '../SideBar.styled';
import { PurpleButton } from './AllCourses.styled';
import {
  BackgroundOverlay,
  ButtonContain,
  Container, CourseContain,
  ImageBack, Imagecontain, NewText, Subtitle,
  Title
} from './Courses.styled';
import CourseForm from './Form/CourseForm';
import Lessons from './Form/Lessons';
const Courses = () => {

  return (
    <AdminContain>
      <SideBar />
      <CourseContain>
        <Imagecontain>
          <ImageBack
            src="/images/admin/Courses/DemoBack.png"
            layout="fill"
            priority />
          <BackgroundOverlay />
        </Imagecontain>

        <Container>
          <NewText>Nuevo</NewText>
          <Title>Curso de Uñas Francesas</Title>
          <Subtitle>Descubre un nuevo método para tus uñas este San Valentín</Subtitle>

        </Container>
        {/* Form de cursos */}
        <CourseForm />
        {/* Lista de lecciones */}
        <Lessons />
        <ButtonContain>
          <Link href="/admin/Courses">
            <PurpleButton>Regresar</PurpleButton>
          </Link>
        </ButtonContain>
      </CourseContain>
    </AdminContain>
  )
}
export default Courses;