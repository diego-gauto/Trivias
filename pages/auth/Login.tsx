import React from 'react'
import NavBar from '../../components/NavBar/NavBar'
import {
  LoginBox,
  Title,
  Text2,
  Box1,
  TextInput,
  PurpleButton2,
  GoogleButton,
  FacebookButton,
  Background,
  AllButtons,
  Text3,
  LinkText,
  ProfilePicture,
  GoogleIcon,
  FacebookIcon,
  EyeIcon,
  Box2,
  PasswordBox,
  AnimatedBackground
} from './Login.styled'
const Login = () => {
  return (
    <Background>
      <LoginBox>
        <ProfilePicture />
        <Title>
          Iniciar Sesión
        </Title>
        <Box1>
          <Text2>
            Correo electrónico
          </Text2>
          <TextInput
            placeholder="correo@correo.com"
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
        <AllButtons>
          <PurpleButton2>
            Acceder
          </PurpleButton2>
          <GoogleButton>
            <GoogleIcon></GoogleIcon>
            Acceder con Google
          </GoogleButton>
          <FacebookButton>
            <FacebookIcon></FacebookIcon>
            Acceder con Facebook
          </FacebookButton>
        </AllButtons>
        <Text3>
          ¿Olvidaste tu contraseña? &nbsp;
          <LinkText>
            Clic aqui
          </LinkText>
        </Text3>
        <Text3>
          ¿Es tu primera vez con nosotros? &nbsp;
          <LinkText>
            Registrate
          </LinkText>
        </Text3>
      </LoginBox>

      <AnimatedBackground width="320" height="240" autoPlay muted loop >
        <source src="https://firebasestorage.googleapis.com/v0/b/marketing-gonvar.appspot.com/o/DevAssets%2FAnimatedColors.mp4?alt=media&token=94a7f4cc-9efb-4a74-be52-67674970e026" type="video/mp4"></source>
      </AnimatedBackground>

    </Background>

  )
}
export default Login;