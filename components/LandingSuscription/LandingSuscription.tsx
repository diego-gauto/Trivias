
import { useEffect, useState } from "react";

import { BsChevronDown, BsChevronLeft, BsChevronRight, BsChevronUp } from "react-icons/bs";

import router from "next/router";
import { Navigation } from "swiper";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";

import { PREVIEW_PATH, PURCHASE_PATH, SIGNUP_PATH } from "../../constants/paths";
import { downloadFileWithStoragePath } from "../../store/actions/LandingActions";
import { getLandingReviewApi } from "../api/admin";
import { getLandingCoursesApi } from "../api/lessons";
import { getUserApi } from "../api/users";
import { SlideModule_1 } from "../Home/Module5_1/SlideModule_1/SlideModule_1";
import { SuscriptionContain } from "./LandingSuscription.styled";
import { useMediaQuery } from "react-responsive";

const cursoBackground = "/images/landing_suscription/Rectangle 684.png"
const gonvar = "/images/landing_suscription/gonvar cuad 1.png"
const upsideLines = "/images/landing_suscription/lines-d.png"
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
const backCell = "/images/landing_suscription/lineBCell.png"
const backCell2 = "/images/landing_suscription/lineBCell2.png"
const backCell3 = "/images/landing_suscription/lineBCell3.png"
const inspo1 = "/images/landing_suscription/nails_inspo_1.png"
const inspo2 = "/images/landing_suscription/nails_inspo_2.png"
const inspo3 = "/images/landing_suscription/nails_inspo_3.png"
const inspo4 = "/images/landing_suscription/nails_inspo_4.png"
const arita = "/images/landing_suscription/Arita.png"
const reina = "/images/landing_suscription/Reina.png"
const cony = "/images/landing_suscription/Cony.png"
const antonio = "/images/landing_suscription/Antonio.png"
const liz = "/images/landing_suscription/Liz.png"

let views = new Map<number, boolean>();
views.set(1, false);
views.set(2, false);
views.set(3, false);
views.set(4, false);

interface ILandingSuscription {
  price: string;
  isMonth: boolean;
}

const LandingSuscription = (props: ILandingSuscription) => {
  const { price, isMonth } = props;
  const [ver, setver] = useState(true)
  const [reviews, setReviews] = useState([])
  const responsive650 = useMediaQuery({ query: "(max-width: 650px)" });
  const [courseGonvarPlus, setCourseGonvarPlus] = useState([])

  const verQ = (q: any) => {
    setver(!ver)
    if (views.get(q)) {
      views.set(q, false)
    } else {
      views.set(q, true)
    }
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
    getLandingCoursesApi(null).then((data) => {
      setCourseGonvarPlus(data.gonvar_courses.slice(0, 3));
    })
  }

  useEffect(() => {
    getRevs()
  }, [setReviews])

  const redirectToWhatsAppChat = () => {
    const phoneNumber = '+52 1 55 3893 3134';
    const formattedPhoneNumber = phoneNumber.replace(/\D/g, '');
    const url = `https://wa.me/${formattedPhoneNumber}`;
    window.open(url, '_blank');
  };

  useEffect(() => {

  }, [setver])

  const handleRedirection = () => {
    if (localStorage.getItem('email')) {
      getUserApi(localStorage.getItem('email')).then((res) => {
        if (res.level !== 0) {
          router.push(PREVIEW_PATH)
        } else {
          if (isMonth) {
            router.push({ pathname: PURCHASE_PATH, query: { type: 'subscription', frequency: 'month' } })
          } else {
            router.push({ pathname: PURCHASE_PATH, query: { type: 'subscription', frequency: 'anual' } })
          }
        }

      })

    } else {
      if (isMonth) {
        localStorage.setItem('month', 'true')
      } else {
        localStorage.setItem('anual', 'true')
      }
      router.push(SIGNUP_PATH)
    }
  }
  return (
    <SuscriptionContain>
      <div className="extra-header">
        <button className="header-button" onClick={() => handleRedirection()}>Comenzar ahora</button>
      </div>
      <div className="intro-section" >
        <div className="background-images">
          <img src={upsideLines} />
          <div className="image-contain">
            <img src={backPpal} className="women-back" />
            <div className="images-fade" />
          </div>
        </div>

        <div className="">
          <img src={gonvar} className="gonvarplus" alt="gonvar-logo" />
          <img src={plus} className="mt-4 plusgonvar" />
        </div>

        <h3 className="bold space">La suscripción {isMonth ? 'mensual' : 'anual'} que te permite ver <b className="p-pink no-bold">cientos <br /> de cursos</b> de uñas y belleza en línea.</h3>

        <div className="space">
          <h4 className="bold">¡Accede a <b className="p-pink no-bold">más de 60 cursos</b> hoy mismo!</h4>
          <h4 className="bold">Sólo {price}</h4>
        </div>

        <button className="btn left-right" onClick={() => handleRedirection()} >¡Comenzar ahora!</button>
      </div>

      <div className="courses-section">
        <div className="space">
          <h2 className="bold">En esta plataforma encontrarás</h2>
          <h2 className="h1"><b className="p-pink">MÁS DE 60 CURSOS DE UÑAS Y BELLEZA EN LÍNEA</b></h2>
          <h2 className="bold">donde aprenderás desde cero y paso a paso.</h2>
        </div>
        <div className="all-center space">
          <div className="group-buttons">
            <div className="center">
              <button className="select">Tips</button>
              <button>Escultural</button>
              <button>Mano Alzada</button>
              <button>Stamping</button>
              <button>3D</button>
              <button>Micropintura</button>
              <button>Manicura</button>
              <button>Maquillaje</button>
              <button>Pedicura</button>
            </div>
          </div>
        </div>

        {courseGonvarPlus.length > 0 ?
          <div className="row all-center space">
            {courseGonvarPlus.map((e: any, index: number) => {
              return (
                <div className="responsive-unset col-lg-4 col-md-6 col-sm-12" key={"data-landing-" + index}>
                  <img src={e.image} alt="Curso" className="thumbnail" />
                  <p><b className="p-pink">{e.title} </b><br />
                    <i>{e.professors[0].name}</i></p>
                </div>
              )
            })}

          </div>
          :
          <div className="row all-center space">
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
          </div>}
        <button className="btn left-right mb-3" onClick={() => handleRedirection()}>¡Comienza ahora!</button>
        <h5 className="p-pink"><i>Y aprende muchas otras técnicas sobre imagen personal.</i></h5>
      </div>


      <div className="ubi-section">
        <div className="back-ghosts">
          <img src={ubiG1} className="g-1" />
          <img src={ubiG3} className="g-3" />
          <img src={ubiG2} className="g-2" />
        </div>
        <img src={ubi} className="ubiImg" />
        <h2 className="big-title bold">NO IMPORTA TU UBICACIÓN</h2>
        <h2 className="fs-3">Disfruta de clases en línea pregrabadas en alta definición, aprende a tu ritmo,<br />
          <b className="p-pink fs-2 no-bold"> desde cualquier país, donde quieras y a la hora que quieras.</b></h2>
      </div>


      <div className="instructores-section">
        <h2 className="big-title bold"><b className="p-pink no-bold">¡Nunca te dejaremos sola, </b> {!responsive650 && <br />}
          en tu
          proceso de aprendizaje!</h2>
        <div className="instructores">
          {
            !responsive650 ?
              <>
                <div className="inst-cont">
                  <img src={reina} />
                  <p><b>Reina Rauda </b><br />
                    <i className="p-pink">Especialista en maquillaje</i></p>
                </div>
                <div className="inst-cont">
                  <img src={cony} />
                  <p><b className="middle">Cony Juárez </b><br />
                    <i className="p-pink">Especialista en mano alzada</i></p>
                </div>
                <div className="inst-cont">
                  <img src={arita} />
                  <p><b className="arita">Arita Gonvar </b><br />
                    <i className="p-pink">Especialista en uñas</i></p>
                </div>
                <div className="inst-cont">
                  <img src={antonio} />
                  <p><b className="middle">Antonio Rico </b><br />
                    <i className="p-pink">Especialista en micropintura</i></p>
                </div>
                <div className="inst-cont">
                  <img src={liz} />
                  <p><b>Liz Torres </b><br />
                    <i className="p-pink">Especialista en Manicura Rusa</i></p>
                </div>
              </>
              :
              <>
                <div className="inst-cont">
                  <img src={arita} />
                  <p><b className="arita">Arita Gonvar </b><br />
                    <i className="p-pink">Especialista en uñas</i></p>
                </div>
                <div className="duo-containers">
                  <div className="inst-cont">
                    <img src={reina} />
                    <p><b>Reina Rauda </b><br />
                      <i className="p-pink">Especialista en maquillaje</i></p>
                  </div>
                  <div className="inst-cont">
                    <img src={antonio} />
                    <p><b className="middle">Antonio Rico </b><br />
                      <i className="p-pink">Especialista en micropintura</i></p>
                  </div>
                </div>
              </>
          }

        </div>
        <h3 className="bold space">Los cursos son impartidos por <b className="p-pink no-bold">instructores profesionales
          y certificados,</b> {!responsive650 && <br />}que estarán guiándote paso a paso, durante tu aprendizaje.</h3>
        <button className="btn up-down spacing mb-5" onClick={() => handleRedirection()}>Quiero comenzar<br /> hoy mismo</button>
      </div>


      <div className="difficulties-section">
        <h2 className="h1 bold">Nuestra suscripción cuenta con {!responsive650 && <br />}
          <b className="p-pink bold">cursos de diferentes grados de dificultad,</b> {!responsive650 && <br />}
          desde principiantes hasta niveles más avanzados.</h2>
        {
          !responsive650 ?
            <div className="dif-lines">
              <img src={lineaDif} className="behind" />
              <img src={muyFacil} className="level" />
              <img src={facil} className="level bigger" />
              <img src={intermedio} className="level" />
              <img src={avanzado} className="level bigger" />
              <img src={master} className="level bigger" />
            </div>
            :
            <div className="resp-difficulty">
              <div className="container-difficulty">
                <img src={muyFacil} className="level-size" />
                <img src={facil} className="level" />
                <img src={intermedio} className="level-size extra-margin" />
              </div>
              <div className="container-difficulty">
                <img src={avanzado} className="level" />
                <img src={master} className="level" />
              </div>
            </div>
        }


        <h4 className="fst-italic">No importa si vas comenzando o si ya tienes conocimientos, {!responsive650 && <br />}
          te aseguramos que tenemos un curso para ti.</h4>
      </div>


      <div className="teaching-section">
        <h2 className="bold">Además, en la plataforma encontrarás diferentes</h2>
        <h2 className="big-title p-pink">Líneas de aprendizaje</h2>

        <div className="teach-lines all-center">
          <div className="lines">
            <img src={lineaArteU} />
            <div className="line-desc">
              <h2 className="bold">Arte en Uñas</h2>
              <h3 className="p-pink fw-normal">Linea 1</h3>
            </div>
          </div>

          <div className="lines">
            <img src={lineaUñas} />
            <div className="line-desc">
              <h2 className="bold">Estructura de Uñas</h2>
              <h3 className="p-pink fw-normal">Linea 2</h3>
            </div>
          </div>

          <div className="lines">
            <img src={lineaMaq} />
            <div className="line-desc">
              <h2 className="bold">Maquillaje</h2>
              <h3 className="p-pink fw-normal">Linea 3</h3>
            </div>
          </div>
        </div>

        <h3 className="bold">Así tendrás la oportunidad de <br /><b className="p-pink">aprender desde
          lo básico hasta convetirte en Master.</b></h3>
      </div >


      <div className="certificado-section all-center">
        <div className="back-lines all-center">
          <img className="line-3" src={certifB3} />
          <img className="line-4" src={certifB4} />
          <img className="line-1" src={certifB1} />
          <img className="line-2" src={certifB2} />
        </div>
        <div className="all-center">
          <img src={certificadoMujer} className="cert-img" />
          <div className="cert-text">
            <h2 className="p-pink big-title mb-4 bold">Certificado FUV</h2>
            <h2 className="bold mb-4 text-width">Con <b className="p-pink">Gonvar+</b> podrás enviar tus prácticas para revisión y al aprobarlas,
              <b className="p-pink"> obtendrás la certificación</b> correspondiente al curso que hayas tomado.</h2>
            {!responsive650 && <h2 className="bold text-width">Te entregaremos un <b className="p-pink"> certificado oficial de la marca, que cuenta con un FUV
              <i>(folio único verificado).</i></b></h2>}

          </div>
          {responsive650 && <h2 className="bold text-width resp-text">Te entregaremos un <b className="p-pink"> certificado oficial de la marca, que cuenta con un FUV
            <i>(folio único verificado).</i></b></h2>}
        </div>
      </div>


      <div className="all-center cellphone-section">
        <div className="text-end cell-body">
          <h2 className="title">¡Obtén <b className="p-pink">asesorías personalizadas<br /></b> y conviértete en una experta <br />
            en uñas y belleza!</h2>
          <div className="back-lines all-center">
            <img src={backCell} className="line-1" />
            <img src={backCell3} className="line-2" />
            <img src={backCell2} className="line-3" />
          </div>
          <div className="subtitle">
            <h3 className="bold">Mejora tu proceso de aprendizaje con nuestras
              <b className="p-pink no-bold"> asesorías individuales e ilimitadas
                con nuestros instructores certificados.</b> Aprende de manera correcta y alcanza tus
              metas con confianza.</h3>
          </div>
          <div className="text-center ">
            <button className="btn up-down" onClick={() => handleRedirection()}>Comienza ahora<br /> por {price}</button>
          </div>

        </div>
        <img src={asesoriaTel} className="ms-3" />
      </div>


      <div className="benefits-section">
        <div className="title all-center">
          <img src={miniLogo} className="mx-3" />
          <h2 className="text-start h1 bold">Recibe <b className="p-pink no-bold">beneficios, contenido exclusivos<br /> y recompensas</b> con tu suscripción</h2>
        </div>
        <div className="list-container">
          <div className="left-side">
            <div className="list">
              <img src={envio} className="me-3" />
              <h5><b className="p-pink">Envío gratis</b> de productos en compras superiores a $1,000.00 MXN</h5>
            </div>

            <div className="list">
              <img src={boleto} className="me-3" />
              <h5>Por cada mes dentro, recibes un boleto acumulable más para el <b className="p-pink">sorteo trimestral donde podrás ganas hasta $20,000.00</b></h5>
            </div>

            <div className="list">
              <img src={descuento} className="me-3" />
              <div className="m-0">
                <h5><b className="p-pink">20% de descuento</b> en productos a partir del 3° mes</h5>
                <h5><b className="p-pink">40% de descuento</b> en productos a partir del 6° mes</h5>
              </div>
            </div>

            <div className="list">
              <img src={regalo} className="me-3" />
              <h5>Envíos de <b className="p-pink">Kits de producto de regalo. </b>
                <i className="subtitle fs-6">(Sólo pagarás envío)</i></h5>
            </div>

            <div className="list">
              <img src={certificado} className="me-3" />
              <h5><b className="p-pink">Certificación oficial de la marca</b> por cada curso que completes.</h5>
            </div>

            <div className="list">
              <img src={star} className="" />
              <div className="ms-3">
                <h5><b className="p-pink">Sistema de puntos acumulables</b> que podrás cambiar por premios.</h5>
                <h5>Cada tarea, clase y curso aprobados genera puntos.</h5>
              </div>
            </div>
          </div>
          <div className="benefits-ghosts">
            <img src={envioG} className="back" />
            <img src={envioMujer} className="girl" />
            <img src={goldStar} className="star" />
          </div>
        </div>

      </div>

      <div className="cost-section all-center">
        <img src={chica} className="ms-5 chica-img" />
        <div className="mx-3">
          <h2 className="red bolder red-font">Costo total real: <del>$74,719.00 MXN</del></h2>
          <h2 className="p-pink bolder big-font">Más de 60 cursos completos</h2>
          <h2 className="green bolder big-font">Sólo {price}</h2>
          <button className="btn left-right mt-5" onClick={() => handleRedirection()}>¡Quiero comenzar <br />ahora!</button>
        </div>
        <img src={manosPrecio} className="manos" />
      </div>


      <div className="rewards-section">
        <div className="side-images">
          <img src={rewardBack} />
          <img src={rewardBack} className="rotate-img" />
        </div>
        <div className="mx-3 all-center">
          <img src={rewards} className="me-3" />
          <h2>CENTRO DE <b>RECOMPENSAS</b></h2>
        </div>

        <div className="card-container">
          <div className="reward-card points">
            <div className="normal-card">
              <div className="all-center icons">
                <img src={pointReward} className="title-img" />
                <img src={pointRewardOut} className="title-img" />
              </div>
              <h4><b className="p-pink"><i>Por puntaje</i></b><br /></h4>
              <p className="bold m-5">Cada tarea aprobada, clase o curso terminado,
                te dará puntos que puedes canjear por productos Gonvar.</p>
            </div>
            <div className="hover-card">
              <img src={puntoR} className="my-3" />
              <h2 className="h1">¡HOLA MARÍA!</h2>
              <p>Siguiente recompensa <br /> <b className="yellow">2 monómetros Gonvar</b></p>
              <h3 className="yellow bold">al reunir <br /> 3,000 puntos</h3>
            </div>
          </div>

          <div className="reward-card time">
            <div className="normal-card">
              <div className="all-center icons">
                <img src={timeReward} className="title-img" />
                <img src={timeRewardOut} className="title-img" />
              </div>
              <h4><b className="teal"><i>Por tiempo </i></b><br /></h4>
              <p className="bold m-5">Por cada mes que permanezcas suscrita, obtendrás nuevos beneficios y
                mejores descuentos en nuestros productos.</p>
            </div>
            <div className="hover-card">
              <img src={tiempoR} className="my-3" />
              <h2 className="h1">¡HOLA MARÍA!</h2>
              <p>Tu siguiente recompensa <br /> estará disponible <b className="yellow">en Junio</b></p>
              <h3 className="yellow bold">20% de descuento <br /> en productos Gonvar</h3>
            </div>
          </div>

          <div className="reward-card awards">
            <div className="normal-card">
              <div className="all-center icons">
                <img src={awardReward} className="title-img" />
                <img src={awardRewardOut} className="title-img" />
              </div>
              <h4><b className="blue"><i>Certificados </i></b><br /></h4>
              <p className="bold m-5">Recibe un certificado oficial de la marca con un Folio Único Verificado (FUV)
                por cada curso completo que termines.</p>
            </div>
            <div className="hover-card">
              <img src={cursoR} className="my-3" />
              <h2 className="h1">¡HOLA MARÍA!</h2>
              <p>Tu siguiente curso a terminar es <br /> <b className="yellow">MANICURE CON BALANCE</b></p>
              <h3 className="yellow bold">Has conseguido 15 <br /> Certificados FUV</h3>
            </div>

          </div>
        </div>

        <h5>Gracias a nuestro sistema de puntos, beneficios y certificados acumulables, <br />
          <b className="p-pink bold">puedes ganar miles de pesos en productos y premios</b><br />
          sólo por <b>permanecer suscrita, concluir tus cursos y hacer tus tareas.</b></h5>
      </div>


      <div className="testimonio-section">
        <h2 className="h1 bold big-title">Más de 45,000 alumnas</h2>
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


      <div className="inspo-section">
        <h2 className="p-pink big-title bold mb-5">¿Necesitas Inspiración?</h2>
        <h4 className="bold mb-5">Si no sabes que diseños aplicar a tus clientas, <br />
          descarga nuestro catálogo completo con más de <b className="p-pink no-bold">400 diseños ya
            disponibles.</b></h4>
        {/* <img src={inspo} /> */}
        <div className="inspo-swiper">
          <Swiper slidesPerView={3} spaceBetween={15} loop={true} className="w-est" >
            <SwiperSlide >
              <img src={inspo1} />
            </SwiperSlide>
            <SwiperSlide>
              <img src={inspo2} />
            </SwiperSlide>
            <SwiperSlide>
              <img src={inspo3} />
            </SwiperSlide>
            {/* <SwiperSlide>
              <img src={inspo4} />
            </SwiperSlide> */}
          </Swiper>
        </div>

        <div className="inspo-swiper res">
          <Swiper slidesPerView={1} spaceBetween={30} loop={true} >
            <SwiperSlide >
              <img src={inspo1} className="swiper-item" />
            </SwiperSlide>
            <SwiperSlide >
              <img src={inspo2} className="swiper-item" />
            </SwiperSlide>
            <SwiperSlide >
              <img src={inspo3} className="swiper-item" />
            </SwiperSlide>
            <SwiperSlide >
              <img src={inspo4} className="swiper-item" />
            </SwiperSlide>
          </Swiper>
        </div>
        <h4 className="bold mt-5">Además, <b className="p-pink no-bold">aprende a hacer todos estos diseños </b>
          en nuestros más de 60 cursos.</h4>

        {/*     Catalogo?????????????????????????????????????         
        <div className="all-center">
          <div className="email-send">
            <input className="email-input" placeholder="Escribe tu e-mail"></input>
            <button className="email-button">Envíame el catalogo</button>
          </div>
        </div> */}
      </div>


      <div className="dudas-section">
        <div className="all-center">
          <div className="text-end">
            <h2 className="">¿Tienes alguna duda?</h2>
            <h2 className="p-pink bold">Nuestro equipo<br /> está para ayudarte.</h2>
          </div>
          <div className="dudas-img">
            <img src={pointWatsap} className="point" />
            <div className="watsap-button all-center" onClick={() => redirectToWhatsAppChat()}>
              <img src={watsapOut} className="me-3" />
              <p className="my-1 bold">Contacta con<br /> un agente</p>
            </div>
          </div>
        </div>
      </div>

      <div className="faq-section">
        <h2 className="p-pink bold big-title">Preguntas Frecuentes</h2>
        <div className="faq">
          <div className="all-center">
            <div className={`q-container ${views.get(1) ? 'max' : 'min'}`} onClick={() => verQ(1)}>
              <div className={`q ${views.get(1) && 'open-q'}`}>
                <p className={`title bolder`}>¿Entregan reconocimiento?</p>
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
                <p className={`title bolder`}>¿Qué métodos de pago puedo usar para pagar mi suscripción?</p>
                {views.get(2) ?
                  <BsChevronUp className="icon" /> : <BsChevronDown className="icon" />}
              </div>

              <div className="border-top">
                <p className="a">Nuestros métodos de pago son súper cómodos.<br />
                  Si deseas pagar por mes, puedes hacerlo con cualquier tarjeta de crédito o débito.
                  <i>(El cobro se realiza de manera automática mes con mes por la cantidad
                    de $149 MXN u 8 dls.)</i><br />
                  Si prefieres pagar en transferencia, depósito en Oxxo o Paypal, está disponible la anualidad,
                  $1599 por todo un año de aprendizaje y aventura. <i>(Pagando anualidad no se realiza
                    ningún cobro adicional por un año).</i></p>
              </div>
            </div>
          </div>

          <div className="all-center">
            <div className={`q-container ${views.get(3) ? 'max' : 'min'}`} onClick={() => verQ(3)}>
              <div className={`q ${views.get(3) && 'open-q'}`}>
                <p className={`title bolder`}>¿Puedo cancelar en cualquier momento?</p>
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
                <p className={`title bolder`}>¿Puedo inscribirme desde cualquier país?</p>
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

      {/* Newsletter????????????????????????????????????????????????????????????
      <div className="footer-footer all-center">
        <div className="inside-footer">
          <div className="info">
            <h2 className="h1">Suscríbete a nuestro Newsletter</h2>
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
      </div> */}
    </SuscriptionContain >
  )
}
export default LandingSuscription;