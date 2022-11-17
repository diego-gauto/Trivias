import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

import Link from "next/link";
import * as yup from "yup";

import { yupResolver } from "@hookform/resolvers/yup";

import GradientCanvas from "../../components/GradientCanvas/GradientCanvas";
import {
  AllButtons,
  Background,
  Error,
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
  LoginBackground,
} from "../../screens/Login.styled";
import { accessWithAuthProvider, signInWithCreds } from "../../store/actions/AuthActions";
import ModalForgot from "./Modals/ModalForgot";
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useAuth } from "../../hooks/useAuth";

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
  const [isLoading, setIsLoading] = useState(true);
  const [loginLoader, setLoginLoader] = useState(false);
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [passwordShown_1, setPasswordShown_1] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const togglePassword_1 = () => {
    setPasswordShown_1(!passwordShown_1);
  };
  try {
    var userDataAuth = useAuth();
    useEffect(() => {
      if (userDataAuth.user !== null) {
        setLoggedIn(true)
      } else {
        setLoggedIn(false)
      }
    }, [])

  } catch (error) {
    setLoggedIn(false)
  }
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormValues>({
    resolver: yupResolver(formSchema)
  });

  const onSubmit: SubmitHandler<FormValues> = async formData => {
    setIsLoading(true)
    let signUpData = {
      credentials: {
        email: formData.email,
        password: formData.password,
      },
    };
    const redirectURL = await signInWithCreds(signUpData);
    if (redirectURL == 'auth/user-not-found') {
      setErrorMsg('El usuario ingresado no existe o ha sido eliminado');
      setError(true);
      setIsLoading(false);
    }
    if (redirectURL == 'auth/wrong-password') {
      setErrorMsg('El correo o la contraseña es incorrecta!');
      setError(true);
      setIsLoading(false);
    }
    if (redirectURL == "auth/email-already-exists") {
      setErrorMsg('El correo ingresado ya existe!');
      setError(true);
      setIsLoading(false);
    }
    if (redirectURL == "/Preview") {
      window.location.href = redirectURL;
    }
    if (redirectURL == "/auth/RegisterPastUser") {
      window.location.href = redirectURL;
    }
  }
  console.log(isLoading)
  const [showForgot, setShowForgot] = useState(false);

  const handleSignUpWithAuthProvider = async (authProvider: string) => {
    let trial = false;
    setIsLoading(true)
    const redirectURL = await accessWithAuthProvider(authProvider, trial);
    window.location.href = redirectURL;
  };


  useEffect(() => {
    if (loggedIn) {
      setIsLoading(true)
      window.location.href = "/Preview";
    }
    console.log('hola')
    setTimeout(() => {
      setLoginLoader(true)
    }, 500);

  }, [isLoading])

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false)
    }, 200);
  }, [])


  return (

    <>
      {!isLoading ? (
        <LoginBackground>
          <div className="left-side">
            <img className="imgUpperHand" src="../images/mano2.png" alt="" />
            <p>¡Es un placer <br />
              <span>tenerte de<br /> vuelta!</span>
            </p>
            <img className="imgBottomHand" src="../images/mano1.png" alt="" />
          </div>
          {
            (showForgot == false && loginLoader) ?
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
                        <div style={{ 'cursor': 'pointer' }}
                          onClick={togglePassword_1}
                        >{passwordShown_1 ? <FaEye ></FaEye> : <FaEyeSlash></FaEyeSlash>}</div>
                      </div>
                      <div className="invalid-feedback">
                        {errors.password?.message}
                      </div>

                    </PasswordBox>

                  </Box2>
                  {error && <Error>
                    {errorMsg}
                  </Error>}
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
              :
              <LoaderImage>
                <LoaderContain />
              </LoaderImage>
          }

          {/* <GradientCanvas id="gradient-canvas" increasedHeight /> */}
          {
            showForgot == true &&
            <ModalForgot showForgot={showForgot} setShowForgot={setShowForgot} />
          }
        </LoginBackground >

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