import { useState } from "react";

import { useForm } from "react-hook-form";

import { sendPasswordResetEmail } from "firebase/auth";
import firebase from "firebase/compat/app";
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
  const [resetMessage, setResetMessage] = useState(0);
  const [isEmailSent, setIsEmailSent] = useState(false);

  const formSchema2 = yup.object().shape({
    email: yup
      .string()
      .email("Debe ser un email válido")
      .required("Campo requerido"),
  });

  type FormValues = {
    email: string;
  };
  var auth = firebase.auth();
  const onSubmit = async () => {
    setIsLoading(true)
    auth.sendPasswordResetEmail(email)
      .then(function () {
        setResetMessage(1)
        //setIsEmailSent(true)
        setIsLoading(false)
      })
      .catch(function (error) {
        setIsLoading(false)
        setResetMessage(2)
      });
  };

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormValues>({
    resolver: yupResolver(formSchema2)
  });
  const [email, setEmail] = useState('')
  //const auth = getAuth();  
  //const triggerResetEmail = async () => {
  //console.log("Send recovery email to: " + email);
  // await sendPasswordResetEmail(auth, email);
  //console.log("Password reset email sent");
  //setIsEmailSent(true)
  //setIsLoading(false)
  //}

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
              {resetMessage == 0 && (
                ""
              )}
              {resetMessage == 1 && (
                "Correo de recuperación enviado, cheque su bandeja de spam"
              )}
              {resetMessage == 2 && (
                <MessageContainer style={{ fontSize: "15px", fontWeight: "bold", color: "#dc3545" }}>Correo no encontrado</MessageContainer>
              )}
              <div className="invalid-feedback">
                {errors.email?.message}
              </div>
            </MessageContainer>
          </EmailContain>
          <ButtonContain>
            {!isLoading ? (
              <PurpleButton2 type='submit'>
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