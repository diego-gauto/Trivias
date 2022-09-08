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
  RedButton,
  Text,
  TitleContain,
  TransparentButton,
} from "./AllCourses.styled";
import { IAllCourses } from "./IAllCourses";
import { deleteWholeCourse } from "../../../store/actions/courseActions";
import { DocumentData } from "firebase/firestore";

export const AllCourses = ({
  course
}: DocumentData) => {

  const [open, setOpen] = useState(false);
  const deleteCourse = (element: any) => {
    deleteWholeCourse(element).then(() => {
      window.location.reload();
    })
  }

  return (
    <MainContainer>
      <CourseContainer>
        <TitleContain>
          <CourseName>
            Curso - {course.courseTittle}
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
                  <Text>{course.courseTittle}</Text>
                </Info>
                <Info>
                  <Label>Subtítulo del Curso</Label>
                  <Text>{course.courseSubtittle} </Text>
                </Info>
                <Info>
                  <Label>Sobre el Curso</Label>
                  <Text>
                    {course.courseAbout}
                  </Text>
                </Info>
              </Column>
              <Column>
                <Info>
                  <Label>Profesor(es)</Label>
                  <Text> {course.courseProfessor.name} </Text>
                </Info>
                <Info>
                  <Label>Categorías</Label>
                  <Text> {course.courseCategory} </Text>
                </Info>
                <Info>
                  <Label>Año de Publicación</Label>
                  <Text> {course.coursePublishYear} </Text>
                </Info>
              </Column>
              <Column>
                <Info>
                  <Label>Duración de Suscripción (Días)</Label>
                  <Text> {course.courseDuration} </Text>
                </Info>
                <Info>
                  <Label>Precio (MXN)</Label>
                  <Text> {course.coursePrice} </Text>
                </Info>
              </Column>
            </CourseContent>
            <ButtonContain>
              <TransparentButton onClick={() => { setOpen(false) }}>Cerrar</TransparentButton>
              <Link href={`/admin/Edit?documentID=${course.documentID}`}>
                <PurpleButton>Editar</PurpleButton>
              </Link>
              <RedButton onClick={() => {
                deleteCourse(course)
              }}>Eliminar</RedButton>
            </ButtonContain>
          </>
        }

      </CourseContainer>
    </MainContainer>
  )
}
