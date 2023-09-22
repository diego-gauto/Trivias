import { useEffect, useState } from "react";

import { BsChevronDown, BsChevronUp } from "react-icons/bs";

import "animate.css";

import { FaqStyle } from "./FAQ.styled";

let views = new Map<number, boolean>();
views.set(1, false);
views.set(2, false);
views.set(3, false);
views.set(4, false);
export const FAQ = () => {
  const [ver, setver] = useState(true)

  const verQ = (q: any) => {
    setver(!ver)
    if (views.get(q)) {
      views.set(q, false)
    } else {
      views.set(q, true)
    }
  }

  useEffect(() => {

  }, [setver])



  return (
    <FaqStyle className="w-100">
      <div className="faq">
        <div className="bg-white q-container m-3 w-100" onClick={() => verQ(1)}>
          <div className={`q ${views.get(1) && 'open-q'}`}>
            <p className={`mt-3 ms-2 ${views.get(1) && 'open-q'}`}>¿Entregan reconocimiento?</p>
            {views.get(1) ?
              <BsChevronUp className="icon me-3" /> : <BsChevronDown className="icon me-3" />}
          </div>

          {views.get(1) &&
            <div className="border-top mx-3">
              <p className="py-2 animate__animated animate__fadeIn">¡Claro!<br />Cada curso terminado, con prácticas aprobadas,
                te brinda un certificado con un folio único verificado para que puedas respaldar
                tus conocimientos</p>
            </div>}
        </div>
        <div className="bg-white q-container m-3 w-100" onClick={() => verQ(2)}>
          <div className={`q ${views.get(2) && 'open-q'}`}>
            <p className={`mt-3 ms-2 ${views.get(2) && 'open-q'}`}>¿Qué metodos de pago puedo usar para pagar mi suscripción?</p>
            {views.get(2) ?
              <BsChevronUp className="icon me-3" /> : <BsChevronDown className="icon me-3" />}
          </div>

          {views.get(2) &&
            <div className="border-top mx-3">
              <p className="py-2 animate__animated animate__fadeIn">Nuestros métodos de pago son súper cómodos.<br />
                Si deseas pagar por mes, puedes hacerlo con cualquier tarjeta de crédito o débito.
                <i>(El cobro se realiza de manera automática mes con mes por la cantidad
                  de $249 MXN u 14 dls.)</i><br />
                Si prefieres pagar en transferencia, depósito en Oxxo o Paypal, está disponible la anualidad,
                $1599 por todo un año de aprendizaje y aventura. <i>(Pagando anualidad no se realiza
                  ningún cobro adicional por un año).</i></p>
            </div>}
        </div>
        <div className="bg-white q-container m-3 w-100" onClick={() => verQ(3)}>
          <div className={`q ${views.get(3) && 'open-q'}`}>
            <p className={`mt-3 ms-2 ${views.get(3) && 'open-q'}`}>¿Puedo cancelar en cualquier momento?</p>
            {views.get(3) ?
              <BsChevronUp className="icon me-3" /> : <BsChevronDown className="icon me-3" />}
          </div>

          {views.get(3) &&
            <div className="border-top mx-3 animate__animated animate__fadeIn">
              <p className="py-2">Así es, tú eliges libremente cuánto tiempo deseas aprender y gozar de todos nuestros beneficios.<br />
                Todos los descuentos a los que tienes derecho se pierden al momento de cancelar.</p>
            </div>}
        </div>
        <div className="bg-white q-container m-3 w-100" onClick={() => verQ(4)}>
          <div className={`q ${views.get(4) && 'open-q'}`}>
            <p className={`mt-3 ms-2 ${views.get(4) && 'open-q'}`}>¿Puedo inscribirme desde cualquier país?</p>
            {views.get(4) ?
              <BsChevronUp className="icon me-3" /> : <BsChevronDown className="icon me-3" />}
          </div>

          {views.get(4) &&
            <div className="border-top mx-3 animate__animated animate__fadeIn">
              <p className="py-2">Si, nuestra plataforma está diseñada para poder utilizarse desde
                cualquier lugar del mundo que cuente con acceso a  internet y puedes disfrutar desde un
                celular, tableta electrónica o computadora.</p>
            </div>}
        </div>
      </div>
    </FaqStyle>
  )
}
