import React, { useEffect, useState } from 'react'
import { Modal } from 'react-bootstrap';
import { ModContainer, Container, Title, DataContain, ItemContain, Text, Text2, InputContain, ButtonContain, SafeContained } from './HomeWorkModal.styled';


import { SendSingleEmail } from "../../../../store/actions/EmailActions";
import { reviewHomeworkApi } from '../../../api/homeworks';
import { createNotification } from '../../../api/notifications';

interface props {
  show: boolean,
  setShow: any,
  data: any,
  user: any,
  handleClick: any
}

const HomeWorkModal = ({ show, setShow, data, user, handleClick }: props) => {
  const [value, setValue] = useState<number>(0)
  const [review, setReview] = useState<any>({ score: 0 })
  const handleClose = () => setShow(false);

  const updateHomework = () => {
    let temp = {
      ...review,
      status: 1,
      id: data.id,
      user_id: data.userId,
      lessonId: data.lessonId,
      score: data.lessonPoints,
      courseId: data.courseId,
      season: data.seasonNumber - 1,
      lesson: data.lessonNumber - 1,
      title: data.courseTitle,
    }
    let notification = {
      userId: data.userId,
      message: 'Tarea revisada',
      type: 'homework',
      subType: "update",
      notificationId: '',
      score: data.lessonPoints,
      courseId: data.courseId,
      season: data.seasonNumber - 1,
      lesson: data.lessonNumber - 1,
      title: data.courseTitle,
    }
    createNotification(notification);
    reviewHomeworkApi(temp).then(() => {
      handleClick();
      setValue(0);
    })
  }

  useEffect(() => {
    if (data) {
      setReview({
        score: 0,
        status: 0,
        approved: data.approved,
        comment: ''
      })
    }
  }, [data])

  return (
    <ModContainer>
      <Modal show={show} onHide={handleClose} centered>
        <Container>
          <Title closeButton>
            Revisión de tarea
          </Title>
          {
            data.status == false &&
            <DataContain>
              <ItemContain>
                <Text>
                  Alumno
                </Text>
                <Text2>
                  {data.userName}
                </Text2>
              </ItemContain>
              <ItemContain>
                <Text>
                  Curso
                </Text>
                <Text2>
                  {data.courseTitle}
                </Text2>
              </ItemContain>
              <ItemContain>
                <Text>
                  Módulo
                </Text>
                <Text2>
                  {data.seasonNumber}
                </Text2>
              </ItemContain>
              <ItemContain>
                <Text>
                  Curso
                </Text>
                <Text2>
                  {data.courseTitle}
                </Text2>
              </ItemContain>
              <ItemContain>
                <Text>
                  Puntos
                </Text>
                <Text2>
                  {data.lessonPoints}
                </Text2>
              </ItemContain>
              <InputContain>
                <label>
                  Tarea Aprobada
                </label>
                <select defaultValue={0} onChange={(e: any) => {
                  setReview({ ...review, approved: parseInt(e.target.value) })
                }}>
                  <option value={1}>Si</option>
                  <option value={0}>No</option>
                </select>
              </InputContain>
              <InputContain>
                <label>
                  Comentario
                </label>
                <textarea
                  placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing 
              elit. Tellus ultrices id feugiat cursus velit. Aliquam pulvinar 
              in orci malesuada."
                  defaultValue={review.comment}
                  onChange={(e: any) => {
                    setReview({ ...review, comment: e.target.value })
                  }}
                />
              </InputContain>
              <ButtonContain>
                <button onClick={() => {
                  updateHomework()
                }}>
                  Enviar
                </button>
              </ButtonContain>
            </DataContain>
          }
          {
            data.status === 1 &&
            <DataContain>
              <SafeContained>
                <p> Tarea Revisada</p>
                <button onClick={handleClose}
                >Salir</button>
              </SafeContained>
            </DataContain>
          }
        </Container>
      </Modal>
    </ModContainer>
  )
}
export default HomeWorkModal;