import Image from 'next/image';
import Link from 'next/link';
import React from 'react'
import { IconContain } from './CourseForm.styled';
import { Container, Contain1, EditContain, Input, InputContain, Label, Title, TitleContain, InputSelect, InputBig, Contain2, Contain3, HwTitle, SlideContain, TitleSlide, ButtonContain, TransparentButton, PurpleButton, Folder } from './Edit.styled';

const AddLesson = () => {
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
        <Link href="/admin/Courses"><TransparentButton>Regresar</TransparentButton></Link>
        <PurpleButton>Guardar</PurpleButton>
      </ButtonContain>
    </Container>
  )
}
export default AddLesson;