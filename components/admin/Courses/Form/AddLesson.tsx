

import Image from "next/image";
import Link from "next/link";
import { addLesson } from "../../../../store/actions/AdminActions";
import { useRouter } from "next/router";
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
import { useState } from "react";


const AddLesson = () => {
  const router = useRouter()
  const { courseId, seasonId } = router.query;

  const [lesson, setLesson] = useState({
    title: '',
    banner: '',
    link: '',
    extra: [],
    points: 0,
    about: '',
    homeWork: '',
    homeWorkAbout: '',
  })
  const newLesson = () => {
    addLesson(lesson, courseId, seasonId).then(() => {
      alert(
        "Lección Creada"
      )
      router.push({
        pathname: `/admin/Edit`,
        query: { documentID: courseId }
      });
    })
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
            <Input
              placeholder="Epidosio 1: Lorem Ipsum"
              onChange={(e) => {
                setLesson({
                  ...lesson, title: e.target.value
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

              />
            </IconContain>
          </InputContain>
          <Image src="/images/admin/Courses/Demo/Edit.png" width={480} height={274} />
          <InputContain>
            <Label>Hipervínculo del video</Label>
            <Input
              placeholder="https://www.youtube.com/watch?v=RfR2Eh3fGxA&t=218s"
              onChange={(e) => {
                setLesson({
                  ...lesson, link: e.target.value
                })
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
              />
            </IconContain>
          </InputContain>
          <InputContain>
            <Label>Puntos Acreditados</Label>
            <Input
              type="number"
              placeholder="200"
              onChange={(e) => {
                setLesson({
                  ...lesson, points: parseInt(e.target.value)
                })
              }}
            />
          </InputContain>
          <InputContain>
            <Label>Descripción de Lección</Label>
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
              onChange={(e) => {
                setLesson({
                  ...lesson, about: e.target.value
                })
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
              onChange={(e) => {
                setLesson({
                  ...lesson, homeWork: e.target.value
                })
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
              onChange={(e) => {
                setLesson({
                  ...lesson, homeWorkAbout: e.target.value
                })
              }}
            />
          </InputContain>
        </Contain3>
      </EditContain>
      <ButtonContain>
        <Link href="/admin/Courses"><TransparentButton>Regresar</TransparentButton></Link>
        <PurpleButton
          onClick={newLesson}
        >Guardar</PurpleButton>
      </ButtonContain>
    </Container>
  )
}
export default AddLesson;