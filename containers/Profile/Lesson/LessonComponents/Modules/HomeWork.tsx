import { DocumentData } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { addHomework, getHomework } from '../../../../../store/actions/courseActions'
import { TaskTitle, TaskText, ButtonDiv, UploadButton, UploadIcon, HomeWorkContain, ReviewButton } from './HomeWork.styled'
import { TitleContain, PositionTitle, Titles, ListIcon, BookIcon, ChatboxIcon, EaselIcon, IconContain, SelectContain, UnSelected } from './Module.styled'

const HomeWork = ({ value, setValue, data, user, season, lesson, teacherCreds }: any) => {
  const [status, setStatus] = useState("");

  useEffect(() => {
    getHomework(data.id, user.id).then((res: any) => {
      if (res) {
        if (!res.status) {
          setStatus("pending");
        }
        if (res.status && res.aproved) {
          setStatus("aproved")
        }
        if (res.status && !res.aproved) {
          setStatus("")
        }
      } else {
        setStatus("")
      }
    })
  }, [data])


  if (!data.homeworkAvailable) {
    setValue(1)
  }
  const getImage = (file: any) => {
    let tempHomework: any = {}
    tempHomework.userName = user.name;
    tempHomework.userEmail = user.email;
    tempHomework.title = data.homeWork;
    tempHomework.path = '';
    tempHomework.season = parseInt(season);
    tempHomework.lesson = parseInt(lesson);
    tempHomework.createdAt = new Date();
    tempHomework.courseId = data.courseId;
    tempHomework.userId = user.id;
    tempHomework.lessonId = data.id;
    tempHomework.seasonId = ""
    tempHomework.aproved = false
    tempHomework.comment = ""
    tempHomework.teacherCreds = teacherCreds;
    tempHomework.status = false;

    if (file.length > 0) {
      var reader = new FileReader();
      reader.readAsDataURL(file[0]);
      reader.onload = (_event) => {
        tempHomework.path = reader.result;
        addHomework(tempHomework, user.id).then(() => {
          alert("Su tarea se subió correctamente!");
          setStatus("pending");
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
        {/* <Titles onClick={() => {
          setValue(2)
        }}>
          Material Extra
        </Titles> */}
        <BookIcon onClick={() => {
          setValue(2)
        }} />
        {data.homeworkAvailable && <PositionTitle position={value}>
          Tareas
        </PositionTitle>}
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
        {/* <UnSelected>
          <EaselIcon onClick={() => {
            setValue(2)
          }} style={{ backgroundColor: 'gray' }} />
        </UnSelected> */}
      </IconContain>
      <HomeWorkContain>
        <TaskTitle>
          Tarea: {data.homeWork}
        </TaskTitle>
        <TaskText dangerouslySetInnerHTML={{ __html: data.homeWorkAbout }}>

        </TaskText>
        {(user) && <ButtonDiv>
          {status == "" && <UploadButton onClick={uploadHwk}>
            Subir tarea
            <UploadIcon />
            <input id="hide" type="file" onChange={(e) => { getImage(e.target.files) }} hidden />
          </UploadButton>}
          {status == "pending" && <ReviewButton onClick={uploadHwk}>
            En Revisión
          </ReviewButton>}
          {status == "aproved" && <ReviewButton onClick={uploadHwk}>
            Tarea Aprobada
          </ReviewButton>}
        </ButtonDiv>}
      </HomeWorkContain>
    </>

  )
}
export default HomeWork;