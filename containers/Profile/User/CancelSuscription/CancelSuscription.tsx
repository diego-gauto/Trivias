import router from "next/router";

import { CancelSub } from "./CancelSuscription.styled";
import { useEffect } from "react";

const GroupN = "/images/benefits_placeholder/GroupN.png"
const GroupG = "/images/benefits_placeholder/GroupG.png"
const GroupB = "/images/benefits_placeholder/GroupB.png"
const manitas = "/images/cancel_suscription/manos moradas.png"

const CancelSuscription = () => {
  console.log(router.query.id);
  const goBack = () => {
    router.push({ pathname: "/Profile" });
  }
  const goPause = () => {
    router.push({
      pathname: "/end-suscription",
      query: { type: "pause", id: router.query.id }
    });
  }
  const goCancel = () => {
    router.push({
      pathname: '/end-suscription',
      query: { type: "cancel", id: router.query.id }
    });
  }
  useEffect(() => {
    if (router.query) {

    }
  }, [router.query])

  return (
    <CancelSub>
      <div className="m-3">
        <h2 className="purple-dark">¿Pasando por un mal momento?</h2>
        <h2 className="purple">Pausa tu suscripción y no pierdas tus avances.</h2>
        <p className="my-4">Sabemos que hay momentos en la vida en la que necesitas hacer un pausa. <br />Por eso, <b>te ofrecemos la opcion de pausar tu suscripción por un mes.</b></p>
        <p>Ademas al pausar tu suscripcion, no solo <b>conservarás tu progreso,</b> si no que también se guardarán tus beneficios:</p>
        <div className="row w-100 justify-content-around">
          <div className="col-sm text-center">
            <img src={GroupN} className="mb-3" />
            <p><b className="orange">{'x'}</b> Puntos obtenidos</p>
            <p><b className="orange">{'x'}</b> Recompensas obtenidas</p>
            <p>Tu proxima recompensa a los <b className="orange">{'x'}</b> puntos sera:</p>
            <p><b className="orange">{'Recompensa'}</b></p>
          </div>
          <div className="col-sm text-center">
            <img src={GroupG} className="mb-3" />
            <p>Llevas <b className="green">{'x'}</b> meses inscrita a <b>Gonvar+</b>, por lo cúal tienes <b className="green">{'x'}% de descuento
              en productos Gonvar.</b></p>
            <p>Ademas tienes <b className="green">{'x'}</b> cantidad de biletos para nuestra rifa que sera el </p>
            <p className="close"><b className="green">{'fecha'}</b></p>
          </div>
          <div className="col-sm text-center">
            <img src={GroupB} className="mb-3" />
            <p>Haz obtenido <b className="blue">{'x'}</b> certificados con FUV <b>{'('}folio único verificado{')'},</b> y estas
              a punto de conseguir el certificado del curso </p>
            <div className="close">
              <p><b className="blue p-0">{'Curso'}</b></p>
              <p><b className="blue p-0">{'Curso'}</b></p>
              <p><b className="blue p-0">{'Curso'}</b></p>
            </div>
          </div>
        </div>
        <p><b>No dejes que los obstáculos te detengan.</b> Pausa tu suscripción y aprovecha esta oportunidad
          para cuidar de ti misma. Cuando estés lista, <b>estaremos aquí para ayudarte a retomar tu camino como
            Nail Artist.</b></p>
        <p>Recuerda que esta accion solo la puedes realizar <b>dos veces cada 12 meses.</b> <br />Te quedan <b>{'x'}</b> pausas</p>
        <div className="buttons mt-5">
          <button onClick={goCancel} className="left">Perder mis beneficios</button>
          <button onClick={goPause} className="right">Si quiero pausar</button>
          <button onClick={goBack} className="btn btn-link ">Regresar al inicio</button>
        </div>

      </div>
      <img src={manitas} className="under" />
    </CancelSub>
  )
}
export default CancelSuscription;