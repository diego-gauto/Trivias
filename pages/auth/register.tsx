import React, { useEffect, useState } from "react";

import { useFacebook, useLogin } from "react-facebook";
import { useForm, SubmitHandler } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import es from "react-phone-number-input/locale/es.json";
import "react-phone-number-input/style.css";

import "bootstrap/dist/css/bootstrap.min.css";
import { isValidPhoneNumber, parsePhoneNumberFromString } from "libphonenumber-js";
import Link from "next/link";
import { useRouter } from "next/router";
import * as yup from "yup";

import { yupResolver } from "@hookform/resolvers/yup";
import { useGoogleLogin } from "@react-oauth/google";

import { conektaCustomer, facebookUserInfo, googleTokens, newUser } from "../../components/api/auth";
import ErrorModal from "../../components/Error/ErrorModal";
import { LOGIN_PATH, PREVIEW_PATH, } from "../../constants/paths";
import { useAuth } from "../../hooks/useAuth";
import {
  Background,
  BackgroundLoader,
  Error,
  InputPhone,
  LoaderContain,
  LoaderImage,
  PurpleButton2,
  Title,
} from "../../screens/Login.styled";
import { SOCIALS_ARRAY } from "../../constants/arrays";
import { authRedirect } from "../../constants/redirects";

var countries = require("i18n-iso-countries");
countries.registerLocale(require("i18n-iso-countries/langs/es.json"))

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
    .test('no-special-character', 'El correo no debe contener espacios', function (value) {
      if (value && value.includes(' ')) {
        return false;
      }
      return true;
    })
    .email("Debe ser un email válido")
    .required("Campo requerido"),
  password: yup.string()
    .required('Password is required')
    .min(6, 'La contraseña debe tener al menos 6 carácteres'),
  confirmPassword: yup.string()
    .required('Confirm Password is required')
    .oneOf([yup.ref('password'), null], 'La contraseña no coincide'),
  option: yup.string()
    .required('Debe seleccionar una opcion')

});

type FormValues = {
  name: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  option: string;
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
  const [terms, setTerms] = useState(false);
  const [phone, setphone] = useState("")
  const [show, setShow] = useState<any>(false);
  const [option, setOption] = useState('');
  const { login } = useLogin();

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

  const parseNumber = (phone: string) => {
    const parsedNumber = parsePhoneNumberFromString(phone);
    const code = parsedNumber?.country
    const country = countries.getName(code, "es")
    return country;
  }

  const onSubmit: SubmitHandler<FormValues> = async formData => {
    if (!terms) {
      setErrorMsg('Por favor de aceptar los terminos y condiciones para poder continuar!');
      setShow(true);
      return
    }
    setAuthLoader(true);
    setphone(phoneInput);
    if (phoneInput === "") {
      alert("Agregue un numero de telefono por favor!");
      setAuthLoader(false);
      return;
    }
    let user: any = {
      name: formData.name,
      last_Name: formData.lastName,
      email: formData.email,
      password: formData.password,
      phone_number: phoneInput.replace("+", ""),
      stripe_id: "",
      provider: 'web',
      country: parseNumber(phoneInput),
      come_from: formData.option,
    }
    if (isValidPhoneNumber(phoneInput)) {
      newUser(user).then(async (res) => {
        if (res?.msg === "Este usuario ya existe!") {
          setErrorMsg('Este usuario ya existe!');
          setAuthLoader(false);
          setShow(true);
          setIsLoading(false);
        } else {
          user.userId = res.userId.insertId;
          conektaCustomer(user).then(() => {
            localStorage.setItem('email', user.email);
            localStorage.setItem("method", "mail");
            window.location.href = PREVIEW_PATH;
            authRedirect('register')
          })
        }
      })
    } else {
      setErrorPhone(true);
      setErrorPhoneMsg("Número de teléfono Invalido");
      setAuthLoader(false);
    }
  }
  const startGoogleLogin = () => {
    if (option !== "") {
      loginWithGoogle();
      setAuthLoader(true);
    } else {
      setErrorMsg('Seleccione por donde nos conocio');
      setShow(true);
    }

  }
  const loginWithGoogle = useGoogleLogin({
    onSuccess: tokenResponse => {
      if (!terms) {
        setErrorMsg('Por favor de aceptar los terminos y condiciones para poder continuar!');
        setShow(true);
        setAuthLoader(false);
        return
      }
      setAuthLoader(true);
      googleTokens(tokenResponse.code).then((res) => {
        let user: any = {
          name: res.given_name,
          last_Name: res.family_name,
          email: res.email,
          stripe_id: "",
          photo: res.picture,
          provider: 'google',
          come_from: option,
        }
        newUser(user).then((res) => {
          if (res?.msg === "Este usuario ya existe!") {
            setErrorMsg('Este usuario ya existe!');
            setAuthLoader(false);
            setShow(true);
            setIsLoading(false);
          } else {
            user.userId = res.userId.insertId;
            conektaCustomer(user).then(() => {
              localStorage.setItem('email', user.email)
              window.location.href = PREVIEW_PATH;
              authRedirect('register')
            })
          }
        })
      })
    },
    flow: 'auth-code',
  });
  const loginWithFacebook = async () => {
    if (option !== '') {
      try {
        setAuthLoader(true);
        if (!terms) {
          setErrorMsg('Por favor de aceptar los terminos y condiciones para poder continuar!');
          setShow(true);
          setAuthLoader(false);
          return
        }
        const response = await login({
          scope: 'email',
        });
        let userInfo = {
          id: response.authResponse.userID,
          access_token: response.authResponse.accessToken
        }
        facebookUserInfo(userInfo).then((res) => {
          let user: any = {
            name: res.name,
            last_Name: "",
            email: res.email,
            stripe_id: "",
            photo: res.picture.data.url,
            provider: 'facebook',
            come_from: option,
          }
          newUser(user).then((res) => {
            if (res?.msg === "Este usuario ya existe!") {
              setErrorMsg('Este usuario ya existe!');
              setAuthLoader(false);
              setShow(true);
              setIsLoading(false);
            } else {
              user.userId = res.userId.insertId;
              conektaCustomer(user).then(() => {
                localStorage.setItem('email', user.email);
                localStorage.setItem('method', "facebook");
                window.location.href = PREVIEW_PATH;
                authRedirect('register')
              })
            }
          })
        })
      } catch (error: any) {
        setAuthLoader(false);
      }
    }
    else {
      setErrorMsg('Seleccione por donde nos conocio');
      setShow(true);
    }
  }


  useEffect(() => {
    if (localStorage.getItem("email")) {
      authRedirect('register')
      window.location.href = PREVIEW_PATH;
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
          <div className="right-side" style={{ overflow: "hidden" }}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Title>
                Regístrate
              </Title>
              <div className="sub-section">
                <p className="subtitle">¿Ya tienes una cuenta?</p>
                <Link href={LOGIN_PATH}>
                  <p className="bold">Inicia sesión</p>
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
                <div className="form-row" style={errors.confirmPassword && { flexDirection: "column", gap: 5 }}>
                  <div className="form-input">
                    <label>Cómo nos conociste</label>
                    <select className={`form-control ${errors.option ? 'is-invalid' : ''}`} defaultValue={""} {...register("option")} onChange={(e) => setOption(e.target.value)}>
                      <option value="" disabled>Seleccione una opción</option>
                      {
                        SOCIALS_ARRAY.map((val: string, index: number) => {
                          return (
                            <option value={val} key={"socials_" + index}>{val}</option>
                          )
                        })
                      }
                    </select>
                  </div>
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
                      labels={es}
                    />
                  </div>
                  {
                    errorPhone &&
                    <div className="error">
                      {errorPhoneMsg}
                    </div>
                  }
                </div>
                <div className="terms-container">
                  <input type="checkbox" name="terms" id="terms" onChange={(e) => {
                    setTerms(e.target.checked)
                  }} />
                  <p className="terms">Al registrarte, aceptas los <a target="_blank" href="/terms-condition">términos, <br />
                    condiciones y políticas de Gonvar</a></p>
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
                  <img src="../images/googleLogin.png" onClick={startGoogleLogin} alt="" />

                  <img src="../images/facebookLogin.png" onClick={loginWithFacebook} alt="" />
                </div>
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

