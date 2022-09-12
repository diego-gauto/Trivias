import {
  AllButtons,
  Background,
  EyeIcon,
  InputPhone,
  LineIcon,
  LinkText,
  LoaderContain,
  LoaderImage,
  PasswordBox,
  Text2,
  Text3,
  TextInput,
  TextInput_2,
  Title,
} from "../../screens/Login.styled";
import {
  RegisterPastUserBox,
  FormInput,
  RegisterButton
} from "../../screens/RegisterPastUser.styled";
import React, { useState } from 'react';
import "react-phone-number-input/style.css";
import { isValidPhoneNumber } from "react-phone-number-input";
import Link from "next/link";
import { useRouter } from "next/router";
import GradientCanvas from "../../components/GradientCanvas/GradientCanvas";
import { SIGNUP_PATH } from "../../constants/paths";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";
import { signUpWithCreds } from "../../store/actions/AuthActions";

const formSchema = yup.object().shape({
  name: yup
    .string()
    .min(6, "El nombre debe ser de al menos 6 caracteres")
    .required("Campo requerido"),
  password: yup
    .string()
    .required("Campo requerido")
    .min(6, "La contraseña debe tener al menos 6 carácteres"),
  confirmPassword: yup
    .string()
    .required("Campo requerido")
    .oneOf([yup.ref("password"), null], "La contraseña no coincide"),
});

type FormValues = {
  name: string;
  password: string;
  confirmPassword: string;
  email: string;
};

const RegisterPastUser = () => {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [phoneNumberError, setPhoneNumberError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormValues>({
    resolver: yupResolver(formSchema)
  });

  const onSubmit: SubmitHandler<FormValues> = async formData => {
    if (!isValidPhoneNumber(phoneNumber)) {
      setPhoneNumberError("El número no es válido")
      return;
    }
    setIsLoading(true)
    const signUpData = {
      credentials: {
        name: formData.name,
        email: localStorage.getItem("pastUserEmail"),
        password: formData.password,
        phoneInput: phoneNumber,
      },
    };
    const redirectURL = await signUpWithCreds(signUpData);
    router.push(redirectURL);
  }

  if (isLoading) {
    return (
      <Background>
        <LoaderImage>
          <LoaderContain />
        </LoaderImage>
      </Background>
    )
  }

  return (
    <Background>
      <RegisterPastUserBox>
        <form
          onSubmit={(e) => handleSubmit(onSubmit)(e)}
        >
          <Title>
            Es un gusto verte de nuevo
          </Title>
          <Text3 >
            Hemos detectado que ya estabas con nosotros desde antes de nuestro nuevo look.
            Configura algunos datos de tu vieja cuenta para entrar de nuevo.
          </Text3>
          <FormInput>
            <Text2>
              Nombre de Usuario
            </Text2>
            <TextInput
              type="text"
              placeholder="John Doe"
              className={`form-control ${errors.name && 'is-invalid'}`}
              {...register("name")}
            />
            <div className="invalid-feedback">
              {errors.name?.message}
            </div>
          </FormInput>
          <FormInput>
            <Text2>
              Contraseña
            </Text2>
            <PasswordBox>
              <div>
                <TextInput_2
                  type={showPassword ? "text" : "password"}
                  placeholder="Contraseña"
                  className={`form-control ${errors.password && 'is-invalid'}`}
                  {...register("password")}
                />
                <div
                  onMouseDown={() => setShowPassword(!showPassword)}
                  onMouseUp={() => setShowPassword(!showPassword)}
                >
                  <EyeIcon />
                </div>
              </div>
              <div className="invalid-feedback" style={{ display: "block" }}>
                {errors.password?.message}
              </div>
            </PasswordBox>
          </FormInput>
          <FormInput>
            <Text2>
              Confirmar Contraseña
            </Text2>
            <PasswordBox>
              <div>
                <TextInput_2
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirma la contraseña"
                  className={`form-control ${errors.confirmPassword && 'is-invalid'}`}
                  {...register("confirmPassword")}
                />
                <div
                  onMouseDown={() => setShowConfirmPassword(!showConfirmPassword)}
                  onMouseUp={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  <EyeIcon />
                </div>
              </div>
              <div className="invalid-feedback" style={{ display: "block" }}>
                {errors.confirmPassword?.message}
              </div>
            </PasswordBox>
          </FormInput>
          <FormInput>
            <Text2>
              Teléfono
            </Text2>
            <InputPhone
              onChange={(value: string) => setPhoneNumber(value)}
              limitMaxLength
              international
              defaultCountry="MX"
              id="input_1"
              className={`form-control ${phoneNumberError && 'is-invalid'}`}
            />
            <LineIcon />
            <div className="invalid-feedback" style={{ display: "block" }}>
              {phoneNumberError}
            </div>
          </FormInput>
          <AllButtons>
            <RegisterButton type="submit">
              Acceder
            </RegisterButton>
          </AllButtons>
        </form>
        <Text3 >
          ¿Es tu primera vez con nosotros? &nbsp;
          <Link href={SIGNUP_PATH}>
            <LinkText >
              Registrate
            </LinkText>
          </Link>
        </Text3>
      </RegisterPastUserBox>
      <GradientCanvas id="gradient-canvas" />
    </Background >
  )
}

export default RegisterPastUser;