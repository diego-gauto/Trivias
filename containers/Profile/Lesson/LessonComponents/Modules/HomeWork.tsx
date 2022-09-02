import React, { useState } from 'react'
import { addHomework } from '../../../../../store/actions/courseActions'
import { TaskTitle, TaskText, ButtonDiv, UploadButton, UploadIcon, HomeWorkContain } from './HomeWork.styled'
import { TitleContain, PositionTitle, Titles, ListIcon, BookIcon, ChatboxIcon, EaselIcon, IconContain, SelectContain, UnSelected } from './Module.styled'

const HomeWork = ({ value, setValue, data, user, season, lesson }: any) => {

  const getImage = (file: any) => {
    let tempHomework: any = {}
    tempHomework.userName = user.name;
    tempHomework.userEmail = user.email;
    tempHomework.title = data.homeWork;
    tempHomework.about = data.homeWorkAbout;
    tempHomework.path = '';
    tempHomework.season = parseInt(season) + 1;
    tempHomework.lesson = parseInt(lesson) + 1;
    tempHomework.createdAt = new Date();
    tempHomework.courseId = data.courseId
    if (file.length > 0) {
      var reader = new FileReader();
      reader.readAsDataURL(file[0]);
      reader.onload = (_event) => {
        tempHomework.path = reader.result;
        addHomework(tempHomework).then(() => {

          alert("Su tarea se subió correctamente!");
        })
      };
    }
  }

  const uploadHwk = () => {
    document.getElementById('hide')?.click()
  }

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
            <UploadIcon onClick={uploadHwk} />
            <input id="hide" type="file" onChange={(e) => { getImage(e.target.files) }} hidden />
          </UploadButton>
        </ButtonDiv>
      </HomeWorkContain>
    </>

  )
}
export default HomeWork;