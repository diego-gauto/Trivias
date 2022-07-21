import React, { useState, useRef } from 'react'
import * as yup from "yup";
import { useForm, SubmitHandler } from "react-hook-form"; 
import GradientCanvas from '../../components/GradientCanvas/GradientCanvas';
import NavBar from '../../components/NavBar/NavBar';
import Error from "./Error";
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
} from '../../screens/Login.styled'

import {
  signUpWithCreds
} from "../../store/actions/AuthActions"

const schema = yup.object().shape({
  name: yup
    .string()
    .min(6, "El nombre debe ser de al menos 6 caracteres")
    .required("Campo requerido"),
  email: yup
    .string()
    .email("Debe ser un email válido")
    .required("Campo requerido"),
  password: yup
    .string()
    .min(6, "La contraseña debe ser de al menos 6 caracteres"),
});

type FormValues = {
  name: string;
  email: string;
  password: string;
};

const Register = () => {



  const { register, handleSubmit } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = formData => {
    console.log(formData)
    let signUpData = {
      credentials: {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      },
    };
    console.log(signUpData)
    signUpWithCreds(signUpData);
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
            <input

              type="text"
              placeholder="correo@correo.com"

              {...register("email")}
            />

          </Box1>
          <Box1>
            <Text2>
              Nombre de Usuario
            </Text2>
            <input

              type="text"
              placeholder="John Doe"

              {...register("name")}
            ></input>

          </Box1>
          <Box2>
            <Text2>
              Contraseña
            </Text2>
            <PasswordBox>

              <input

                type={"password"}
                placeholder="Contraseña"


                {...register("password")}
              />

              <EyeIcon />
            </PasswordBox>
          </Box2>
          <Box2>
            <Text2>
              Confirmar Contraseña
            </Text2>
            <PasswordBox>
              <TextInput type={"password"}
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
            <PurpleButton2 type='submit'>
              Crear Cuenta
            </PurpleButton2>
          </AllButtons>
          <Text3>
            ¿Ya eres parte? &nbsp;
            <LinkText>
              Iniciar Sesion
            </LinkText>
          </Text3>
        </form>
      </LoginBox>
      <GradientCanvas id="gradient-canvas" />
    </Background>
  )
}
export default Register;