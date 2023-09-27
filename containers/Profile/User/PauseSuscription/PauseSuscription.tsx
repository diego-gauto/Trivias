

import { useState } from "react";

import { TfiClose } from "react-icons/tfi";

import "animate.css";
import router from "next/router";

import { PauseSub } from "./PauseSuscription.styled";
import { PROFILE_PATH } from "../../../../constants/paths";

const corazon = "/images/cancel_suscription/corazon morado.png"

export const PauseSuscription = () => {
  const [pop, setPop] = useState(false)
  const goBack = () => {
    router.push({ pathname: PROFILE_PATH });
  }
  const goPause = () => {
    //router.push({ pathname: "/pause-suscription" });
    setPop(true)
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
  return (
    <PauseSub>
      <div className="m-3">
        {pop &&
          <div className="dimScreen animate__animated animate__slideInUp" >
            <div id="confirmBox" className="dialog">
              <div className="exit">
                <TfiClose className="ex-icon" onClick={goBack} />
              </div>
              <h1 className="purple-dark">Tu cuenta fue pausada exitosamente</h1>
              <p className="my-3">Te enviamos un correo confirmando esta acción.<br /><b>Tu cuenta estará
                suspendida por un periodo de un mes.</b> <br /> Terminado este tiempo, se hará nuevamente el cargo automatico a tu tarjeta.</p>
              <p><i><b>Fecha de reinicio de la inscripcion {'(00/00/000)'}</b></i></p>
              <p>No te preocupes, puedes cancelar definitivamente tu cuenta en cualquier momento que lo decidas.</p>
              <div className="buttons justify-content-center">
                <button className="right" onClick={goBack}>Aceptar</button>
              </div>
            </div>
          </div>}
        <h1 className="purple-dark mb-4">¡Te estaremos esperando!</h1>
        <p><b>Se que existen multiples razones por las que  ya no puedes continuar con tu carrera de nails artist.</b></p>
        <p className="my-0">¡Estamos en confianza! Platícame el motivo  por el que quieres pausar tu suscripción:</p>
        <div className="row w-100 mx-4 my-4">
          <div className="col-4">
            <div className="form-check m-1">
              <input type="radio" className="form-check-input p-radio" />
              <label className="form-check-label">Dificultades económicas</label>
            </div>
            <div className="form-check m-1">
              <input type="radio" className="form-check-input p-radio" />
              <label className="form-check-label">No me gusto la plataforma</label>
            </div>
          </div>
          <div className="col-8">
            <div className="form-check m-1">
              <input type="radio" className="form-check-input p-radio" />
              <label className="form-check-label">Falta de tiempo</label>
            </div>
            <div className="form-check m-1 w-75">
              <input type="radio" className="form-check-input p-radio" />
              <label className="form-check-label">Otro</label>
              <input type="text" className="ms-2 t-input w-75" />
            </div>
          </div>
        </div>
        <p>Describe con sinceridad el por qué  quieres pausar tu suscripción.</p>
        <textarea className="t-area w-75 ms-3 mb-3" placeholder="Escribe aquí" />
        <p>¿Qué te gustaría ve mejorado en la plataforma?*</p>
        <textarea className="t-area w-75 ms-3 mb-3" placeholder="Escribe aquí" />
        <p>¿Qué tan probable es que regreses en el futuro?*</p>
        <div className="ms-4">
          {comeback && comeback.map((come) => {
            return (
              <div className="checkboxgroup mx-3" key={come.key}>
                <input className="form-check-input p-radio" name="comeback_value" type="radio" value={come.value} />
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
                <input className="form-check-input p-radio" name="calif_value" type="radio" value={cal.value} />
                <label><b>{cal.value}</b></label>
              </div>
            )
          })}
        </div>
        <div className="buttons mt-5">
          <button onClick={() => setPop(true)} className="left">Pausar mi suscripción</button>
          <button onClick={goBack} className="right">Volver al inicio</button>
        </div>
        <img src={corazon} className="under" />
      </div>
    </PauseSub>
  )
}
