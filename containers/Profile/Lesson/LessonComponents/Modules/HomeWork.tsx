import React from 'react'
import { TaskTitle, TaskText, ButtonDiv, UploadButton, UploadIcon, HomeWorkContain } from './HomeWork.styled'
import { TitleContain, PositionTitle, Titles, ListIcon, BookIcon, ChatboxIcon, EaselIcon, IconContain, SelectContain, UnSelected } from './Module.styled'

const HomeWork = ({ value, setValue, data }: any) => {
  return (
    <>
      <TitleContain >
        <Titles onClick={() => {
          setValue(1)
        }}>
          Acerca de
        </Titles>
        <ListIcon onClick={() => {
          setValue(1)
        }} />
        <Titles onClick={() => {
          setValue(2)
        }}>
          Material Extra
        </Titles>
        <BookIcon onClick={() => {
          setValue(2)
        }} />
        <PositionTitle >
          Tareas
        </PositionTitle>
        <ChatboxIcon />
        <Titles onClick={() => {
          setValue(4)
        }}>
          Comentarios
        </Titles>
        <EaselIcon onClick={() => {
          setValue(4)
        }} />
      </TitleContain>
      <IconContain>
        <UnSelected>
          <ListIcon onClick={() => {
            setValue(1)
          }} style={{ backgroundColor: 'gray' }} />
        </UnSelected>
        <SelectContain>
          <BookIcon />
        </SelectContain>
        <UnSelected>
          <ChatboxIcon onClick={() => {
            setValue(4)
          }} style={{ backgroundColor: 'gray' }} />
        </UnSelected>
        <UnSelected>
          <EaselIcon onClick={() => {
            setValue(2)
          }} style={{ backgroundColor: 'gray' }} />
        </UnSelected>
      </IconContain>
      <HomeWorkContain>
        <TaskTitle>
          Tarea: {data.homeWork}
        </TaskTitle>
        <TaskText>
          {data.homeWorkAbout}
        </TaskText>
        <ButtonDiv>
          <UploadButton>
            Subir tarea
            <UploadIcon />
          </UploadButton>
        </ButtonDiv>
      </HomeWorkContain>
    </>

  )
}
export default HomeWork;