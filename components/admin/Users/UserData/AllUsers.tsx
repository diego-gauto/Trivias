import React, { useState } from 'react'
import Modal1 from './Modal/Modal';
import { CloseIcon, ColumnContain, Columns, CourseContain, Courses, FirstBox, Image1, Image2, Image3, Info, Label, LastContainer, Level, Pay1, Pay2, PayContain, ProfileContain, ProfilePic, Title, TitleBox, TitleContain, TransparentButton, UserContain } from './AllUsers.styled';

const AllUsers = ({ showUser, setShowUser }: any) => {


  const [show, setShow] = useState(false);

  return (
    <UserContain>
      <TitleContain>
        <FirstBox>
          <Title>Usuario Activo</Title>
        </FirstBox>
        <CloseIcon onClick={() => { setShowUser(false) }} />
      </TitleContain>
      <ProfileContain>
        <ProfilePic />
        <Level />
      </ProfileContain>
      <Columns>
        <ColumnContain>
          <Info>
            Usuario
            <Label>
              Mofupiyo
            </Label>
          </Info>
          <Info>
            Puntos
            <Label>
              1,100
            </Label>
          </Info>
          <Info>
            Suscripción Actual
            <Label>
              Gonvar Plus
            </Label>
          </Info>
        </ColumnContain>
        <ColumnContain>
          <Info>
            Correo electrónico
            <Label>
              mofu@mofu.com
            </Label>
          </Info>
          <Info>
            Fecha de Creación
            <Label>
              10/05/2022
            </Label>
          </Info>
          <Info>
            Teléfono
            <Label>
              5512345678
            </Label>
          </Info>
        </ColumnContain>
      </Columns>
      <Courses>
        <TitleBox>
          Cursos Activos
        </TitleBox>
        <CourseContain>
          <Image1 />
          <Image2 />
          <Image3 />
        </CourseContain>
        <TransparentButton onClick={() => { setShow(true) }}>Agregar Curso</TransparentButton>
      </Courses>
      <PayContain>
        <TitleBox>
          Métodos de pago asociados
        </TitleBox>
        <LastContainer>
          <Pay1 />
          <Pay2 />
        </LastContainer>
      </PayContain>
      <Modal1 show={show} setShow={setShow} />
    </UserContain>
  )
}
export default AllUsers;