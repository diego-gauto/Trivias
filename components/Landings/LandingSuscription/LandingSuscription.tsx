import { useEffect, useState } from "react";

import Countdown from "react-countdown";
import { BsChevronDown, BsChevronLeft, BsChevronRight, BsChevronUp } from "react-icons/bs";
import { MdArrowBackIosNew, MdArrowForwardIos } from "react-icons/md";
import { useMediaQuery } from "react-responsive";

import router from "next/router";
import { Navigation } from "swiper";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";

import {
  Landing_Facebook,
  PREVIEW_PATH,
  PURCHASE_PATH,
  SIGNUP_PATH,
} from "../../../constants/paths";
import { downloadFileWithStoragePath } from "../../../store/actions/LandingActions";
import { getLandingReviewApi } from "../../api/admin";
import { getAllCourseDataApi } from "../../api/lessons";
import { getUserApi } from "../../api/users";
import { ICourse } from "../../Courses/Modules/ISliders";
import { SlideModule_1 } from "../../Home/Module5_1/SlideModule_1/SlideModule_1";
import { RewardComponent } from "../Components/Reward";
import { SuscriptionContain } from "./LandingSuscription.styled";

const cursoBackground = '/images/landing_suscription/Rectangle 684.png';
const gonvar = '/images/landing_suscription/gonvar cuad 1.png';
const upsideLines = '/images/landing_suscription/lines-d.png';
const plus = '/images/landing_suscription/gonvar cuad 2.png';
const backPpal = '/images/landing_suscription/background principal.png';
const ubi = '/images/landing_suscription/ubicacion.png';
const instructores = '/images/landing_suscription/instructores.png';
const certificadoMujer = '/images/landing_suscription/mujer certificado.png';
const asesoriaTel = '/images/landing_suscription/phone.png';
const miniLogo = '/images/landing_suscription/gonvarLogo.png';
const envio = '/images/landing_suscription/envio gratis.png';
const boleto = '/images/landing_suscription/boleto.png';
const descuento = '/images/landing_suscription/descuento.png';
const regalo = '/images/landing_suscription/kits.png';
const certificado = '/images/landing_suscription/certificado.png';
const star = '/images/landing_suscription/puntos.png';
const envioMujer = '/images/landing_suscription/mujer002 1.png';
const chica = '/images/landing_suscription/chica.png';
const manosPrecio = '/images/landing_suscription/manos precio.png';

const pointWatsap = '/images/landing_suscription/point_at_button.png';
const watsapOut = '/images/landing_suscription/whatsapp_outline.png';
const lineaMaq = '/images/landing_suscription/maquillaje.png';
const lineaUñas = '/images/landing_suscription/est_uñas.png';
const lineaArteU = '/images/landing_suscription/art_uñas.png';
const lineaDif = '/images/landing_suscription/Line dif.png';
const muyFacil = '/images/landing_suscription/muy facil.png';
const facil = '/images/landing_suscription/facil.png';
const intermedio = '/images/landing_suscription/intermedio.png';
const avanzado = '/images/landing_suscription/avanzado.png';
const master = '/images/landing_suscription/master.png';

const ubiG1 = '/images/landing_suscription/ubicacion_ghost_1.png';
const ubiG2 = '/images/landing_suscription/ubicacion_ghost_2.png';
const ubiG3 = '/images/landing_suscription/ubicacion_ghost_3.png';
const certifB1 = '/images/landing_suscription/back_certif_1.png';
const certifB2 = '/images/landing_suscription/back_certif_2.png';
const certifB3 = '/images/landing_suscription/back_certif_3.png';
const certifB4 = '/images/landing_suscription/back_certif_4.png';
const goldStar = '/images/landing_suscription/StarBenefits.png';
const envioG = '/images/landing_suscription/ghost_envio.png';
const backCell = '/images/landing_suscription/lineBCell.png';
const backCell2 = '/images/landing_suscription/lineBCell2.png';
const backCell3 = '/images/landing_suscription/lineBCell3.png';
const inspo1 = '/images/landing_suscription/nails_inspo_1.png';
const inspo2 = '/images/landing_suscription/nails_inspo_2.png';
const inspo3 = '/images/landing_suscription/nails_inspo_3.png';
const inspo4 = '/images/landing_suscription/nails_inspo_4.png';
const arita = '/images/landing_suscription/Arita.png';
const reina = '/images/landing_suscription/Reina.png';
const cony = '/images/landing_suscription/Cony.png';
const antonio = '/images/landing_suscription/Antonio.png';
const liz = '/images/landing_suscription/Liz.png';
const left_responsive_girls =
  '/images/landing_suscription/responsive/chica_izquierda.svg';
const right_responsive_girls =
  '/images/landing_suscription/responsive/chica_derecha.svg';
// const left_girl = "/images/landing_suscription/left_girl.png"
// const right_girl = "/images/landing_suscription/right_girl.png"

const right_hands =
  '/images/landing_suscription/manos-hacia-lado-izquierdo.png';
const left_hands = '/images/landing_suscription/manos-hacia-lado-derecho.png';

const left_responsive_hands =
  '/images/landing_suscription/responsive/manos-hacia-lado-derecho.png';
const right_responsive_hands =
  '/images/landing_suscription/responsive/manos-hacia-lado-izquierdo.png';

let views = new Map<number, boolean>();
views.set(1, false);
views.set(2, false);
views.set(3, false);
views.set(4, false);

interface ILandingSuscription {
  price: string;
  type: 'mensual' | 'anual' | 'cuatrimestral';
  isFacebook?: boolean;
  origin?: 'facebook' | 'google' | 'tiktok';
}

const checkProgress = () => {
  const oneDay = 24 * 60 * 60 * 1000;
  const firstDate = new Date('13/04/2023 23:00:00'); //final
  const secondDate = new Date(); //today
  //Fechas pa calar
  // const firstDate = new Date('10/13/2023 23:59:00');
  // const secondDate = new Date('10/09/2023 00:00:00');
  const diffDays = Math.floor(
    Math.abs((firstDate.getTime() - secondDate.getTime()) / oneDay),
  );
  let returnValue = {
    x100: 80,
    texto: 'CUPO CASI AGOTADO',
  };
  return returnValue;
};

const LandingSuscription = (props: ILandingSuscription) => {
  const { price, type, isFacebook, origin } = props;
  const [ver, setver] = useState(true);
  const [reviews, setReviews] = useState([]);
  const [cursos, setCursos] = useState(1);
  const responsive650 = useMediaQuery({ query: '(max-width: 650px)' });
  const [courseArt, setCourseArt] = useState([]);
  const [courseEst, setCourseEst] = useState([]);
  const [courseMake, setCourseMake] = useState([]);
  const [specialCourse, setSpecialCourse] = useState({} as ICourse);

  const verQ = (q: any) => {
    setver(!ver);
    if (views.get(q)) {
      views.set(q, false);
    } else {
      views.set(q, true);
    }
  };

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
        };
        reviewData.push(tempReview);
      });
      setReviews(reviewData);
    });
    // coursesAll(null);
    getAllCourseDataApi(null).then((data) => {
      setSpecialCourse(data.special_courses[0]);
      setCourseArt(data.art_courses);
      setCourseEst(data.structure_courses);
      setCourseMake(data.makeup_courses);
    });
  };

  useEffect(() => {
    getRevs();
  }, [setReviews]);

  const redirectToWhatsAppChat = () => {
    const phoneNumber = '+52 1 55 3893 3134';
    const formattedPhoneNumber = phoneNumber.replace(/\D/g, '');
    const url = `https://wa.me/${formattedPhoneNumber}`;
    window.open(url, '_blank');
  };

  useEffect(() => { }, [setver]);

  const handleRedirection = async () => {
    if (isFacebook) {
      router.push(Landing_Facebook);
    } else {
      if (localStorage.getItem('email')) {
        const user = await getUserApi(localStorage.getItem('email'));
        if (user.level !== 0) {
          router.push(PREVIEW_PATH);
        } else {
          if (type === 'mensual') {
            router.push({
              pathname: PURCHASE_PATH,
              query: { type: 'subscription', frequency: 'month', v: '4' },
            });
          }
          if (type === 'anual') {
            router.push({
              pathname: PURCHASE_PATH,
              query: { type: 'subscription', frequency: 'anual', v: '4' },
            });
          }
          if (type === 'cuatrimestral') {
            router.push({
              pathname: PURCHASE_PATH,
              query: {
                type: 'subscription',
                frequency: 'cuatri',
                v: '4',
              },
            });
          }
        }
      } else {
        console.log(2);

        if (type === 'mensual') {
          localStorage.setItem('month', 'true');
        }
        if (type === 'anual') {
          localStorage.setItem('anual', 'true');
        }
        if (type === 'cuatrimestral') {
          localStorage.setItem('cuatri', 'true');
        }
        router.push(SIGNUP_PATH);
      }
    }
  };

  const handleNewRedirection = async () => {
    if (isFacebook) {
      router.push(Landing_Facebook);
    } else {
      if (origin === 'facebook' && type === 'cuatrimestral') {
        router.push('https://www.gonvar.io/forms?formId=16');
      } else if (origin === 'google' && type === 'cuatrimestral') {
        router.push('https://www.gonvar.io/forms?formId=14');
      } else if (origin === 'tiktok' && type === 'cuatrimestral') {
        router.push('https://www.gonvar.io/forms?formId=16');
      } else if (localStorage.getItem('email')) {
        const user = await getUserApi(localStorage.getItem('email'));
        // tiene que ser activo, y no tiene que ser nivel 0
        if (user.final_date > new Date().getTime() / 1000) {
          router.push(PREVIEW_PATH);
        } else {
          if (type === 'mensual') {
            router.push({
              pathname: PURCHASE_PATH,
              query: { type: 'subscription', frequency: 'month', v: '4' },
            });
          }
          if (type === 'anual') {
            router.push({
              pathname: PURCHASE_PATH,
              query: { type: 'subscription', frequency: 'anual', v: '4' },
            });
          }
          if (type === 'cuatrimestral') {
            router.push({
              pathname: PURCHASE_PATH,
              query: {
                type: 'subscription',
                frequency: 'cuatri',
                v: '4',
              },
            });
          }
        }
      } else {
        console.log(2);

        const keysToRemove = ['mensual_v1_3', 'anual_v1_2', 'cuatrimestre_v1_1'];

        // Elimina cualquier clave existente antes de setear la nueva
        keysToRemove.forEach((key) => {
          if (localStorage.getItem(key)) {
            localStorage.removeItem(key);
          }
        });

        if (type === 'mensual') {
          localStorage.setItem('mensual_v1_3', 'true');
        }
        if (type === 'anual') {
          localStorage.setItem('anual_v1_2', 'true');
        }
        if (type === 'cuatrimestral') {
          localStorage.setItem('cuatrimestre_v1_1', 'true');
        }
        router.push(SIGNUP_PATH);
      }
    }
  };

  return (
    <SuscriptionContain id='main-container'>
      {/*
        <div className="extra-header">
        <button className="header-button" onClick={() => handleNewRedirection()}>Comenzar ahora</button>
      </div>
        */}
      <div className='intro-section'>
        <img src={upsideLines} />
        <div className='fechas' style={{ marginTop: '-80px' }}>
          <h4 style={{ margin: '0', fontSize: '16px' }}>
            <b>¡Inscríbete en línea hoy!</b>
            <br />
            Desde el 01 de Enero al 31 de Enero
          </h4>
          <Countdown
            date={new Date(2025, 0, 31, 23, 59, 59)}
            renderer={(props) => (
              <div className='countdown' style={{ marginTop: '0' }}>
                <h2 style={{ marginTop: '10px' }}>TIEMPO RESTANTE</h2>
                <div className='time'>
                  <div className='countdown-block'>
                    <p className='tiempo'>
                      {props.days < 10 && 0}
                      {props.days}
                    </p>
                    <p className='sub' style={{ fontWeight: 'bold' }}>
                      DIAS
                    </p>
                  </div>
                  <div className='countdown-block'>
                    <p className='tiempo'>
                      {props.hours < 10 && 0}
                      {props.hours}
                    </p>
                    <p className='sub' style={{ fontWeight: 'bold' }}>
                      HORAS
                    </p>
                  </div>
                  <div className='countdown-block'>
                    <p className='tiempo'>
                      {props.minutes < 10 && 0}
                      {props.minutes}
                    </p>
                    <p className='sub' style={{ fontWeight: 'bold' }}>
                      MINUTOS
                    </p>
                  </div>
                  <div className='countdown-block'>
                    <p className='tiempo'>
                      {props.seconds < 10 && 0}
                      {props.seconds}
                    </p>
                    <p className='sub' style={{ fontWeight: 'bold' }}>
                      SEGUNDOS
                    </p>
                  </div>
                </div>
              </div>
            )}
          />
          <div className='progress-container'>
            <div
              className={`progress-bar ${checkProgress().x100 >= 100 && 'full'
                }`}
              style={
                {
                  '--progress': checkProgress().x100 + '%',
                } as React.CSSProperties
              }
              progress-text={checkProgress().texto}
            />
          </div>
        </div>
        <div className='background-images'>
          <div className='image-contain'>
            {/*
              <img src={left_girl} className="left-woman" />
            <img src={right_girl} className="right-woman" />
              */}
            <img src={left_hands} className='left-image' />
            <img src={right_hands} className='right-image' />
            <div className='images-fade' />
          </div>
        </div>
        <div className='background-images-responsive'>
          <img
            src={left_responsive_hands}
            className='resp-left image-resp'
            alt='chicas-lado-izquierdo'
          />
          <div className='image-right image-resp'>
            <div className='white-line' />
            <img
              src={right_responsive_hands}
              className='resp-right'
              alt='chicas-lado-derecho'
            />
          </div>
        </div>

        <div className='m-2'>
          <img src={gonvar} className='gonvarplus' alt='gonvar-logo' />
          <img src={plus} className='plusgonvar' />
        </div>

        <h3 className='bold font-size-16'>
          La suscripción {type}
          {responsive650 && <br />} que te permite ver {responsive650 && <br />}{' '}
          <b className='p-pink no-bold'>
            {!responsive650 && <br />} cientos de cursos{' '}
            {responsive650 && <br />}{' '}
          </b>{' '}
          de uñas y belleza en línea.
        </h3>

        <div className='space'>
          <h4 className='bold font-size-16'>
            ¡Accede a{' '}
            <b className='p-pink no-bold'>
              más de 70 cursos {responsive650 && <br />}
            </b>{' '}
            hoy mismo!
          </h4>
          <h4 className='bold font-size-16'>Sólo {price}</h4>
          <h4 className='bold font-size-16'>
            {
              type !== 'anual' ?
                'No incluye material'
                : 'Incluye material'
            }
          </h4>
        </div>

        <button
          className='btn left-right'
          onClick={() => handleNewRedirection()}
        >
          ¡Comenzar ahora!
        </button>

        <div className='whatsap-container'>
          <div
            className='watsap-button all-center'
            onClick={() => redirectToWhatsAppChat()}
          >
            <img
              src='/images/landing_suscription/whatsapp_outline.png'
              className=''
            />
            <p className='bold' style={{ margin: '0' }}>
              Contacta con <br />
              un agente
            </p>
          </div>
        </div>
      </div>

      <div className='courses-section'>
        <div className='space'>
          <h2 className='bold'>
            En esta plataforma de aprendizaje encontrarás
          </h2>
          <h2 className='h1'>
            <b className='p-pink'>
              MÁS DE 70 CURSOS DE UÑAS,{responsive650 && <br />}PESTAÑAS Y
              BELLEZA EN LÍNEA
            </b>
          </h2>
          <h2 className='bold'>
            donde aprenderás desde cero y {responsive650 && <br />}paso a paso.
          </h2>
        </div>
        <div className='special-course'>
          {type === 'cuatrimestral' && origin === 'google' ? (
            <>
              <img src={specialCourse?.image} />
              <p className='title'>Nails Master Revolution</p>
              <p className='p-pink'>
                Ahora ya disponible en tu suscripción Gonvar+.
              </p>
              <p className='p-pink'>
                La Certificación en aplicación de {responsive650 && <br />} uñas
                acrílicas desde 0 a Profesional.
              </p>
              <p className='p-pink'>Técnicas de Escultural y Tips Incluidas.</p>
            </>
          ) : (
            <>
              <img src='images\landing_suscription\portada_manicura_rusa.jpg' />
              <p className='title'>Manicura Rusa y uso de Drill</p>
              <p className='p-pink'>
                Ahora ya disponible en tu suscripción Gonvar+.
              </p>
              <p className='p-pink'>
                Los cursos de uso de drill,{responsive650 && <br />}{' '}
                desde 0 a Profesional.
              </p>
              <p className='p-pink'>
                Manicura rusa, esmaltado perfecto{' '}
                {responsive650 && <br />} y nivelación con rubber.
              </p>
            </>
          )}
        </div>
        <div className='all-center space less-margin'>
          <div className='group-buttons'>
            <div className='center'>
              <button
                className={`${cursos === 1 && 'select'}`}
                onClick={() => setCursos(1)}
              >
                Cursos de Arte
              </button>
              <button
                className={`${cursos === 2 && 'select'}`}
                onClick={() => setCursos(2)}
              >
                Cursos de Estructura
              </button>
              <button
                className={`${cursos === 3 && 'select'}`}
                onClick={() => setCursos(3)}
              >
                Cursos de Maquillaje
              </button>
            </div>
          </div>
        </div>

        {cursos === 1 && courseArt.length > 0 && (
          <div className='course-container all-center'>
            <div className='next courses-prev'>
              <MdArrowBackIosNew className='icon' />
            </div>
            <Swiper
              className='no-res'
              slidesPerView={3}
              spaceBetween={15}
              navigation={{
                nextEl: '.courses-next',
                prevEl: '.courses-prev',
              }}
              modules={[Navigation]}
            >
              {courseArt.map((e: any, index: number) => {
                return (
                  <SwiperSlide key={'data-landing-' + index}>
                    <img src={e.image} alt='Curso' className='thumbnail' />
                    <p>
                      <b className='p-pink'>{e.title} </b>
                      <br />
                      <i>{e.professors[0].name}</i>
                    </p>
                  </SwiperSlide>
                );
              })}
            </Swiper>
            <Swiper
              className='res'
              slidesPerView={1}
              spaceBetween={15}
              navigation={{
                nextEl: '.courses-next',
                prevEl: '.courses-prev',
              }}
              modules={[Navigation]}
            >
              {courseArt.map((e: any, index: number) => {
                return (
                  <SwiperSlide key={'data-landing-' + index}>
                    <img src={e.image} alt='Curso' className='thumbnail' />
                    <p>
                      <b className='p-pink'>{e.title} </b>
                      <br />
                      <i>{e.professors[0].name}</i>
                    </p>
                  </SwiperSlide>
                );
              })}
            </Swiper>
            <div className='next courses-next'>
              <MdArrowForwardIos className='icon' />
            </div>
          </div>
        )}
        {cursos === 2 && courseEst.length > 0 && (
          <div className='course-container all-center'>
            <div className='next courses-prev'>
              <MdArrowBackIosNew className='icon' />
            </div>
            <Swiper
              className='no-res'
              slidesPerView={3}
              spaceBetween={15}
              navigation={{
                nextEl: '.courses-next',
                prevEl: '.courses-prev',
              }}
              modules={[Navigation]}
            >
              {courseEst.map((e: any, index: number) => {
                return (
                  <SwiperSlide key={'data-landing-' + index}>
                    <img src={e.image} alt='Curso' className='thumbnail' />
                    <p>
                      <b className='p-pink'>{e.title} </b>
                      <br />
                      <i>{e.professors[0].name}</i>
                    </p>
                  </SwiperSlide>
                );
              })}
            </Swiper>
            <Swiper
              className='res'
              slidesPerView={1}
              spaceBetween={15}
              navigation={{
                nextEl: '.courses-next',
                prevEl: '.courses-prev',
              }}
              modules={[Navigation]}
            >
              {courseEst.map((e: any, index: number) => {
                return (
                  <SwiperSlide key={'data-landing-' + index}>
                    <img src={e.image} alt='Curso' className='thumbnail' />
                    <p>
                      <b className='p-pink'>{e.title} </b>
                      <br />
                      <i>{e.professors[0].name}</i>
                    </p>
                  </SwiperSlide>
                );
              })}
            </Swiper>
            <div className='next courses-next'>
              <MdArrowForwardIos className='icon' />
            </div>
          </div>
        )}
        {cursos === 3 && courseMake.length > 0 && (
          <div className='course-container all-center'>
            <div className='next courses-prev'>
              <MdArrowBackIosNew className='icon' />
            </div>
            <Swiper
              className='no-res'
              slidesPerView={3}
              spaceBetween={15}
              navigation={{
                nextEl: '.courses-next',
                prevEl: '.courses-prev',
              }}
              modules={[Navigation]}
            >
              {courseMake.map((e: any, index: number) => {
                return (
                  <SwiperSlide key={'data-landing-' + index}>
                    <img src={e.image} alt='Curso' className='thumbnail' />
                    <p>
                      <b className='p-pink'>{e.title} </b>
                      <br />
                      <i>{e.professors[0].name}</i>
                    </p>
                  </SwiperSlide>
                );
              })}
            </Swiper>
            <Swiper
              className='res'
              slidesPerView={1}
              spaceBetween={15}
              navigation={{
                nextEl: '.courses-next',
                prevEl: '.courses-prev',
              }}
              modules={[Navigation]}
            >
              {courseMake.map((e: any, index: number) => {
                return (
                  <SwiperSlide key={'data-landing-' + index}>
                    <img src={e.image} alt='Curso' className='thumbnail' />
                    <p>
                      <b className='p-pink'>{e.title} </b>
                      <br />
                      <i>{e.professors[0].name}</i>
                    </p>
                  </SwiperSlide>
                );
              })}
            </Swiper>
            <div className='next courses-next'>
              <MdArrowForwardIos className='icon' />
            </div>
          </div>
        )}

        {/* {courseGonvarPlus.length > 0 ?
          
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
          </div>} */}
        <button
          className='btn left-right mb-3'
          onClick={() => handleNewRedirection()}
        >
          ¡Comienza ahora!
        </button>
        <h5 className='p-pink'>
          <i>
            Y aprende muchas otras técnicas{responsive650 && <br />} sobre
            imagen personal.
          </i>
        </h5>
      </div>

      <div className='ubi-section'>
        <div className='back-ghosts'>
          <img src={ubiG1} className='g-1' />
          <img src={ubiG3} className='g-3' />
          <img src={ubiG2} className='g-2' />
        </div>
        <img src={ubi} className='ubiImg' />
        <h2 className='big-title bold'>
          NO IMPORTA {responsive650 && <br />}TU UBICACIÓN
        </h2>
        <h2 className='fs-3'>
          Disfruta de clases en línea{responsive650 && <br />} pregrabadas en
          alta definición, {responsive650 && <br />}aprende a tu ritmo,
          <br />
          <b className='p-pink fs-2 no-bold'>
            {' '}
            desde cualquier país, donde{responsive650 && <br />} quieras y a la
            hora que quieras.
          </b>
        </h2>
      </div>

      <div className='instructores-section'>
        <h2 className='big-title bold'>
          <b className='p-pink no-bold'>
            ¡Nunca te dejaremos {responsive650 && <br />}sola,{' '}
          </b>{' '}
          {!responsive650 && <br />}
          en tu proceso {responsive650 && <br />}de aprendizaje!
        </h2>
        <div className='instructores'>
          {!responsive650 ? (
            <>
              <div className='inst-cont'>
                <img src={reina} />
                <p>
                  <b>Reina Rauda </b>
                  <br />
                  <i className='p-pink'>Especialista en maquillaje</i>
                </p>
              </div>
              <div className='inst-cont'>
                <img src={cony} />
                <p>
                  <b className='middle'>Cony Juárez </b>
                  <br />
                  <i className='p-pink'>Especialista en mano alzada</i>
                </p>
              </div>
              <div className='inst-cont'>
                <img src={arita} />
                <p>
                  <b className='arita'>Arita Gonvar </b>
                  <br />
                  <i className='p-pink'>Especialista en uñas</i>
                </p>
              </div>
              <div className='inst-cont'>
                <img src={antonio} />
                <p>
                  <b className='middle'>Antonio Rico </b>
                  <br />
                  <i className='p-pink'>Especialista en micropintura</i>
                </p>
              </div>
              <div className='inst-cont'>
                <img src={liz} />
                <p>
                  <b>Liz Torres </b>
                  <br />
                  <i className='p-pink'>Especialista en Manicura Rusa</i>
                </p>
              </div>
            </>
          ) : (
            <>
              <div className='inst-cont'>
                <img src={arita} />
                <p className='text-person'>
                  <b className='arita'>Arita Gonvar </b>
                  <br />
                  <i className='p-pink'>Especialista en uñas</i>
                </p>
              </div>
              <div className='duo-containers'>
                <div className='inst-cont left-img'>
                  <img src={reina} />
                  <p className='text-person'>
                    <b>Reina Rauda </b>
                    <br />
                    <i className='p-pink'>Especialista en maquillaje</i>
                  </p>
                </div>
                <div className='inst-cont resp-img'>
                  <img src={antonio} />
                  <p className='text-person'>
                    <b>Antonio Rico </b>
                    <br />
                    <i className='p-pink'>Especialista en micropintura</i>
                  </p>
                </div>
              </div>
            </>
          )}
        </div>
        <h3 className='bold space'>
          Los cursos son impartidos por {responsive650 && <br />}
          <b className='p-pink no-bold'>
            instructores profesionales y {responsive650 && <br />}certificados,
          </b>{' '}
          {!responsive650 && <br />}que estarán guiándote{' '}
          {responsive650 && <br />}paso a paso, durante tu aprendizaje.
        </h3>
        <button
          className='btn up-down spacing'
          onClick={() => handleNewRedirection()}
        >
          Quiero comenzar
          <br /> hoy mismo
        </button>
      </div>

      <div className='difficulties-section'>
        <h2 className='h1 bold'>
          Nuestra suscripción{responsive650 && <br />} cuenta con{' '}
          {!responsive650 && <br />}
          <b className='p-pink bold'>
            cursos de {responsive650 && <br />}diferentes grados de{' '}
            {responsive650 && <br />}dificultad,
          </b>{' '}
          {!responsive650 && <br />}
          desde {responsive650 && <br />}principiantes hasta niveles{' '}
          {responsive650 && <br />}más avanzados.
        </h2>
        {!responsive650 ? (
          <div className='dif-lines'>
            <img src={lineaDif} className='behind' />
            <img src={muyFacil} className='level' />
            <img src={facil} className='level bigger' />
            <img src={intermedio} className='level' />
            <img src={avanzado} className='level bigger' />
            <img src={master} className='level bigger' />
          </div>
        ) : (
          <div className='resp-difficulty'>
            <div className='container-difficulty'>
              <img src={muyFacil} className='level-size easy' />
              <img src={facil} className='level' />
              <img src={intermedio} className='level-size extra-margin' />
            </div>
            <div className='container-difficulty'>
              <img src={avanzado} className='level' />
              <img src={master} className='level' />
            </div>
          </div>
        )}

        <h4 className='fst-italic'>
          No importa si vas comenzando o si ya tienes conocimientos,{' '}
          {!responsive650 && <br />}
          te aseguramos que tenemos un curso para ti.
        </h4>
      </div>

      <div className='teaching-section'>
        <h2 className='bold title-size'>
          Además, en la plataforma {responsive650 && <br />} encontrarás
          diferentes
        </h2>
        <h2 className='big-title p-pink'>Líneas de aprendizaje</h2>

        <div className='teach-lines all-center'>
          <div className='lines'>
            <img src={lineaArteU} />
            <div className='line-desc'>
              <h2 className='bold'>Arte en Uñas</h2>
              <h3 className='p-pink fw-normal'>Línea 1</h3>
            </div>
          </div>

          <div className='lines'>
            <img src={lineaUñas} />
            <div className='line-desc'>
              <h2 className='bold'>Estructura de Uñas</h2>
              <h3 className='p-pink fw-normal'>Línea 2</h3>
            </div>
          </div>

          <div className='lines'>
            <img src={lineaMaq} />
            <div className='line-desc'>
              <h2 className='bold'>Maquillaje</h2>
              <h3 className='p-pink fw-normal'>Línea 3</h3>
            </div>
          </div>
        </div>

        <h3 className='bold'>
          Así tendrás la oportunidad de <br />
          <b className='p-pink'>
            aprender desde lo básico hasta{responsive650 && <br />} convetirte
            en Master.
          </b>
        </h3>
      </div>

      <div className='certificado-section all-center'>
        <div className='back-lines all-center'>
          <img className='line-3' src={certifB3} />
          <img className='line-4' src={certifB4} />
          <img className='line-1' src={certifB1} />
          <img className='line-2' src={certifB2} />
        </div>
        <div className='all-center'>
          <img src={certificadoMujer} className='cert-img' />
          <div className='cert-text'>
            <h2 className='p-pink big-title mb-4 bold'>Certificado FUV</h2>
            <h2 className='bold mb-4 text-width'>
              Con <b className='p-pink'>Gonvar+</b> podrás enviar tus
              {responsive650 && <br />} prácticas para revisión y al
              {responsive650 && <br />} aprobarlas,
              <b className='p-pink'>
                {' '}
                obtendrás la {responsive650 && <br />}certificación
              </b>{' '}
              correspondiente {responsive650 && <br />}al curso que hayas
              tomado.
            </h2>
            {!responsive650 && (
              <h2 className='bold text-width'>
                Te entregaremos un{' '}
                <b className='p-pink'>
                  {' '}
                  certificado oficial de la marca, que cuenta con un FUV
                  <i>(folio único verificado).</i>
                </b>
              </h2>
            )}
          </div>
          {responsive650 && (
            <h2 className='bold text-width resp-text'>
              Te entregaremos un{' '}
              <b className='p-pink'>
                {' '}
                certificado {responsive650 && <br />}oficial de la marca, que
                cuenta {responsive650 && <br />}con un FUV
                <i>(folio único verificado).</i>
              </b>
            </h2>
          )}
        </div>
      </div>

      <div className='all-center cellphone-section'>
        <div className='text-end cell-body'>
          <h2 className='title'>
            ¡Obtén{' '}
            <b className='p-pink'>
              asesorías personalizadas <br />
            </b>{' '}
            y conviértete en una experta <br />
            en uñas y belleza!
          </h2>
          <div className='back-lines all-center'>
            <img src={backCell} className='line-1' />
            <img src={backCell3} className='line-2' />
            <img src={backCell2} className='line-3' />
          </div>
          <div className='subtitle'>
            <h3 className='bold'>
              Mejora tu proceso de aprendizaje con nuestras
              <b className='p-pink no-bold'>
                {' '}
                asesorías individuales e ilimitadas con nuestros instructores
                certificados.
              </b>
              {responsive650 && (
                <>
                  <br />
                  <br />
                </>
              )}{' '}
              Aprende de manera correcta y alcanza tus metas con confianza.
              {responsive650 && (
                <button
                  className='btn up-down'
                  onClick={() => handleNewRedirection()}
                >
                  Comienza ahora
                  <br /> por {price}
                </button>
              )}
            </h3>
            {responsive650 && <img src={asesoriaTel} className='ms-3' />}
          </div>
          <div className='text-center '>
            {!responsive650 && (
              <button
                className='btn up-down'
                onClick={() => handleNewRedirection()}
              >
                Comienza ahora
                <br /> por {price}
              </button>
            )}
          </div>
        </div>
        {!responsive650 && <img src={asesoriaTel} className='ms-3' />}
      </div>
      <div className='benefits-section'>
        <div className='title all-center'>
          <img src={miniLogo} className='mx-3' />
          <h2 className='text-start h1 bold'>
            Recibe{' '}
            <b className='p-pink no-bold'>
              beneficios, {responsive650 && <br />}contenido exclusivos <br /> y
              recompensas
            </b>{' '}
            con tu {responsive650 && <br />}suscripción
          </h2>
        </div>
        <div className='list-container'>
          <div className='left-side'>
            <div className='list'>
              <img src={envio} className='me-3' />
              <h5>
                <b className='p-pink'>Envío gratis</b> de productos en compras
                superiores a $1,000.00 MXN
              </h5>
            </div>

            <div className='list'>
              <img src={boleto} className='me-3' />
              <h5>
                Por cada mes dentro, recibes un boleto acumulable más para el{' '}
                <b className='p-pink'>
                  sorteo cuatrimestral donde podrás ganas hasta $20,000.00
                </b>
              </h5>
            </div>

            <div className='list'>
              <img src={descuento} className='me-3' />
              <div className='m-0'>
                <h5>
                  <b className='p-pink'>20% de descuento</b> en todo el producto
                  Gonvar.
                </h5>
              </div>
            </div>

            <div className='list'>
              <img src={regalo} className='me-3' />
              <h5>
                Envíos de <b className='p-pink'>Kits de producto de regalo. </b>
                <i className='subtitle fs-6'>(Sólo pagarás envío)</i>
              </h5>
            </div>

            <div className='list'>
              <img src={certificado} className='me-3' />
              <h5>
                <b className='p-pink'>Certificación oficial de la marca</b> por
                cada curso que completes.
              </h5>
            </div>

            <div className='list'>
              <img src={star} className='' />
              <div className='ms-3'>
                <h5>
                  <b className='p-pink'>Sistema de puntos acumulables</b> que
                  podrás cambiar por premios. Cada tarea, clase y curso
                  aprobados genera puntos.
                </h5>
              </div>
            </div>
          </div>
          <div className='benefits-ghosts'>
            <img src={envioG} className='back' />
            <img src={envioMujer} className='girl' />
            <img src={goldStar} className='star' />
          </div>
        </div>
      </div>

      <div className='cost-section all-center'>
        <img src={chica} className='ms-5 chica-img' />
        <div className='mx-3'>
          <h2 className='red bolder red-font'>
            Costo total real: <del>{responsive650 && <br />}$74,719.00 MXN</del>
          </h2>
          <h2 className='p-pink bolder big-font'>
            Más de 70{responsive650 && <br />} cursos completos
          </h2>
          <h2 className='green bolder big-font'>Sólo {price}</h2>
          <button
            className='btn left-right mt-5'
            onClick={() => handleNewRedirection()}
          >
            ¡Quiero comenzar <br />
            ahora!
          </button>
        </div>
        <img src={manosPrecio} className='manos' />
      </div>
      <RewardComponent />
      <div className='testimonio-section'>
        <h2 className='h1 bold big-title'>
          Más de 45,000{responsive650 && <br />} alumnas
        </h2>
        <div className='experiences-container'>
          <div className='next swiper-prev'>
            <BsChevronLeft className='icon' />
          </div>
          <Swiper
            className='experiences'
            slidesPerView={3}
            spaceBetween={30}
            loop={true}
            navigation={{
              nextEl: '.swiper-next',
              prevEl: '.swiper-prev',
            }}
            modules={[Navigation]}
          >
            {reviews.length > 0 &&
              reviews.map((review: any, index: any) => {
                return (
                  <SwiperSlide
                    id={'slide' + index}
                    key={review.username + '_ID'}
                  >
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
                );
              })}
          </Swiper>

          <Swiper
            className='experiences resp'
            slidesPerView={1}
            loop={true}
            spaceBetween={30}
            navigation={{
              nextEl: '.swiper-next',
              prevEl: '.swiper-prev',
            }}
            modules={[Navigation]}
          >
            {reviews.length > 0 &&
              reviews.map((review: any, index: any) => {
                return (
                  <SwiperSlide
                    id={'slide' + index}
                    key={review.username + '_ID'}
                  >
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
                );
              })}
          </Swiper>
          <div className='next swiper-next'>
            <BsChevronRight className='icon' />
          </div>
        </div>
      </div>

      {!responsive650 && (
        <div className='inspo-section'>
          <h2 className='p-pink big-title bold mb-5'>
            ¿Necesitas Inspiración?
          </h2>
          <h4 className='bold mb-5'>
            Si no sabes que diseños aplicar a tus clientas, <br />
            descarga nuestro catálogo completo con más de{' '}
            <b className='p-pink no-bold'>400 diseños ya disponibles.</b>
          </h4>
          {/* <img src={inspo} /> */}
          <div className='inspo-swiper'>
            <Swiper
              slidesPerView={3}
              spaceBetween={15}
              loop={true}
              className='w-est'
            >
              <SwiperSlide>
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

          <div className='inspo-swiper res'>
            <Swiper slidesPerView={1} spaceBetween={30} loop={true}>
              <SwiperSlide>
                <img src={inspo1} className='swiper-item' />
              </SwiperSlide>
              <SwiperSlide>
                <img src={inspo2} className='swiper-item' />
              </SwiperSlide>
              <SwiperSlide>
                <img src={inspo3} className='swiper-item' />
              </SwiperSlide>
              <SwiperSlide>
                <img src={inspo4} className='swiper-item' />
              </SwiperSlide>
            </Swiper>
          </div>
          <h4 className='bold mt-5'>
            Además,{' '}
            <b className='p-pink no-bold'>
              aprende a hacer todos estos diseños{' '}
            </b>
            en nuestros más de 70 cursos.
          </h4>

          {/*     Catalogo?????????????????????????????????????         
            <div className="all-center">
              <div className="email-send">
                <input className="email-input" placeholder="Escribe tu e-mail"></input>
                <button className="email-button">Envíame el catalogo</button>
              </div>
            </div> */}
        </div>
      )}

      <div className='dudas-section'>
        <div className='all-center'>
          <div className='text-end'>
            <h2 className=''>¿Tienes alguna duda?</h2>
            <h2 className='p-pink bold'>
              Nuestro equipo
              <br /> está para ayudarte.
            </h2>
          </div>
          <div className='dudas-img'>
            <img src={pointWatsap} className='point' />
            <div
              className='watsap-button all-center'
              onClick={() => redirectToWhatsAppChat()}
            >
              <img src={watsapOut} className='me-3' />
              <p className='my-1 bold'>
                Contacta con
                <br /> un agente
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className='faq-section'>
        <h2 className='p-pink bold big-title'>Preguntas Frecuentes</h2>
        <div className='faq'>
          <div className='all-center'>
            <div
              className={`q-container ${views.get(1) ? 'max' : 'min'}`}
              onClick={() => verQ(1)}
            >
              <div className={`q ${views.get(1) && 'open-q'}`}>
                <p className={`title bolder`}>¿Entregan reconocimiento?</p>
                {views.get(1) ? (
                  <BsChevronUp className='icon' />
                ) : (
                  <BsChevronDown className='icon' />
                )}
              </div>

              <div className='border-top'>
                <p className='a'>
                  ¡Claro!
                  <br />
                  Cada curso terminado, con prácticas aprobadas, te brinda un
                  certificado con un folio único verificado para que puedas
                  respaldar tus conocimientos.
                </p>
              </div>
            </div>
          </div>

          <div className='all-center'>
            <div
              className={`q-container ${views.get(2) ? 'max' : 'min'}`}
              onClick={() => verQ(2)}
            >
              <div className={`q ${views.get(2) && 'open-q'}`}>
                <p className={`title bolder`}>
                  ¿Qué métodos de pago puedo usar para pagar mi suscripción?
                </p>
                {views.get(2) ? (
                  <BsChevronUp className='icon' />
                ) : (
                  <BsChevronDown className='icon' />
                )}
              </div>

              <div className='border-top'>
                <p className='a'>
                  Nuestros métodos de pago son súper cómodos.
                  <br />
                  Si deseas pagar por mes, puedes hacerlo con cualquier tarjeta
                  de crédito o débito.
                  <i>(El cobro se realiza de manera automática mes con mes).</i>
                  <br />
                  Si prefieres pagar en transferencia, depósito en Oxxo o
                  Paypal, está disponible la anualidad o el plan cuatrimestral,{' '}
                  <i>
                    (Pagando anualidad no se realiza ningún cobro adicional por
                    un año).
                  </i>
                </p>
              </div>
            </div>
          </div>

          <div className='all-center'>
            <div
              className={`q-container ${views.get(3) ? 'max' : 'min'}`}
              onClick={() => verQ(3)}
            >
              <div className={`q ${views.get(3) && 'open-q'}`}>
                <p className={`title bolder`}>
                  ¿Puedo cancelar en cualquier momento?
                </p>
                {views.get(3) ? (
                  <BsChevronUp className='icon' />
                ) : (
                  <BsChevronDown className='icon' />
                )}
              </div>

              <div className='border-top'>
                <p className='a'>
                  Así es, tú eliges libremente cuánto tiempo deseas aprender y
                  gozar de todos nuestros beneficios.
                  <br />
                  Todos los descuentos a los que tienes derecho se pierden al
                  momento de cancelar.
                </p>
              </div>
            </div>
          </div>

          <div className='all-center'>
            <div
              className={`q-container ${views.get(4) ? 'max' : 'min'}`}
              onClick={() => verQ(4)}
            >
              <div className={`q ${views.get(4) && 'open-q'}`}>
                <p className={`title bolder`}>
                  ¿Puedo inscribirme desde cualquier país?
                </p>
                {views.get(4) ? (
                  <BsChevronUp className='icon' />
                ) : (
                  <BsChevronDown className='icon' />
                )}
              </div>

              <div className='border-top'>
                <p className='a'>
                  Si, nuestra plataforma está diseñada para poder utilizarse
                  desde cualquier lugar del mundo que cuente con acceso a
                  internet y puedes disfrutar desde un celular, tableta
                  electrónica o computadora.
                </p>
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
    </SuscriptionContain>
  );
};
export default LandingSuscription;