import { useState } from "react";

import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";

import { yupResolver } from "@hookform/resolvers/yup";
import {
  ButtonContain,
  EmailContain,
  MessageContainer,
  Text2,
  TextInput,
  Title,
} from "../../../screens/ModalForgot.styled";
import { Modal } from "react-bootstrap";
import { updateUserPassword } from "../../../components/api/auth";

const ModalForgot = ({ showForgot, setShowForgot }: any) => {
  const handleClose = () => setShowForgot(false);
  const [isLoading, setIsLoading] = useState(false);

  const formSchema2 = yup.object().shape({
    email: yup
      .string()
      .email("Debe ser un email válido")
      .required("Campo requerido"),
    password: yup.string()
      .required('Password is required')
      .min(6, 'La contraseña debe tener al menos 6 carácteres'),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "La contraseña no coincide"),
  });

  type FormValues = {
    email: string;
    password: string,
    confirmPassword: string
  };

  const onSubmit: SubmitHandler<FormValues> = async formData => {
    let resetData = {
      email: formData.email,
      password: formData.password,
      confirmPassword: formData.confirmPassword
    };

    setIsLoading(true)
    await updateUserPassword(resetData).then((res) => {
      if (res.status === 202) {
        alert("Contraseña actualizada");
        handleClose()
        return;
      }
      if (res.data.msg) {
        alert("El usuario no existe!")
      }
      setIsLoading(false)
    })
  };

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormValues>({
    resolver: yupResolver(formSchema2)
  });

  return (
    <Modal show={showForgot} onHide={handleClose} centered className="forgot-modal-component">
      <form
        onSubmit={handleSubmit(onSubmit)}
      >
        <Title>
          Reestablecer contraseña
        </Title>
        {/* <TextContain>
          <AddText>
            Le enviaremos un correo electrónico con más instrucciones
            sobre cómo reestablecer su contraseña
          </AddText>
        </TextContain> */}
        <EmailContain>
          <Text2>
            Ingresar correo electrónico
          </Text2>
          <TextInput
            placeholder="correo@correo.com"
            className={`form-control ${errors.email ? 'is-invalid' : ''}`}
            {...register("email")}
            type="email"
            required
          />
          <MessageContainer>
            <div className="invalid-feedback">
              {errors.email?.message}
            </div>
          </MessageContainer>
        </EmailContain>
        <EmailContain>
          <Text2>
            Contraseña Nueva
          </Text2>
          <TextInput
            placeholder="********"
            className={`form-control ${errors.password ? 'is-invalid' : ''}`}
            {...register("password")}
            type="password"
            required
          />
          <MessageContainer>
            <div className="invalid-feedback">
              {errors.password?.message}
            </div>
          </MessageContainer>
        </EmailContain>
        <EmailContain>
          <Text2>
            Confirmar contraseña
          </Text2>
          <TextInput
            placeholder="********"
            className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''}`}
            {...register("confirmPassword")}
            type="password"
            required
          />
          <MessageContainer>
            <div className="invalid-feedback">
              {errors.confirmPassword?.message}
            </div>
          </MessageContainer>
        </EmailContain>
        <ButtonContain>
          <button onClick={() => { onSubmit }}>Confirmar</button>
        </ButtonContain>
      </form>
    </Modal>
  )
}
export default ModalForgot;