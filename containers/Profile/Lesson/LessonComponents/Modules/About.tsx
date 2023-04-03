import React, { useEffect, useState } from 'react'
import Link from 'next/link';
import { AboutContain, TextContainer, LessonTitle, LessonContent } from './About.styled';
import { PositionTitle, TitleContain, Titles } from './Module.styled';
import { BsPlayBtn } from 'react-icons/bs';
import { SlNotebook } from 'react-icons/sl';
import { TfiCommentAlt } from 'react-icons/tfi';
import { BiDownload } from 'react-icons/bi';
import { DownlowadContain, DownloadText, Pdf } from './Extra.styled';

const About = ({ value, setValue, data, teacherCreds }: any) => {

  const [teacher, setTeacher] = useState<any>([])
  const defaultImg = "/images/teachers/Brenda_instructora.jpg";

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
          Evaluación
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
            {data.title}, <span>de {teacherCreds[0]?.name}</span>
          </LessonTitle>
          <LessonContent>
            <p className='title'>Objetivo principal</p>
            <p>{data.objectives}.</p>
            <p className='title'>Especificaciones</p>
            <p>{data.about}.</p>
            {/* {data.extra.length > 0 && <p className='title'>Material de apoyo</p>}
            <ol type="a">
              {data?.extra?.map((extra: any) => {
                return (
                  <Link href={extra.path}>
                    <a target="_blank" style={{ textDecoration: 'none', color: 'black' }}>
                      <DownlowadContain>
                        <DownloadText>
                          <li>{extra.title.slice(0, -4)}</li>
                        </DownloadText>
                        <Pdf><BiDownload></BiDownload> Descargar Pdf</Pdf>
                      </DownlowadContain>
                    </a>
                  </Link>
                )
              })}
            </ol> */}
          </LessonContent>
        </TextContainer>
        <div className='teacher-container'>
          <img src={teacher.path ? teacher.path : defaultImg} alt="" />
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