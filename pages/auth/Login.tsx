import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { MEMBERSHIP_METHOD_DEFAULT, MEMBERSHIP_PLAN_NAME_DEFAULT } from "../../constants/user";
import { httpsCallable } from "firebase/functions";
import { functions } from "../../firebase/firebaseConfig";
import {
  LoaderContain,
  LoaderImage,
  PurpleButton2,
  Title,
  LoginBackground,
  Error,
} from "../../screens/Login.styled";
import { signUpWithCreds } from "../../store/actions/AuthActions";
import ModalForgot from "./Modals/ModalForgot";
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useAuth } from "../../hooks/useAuth";
import { IMembership } from "../../store/types/AuthActionTypes";
import { IStripeUserData } from "../../interfaces/IStripeUserData";
import { useMediaQuery } from "react-responsive";
import Link from "next/link";
import { SIGNUP_PATH } from "../../constants/paths";
import ErrorModal from "../../components/Error/ErrorModal";
import { useGoogleLogin } from "@react-oauth/google";
import { facebookUserInfo, googleTokens, loginWithProviderApi } from "../../components/api/auth";
import { useLogin, useFacebook } from 'react-facebook';

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
  const responsive1023 = useMediaQuery({ query: "(max-width: 1023px)" });
  const { login } = useLogin();

  const togglePassword_1 = () => {
    setPasswordShown_1(!passwordShown_1);
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
      },
    };
    loginWithProviderApi(signUpData.credentials).then((res) => {
      if (res[0]) {
        if (res[0].password === signUpData.credentials.password && res[0].provider === 'web') {
          localStorage.setItem('email', signUpData.credentials.email);
          window.location.href = '/';
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
      if (res.msg === false) {
        setErrorMsg('El usuario ingresado no existe o ha sido eliminado');
        setError(true);
        setAuthLoader(false);
        setShow(true);
      }
    })
    // if (redirectURL == "/auth/RegisterPastUser") {
    //   setPastUserScreen(true);
    //   getPastUser(formData.email).then((res) => {
    //     setPastUser(res[0]);
    //   }).then(() => { setAuthLoader(false); })
    // }
  }
  const onSubmit2: SubmitHandler<FormValues> = async formData => {
    setIsLoading(true)
    const getStripeUserData = httpsCallable<{ customerEmail: string }, IStripeUserData | null>(functions, "getStripeUserData");
    const { data: stripeUserData } = await getStripeUserData({ customerEmail: localStorage.getItem("pastUserEmail")! });
    const signUpData: { credentials: object; membership?: IMembership } = {
      credentials: {
        name: pastUser.firstName,
        lastName: pastUser.lastName,
        email: pastUser.email,
        password: formData.password,
        phoneInput: "+52" + pastUser.whatsapp,
      },
    };
    if (!!stripeUserData) {
      signUpData.membership = {
        finalDate: stripeUserData.current_period_end,
        level: 1,
        method: MEMBERSHIP_METHOD_DEFAULT,
        paymentMethod: stripeUserData.paymentMethods.map((pm) => pm.id),
        // @ts-expect-error
        planId: stripeUserData.plan.id,
        planName: MEMBERSHIP_PLAN_NAME_DEFAULT,
        startDate: stripeUserData.current_period_start,
      }
    }
    const redirectURL = await signUpWithCreds(signUpData, stripeUserData?.paymentMethods);
    window.location.href = redirectURL;
  }
  const [showForgot, setShowForgot] = useState(false);

  useEffect(() => {
    if (loggedIn) {
      setIsLoading(true)
      window.location.href = "/";
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
        loginWithProviderApi(user).then((res) => {
          localStorage.setItem('email', user.email)
          window.location.href = "/"
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
          email: res.email,
        }
        loginWithProviderApi(user).then((res) => {
          localStorage.setItem('email', user.email);
          window.location.href = "/"
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
          <div className="left-side">
            <img className="imgUpperHand" src="../images/mano2.png" alt="" />
            <p>¡Es un placer <br />
              <span>tenerte de {!responsive1023 && <br />} vuelta!</span>
            </p>
            <img className="imgBottomHand" src="../images/mano1.png" alt="" />
          </div>
          {
            (showForgot == false && loginLoader) ?
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
                        </div>
                        {error && <Error>
                          <p>
                            {errorMsg}
                          </p>
                        </Error>}
                        {
                          responsive1023 &&
                          <p className="forgotText">
                            ¿Olvidaste tu contraseña?
                            <span onClick={() => { setShowForgot(true) }}>&nbsp;Click aquí</span>
                          </p>
                        }

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
              :
              <LoaderImage>
                <LoaderContain />
              </LoaderImage>
          }
          {
            showForgot == true &&
            <ModalForgot showForgot={showForgot} setShowForgot={setShowForgot} />
          }
        </LoginBackground >

      ) : (

        <LoginBackground style={{ justifyContent: "center", alignItems: "center" }}>
          <LoaderImage>
            <LoaderContain />
          </LoaderImage>
        </LoginBackground>
      )}
      <ErrorModal show={show} setShow={setShow} error={errorMsg} />
    </>
  )
}
export default Login;