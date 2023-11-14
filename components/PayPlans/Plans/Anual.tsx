import { useEffect, useState } from "react";

import { BsChevronDown, BsChevronUp } from "react-icons/bs";

import router from "next/router";

import { ANUAL_FORM, PREVIEW_PATH, PURCHASE_PATH, SIGNUP_PATH } from "../../../constants/paths";
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
const Anual = (props: IData) => {
  const [ver, setver] = useState(true)
  const { user } = props;
  const goToRoute = () => {
    router.push('/suscripcion-anual');
  }
  let today = new Date().getTime() / 1000;
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
        router.push({ pathname: PURCHASE_PATH, query: { type: 'subscription', frequency: 'anual', v: "3" } })
        // router.push({ pathname: ANUAL_FORM })
      }
      if (user.level === 0 && user.final_date > today) {
        router.push(PREVIEW_PATH)
      }
      if (user.level > 0 && user.final_date > today) {
        router.push(PREVIEW_PATH)
      }
      if (user.level > 0 && user.final_date < today) {
        router.push(PREVIEW_PATH)
      }
    }
    else {
      localStorage.setItem("anual", "true");
      router.push(SIGNUP_PATH)
    }
  }

  return (
    <PlanStyles>
      <div className="back plan-container">
        <div className="header">
          <div className="top-tab border Back-blue">
          </div>
          <div className="title b-blue mx-4 mt-3">
            <img src={gPlus} alt="Gonvar logo" className="mt-3 me-2" />
            <div>
              <p className="blue mb-0">
                Suscripción Gonvar+<br />
              </p>
              <h3 className="blue h1">Anual</h3>
            </div>

          </div>
          <div className="text-center my-4 tit-contain">
            <i className="save">Ahorras $2,011 MXN por año</i>
            <h2 className="h3 mb-0 size-sm">$3,497.00 MXN/año</h2>
            <span><i>Cargo automático anual</i></span>
          </div>
          <div className="d-flex justify-content-center mb-3">
            <button className="purple-button" onClick={goTo}>Comenzar plan<br /> Anual</button>
          </div>
        </div>
        <div className="main-body">

          <div className="break tip m-2" onClick={() => verQ(1)}>
            <div className="tip-q mb-1">
              <p className="blue m-0">Más de 65 cursos y 400 clases de uñas y belleza en linea</p>
              {views.get(1) ?
                <BsChevronUp className="tip-icon Back-blue" /> :
                <BsChevronDown className="tip-icon Back-blue" />}
            </div>
            {views.get(1) &&
              <div className="b-blue">
                <p className="mb-0 pt-2 animate__animated animate__fadeIn no-bold just">
                  <b>Cursos de uñas y belleza en línea,</b> con Instructores profesionales, niveles básicos y
                  avanzados, incluye reconocimientos y certificados.
                  <br /><i><b>Precio Real: $70,000 MXN</b></i>
                </p>
              </div>}
          </div>
          <div className="break tip m-2" onClick={() => verQ(10)}>
            <div className="break new-item">
              <p className="text">Nuevo </p>
            </div>
            <div className="tip-q mb-1">
              <p className="blue mb-0">Programa Nails Master con Certificación</p>
              {views.get(10) ?
                <BsChevronUp className="tip-icon Back-blue" /> :
                <BsChevronDown className="tip-icon Back-blue" />}
            </div>
            {views.get(10) &&
              <div className="b-blue">
                <p className="mb-0 pt-2 animate__animated animate__fadeIn no-bold just">
                  <b>Certificación</b> en aplicación de uñas acrílicas desde 0 a Profesional. Técnicas de Tips y Escultural incluídas.
                  <b> Precio Real: $6,719.00 MXN</b>
                </p>
              </div>}
          </div>
          <div className="break tip m-2" onClick={() => verQ(11)}>
            <div className="break new-item">
              <p className="text">Nuevo </p>
            </div>
            <div className="tip-q mb-1">
              <p className="blue mb-0">Acceso exclusivo a clases en vivo</p>
              {views.get(11) ?
                <BsChevronUp className="tip-icon Back-blue" /> :
                <BsChevronDown className="tip-icon Back-blue" />}
            </div>
            {views.get(11) &&
              <div className="b-blue">
                <p className="mb-0 pt-2 animate__animated animate__fadeIn no-bold just">
                  Una vez al mes recibe una clase en vivo con <b>instructores oficiales.</b> Resuelve tus dudas y sigue aprendiendo
                </p>
              </div>}
          </div>
          <div className="break tip m-2" onClick={() => verQ(2)}>
            <div className="tip-q mb-1">
              <p className="blue mb-0">Instructores Profesionales</p>
              {views.get(2) ?
                <BsChevronUp className="tip-icon Back-blue" /> :
                <BsChevronDown className="tip-icon Back-blue" />}
            </div>
            {views.get(2) &&
              <div className="b-blue">
                <p className="mb-0 pt-2 animate__animated animate__fadeIn no-bold just">
                  Todos <b>nuestros instructores son profesionales de la belleza,</b> asegurando que así
                  tendrás una educación de calidad bajo los mejores estándares de la industria.
                </p>
              </div>}
          </div>

          <div className="break tip m-2" onClick={() => verQ(3)}>
            <div className="tip-q mb-1">
              <p className="blue mb-0">Centro de recompensas</p>
              {views.get(3) ?
                <BsChevronUp className="tip-icon Back-blue" /> :
                <BsChevronDown className="tip-icon Back-blue" />}
            </div>
            {views.get(3) &&
              <div className="b-blue">
                <p className="mb-0 pt-2 animate__animated animate__fadeIn no-bold just">
                  Centro de Recompensas donde <b>ganas miles de pesos en productos y premios </b>
                  sólo por permanecer suscrita, concluir tus cursos y hacer tus tareas.
                </p>
              </div>}
          </div>

          <div className="break tip m-2" onClick={() => verQ(4)}>
            <div className="tip-q mb-1">
              <p className="blue mb-0">Revisión de prácticas y asesorías</p>
              {views.get(4) ?
                <BsChevronUp className="tip-icon Back-blue" /> :
                <BsChevronDown className="tip-icon Back-blue" />}
            </div>
            {views.get(4) &&
              <div className="b-blue">
                <p className="mb-0 pt-2 animate__animated animate__fadeIn no-bold just">
                  ¿Tienes duda en tus cursos? No te preocupes, <b>nuestro equipo esta para ayudarte </b>
                  y resolver cualquier duda que tengas. Además, <b>revisamos individualmente cada una de tus practicás, </b>
                  para que sigas mejorando.
                </p>
              </div>}
          </div>

          <div className="break tip m-2" onClick={() => verQ(5)}>
            <div className="tip-q mb-1">
              <p className="blue mb-0">Precio de Distribución con 40% de descuento</p>
              {views.get(5) ?
                <BsChevronUp className="tip-icon Back-blue" /> :
                <BsChevronDown className="tip-icon Back-blue" />}
            </div>
            {views.get(5) &&
              <div className="b-blue">
                <p className="mb-0 pt-2 animate__animated animate__fadeIn no-bold just">
                  <b>40% de descuento en todo el producto Gonvar.</b><br />
                  Sin compras mínimas. Compra con nosotros a un precio de distribución,
                  ahorra o vende en tu localidad.
                </p>
              </div>}
          </div>

          <div className="break tip m-2" onClick={() => verQ(6)}>
            <div className="tip-q mb-1">
              <p className="blue mb-0">Kits de producto Gratis</p>
              {views.get(6) ?
                <BsChevronUp className="tip-icon Back-blue" /> :
                <BsChevronDown className="tip-icon Back-blue" />}
            </div>
            {views.get(6) &&
              <div className="b-blue">
                <p className="mb-0 pt-2 animate__animated animate__fadeIn no-bold just">
                  <b>Recibe un kit gratis con diferentes productos cada mes, </b>
                  como acrílicos, geles, monómeros, adherentes, decoración y otros productos.<br />
                  <i><b>El kit de producto tiene valor de $700-$800 MXN, pero es un regalo sin costo.
                    Sólo debes pagar el envío de $245 MXN.</b></i>
                </p>
              </div>}
          </div>

          <div className="break tip m-2" onClick={() => verQ(7)}>
            <div className="tip-q mb-1">
              <p className="blue mb-0">Envíos de producto Gratis</p>
              {views.get(7) ?
                <BsChevronUp className="tip-icon Back-blue" /> :
                <BsChevronDown className="tip-icon Back-blue" />}
            </div>
            {views.get(7) &&
              <div className="b-blue">
                <p className="mb-0 pt-2 animate__animated animate__fadeIn no-bold just">
                  <b>Obtén envíos gratis</b> en compras superiores a $1,000.00 MXN.
                </p>
              </div>}
          </div>

          <div className="break tip m-2" onClick={() => verQ(8)}>
            <div className="tip-q mb-1">
              <p className="blue mb-0">Certificados oficiales</p>
              {views.get(8) ?
                <BsChevronUp className="tip-icon Back-blue" /> :
                <BsChevronDown className="tip-icon Back-blue" />}
            </div>
            {views.get(8) &&
              <div className="b-blue">
                <p className="mb-0 pt-2 animate__animated animate__fadeIn no-bold just">
                  Obtén un certificado con folio único verificado (fuv) por cada curso que
                  completes al 100% dentro de nuestra plataforma. Puedes obtener hasta 70 certificaciones.
                </p>
              </div>}
          </div>

          <div className="break tip m-2" onClick={() => verQ(9)}>
            <div className="tip-q mb-1">
              <p className="blue mb-0">Rifa cuatrimestral</p>
              {views.get(9) ?
                <BsChevronUp className="tip-icon Back-blue" /> :
                <BsChevronDown className="tip-icon Back-blue" />}
            </div>
            {views.get(9) &&
              <div className="b-blue">
                <p className="mb-0 pt-2 animate__animated animate__fadeIn no-bold just">
                  Rifa Cuatrimestal donde
                  <b> puedes ganar hasta 20,000 pesos</b> en premios.
                  <br /><i>(Cada mes inscrita en Gonvar+ recibes un boleto) </i></p>
              </div>}
          </div>
          <span className="text-center my-2"><i onClick={goToRoute}>Más información</i></span>
        </div>
      </div>
    </PlanStyles>
  )
}

export default Anual