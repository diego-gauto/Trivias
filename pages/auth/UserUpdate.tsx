import {
  AllButtons,
  Background,
  Box1,
  Box2,
  EyeIcon,
  InputContainer,
  InputPhone,
  LineIcon,
  LinkText,
  LoginBox2,
  Paragraph,
  PasswordBox,
  PurpleButton2,
  Text2,
  Text3,
  TextInput,
  Title,
} from "../../screens/Login.styled";

export const UserUpdate = () => {
  return (
    <Background>
      <LoginBox2>
        <Title>
          Es un gusto verte de nuevo
        </Title>
        <Paragraph>
          <Text2>
            Hemos detectado que ya estabas con nosotros desde antes de nuestro nuevo look
          </Text2>
          <Text2>
            Configura algunos datos de tu vieja cuenta para entrar de nuevo
          </Text2>
        </Paragraph>
        <InputContainer>
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

            <LineIcon />
            <InputPhone
              placeholder="1234567890"
            />
          </Box2>
        </InputContainer>
        <AllButtons>
          <PurpleButton2>
            Acceder
          </PurpleButton2>
        </AllButtons>
        <Text3>
          ¿Es tu primera vez con nosotros? &nbsp;
          <LinkText>
            Registrate
          </LinkText>
        </Text3>
      </LoginBox2>
    </Background>
  )
}

export default UserUpdate;