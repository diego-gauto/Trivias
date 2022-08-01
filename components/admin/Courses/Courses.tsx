import React, { useState } from 'react'
import SideBar from '../SideBar';
import { AdminContain } from '../SideBar.styled';
import {
  BackgroundOverlay,
  Button, ButtonContain, Container, CourseContain,
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
          <ButtonContain>
            <Button>Guardar Cambios</Button>
          </ButtonContain>
        </Container>
        {/* Form de cursos */}
        <CourseForm />
        {/* Lista de lecciones */}
        <Lessons />
      </CourseContain>
    </AdminContain>
  )
}
export default Courses;