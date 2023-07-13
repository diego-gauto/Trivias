import { useEffect, useState } from "react";

import { BsChevronDown, BsChevronUp } from "react-icons/bs";

import { PlanStyles } from "./Plans.styled";

const pStar = "/images/pay_plans/star purple.png"
let views = new Map<number, boolean>();
views.set(1, false);
views.set(2, false);
views.set(3, false);
views.set(4, false);
views.set(5, false);
views.set(6, false);
views.set(7, false);
views.set(8, false);

const Ind_Anual = () => {
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
    <PlanStyles>
      <div className="back plan-container">
        <div className="header">
          <div className="top-tab border Back-p-pink2">
          </div>
          <div className="title b-p-pink2 mx-4 mt-4 pb-3">
            <img src={pStar} alt="Gonvar logo" className="mt-3 me-2" />
            <h3 className="purple-pink2 h5 mb-0 mt-2"><b>Nails Master 3.0 <br />+Anualidad</b></h3>
          </div>
          <div className="text-center my-4">
            <h2 className="h3 mb-0">$2,599.00 mxn</h2>
            <span><i>Cargo automático de $1,599.00 anual</i></span>
          </div>
          <div className="d-flex justify-content-center mb-3">
            <button className="purple-button">Comenzar ahora</button>
          </div>
        </div>
        <div className="main-body">

          <div className="break tip m-2" onClick={() => verQ(1)}>
            <div className="tip-q mb-1">
              <p className="purple-pink2 m-0">3 meses de acceso a Nails Master 2.0</p>
              {views.get(1) ? <BsChevronUp className="tip-icon Back-p-pink2" />
                : <BsChevronDown className="tip-icon Back-p-pink2" />}
            </div>
            {views.get(1) &&
              <div className="b-p-pink2">
                <p className="mb-0 pt-2 animate__animated animate__fadeIn no-bold just">
                  Obtén acceso al curso <b>Nail Masters 2.0 durante 3 meses,</b> con
                  <b>más de 40 lecciones</b> para ti.
                </p>
              </div>}
          </div>

          <div className="break tip m-2" onClick={() => verQ(2)}>
            <div className="tip-q mb-1">
              <p className="purple-pink2 m-0">Mas de 60 cursos y 400 clases</p>
              {views.get(2) ? <BsChevronUp className="tip-icon Back-p-pink2" />
                : <BsChevronDown className="tip-icon Back-p-pink2" />}
            </div>
            {views.get(2) &&
              <div className="b-p-pink2">
                <p className="mb-0 pt-2 animate__animated animate__fadeIn no-bold just">
                  <b>Curso de uñas y belleza en línea, </b>con Instructores profesionales, niveles básicos y
                  avanzados, incluye reconocimientos y certificados.<br />
                  <i><b>Precio Real: $70,000 MXN</b></i>
                </p>
              </div>}
          </div>

          <div className="break tip m-2" onClick={() => verQ(3)}>
            <div className="tip-q mb-1">
              <p className="purple-pink2 mb-0">Descuento en productos Gonvar</p>
              {views.get(3) ? <BsChevronUp className="tip-icon Back-p-pink2" />
                : <BsChevronDown className="tip-icon Back-p-pink2" />}
            </div>
            {views.get(3) &&
              <div className="b-p-pink2">
                <p className="mb-0 pt-2 animate__animated animate__fadeIn no-bold just">
                  A partir del 3° mes suscrita, <b>recibe 20% de descuento.</b>
                  <br />
                  A partir del 6° mes suscrita, <b>recibe 40% de descuento.</b>
                </p>
              </div>}
          </div>

          <div className="break tip m-2" onClick={() => verQ(4)}>
            <div className="tip-q mb-1">
              <p className="purple-pink2 mb-0">Centro de recompensas</p>
              {views.get(4) ? <BsChevronUp className="tip-icon Back-p-pink2" />
                : <BsChevronDown className="tip-icon Back-p-pink2" />}
            </div>
            {views.get(4) &&
              <div className="b-p-pink2">
                <p className="mb-0 pt-2 animate__animated animate__fadeIn no-bold just">
                  <b>Centro de Recompensas, donde ganas miles de pesos en productos y premios </b>
                  sólo por permanecer suscrita, concluir tus cursos y hacer tus tareas.
                </p>
              </div>}
          </div>

          <div className="break tip m-2" onClick={() => verQ(5)}>
            <div className="tip-q mb-1">
              <p className="purple-pink2 mb-0">Instructores Profesionales</p>
              {views.get(5) ? <BsChevronUp className="tip-icon Back-p-pink2" />
                : <BsChevronDown className="tip-icon Back-p-pink2" />}
            </div>
            {views.get(5) &&
              <div className="b-p-pink2">
                <p className="mb-0 pt-2 animate__animated animate__fadeIn no-bold just">
                  <b>Todos nuestros instructores son profesionales de la belleza, </b>
                  asegurando que así tendrás una educación de calidad bajo los mejores estandares de la industria.
                </p>
              </div>}
          </div>

          <div className="break tip m-2" onClick={() => verQ(6)}>
            <div className="tip-q mb-1">
              <p className="purple-pink2 mb-0">Revisión de prácticas y asesorías ilimitadas</p>
              {views.get(6) ? <BsChevronUp className="tip-icon Back-p-pink2" />
                : <BsChevronDown className="tip-icon Back-p-pink2" />}
            </div>
            {views.get(6) &&
              <div className="b-p-pink2">
                <p className="mb-0 pt-2 animate__animated animate__fadeIn no-bold just">
                  ¿Tienes duda en tus cursos? No te preocupes, <b>nuestro equipo esta para ayudarte </b>
                  y resolver cualquier duda que tengas. Además, <b>revisamos individualmente cada una de tus practicas, </b>
                  para que sigas mejorando.
                </p>
              </div>}
          </div>

          <div className="break tip m-2" onClick={() => verQ(7)}>
            <div className="tip-q mb-1">
              <p className="purple-pink2 mb-0">Kit gratis + envios gratis</p>
              {views.get(7) ? <BsChevronUp className="tip-icon Back-p-pink2" />
                : <BsChevronDown className="tip-icon Back-p-pink2" />}
            </div>
            {views.get(7) &&
              <div className="b-p-pink2">
                <p className="mb-0 pt-2 animate__animated animate__fadeIn no-bold just">
                  Recibe un kit con diferentes productos cada dos meses, más <b>envios gratis en compras mayores </b>
                  a $1,000.00.
                </p>
              </div>}
          </div>

          <div className="break tip m-2" onClick={() => verQ(8)}>
            <div className="tip-q mb-1">
              <p className="purple-pink2 mb-0">Certificado oficial</p>
              {views.get(8) ? <BsChevronUp className="tip-icon Back-p-pink2" />
                : <BsChevronDown className="tip-icon Back-p-pink2" />}
            </div>
            {views.get(8) &&
              <div className="b-p-pink2">
                <p className="mb-0 pt-2 animate__animated animate__fadeIn no-bold just">
                  Al finalizar tu curso, obtén un <b>certificado oficial </b>de la marca.
                </p>
              </div>}
          </div>

          <span className="text-center my-2"><i>Más información</i></span>
        </div>
      </div>
    </PlanStyles>
  )
}

export default Ind_Anual