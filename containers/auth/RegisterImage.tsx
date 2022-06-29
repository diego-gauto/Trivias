import React from 'react'
import {
  LoginBox,
  Title,
  Text2,
  Box1,
  TextInput,
  PurpleButton2,
  Background,
  AllButtons,
  ProfilePicture2,
  TransparentButton,
  Paragraph,
  InputPhone,
  ArchiveInput,
  Box2,
  FolderIcon
} from './Login.styled'
export const RegisterImage = () => {
  return (
    <Background>
      <LoginBox>
        <Title>
          Registrarse
        </Title>
        <ProfilePicture2 />
        <Paragraph>
          <Text2>
            Selecciona una imagen de pefil.
          </Text2>
          <Text2>
            Puedes hacer esto cuando quieras mas tarde.
          </Text2>
        </Paragraph>
        <Box2>
          <Text2>
            Selecciona tu imagen
          </Text2>
          <FolderIcon />
          <ArchiveInput
            placeholder="Seleccionar archivo"
          />
        </Box2>
        <AllButtons>
          <PurpleButton2>
            Crear Cuenta
          </PurpleButton2>
          <TransparentButton>
            Regresar
          </TransparentButton>
        </AllButtons>
      </LoginBox>
    </Background>
  )
}
