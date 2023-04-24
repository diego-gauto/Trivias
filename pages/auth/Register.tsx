import React, { useEffect, useState } from "react";

import { useForm, SubmitHandler } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "react-phone-number-input/style.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Link from "next/link";
import { useRouter } from "next/router";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { LOGIN_PATH } from "../../constants/paths";
import {
  Background,
  Error,
  InputPhone,
  LoaderContain,
  LoaderImage,
  PurpleButton2,
  Title,
  BackgroundLoader,
} from "../../screens/Login.styled";
import { accessWithAuthProvider, signInWithCreds, signUpCreds, signUpWithCreds } from "../../store/actions/AuthActions";
import { useAuth } from "../../hooks/useAuth";
import { isValidPhoneNumber } from "react-phone-number-input";
import ErrorModal from "../../components/Error/ErrorModal";
import { facebookUserInfo, googleTokens, newUser } from "../../components/api/auth";
import { useGoogleLogin } from "@react-oauth/google";
import { FacebookProvider, useLogin, useFacebook } from 'react-facebook';


const formSchema = yup.object().shape({
  name: yup
    .string()
    .min(3, "El nombre debe ser de al menos 3 caracteres")
    .required("Campo requerido"),
  lastName: yup
    .string()
    .min(3, "El nombre debe ser de al menos 3 caracteres")
    .required("Campo requerido"),
  email: yup
    .string()
    .email("Debe ser un email válido")
    .required("Campo requerido"),
  password: yup.string()
    .required('Password is required')
    .min(6, 'La contraseña debe tener al menos 6 carácteres'),
  confirmPassword: yup.string()
    .required('Confirm Password is required')
    .oneOf([yup.ref('password'), null], 'La contraseña no coincide'),
});

type FormValues = {
  name: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const Register = () => {

  const [passwordShown_1, setPasswordShown_1] = useState(false);
  const [passwordShown_2, setPasswordShown_2] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [errorPhone, setErrorPhone] = useState<boolean>(false);
  const [errorPhoneMsg, setErrorPhoneMsg] = useState<string>("");
  const [phoneInput, setPhoneInput] = useState<string>("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [authLoader, setAuthLoader] = useState(false);
  const [phone, setphone] = useState("")
  const [show, setShow] = useState<any>(false);
  const { login } = useLogin();
  const { api } = useFacebook();

  const togglePassword_1 = () => {
    setPasswordShown_1(!passwordShown_1);
  };

  const togglePassword_2 = () => {
    setPasswordShown_2(!passwordShown_2);
  };

  try {
    var userDataAuth = useAuth();
    useEffect(() => {
      if (userDataAuth.user !== null) {
        setLoggedIn(true)
      } else {
        setLoggedIn(false)
      }
    }, [])

  } catch (error) {
    setLoggedIn(false)
  }
  const router = useRouter()
  const { trial } = router.query;

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<FormValues>({
    resolver: yupResolver(formSchema)
  });

  const phoneCode = phoneInput != null && phoneInput.slice(0, 3);

  const onSubmit: SubmitHandler<FormValues> = async formData => {
    setAuthLoader(true);
    setphone(phoneInput);
    let user = {
      name: formData.name,
      last_Name: formData.lastName,
      email: formData.email,
      password: formData.password,
      phone_number: phoneInput,
      stripe_id: "",
      provider: 'web'
    }
    if (isValidPhoneNumber(phoneInput)) {
      newUser(user).then((res) => {
        if (res === "Este usuario ya existe!") {
          setErrorMsg('Este usuario ya existe!');
          setAuthLoader(false);
          setShow(true);
          setIsLoading(false);
        } else {
          localStorage.setItem('email', user.email);
          localStorage.setItem("method", "mail");
          window.location.href = "/Preview"
        }
      })
    } else {
      setErrorPhone(true);
      setErrorPhoneMsg("Número de teléfono Invalido");
      setAuthLoader(false);
    }

  }

  const loginWithGoogle = useGoogleLogin({
    onSuccess: tokenResponse => {
      setAuthLoader(true);
      googleTokens(tokenResponse.code).then((res) => {
        let user = {
          name: res.given_name,
          last_Name: res.family_name,
          email: res.email,
          stripe_id: "",
          photo: res.picture,
          provider: 'google'
        }
        newUser(user).then((res) => {
          if (res === "Este usuario ya existe!") {
            setErrorMsg('Este usuario ya existe!');
            setAuthLoader(false);
            setShow(true);
            setIsLoading(false);
          } else {
            localStorage.setItem('email', user.email)
            window.location.href = "/Preview"
          }
        })
      })
    },
    flow: 'auth-code',
  });

  const loginWithFacebook = async () => {
    try {
      setAuthLoader(true);
      const response = await login({
        scope: 'email',
      });
      let userInfo = {
        id: response.authResponse.userID,
        access_token: response.authResponse.accessToken
      }
      facebookUserInfo(userInfo).then((res) => {
        let user = {
          name: res.name,
          last_Name: "",
          email: res.email,
          stripe_id: "",
          photo: res.picture.data.url,
          provider: 'facebook'
        }
        newUser(user).then((res) => {
          if (res === "Este usuario ya existe!") {
            setErrorMsg('Este usuario ya existe!');
            setAuthLoader(false);
            setShow(true);
            setIsLoading(false);
          } else {
            localStorage.setItem('email', user.email);
            localStorage.setItem('method', "facebook");
            window.location.href = "/Preview"
          }
        })
      })
    } catch (error: any) {
      setAuthLoader(false);
    }
  }


  useEffect(() => {
    if (localStorage.getItem("email")) {
      window.location.href = "/Preview";
    } else {
      setTimeout(() => {
        setIsLoading(false)
      }, 500);
    }
  }, [])



  return (
    <>
      {!isLoading ? (
        <Background >
          <div className="left-side">
            <p>¡Te damos la bienvenida <br />
              <span>a nuestra comunidad!</span>
            </p>
            <img src="../images/personasRegister.png" alt="" />
          </div>
          <div className="right-side">
            <form onSubmit={handleSubmit(onSubmit)}>
              <Title>
                Regístrate
              </Title>
              <div className="sub-section">
                <p className="subtitle">¿Ya tienes una cuenta?</p>
                <Link href={LOGIN_PATH}>
                  <p className="loginWithGoogle">Inicia sesión</p>
                </Link>
              </div>
              <div className="box">
                <div className="form-row">
                  <div className="form-input">
                    <label>Nombre</label>
                    <input type="text"
                      required
                      placeholder="Mariana"
                      className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                      {...register("name")} />
                    {
                      errors.name &&
                      <Error>
                        <p>
                          {errors.name?.message}
                        </p>
                      </Error>
                    }
                  </div>
                  <div className="form-input">
                    <label>Apellido</label>
                    <input type="text"
                      required
                      placeholder="Gómez"
                      className={`form-control ${errors.lastName ? 'is-invalid' : ''}`}
                      {...register("lastName")} />
                    {
                      errors.lastName &&
                      <Error>
                        <p>
                          {errors.lastName?.message}
                        </p>
                      </Error>
                    }
                  </div>
                </div>
                <div className="form-row" style={error ? { flexDirection: "column", gap: 2 } : {}}>
                  <div className="form-input">
                    <label>Correo electrónico</label>
                    <input type="text"
                      required
                      placeholder="correo@dominio.com"
                      className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                      {...register("email")} />
                    {
                      errors.email &&
                      <Error>
                        <p>
                          {errors.email?.message}
                        </p>
                      </Error>
                    }
                  </div>
                  {error && <Error>
                    <p>
                      {errorMsg}.
                    </p>
                  </Error>}
                </div>
                <div className="form-row" style={errors.password && { flexDirection: "column", gap: 5 }}>
                  <div className="form-input">
                    <label>Contraseña</label>
                    <input type={passwordShown_1 ? "text" : "password"}
                      placeholder="Crea una contraseña"
                      required
                      className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                      {...register("password")} />
                    <div className="eye"
                      onClick={togglePassword_1}
                    >{passwordShown_1 ? <FaEye ></FaEye> : <FaEyeSlash></FaEyeSlash>}</div>

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
                <div className="form-row" style={errors.confirmPassword && { flexDirection: "column", gap: 5 }}>
                  <div className="form-input">
                    <label>Confirmar Contraseña</label>
                    <input type={passwordShown_2 ? "text" : "password"}
                      placeholder="Confirma la contraseña"
                      required
                      className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''}`}
                      {...register("confirmPassword")} />
                    <div className="eye"
                      onClick={togglePassword_2}
                    >{passwordShown_2 ? <FaEye ></FaEye> : <FaEyeSlash></FaEyeSlash>}</div>
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
                <div className="form-row">
                  <div className="form-input">
                    <label>WhatsApp</label>
                    <InputPhone
                      onChange={(e: any) => { setPhoneInput(e) }}
                      limitMaxLength={true}
                      international={true}
                      value={phone}
                      countryCallingCodeEditable={false}
                      defaultCountry="MX"
                      id="input_1"
                    />
                  </div>
                  {
                    errorPhone &&
                    <div className="error">
                      {errorPhoneMsg}
                    </div>
                  }
                </div>

              </div>
              {
                !authLoader
                  ?
                  <PurpleButton2 type='submit'>
                    Crear Cuenta
                  </PurpleButton2>
                  :
                  <LoaderImage>
                    <LoaderContain />
                  </LoaderImage>
              }

              <div className="social-media-container">
                <div className="info">
                  <p>O regístrate usando <br />
                    tu cuenta de <span>Google</span> <br />
                    o de <span>Facebook</span>
                  </p>
                </div>
                <div className="socials">
                  <img src="../images/googleLogin.png" onClick={() => {
                    loginWithGoogle(); setAuthLoader(true);
                  }} alt="" />

                  <img src="../images/facebookLogin.png" onClick={() => {
                    loginWithFacebook()
                  }} alt="" />
                </div>
                <p className="terms">Al registrarte, aceptas los <span>términos, <br />
                  condiciones y políticas de Gonvar</span></p>
              </div>
            </form>
            <div className="imgResp">
              <img src="../images/personasRegister.png" alt="" />
            </div>
          </div>
        </Background >

      ) : (
        <BackgroundLoader>
          <LoaderImage>
            <LoaderContain />
          </LoaderImage>
        </BackgroundLoader>
      )}
      <ErrorModal show={show} setShow={setShow} error={errorMsg} />
    </>

  )
}
export default Register;

