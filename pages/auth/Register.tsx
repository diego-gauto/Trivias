import React, { useState, useRef, ChangeEvent, useEffect } from 'react'
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useForm, SubmitHandler } from "react-hook-form";
import GradientCanvas from '../../components/GradientCanvas/GradientCanvas';
import 'react-phone-number-input/style.css'
import PhoneInput, {
} from "react-phone-number-input";

import "bootstrap/dist/css/bootstrap.min.css";
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

  GoogleIcon,
  FacebookIcon,
  GoogleButton,
  FacebookButton,
  LineIcon,
  PhoneSelect,
  Box2,
  PasswordBox,
  TextInput_2
} from '../../screens/Login.styled'

import {
  signUpWithCreds,

  accessWithAuthProvider
} from "../../store/actions/AuthActions"

const formSchema = yup.object().shape({
  name: yup
    .string()
    .min(6, "El nombre debe ser de al menos 6 caracteres")
    .required("Campo requerido"),
  email: yup
    .string()
    .email("Debe ser un email válido")
    .required("Campo requerido"),
  password: yup.string()
    .required('Password is required')
    .min(6, 'La contraseña debe tener al menos 6 carácteres'),
  confirmPassword: yup.string()
    .required('Confirm Password is required')
    .oneOf([yup.ref('password'), null], 'La contraseña no coincide'),
});

type FormValues = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const Register = () => {

  const [passwordShown_1, setPasswordShown_1] = useState(false);
  const [passwordShown_2, setPasswordShown_2] = useState(false);

  const [phoneInput, setPhoneInput] = useState();


  const togglePassword_1 = () => {
    setPasswordShown_1(!passwordShown_1);
  };

  const togglePassword_2 = () => {
    setPasswordShown_2(!passwordShown_2);
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


  const handleSignUpWithAuthProvider = (authProvider: string) => {

    accessWithAuthProvider(authProvider).then(() => {
      window.location.href = "/Screens/Landings";
    });
  };


  const onSubmit: SubmitHandler<FormValues> = formData => {

    var value = (document.getElementById("input_1") as HTMLInputElement).value;
    var phoneInputValidation = ""
    if (value !== undefined && value !== null) {
      phoneInputValidation = value
    }

    let signUpData = {
      credentials: {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        phoneInput: phoneInputValidation,
      },
    };
    signUpWithCreds(signUpData).then(() => {
      window.location.href = "/Screens/Landings";
    });
  }




  return (
    <Background>
      <LoginBox>
        <form
          onSubmit={handleSubmit(onSubmit)}
        >
          <Title>
            Registrarse
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
          <br />
          <Box1>
            <Text2>
              Nombre de Usuario
            </Text2>
            <TextInput
              type="text"
              placeholder="John Doe"
              className={`form-control ${errors.name ? 'is-invalid' : ''}`}
              {...register("name")}
            ></TextInput>
            <div className="invalid-feedback">
              {errors.name?.message}
            </div>

          </Box1>
          <br />
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
          <br />
          <Box2>
            <Text2>
              Confirmar Contraseña
            </Text2>
            <PasswordBox>
              <div>
                <TextInput_2
                  type={passwordShown_2 ? "text" : "password"}
                  placeholder="Confirma la contraseña"
                  className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''}`}
                  {...register("confirmPassword")}
                />
                <div
                  onMouseDown={togglePassword_2}
                  onMouseUp={togglePassword_2}
                ><EyeIcon ></EyeIcon></div>
              </div>

              <div className="invalid-feedback">
                {errors.confirmPassword?.message}
              </div>
            </PasswordBox>
          </Box2>
          <br />
          <Box2>
            <Text2>
              Teléfono
            </Text2>
            <PhoneInput
              onCountryChange={() => setPhoneInput}
              onChange={() => setPhoneInput}
              limitMaxLength={true}
              international={true}
              defaultCountry="MX"
              id="input_1"
            />

          </Box2>
          <br />
          <AllButtons>
            <PurpleButton2 type='submit'>
              Crear Cuenta
            </PurpleButton2>
          </AllButtons>
          <br />
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

          <br />
          <Text3>
            ¿Ya eres parte? &nbsp;
            <LinkText>
              Iniciar Sesion
            </LinkText>
          </Text3>
        </form>
      </LoginBox>
      <GradientCanvas id="gradient-canvas" />
    </Background >
  )
}
export default Register;