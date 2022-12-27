import Link from 'next/link';
import React, { useState } from 'react'
import { AboutContain, CircleContain, NumberText, PointText, TextContainer, LessonTitle, LessonContent, ObjectiveContainer } from './About.styled';
import { BookIcon, ChatboxIcon, EaselIcon, IconContain, ListIcon, PositionTitle, SelectContain, TitleContain, Titles, UnSelected } from './Module.styled';

const About = ({ value, setValue, data, teacherCreds }: any) => {
  return (
    <>
      <TitleContain>
        <PositionTitle position={value}>
          Acerca del curso
        </PositionTitle>
        <Titles onClick={() => {
          setValue(3)
        }}>
          Materiales y tareas
        </Titles>
        <Titles onClick={() => {
          setValue(4)
        }}>
          Comentarios
        </Titles>
        <div className='line'></div>
      </TitleContain>
      <AboutContain>
        <TextContainer>
          <LessonTitle>
            {data.courseTitle}, <span>de {teacherCreds[0]?.name}</span>
          </LessonTitle>
          <LessonContent>
            <p className='title'>Objetivo principal</p>
            <p>En esta clase de nivel básico aprenderás cómo realizar el efecto humo.</p>
            <p className='title'>Especificaciones</p>
            <p>A través de este curso, aprenderás todas las habilidades que necesitas para ayudar a
              las empresas a brindar la experiencia de usuario adecuada para sus productos.
              Todas las técnicas incluidas en en el curso son estándares de la industria probados y
              comprobados, que te equiparán con el mejor conocimiento para comenzar tu nuevo
              camino profesional.</p>
          </LessonContent>
        </TextContainer>
        <div className='teacher-container'>
          <img src="/images/teachers/Brenda_instructora.jpg" alt="" />
          <p className='title'>Conoce a <br />
            <span>tu instructora</span>
          </p>
          <p>Mi nombre es Raquel
            Hernández y soy
            aplicadora de uñas
            profesional
            especializada en
            crear e impulsar
            productos de alto</p>
        </div>
      </AboutContain>
    </>
  )
}
export default About;