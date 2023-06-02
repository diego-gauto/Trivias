import { useEffect, useState } from "react";
import { TfiClose } from "react-icons/tfi";
import router from "next/router";
import { CancelFin } from "./CancelFinal.styles";
import { cancelPaypal, cancelStripe, getUserApi } from "../../../../components/api/users";
import { BackgroundLoader, LoaderContain, LoaderImage } from "../../../../screens/Login.styled";
import { cancelReview } from "../../../../components/api/admin";

const corazon = "/images/cancel_suscription/corazon morado.png"

const CancelFinal = () => {
  const [pop, setPop] = useState(false);
  const [userData, setUserData] = useState<any>(null);
  const [loader, setLoader] = useState<boolean>(false);
  const [buttonLoader, setButtonLoader] = useState(false);
  const [formData, setFormData] = useState({
    firstQuestion: 0,
    secondQuestion: "",
    thirdQuestion: "",
    fourthQuestion: 0,
    fifthQuestion: 0,
  })
  const [other, setOther] = useState("");
  const goBack = () => {
    router.push({ pathname: "/Profile" });
  }
  const getFirstQuestions = (question: number) => {
    let text = ""
    if (question === 1) {
      text = "Dificultades económicas"
    }
    if (question === 2) {
      text = "No me gusto la plataforma"
    }
    if (question === 3) {
      text = "Falta de tiempo"
    }
    if (question === 4) {
      text = other
    }
    return text
  }
  const goCancel = () => {
    //router.push({ pathname: "/pause-suscription" });
    setButtonLoader(true);
    let tempData = {
      first_question: getFirstQuestions(formData.firstQuestion),
      second_question: formData.secondQuestion,
      third_question: formData.thirdQuestion,
      fourth_question: formData.fourthQuestion,
      fifth_question: formData.fifthQuestion,
      user_id: userData.user_id,
    }
    if (tempData.first_question === "" && formData.firstQuestion === 4) {
      alert("Nos puede indicar el otro motivo porfavor")
      setButtonLoader(false);
    }
    else {
      cancelReview(tempData).then((res) => {
        if (userData.method == 'stripe') {
          let sub = {
            subscriptionId: userData.plan_id,
            userId: userData.user_id,
            planName: ""
          }
          cancelStripe(sub).then(() => {
            setPop(true)
          })
        } else {
          let membership = {
            planId: userData.plan_id,
            id: userData.plan_id
          }
          cancelPaypal(membership).then(() => {
            setPop(true)
          })
        }
      })
    }
  }
  const comeback = [{ key: 1, value: 1 },
  { key: 2, value: 2 },
  { key: 3, value: 3 },
  { key: 4, value: 4 },
  { key: 5, value: 5 },
  { key: 6, value: 6 },
  { key: 7, value: 7 },
  { key: 8, value: 8 },
  { key: 9, value: 9 },
  { key: 10, value: 10 }]
  const calif = [{ key: 1, value: 1 },
  { key: 2, value: 2 },
  { key: 3, value: 3 },
  { key: 4, value: 4 },
  { key: 5, value: 5 },
  { key: 6, value: 6 },
  { key: 7, value: 7 },
  { key: 8, value: 8 },
  { key: 9, value: 9 },
  { key: 10, value: 10 }]
  useEffect(() => {
    if (localStorage.getItem("email")) {
      getUserApi(localStorage.getItem("email")).then((res) => {
        setUserData(res);
        setLoader(true);
      })
    }
  }, [])
  if (!loader) {
    return (
      <BackgroundLoader style={{ backgroundColor: "#ede7f2" }}>
        <LoaderImage>
          <LoaderContain />
        </LoaderImage>
      </BackgroundLoader>
    )
  }
  return (
    <CancelFin>
      <div className="m-3">
        {pop &&
          <div className="dimScreen animate__animated animate__slideInUp" >
            <div id="confirmBox" className="dialog">
              <div className="exit">
                <TfiClose className="ex-icon" onClick={goBack} />
              </div>
              <h1 className="purple-dark">Tu suscripción fue cancelada exitosamente</h1>
              <p className="sangria sangria-y">Te enviamos un correo confirmando esta acción.</p>
              <p>Recuerda que <b>puedes reactivar tu cuenta </b> encualquier momento que quieras, para acceder a los
                <b> más de 60 cursos</b> que tenemos disponibles para ti.</p>
              <div className="buttons justify-content-center">
                <button className="right" onClick={goBack}>Aceptar</button>
              </div>
            </div>
          </div>}
        <h1 className="purple-dark mb-4">Nos rompe el corazón que te vayas</h1>
        <p><b>Se que existen multiples razones por las que  ya no puedes continuar con tu carrera de nails artist.</b></p>
        <p className="my-0">¡Estamos en confianza! Platícame el motivo  por el que quieres cancelar tu suscripción, hermosa:</p>
        <div className="row w-100 mx-4 my-4">
          <div className="col-4">
            <div className="form-check m-1">
              <input
                type="radio"
                className="form-check-input p-radio"
                name="first-question"
                value={formData.firstQuestion}
                onChange={(e) => {
                  setFormData({
                    ...formData, firstQuestion: 1
                  })
                }}
              />
              <label className="form-check-label">Dificultades económicas</label>
            </div>
            <div className="form-check m-1">
              <input
                type="radio"
                className="form-check-input p-radio"
                name="first-question"
                value={formData.firstQuestion}
                onChange={(e) => {
                  setFormData({
                    ...formData, firstQuestion: 2
                  })
                }}
              />
              <label className="form-check-label">No me gusto la plataforma</label>
            </div>
          </div>
          <div className="col-8">
            <div className="form-check m-1">
              <input
                type="radio"
                className="form-check-input p-radio"
                name="first-question"
                value={formData.firstQuestion}
                onChange={(e) => {
                  setFormData({
                    ...formData, firstQuestion: 3
                  })
                }}
              />
              <label className="form-check-label">Falta de tiempo</label>
            </div>
            <div className="form-check m-1 w-75">
              <input
                type="radio"
                className="form-check-input p-radio"
                name="first-question"
                value={formData.firstQuestion}
                onChange={(e) => {
                  setFormData({
                    ...formData, firstQuestion: 4
                  })
                }}
              />
              <label className="form-check-label">Otro</label>
              <input
                type="text"
                className="ms-2 t-input w-75 input-other"
                onChange={(e) => {
                  setOther(e.target.value)
                }}
              />
            </div>
          </div>
        </div>
        <p>Describe con sinceridad el por qué  quieres cancelar tu suscripción.</p>
        <textarea
          className="t-area w-75 ms-3 mb-3"
          placeholder="Escribe aquí"
          onChange={(e) => {
            setFormData({
              ...formData, secondQuestion: e.target.value
            })
          }}
        />
        <p>¿Qué te gustaría ve mejorado en la plataforma?*</p>
        <textarea
          className="t-area w-75 ms-3 mb-3"
          placeholder="Escribe aquí"
          onChange={(e) => {
            setFormData({
              ...formData, thirdQuestion: e.target.value
            })
          }}
        />
        <p>¿Qué tan probable es que regreses en el futuro?*</p>
        <div className="ms-4">
          {comeback && comeback.map((come) => {
            return (
              <div className="checkboxgroup mx-3" key={come.key}>
                <input className="form-check-input p-radio" name="comeback_value" type="radio" value={come.value}
                  onChange={(e) => {
                    setFormData({
                      ...formData, fourthQuestion: parseInt(e.target.value)
                    })
                  }}
                />
                <label><b>{come.value}</b></label>
              </div>
            )
          })}
        </div>
        <p>Del 1 al 10 como ha sido la experiencia con tu suscripción.</p>
        <div className="ms-4">
          {calif && calif.map((cal) => {
            return (
              <div className="checkboxgroup mx-3" key={cal.key}>
                <input className="form-check-input p-radio" name="calif_value" type="radio" value={cal.value}
                  onChange={(e) => {
                    setFormData({
                      ...formData, fifthQuestion: parseInt(e.target.value)
                    })
                  }}
                />
                <label><b>{cal.value}</b></label>
              </div>
            )
          })}
        </div>
        <div className="buttons mt-5">
          {
            !buttonLoader
              ? <button onClick={goCancel} className="left">Cancelar mi suscripción</button>
              :
              <BackgroundLoader className="loader">
                <LoaderImage>
                  <LoaderContain />
                </LoaderImage>
              </BackgroundLoader>
          }

          <button onClick={goBack} className="right">Volver al inicio</button>
        </div>
      </div>
      <img src={corazon} className="under" />
    </CancelFin>
  )
}
export default CancelFinal;