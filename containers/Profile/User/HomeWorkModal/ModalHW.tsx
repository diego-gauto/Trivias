import React, { useState } from 'react'
import { Modal } from 'react-bootstrap';
import { addReview } from '../../../../store/actions/UserActions';
import { ModContainer, Container, Title, DataContain, ItemContain, Text, Text2, InputContain, ButtonContain } from './ModalHW.styled';

const ModalHW = ({ show, setShow, data }: any) => {
  const handleClose = () => setShow(false);
  console.log(data);
  const [review, setReview] = useState<any>({
    id: data.id,
    title: data.title,
    lesson: data.lesson,
    season: data.season,
    userEmail: data.userEmail,
    description: "",
    score: ""
  })

  const createReview = () => {
    if (Object.keys(review).some(key => review[key] === '')) {
      alert("Complete todos los campos")
    }
    else {
      addReview(review).then((res) => {
        console.log(res)
      })
    }
  }
  return (
    <ModContainer>
      <Modal show={show} onHide={handleClose} centered>
        <Container>
          <Title closeButton>
            Revisión de tarea
          </Title>
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
              <button onClick={() => { createReview() }}>
                Guardar
              </button>
            </ButtonContain>
          </DataContain>
        </Container>
      </Modal>
    </ModContainer>
  )
}
export default ModalHW;