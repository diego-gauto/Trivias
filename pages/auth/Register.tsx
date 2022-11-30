import React, { useEffect, useState } from "react";

import { useForm, SubmitHandler } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "react-phone-number-input/style.css";

import "bootstrap/dist/css/bootstrap.min.css";
import Link from "next/link";
import { useRouter } from "next/router";
import * as yup from "yup";

import { yupResolver } from "@hookform/resolvers/yup";

import GradientCanvas from "../../components/GradientCanvas/GradientCanvas";
import { LOGIN_PATH } from "../../constants/paths";
import {
  AllButtons,
  Background,
  Error,
  Box1,
  Box2,
  FacebookButton,
  FacebookIcon,
  GoogleButton,
  GoogleIcon,
  InputPhone,
  LineIcon,
  LinkText,
  LoaderContain,
  LoaderImage,
  LoginBox,
  PasswordBox,
  PurpleButton2,
  Text2,
  Text3,
  TextInput,
  TextInput_2,
  Title,
  BackgroundLoader,
} from "../../screens/Login.styled";
import { accessWithAuthProvider, signInWithCreds, signUpCreds, signUpWithCreds } from "../../store/actions/AuthActions";
import { fetchSignInMethodsForEmail } from "firebase/auth";
import { useAuth } from "../../hooks/useAuth";
import { isValidPhoneNumber } from "react-phone-number-input";
import ErrorModal from "../../components/Error/ErrorModal";

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
  const [registerLoad, setRegisterLoad] = useState(false);
  const [phoneInput, setPhoneInput] = useState<string>("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [phoneValidation, setPhoneValidation] = useState(false);
  const [authLoader, setAuthLoader] = useState(false);
  const [phone, setphone] = useState("")
  const [show, setShow] = useState<any>(false);

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


  const handleSignUpWithAuthProvider = (authProvider: string) => {
    setIsLoading(true)
    accessWithAuthProvider(authProvider, trial).then(() => {
      window.location.href = "/Purchase?type=subscription";
    });
  };

  const phoneCode = phoneInput != null && phoneInput.slice(0, 3);
  const onSubmit: SubmitHandler<FormValues> = async formData => {
    setAuthLoader(true)
    setphone(phoneInput)
    if (phoneCode == '+52') {
      if (isValidPhoneNumber(phoneInput)) {
        console.log('se logro')
        let tempMonth = false;
        let tempPhoneInput = phoneInput;
        if (trial) {
          tempMonth = true;
        }
        var input = document.getElementById("input_1") as HTMLInputElement;
        if (!tempPhoneInput) {
          tempPhoneInput = ""
        }
        // 2592000
        let signUpData = {
          credentials: {
            name: formData.name,
            lastName: formData.lastName,
            email: formData.email,
            password: formData.password,
            phoneInput: tempPhoneInput,
            month: tempMonth
          },
        };
        const redirectURL = await signUpCreds(signUpData);
        if (redirectURL == "/auth/RegisterPastUser") {
          setErrorMsg('El correo ingresado ya existe!');
          setError(true);
          setAuthLoader(false);
          setShow(true);
        }
        else {
          setIsLoading(true)
          signUpWithCreds(signUpData).then(() => {
            window.location.href = "/Purchase?type=subscription";
          });
        }
      }
      else {
        setErrorPhone(true);
        setErrorPhoneMsg("Número de teléfono Invalido");
        setAuthLoader(false);
      }
    }
    else {
      let tempMonth = false;
      let tempPhoneInput = phoneInput;
      if (trial) {
        tempMonth = true;
      }
      var input = document.getElementById("input_1") as HTMLInputElement;
      if (!tempPhoneInput) {
        tempPhoneInput = ""
      }
      // 2592000
      let signUpData = {
        credentials: {
          name: formData.name,
          lastName: formData.lastName,
          email: formData.email,
          password: formData.password,
          phoneInput: tempPhoneInput,
          month: tempMonth
        },
      };
      const redirectURL = await signUpCreds(signUpData);
      if (redirectURL == "/auth/RegisterPastUser") {
        setErrorMsg('El correo ingresado ya existe!');
        setError(true);
        setIsLoading(false);
      }
      else {
        signUpWithCreds(signUpData).then(() => {
          window.location.href = "/Purchase?type=subscription";
        });
      }
    }


  }

  useEffect(() => {
    if (loggedIn) {
      window.location.href = "/Preview";
    } else {
      setTimeout(() => {
        setIsLoading(false)
      }, 500);
    }
  }, [loggedIn])



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
                  <p className="login">Inicia sesión</p>
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
                    handleSignUpWithAuthProvider("Google");
                  }} alt="" />
                  <img src="../images/facebookLogin.png" onClick={() => {
                    handleSignUpWithAuthProvider("Facebook");
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
          {/* {
            registerLoad ?
              <LoginBox>
                <form
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <Title>
                    Registrarse
                  </Title>
                  <Box1 style={{}}>
                    <Text2>
                      Correo electrónico
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
                    {error && <Error style={{ marginBottom: 0, marginTop: 10 }}>
                      {errorMsg}.
                    </Error>}
                  </Box1>
                  <Box1>
                    <Text2>
                      Nombre
                    </Text2>
                    <TextInput
                      type="text"
                      placeholder="John"
                      className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                      {...register("name")}
                    ></TextInput>
                    <div className="invalid-feedback">
                      {errors.name?.message}
                    </div>

                  </Box1>
                  <Box1>
                    <Text2>
                      Apellido
                    </Text2>
                    <TextInput
                      type="text"
                      placeholder="Doe"
                      className={`form-control ${errors.lastName ? 'is-invalid' : ''}`}
                      {...register("lastName")}
                    ></TextInput>
                    <div className="invalid-feedback">
                      {errors.lastName?.message}
                    </div>

                  </Box1>
                  <Box2>
                    <Text2>
                      Contraseña
                    </Text2>
                    <PasswordBox>

                      <div>
                        <TextInput_2
                          type={passwordShown_1 ? "text" : "password"}
                          placeholder="Contraseña"
                          className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                          {...register("password")}
                        />

                        <div style={{ 'cursor': 'pointer' }}
                          onClick={togglePassword_1}
                        >{passwordShown_1 ? <FaEye ></FaEye> : <FaEyeSlash></FaEyeSlash>}</div>
                      </div>
                      <div className="invalid-feedback">
                        {errors.password?.message}
                      </div>

                    </PasswordBox>
                  </Box2>
                  <Box2>
                    <Text2>
                      Confirmar Contraseña
                    </Text2>
                    <PasswordBox>
                      <div>
                        <TextInput_2
                          type={passwordShown_2 ? "text" : "password"}
                          placeholder="Confirma la contraseña"
                          className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''}`}
                          {...register("confirmPassword")}
                        />
                        <div style={{ 'cursor': 'pointer' }}
                          onClick={togglePassword_2}
                        >{passwordShown_2 ? <FaEye ></FaEye> : <FaEyeSlash></FaEyeSlash>}</div>
                      </div>

                      <div className="invalid-feedback">
                        {errors.confirmPassword?.message}
                      </div>
                    </PasswordBox>
                  </Box2>
                  <Box2>
                    <Text2>
                      Teléfono
                    </Text2>
                    <InputPhone
                      onChange={(e: any) => { setPhoneInput(e) }}
                      limitMaxLength={true}
                      international={true}
                      countryCallingCodeEditable={false}
                      defaultCountry="MX"
                      id="input_1"
                    />
                    <LineIcon />
                  </Box2>
                  <AllButtons>
                    <PurpleButton2 type='submit'>
                      Crear Cuenta
                    </PurpleButton2>
                  </AllButtons>
                </form>
                <AllButtons>

                  <GoogleButton onClick={() => {
                    handleSignUpWithAuthProvider("Google");
                  }}
                  >
                    <GoogleIcon></GoogleIcon>
                    Acceder con Google
                  </GoogleButton>
                  <FacebookButton
                    onClick={() => {
                      handleSignUpWithAuthProvider("Facebook");
                    }}
                  >
                    <FacebookIcon></FacebookIcon>
                    Acceder con Facebook
                  </FacebookButton>
                </AllButtons>
                <Text3 >
                  ¿Ya eres parte? &nbsp;
                  <Link href={LOGIN_PATH}>
                    <LinkText >
                      Iniciar Sesion
                    </LinkText>
                  </Link>
                </Text3>
              </LoginBox>
              :
              <LoaderImage>
                <LoaderContain />
              </LoaderImage>
          } */}
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