import React, { useState } from 'react'
import NavBar from '../../components/NavBar/NavBar';
import {
  LoginBox,
  Title,
  Text2,
  Box1,
  TextInput,
  PurpleButton2,
  Background,
  AllButtons,
  Text3,
  LinkText,
  EyeIcon,
  InputPhone,
  LineIcon,
  PhoneSelect,
  Box2,
  PasswordBox,
  AnimatedBackground
} from '../../auth/Login.styled'
const Register = () => {

  return (
    <Background>
      <LoginBox>
        <Title>
          Registrarse
        </Title>
        <Box1>
          <Text2>
            Correo electrónico
          </Text2>
          <TextInput
            placeholder="correo@correo.com"
          />
        </Box1>
        <Box1>
          <Text2>
            Nombre de Usuario
          </Text2>
          <TextInput
            placeholder="John Doe"
          />
        </Box1>
        <Box2>
          <Text2>
            Contraseña
          </Text2>
          <PasswordBox>
            <TextInput
              placeholder="Contraseña"
            />
            <EyeIcon />
          </PasswordBox>
        </Box2>
        <Box2>
          <Text2>
            Confirmar Contraseña
          </Text2>
          <PasswordBox>
            <TextInput
              placeholder="Contraseña"
            />
            <EyeIcon />
          </PasswordBox>
        </Box2>
        <Box2>
          <Text2>
            Telefono
          </Text2>
          <PhoneSelect>
            <option>
              +52
            </option>
            <option>
              +1
            </option>
          </PhoneSelect>
          <LineIcon />
          <InputPhone
            placeholder="1234567890"
          />
        </Box2>
        <AllButtons>
          <PurpleButton2>
            Crear Cuenta
          </PurpleButton2>
        </AllButtons>
        <Text3>
          ¿Ya eres parte? &nbsp;
          <LinkText>
            Iniciar Sesion
          </LinkText>
        </Text3>
      </LoginBox>
      <AnimatedBackground width="320" height="240" autoPlay muted loop >
        <source src="https://firebasestorage.googleapis.com/v0/b/marketing-gonvar.appspot.com/o/DevAssets%2FAnimatedColors.mp4?alt=media&token=94a7f4cc-9efb-4a74-be52-67674970e026" type="video/mp4"></source>
      </AnimatedBackground>
    </Background>
  )
}
export default Register;