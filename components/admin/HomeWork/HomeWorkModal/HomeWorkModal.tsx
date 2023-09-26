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
  const [loader, setLoader] = useState<any>(false);
  const handleClose = () => setShow(false);

  const updateHomework = () => {
    if (confirm('La tarea esta revisada correctamente?')) {
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
        type: review.approved === 1 ? "1" : "2",
        notificationId: '',
        courseId: data.courseId,
        season: data.seasonNumber - 1,
        lesson: data.lessonNumber - 1,
        title: data.courseTitle,
        score: review.approved === 1 ? data.lessonPoints : 0
      }
      createNotification(notification);
      reviewHomeworkApi(temp).then(() => {
        handleClick(review.approved);
        setValue(0);
      })
    }
  }
  const changeCommentValue = (approved: any) => {
    setLoader(false);
    if (approved === 1) {
      setReview({
        ...review,
        comment: 'Felicidades. Buen trabajo!!! Has aprobado tu tarea. Te invitamos a seguir con la próxima lección.',
        approved: approved,
      })
    }
    else {
      setReview({
        ...review,
        comment: 'Lamentablemente tu tarea no cuenta con las pautas para ser aprobada. Te invitamos a que la hagas nuevamente y la vuelvas a entregar.',
        approved: approved,
      })
    }
    setTimeout(() => {
      setLoader(true)
    }, 50);
  }
  useEffect(() => {
    setLoader(false);
    if (data) {
      setReview({
        score: 0,
        status: 0,
        approved: 1,
        comment: 'Felicidades. Buen trabajo!!! Has aprobado tu tarea. Te invitamos a seguir con la próxima lección.'
      })
      setTimeout(() => {
        setLoader(true)
      }, 50);
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
                  {data.seasonTitle}
                </Text2>
              </ItemContain>
              <ItemContain>
                <Text>
                  Lección
                </Text>
                <Text2>
                  {data.lessonTitle}
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
                <select
                  defaultValue={1}
                  onChange={(e: any) => {
                    changeCommentValue(parseInt(e.target.value));
                  }}>
                  <option value={1}>Si</option>
                  <option value={0}>No</option>
                </select>
              </InputContain>
              <InputContain>
                <label>
                  Comentario
                </label>
                {
                  loader ?
                    <textarea
                      placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing 
              elit. Tellus ultrices id feugiat cursus velit. Aliquam pulvinar 
              in orci malesuada."
                      defaultValue={review.comment}
                      onChange={(e: any) => {
                        setReview({ ...review, comment: e.target.value })
                      }}
                    />
                    : <div style={{ height: 108, border: "1px solid blue", borderRadius: 10 }} />
                }
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