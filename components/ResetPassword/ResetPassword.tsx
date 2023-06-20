import React, { useState } from "react";

import { useForm, SubmitHandler } from "react-hook-form";

import router, { useRouter } from "next/router";
import * as yup from "yup";

import { yupResolver } from "@hookform/resolvers/yup";

import { LOGIN_PATH } from "../../constants/paths";
import { LoaderContainSpinner } from "../../containers/Profile/Purchase/Purchase.styled";
//import { useAuth } from "../../hooks/useAuth";
import { Error, Title } from "../../screens/Login.styled";
import AlertModal from "../AlertModal/AlertModal";
import { updateUserPassword } from "../api/auth";
import { ButtonContain, ResetContainer } from "./ResetPassword.styled";

const ResetPassword = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [alert1, setalert1] = useState(false)
  const [alert2, setalert2] = useState(false)
  const [alertMsg1, setalertMsg1] = useState()
  const [alertMsg2, setalertMsg2] = useState()
  const router = useRouter()
  const { mail } = router.query;

  const formSchema = yup.object().shape({
    password: yup.string()
      .required('Password is required')
      .min(6, 'La contraseña debe tener al menos 6 carácteres'),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "La contraseña no coincide"),
  });
  type FormValues = {
    email: string;
    password: string;
    confirmPassword: string;
  };

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormValues>({
    resolver: yupResolver(formSchema)
  });

  const onSubmit: SubmitHandler<FormValues> = async formData => {
    setIsLoading(true)
    let data = {
      email: mail,
      password: formData.password
    }
    await updateUserPassword(data).then((res) => {

      if (res.status === 200) {
        setalert1(true)
        setalertMsg1(res.data.msg);
        setIsLoading(false);
        router.push('/preview');
      }
      if (res.status === 202) {
        setalert2(true)
        setalertMsg2(res.data.msg);
        localStorage.removeItem("reset");
        setIsLoading(false);
        window.location.href = LOGIN_PATH;
      }
    })
  }

  const onHide1 = () => {
    setalert1(false)
  }
  const onHide2 = () => {
    setalert2(false)
  }

  return (
    <ResetContainer>
      {!!alertMsg1 &&
        <AlertModal show={alert1} onHide={onHide1} message={alertMsg1} />}

      {!!alertMsg2 &&
        <AlertModal show={alert2} onHide={onHide2} message={alertMsg2} />}
      <form
        onSubmit={handleSubmit(onSubmit)}
      >
        <Title>
          Reestablecer contraseña
        </Title>
        <div className="form-row">
          <div className="form-input">
            <label>Correo <span>electrónico</span></label>
            <input
              required
              type="text"
              placeholder="correo@correo.com"
              className={`form-control ${errors.email ? 'is-invalid' : ''}`}
              {...register("email")}
              value={mail}
              disabled
            />
          </div>
          {
            errors.email &&
            <Error>
              <p>
                {errors.email?.message}
              </p>
            </Error>
          }
        </div>
        <div className="form-row">
          <div className="form-input">
            <label style={{ fontWeight: 400 }}>Contraseña</label>
            <input
              required
              type={"password"}
              placeholder="Contraseña"
              className={`form-control ${errors.password ? 'is-invalid' : ''}`}
              {...register("password")} />
          </div>
          {
            errors.password &&
            <Error>
              <p>
                {errors.password?.message}
              </p>
            </Error>
          }
        </div>
        <div className="form-row">
          <div className="form-input">
            <label>Confirmar <span>Contraseña</span></label>
            <input
              required
              type={"password"}
              placeholder="Contraseña"
              className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''}`}
              {...register("confirmPassword")} />
          </div>
          {
            errors.confirmPassword &&
            <Error>
              <p>
                {errors.confirmPassword?.message}
              </p>
            </Error>
          }
        </div>
        {!isLoading ? <ButtonContain>
          <button onClick={() => { onSubmit }}>Confirmar</button>
        </ButtonContain> :
          <LoaderContainSpinner />}
      </form>
    </ResetContainer>
  )
}
export default ResetPassword;