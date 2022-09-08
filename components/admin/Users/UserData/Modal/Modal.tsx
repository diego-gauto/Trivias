

import { DocumentData } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { addCourseUser } from "../../../../../store/actions/PaymentActions";

import { CloseIcon } from "../UsersCardData.styled";
import {
  ButtonContain,
  Card,
  CardContain,
  CardImage,
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

const Modal1 = ({ show, setShow, user, courses }: any) => {
  const [course, setCourse] = useState<DocumentData>({});
  const [days, setDays] = useState<number>(0);

  const handleClick = (value: DocumentData) => {
    setCourse(value)
  }

  const handleClose = () => setShow(false);
  const addCourse = () => {
    if (days == 0) {
      alert("Por favor ingrese número")
    } else {
      let tempDays = days * 86400;
      let tempCourse = {
        id: course.id,
        duration: (new Date().getTime() / 1000) + tempDays
      }
      addCourseUser(tempCourse, user.id).then(() => {
        alert('Curso agregado con exito!');
        handleClose();
        setCourse({});
      });
    }
  }

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Container>
        <TitleContain>
          <Title>Agregar Curso</Title>
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
            <Select courses={courses} handleClick={handleClick} />
          </IconContain>
        </InputContain>
        {Object.values(course).length > 0 &&
          <>
            <MainCard>
              <Card>
                <ImageContain>
                  <CardImage />
                  {course.totalLessons == 1 ? <LessonText>Unica Lección</LessonText> :
                    <LessonText>{course.totalLessons} Lecciones</LessonText>}
                </ImageContain>
                <CardContain>
                  <CardTitle>Curso: {course.courseTittle}</CardTitle>
                  <CardSubTitle>{course.courseCategory}</CardSubTitle>
                </CardContain>
              </Card>
            </MainCard>

            <InputContain>
              <Label>Tiempo Activo (Días)</Label>
              <Input type="number" placeholder="Número de días activo" onChange={(e: any) => { setDays(e.target.value); }} />
            </InputContain>
            <ButtonContain>
              <PurpleButton onClick={addCourse}>Agregar Método</PurpleButton>
            </ButtonContain>
          </>
        }
      </Container>
    </Modal>
  )
}
export default Modal1;