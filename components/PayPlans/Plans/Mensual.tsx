import { useEffect, useState } from "react";

import { BsChevronDown, BsChevronUp } from "react-icons/bs";

import router from "next/router";

import { PREVIEW_PATH, PURCHASE_PATH, SIGNUP_PATH } from "../../../constants/paths";
import { useAuth } from "../../../hooks/useAuth";
import { IUser } from "../../../interfaces/IUserData";
import { PlanStyles } from "./Plans.styled";

const gPlus = "/images/pay_plans/G+.png"
let views = new Map<number, boolean>();
views.set(1, false);
views.set(2, false);
views.set(3, false);
views.set(4, false);
views.set(5, false);
views.set(6, false);
views.set(7, false);
views.set(8, false);
views.set(9, false);

interface IData {
  user: IUser;
}
const Mensual = (props: IData) => {
  const { user } = props;
  const [ver, setver] = useState(true)
  let today = new Date().getTime() / 1000;
  var userData = useAuth();
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

  const goTo = () => {
    if (user.id) {
      if (user.level === 0 && user.final_date < today) {
        router.push({ pathname: PURCHASE_PATH, query: { type: 'subscription', frequency: 'month' } })
      }
      if (user.level === 0 && user.final_date > today) {
        router.push(PREVIEW_PATH)
      }
      if (user.level === 1 && user.final_date < today) {
        router.push(PREVIEW_PATH)
      }
      if (user.level === 1 && user.final_date > today) {
        router.push(PREVIEW_PATH)
      }
    }
    else {
      localStorage.setItem("month", "true");
      router.push(SIGNUP_PATH)
    }
  }

  return (
    <PlanStyles>
      <div className="break plan-container">
        <div className="header">
          <div className="top-tab border Back-p-pink">
          </div>
          <div className="title b-p-pink mx-4 mt-3">
            <img src={gPlus} alt="Gonvar logo" className="mt-3 me-2" />
            <div>
              <p className="purple-pink mb-0">
                Suscripción Gonvar+
              </p>
              <h3 className="h1 purple-pink">Mensual</h3>
            </div>

          </div>
          <div className="text-center my-4">
            <h2 className="h3 mb-0">$149.00 MXN/mes</h2>
            <span><i>Cargo automático mensual</i></span>
          </div>
          <div className="d-flex justify-content-center mb-3">
            <button className="purple-button " onClick={goTo}>Comenzar ahora</button>
          </div>
        </div>
        <div className="main-body">
          <div className="back tip m-2" onClick={() => verQ(1)}>
            <div className="tip-q mb-1">
              <p className="purple-pink m-0">Más de 60 cursos y 400 clases de uñas y belleza en linea</p>
              {views.get(1) ? <BsChevronUp className="tip-icon Back-p-pink" />
                : <BsChevronDown className="tip-icon Back-p-pink" />}
            </div>
            {views.get(1) &&
              <div className="b-p-pink">
                <p className="mb-0 pt-2 animate__animated animate__fadeIn no-bold just"><b>¡Curso de uñas y belleza en
                  línea,</b> con Instructores profesionales, niveles básicos y avanzados, incluye reconocimientos
                  y certificados.<br /><i>Precio Real: $70,000 MXN</i></p>
              </div>}
          </div>
          <div className="back tip m-2" onClick={() => verQ(2)}>
            <div className="tip-q mb-1">
              <p className="purple-pink mb-0">Instructores Profesionales</p>
              {views.get(2) ? <BsChevronUp className="tip-icon Back-p-pink" />
                : <BsChevronDown className="tip-icon Back-p-pink" />}
            </div>
            {views.get(2) &&
              <div className="b-p-pink">
                <p className="mb-0 pt-2 animate__animated animate__fadeIn no-bold just"><b>Todos nuestros instructores son profesionales de la belleza, </b>
                  asegurando que así tendrás una educación de calidad bajo los mejores estándares de la industria.</p>
              </div>}
          </div>
          <div className="back tip m-2" onClick={() => verQ(3)}>
            <div className="tip-q mb-1">
              <p className="purple-pink mb-0">Centro de recompensas</p>
              {views.get(3) ? <BsChevronUp className="tip-icon Back-p-pink" />
                : <BsChevronDown className="tip-icon Back-p-pink" />}
            </div>
            {views.get(3) &&
              <div className="b-p-pink">
                <p className="mb-0 pt-2 animate__animated animate__fadeIn no-bold just">Centro de Recompensas
                  donde <b>ganas miles de pesos en productos y premios</b> sólo por permanecer suscrita, concluir tus
                  cursos y hacer tus tareas.</p>
              </div>}
          </div>
          <div className="back tip m-2" onClick={() => verQ(4)}>
            <div className="tip-q mb-1">
              <p className="purple-pink mb-0">Revisión de prácticas y asesorías ilimitadas</p>
              {views.get(4) ? <BsChevronUp className="tip-icon Back-p-pink" />
                : <BsChevronDown className="tip-icon Back-p-pink" />}
            </div>
            {views.get(4) &&
              <div className="b-p-pink">
                <p className="mb-0 pt-2 animate__animated animate__fadeIn no-bold just">¿Tienes duda en tus cursos?
                  No te preocupes, <b>nuestro equipo esta para ayudarte</b> y resolver cualquier duda que tengas. Además,
                  <b> revisamos individualmente cada una de tus prácticas</b>, para que sigas mejorando.</p>
              </div>}
          </div>
          <div className="back tip m-2" onClick={() => verQ(5)}>
            <div className="tip-q mb-1">
              <p className="purple-pink mb-0">Hasta 40% de descuento en productos</p>
              {views.get(5) ? <BsChevronUp className="tip-icon Back-p-pink" />
                : <BsChevronDown className="tip-icon Back-p-pink" />}
            </div>
            {views.get(5) &&
              <div className="b-p-pink">
                <p className="mb-0 pt-2 animate__animated animate__fadeIn no-bold just">Recibe <b>20% de descuento </b>
                  en productos Gonvar a partir del 3° mes suscrita.<br />
                  Recibe <b>40% de descuento</b> en productos Gonvar a partir del 6° mes suscrita.</p>
              </div>}
          </div>
          <div className="back tip m-2" onClick={() => verQ(6)}>
            <div className="tip-q mb-1">
              <p className="purple-pink mb-0">Kit de producto Gratis</p>
              {views.get(6) ? <BsChevronUp className="tip-icon Back-p-pink" />
                : <BsChevronDown className="tip-icon Back-p-pink" />}
            </div>
            {views.get(6) &&
              <div className="b-p-pink">
                <p className="mb-0 pt-2 animate__animated animate__fadeIn no-bold just"><b>Recibe un kit gratis con
                  diferentes productos cada dos meses,</b> como acrílicos, geles, monómeros, adherentes,
                  decoración y otros productos.
                  <br /><i><b>El kit de producto tiene valor de $700-$800 MXN, pero es un regalo sin costo. Solo debes pagar el envío de $245 MXN.</b></i></p>
              </div>}
          </div>
          <div className="back tip m-2" onClick={() => verQ(7)}>
            <div className="tip-q mb-1">
              <p className="purple-pink mb-0">Certificado oficial</p>
              {views.get(7) ? <BsChevronUp className="tip-icon Back-p-pink" />
                : <BsChevronDown className="tip-icon Back-p-pink" />}
            </div>
            {views.get(7) &&
              <div className="b-p-pink">
                <p className="mb-0 pt-2 animate__animated animate__fadeIn no-bold just">
                  Obtén un certificado con folio único verificado (fuv) por cada curso que completes al
                  100% dentro de nuestra plataforma.</p>
              </div>}

          </div>
          <div className="back tip m-2" onClick={() => verQ(8)}>
            <div className="tip-q mb-1">
              <p className="purple-pink mb-0">Envíos de producto Gratis</p>
              {views.get(8) ? <BsChevronUp className="tip-icon Back-p-pink" />
                : <BsChevronDown className="tip-icon Back-p-pink" />}
            </div>
            {views.get(8) &&
              <div className="b-p-pink">
                <p className="mb-0 pt-2 animate__animated animate__fadeIn no-bold just"><b>Obtén envíos gratis </b>
                  en compras superiores a $1,000.00 mx.</p>
              </div>}
          </div>
          <div className="back tip 
          m-2" onClick={() => verQ(9)}>
            <div className="tip-q mb-1">
              <p className="purple-pink mb-0">Rifa trimestral</p>
              {views.get(9) ? <BsChevronUp className="tip-icon Back-p-pink" />
                : <BsChevronDown className="tip-icon Back-p-pink" />}
            </div>
            {views.get(9) &&
              <div className="b-p-pink">
                <p className="mb-0 pt-2 animate__animated animate__fadeIn no-bold just">Rifa trimestral donde
                  <b> puedes ganar hasta 20,000 pesos</b> en premios.
                  <br /><i>(Cada mes inscrita en Gonvar+ recibes un boleto adicional) </i></p>
              </div>}
          </div>
          <span className="text-center my-2"><i>Más información</i></span>
        </div>
      </div>
    </PlanStyles>
  )
}

export default Mensual