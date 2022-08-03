import React, { useEffect, useState } from "react";

import { useForm, SubmitHandler } from "react-hook-form";

import Link from "next/link";
import * as yup from "yup";

import { yupResolver } from "@hookform/resolvers/yup";

import GradientCanvas from "../../components/GradientCanvas/GradientCanvas";
import {
  AllButtons,
  Background,
  Box1,
  Box2,
  EyeIcon,
  FacebookButton,
  FacebookIcon,
  GoogleButton,
  GoogleIcon,
  LinkText,
  LoaderContain,
  LoaderImage,
  LoginBox,
  PasswordBox,
  ProfilePicture,
  PurpleButton2,
  Text2,
  Text3,
  TextInput,
  TextInput_2,
  Title,
} from "../../screens/Login.styled";
import { accessWithAuthProvider, signInWithCreds } from "../../store/actions/AuthActions";
import ModalForgot from "./Modals/ModalForgot";

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

  const [isLoading, setIsLoading] = useState(false);

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
    setIsLoading(true)
    let signUpData = {
      credentials: {
        email: formData.email,
        password: formData.password,
      },
    };
    signInWithCreds(signUpData).then(() => {
      window.location.href = "/Preview";
    });
  }

  const [showForgot, setShowForgot] = useState(false);

  const handleSignUpWithAuthProvider = (authProvider: string) => {
    setIsLoading(true)
    accessWithAuthProvider(authProvider).then(() => {
      window.location.href = "/Preview";
    });
  };


  useEffect(() => { }, [isLoading]);

  return (

    <>
      {!isLoading ? (
        <Background>
          {
            showForgot == false &&
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
                <LinkText onClick={() => { setShowForgot(true) }} >
                  Clic aqui
                </LinkText>
              </Text3>
              <Text3>
                ¿Es tu primera vez con nosotros? &nbsp;
                <Link href="/auth/Register">
                  <LinkText>
                    Registrate
                  </LinkText>
                </Link>
              </Text3>
            </LoginBox>
          }

          <GradientCanvas id="gradient-canvas" increasedHeight />
          {
            showForgot == true &&
            <ModalForgot showForgot={showForgot} setShowForgot={setShowForgot} />
          }
        </Background >

      ) : (

        <Background>
          <LoaderImage>
            <LoaderContain />
          </LoaderImage>
        </Background>
      )}

    </>
  )
}
export default Login;