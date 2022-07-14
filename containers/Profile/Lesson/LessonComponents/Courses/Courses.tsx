import React from 'react'
import { MainContainer, Title, UploadIcon, Container, Episode, Divider, CoursesContainer } from './Courses.styled';
import EveryCourse from './Lessons/EveryCourse';

const Courses = () => {
  return (
    <MainContainer>
      <Container>
        <Title>
          Temporada 1
          <UploadIcon />
        </Title>
        <Episode>
          6/12 episodios
        </Episode>
      </Container>
      <Divider />

      <CoursesContainer>
        <EveryCourse />
      </CoursesContainer>

    </MainContainer>
  )
}
export default Courses;