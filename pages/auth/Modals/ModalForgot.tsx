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
import { sendEmailPassword, updateUserPassword } from "../../../components/api/auth";

const ModalForgot = ({ showForgot, setShowForgot }: any) => {
  const handleClose = () => setShowForgot(false);
  const [isLoading, setIsLoading] = useState(false);

  const formSchema2 = yup.object().shape({
    email: yup
      .string()
      .email("Debe ser un email válido")
      .required("Campo requerido"),
  });

  type FormValues = {
    email: string;
  };

  const onSubmit: SubmitHandler<FormValues> = async formData => {
    let resetData = {
      email: formData.email,
      idTemplateBrevo: 13
    };

    setIsLoading(true)
    await sendEmailPassword(resetData).then((res) => {
      if (res.data.msg) {
        localStorage.setItem("reset", "true")
        alert(res.data.msg);
        handleClose()
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
        <ButtonContain>
          <button onClick={() => { onSubmit }}>Confirmar</button>
        </ButtonContain>
      </form>
    </Modal>
  )
}
export default ModalForgot;