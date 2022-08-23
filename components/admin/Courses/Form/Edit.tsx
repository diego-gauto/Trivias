import React, { useState } from "react";

import { doc } from "firebase/firestore";
import Image from "next/image";
import Link from "next/link";

import { db } from "../../../../firebase/firebaseConfig";
import { DeletePopUp } from "../Form/Delete/Delete";
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
  Folder,
  HwTitle,
  Input,
  InputBig,
  InputContain,
  InputSelect,
  Label,
  PurpleButton,
  SlideContain,
  Title,
  TitleContain,
  TitleSlide,
  TransparentButton,
  TrashIcon,
} from "./Edit.styled";

const Edit = (props: DeletePopUp) => {
  const { seasonDocId } = props;
  const { courseID } = props;
  const { lessonId } = props;

  const [show, setShow] = useState(false);
  const [deleteMessage, setDeleteMessage] = useState(0);

  const deleteSeason = () => {
    const getLessonID = db.collection("courses").doc(courseID).collection("seasons").doc(seasonDocId).collection("lessons").doc(lessonId);
  }
  return (
    <Container>
      <TitleContain>
        <Title>Editar Lección</Title>
        <Button onClick={() => { setShow(true), deleteSeason(), setDeleteMessage(1) }}>Eliminar Lección <TrashIcon /></Button>
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
              <InputSelect placeholder="Seleccionar archivo" />
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
              <InputSelect placeholder="Seleccionar archivo" />
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
        <Link href="/admin/Edit"><TransparentButton>Regresar</TransparentButton></Link>
        <PurpleButton>Guardar</PurpleButton>
      </ButtonContain>
      <Delete setShow={setShow} show={show} deleteMessage={deleteMessage} seasonDocId={""} courseID={""} />
    </Container>
  )
}
export default Edit;