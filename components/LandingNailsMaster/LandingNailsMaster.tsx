

import { useEffect, useState } from "react";

import { BsChevronDown, BsChevronLeft, BsChevronRight, BsChevronUp } from "react-icons/bs";

import router from "next/router";
import { Navigation } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import { Swiper, SwiperSlide } from "swiper/react";

import { PREVIEW_PATH, PURCHASE_PATH, SIGNUP_PATH } from "../../constants/paths";
import { downloadFileWithStoragePath } from "../../store/actions/LandingActions";
import { getLandingReviewApi } from "../api/admin";
import { getUserApi } from "../api/users";
import { SlideModule_1 } from "../Home/Module5_1/SlideModule_1/SlideModule_1";
import { SuscriptionContain } from "./LandingNailsMaster.styled";
import MaterialesModal from "./MaterialesModal";

const news = "/images/landing_suscription/newsletter.png"
const testimonio = "/images/landing_suscription/testimonios.png"
const pointWatsap = "/images/landing_suscription/point_at_button.png"
const watsapOut = "/images/landing_suscription/whatsapp_outline.png"
const mujer = "/images/landing_nails_master/mUJER.png"
const shop = "/images/landing_nails_master/Icon_shop.png"
const revisado = "/images/landing_nails_master/icon _pagestar.png"
const asesorias = "/images/landing_nails_master/icon_asesorias.png"
const arita = "/images/landing_nails_master/arita-gonvar.png"
const calendar = "/images/landing_nails_master/icon_calendar.png"
const book = "/images/landing_nails_master/icon_book.png"
const bookmark = "/images/landing_nails_master/icon_bookmark.png"
const bulb = "/images/landing_nails_master/icon_bulb.png"
const clock = "/images/landing_nails_master/icon_clock.png"
const check = "/images/landing_nails_master/check.png"
const graph = "/images/landing_nails_master/icon_graph.png"
const cert = "/images/landing_nails_master/certificado.png"
const devices = "/images/landing_nails_master/devices.png"
const rewards = "/images/landing_suscription/rewardCircle.png"
const pointReward = "/images/landing_suscription/star.png"
const pointRewardOut = "/images/landing_suscription/star_outline.png"
const pincel = "/images/landing_nails_master/pincel.png"
const adherentes = "/images/landing_nails_master/adherentes.png"
const monomero = "/images/landing_nails_master/monomero.png"
const colecciones = "/images/landing_nails_master/colecciones.png"
const davinci = "/images/landing_nails_master/davinci.png"
const mas = "/images/landing_nails_master/mas.png"
const whitePoint = "/images/landing_nails_master/white_star.png"
const whiteOut = "/images/landing_nails_master/white_outline.png"
const nailPintura = "/images/landing_nails_master/nail_pintura.png"
const nailYellow = "/images/landing_nails_master/nail_yellow.png"
const nailWhite = "/images/landing_nails_master/nail-white.png"
const linesB = "/images/landing_nails_master/lines-bottom.png"
const manoBenefits = "/images/landing_nails_master/mano_benefits.png"
const manuales = "/images/landing_nails_master/manuales.png"
const manoCosto = "/images/landing_nails_master/mano_costo.png"
const chica = "/images/landing_nails_master/chica.png"
const linesL = "/images/landing_nails_master/lines-left.png"
const linesR = "/images/landing_nails_master/lines-right.png"
const linesU = "/images/landing_nails_master/lines-up.png"
const stars = "/images/landing_nails_master/estrellas.png"
const linesB2 = "/images/landing_nails_master/lines-bottom2.png"

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
  const [verMat, setverMat] = useState(false)
  const [reviews, setReviews] = useState([])

  const handleMats = () => {
    setverMat(false)
  }

  const getRevs = () => {
    getLandingReviewApi().then((res) => {
      let reviewData: any = [];
      res.forEach((review: any) => {
        let tempReview = {
          descripcion: review.about,
          id: review.id,
          convertedDate: review.date,
          imgURL: review.image,
          usrFacebookURL: review.facebook_url,
          isNew: review.new === 0 ? false : true,
          username: review.user_name,
          usrImgURL: review.user_image,
        }
        reviewData.push(tempReview)
      });
      setReviews(reviewData);
    })
  }

  useEffect(() => {
    getRevs()
  }, [setReviews])



  const verQ = (q: any) => {
    setver(!ver)
    if (views.get(q)) {
      views.set(q, false)
    } else {
      views.set(q, true)
    }
  }

  const handleRedirection = () => {
    if (localStorage.getItem('email')) {
      getUserApi(localStorage.getItem('email')).then((res) => {
        if (res.level !== 0) {
          router.push(PREVIEW_PATH)
        } else {
          router.push({ pathname: PURCHASE_PATH, query: { type: 'course', id: 30 } })
        }
      })
    } else {
      localStorage.setItem('nailMaster', 'true')
      router.push(SIGNUP_PATH)
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
        <img src={nailPintura} className="left-img" />
        <div className="space">
          <h2 className="big-title h1"><b>Nail's Master </b><br />
            <b className="light-p">Revolution</b></h2>
          <h2><b>Aprende a aplicar uñas </b><b className="p-pink">desde cero.</b></h2>
        </div>

        <img src={nailYellow} className="right-img-1" />
        <img src={nailWhite} className="right-img-2" />

        <div className="all-center">
          <img src={stars} className="stars" />
          <h3 className="space"><b>(5) 7,378 opiniones</b></h3>
        </div>

        <h4><b>El curso de aplicación de uñas </b><b className="p-pink">más exitoso de Latinoámerica.<br />
          Más de 5,700 alumnas</b> <b>han aprendido con nosotros.</b></h4>

        <button className="space btn left-right" onClick={() => handleRedirection()}>Comienza ahora <br />por $1,599.00 mxn</button>
      </div>


      <div className="info">
        <div className="info-top">
          <div className="text">
            <h2 className="title"><b>Conviértete en profesional <br /> con nuestro programa,</b><br />
              <b className="subtitle p-pink">aprenderás a aplicar uñas de manera:</b>
            </h2>
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
        <h2 className="h1">Aprende desde cero y <b className="p-pink">vive de tu pasion</b> <br /> por las uñas acrilicas</h2>
        <div className="info-cards all-center">
          <div className="card">
            <div className="adjust">
              <img src={shop} className="icon-shop" />
            </div>
            <h4>Revisión y evaluación de prácticas</h4>
            <p>Revisamos de manera individual cada una de tus prácticas y te damos retroalimentación.</p>
          </div>
          <div className="card">
            <div className="adjust">
              <img src={revisado} className="icon-page" />
            </div>
            <h4>Certificado al terminar</h4>
            <p>Al finalizar tu curso, obtén un certificado oficial de la marca.
            </p>
          </div>
          <div className="card">
            <div className="adjust">
              <img src={asesorias} className="icon-pc" />
            </div>
            <h4>Asesorías Ilimitadas</h4>
            <p>Aprende a tu ritmo con nuestras más de 40 lecciones.</p>
          </div>
        </div>
        <img src={linesB} className="bottom-l" />
      </div>


      <div className="video-section">
        <div className="video-container">
          <p>video</p>
        </div>
        <div className="info-video">
          <h2><b>Durante 3 meses podrás acceder a</b><br />
            <b className="big-title p-pink">más de 40 clases</b></h2>
          <p>Además nuestro equipo estará disponible para ayudarte y resolver todas las dudas que tengas.</p>
          <p><b>Sin limites.</b></p>
          <button className="btn" onClick={() => handleRedirection()}>Obtener acceso</button>
        </div>
      </div>


      <div className="arita-section">
        <div className="circle corner-left"></div>
        <div className="image-quote">
          <p className="quote"><i>"Hago lo que me <br /> apasiona y disfruto <br /> enseñando a otras"</i></p>
          <img src={arita} className="image" />
        </div>
        <div className="text">
          <h2>Te presentamos a</h2>
          <div>
            <div className="header-contain">
              <h2 className="big-title">Arita Gonvar</h2>
            </div>
            <p className="p-pink"><b>Ella te guiará paso a paso en el programa Nails Master Revolution</b></p>
            <div className="sangria">
              <p><b>Instructora certificada</b> bajo estándares de aplicación de uñas artificiales por competencia</p>
              <p><b>Especialista en capacitación para principiantes,</b> estrucutra profesional en escultural<br />
                y máster en técnicas y métodos de enseñanza teóricos-prácticos.</p>
              <p>Creadora de la técnica <b>"Cero Desprendimiento en 4 Pasos"</b> y co-fundadora de la academia<br />
                de uñas <b>más grande de Latinoamerica.</b></p>
            </div>
          </div>
        </div>
        <div className="circle corner-right"></div>
      </div>


      <div className="benefits-section">

        <h2>Con <b className="blue">Nails Master Revolution</b> te daremos <b className="blue">beneficios
          <br />exclusivos</b> y tendras acceso a la comunidad de <br />estudiantes y profesionales de
          la industria de las uñas<br /> <b className="blue">más grande de Latinoamérica.</b></h2>

        <div className="benefits-info">
          <h2 className="yellow">Beneficios exclusivos</h2>
          <div className="info-row">
            <div className="info-content">
              <img src={calendar} className="icon" />
              <h5>3 meses de acceso a <b>Nails Master Revolution</b></h5>
            </div>
            <div className="info-content info-side">
              <img src={calendar} className="icon" />
              <h5><b>Instructora certificada</b></h5>
            </div>
          </div>
          <div className="info-row gray">
            <div className="info-content">
              <img src={book} className="icon" />
              <h5>Más de 40 lecciones completas,<b> actualizadas al 2023</b></h5>
            </div>
            <div className="info-content info-side">
              <img src={bookmark} className="icon" />
              <h5><b>Biblioteca exclusiva</b></h5>
            </div>
          </div>
          <div className="info-row">
            <div className="info-content">
              <img src={revisado} className="icon" />
              <h5>Revision de practicas y <b>asesorías ilimitadas</b></h5>
            </div>
            <div className="info-content info-side">
              <img src={check} className="icon" />
              <h5><b>Soporte prioritario</b> a dudas de tus clases</h5>
            </div>
          </div>
          <div className="info-row gray">
            <div className="info-content">
              <img src={graph} className="icon" />
              <h5><b>Curso definitivo</b> con las técnicas más solicitadas</h5>
            </div>
            <div className="info-content info-side">
              <img src={bulb} className="icon" />
              <h5>Programa enfocado al <b>Emprendimiento</b></h5>
            </div>
          </div>
          <div className="info-row">
            <div className="info-content">
              <img src={asesorias} className="icon" />
              <h5><b>Certificado oficial</b> al terminar el curso, con folio único vrificado (FUV)</h5>
            </div>
            <div className="info-content info-side">
              <img src={clock} className="icon" />
              <h5><b>Horarios flexible,</b> nuestro curso es 100% online</h5>
            </div>
          </div>
          <img src={manoBenefits} className="back-hands" />
        </div>
      </div>


      <div className="program">
        <h2 className="yellow"><b>Todo lo que incluye este incrible programa</b></h2>
        <p><b>Para complementar tu aprendizaje, al inscribirte a Nails MasterRevolution <br />
          obtendrás cuadernillos, manuales y textos que te ayudarán en tu carrera de Nail Artist.</b></p>

        <div className="program-course">
          <div className="course-container">
            <div className="course-detail">
              <img src={book} className="icon" />
              <p>Curso | <b className="p-pink">Costo real: $2,399.00 mxn</b></p>
            </div>
            <div className="course-detail">
              <img src={book} className="icon" />
              <p><b>Certificado</b> fisico y digital (no incluye envío) | <b className="p-pink">Costo real: $490.00 mxn</b></p>
            </div>
            <div className="course-detail">
              <img src={book} className="icon" />
              <p><b>Comunidad exclusiva</b> en What'sApp | <b className="p-pink">Costo real: $239.00 mxn</b></p>
            </div>
            <div className="course-detail">
              <img src={book} className="icon" />
              <p>Manual <b>La Perla Perfecta</b> | <b className="p-pink">Costo real: $297.00 mxn</b></p>
            </div>
            <div className="course-detail">
              <img src={book} className="icon" />
              <p>Manual <b>Química del Producto nivel básico</b> | <b className="p-pink">Costo real: $497.00 mxn</b></p>
            </div>
            <div className="course-detail">
              <img src={book} className="icon" />
              <p>Revista Gonvar: <b>10 diseños increibles</b> | <b className="p-pink">Costo real: $649.00 mxn</b></p>
            </div>
            <div className="course-detail">
              <img src={book} className="icon" />
              <p>Manual <b>Obtén tus primeros clientes</b> | <b className="p-pink">Costo real: $649.00 mxn</b></p>
            </div>
            <div className="course-detail">
              <img src={book} className="icon" />
              <p>Manual <b>Los secretos del gel semipermanente</b> | <b className="p-pink">Costo real: $649.00 mxn</b></p>
            </div>
            <div className="course-detail">
              <img src={revisado} className="icon" />
              <div className="d-block text-start">
                <p>Manual <b>Cómo obtener un documento oficial que respalde mi vocavión.</b> <br />
                  <b className="p-pink">Costo real: $850.00 mxn</b></p>
              </div>
            </div>
          </div>
          <img src={manuales} className="ghost" />
        </div>
      </div>


      <div className="cost-section">
        <div className="cost-body">
          <div className="cost-info">
            <img src={manoCosto} className="left-img" />
            <div className="center">
              <h2 className="red h1">Costo total real: <del>$6,719.00 mxn</del></h2>
              <h2 className="p-pink h1"><b>Precio de Lanzamiento con beca</b></h2>
              <h2 className="green h1">Sólo $1,599.00 mxn</h2>
              <p>Válido para las primeras 500 personas</p>
              <h2><b>Quedan [x] lugares</b></h2>
              <button className="btn left-right" onClick={() => handleRedirection()}>¡Quiero comenzar<br /> ahora!</button>
            </div>
            <img src={chica} className="right-img" />
          </div>
        </div>
      </div>


      <div className="certificado-section">
        <img src={linesL} className="left-l" />
        <div className="left-side">
          <h2 className="p-pink h1">Certificado oficial</h2>
          <h2>En Gonvar cada uno de nuestros certificados cuenta con <b className="p-pink">FUV
            <i>(Folio único verificado) </i></b> que autentifica y válida que tomaste el curso con nosotros.</h2>
        </div>
        <div className="right-side">
          <img src={cert} className="float-bottom" />
        </div>
        <img src={linesR} className="right-l" />
      </div>


      <div className="rewards-section">
        <div className="all-center title">
          <img src={rewards} className="me-3" />
          <h2 className="h1">CENTRO DE <b>RECOMPENSAS</b></h2>
        </div>
        <div className="rewards-container all-center">
          <div className="reward-card card-style">
            <div className="normal-card">
              <div className="all-center img">
                <img src={pointReward} className="title-img" />
                <img src={pointRewardOut} className="title-img" />
              </div>
              <h4 className="light-p">Recompensas por puntaje</h4>
              <h5>Cada tarea aprobada, clase o curso terminado, te dará <b className="p-pink">puntos </b>
                que puedes canjear por productos Gonvar.</h5>
            </div>
            <div className="hover-card">
              <div className="all-center img">
                <img src={whitePoint} className="title-img" />
                <img src={whiteOut} className="title-img" />
              </div>
              <h4>Recompensas por puntaje</h4>
              <h5>Obtén puntos por:</h5>
              <p>Tarea aprobada: +50 pts<br />
                Clase terminada: +100 pts<br />
                Curso terminado: +150 pts</p>
            </div>

          </div>
          <div className="points-rewards">
            <div className="display-row">
              <div className="card card-style">
                <img src={pincel} />
                <div className="points">Necesitas 1000 pts</div>
              </div>
              <div className="card card-style">
                <img src={adherentes} />
                <div className="points">Necesitas 3000 pts</div>
              </div>
              <div className="card card-style">
                <img src={monomero} />
                <div className="points">Necesitas 4000 pts</div>
              </div>
            </div>
            <div className="display-row">
              <div className="card card-style">
                <img src={colecciones} />
                <div className="points">Necesitas 6000 pts</div>
              </div>
              <div className="card card-style">
                <img src={davinci} />
                <div className="points">Necesitas 15,000 pts</div>
              </div>
              <div className="card card-style">
                <img src={mas} />
                <div className="points">Y mucho más...</div>
              </div>
            </div>
          </div>
        </div>
      </div>


      <div className="experiences-section">
        <h2 className="h1">Conoce las experiencias de nuestras alumnas</h2>
        <div className="experiences-container">
          <div className="next swiper-prev"><BsChevronLeft className="icon" /></div>
          <Swiper
            className="experiences"
            slidesPerView={3}
            spaceBetween={30}
            loop={true}
            navigation={{
              nextEl: '.swiper-next',
              prevEl: '.swiper-prev',
            }}
            modules={[Navigation]}
          >
            {reviews.length > 0 && reviews.map((review: any, index: any) => {
              return (
                <SwiperSlide id={"slide" + index} key={review.username + "_ID"}>
                  <SlideModule_1
                    index={index}
                    isNew={review.isNew}
                    descripcion={review.descripcion}
                    datePublication={review.convertedDate}
                    usrFacebookURL={review.usrFacebookURL}
                    username={review.username}
                    imgURL={downloadFileWithStoragePath(review.imgURL)}
                    usrImgURL={downloadFileWithStoragePath(review.usrImgURL)}
                  />
                </SwiperSlide>
              )
            })}
          </Swiper>

          <Swiper
            className="experiences resp"
            slidesPerView={1}
            loop={true}
            spaceBetween={30}
            navigation={{
              nextEl: '.swiper-next',
              prevEl: '.swiper-prev',
            }}
            modules={[Navigation]}
          >
            {reviews.length > 0 && reviews.map((review: any, index: any) => {
              return (
                <SwiperSlide id={"slide" + index} key={review.username + "_ID"}>
                  <SlideModule_1
                    index={index}
                    isNew={review.isNew}
                    descripcion={review.descripcion}
                    datePublication={review.convertedDate}
                    usrFacebookURL={review.usrFacebookURL}
                    username={review.username}
                    imgURL={downloadFileWithStoragePath(review.imgURL)}
                    usrImgURL={downloadFileWithStoragePath(review.usrImgURL)}
                  />
                </SwiperSlide>
              )
            })}
          </Swiper>
          <div className="next swiper-next"><BsChevronRight className="icon" /></div>
        </div>
      </div>


      <div className="subject-section">
        <img src={linesB} className="up-l" />
        <h2 className="big-title">TEMARIO</h2>
        <h4>Conoce todo lo que aprenderás en <b>Nail Master Revolution</b></h4>
        <div className="subject-container">
          <div className="side">
            <div className="subject">
              <div className="d-flex">
                <h3 className="num"><b>1.</b></h3>
                <h3 className="title"><b>¿Cómo funciona la plataforma?</b></h3>
              </div>
              <h5><b className="p-pink">Lección 1.</b> ¿Cómo funciona la plataforma?.</h5>
              <h5><b className="p-pink">Lección 2.</b> Entrega de Prácticas y Certificados</h5>
            </div>
            <div className="subject">
              <div className="d-flex">
                <h3 className="num"><b>2.</b></h3>
                <h3 className="title"><b>Bienvenida a Nails Master Revolution</b></h3>
              </div>
              <h5><b className="p-pink">Lección 1.</b> Presentación y Bienvenida.</h5>
              <h5><b className="p-pink">Lección 2.</b> Objetivos y Perfil de Egreso.</h5>
              <h5><b className="p-pink">Lección 3.</b> ¿Cómo evaluaremos tu aprendizaje?</h5>
            </div>
            <div className="subject">
              <div className="d-flex">
                <h3 className="num"><b>3.</b></h3>
                <h3 className="title"><b>Productos y Herramientas Para Comenzar</b></h3>
              </div>
              <h5><b className="p-pink">Lección 1.</b> Herramientas Necesarias Para la Aplicación de
                Uñas Acrílicas.</h5>
              <h5><b className="p-pink">Lección 2.</b> Productos necesarios para la aplicación de uñas
                acrílicas.</h5>
              <h5><b className="p-pink">Lección 3.</b> Pincel Gonvar Nails 100% Kolinsky.</h5>
              <h5><b className="p-pink">Lección 4.</b> Herramientas Eléctricas y Mobiliario.</h5>
              <h5><b className="p-pink">Lección 5.</b> Dónde Comprar Tus Productos.</h5>
            </div>
            <div className="subject"><div className="d-flex">
              <h3 className="num"><b>4.</b></h3>
              <h3 className="title"><b>Fundamentos Teóricos para la Aplicación de Uñas Acrílicas</b></h3>
            </div>
              <h5><b className="p-pink">Lección 1.</b> Morfología de la Uña Natural.</h5>
              <h5><b className="p-pink">Lección 2.</b> Partes de la Uña Artificial.</h5>
              <h5><b className="p-pink">Lección 3.</b> Diferencia entre Enfermedades, Alteraciones e
                Infecciones en las Uñas Naturales.</h5>
              <h5><b className="p-pink">Lección 4.</b> Alteraciones de las Uñas Naturales.</h5>
              <h5><b className="p-pink">Lección 5.</b> Cero Desprendimiento: Teoría Técnica 25*4 y
                Preparación de la Uña Natural.</h5>
            </div>
          </div>
          <div className="side">
            <div className="subject"><div className="d-flex">
              <h3 className="num"><b>5.</b></h3>
              <h3 className="title"><b>Comportamiento de los Productos Químicos</b></h3>
            </div>
              <h5><b className="p-pink">Lección 1.</b> La perla Perfecta 1.</h5>
              <h5><b className="p-pink">Lección 2.</b> La perla Perfecta 2.</h5>
              <h5><b className="p-pink">Lección 3.</b> La perla Perfecta 3.</h5>
              <h5><b className="p-pink">Lección 4.</b> La perla Perfecta 4.</h5>
              <h5><b className="p-pink">Lección 5.</b> La perla Perfecta 5.</h5>
              <h5><b className="p-pink">Lección 6.</b> La perla Perfecta 6.</h5>
            </div>
            <div className="subject"><div className="d-flex">
              <h3 className="num"><b>6.</b></h3>
              <h3 className="title"><b>Práctica en Mano Real de Técnicas y Diseños Más Comerciales</b></h3>
            </div>
              <h5><b className="p-pink">Lección 1.</b> ¿Cómo medir el Tip?</h5>
              <h5><b className="p-pink">Lección 2.</b> Punta Coffin: Aplicación con Técnica Perfect Natural.</h5>
              <h5><b className="p-pink">Lección 3.</b> Punta Coffin: Limado.</h5>
              <h5><b className="p-pink">Lección 4.</b> Punta Cuadrada con Curvatura C: Aplicación con
                técnica Full Cover.</h5>
              <h5><b className="p-pink">Lección 5.</b> Punta Cuadrada con Curvatura C: Limado.</h5>
              <h5><b className="p-pink">Lección 6.</b> Punta Cuadrada con Curvatura C: Finalizado con
                Esmalte en Gel.</h5>
              <h5><b className="p-pink">Lección 7.</b> Punta Almendra Clásica: Aplicación con Técnica
                de Encapsulado.</h5>
              <h5><b className="p-pink">Lección 8.</b> Punta Almendra Clásica: Limado.</h5>
              <h5><b className="p-pink">Lección 9.</b> Almendra Clásica: Finalizado.</h5>
              <h5><b className="p-pink">Lección 10.</b> Aplicación de Francés para Uñas con Onicofagia.</h5>
              <h5><b className="p-pink">Lección 11.</b> Francés: Limado.</h5>
              <h5><b className="p-pink">Lección 12.</b> Francés: Finalizado.</h5>
              <h5><b className="p-pink">Lección 13.</b> Extra: Drill.</h5>
              <h5><b className="p-pink">Lección 14.</b> Certificación.</h5>
            </div>
          </div>
        </div>

        <button className="btn up-down" onClick={() => setverMat(true)}>Consulta tu lista de materiales a utilizar</button>
        {!!verMat && <MaterialesModal show={verMat} setShow={handleMats} />}
        <img src={linesB2} className="down-l" />
      </div>


      <div className="devices-section py-5">
        <h2 className="big-title">Disfruta tus clases <br />
          <b className="p-pink">desde cualquier dispositivo</b></h2>
        <img src={devices} className="py-2 devices" />
      </div>

      <div className="dudas-section all-center">
        <div className="text-end">
          <h2>¿Tienes alguna duda?</h2>
          <h2 className="p-pink">Nuestro equipo está para ayudarte.</h2>
        </div>
        <div className="dudas-img">
          <img src={pointWatsap} className="point" />
          <div className="watsap-button all-center">
            <img src={watsapOut} className="me-3" />
            <p className="my-1">Contacta con<br /> un agente</p>
          </div>
        </div>
      </div>

      <div className="faq-section spacing">
        <h2 className="p-pink h1">Preguntas Frecuentes</h2>
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
                  te brinda un certificado con un folio único verificado para que puedas respaldar
                  tus conocimientos.</p>
              </div>
            </div>
          </div>

          <div className="all-center">
            <div className={`q-container ${views.get(2) ? 'max' : 'min'}`} onClick={() => verQ(2)}>
              <div className={`q ${views.get(2) && 'open-q'}`}>
                <p className={`title special`}>¿Qué metodos de pago puedo usar para pagar mi suscripción?</p>
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
            <h2 className="h1">Suscríbete a nuestro Newsletter</h2>
            <p>Mantente actualizado en temas de la industria de la
              belleza y futuras promociones de Gonvar.</p>
            <div className="email-send">
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
export default LandingNailsMaster;