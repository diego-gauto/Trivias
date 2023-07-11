
import { useEffect, useState } from "react";

import { BsChevronDown, BsChevronUp } from "react-icons/bs";

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
const lineaMaq = "/images/landing_suscription/maquillaje.png"
const lineaUñas = "/images/landing_suscription/est_uñas.png"
const lineaArteU = "/images/landing_suscription/art_uñas.png"
const lineaDif = "/images/landing_suscription/Line dif.png"
const muyFacil = "/images/landing_suscription/muy facil.png"
const facil = "/images/landing_suscription/facil.png"
const intermedio = "/images/landing_suscription/intermedio.png"
const avanzado = "/images/landing_suscription/avanzado.png"
const master = "/images/landing_suscription/master.png"
const rewardBack = "/images/landing_suscription/recompensas_back.png"
const news = "/images/landing_suscription/newsletter.png"
const ubiG1 = "/images/landing_suscription/ubicacion_ghost_1.png"
const ubiG2 = "/images/landing_suscription/ubicacion_ghost_2.png"
const ubiG3 = "/images/landing_suscription/ubicacion_ghost_3.png"
const certifB1 = "/images/landing_suscription/back_certif_1.png"
const certifB2 = "/images/landing_suscription/back_certif_2.png"
const certifB3 = "/images/landing_suscription/back_certif_3.png"
const certifB4 = "/images/landing_suscription/back_certif_4.png"
const goldStar = "/images/landing_suscription/StarBenefits.png"
const envioG = "/images/landing_suscription/ghost_envio.png"
const cursoR = "/images/landing_suscription/cursos_recompensa.png"
const tiempoR = "/images/landing_suscription/tiempo_recompensa.png"
const puntoR = "/images/landing_suscription/puntos_recompensa.png"

let views = new Map<number, boolean>();
views.set(1, false);
views.set(2, false);
views.set(3, false);
views.set(4, false);

const LandingSuscription = () => {
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
  const mensual = "$149 mxn/mes"
  const anual = "$1,599 mxn/anual"
  return (
    <SuscriptionContain>
      <div className="m-0" >
        <div className="m-0 all-center">
          <img src={backPpal} className="background-images" />
        </div>

        <img src={gonvar} className="gonvarplus" />
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
        <div className="m-0 all-center back-ghosts">
          <img src={ubiG1} className="g-1" />
          <img src={ubiG2} className="g-2" />
          <img src={ubiG3} className="g-3" />
        </div>
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
        <button className="btn up-down spacing mb-5">Quiero comenzar<br /> hoy mismo</button>
      </div>


      <div className="spacing">
        <h1>Nuestra suscripción cuenta con <br />
          <b className="p-pink">cursos de diferentes grados de dificultad,</b><br />
          desde principiantes hasta niveles más avanzados.</h1>

        <div className="dif-lines spacing">
          <img src={lineaDif} className="behind" />
          <img src={muyFacil} className="level" />
          <img src={facil} className="level" />
          <img src={intermedio} className="level" />
          <img src={avanzado} className="level" />
          <img src={master} className="level" />
        </div>

        <h2 className="fst-italic bold">No importa si vas comenzando o si ya tienes conocimientos, <br />
          te aseguramos que tenemos un curso para ti.</h2>
      </div>


      <div className="spacing est-w">
        <h2 className="bold">Además, en la plataforma encontrarás diferentes</h2>
        <h1 className="big-title p-pink">Líneas de aprendizaje</h1>

        <div className="teach-lines spacing">
          <div className="lines m-0">
            <img src={lineaArteU} />
            <div className="line-desc">
              <h2 className="bold">Arte en Uñas</h2>
              <h3 className="p-pink fw-normal">Linea 1</h3>
            </div>
          </div>

          <div className="lines m-0">
            <img src={lineaUñas} />
            <div className="line-desc">
              <h2 className="bold">Estructura de Uñas</h2>
              <h3 className="p-pink fw-normal">Linea 2</h3>
            </div>
          </div>

          <div className="lines m-0">
            <img src={lineaMaq} />
            <div className="line-desc">
              <h2 className="bold">Maquillaje</h2>
              <h3 className="p-pink fw-normal">Linea 3</h3>
            </div>
          </div>
        </div>

        <h3 className="bold">Así tendrás la oportunidad de <br /><b className="p-pink">aprender desde
          lo básico hasta convetirte en Master.</b></h3>
      </div>


      <div className="spacing">
        {/* <div className="back-lines all-center">
          <img className="line-1" src={certifB1} />
          <img className="line-2" src={certifB2} />
          <img className="line-3" src={certifB3} />
          <img className="line-4" src={certifB4} />
        </div> */}
        <div className="m-0 all-center">
          <img src={certificadoMujer} className="mx-5" />
          <div className="pt-5 est-w text-start">
            <h1 className="p-pink big-title mb-4">Certificado FUV</h1>
            <h2 className="bold mb-4 w-75">Con <b className="p-pink">Gonvar+</b> podrás enviar tus prácticas para revisión y al aprobarlas,
              <b className="p-pink">obtendrás la certificación</b> correspondiente al curso que hayas tomado.</h2>
            <h2 className="bold w-75">Te entregaremos un <b className="p-pink"> certificado oficial de la marca, que cuenta con un FUV
              <i>(folio único verificado).</i></b></h2>
          </div>
        </div>
      </div>


      <div className="spacing all-center">
        <div className="text-end est-w">
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
        <img src={asesoriaTel} className="ms-3" />
      </div>


      <div className="spacing">
        <div className="all-center">
          <img src={miniLogo} className="mx-3" />
          <h1 className="text-start">Recibe <b className="p-pink">beneficios, contenido exclusivos<br /> y recompensas</b> con tu suscripción</h1>
        </div>
        <div className="m-0 all-center">
          <div className="m-0 w-auto">
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
          <div className="w-auto benefits-ghosts">
            <img src={envioG} className="back" />
            <img src={envioMujer} />
            <img src={goldStar} className="star" />
          </div>
        </div>

      </div>

      <div className="spacing all-center">
        <img src={chica} className="ms-5 chica-img" />
        <div className="m-0">
          <h2 className="red bolder">Costo total real: <del>$74,719.00 mxn</del></h2>
          <h1 className="p-pink bolder">Más de 60 cursos completso</h1>
          <h1 className="green bolder">Sólo {anual}</h1>
          <button className="btn left-right mt-5">¡Quiero comenzar <br />ahora</button>
        </div>
        <img src={manosPrecio} />
      </div>


      <div className="spacing">
        <div className="side-images">
          <img src={rewardBack} />
          <img src={rewardBack} className="rotate-img" />
        </div>
        <div className="m-0 align-items-center d-flex justify-content-center">
          <img src={rewards} className="me-3" />
          <h2>CENTRO DE <b>RECOMPENSAS</b></h2>
        </div>

        <div className="card-container">
          <div className="reward-card points">
            <div className="normal-card">
              <div className="all-center">
                <img src={pointReward} className="title-img" />
                <img src={pointRewardOut} className="title-img" />
              </div>
              <h4><b className="p-pink"><i>Por puntaje</i></b><br /></h4>
              <p className="bold m-5">Cada tarea aprobada, clase o curso terminado,
                te dará puntos que puedes canjear por productos Gonvar.</p>
            </div>
            <div className="hover-card">
              <img src={puntoR} className="my-3" />
              <h1>¡HOLA MARÍA!</h1>
              <p>Siguiente recompensa <br /> <b className="yellow">2 monómetros Gonvar</b></p>
              <h3 className="yellow bold">al reunir <br /> 3,000 puntos</h3>
            </div>
          </div>

          <div className="reward-card time">
            <div className="normal-card">
              <div className="all-center">
                <img src={timeReward} className="title-img" />
                <img src={timeRewardOut} className="title-img" />
              </div>
              <h4><b className="teal"><i>Por tiempo </i></b><br /></h4>
              <p className="bold m-5">Por cada mes que permanezcas suscrita, obtendrás nuevos beneficios y
                mejores descuentos en nuestros productos.</p>
            </div>
            <div className="hover-card">
              <img src={tiempoR} className="my-3" />
              <h1>¡HOLA MARÍA!</h1>
              <p>Tu siguiente recompensa <br /> estará disponible <b className="yellow">en Junio</b></p>
              <h3 className="yellow bold">20% de descuento <br /> en productos Gonvar</h3>
            </div>
          </div>

          <div className="reward-card awards">
            <div className="normal-card">
              <div className="all-center">
                <img src={awardReward} className="title-img" />
                <img src={awardRewardOut} className="title-img" />
              </div>
              <h4><b className="blue"><i>Certificados </i></b><br /></h4>
              <p className="bold m-5">Recibe un certificado oficial de la marca con un Folio Único Verificado (FUV)
                por cada curso completo que termines.</p>
            </div>
            <div className="hover-card">
              <img src={cursoR} className="my-3" />
              <h1>¡HOLA MARÍA!</h1>
              <p>Tu siguiente curso a terminar es <br /> <b className="yellow">MANICURE CON BALANCE</b></p>
              <h3 className="yellow bold">Has conseguido 15 <br /> Certificados FUV</h3>
            </div>

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
    </SuscriptionContain >
  )
}
export default LandingSuscription;