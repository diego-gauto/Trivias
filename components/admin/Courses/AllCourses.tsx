import React, { useState } from "react";

import { DocumentData } from "firebase/firestore";
import Link from "next/link";
import { LoaderContain } from "../../../containers/Profile/User/User.styled";
import { deleteWholeCourse } from "../../../store/actions/courseActions";
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
  TextColor,
  TitleContain,
  TransparentButton,
} from "./AllCourses.styled";

export const AllCourses = ({
  course
}: DocumentData) => {

  const [open, setOpen] = useState(false);
  const [IsDeleting, setIsDeleting] = useState<boolean>(false);
  const GonvarImg = "/images/purchase/logo.png";
  const deleteCourse = (element: any) => {
    setIsDeleting(true);
    if (window.confirm("Desea borrar este curso?")) {
      deleteWholeCourse(element).then(() => {
        window.location.reload();
        setIsDeleting(false);
      })
    }
  }
  return (
    <MainContainer>
      <CourseContainer >
        <TitleContain onClick={() => { setOpen(!open) }}>
          <CourseName>
            Curso - {course.courseTittle} {course.courseType == "Mensual" && <img src={GonvarImg} style={{ width: 30 }} />}
          </CourseName>
          {
            open == false &&
            <ChevD />
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
                  <Label>Objetivos</Label>
                  <Text>
                    {course.courseAbout}
                  </Text>
                </Info>
                <Info>
                  <Label>Frase Descriptiva</Label>
                  <Text>{course.coursePhrase}</Text>
                </Info>
                <Info>
                  <Label>Color del certificado</Label>
                  {
                    course.courseCertificateColor == "" ?
                      <Text>No hay color</Text>
                      :
                      <>
                        <TextColor color={course.courseCertificateColor}>{course.courseCertificateColor}</TextColor>
                      </>
                  }
                </Info>
              </Column>
              <Column>
                <Info>
                  <Label>Instructor(es)</Label>
                  <Text>
                    {
                      course.courseProfessor.map((val: any, index: any) => {
                        return (
                          <React.Fragment key={'Show Professors ' + index}>
                            {val.name}
                            <br />
                          </React.Fragment>
                        )
                      })
                    }
                  </Text>
                </Info>
                <Info>
                  <Label>Categorías</Label>
                  <Text> {
                    course.courseCategory.length > 1
                      ? course.courseCategory + ' '
                      : course.courseCategory
                  } </Text>
                </Info>
                <Info>
                  <Label>Tareas</Label>
                  <Text> {course.courseHomeWork == false ? "Flexible" : "Obligatorio"} </Text>
                </Info>
                <Info>
                  <Label>Materiales del curso</Label>
                  <Text>{course.courseMaterial}</Text>
                </Info>
              </Column>
              <Column>
                <Info>
                  <Label>Dificultad del curso</Label>
                  <Text>{course.courseDifficulty}</Text>
                </Info>
                <Info>
                  <Label>Membresía</Label>
                  <Text>{course.courseType}</Text>
                </Info>
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
              {!IsDeleting ? <RedButton onClick={(e) => {
                deleteCourse(course);
                e.stopPropagation();
              }}>Eliminar</RedButton> :
                <LoaderContain />}
            </ButtonContain>
          </>
        }

      </CourseContainer>
    </MainContainer>
  )
}
