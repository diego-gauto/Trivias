

import Image from "next/image";
import Link from "next/link";

import { db } from "../../../../firebase/firebaseConfig";
import { Input2 } from "../../Rewards/Prizes/Modal/Modal.styled";
import { IconContain } from "./CourseForm.styled";
import {
  ButtonContain,
  Contain1,
  Contain2,
  Contain3,
  Container,
  EditContain,
  Folder,
  HwTitle,
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
} from "./Edit.styled";

const AddLesson = () => {
  interface NewLessonAdded {
    lessonDescription: string,
    lessonDuration: number,
    lessonTitle: string,
  }

  var courseID: any = ""
  try {
    var str: any = ""
    var arr: any = []
    str = window.location.search;
    arr = str.split("?documentID=")
    str = arr[1]
    courseID = str

  } catch (error) {
    courseID = "none"
  }


  const createNewLesson = async () => {
    return await db.collection("courses").doc("8y7tv733Um2nWDv8GKQn").collection("seasons").doc("17Kk33mvZrxPiaT6fiRL").collection("lessons").add({});
  }

  return (
    <Container>
      <TitleContain>
        <Title>Nueva Lección</Title>
      </TitleContain>
      <EditContain>
        <Contain1>

          <InputContain>
            <Label>Título de la Lección</Label>
            <Input placeholder="Epidosio 1: Lorem Ipsum" />
          </InputContain>
          <InputContain>
            <Label>Portada de la Lección</Label>
            <IconContain>
              <Folder />
              <Input2
                type="file"
                placeholder="Seleccionar archivo"
              />
            </IconContain>
          </InputContain>
          <Image src="/images/admin/Courses/Demo/Edit.png" width={480} height={274} />
          <InputContain>
            <Label>Hipervínculo del video</Label>
            <Input placeholder="https://www.youtube.com/watch?v=RfR2Eh3fGxA&t=218s" />
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
              />
            </IconContain>
          </InputContain>
          <InputContain>
            <Label>Puntos Acreditados</Label>
            <Input placeholder="200" />
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
            quisque." />
          </InputContain>
        </Contain2>
        <Contain3>
          <HwTitle>Tareas</HwTitle>
          <SlideContain>
            <TitleSlide>Tarea</TitleSlide>
          </SlideContain>
          <InputContain>
            <Label>Título de la Tarea</Label>
            <Input placeholder="Tarea 23: Intro a uñas francesas" />
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
            quisque." />
          </InputContain>
        </Contain3>
      </EditContain>
      <ButtonContain>
        <Link href="/admin/Courses"><TransparentButton>Regresar</TransparentButton></Link>
        <PurpleButton onClick={createNewLesson}>Guardar</PurpleButton>
      </ButtonContain>
    </Container>
  )
}
export default AddLesson;