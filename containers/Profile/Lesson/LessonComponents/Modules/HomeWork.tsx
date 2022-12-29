import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { addHomework, getHomework } from '../../../../../store/actions/courseActions'
import { DownlowadContain, DownloadText, FileIcon, Weight, Pdf } from './Extra.styled'
import { TaskTitle, TaskText, ButtonDiv, UploadButton, UploadIcon, HomeWorkContain, ReviewButton } from './HomeWork.styled'
import { TitleContain, PositionTitle, Titles, ListIcon, BookIcon, ChatboxIcon, EaselIcon, IconContain, SelectContain, UnSelected } from './Module.styled'
import { BiDownload } from "react-icons/bi";
import { BsFileArrowUp } from "react-icons/bs";
import { BsPlayBtn } from 'react-icons/bs';
import { SlNotebook } from 'react-icons/sl';
import { TfiCommentAlt } from 'react-icons/tfi';

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
          <BsPlayBtn></BsPlayBtn>
          Acerca del curso
        </Titles>
        {<PositionTitle position={value}>
          <SlNotebook></SlNotebook>
          Materiales y tareas
        </PositionTitle>}
        <Titles onClick={() => {
          setValue(4)
        }}>
          <TfiCommentAlt></TfiCommentAlt>
          Comentarios
        </Titles>
        <div className='line'></div>
      </TitleContain>
      <HomeWorkContain>
        <div className='left'>
          <TaskTitle>
            Material de apoyo
          </TaskTitle>
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
          </ol>
        </div>
        <div className='middle'></div>
        <div className='right'>
          <TaskTitle style={{ color: "#f78803" }}>
            Sube aquí tus prácticas <br />
            <span>
              Da click en el botón correspondiente <br />
              y sube tu tarea manualmente.
            </span>
          </TaskTitle>
          <div className='upload-info'>
            <p className='title'>Tamaño máximo: <b>5 Mb</b></p>
            <p className='title'>Formatos permitidos:</p>
            <div className='files'>
              <p>PNG</p>
              <div className='line'></div>
              <p>JPG</p>
              <div className='line'></div>
              <p>DOC</p>
              <div className='line'></div>
              <p>DOCX</p>
              <div className='line'></div>
              <p>PPT</p>
              <div className='line'></div>
              <p>PPTX</p>
              <div className='line'></div>
              <p>PDF</p>
            </div>
          </div>
          <div className='line'></div>
          {data.homeworkAvailable ? <div className='upload-container'>
            <p>a. Módulo {parseInt(season) + 1} - Lección {parseInt(lesson) + 1}</p>
            <p>Tarea: <span>{data.homeWork}</span></p>
            {status == "" && <div className='homework' onClick={uploadHwk}>
              <BsFileArrowUp></BsFileArrowUp>
              Subir Tarea
              <input id="hide" type="file" onChange={(e) => { getImage(e.target.files) }} hidden />
            </div>}
            {status == "pending" && <div className='homework'>
              <BsFileArrowUp></BsFileArrowUp>
              En Revisión
            </div>}
            {status == "aproved" && <div className='homework'>
              <BsFileArrowUp></BsFileArrowUp>
              Tarea Aprobada
            </div>}
          </div> :
            <p>Lección sin tarea...</p>}
        </div>
      </HomeWorkContain>
    </>

  )
}
export default HomeWork;