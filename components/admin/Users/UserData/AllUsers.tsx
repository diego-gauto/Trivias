import React, { useEffect, useState } from "react";

import { doc, getDoc } from "firebase/firestore";

import { db } from "../../../../firebase/firebaseConfig";
import {
  CloseIcon,
  Columns,
  ColumnContain,
  Courses,
  CourseContain,
  FirstBox,
  Image1,
  Image2,
  Image3,
  Info,
  Label,
  LastContainer,
  Level,
  Pay1,
  Pay2,
  PayContain,
  ProfileContain,
  ProfilePic,
  Title,
  TitleBox,
  TitleContain,
  TransparentButton,
  UserContain,
} from "./AllUsers.styled";
import Modal1 from "./Modal/Modal";

const AllUsers = ({ users, setShowUser, userId }: any) => {
  const [show, setShow] = useState(false);
  const getSingleUser = async () => {
    const docRef = doc(db, 'users', 'AtDRdV1ZUXhDjMMxXVOy');
    try {
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        //setUsers(docSnap.data().name)
        console.log(docSnap.data().name);
      } else {
        console.log("Document does not exist")
      }

    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    getSingleUser();
  }, [])


  return (
    <UserContain>
      <TitleContain>
        <FirstBox>
          <Title>Usuario Activo</Title>
        </FirstBox>
        <CloseIcon onClick={() => { setShowUser(false) }} />
      </TitleContain>

      <><ProfileContain>
        <ProfilePic />
        <Level />
      </ProfileContain><Columns>
          <ColumnContain>
            <Info>
              Usuario
              <Label>
                {users}
              </Label>
            </Info>
            <Info>
              Puntos
              <Label>
                {users}
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
                {users}
              </Label>
            </Info>
            <Info>
              Fecha de Creación
              <Label>
                {/*new Date(users.created_at.seconds * 1000).toLocaleDateString("es-MX")*/}
              </Label>
            </Info>
            <Info>
              Teléfono
              <Label>
                5512345678
              </Label>
            </Info>
          </ColumnContain>
        </Columns><Courses>
          <TitleBox>
            Cursos Activos
          </TitleBox>
          <CourseContain>
            <Image1 />
            <Image2 />
            <Image3 />
          </CourseContain>
          <TransparentButton onClick={() => { setShow(true); }}>Agregar Curso</TransparentButton>
        </Courses><PayContain>
          <TitleBox>
            Métodos de pago asociados
          </TitleBox>
          <LastContainer>
            <Pay1 />
            <Pay2 />
          </LastContainer>
        </PayContain></>

      <Modal1 show={show} setShow={setShow} />
    </UserContain>
  )
}
export default AllUsers;