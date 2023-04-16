

import { DocumentData } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { addCourseUser } from "../../../../../store/actions/PaymentActions";
import { addCourseMembershipApi, updateCourseMembershipApi } from "../../../../api/admin";

import { CloseIcon } from "../UsersCardData.styled";
import {
  ButtonContain,
  Card,
  CardContain,
  CardSubTitle,
  CardTitle,
  Container,
  Data,
  IconContain,
  ImageContain,
  Info,
  Input,
  InputContain,
  Label,
  LessonText,
  MainCard,
  PurpleButton,
  Text1,
  Text2,
  Title,
  TitleContain,
} from "./Modal.styled";
import Select from "./Select/Select";

const Modal1 = ({ show, setShow, user, courses, handleCourse, openUserCardData }: any) => {
  const [course, setCourse] = useState<DocumentData>({});
  const [days, setDays] = useState<number>(0);
  let today = new Date().getTime() / 1000;

  const handleClick = (value: DocumentData) => {
    setCourse(value)
  }
  const handleClose = () => setShow(false);
  const addCourse = () => {
    if (days === 0) {
      alert("Por favor ingrese número")
    }
    else {
      let tempUserCourse = JSON.parse(JSON.stringify(user.user_courses));
      let courseForUpdate: any = []
      courseForUpdate = tempUserCourse.filter((userCourse: any) => {
        let tempFinalDate = 0;
        if (userCourse.final_date < today) {
          tempFinalDate = today + days * 86400;
          userCourse.final_date = tempFinalDate;
        }
        if (userCourse.final_date > today) {
          tempFinalDate = userCourse.final_date + days * 86400;
          userCourse.final_date = tempFinalDate;
        }
        return userCourse.course_id === course.id
      })

      if (courseForUpdate.length > 0) {
        let newDate = new Date(courseForUpdate[0].final_date * 1000);
        let tempDay = newDate.getDate()
        let tempMonth = newDate.getMonth() + 1;
        let tempYear = newDate.getFullYear()
        let formatDate = `${tempDay}/${tempMonth}/${tempYear}`
        updateCourseMembershipApi(courseForUpdate[0]).then((res) => {
          alert("Nueva Fecha de finalizacion: " + formatDate + " para el curso: " + course.title);
          console.log(res);
          handleClose();
          openUserCardData(user);
        })
      }
      else {
        let courseData = {
          user_id: user.id,
          course_id: course.id,
          final_date: today + days * 86400,
        }
        let newDate = new Date(courseData.final_date * 1000);
        let tempDay = newDate.getDate()
        let tempMonth = newDate.getMonth() + 1;
        let tempYear = newDate.getFullYear()
        let formatDate = `${tempDay}/${tempMonth}/${tempYear}`
        addCourseMembershipApi(courseData).then((res) => {
          alert("Nueva Fecha de finalizacion: " + formatDate + " para el curso: " + course.title);
          console.log(res);
          handleClose();
          openUserCardData(user);
        })
      }
    }
  }
  // const testDays = () => {
  //   let date = new Date(days);
  //   let seconds = date.getTime() / 1000; //1440516958
  //   let courseData = {
  //     user_id: user.id,
  //     course_id: course.id,
  //     final_date: seconds,
  //   }
  //   addCourseMembershipApi(courseData).then((res) => {
  //     console.log(res);
  //     handleClose();
  //     openUserCardData(user);
  //   })
  //   console.log(seconds);
  // }
  return (
    <Modal show={show} onHide={handleClose} centered>
      <Container>
        <TitleContain>
          <Title>Agregar Curso de paga</Title>
          <CloseIcon onClick={handleClose} />
        </TitleContain>
        <Data>
          <Info>
            <Text1>
              Usuario
            </Text1>
            <Text2>
              {user.name}
            </Text2>
          </Info>
          <Info>
            <Text1>
              Correo electrónico
            </Text1>
            <Text2>
              {user.email}
            </Text2>
          </Info>
        </Data>
        <InputContain>
          <Label>Curso a añadir</Label>
          <IconContain>
            {/* select de cursos */}
            <Select courses={courses} handleClick={handleClick} />
          </IconContain>
        </InputContain>
        {Object.values(course).length > 0 &&
          <>
            <MainCard>
              <Card>
                <ImageContain>
                  <img src={course.image} className="img-course" />
                  {course.totalLessons === 1 ? <LessonText>Unica Lección</LessonText> :
                    <LessonText>{course.totalLessons} Lecciones</LessonText>
                  }
                </ImageContain>
                <CardContain>
                  <CardTitle>Curso: {course.title}</CardTitle>
                  <CardSubTitle>
                    {
                      course.categories.map((val: any, idx: number) => {
                        return (
                          <React.Fragment key={"cat_idx" + idx}>
                            {val.name}
                          </React.Fragment>
                        )
                      })
                    }
                  </CardSubTitle>
                </CardContain>
              </Card>
            </MainCard>

            <InputContain>
              <Label>Tiempo Activo (Días)</Label>
              <Input
                type="string" placeholder="Número de días activo" onChange={(e: any) => { setDays(e.target.value); }} />
            </InputContain>
            <ButtonContain>
              <PurpleButton onClick={addCourse}>Agregar Dias al Curso</PurpleButton>
            </ButtonContain>
          </>
        }
      </Container>
    </Modal>
  )
}
export default Modal1;