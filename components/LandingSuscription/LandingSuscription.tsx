

import { FAQ } from "../PayPlans/FAQ/FAQ";
import { SuscriptionContain } from "./LandingSuscription.styled";

const cursoBackground = "/images/landing_suscription/Rectangle 684.png"
const gonvar = "/images/landing_suscription/gonvar cuad 1.png"
const plus = "/images/landing_suscription/gonvar cuad 2.png"
const backPpal = "/images/landing_suscription/background principal.png"
const ubi = "/images/landing_suscription/ubicacion.png"
const instructores = "/images/landing_suscription/instructores.png"
const certificadoMujer = "/images/landing_suscription/mujer certificado.png"
const asesoriaTel = "/images/landing_suscription/phone.png"
const miniLogo = "/images/landing_suscription/gonvarLogo.png"
const envio = "/images/landing_suscription/envio gratis.png"
const boleto = "/images/landing_suscription/boleto.png"
const descuento = "/images/landing_suscription/descuento.png"
const regalo = "/images/landing_suscription/kits.png"
const certificado = "/images/landing_suscription/certificado.png"
const star = "/images/landing_suscription/puntos.png"
const envioMujer = "/images/landing_suscription/mujer002 1.png"
const chica = "/images/landing_suscription/chica.png"
const manosPrecio = "/images/landing_suscription/manos precio.png"
const rewards = "/images/landing_suscription/rewardCircle.png"
const timeReward = "/images/landing_suscription/time.png"
const timeRewardOut = "/images/landing_suscription/time_outline.png"
const pointReward = "/images/landing_suscription/star.png"
const pointRewardOut = "/images/landing_suscription/star_outline.png"
const awardReward = "/images/landing_suscription/award.png"
const awardRewardOut = "/images/landing_suscription/award_outline.png"
const testimonios = "/images/landing_suscription/Testimonios.png"
const inspo = "/images/landing_suscription/inspo.png"
const pointWatsap = "/images/landing_suscription/point_at_button.png"
const watsapOut = "/images/landing_suscription/whatsapp_outline.png"


const LandingSuscription = () => {
  const mensual = "$149 mxn/mes"
  const anual = "$1,599 mxn/anual"
  return (
    <SuscriptionContain>
      <div className="spacing">
        <img src={gonvar} className="gonvarplus" />
        {/* <img src={backPpal} className="background-images" /> */}

        <h1>La suscripción anual que te permite ver <b className="p-pink">cientos <br /> de cursos</b> de uñas y belleza en línea.</h1>

        <div>
          <h2 className="bold">¡Accede a <b className="p-pink">más de 60 cursos</b> hoy mismo!</h2>
          <h2 className="bold">Sólo {anual}</h2>
        </div>

        <button className="btn left-right">¡Comenzar ahora!</button>
      </div>

      <div className="spacing">
        <div className="spacing">
          <h2 className="bold">En esta plataforma encontrarás</h2>
          <h1><b className="p-pink">MÁS DE 60 CURSOS DE UÑAS Y BELLEZA EN LÍNEA</b></h1>
          <h2 className="bold">donde aprenderás desde cero y paso a paso.</h2>
        </div>

        <div className="group-buttons">
          <div className="center">
            <button>Tips</button>
            <button>Escultural</button>
            <button>Mano Alzada</button>
            <button>Stamping</button>
            <button>3D</button>
          </div>
          <div className="center">
            <button>Micropintura</button>
            <button>Manicura</button>
            <button>Maquillaje</button>
            <button>Pedicura</button>
          </div>
        </div>
        <div className="row d-flex justify-content-center">
          <div className="responsive-unset col-lg-4 col-md-6 col-sm-12">
            <img src={cursoBackground} alt="Curso" />
            <p><b className="p-pink">Nombre del curso </b><br />
              <i>Nombre del instructor</i></p>
          </div>

          <div className="responsive-unset col-lg-4 col-md-6 col-sm-12">
            <img src={cursoBackground} alt="Curso" />
            <p><b className="p-pink">Nombre del curso </b><br />
              <i>Nombre del instructor</i></p>
          </div>

          <div className="responsive-unset col-lg-4 col-md-6 col-sm-12">
            <img src={cursoBackground} alt="Curso" />
            <p><b className="p-pink">Nombre del curso </b><br />
              <i>Nombre del instructor</i></p>
          </div>
        </div>
        <button className="btn left-right mb-3">¡Comenzar ahora!</button>
        <h5 className="p-pink"><i>Y aprende muchas otras técnicas sobre imagen personal.</i></h5>
      </div>


      <div>
        <img src={ubi} />
        <h1 className="big-title">NO IMPORTA TU UBICACIÓN</h1>
        <h2>Disfruta de clases en línea pregrabadas en alta definición, aprende a tu ritmo,
          <br /><b className="p-pink">desde cualquier pais, donde quieras y a la hora que quieras.</b></h2>
      </div>


      <div className="spacing">
        <h1 className="big-title"><b className="p-pink">¡Nunca te dejaremos sola, </b><br />en tu
          proceso de aprendizaje!</h1>
        <img src={instructores} className="spacing" />
        <h2 className="bold">Los cursos son impartidos por <b className="p-pink">instructores profesionales
          y certificados,</b><br /> que estarán guiándote paso a paso, durante tu aprendizaje.</h2>
        <button className="btn up-down mt-5">Quiero comenzar<br /> hoy mismo</button>
      </div>


      <div className="spacing">
        <h1>Nuestra suscripción cuneta con <br />
          <b className="p-pink">cursos de diferentes grados de dificultad,</b><br />
          desde principiantes hasta niveles más avanzados.</h1>

        {/* difficulties */}

        <h2 className="fst-italic">No importa si vas comenzando o si ya tienes conocimientos, <br />
          te aseguramos que tenemos un curso para ti.</h2>
      </div>


      <div className="spacing">
        <h2 className="bold">Además, en la plataforma encontrarás diferentes</h2>
        <h1 className="big-title p-pink">Líneas de aprendizaje</h1>

        {/* lineas de aprendizaje */}

        <h2 className="bold">Así tendrás la oportunidad de <br /><b className="p-pink">aprender desde
          lo básico hasta convetirte en Master.</b></h2>
      </div>


      <div className="spacing d-flex text-start w-75">
        <img src={certificadoMujer} className="mx-5" />
        <div className="w-50 pt-5">
          <h1 className="p-pink big-title mb-4">Certificado FUV</h1>
          <h2 className="bold mb-4">Con <b className="p-pink">Gonvar+</b> podrás enviar tus prácticas para revisión y al aprobarlas,
            <b className="p-pink">obtendrás la certificación</b> correspondiente al curso que hayas tomado.</h2>
          <h2 className="bold">Te entregaremos un <b className="p-pink"> certificado oficial de la marca, que cuenta con un FUV
            <i>(folio único verificado).</i></b></h2>
        </div>

      </div>


      <div className="spacing d-flex w-75">
        <div className="text-end">
          <h1>¡Obtén <b className="p-pink">asesorías personalizadas<br /></b> y conviértete en una experta <br />
            en uñas y belleza!</h1>
          <h3 className="bold">Mejora tu proceso de aprendizaje con nuestras
            <b className="p-pink"> asesorías individuales e ilimitadas
              con nuestros instructores certificados.</b> Aprende de manera correcta y alcanza tus
            metas con confianza.</h3>
          <div className="text-center">
            <button className="btn up-down">Comienza ahora<br /> por {anual}</button>
          </div>
        </div>
        <img src={asesoriaTel} />
      </div>


      <div className="spacing text-start w-75">
        <div className="d-flex justify-content-center">
          <img src={miniLogo} className="mx-3 miniLogo" />
          <h1 className="text-start">Recibe <b className="p-pink">beneficios, contenido exclusivos<br /> y recompensas</b> con tu suscripción</h1>
        </div>
        <div className="m-0 d-flex">
          <div className="m-0">
            <div className="list">
              <img src={envio} className="me-3" />
              <h3><b className="p-pink">Envío gratis</b> de productos en compras superiores a $1,000.00 mx</h3>
            </div>

            <div className="list">
              <img src={boleto} className="me-3" />
              <h3>Por cada mes dentro, recibes un boleto acumulable más para el<br /> <b className="p-pink">sorteo trimestral donde podrás ganas hasta $20,000.00</b></h3>
            </div>

            <div className="list">
              <img src={descuento} className="me-3" />
              <div className="m-0">
                <h3><b className="p-pink">20% de descuento</b> en productos a partir del 3° mes</h3>
                <h3><b className="p-pink">40% de descuento</b> en productos a partir del 6° mes</h3>
              </div>
            </div>

            <div className="list">
              <img src={regalo} className="me-3" />
              <h3>Envíos de <b className="p-pink">Kits de producto de regalo. </b>
                <i className="subtitle">(Sólo pagarás envio)</i></h3>
            </div>

            <div className="list">
              <img src={certificado} className="me-3" />
              <h3><b className="p-pink">Certificaión oficial de la marca</b> por cada curso que completes.</h3>
            </div>

            <div className="list">
              <img src={star} className="me-3" />
              <div className="m-0">
                <h3><b className="p-pink">Sistema de puntos acumulables</b> que podrás cambiar por premios.</h3>
                <h3>Cada tarea, clase y curso aprobados genera puntos.</h3>
              </div>
            </div>
          </div>
          <div className="right-img">
            <img src={envioMujer} />
          </div>
        </div>

      </div>

      <div className="spacing d-flex">
        <img src={chica} className="w-25 ms-5" />
        <div className="m-0">
          <h2 className="red bolder">Costo total real: <del>$74,719.00 mxn</del></h2>
          <h1 className="p-pink bolder">Más de 60 cursos completso</h1>
          <h1 className="green bolder">Sólo {anual}</h1>
          <button className="btn left-right mt-5">¡Quiero comenzar <br />ahora</button>
        </div>
        <img src={manosPrecio} />
      </div>


      <div className="spacing">
        <div className="m-0 align-items-center d-flex justify-content-center">
          <img src={rewards} className="me-3" />
          <h2>CENTRO DE <b>RECOMPENSAS</b></h2>
        </div>

        <div className="card-container">
          <div className="reward-card">
            <div className="all-center">
              <img src={pointReward} className="title-img" />
              <img src={pointRewardOut} className="title-img" />
            </div>
            <p><b className="p-pink"><i>Por puntaje</i></b><br /></p>
            <p className="bold m-5">Cada tarea aprobada, clase o curso terminado,
              te dará puntos que puedes canjear por productos Gonvar.</p>
          </div>

          <div className="reward-card">
            <div className="all-center">
              <img src={timeReward} className="title-img" />
              <img src={timeRewardOut} className="title-img" />
            </div>
            <p><b className="teal"><i>Por tiempo </i></b><br /></p>
            <p className="bold m-5">Por cada mes que permanezcas suscrita, obtendrás nuevos beneficios y
              mejores descuentos en nuestros productos.</p>
          </div>

          <div className="reward-card">
            <div className="all-center">
              <img src={awardReward} className="title-img" />
              <img src={awardRewardOut} className="title-img" />
            </div>
            <p><b className="blue"><i>Certificados </i></b><br /></p>
            <p className="bold m-5">Recibe un certificado oficial de la marca con un Folio Único Verificado (FUV)
              por cada curso completo que termines.</p>
          </div>
        </div>

        <h5>Gracias a nuestro sistema de puntos, beneficios y certificados acumulables, <br />
          <b className="p-pink bold">puedes ganar miles de pesos en productos y premios</b><br />
          sólo por <b>permanecer suscrita, concluir tus cursos y hacer tus tareas.</b></h5>
      </div>


      <div className="spacing">
        <h1>Más de 45,000 alumnas</h1>
        <div className="card-container">
          <div className="reward-card">
            <img src={testimonios} />
          </div>
          <div className="reward-card">
            <img src={testimonios} />
          </div>
          <div className="reward-card">
            <img src={testimonios} />
          </div>
        </div>
      </div>


      <div className="spacing">
        <h1 className="p-pink big-title">¿Necesitas Inspiración?</h1>
        <h3 className="bold my-5">Si no sabes que diseños aplicar a tus clientas, <br /> descarga nuestro catálogo completo con más de <b className="p-pink">400 diseños ya disponibles.</b></h3>
        <img src={inspo} />
        <h3 className="bold my-5">Además, <b className="p-pink">aprende a hacer todos estos diseños</b> en nuestros más de 60 cursos.</h3>
        <div className="all-center">
          <div className="email-send m-0">
            <input className="email-input" placeholder="Escribe tu e-mail"></input>
            <button className="email-button">Envíame el catalogo</button>
          </div>
        </div>
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
        <div className="m-5 px-5 faq-bold d-flex justify-content-center">
          <FAQ />
        </div>
      </div>



      {/* footer footer */}
    </SuscriptionContain >
  )
}
export default LandingSuscription;