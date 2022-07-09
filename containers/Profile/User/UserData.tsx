import React, { useState } from 'react'
import Modal2 from './Modal2/Modal2';
import { ProfileData, DataTitle, AllEditInputs, Inputs, EditText, EditInput, EditButtons, SubscriptionButton, SaveButton } from './User.styled';

const UserData = () => {
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  return (
    <ProfileData>
      <DataTitle>
        Datos de la Cuenta
      </DataTitle>
      <AllEditInputs>
        <Inputs>
          <EditText>
            Nombre de Usuario
          </EditText>
          <EditInput placeholder="Mofupiyo" />
        </Inputs>
        <Inputs>
          <EditText>
            Telefono
          </EditText>
          <EditInput placeholder="5512345678" />
        </Inputs>
        <Inputs>
          <EditText>
            País
          </EditText>
          <EditInput placeholder="Seleccionar país" />
        </Inputs>
        <Inputs>
          <EditText>
            Contraseña
          </EditText>
          <EditInput placeholder="************" />
        </Inputs>
      </AllEditInputs>
      <EditButtons>
        <SubscriptionButton onClick={handleShow}>
          Cambiar Suscripción
        </SubscriptionButton>
        <SaveButton>
          Guardar
        </SaveButton>
      </EditButtons>
      <Modal2 show={show} setShow={setShow} />
    </ProfileData>
  )
}
export default UserData;