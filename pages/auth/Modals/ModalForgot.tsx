import { useState } from "react";

import { useForm, SubmitHandler } from "react-hook-form";

import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import * as yup from "yup";

import { yupResolver } from "@hookform/resolvers/yup";

import { AddText } from "../../../components/admin/Landing/Landing.styled";
import {
  ButtonContain,
  CloseButton,
  EmailContain,
  ForgotContain,
  MessageContainer,
  PurpleButton2,
  PurpleButtonLoader,
  Text2,
  TextContain,
  TextInput,
  Title,
} from "../../../screens/ModalForgot.styled";

const ModalForgot = ({ showForgot, setShowForgot }: any) => {
  const handleClose = () => setShowForgot(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);

  const formSchema2 = yup.object().shape({
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
  };

  const onSubmit: SubmitHandler<FormValues> = formData => {
    setIsLoading(true)
    let signUpData = {
      credentials: {
        email: formData.email,
      },
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormValues>({
    resolver: yupResolver(formSchema2)
  });
  const [email, setEmail] = useState('')
  const auth = getAuth();

  const triggerResetEmail = async () => {
    setIsLoading(true)
    console.log("Send recovery email to: " + email);
    await sendPasswordResetEmail(auth, email);
    console.log("Password reset email sent");
    setIsEmailSent(true)
    setIsLoading(false)
  }

  return (
    <>
      <ForgotContain>
        <form
          onSubmit={handleSubmit(onSubmit)}
        >
          <Title>
            Reestablecer contraseña
          </Title>
          <TextContain>
            <AddText>
              Le enviaremos un correo electrónico con más instrucciones
              sobre cómo reestablecer su contraseña
            </AddText>
          </TextContain>
          <EmailContain>
            <Text2>
              Ingresar correo electrónico
            </Text2>
            <TextInput
              placeholder="correo@correo.com"
              className={`form-control ${errors.email ? 'is-invalid' : ''}`}
              {...register("email")}
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)} required
            />
            <MessageContainer>
              {isEmailSent && (
                "Correo de recuperación enviado, cheque su bandeja de spam"
              )}
              <div className="invalid-feedback">
                {errors.email?.message}
              </div>
            </MessageContainer>
          </EmailContain>
          <ButtonContain>
            {!isLoading ? (
              <PurpleButton2 onClick={triggerResetEmail} type='submit'>
                Enviar Correo
              </PurpleButton2>
            ) : (
              <PurpleButtonLoader>
                Enviando...
              </PurpleButtonLoader>
            )}

          </ButtonContain>
          <ButtonContain>
            <CloseButton onClick={handleClose}>
              Volver
            </CloseButton>
          </ButtonContain>
        </form>
      </ForgotContain>
    </>
  )
}
export default ModalForgot;