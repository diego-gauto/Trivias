import React, { useEffect, useState } from "react";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

import { IconContain } from "./CourseForm.styled";
import Delete from "./Delete/Delete";
import {
  Button,
  ButtonContain,
  Contain1,
  Contain2,
  Contain3,
  Container,
  EditContain,
  Extra,
  Folder,
  HwTitle,
  ImageContain,
  Input,
  InputBig,
  InputContain,
  Label,
  PurpleButton,
  SlideContain,
  Title,
  TitleContain,
  TitleSlide,
  TransparentButton,
  TrashIcon,
} from "./Edit.styled";
import { deleteLessonMaterial, getLesson, updateLesson } from "../../../../store/actions/courseActions";
import { Input2 } from "../../Rewards/Prizes/Modal/Modal.styled";

const Edit = () => {
  const routerState = useRouter().query
  const router = useRouter();
  const [show, setShow] = useState(false);
  const [deleteMessage, setDeleteMessage] = useState(0);
  const [lesson, setLesson] = useState<any>({})
  const getThisLesson = () => {
    getLesson(routerState.courseID, routerState.seasonID, routerState.lessonID).then(res => {
      console.log(res)
      setLesson(res)
    })
  }
  const updateThisLesson = async () => {
    await updateLesson(lesson, routerState.courseID, routerState.seasonID, routerState.lessonID).then(() => {
      router.push({
        pathname: `/admin/Edit`,
        query: { documentID: routerState.courseID }
      });
    })
  }
  const getImage = (file: any) => {
    let tempExtra: any = lesson.extra;

    file = Object.values(file);
    console.log(file)
    file.forEach((element: any) => {
      console.log(element.name)
      var reader = new FileReader();
      reader.readAsDataURL(element);
      reader.onload = (_event) => {
        tempExtra.push({ path: reader.result, format: reader.result, title: element.name })
      }
    });
    setLesson({ ...lesson, extra: tempExtra })
  }
  const getImage2 = (file: any) => {
    console.log(file)
    var reader = new FileReader();
    reader.readAsDataURL(file[0]);
    reader.onload = (_event) => {
      setLesson({ ...lesson, image: reader.result, format: reader.result })
    };
  }
  const deleteImage = (material: any, index: any) => {
    let tempExtra = lesson.extra;
    deleteLessonMaterial(material).then(res => {
      tempExtra.splice(index, 1);
      setLesson({ ...lesson, extra: tempExtra })
    })
  }
  useEffect(() => {
    getThisLesson();
  }, [])

  return (
    <Container>
      <TitleContain>
        <Title>Editar Lección</Title>
        <Button onClick={() => { setShow(true), setDeleteMessage(1) }}>Eliminar Lección <TrashIcon /></Button>
      </TitleContain>
      <EditContain>
        <Contain1>

          <InputContain>
            <Label>Título de la Lección</Label>
            <Input
              placeholder="Epidosio 1: Lorem Ipsum"
              defaultValue={lesson.title}
              onChange={(e: any) => {
                setLesson({ ...lesson, title: e.target.value })
              }}
            />
          </InputContain>
          <InputContain>
            <Label>Número de Lección</Label>
            <Input
              placeholder="1"
              defaultValue={lesson.number}
              onChange={(e) => {
                setLesson({
                  ...lesson, number: e.target.value
                })
              }}
            />
          </InputContain>
          <InputContain>
            <Label>Portada de la Lección</Label>
            <IconContain>
              <Folder />
              <Input2
                type="file"
                placeholder="Seleccionar archivo"
                onChange={(e) => { getImage2(e.target.files) }}

              />
            </IconContain>
          </InputContain>
          <ImageContain>
            <img src={lesson.image} />
          </ImageContain>
          <InputContain>
            <Label>Hipervínculo del video</Label>
            <Input
              placeholder="https://www.youtube.com/watch?v=RfR2Eh3fGxA&t=218s"
              defaultValue={lesson.link}
              onChange={(e: any) => {
                setLesson({ ...lesson, link: e.target.value })
              }}
            />
          </InputContain>
        </Contain1>

        <Contain2>
          <InputContain>
            <Label>Material Adicional</Label>
            <IconContain>
              <Folder />
              <Input2
                type="file"
                placeholder="Seleccionar archivo"
                onChange={(e) => { getImage(e.target.files) }}

              />
            </IconContain>
          </InputContain>
          {
            lesson.extra?.length > 0 &&
            <InputContain>
              <Label>Materiales Adicionales</Label>
              <Extra>
                {
                  lesson.extra?.map((val: any, index: any) => {
                    return (
                      <p
                        key={"Lesson Extra Material" + index}
                      >{val.reference} <i
                        onClick={() => {
                          deleteImage(val, index)
                        }}
                      > x</i></p>
                    )
                  })
                }
              </Extra>
            </InputContain>
          }

          <InputContain>
            <Label>Puntos Acreditados</Label>
            <Input
              placeholder="200"
              defaultValue={lesson.points}
              onChange={(e: any) => {
                setLesson({ ...lesson, points: e.target.value })
              }}
            />
          </InputContain>
          <InputContain>
            <Label>Material Adicional</Label>
            <InputBig
              placeholder="Lorem ipsum dolor sit amet, consectetur 
              adipiscing elit. Pharetra, cursus sapien ac magna. 
              Consectetur amet eu tincidunt quis. Non habitasse viverra 
              malesuada facilisi vel nunc. Mattis euismod nisi, id bibendum 
              adipiscing morbi mattis eget. Sed accumsan quisque mi sodales 
              malesuada fusce scelerisque urna. Enim sit pulvinar dui ipsum 
              feugiat. Ac enim ultrices venenatis imperdiet suspendisse mattis 
              enim. Mauris odio sit id curabitur enim mi. Orci id pharetra morbi 
              quisque."
              defaultValue={lesson.about}
              onChange={(e: any) => {
                setLesson({ ...lesson, about: e.target.value })
              }}
            />
          </InputContain>
        </Contain2>
        <Contain3>
          <HwTitle>Tareas</HwTitle>
          <SlideContain>
            <TitleSlide>Tarea</TitleSlide>
          </SlideContain>
          <InputContain>
            <Label>Título de la Tarea</Label>
            <Input
              placeholder="Tarea 23: Intro a uñas francesas"
              defaultValue={lesson.homeWork}
              onChange={(e: any) => {
                setLesson({ ...lesson, homeWork: e.target.value })
              }}
            />
          </InputContain>
          <InputContain>
            <Label>Descripción de la Tarea</Label>
            <InputBig
              placeholder="Lorem ipsum dolor sit amet, consectetur 
              adipiscing elit. Pharetra, cursus sapien ac magna. 
              Consectetur amet eu tincidunt quis. Non habitasse viverra 
              malesuada facilisi vel nunc. Mattis euismod nisi, id bibendum 
              adipiscing morbi mattis eget. Sed accumsan quisque mi sodales 
              malesuada fusce scelerisque urna. Enim sit pulvinar dui ipsum 
              feugiat. Ac enim ultrices venenatis imperdiet suspendisse mattis 
              enim. Mauris odio sit id curabitur enim mi. Orci id pharetra morbi 
              quisque."
              defaultValue={lesson.homeWorkAbout}
              onChange={(e: any) => {
                setLesson({ ...lesson, homeWorkAbout: e.target.value })
              }}
            />
          </InputContain>
        </Contain3>
      </EditContain>
      <ButtonContain>
        <Link
          href="/admin/Edit"
        >
          <TransparentButton>
            Regresar
          </TransparentButton>
        </Link>
        <PurpleButton onClick={updateThisLesson}>Guardar</PurpleButton>
      </ButtonContain>
      <Delete setShow={setShow}
        show={show}
        deleteMessage={deleteMessage}
        courseID={routerState.courseID}
        lessonID={routerState.lessonID}
        seasonID={routerState.seasonID} />
    </Container>
  )
}
export default Edit;