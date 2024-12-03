import React, { useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import {
  ModContainer,
  Container,
  Title,
  DataContain,
  ItemContain,
  Text,
  Text2,
  InputContain,
  ButtonContain,
  SafeContained,
} from './HomeWorkModal.styled';
// import { SendSingleEmail } from '../../../../store/actions/EmailActions';
import { reviewHomeworkApi } from '../../../api/homeworks';
import { createNotification } from '../../../api/notifications';
import styles from '../HomeWorkNew.module.css';

interface IHomework {
  id: number,
  userId: number,
  userName: string,
  lessonId: number,
  lessonPoints: number,
  courseId: number,
  seasonNumber: number,
  seasonTitle: string,
  lessonNumber: number,
  lessonTitle: string,
  courseTitle: string,
  status: 0 | 1
}

interface IReview {
  score: number,
  status: 1 | 0,
  approved: 1 | 0,
  comment: string
}

interface IAssignmentModal {
  show: boolean;
  setShow: (show: boolean) => void;
  homework: IHomework | undefined;
  handleClick: (approved: boolean) => void;
}

const SUCCESS_MESSAGE = 'Felicidades. Buen trabajo!!! Has aprobado tu tarea. Te invitamos a seguir con la próxima lección.';
const FAIL_MESSAGE = 'Lamentablemente tu tarea no cuenta con las pautas para ser aprobada. Te invitamos a que la hagas nuevamente y la vuelvas a entregar.'

const initialReviewValue: IReview = {
  score: 0,
  approved: 0,
  comment: FAIL_MESSAGE,
  status: 0
};

const HomeWorkModal = (props: IAssignmentModal) => {
  const { show, setShow, homework, handleClick } = props;
  const [review, setReview] = useState<IReview>(initialReviewValue);
  const [isLoading, setIsLoading] = useState(false);
  const handleClose = () => {
    setShow(false);
    setTimeout(() => {
      setReview(initialReviewValue);
    }, 100);
  };

  const changeApproved = (approved: 1 | 0) => {
    setReview({
      ...review,
      approved,
      comment: approved === 1 ? SUCCESS_MESSAGE : FAIL_MESSAGE,
    });
  }

  const updateHomework = async () => {
    if (homework !== undefined) {
      let retroJson = {
        ...review,
        status: 1,
        id: homework.id,
        user_id: homework.userId,
        lessonId: homework.lessonId,
        score: homework.lessonPoints,
        courseId: homework.courseId,
        season: homework.seasonNumber - 1,
        lesson: homework.lessonNumber - 1,
        title: homework.courseTitle,
      };
      let notification = {
        userId: homework.userId,
        type: review.approved === 1 ? '1' : '2',
        notificationId: '',
        courseId: homework.courseId,
        season: homework.seasonNumber - 1,
        lesson: homework.lessonNumber - 1,
        title: homework.courseTitle,
        score: review.approved === 1 ? homework.lessonPoints : 0,
        retroalimentacion: review.comment,
      };
      setIsLoading(true);
      try {
        await createNotification(notification);
        await reviewHomeworkApi(retroJson);
        setReview(initialReviewValue);
        handleClick(review.approved ? true : false);
      } catch (error) {
        console.error(error);
      }
      setIsLoading(false);
    }
  }

  return (
    <ModContainer>
      <Modal show={show} onHide={handleClose} centered>
        {
          !isLoading &&
          <Container>
            <Title closeButton>Revisión de tarea</Title>
            {homework !== undefined && homework.status == 0 && (
              <DataContain>
                <ItemContain>
                  <Text>Alumno</Text>
                  <Text2>{homework.userName}</Text2>
                </ItemContain>
                <ItemContain>
                  <Text>Curso</Text>
                  <Text2>{homework.courseTitle}</Text2>
                </ItemContain>
                <ItemContain>
                  <Text>Módulo</Text>
                  <Text2>{homework.seasonTitle}</Text2>
                </ItemContain>
                <ItemContain>
                  <Text>Lección</Text>
                  <Text2>{homework.lessonTitle}</Text2>
                </ItemContain>
                <ItemContain>
                  <Text>Puntos</Text>
                  <Text2>{homework.lessonPoints}</Text2>
                </ItemContain>
                <InputContain>
                  <label>Tarea Aprobada</label>
                  <select
                    onChange={(e) => {
                      changeApproved(parseInt(e.target.value) as any);
                    }}
                    value={`${review.approved}`}
                  >
                    <option value='1'>Si</option>
                    <option value='0'>No</option>
                  </select>
                </InputContain>
                <InputContain>
                  <label>Comentario</label>
                  <textarea
                    placeholder='Escriba su comentario respecto a la tarea.'
                    onChange={(e) => {
                      setReview({ ...review, comment: e.target.value });
                    }}
                    value={review.comment}
                  />
                </InputContain>
                <ButtonContain>
                  <button
                    onClick={() => {
                      updateHomework();
                    }}
                  >
                    Enviar
                  </button>
                </ButtonContain>
              </DataContain>
            )}
          </Container>
        }
        {
          isLoading &&
          <div className={styles['background-loader']}>
            <div className={styles['loader-image']}>
              <div className={styles['loader-contain']}></div>
            </div>
          </div>
        }
      </Modal>
    </ModContainer>
  );
};
export default HomeWorkModal;
