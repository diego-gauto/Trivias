import Link from 'next/link';
import React, { useState } from 'react'
import { DownloadText, DownlowadContain, ExtraContain, FileIcon, Paragraph, Weight } from './Extra.styled'
import { AboutContain, CircleContain, NumberText, PointText, TextContainer, LessonTitle, LessonContent, ObjectiveContainer } from './About.styled';
import { BookIcon, ChatboxIcon, EaselIcon, IconContain, ListIcon, PositionTitle, SelectContain, TitleContain, Titles, UnSelected } from './Module.styled';

const About = ({ value, setValue, data }: any) => {

  return (
    <>
      <TitleContain>
        <PositionTitle position={value}>
          Acerca de
        </PositionTitle>
        {/* <Titles onClick={() => {
          setValue(2)
        }}>
          Material Extra
        </Titles> */}
        {data.homeworkAvailable && <Titles onClick={() => {
          setValue(3)
        }}>
          Tareas
        </Titles>}
        <Titles onClick={() => {
          setValue(4)
        }}>
          Comentarios
        </Titles>
      </TitleContain>
      <IconContain>
        <SelectContain>
          {/* <WhiteDivide /> */}
          <ListIcon />
        </SelectContain>
        {data.homeworkAvailable && <UnSelected>
          <BookIcon onClick={() => {
            setValue(3)
          }} style={{ backgroundColor: 'gray' }} />
        </UnSelected>}
        <UnSelected>
          <ChatboxIcon onClick={() => {
            setValue(4)
          }} style={{ backgroundColor: 'gray' }} />
        </UnSelected>
        {/* <UnSelected>
          <EaselIcon
            onClick={() => {
              setValue(2)
            }} style={{ backgroundColor: 'gray' }} />
        </UnSelected> */}
      </IconContain>
      <AboutContain>
        {data.points > 0 && <CircleContain>
          {<NumberText>
            +{data.points}
          </NumberText>}
          <PointText>
            Puntos al <br /> finalizar
          </PointText>
        </CircleContain>}
        <TextContainer>
          <LessonTitle>
            Sobre la lección
          </LessonTitle>
          <LessonContent>
            {data.about}
          </LessonContent>
          {data.extra?.map((extra: any, index: any) => {
            return (
              <div key={"About " + index}>
                <Link href={extra.path}>
                  <a target="_blank" style={{ textDecoration: 'none', color: 'black' }}>
                    <DownlowadContain>
                      <DownloadText>
                        <FileIcon />
                        {extra.title}
                      </DownloadText>
                      <Weight>
                        3.1 MB
                      </Weight>
                    </DownlowadContain>
                  </a>
                </Link>
              </div>
            )
          })}
        </TextContainer>
      </AboutContain>
      {
        data.objective != undefined
          ?
          <ObjectiveContainer >
            <div className="title">
              <p>
                Objetivos
              </p>
            </div>
            <div className="content">
              <p>
                {data.objective}
              </p>
            </div>
          </ObjectiveContainer>
          : ""
      }

    </>
  )
}
export default About;