import { doc, updateDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { Modal } from 'react-bootstrap';
import { db } from '../../../../firebase/firebaseConfig';
import { addReview, getUserScore } from '../../../../store/actions/UserActions';
import { ModContainer, Container, Title, DataContain, ItemContain, Text, Text2, InputContain, ButtonContain, SafeContained } from './ModalHW.styled';

const ModalHW = ({ show, setShow, data }: any) => {
  const [user, setUser] = useState<any>()
  const [userScore, setUserScore] = useState<number>(0)
  const [review, setReview] = useState<any>({})
  const handleClose = () => setShow(false);

  const createReview = () => {
    if (Object.keys(review).some(key => review[key] === '')) {
      alert("Complete todos los campos")
    }
    else {
      addReview(review).then((res) => {
      })
    }
  }
  const updateScore = async () => {

    const docRef = doc(db, 'users', user.id);
    await updateDoc(docRef, {
      score: userScore + review.score
    })
  }
  const updateStatus = async () => {

    const docRef = doc(db, 'homeworks', data.id);
    await updateDoc(docRef, {
      status: true
    })
  }
  const getUser = () => {
    getUserScore(data.userId).then((res) => {
      setUser(res[0])
      setUserScore(res[0].score)
    })
  }
  useEffect(() => {
    if (show == true) {
      getUser()
    }
  }, [show])

  useEffect(() => {
    if (data) {
      setReview({
        id: data.courseId,
        title: data.title,
        lesson: data.lesson,
        season: data.season,
        userEmail: data.userEmail,
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
                  {data.title}
                </Text2>
              </ItemContain>
              <ItemContain>
                <Text>
                  Temporada
                </Text>
                <Text2>
                  {data.season}
                </Text2>
              </ItemContain>
              <ItemContain>
                <Text>
                  Lección
                </Text>
                <Text2>
                  {data.lesson}
                </Text2>
              </ItemContain>
              <InputContain>
                <label>
                  Puntos
                </label>
                <input
                  defaultValue={0}
                  placeholder="0"
                  onChange={(e: any) => {
                    setReview({ ...review, score: parseInt(e.target.value) })
                  }}
                />
              </InputContain>
              <InputContain>
                <label>
                  Comentario
                </label>
                <textarea
                  placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing 
              elit. Tellus ultrices id feugiat cursus velit. Aliquam pulvinar 
              in orci malesuada."
                  onChange={(e: any) => {
                    setReview({ ...review, description: e.target.value })
                  }}
                />
              </InputContain>
              <ButtonContain>
                <button onClick={() => {
                  createReview(),
                    updateScore(),
                    updateStatus()
                }}>
                  Guardar
                </button>
              </ButtonContain>
            </DataContain>
          }
          {
            data.status == true &&
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
export default ModalHW;