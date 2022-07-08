import React, { useState } from 'react'
import Modal1 from './Modal1/Modal1';
import Modal2 from './Modal2/Modal2';
import {
  AddPay,
  ArrowRight,
  BackgroundProfile,
  Currentlvl,
  DeleteText,
  LabelText,
  LogOut,
  LogOutIcon,
  PayBox,
  PayContainer,
  PaymentBox,
  PaymentText,
  PaymentTitle,
  PaypalIcon,
  Pointbox,
  ProfileContainer,
  ProfileData,
  ProfileIcon,
  ProfileIconContain,
  ProfilePayment,
  RewardBox,
  RewardTitle,
  SecondBox,
  ThirdBox,
  TrashIcon,
  UserContainer,
  UserInfo,
  VectorLeft,
  VectorRight,
  VisaIcon,
  Nextlvl,
  CompleteBar,
  ProgressBar1,
  UserPoints,
  PolygonDown,
  PointsBox,
  DataTitle,
  RewardData,
  RewardImage,
  RewardInfo,
  RewardTitleBox,
  RewardPoints,
  RewardParagraph,
  AllEditInputs,
  Inputs,
  EditText,
  EditInput,
  EditButtons,
  SaveButton,
  SubscriptionButton,
  DeleteContain,
} from '../../Profile/User/User.styled'


const User = () => {

  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);

  const [show2, setShow2] = useState(false);
  const handleShow2 = () => setShow2(true);

  return (
    <BackgroundProfile>
      {/* FIRST BOX */}
      <ProfileContainer>
        <ProfileIconContain>
          <ProfileIcon />
        </ProfileIconContain>
        <UserContainer>
          <LabelText>
            Usuario
          </LabelText>
          <UserInfo>
            Mofupiyo
          </UserInfo>
        </UserContainer>
        <UserContainer>
          <LabelText>
            Correo electrónico
          </LabelText>
          <UserInfo>
            mofu@mofu.com
          </UserInfo>
        </UserContainer>
        <UserContainer>
          <LabelText>
            Puntos
          </LabelText>
          <UserInfo>
            1,100
          </UserInfo>
        </UserContainer>
        <UserContainer>
          <LabelText>
            Suscripción Actual
          </LabelText>
          <UserInfo>
            Gonvar Plus
          </UserInfo>
        </UserContainer>
        <LogOut>
          Cerrar Sesión
          <LogOutIcon />
        </LogOut>
      </ProfileContainer>
      {/* SECOND BOX */}
      <SecondBox>
        <ProfilePayment>
          <PaymentTitle>
            Métodos de Pago
          </PaymentTitle>
          <PayContainer>
            <PaymentBox>
              <PayBox>
                <VisaIcon />
                <PaymentText>
                  Visa terminada en 1486
                </PaymentText>
              </PayBox>
              <DeleteContain>
                <DeleteText>
                  Eliminar método
                </DeleteText>
                <TrashIcon />
              </DeleteContain>
            </PaymentBox>
            <PaymentBox>
              <PayBox>
                <PaypalIcon />
                <PaymentText>
                  Paypal Mofupiyo
                </PaymentText>
              </PayBox>
              <DeleteContain>
                <DeleteText>
                  Eliminar método
                </DeleteText>
                <TrashIcon />
              </DeleteContain>
            </PaymentBox>
          </PayContainer>
          <AddPay onClick={handleShow}>
            Añadir método de pago
          </AddPay>
        </ProfilePayment>
        <ThirdBox>
          {/* THIRD BOX */}
          <ProfileData>
            <DataTitle>
              Siguiente Recompensa...
            </DataTitle>
            <RewardBox>
              <VectorLeft />
              <RewardTitle>
                Recompensas por puntuaje
              </RewardTitle>
              <VectorRight />
            </RewardBox>
            <Pointbox>
              <Currentlvl>
                4
              </Currentlvl>
              <CompleteBar>
                <ProgressBar1>
                  <PointsBox>
                    <UserPoints>
                      1,100
                      <PolygonDown />
                    </UserPoints>
                  </PointsBox>
                </ProgressBar1>
              </CompleteBar>
              <Nextlvl>
                5
              </Nextlvl>
            </Pointbox>
            <RewardData>
              <RewardImage />
              <RewardInfo>
                <RewardTitleBox>
                  2 Monómeros Gonval
                </RewardTitleBox>
                <RewardPoints>
                  1,500 puntos
                </RewardPoints>
                <RewardParagraph>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tellus ultrices id feugiat cursus velit. Aliquam pulvinar in orci malesuada.
                </RewardParagraph>
              </RewardInfo>
            </RewardData>
            <AddPay>
              Ir al Centro de Recompensas
              <ArrowRight />
            </AddPay>
          </ProfileData>
          {/* FOURTH BOX */}
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
              <SubscriptionButton onClick={handleShow2}>
                Cambiar Suscripción
              </SubscriptionButton>
              <SaveButton>
                Guardar
              </SaveButton>
            </EditButtons>
          </ProfileData>
        </ThirdBox>
      </SecondBox>
      <Modal1 show={show} setShow={setShow} />
      <Modal2 show={show2} setShow={setShow2} />
    </BackgroundProfile>
  )
}
export default User;