import React from 'react'
import { AboutContain, CircleContain, NumberText, PointText, TextContainer, LessonTitle, LessonContent } from './About.styled';
import { PositionTitle, TitleContain, Titles } from './Module.styled';

const About = ({ value, setValue }: any) => {
  return (
    <>
      <TitleContain>
        <PositionTitle>
          Acerca de
        </PositionTitle>
        <Titles onClick={() => {
          setValue(2)
        }}>
          Material Extra
        </Titles>
        <Titles onClick={() => {
          setValue(3)
        }}>
          Tareas
        </Titles>
        <Titles onClick={() => {
          setValue(4)
        }}>
          Comentarios
        </Titles>
      </TitleContain>
      <AboutContain>
        <CircleContain>
          <NumberText>
            +200
          </NumberText>
          <PointText>
            Puntos al <br /> finalizar
          </PointText>
        </CircleContain>
        <TextContainer>
          <LessonTitle>
            Sobre la lección
          </LessonTitle>
          <LessonContent>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pharetra, cursus sapien ac magna. Consectetur amet eu tincidunt quis. Non habitasse viverra malesuada facilisi vel nunc. Mattis euismod nisi, id bibendum adipiscing morbi mattis eget. Sed accumsan quisque mi sodales malesuada fusce scelerisque urna. Enim sit pulvinar dui ipsum feugiat. Ac enim ultrices venenatis imperdiet suspendisse mattis enim. Mauris odio sit id curabitur enim mi. Orci id pharetra morbi quisque.
          </LessonContent>
        </TextContainer>
      </AboutContain>

    </>

  )
}
export default About;