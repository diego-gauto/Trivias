import { useForm } from "react-hook-form";

import * as yup from "yup";

import { yupResolver } from "@hookform/resolvers/yup";

import { AddText } from "../../../components/admin/Landing/Landing.styled";
import {
  ButtonContain,
  CloseButton,
  EmailContain,
  ForgotContain,
  PurpleButton2,
  Text2,
  TextContain,
  TextInput,
  Title,
} from "./ModalForgot.styled";

const ModalForgot = ({ showForgot, setShowForgot }: any) => {
  const handleClose = () => setShowForgot(false);

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

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<FormValues>({
    resolver: yupResolver(formSchema)
  });

  return (
    <>
      <ForgotContain>
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
            Ingresar correo electrónico de recuperación:
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
        </EmailContain>
        <ButtonContain>
          <PurpleButton2 type='submit'>
            Enviar Correo
          </PurpleButton2>
        </ButtonContain>
        <ButtonContain>
          <CloseButton type='submit' onClick={handleClose}>
            Cancelar
          </CloseButton>
        </ButtonContain>
      </ForgotContain>
    </>
  )
}
export default ModalForgot;