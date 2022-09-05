import React, { useState } from "react";

import Link from "next/link";

import {
  ButtonContain,
  ChevD,
  ChevU,
  Column,
  CourseContainer,
  CourseContent,
  CourseName,
  Info,
  Label,
  MainContainer,
  PurpleButton,
  Text,
  TitleContain,
  TransparentButton,
} from "./AllCourses.styled";
import { IAllCourses } from "./IAllCourses";

export const AllCourses = ({
  courseTittle,
  courseAbout,
  courseCategory,
  courseDuration,
  coursePrice,
  courseProfessor,
  coursePublishYear,
  courseSubtittle,
  index,
  documentID
}: IAllCourses) => {

  const [open, setOpen] = useState(false)
  return (
    <MainContainer>
      <CourseContainer>
        <TitleContain>
          <CourseName>
            Curso - {courseTittle}
          </CourseName>
          {
            open == false &&
            <ChevD onClick={() => { setOpen(true) }} />
          }
          {
            open == true &&
            <ChevU onClick={() => { setOpen(false) }} />
          }

        </TitleContain>
        {
          open == true &&
          <>
            <CourseContent>
              <Column>
                <Info>
                  <Label>Título del Curso</Label>
                  <Text>{courseTittle}</Text>
                </Info>
                <Info>
                  <Label>Subtítulo del Curso</Label>
                  <Text>{courseSubtittle} </Text>
                </Info>
                <Info>
                  <Label>Sobre el Curso</Label>
                  <Text>
                    {courseAbout}
                  </Text>
                </Info>
              </Column>
              <Column>
                <Info>
                  <Label>Profesor(es)</Label>
                  <Text> {courseProfessor.name} </Text>
                </Info>
                <Info>
                  <Label>Categorías</Label>
                  <Text> {courseCategory} </Text>
                </Info>
                <Info>
                  <Label>Año de Publicación</Label>
                  <Text> {coursePublishYear} </Text>
                </Info>
              </Column>
              <Column>
                <Info>
                  <Label>Duración de Suscripción (Días)</Label>
                  <Text> {courseDuration} </Text>
                </Info>
                <Info>
                  <Label>Precio (MXN)</Label>
                  <Text> {coursePrice} </Text>
                </Info>
              </Column>
            </CourseContent>
            <ButtonContain>
              <TransparentButton onClick={() => { setOpen(false) }}>Cerrar</TransparentButton>
              <Link href={`/admin/Edit?documentID=${documentID}`}>
                <PurpleButton>Editar</PurpleButton>
              </Link>
            </ButtonContain>
          </>
        }

      </CourseContainer>
    </MainContainer>
  )
}
