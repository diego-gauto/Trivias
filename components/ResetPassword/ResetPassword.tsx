import React, { useState } from "react";

import { useForm, SubmitHandler } from "react-hook-form";

import router, { useRouter } from "next/router";
import * as yup from "yup";

import { yupResolver } from "@hookform/resolvers/yup";

//import { useAuth } from "../../hooks/useAuth";
import { Error, LoaderContain, LoaderImage, Title } from "../../screens/Login.styled";
import { updateUserPassword } from "../api/auth";
import { ButtonContain, ResetContainer } from "./ResetPassword.styled";
import { LoaderContainSpinner } from "../../containers/Profile/Purchase/Purchase.styled";
import { LOGIN_PATH } from "../../constants/paths";

const ResetPassword = () => {
  const [isLoading, setIsLoading] = useState(false);
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
        alert(res.data.msg);
        setIsLoading(false);
        router.push('/preview');
      }
      if (res.status === 202) {
        alert(res.data.msg);
        localStorage.removeItem("reset");
        setIsLoading(false);
        window.location.href = LOGIN_PATH;
      }
    })
  }

  // try {
  //   var userDataAuth = useAuth();
  //   useEffect(() => {
  //     if (userDataAuth.user === null || !localStorage.getItem("reset")) {
  //       window.location.href = '/Preview';
  //     }
  //   }, [])

  // } catch (error) {
  // }

  return (
    <ResetContainer>
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