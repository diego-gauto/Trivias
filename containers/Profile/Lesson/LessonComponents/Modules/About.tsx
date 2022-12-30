import React, { useEffect, useState } from 'react'
import { AboutContain, TextContainer, LessonTitle, LessonContent } from './About.styled';
import { PositionTitle, TitleContain, Titles } from './Module.styled';
import { BsPlayBtn } from 'react-icons/bs';
import { SlNotebook } from 'react-icons/sl';
import { TfiCommentAlt } from 'react-icons/tfi';
import { getTeacherCourse } from '../../../../../store/actions/courseActions';

const About = ({ value, setValue, data, teacherCreds }: any) => {

  const [teacher, setTeacher] = useState<any>([])

  useEffect(() => {
    console.log(teacherCreds);

    if (teacherCreds.length > 0) {
      getTeacherCourse(teacherCreds[0].name).then((res: any) => {
        setTeacher(res[0])
      })
    }
  }, [])

  return (
    <>
      <TitleContain>
        <PositionTitle position={value}>
          <BsPlayBtn></BsPlayBtn>
          Acerca del curso
        </PositionTitle>
        <Titles onClick={() => {
          setValue(3)
        }}>
          <SlNotebook></SlNotebook>
          Materiales y tareas
        </Titles>
        <Titles onClick={() => {
          setValue(4)
        }}>
          <TfiCommentAlt></TfiCommentAlt>
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
            <span>tu instructor</span>
          </p>
          <p>{teacher.about}</p>
        </div>
      </AboutContain>
    </>
  )
}
export default About;