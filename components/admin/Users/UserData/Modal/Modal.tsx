import React from 'react'
import { Modal } from 'react-bootstrap';
import { CloseIcon } from '../UserInfo.styled';
import { ButtonContain, Card, CardContain, CardImage, CardSubTitle, CardTitle, CaretD, Container, Data, IconContain, ImageContain, Info, Input, InputContain, Label, LessonText, MainCard, PurpleButton, Select, Text1, Text2, Title, TitleContain } from './Modal.styled';

const Modal1 = ({ show, setShow }: any) => {

  const handleClose = () => setShow(false);
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
              Mofupiyo
            </Text2>
          </Info>
          <Info>
            <Text1>
              Correo electrónico
            </Text1>
            <Text2>
              mofu@mofu.com
            </Text2>
          </Info>
        </Data>
        <InputContain>
          <Label>Curso a añadir</Label>
          <IconContain>
            <Select>
              <option>Elegir curso</option>
            </Select>
            <CaretD />
          </IconContain>
        </InputContain>
        <MainCard>
          <Card>
            <ImageContain>
              <CardImage />
              <LessonText>Unica Lección</LessonText>
            </ImageContain>
            <CardContain>
              <CardTitle>Curso 1: Lorem Ipsum</CardTitle>
              <CardSubTitle>Subtítulo de categoría</CardSubTitle>
            </CardContain>
          </Card>
        </MainCard>

        <InputContain>
          <Label>Tiempo Activo (Días)</Label>
          <Input placeholder="Número de días activo" />
        </InputContain>
        <ButtonContain>
          <PurpleButton>Agregar Método</PurpleButton>
        </ButtonContain>
      </Container>
    </Modal>
  )
}
export default Modal1;