

import { useEffect, useState } from "react";

import { BsChevronDown, BsChevronUp } from "react-icons/bs";

import { SuscriptionContain } from "./LandingNailsMaster.styled";

const news = "/images/landing_suscription/newsletter.png"
const pointWatsap = "/images/landing_suscription/point_at_button.png"
const watsapOut = "/images/landing_suscription/whatsapp_outline.png"
const mujer = "/images/landing_nails_master/mUJER.png"

let views = new Map<number, boolean>();
views.set(1, false);
views.set(2, false);
views.set(3, false);
views.set(4, false);
views.set(5, false);
views.set(6, false);
views.set(7, false);
views.set(8, false);

const LandingNailsMaster = () => {
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
    <SuscriptionContain>
      <div className="section mt-0">
        <div className="mt-3 fechas">
          <h4><b>Actualización 2023</b><br />
            Inicio: [x] de [x] del 2023</h4>
        </div>

        <div className="space">
          <h1 className="big-title"><b>Nail´s Master </b><br />
            <b className="light-p">Revolution</b></h1>
          <h2><b>Aprende a aplicar uñas </b><b className="p-pink">desde cero.</b></h2>
        </div>

        <div>
          {/* estrellas */}
          <h3 className="space"><b>(5) 7,378 opiniones</b></h3>
        </div>

        <h4><b>El curso de aplicación de uñas </b><b className="p-pink">más exitoso de Latinoámerica.<br />
          Más de 5,700 alumnas</b> <b>han aprendido con nosotros.</b></h4>

        <button className="space btn left-right">Comienza ahora <br />por $1,599.00 mxn</button>
      </div>


      <div className="info">
        <div className="info-top">
          <div className="text">
            <h1><b>Conviértete en profesional <br /> con nuestro programa,</b><br />
              <b className="subtitle p-pink">aprenderás a aplicar uñas de manera:</b>
            </h1>
            <div className="uñas">
              <div className="uñas-q">
                <div className={`uñas-q-container ${views.get(5) ? 'open' : ''}`} onClick={() => verQ(5)}>
                  <div className="q">
                    <h2><b>FUNCIONAL</b></h2>
                    {!!views.get(5) ?
                      <BsChevronUp className="icon" /> :
                      <BsChevronDown className="icon" />}
                  </div>
                  <div className="border-top">
                    <p><b>✅Logra aplicaciones </b><b className="p-pink">útiles y cómodas.</b></p>
                    <p><b>✅Aplicaciones con las que puedas realizar todas tus actividades de manera sencilla,
                      cómoda y con confianza, </b><b className="p-pink">sin riesgo a estropearlas o romperlas.</b></p>
                  </div>
                </div>
                <div className={`uñas-q-container ${views.get(7) ? 'open' : ''}`} onClick={() => verQ(7)}>
                  <div className="q">
                    <h2><b>SEGURA</b></h2>
                    {!!views.get(7) ?
                      <BsChevronUp className="icon" /> :
                      <BsChevronDown className="icon" />}
                  </div>
                  <div className="border-top">
                    <p><b className="p-pink">✅Aprende a realizar un diagnóstico inicial </b><b>para determinar si
                      puedes o no realizar una aplicación de uñas en sistema artificial.</b></p>
                    <p><b className="p-pink">✅Conoce todas las medidas de higiene y seguridad</b><b>en tu mesa de
                      aplicación.</b></p>
                    <p><b className="p-pink">✅Aprende a evitar hongos y enfermedades </b><b>en las uñas naturales
                      de tus clientas.</b></p>
                    <p><b>✅Aprende los</b><b className="p-pink">lineamientos de acomodo </b><b>de materiales para
                      evitar riesgos de derrame y quemaduras.
                      <i>(Prevención de accidentes)</i></b></p>
                    <p>✅<b className="p-pink">Aprende el uso correcto</b><b> de los materiales químicos y medidas
                      de protección dérmica y respiratoria.</b></p>
                  </div>
                </div>
              </div>
              <div className="uñas-q">
                <div className={`uñas-q-container ${views.get(6) ? 'open' : ''}`} onClick={() => verQ(6)}>
                  <div className="q">
                    <h2><b>ESTÉTICA</b></h2>
                    {!!views.get(6) ?
                      <BsChevronUp className="icon" /> :
                      <BsChevronDown className="icon" />}
                  </div>
                  <div className="border-top">
                    <p>✅<b>Logra aplicaciones </b><b className="p-pink">hermosas y detaladas.</b></p>
                    <p>✅<b> Aprende a realizar aplicaciones realmente bellas y con </b><b className="p-pink">
                      lineamientos europeos.</b></p>
                    <p>✅<b className="p-pink"> Conoce y domina las técnicas de limado de competencia, </b>
                      <b>para lograr aplicaciones con estructuras simétricas y con brillo</b>
                      <b className="p-pink"> de alto impacto.</b></p>
                  </div>
                </div>
                <div className={`uñas-q-container ${views.get(8) ? 'open' : ''}`} onClick={() => verQ(8)}>
                  <div className="q">
                    <h2><b>DURADERA</b></h2>
                    {!!views.get(8) ?
                      <BsChevronUp className="icon" /> :
                      <BsChevronDown className="icon" />}
                  </div>
                  <div className="border-top">
                    <p>✅<b>Logra aplicaciones </b><b className="p-pink">con duración de más de 21 días.</b></p>
                    <p>✅<b> Domina el </b><b className="p-pink">
                      cero desprendimiento.</b></p>
                    <p>✅<b className="p-pink"> Garantiza </b><b>que tus aplicaciones no se quiebren
                      o se caigan.</b></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <img src={mujer} className="img" />
        </div>
        <div className="info-cards">
          <h1>Aprende desde cero y <b className="p-pink">vive de tu pasion</b> <br /> por las uñas acrilicas</h1>
          <div>
            {/* card */}
          </div>
        </div>
      </div>


      <div>
        <div>
          {/* video */}
        </div>
        <div>
          <h2>Durante 3 meses podrás acceder a</h2>
          <h1>más de 40 clases</h1>

          <p>Además nuestro equipo estará disponible para ayudarte y resolver todas las dudas que tengas.</p>
          <p>Sin limites.</p>

          <button>Obtener acceso</button>
        </div>
      </div>


      <div>
        <div>
          <p><i>"Hago lo que me <br /> apasiona y disfruto <br /> enseñando a otras"</i></p>
          {/* imagen */}
        </div>
        <div>
          <h2>Te presentamos a</h2>
          <div>
            <h1>Arita Gonvar</h1>
            <p className="p-pink">Ella te guiará paso a paso en el programa Nails Master Revolution</p>

            <p><b>Instructora certificada</b> bajo estándares de aplicación de uñas artificiales por competencia</p>
            <p><b>Especialista en capacitación para principiantes,</b> estrucutra profesional en escultural
              y máster en técnicas y métodos de enseñanza teóricos-prácticos.</p>
            <p>Creadora de la técnica <b>"Cero Desprendimiento en 4 Pasos"</b> y co-fundadora de la academia
              de uñas <b>más grande de Latinoamerica.</b></p>
          </div>
          <p></p>
        </div>
      </div>


      <div>
        <h2>Con <b>Nails Master Revolution</b> te daremos <b>beneficios exclusivos</b> y tendras acceso
          a la comunidad de estudiantes y profesionales de la industria de las uñas <b>más grande
            de Latinoamérica.</b></h2>

        <div>
          <h2>Beneficios exclusivos</h2>
          <div>
            <div>
              <div>
                <p>3 meses de acceso a <b>Nails Master Revolution</b></p>
              </div>
              <div>
                <p>Más de 40 lecciones completas,<b> actualizadas al 2023</b></p>
              </div>
              <div>
                <p>Revision de practicas y <b>asesorías ilimitadas</b></p>
              </div>
              <div>
                <p><b>Cusro definitivo</b> con las técnicas más solicitadas</p>
              </div>
              <div>
                <p><b>Certificado oficial</b> al terminar el curso, con folio único vrificado (FUV)</p>
              </div>
            </div>
            <div>
              <div>
                <p><b>instructora certificada</b></p>
              </div>
              <div>
                <p><b>Biblioteca exclusiva</b></p>
              </div>
              <div>
                <p><b>Soporte prioritario</b> a dudas de tus clases</p>
              </div>
              <div>
                <p>Programa enfocado al <b>Emprendimiento</b></p>
              </div>
              <div>
                <p><b>Horarios flexible,</b> nuestro curso es 100% online</p>
              </div>
            </div>
          </div>
        </div>
      </div>


      <div>
        <h2>Todo lo que incluye este incrible programa</h2>
        <p>Para complementar tu aprendizaje, al inscribirte a Nails MasterRevolution
          obtendrás cuadernillos, manuales y textos que te ayudarán en tu carrera de Nail Artist.</p>

        <div>
          <p>Curso | <b>Costo real: $2,399.00 mxn</b></p>
        </div>
        <div>
          <p><b>Certificado</b> fisico y digital (no incluye envío) | <b>Costo real: $490.00 mxn</b></p>
        </div>
        <div>
          <p><b>Comunidad exclusiva</b> en What'sApp | <b>Costo real: $239.00 mxn</b></p>
        </div>
        <div>
          <p>Manual <b>La Perla Perfecta</b> | <b>Costo real: $297.00 mxn</b></p>
        </div>
        <div>
          <p>Manual <b>Química del Producto nivel básico</b> | <b>Costo real: $497.00 mxn</b></p>
        </div>
        <div>
          <p>Revista Gonvar: <b>10 diseños increibles</b> | <b>Costo real: $649.00 mxn</b></p>
        </div>
        <div>
          <p>Manual <b>Obtén tus primeros clientes</b> | <b>Costo real: $649.00 mxn</b></p>
        </div>
        <div>
          <p>Manual <b>Los secretos del gel semipermanente</b> | <b>Costo real: $649.00 mxn</b></p>
        </div>
        <div>
          <p>Manual <b>Cómo obtener un documento oficial que respalde mi vocavión.</b>
            <b>Costo real: $850.00 mxn</b></p>
        </div>
      </div>


      <div>
        {/* manitas */}
        <h1>Costo total real: <del>$6,719.00 mxn</del></h1>
        <h1>Precio de Lanzamiento con beca</h1>
        <h1>Sólo $1,599.00 mxn</h1>
        <p>Válido para las primeras 500 personas</p>
        <h2>Quedan [x] lugares</h2>
        <button>¡Quiero comenzar<br /> ahora!</button>
        {/* morra */}
      </div>


      <div>
        <div>
          <h1>Certificado oficial</h1>
          <h2>En Gonvar cada uno de nuestros certificados cuenta con <b>FUV <i>(Folio único verificado)</i></b>
            que autentifica y válida que tomaste el curso con nosotros.</h2>
        </div>
        <div>
          {/* img */}
        </div>
      </div>


      <div>
        <h1>CENTRO DE RECOMPENSAS</h1>
        {/* cards */}
        <div>

        </div>
        <div>
          <div>

            <div>

            </div>

            <div>

            </div>

            <div>

            </div>

          </div>
          <div>

            <div>

            </div>

            <div>

            </div>

            <div>

            </div>

          </div>
        </div>
      </div>


      <div>
        {/* experiencas */}
      </div>


      <div>
        <h1>TEMARIO</h1>
        <p>Conoce todo lo que aprenderás en <b>Nail Master Revolution</b></p>
        <div>
          <div>
            <div>
              <p><b>1. ¿Cómo funciona la plataforma?</b></p>
              <p><b className="p-pink">Lección 1.</b> ¿Cómo funciona la plataforma?.</p>
              <p><b className="p-pink">Lección 2.</b> Entrega de Prácticas y Certificados</p>
            </div>
            <div>
              <p><b>2. Bienvenida a Nails Master Revolution</b></p>
              <p><b className="p-pink">Lección 1.</b> Presentación y Bienvenida.</p>
              <p><b className="p-pink">Lección 2.</b> Objetivos y Perfil de Egreso.</p>
              <p><b className="p-pink">Lección 3.</b> ¿Cómo evaluaremos tu aprendizaje?</p>
            </div>
            <div>
              <p><b>3. Productos y Herramientas Para Comenzar</b></p>
              <p><b className="p-pink">Lección 1.</b> Herramientas Necesarias Para la Aplicación de
                Uñas Acrílicas.</p>
              <p><b className="p-pink">Lección 2.</b> Productos necesarios para la aplicación de uñas
                acrílicas.</p>
              <p><b className="p-pink">Lección 3.</b> Pincel Gonvar Nails 100% Kolinsky.</p>
              <p><b className="p-pink">Lección 4.</b> Herramientas Eléctricas y Mobiliario.</p>
              <p><b className="p-pink">Lección 5.</b> Dónde Comprar Tus Productos.</p>
            </div>
            <div>
              <p><b>4. Fundamentos Teóricos para la Aplicación de Uñas Acrílicas </b></p>
              <p><b className="p-pink">Lección 1.</b> Morfología de la Uña Natural.</p>
              <p><b className="p-pink">Lección 2.</b> Partes de la Uña Artificial.</p>
              <p><b className="p-pink">Lección 3.</b> Diferencia entre Enfermedades, Alteraciones e
                Infecciones en las Uñas Naturales.</p>
              <p><b className="p-pink">Lección 4.</b> Alteraciones de las Uñas Naturales.</p>
              <p><b className="p-pink">Lección 5.</b> Cero Desprendimiento: Teoría Técnica 25*4 y
                Preparación de la Uña Natural.</p>
            </div>
          </div>
          <div>
            <div>
              <p><b>5. Comportamiento de los Productos Químicos</b></p>
              <p><b className="p-pink">Lección 1.</b> La perla Perfecta 1.</p>
              <p><b className="p-pink">Lección 2.</b> La perla Perfecta 2.</p>
              <p><b className="p-pink">Lección 3.</b> La perla Perfecta 3.</p>
              <p><b className="p-pink">Lección 4.</b> La perla Perfecta 4.</p>
              <p><b className="p-pink">Lección 5.</b> La perla Perfecta 5.</p>
              <p><b className="p-pink">Lección 6.</b> La perla Perfecta 6.</p>
            </div>
            <div>
              <p><b>6. Práctica en Mano Real de Técnicas y Diseños Más Comerciales</b></p>
              <p><b className="p-pink">Lección 1.</b> ¿Cómo medir el Tip?</p>
              <p><b className="p-pink">Lección 2.</b> Punta Coffin: Aplicación con Técnica Perfect Natural.</p>
              <p><b className="p-pink">Lección 3.</b> Punta Coffin: Limado.</p>
              <p><b className="p-pink">Lección 4.</b> Punta Cuadrada con Curvatura C: Aplicación con
                técnica Full Cover.</p>
              <p><b className="p-pink">Lección 5.</b> Punta Cuadrada con Curvatura C: Limado.</p>
              <p><b className="p-pink">Lección 6.</b> Punta Cuadrada con Curvatura C: Finalizado con
                Esmalte en Gel.</p>
              <p><b className="p-pink">Lección 7.</b> Punta Almendra Clásica: Aplicación con Técnica
                de Encapsulado.</p>
              <p><b className="p-pink">Lección 8.</b> Punta Almendra Clásica: Limado.</p>
              <p><b className="p-pink">Lección 9.</b> Almendra Clásica: Finalizado.</p>
              <p><b className="p-pink">Lección 10.</b> Aplicación de Francés para Uñas con Onicofagia.</p>
              <p><b className="p-pink">Lección 11.</b> Francés: Limado.</p>
              <p><b className="p-pink">Lección 12.</b> Francés: Finalizado.</p>
              <p><b className="p-pink">Lección 13.</b> Extra: Drill.</p>
              <p><b className="p-pink">Lección 14.</b> Certificación.</p>
            </div>
          </div>
        </div>
        <button>Consulta tu lista de materiales a utilizar</button>
      </div>


      <div>
        <h1>Disfruta tus clases <br />
          <b className="p-pink">desde cualquier dispositivo</b></h1>
      </div>

      <div className="spacing all-center">
        <div className="text-end m-0">
          <h2>¿Tienes alguna duda?</h2>
          <h2 className="p-pink">Nuestro equipo está para ayudarte.</h2>
        </div>
        <div className="m-0 position-relative d-flex">
          <img src={pointWatsap} className="" />
          <div className="m-0 watsap-button all-center">
            <img src={watsapOut} className="me-3" />
            <p className="my-1 bold">Contacta con<br /> un agente</p>
          </div>
        </div>
      </div>

      <div className="spacing">
        <h2 className="p-pink">Preguntas Frecuentes</h2>
        <div className="faq">
          <div className="all-center">
            <div className={`q-container ${views.get(1) ? 'max' : 'min'}`} onClick={() => verQ(1)}>
              <div className={`q ${views.get(1) && 'open-q'}`}>
                <p className={`title`}>¿Entregan reconocimiento?</p>
                {views.get(1) ?
                  <BsChevronUp className="icon" /> : <BsChevronDown className="icon" />}
              </div>

              <div className='border-top'>
                <p className="a">¡Claro!<br />Cada curso terminado, con prácticas aprobadas,
                  te brinda un certificado con un folio único veificado para que puedas respaldar
                  tus conocimientos.</p>
              </div>
            </div>
          </div>

          <div className="all-center">
            <div className={`q-container ${views.get(2) ? 'max' : 'min'}`} onClick={() => verQ(2)}>
              <div className={`q ${views.get(2) && 'open-q'}`}>
                <p className={`title`}>¿Qué metodos de pago puedo usar para pagar mi suscripción?</p>
                {views.get(2) ?
                  <BsChevronUp className="icon" /> : <BsChevronDown className="icon" />}
              </div>

              <div className="border-top">
                <p className="a">Nuestros métodos de pago son súper cómodos.<br />
                  Si deseas pagar por mes, puedes hacerlo con cualquier tarjeta de crédito o débito.
                  <i>(El cobro se realiza de manera automática mes con mes por la cantidad
                    de $149 mxn u 8 dls.)</i><br />
                  Si prefieres pagar en transferencia, deposito en Oxxo o Paypal, está disponible la anualidad,
                  $1599 por todo un año de aprendizaje y aventura. <i>(Pagando anualidad no se realiza
                    ningún cobro adicional por un año).</i></p>
              </div>
            </div>
          </div>

          <div className="all-center">
            <div className={`q-container ${views.get(3) ? 'max' : 'min'}`} onClick={() => verQ(3)}>
              <div className={`q ${views.get(3) && 'open-q'}`}>
                <p className={`title`}>¿Puedo cancelar en cualquier momento?</p>
                {views.get(3) ?
                  <BsChevronUp className="icon" /> : <BsChevronDown className="icon" />}
              </div>

              <div className="border-top">
                <p className="a">Así es, tú eliges libremente cuánto tiempo deseas aprender y gozar de todos nuestros beneficios.<br />
                  Todos los descuentos a los que tienes derecho se pierden al momento de cancelar.</p>
              </div>
            </div>
          </div>

          <div className="all-center">
            <div className={`q-container ${views.get(4) ? 'max' : 'min'}`} onClick={() => verQ(4)}>
              <div className={`q ${views.get(4) && 'open-q'}`}>
                <p className={`title`}>¿Puedo inscribirme desde cualquier pais?</p>
                {views.get(4) ?
                  <BsChevronUp className="icon" /> : <BsChevronDown className="icon" />}
              </div>

              <div className="border-top">
                <p className="a">Si, nuestra plataforma está diseñada para poder utilizarse desde
                  cualquier lugar del mundo que cuente con acceso a  internet y puedes disfrutar desde un
                  celular, tableta electrónica o computadora.</p>
              </div>
            </div>
          </div>

        </div>
      </div>

      <div className="footer-footer all-center">
        <div className="inside-footer">
          <div className="info">
            <h1>Suscríbete a nuestro Newsletter</h1>
            <p>Mantente actualizado en temas de la industria de la
              belleza y futuras promociones de Gonvar.</p>
            <div className="email-send m-0">
              <input className="email-input" placeholder="Escribe tu e-mail"></input>
              <button className="email-button">Suscribirme</button>
            </div>
            <div className="email-send m-0 mt-2 p-0">
              <button className="email-button ">Visita nuestro blog</button>
            </div>

          </div>
          <img className="img" src={news} />
        </div>
      </div>


    </SuscriptionContain>
  )
}
export default LandingNailsMaster;