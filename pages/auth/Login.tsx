import React, { useState, useRef, ChangeEvent, useEffect } from 'react'
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useForm, SubmitHandler } from "react-hook-form";
import GradientCanvas from '../../components/GradientCanvas/GradientCanvas'
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
  AnimatedBackground,
  TextInput_2
} from '../../screens/Login.styled'


import {
  signInWithCreds,
  accessWithAuthProvider
} from "../../store/actions/AuthActions"

const formSchema = yup.object().shape({
  email: yup
    .string()
    .email("Debe ser un email válido")
    .required("Campo requerido"),
  password: yup.string()
    .required('Password is required')
    .min(6, 'La contraseña debe tener al menos 6 carácteres'),
});

type FormValues = {
  email: string;
  password: string;
};

const Login = () => {

  const [passwordShown_1, setPasswordShown_1] = useState(false);
  const togglePassword_1 = () => {
    setPasswordShown_1(!passwordShown_1);
  };

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<FormValues>({
    resolver: yupResolver(formSchema)
  });

  const onSubmit: SubmitHandler<FormValues> = formData => {
    let signUpData = {
      credentials: {
        email: formData.email,
        password: formData.password,
      },
    };
    signInWithCreds(signUpData).then(() => {
      window.location.href = "/Screens/Landings";
    });
  }


  const handleSignUpWithAuthProvider = (authProvider: string) => {

    accessWithAuthProvider(authProvider).then(() => {
      window.location.href = "/Screens/Landings";
    });
  };

  return (
    <Background>

      <LoginBox>
        <form
          onSubmit={handleSubmit(onSubmit)}
        >
          <ProfilePicture />
          <Title>
            Iniciar Sesión
          </Title>
          <Box1>
            <Text2>
              Correo electrónico
            </Text2>
            <TextInput
              type="text"
              placeholder="correo@correo.com"
              className={`form-control ${errors.email ? 'is-invalid' : ''}`}
              {...register("email")}
            />
            <div className="invalid-feedback">
              {errors.email?.message}
            </div>

          </Box1>
          <Box2>
            <Text2>
              Contraseña
            </Text2>
            <PasswordBox>

              <div>
                <TextInput_2
                  type={passwordShown_1 ? "text" : "password"}
                  placeholder="Contraseña"
                  className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                  {...register("password")}
                />

                <div
                  onMouseDown={togglePassword_1}
                  onMouseUp={togglePassword_1}
                ><EyeIcon ></EyeIcon></div>
              </div>
              <div className="invalid-feedback">
                {errors.password?.message}
              </div>

            </PasswordBox>

          </Box2>

          <AllButtons>
            <PurpleButton2 type='submit'>
              Acceder
            </PurpleButton2>
          </AllButtons>

        </form>

        <AllButtons>

          <GoogleButton onClick={() => {
            handleSignUpWithAuthProvider("Google");
          }}
          >
            <GoogleIcon></GoogleIcon>
            Acceder con Google
          </GoogleButton>
          <FacebookButton
            onClick={() => {
              handleSignUpWithAuthProvider("Facebook");
            }}
          >
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
      <GradientCanvas id="gradient-canvas" increasedHeight />
    </Background >

  )
}
export default Login;