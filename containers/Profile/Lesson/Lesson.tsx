import React from 'react'
import { Container, FirstContainer, MainContainer, SecondContainer } from './Lesson.styled';
import Courses from './LessonComponents/Courses/Courses';
import Modules from './LessonComponents/Modules/Modules';
import CourseProgress from './LessonComponents/Progress/CourseProgress';
import Video from './LessonComponents/Video/Video';

const Lesson = () => {
  return (
    <MainContainer>
      <Container>
        <FirstContainer>
          <Video />
          <Modules />
        </FirstContainer>
        <SecondContainer>
          <CourseProgress />
          <Courses />
        </SecondContainer>

      </Container>

    </MainContainer>
  )
}
export default Lesson;