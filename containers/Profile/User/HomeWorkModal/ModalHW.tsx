import { doc, updateDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import { db } from '../../../../firebase/firebaseConfig';
import { IHomeWorkModal } from '../../../../interfaces/IHomeWorks';
import {
  getWholeCourse,
  updateProgressStatus,
} from '../../../../store/actions/courseActions';
import { addReview, getUserScore } from '../../../../store/actions/UserActions';
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
} from './ModalHW.styled';

interface props {
  show: boolean;
  setShow: any;
  data: IHomeWorkModal;
  user: any;
  handleClick: any;
}

const ModalHW = ({ show, setShow, data, user, handleClick }: props) => {
  const [userScore, setUserScore] = useState<number>(0);
  const [value, setValue] = useState<number>(0);
  const [review, setReview] = useState<any>({ score: 0 });
  const handleClose = () => setShow(false);

  const createReview = () => {
    addReview(review).then((res) => {});
  };
  const updateStatus = async () => {
    let tempAproved = review.aproved;
    if (value == 1) {
      tempAproved = true;
    }
    if (tempAproved) {
      const docRef = doc(db, 'users', data.userId);
      await updateDoc(docRef, {
        score: userScore + review.score,
      });
      getWholeCourse(data.courseId).then((res) => {
        let tempIndex = res.seasons[data.season].lessons[
          data.lesson
        ].progress.findIndex((x: any) => x.id == data.userId);
        res.seasons[data.season].lessons[data.lesson].progress[
          tempIndex
        ].status = true;
        updateProgressStatus(
          res.seasons[data.season].lessons[data.lesson].progress,
          data.courseId,
          res.seasons[data.season].id,
          data.lessonId,
        );
      });
    }
    const docRef = doc(db, 'homeworks', data.id);
    await updateDoc(docRef, {
      status: true,
      aproved: tempAproved,
    });
    handleClick();
    setValue(0);
  };
  const getUser = () => {
    getUserScore(data.userId).then((res: any) => {
      setUserScore(res[0].score);
    });
  };
  useEffect(() => {
    if (show == true) {
      getUser();
    }
  }, [show]);

  useEffect(() => {
    if (data) {
      setReview({
        score: 0,
        id: data.courseId,
        title: data.title,
        lesson: data.lesson,
        season: data.season,
        userEmail: data.userEmail,
        aproved: data.aproved,
      });
    }
  }, [data]);

  return (
    <ModContainer>
      <Modal show={show} onHide={handleClose} centered>
        <Container>
          <Title closeButton>Revisión de tarea</Title>
          {data.status == false && (
            <DataContain>
              <ItemContain>
                <Text>Alumno</Text>
                <Text2>{data.userName}</Text2>
              </ItemContain>
              <ItemContain>
                <Text>Curso</Text>
                <Text2>{data.title}</Text2>
              </ItemContain>
              <ItemContain>
                <Text>Temporada</Text>
                <Text2>{data.season + 1}</Text2>
              </ItemContain>
              <ItemContain>
                <Text>Lección</Text>
                <Text2>{data.lesson + 1}</Text2>
              </ItemContain>
              <InputContain>
                <label>Puntos</label>
                <input
                  defaultValue={review.score}
                  placeholder='0'
                  onChange={(e: any) => {
                    setReview({ ...review, score: parseInt(e.target.value) });
                  }}
                />
              </InputContain>
              {user.role == 'admin' && (
                <InputContain>
                  <label>Tarea Aprobada</label>
                  <select
                    defaultValue={0}
                    onChange={(e: any) => {
                      setValue(e.target.value);
                    }}
                  >
                    <option value={1}>Si</option>
                    <option value={0}>No</option>
                  </select>
                </InputContain>
              )}
              <InputContain>
                <label>Comentario</label>
                <textarea
                  placeholder='Lorem ipsum dolor sit amet, consectetur adipiscing 
              elit. Tellus ultrices id feugiat cursus velit. Aliquam pulvinar 
              in orci malesuada.'
                  defaultValue={data.about}
                  onChange={(e: any) => {
                    setReview({ ...review, description: e.target.value });
                  }}
                />
              </InputContain>
              {user.role == 'admin' && (
                <ButtonContain>
                  <button
                    onClick={() => {
                      createReview(), updateStatus();
                    }}
                  >
                    Guardar
                  </button>
                </ButtonContain>
              )}
            </DataContain>
          )}
          {data.status == true && (
            <DataContain>
              <SafeContained>
                <p> Tarea Revisada</p>
                <button onClick={handleClose}>Salir</button>
              </SafeContained>
            </DataContain>
          )}
        </Container>
      </Modal>
    </ModContainer>
  );
};
export default ModalHW;
