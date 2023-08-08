import { useEffect, useState } from "react";

import { BsChevronDown, BsChevronUp } from "react-icons/bs";

import router from "next/router";

import { LESSON_PATH, NAILS_FORM, PREVIEW_PATH, PURCHASE_PATH, SIGNUP_PATH } from "../../../constants/paths";
import { IUser } from "../../../interfaces/IUserData";
import { PlanStyles } from "./Plans.styled";

const gStar = "/images/pay_plans/star green.png"
let views = new Map<number, boolean>();
views.set(1, false);
views.set(2, false);
views.set(3, false);
views.set(4, false);
views.set(5, false);
views.set(6, false);
views.set(7, false);
views.set(8, false);

interface IData {
  user: IUser;
}
const Individual = (props: IData) => {
  const [ver, setver] = useState(true)
  const { user } = props;

  let today = new Date().getTime() / 1000;
  const verQ = (q: any) => {
    setver(!ver)
    if (views.get(q)) {
      views.set(q, false)
    } else {
      views.set(q, true)
    }
  }
  const goToRoute = () => {
    router.push('/nails-master');
  }
  useEffect(() => {

  }, [setver])



  const goTo = () => {
    if (user.id) {
      let tempCourse = user.user_courses.filter((x) => x.course_id === 30)
      if (tempCourse.length > 0 && tempCourse[0].final_date > today) {
        router.push({
          pathname: PREVIEW_PATH
        });
      }
      if ((tempCourse.length > 0 && tempCourse[0].final_date < today) || tempCourse.length === 0) {
        // router.push({ pathname: PURCHASE_PATH, query: { type: 'course', id: 30 } })
        router.push({ pathname: NAILS_FORM })
      }
    } else {
      localStorage.setItem("nailMaster", "true");
      router.push(SIGNUP_PATH)
    }
  }

  return (
    <PlanStyles>
      <div className="break plan-container">
        <div className="header">
          <div className="top-tab border Back-green">
          </div>
          <div className="title b-green mx-4 mt-4">
            <img src={gStar} alt="Gonvar logo" className="mt-3 me-2" />
            <div className="mt-2">
              <h3 className="green h5 mb-0"><b>Nails Master Revolution</b></h3>
              <p className="green">
                Curso Individual
              </p>
            </div>
          </div>
          <div className="text-center my-4">
            <h2 className="h3 mb-0">$1,599.00 MXN</h2>
            <span><i>Único pago</i></span>
          </div>
          <div className="d-flex justify-content-center mb-3">
            <button className="purple-button" onClick={goTo}>Comenzar ahora</button>
          </div>
        </div>
        <div className="main-body">

          <div className="back tip m-2" onClick={() => verQ(1)}>
            <div className="tip-q mb-1">
              <p className="green m-0">3 meses de acceso a Nails Master Revolution</p>
              {views.get(1) ? <BsChevronUp className="tip-icon Back-green" />
                : <BsChevronDown className="tip-icon Back-green" />}
            </div>
            {views.get(1) &&
              <div className="b-green">
                <p className="mb-0 pt-2 animate__animated animate__fadeIn no-bold just">
                  Obtén acceso al curso <b>Nail Masters 2.0 durante 3 meses, </b>
                  con <b>más de 40 lecciones</b> para ti.
                </p>
              </div>}
          </div>

          <div className="back tip m-2" onClick={() => verQ(2)}>
            <div className="tip-q mb-1">
              <p className="green mb-0">Más de 40 lecciones</p>
              {views.get(2) ? <BsChevronUp className="tip-icon Back-green" />
                : <BsChevronDown className="tip-icon Back-green" />}
            </div>
            {views.get(2) &&
              <div className="b-green">
                <p className="mb-0 pt-2 animate__animated animate__fadeIn no-bold just">
                  <b>Inscríbete </b>y obtén acceso a más de 40 lecciones.
                </p>
              </div>}
          </div>

          <div className="back tip m-2" onClick={() => verQ(3)}>
            <div className="tip-q mb-1">
              <p className="green mb-0">Curso definitivo de Tips</p>
              {views.get(3) ? <BsChevronUp className="tip-icon Back-green" />
                : <BsChevronDown className="tip-icon Back-green" />}
            </div>
            {views.get(3) &&
              <div className="b-green">
                <p className="mb-0 pt-2 animate__animated animate__fadeIn no-bold just">
                  <b>Aprende la técnica más solicitada en la industria, </b>de una manera fácil y rápida.
                </p>
              </div>}
          </div>

          <div className="back tip m-2" onClick={() => verQ(4)}>
            <div className="tip-q mb-1">
              <p className="green mb-0">Revisión de prácticas y asesorías ilimitadas</p>
              {views.get(4) ? <BsChevronUp className="tip-icon Back-green" />
                : <BsChevronDown className="tip-icon Back-green" />}
            </div>
            {views.get(4) &&
              <div className="b-green">
                <p className="mb-0 pt-2 animate__animated animate__fadeIn no-bold just">
                  ¿Tienes duda en tus cursos? No te preocupes, <b>nuestro equipo esta para ayudarte </b>
                  y resolver cualquier duda que tengas. Además, <b>revisamos individualmente cada una de tus prácticas, </b>
                  para que sigas mejorando.
                </p>
              </div>}
          </div>

          <div className="back tip m-2" onClick={() => verQ(5)}>
            <div className="tip-q mb-1">
              <p className="green mb-0">Retroalimentación de tus tareas</p>
              {views.get(5) ? <BsChevronUp className="tip-icon Back-green" />
                : <BsChevronDown className="tip-icon Back-green" />}
            </div>
            {views.get(5) &&
              <div className="b-green">
                <p className="mb-0 pt-2 animate__animated animate__fadeIn no-bold just">
                  <b>Revisamos a profundidad cada una de tus tareas </b>
                  y te damos retroalimentación para que no dejes de aprender.
                </p>
              </div>}
          </div>

          <div className="back tip m-2" onClick={() => verQ(6)}>
            <div className="tip-q mb-1">
              <p className="green mb-0">Programa de emprendimiento</p>
              {views.get(6) ? <BsChevronUp className="tip-icon Back-green" />
                : <BsChevronDown className="tip-icon Back-green" />}
            </div>
            {views.get(6) &&
              <div className="b-green">
                <p className="mb-0 pt-2 animate__animated animate__fadeIn no-bold just">
                  Un programa enfocado en emprendimiento <b>para comenzar tu propio negocio.</b>
                </p>
              </div>}
          </div>

          <div className="back tip m-2" onClick={() => verQ(7)}>
            <div className="tip-q mb-1">
              <p className="green mb-0">Certificado oficial</p>
              {views.get(7) ? <BsChevronUp className="tip-icon Back-green" />
                : <BsChevronDown className="tip-icon Back-green" />}
            </div>
            {views.get(7) &&
              <div className="b-green">
                <p className="mb-0 pt-2 animate__animated animate__fadeIn no-bold just">
                  Al finalizar tu curso, obtén un <b>certificado oficial</b> de la marca.
                </p>
              </div>}
          </div>

          <div className="back tip m-2" onClick={() => verQ(8)}>
            <div className="tip-q mb-1">
              <p className="green mb-0">Biblioteca exclusiva</p>
              {views.get(8) ? <BsChevronUp className="tip-icon Back-green" />
                : <BsChevronDown className="tip-icon Back-green" />}
            </div>
            {views.get(8) &&
              <div className="b-green">
                <p className="mb-0 pt-2 animate__animated animate__fadeIn no-bold just">
                  <b>Tendrás acceso a nuestra biblioteca exclusiva, </b>
                  con todos los archivos que necesitarás para avanzar en tu carrera de aplicadora de uñas.
                </p>
              </div>}
          </div>
          <span className="text-center my-2"><i onClick={goToRoute}>Más información</i></span>
        </div>
      </div>
    </PlanStyles>
  )
}

export default Individual