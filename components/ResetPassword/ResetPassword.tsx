import React, { useEffect, useState } from 'react'
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";

import { yupResolver } from "@hookform/resolvers/yup";
import {
  Error, LoaderContain, LoaderImage, Title,
} from "../../screens/Login.styled";
import { ButtonContain, ResetContainer } from './ResetPassword.styled';
import { updateUserPassword } from '../api/auth';
import { useAuth } from '../../hooks/useAuth';
const ResetPassword = () => {
  const [isLoading, setIsLoading] = useState(false);

  const formSchema = yup.object().shape({
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
      email: formData.email,
      password: formData.password
    }
    await updateUserPassword(data).then((res) => {
      if (res.status === 200) {
        alert(res.data.msg);
        setIsLoading(false);
      }
      if (res.status === 202) {
        alert(res.data.msg);
        localStorage.removeItem("reset");
        setIsLoading(false);
      }
    })
  }

  try {
    useEffect(() => {
      if (!localStorage.getItem("reset")) {
        window.location.href = '/preview';
      }
    }, [])

  } catch (error) {
  }

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
          <LoaderImage>
            <LoaderContain />
          </LoaderImage>}
      </form>
    </ResetContainer>
  )
}
export default ResetPassword;