import React from 'react'
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
} from '../Profile/Profile.styled'

export const Profile = () => {
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
              <DeleteText>
                Eliminar método
                <TrashIcon />
              </DeleteText>
            </PaymentBox>
            <PaymentBox>
              <PayBox>
                <PaypalIcon />
                <PaymentText>
                  Paypal Mofupiyo
                </PaymentText>
              </PayBox>
              <DeleteText>
                Eliminar método
                <TrashIcon />
              </DeleteText>
            </PaymentBox>
          </PayContainer>
          <AddPay>
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
              <SubscriptionButton>
                Cambiar Suscripción
              </SubscriptionButton>
              <SaveButton>
                Guardar
              </SaveButton>
            </EditButtons>
          </ProfileData>
        </ThirdBox>
      </SecondBox>
    </BackgroundProfile>
  )
}
