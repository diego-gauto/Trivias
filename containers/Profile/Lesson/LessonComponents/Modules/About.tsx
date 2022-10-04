import React, { useState } from 'react'
import { AboutContain, CircleContain, NumberText, PointText, TextContainer, LessonTitle, LessonContent } from './About.styled';
import { BookIcon, ChatboxIcon, EaselIcon, IconContain, ListIcon, PositionTitle, SelectContain, TitleContain, Titles, UnSelected } from './Module.styled';

const About = ({ value, setValue, data }: any) => {

  return (
    <>
      <TitleContain>
        <PositionTitle position={value}>
          Acerca de
        </PositionTitle>
        <Titles onClick={() => {
          setValue(2)
        }}>
          Material Extra
        </Titles>
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
        </TextContainer>
      </AboutContain>
    </>
  )
}
export default About;