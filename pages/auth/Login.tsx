import React, { useEffect, useState } from "react";

import { useLogin } from "react-facebook";
import { useForm, SubmitHandler } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useMediaQuery } from "react-responsive";

import { message } from "antd";
import Link from "next/link";
import * as yup from "yup";

import { yupResolver } from "@hookform/resolvers/yup";
import { useGoogleLogin } from "@react-oauth/google";

import AlertModal from "../../components/AlertModal/AlertModal";
import {
  conektaCustomer,
  facebookUserInfo,
  googleTokens,
  loginWithProviderApi,
  updateLastSignIn,
  updatePastUser,
  updateUserPassword,
} from "../../components/api/auth";
import ErrorModal from "../../components/Error/ErrorModal";
import { ANUAL_FORM, NAILS_FORM, PLAN_PATH, PREVIEW_PATH, PURCHASE_PATH, SIGNUP_PATH } from "../../constants/paths";
import { useAuth } from "../../hooks/useAuth";
import {
  Error,
  LoaderContain,
  LoaderImage,
  LoginBackground,
  PurpleButton2,
  Title,
} from "../../screens/Login.styled";
import ModalForgot from "./Modals/ModalForgot";
import router from "next/router";
import { activeUsers } from "../../constants/dummies";

const formSchema = yup.object().shape({
  pastUSerScreen: yup.boolean(),
  email: yup
    .string()
    .email("Debe ser un email válido")
    .required("Campo requerido"),
  password: yup.string()
    .required('Password is required')
    .min(6, 'La contraseña debe tener al menos 6 carácteres'),
  confirmPassword: yup
    .string()
    .when('pastUserScreen', {
      is: true,
      then: yup.string()
    })
    .oneOf([yup.ref("password"), null], "La contraseña no coincide"),
});
type FormValues = {
  email: string;
  password: string;
  confirmPassword: string;
  newPassword: string;
  newConfirmPassword: string;
};

const Login = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [loginLoader, setLoginLoader] = useState(false);
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [passwordShown_1, setPasswordShown_1] = useState(false);
  const [passwordShown_2, setPasswordShown_2] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [pastUserScreen, setPastUserScreen] = useState(false);
  const [pastUser, setPastUser] = useState<any>({})
  const [authLoader, setAuthLoader] = useState(false);
  const [show, setShow] = useState<any>(false);
  const [showAlert1, setShowAlert1] = useState<any>(false);
  const [showAlert2, setShowAlert2] = useState<any>(false);
  const [alertMsg1, setalertMsg1] = useState<any>()
  const [alertMsg2, setalertMsg2] = useState()
  const [reset, setReset] = useState<any>(false);
  const responsive1023 = useMediaQuery({ query: "(max-width: 1023px)" });
  const { login } = useLogin();
  const [password, setPassword] = useState('');
  const [confirm_Password, setConfirm_Password] = useState('');

  const togglePassword_1 = () => {
    setPasswordShown_1(!passwordShown_1);
  };
  const toggleAlert1 = () => {
    setShowAlert1(false);
  };
  const toggleAlert2 = () => {
    setShowAlert2(false);
  };
  const togglePassword_2 = () => {
    setPasswordShown_2(!passwordShown_2);
  };
  const toggleConfirmPassword = () => {
    setConfirmPassword(!confirmPassword);
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
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormValues>({
    resolver: yupResolver(formSchema)
  });

  const onSubmit: SubmitHandler<FormValues> = async formData => {
    setAuthLoader(true);
    let signUpData = {
      credentials: {
        email: formData.email,
        password: formData.password,
        newPassword: formData.newPassword,
        newConfirmPassword: formData.newConfirmPassword
      },
    };

    if (reset) {
      let body = {
        email: signUpData.credentials.email,
        password: password,
        confirm: confirm_Password
      }
      if (password === "" || confirm_Password === "" || password !== confirm_Password) {
        setError(true)
        setErrorMsg("Revise que su contraseña este correcta");
        setAuthLoader(false);
        return;
      }
      await updateUserPassword(body).then((res) => {
        if (res.status === 202) {
          setShowAlert1(true);
          setalertMsg1("Contraseña actualizada!")
          setErrorMsg("");
          setReset(false);
          setAuthLoader(false)
          return;
        }
        if (res.data.msg) {
          setalertMsg2(res.data.msg)
          setShowAlert2(true)
        }
        setAuthLoader(false)
      })
      return;
    }


    loginWithProviderApi(signUpData.credentials).then(async (res) => {
      if (res[0]) {
        if (res[0].past_user === 'si') {
          setPastUser(res[0]);
          setPastUserScreen(true);
          setAuthLoader(false);
          return
        }
        if (res[0].password === signUpData.credentials.password && res[0].provider === 'web') {
          let body = {
            phone_number: res[0].phone_number,
            country: res[0].country,
            name: res[0].name,
            email: res[0].email,
            userId: res[0].user_id
          }
          if (res[0].conekta_id === null) {
            await conektaCustomer(body)
          }
          updateSignIn(res[0]);
          localStorage.setItem('email', signUpData.credentials.email);
          redirect(res[0])
        }
        if (res[0].password !== signUpData.credentials.password) {
          setErrorMsg('La contraseña es incorrecta!');
          setError(true);
          setAuthLoader(false);
          setShow(true);
        }
        if (res[0].provider !== 'web') {
          setErrorMsg('El correo existe con otra cuenta!');
          setError(true);
          setAuthLoader(false);
          setShow(true);
        }
      }
      if (res.msg === 'Este usuario no existe!') {
        setErrorMsg('El usuario ingresado no existe o ha sido eliminado');
        setError(true);
        setAuthLoader(false);
        setShow(true);
      }
    })
  }
  const onSubmit2: SubmitHandler<FormValues> = async formData => {
    setIsLoading(true)
    let past_user = {
      password: formData.password,
      provider: "web",
      userId: pastUser.id,
      id: pastUser.id
    }
    updateSignIn(past_user);
    updatePastUser(past_user).then((res) => {
      localStorage.setItem('email', pastUser.email);
      window.location.href = PREVIEW_PATH;
      redirect(res[0])
    })
  }
  const updateSignIn = async (user: any) => {
    let userData = {
      userId: user.id,
      last_sign_in: new Date(),
    }
    await updateLastSignIn(userData).then((res) => {
      console.log(res)
    });
  }
  const [showForgot, setShowForgot] = useState(false);

  useEffect(() => {
    if (loggedIn) {
      setIsLoading(true)
      window.location.href = PREVIEW_PATH;
    }
    setTimeout(() => {
      setLoginLoader(true)
    }, 200);

  }, [isLoading])

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false)
    }, 300);
  }, [])

  const googleLogin = useGoogleLogin({
    onSuccess: tokenResponse => {
      setAuthLoader(true);
      googleTokens(tokenResponse.code).then((res) => {
        let user = {
          email: res.email,
        }
        loginWithProviderApi(user).then(async (res) => {
          if (res[0]) {
            if (res[0].past_user === 'si') {
              let past_user = {
                password: "",
                provider: "google",
                userId: res[0].id
              }
              updateSignIn(res[0]);
              updatePastUser(past_user).then((respone) => {
                localStorage.setItem('email', res[0].email);
                window.location.href = PREVIEW_PATH;
                redirect(res[0])
              })
              setAuthLoader(false);
              return
            }
            if (res[0].provider !== 'google') {
              setErrorMsg('El correo existe con otra cuenta!');
              setError(true);
              setAuthLoader(false);
              setShow(true);
              return
            }
          }
          if (res.msg === "Este usuario no existe!") {
            setErrorMsg('Este usuario no existe!');
            setAuthLoader(false);
            setShow(true);
            setIsLoading(false);
          } else {
            let body = {
              phone_number: res[0].phone_number,
              country: res[0].country,
              name: res[0].name,
              email: res[0].email,
              userId: res[0].user_id
            }
            if (res[0].conekta_id === null) {
              await conektaCustomer(body)
            }
            updateSignIn(res[0]);
            localStorage.setItem('email', user.email);
            window.location.href = PREVIEW_PATH;
            redirect(res[0])
          }
        })
      })
    },
    flow: 'auth-code',
  });

  const redirect = (userInfo: any) => {
    let today = new Date().getTime() / 1000;
    if (localStorage.getItem("trial") === "true" && userInfo.final_date < today && userInfo.role !== 'superAdmin') {
      window.location.href = `https://plans--sunny-hummingbird-9f6a67.netlify.app${PURCHASE_PATH}?type=subscription&trial=true`
    } else if (localStorage.getItem("course")) {
      window.location.href = `https://plans--sunny-hummingbird-9f6a67.netlify.app${PURCHASE_PATH}?type=course&id=${localStorage.getItem("course")}`
    }
    else if (localStorage.getItem("month") === "true" && userInfo.final_date < today && userInfo.role !== 'superAdmin') {
      window.location.href = `https://plans--sunny-hummingbird-9f6a67.netlify.app${PURCHASE_PATH}?type=subscription&frequency=month`
    }
    else if (localStorage.getItem("anual") === "true" && userInfo.final_date < today && userInfo.role !== 'superAdmin') {
      window.location.href = `https://plans--sunny-hummingbird-9f6a67.netlify.app${PURCHASE_PATH}?type=subscription&frequency=anual`
    }
    else if (localStorage.getItem("nailMaster") === "true") {
      window.location.href = `https://plans--sunny-hummingbird-9f6a67.netlify.app${PURCHASE_PATH}?type=course&id=30`
    }
    else if (localStorage.getItem("plan") === "true" && userInfo.final_date < today && userInfo.role !== 'superAdmin') {
      window.location.href = `https://plans--sunny-hummingbird-9f6a67.netlify.app${PLAN_PATH}`
    } else {
      window.location.href = PREVIEW_PATH;
    }
  }

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
          email: res.email,
        }
        loginWithProviderApi(user).then(async (res) => {
          if (res[0]) {
            if (res[0].past_user === 'si') {
              let past_user = {
                password: "",
                provider: "facebook",
                userId: res[0].id
              }
              updateSignIn(res[0]);
              updatePastUser(past_user).then((respone) => {
                localStorage.setItem('email', res[0].email);
                redirect(res[0])
                window.location.href = PREVIEW_PATH;
              })
              setAuthLoader(false);
              return
            }
            if (res[0].provider !== 'facebook') {
              setErrorMsg('El correo existe con otra cuenta!');
              setError(true);
              setAuthLoader(false);
              setShow(true);
              return
            }
          }
          if (res.msg === "Este usuario no existe!") {
            setErrorMsg('Este usuario no existe!');
            setAuthLoader(false);
            setShow(true);
            setIsLoading(false);
          } else {
            let body = {
              phone_number: res[0].phone_number,
              country: res[0].country,
              name: res[0].name,
              email: res[0].email,
              userId: res[0].user_id
            }
            if (res[0].conekta_id === null) {
              await conektaCustomer(body)
            }
            updateSignIn(res[0]);
            localStorage.setItem('email', user.email);
            window.location.href = PREVIEW_PATH;
            redirect(res[0])
          }
        })
      })
    } catch (error: any) {
      setAuthLoader(false);
    }
  }

  return (
    <>
      {!isLoading ? (
        <LoginBackground>
          {!!alertMsg1 &&
            <AlertModal show={showAlert1} message={alertMsg1} onHide={toggleAlert1} />}
          {!!alertMsg2 &&
            <AlertModal show={showAlert2} message={alertMsg2} onHide={toggleAlert2} />}
          <div className="left-side">
            <img className="imgUpperHand" src="../images/mano2.png" alt="" />
            <p>¡Es un placer <br />
              <span>tenerte de {!responsive1023 && <br />} vuelta!</span>
            </p>
            <img className="imgBottomHand" src="../images/mano1.png" alt="" />
          </div>
          <div className="right-side">
            <form onSubmit={
              !pastUserScreen ?
                handleSubmit(onSubmit)
                : handleSubmit(onSubmit2)
            }>
              <div className="title-contain">
                <Title style={{ fontSize: 26 }}>
                  Inicia sesión
                </Title>
                <div className="subtext">
                  <p className="first-sub">
                    ¡Te damos la bienvenida a <br />nuestra nueva plataforma!
                  </p>
                  <p className="second-sub">
                    Siempre estamos mejorando para ti.
                  </p>
                </div>
              </div>
              <p className="registerText">
                ¿No tienes una cuenta?
                <Link href={SIGNUP_PATH}>
                  <span>&nbsp;Regístrate</span>
                </Link>
              </p>

              {
                !pastUserScreen ?
                  <div className="box">
                    {reset && <div className="form-row">
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
                    </div>}
                    {!reset ? <div className="form-row">
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
                    </div> :
                      <div className="form-row">
                        <div className="form-input">
                          <label>Contraseña nueva</label>
                          <input
                            required
                            type={passwordShown_1 ? "text" : "password"}
                            placeholder="Contraseña"
                            className={`form-control`}
                            onChange={(e: any) => { setPassword(e.target.value) }}
                          />
                          <div className="eye"
                            onClick={togglePassword_1}
                          >{passwordShown_1 ? <FaEye ></FaEye> : <FaEyeSlash></FaEyeSlash>}</div>
                        </div>
                        {
                          errors.newPassword &&
                          <Error>
                            <p>
                              {errors.newPassword?.message}
                            </p>
                          </Error>
                        }
                      </div>}
                    {!reset ? <div className="form-row">
                      <div className="form-input">
                        <label>Contraseña</label>
                        <input
                          required
                          type={passwordShown_1 ? "text" : "password"}
                          placeholder="Contraseña"
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
                    </div> :
                      <div className="form-row">
                        <div className="form-input">
                          <label>Confirmar contraseña</label>
                          <input
                            required
                            type={passwordShown_1 ? "text" : "password"}
                            placeholder="Contraseña"
                            className={`form-control`}
                            onChange={(e: any) => { setConfirm_Password(e.target.value) }}
                          />
                          <div className="eye"
                            onClick={togglePassword_1}
                          >{passwordShown_1 ? <FaEye ></FaEye> : <FaEyeSlash></FaEyeSlash>}</div>
                        </div>
                        {
                          errors.newConfirmPassword &&
                          <Error>
                            <p>
                              {errors.newConfirmPassword?.message}
                            </p>
                          </Error>
                        }
                      </div>}
                    {error && <Error>
                      <p>
                        {errorMsg}
                      </p>
                    </Error>}

                    <p className="forgotText">
                      ¿Olvidaste tu contraseña?
                      <span onClick={() => { setShowForgot(true) }}>&nbsp;Click aquí</span>
                    </p>
                  </div>
                  :
                  <div className="box">
                    <div className="form-row">
                      <div className="form-input">
                        <label>Correo <span>electrónico</span></label>
                        <input
                          required
                          type="text"
                          value={pastUser.email}
                          className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                          {...register("email")}
                          disabled={pastUserScreen}
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
                    <div className="line"></div>
                    <p className="first-paragraph">
                      Vemos que ya eres parte de <br />la comunidad de Gonvar.
                    </p>
                    <p className="second-paragraph">
                      Para acceder a tu contenido debes crear una contraseña.
                      <span>
                        &nbsp; Puedes usar la misma de antes<br /> o pensar en una nueva.
                      </span>
                    </p>
                    <div className="form-row">
                      <div className="form-input">
                        <label style={{ fontWeight: 400 }}>Contraseña</label>
                        <input
                          required
                          type={passwordShown_2 ? "text" : "password"}
                          placeholder="Contraseña"
                          className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                          {...register("password")} />
                        <div className="eye"
                          onClick={togglePassword_2}
                        >{passwordShown_2 ? <FaEye ></FaEye> : <FaEyeSlash></FaEyeSlash>}</div>
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
                          type={confirmPassword ? "text" : "password"}
                          placeholder="Contraseña"
                          className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''}`}
                          {...register("confirmPassword")} />
                        <div className="eye"
                          onClick={toggleConfirmPassword}
                        >{confirmPassword ? <FaEye ></FaEye> : <FaEyeSlash></FaEyeSlash>}</div>
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
                  </div>
              }
              {
                !authLoader
                  ?
                  <PurpleButton2 type='submit'>
                    Ingresar
                  </PurpleButton2>
                  :
                  <LoaderImage>
                    <LoaderContain />
                  </LoaderImage>
              }

              <div className="social-media-container">
                <div className="info">
                  <p style={{ textAlign: "end" }}>O inicia sesión usando <br />
                    tu cuenta de <span>Google</span> <br />
                    o de <span>Facebook</span>
                  </p>
                </div>
                <div className="socials">
                  <img src="../images/googleLogin.png" onClick={() => {
                    googleLogin();
                  }} alt="" />
                  <img src="../images/facebookLogin.png" onClick={() => {
                    loginWithFacebook();
                  }} alt="" />
                </div>
                <p className="terms">Al iniciar sesión, aceptas los <span>términos, <br />
                  condiciones y políticas de Gonvar</span></p>
              </div>
            </form>
            <div className="imgResp">
              <div className="rightArm">
                <div className="circle" />
                <img className="imgRight" src="../images/unas_lila.png" alt="" />
              </div>
              <img className="imgLeft" src="../images/mano1.png" alt="" />
            </div>
          </div>
        </LoginBackground >

      ) : (

        <LoginBackground style={{ justifyContent: "center", alignItems: "center" }}>
          <LoaderImage>
            <LoaderContain />
          </LoaderImage>
        </LoginBackground>
      )}
      <ModalForgot showForgot={showForgot} setShowForgot={setShowForgot} />
      <ErrorModal show={show} setShow={setShow} error={errorMsg} />
    </>
  )
}
export default Login;