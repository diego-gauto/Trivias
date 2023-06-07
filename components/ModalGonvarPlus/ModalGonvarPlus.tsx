import { useRouter } from 'next/router';
import React, { useEffect, useState, useRef } from 'react'
import { Modal } from 'react-bootstrap'
import { BiPlusMedical } from 'react-icons/bi';
import { FaChevronDown } from 'react-icons/fa';
import { TfiClose } from 'react-icons/tfi';
import { PREVIEW_PATH, PURCHASE_PATH, SIGNUP_PATH } from '../../constants/paths';
import { getTeacher } from '../../store/actions/courseActions';
import CourseModal from '../CourseModal/CourseModal';
import { ICourse } from './IModalGonvarPlus';
import { BackgroundContainer, BottomContainer, CoursesContainer, Middlecontainer, ModalContainer } from './ModalGonvarPlus.styled';


export const ModalGonvarPlus = (props: ICourse) => {
  let today = new Date().getTime() / 1000;
  const backgroundImage = "/images/ModalImages/gonvarplusmetal.jpg"
  const phoneImage = "/images/ModalImages/telefonogonvar.png"
  const handPaintImage = "/images/ModalImages/manopintando.png"
  const GonvarLogo = "/images/purchase/logo.png";
  const [showModal, setShowModal] = useState(false);
  const [courseModal, setCourseModal] = useState<any>([]);
  const { openModal, setOpenModal, course, user, loggedIn } = props;
  const router = useRouter();
  let [counter, setCounter] = useState<any>(0);
  const handleClose = () => setOpenModal(false);
  const ref = useRef<any>(null);

  let pos = { top: 0, left: 0, x: 0, y: 0 };
  const handleClick = () => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  };
  let slider: any;
  const mouseDownHandler = function (e: any) {
    slider = document.querySelector(".scroll-container") as HTMLElement;
    e.preventDefault();
    pos = {
      // The current scroll
      left: slider.scrollLeft,
      top: slider.scrollTop,
      // Get the current mouse position
      x: e.clientX,
      y: e.clientY,
    };
    document.addEventListener('mousemove', mouseMoveHandler);
    document.addEventListener('mouseup', mouseUpHandler);
  };

  const mouseMoveHandler = function (e: any) {
    setCounter(counter++);
    // How far the mouse has been moved
    const dx = e.clientX - pos.x;
    slider.scrollLeft = pos.left - dx;
  };
  const mouseUpHandler = function () {
    document.removeEventListener('mousemove', mouseMoveHandler);
    document.removeEventListener('mouseup', mouseUpHandler);
  };

  const goTo = () => {
    if (user) {
      if (user.level === 1 || user.final_date > today) {
        router.push(PREVIEW_PATH)
      }
      else {
        router.push(`${PURCHASE_PATH}?type=subscription`)
      }
    }
    else {
      router.push(SIGNUP_PATH)
    }
  }
  return (
    <ModalContainer show={openModal} onHide={handleClose} size="lg" centered style={{ borderRadius: 0, paddingLeft: 0, paddingRight: 0 }}>
      <BackgroundContainer>
        <img className="img-background" src={backgroundImage} />
        <img className="img-hand-phone" src={phoneImage} />
        <img className="img-hand-paint" src={handPaintImage} />
        <TfiClose className="close" onClick={handleClose} />
        <div className="upper-contain">
          <div className="first-container">
            <div className="text-contain">
              <img src={GonvarLogo} />
              <p className="text">
                Gonvar+
              </p>
            </div>
            <p className="subs-text">
              Suscripción mensual
            </p>
          </div>
          <div className="second-container">
            <p className="title">
              TE DAMOS<span> LA BIENVENIDA A</span>
            </p>
          </div>
        </div>
        <div className="bottom-contain">
          <div className="first-container">
            <p className="text">
              Por favor, pasa.<br />
              <span>
                ¡Te estábamos esperando!
              </span>
            </p>
          </div>
          <div className="second-container" onClick={handleClick}>
            <p className="text">
              VER MAS
            </p>
            <FaChevronDown className="chevron-down" />
          </div>
        </div>
      </BackgroundContainer>
      <Middlecontainer ref={ref}>
        <div className="main-title">
          <p className="text-title">
            Obtén acceso inmediato<span> a todos los siguientes artículos </span><span className="span2">*</span><br />
            con una <span>única suscripción mensual de Gonvar+</span><br />
            <span className="span3">por sólo $149 <span style={{ fontWeight: 500 }}>MXN/mes</span></span>
          </p>
          <div className="bottom-container">
            <button className="start-button"
              onClick={goTo}
            >Comenzar ahora</button>
            <div className="left-text">
              <p className="text">
                <span className="span1">*</span> Costo ordinario sin suscripción <br />
                <span className="span2">$32,299 MXN</span>
              </p>
            </div>
          </div>
          <div className="cards">
            <div className="cards-position">
              <div className="card-container">
                <p className="index">1</p>
                <div className="card-content">
                  <div className="divider" />
                  <div className="info-texts">
                    <p className="first-text">
                      Más de 25 cursos y
                      300 clases deuñas y belleza
                      en línea
                    </p>
                    <p className="second-text">
                      Con instructores
                      profesionales,
                      niveles desde
                      básicos a
                      avanzados, incluye
                      reconocimientos y
                      certificados.
                    </p>
                  </div>
                  <p className="price-text">
                    $30,000 MXN <span> ª</span>
                  </p>
                </div>
              </div>
              <div className="card-container">
                <p className="index second-index">2</p>
                <div className="card-content">
                  <div className="divider second-divide" />
                  <p className="first-text">
                    Revisión de
                    prácticas y
                    asesorías
                    ilimitadas
                  </p>
                  <p className="price-text">
                    $1,500 MXN <span> ª</span>
                  </p>
                  <BiPlusMedical className="plus-icon" />
                  <p className="first-text">
                    40% de
                    descuento en
                    productos
                    Gonvar
                    <span className="span-small"> ¹</span>
                  </p>
                </div>
              </div>
            </div>
            <div className="cards-position">
              <div className="card-container">
                <p className="index third-index">3</p>
                <div className="card-content">
                  <div className="divider third-divide" />
                  <div className="info-texts">
                    <p className="first-text">
                      Un Mini Kit
                      con diferentes
                      productos
                      cada dos
                      meses
                    </p>
                    <p className="second-text">
                      Acrílicos, geles,
                      monómeros,
                      adherentes,
                      decoración y más.
                    </p>
                  </div>
                  <p className="price-text">
                    $650 MXN<span> ª</span>
                  </p>
                </div>
              </div>
              <div className="card-container">
                <p className="index fourth-index">4</p>
                <div className="card-content">
                  <div className="divider fourth-divide" />
                  <div className="info-texts">
                    <p className="first-text">
                      Rifa trimestral
                      donde podrás
                      ganar hasta <span>$20,000 MXN</span> en premios.
                    </p>
                    <p className="second-text">
                      Por cada mes
                      inscrito en
                      Gonvar+ recibes
                      un boleto
                      adicional.
                    </p>
                  </div>
                  <p className="price-text">
                    $149 MXN <span> ª</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Middlecontainer>
      <BottomContainer>
        <p className="main-text">
          Cursos incluidos en <span>Gonvar+</span>
        </p>
        <div className="courses scroll-container" id="scroll-container" style={{ paddingLeft: 30 }}>
          <div className='courses-2' onMouseDown={mouseDownHandler}>
            {
              course.map((val: any, index: any) => {
                return (
                  <CoursesContainer key={"Course data " + index}>
                    <div className="image-contain">
                      <button className="btn-info" onClick={() => { setShowModal(true), setCourseModal(val) }}>Mas informacion</button>
                      <img src={val.image} className="img-course" />
                    </div>
                    <div className="course-info">
                      <p className="course-name">
                        {val.title}
                      </p>
                      {
                        val.professors.length > 0 &&
                        <p className="course-professor">
                          de <span>{val.professors[0].name}</span>
                        </p>
                      }
                    </div>
                  </CoursesContainer>
                )
              })
            }
          </div>
        </div>
        <div className="footer-text">
          <p className="text-1">
            ª Costo promedio al adquirirlo de forma individual.<br />
            ¹ Primer mes en <span>Gonvar+</span> 10% dto.; 3 meses 20% dto.; 6 meses 40% dto.<br />
            ² Costo por cada boleto para participar en la rifa.
          </p>
        </div>
      </BottomContainer>
      <CourseModal show={showModal} setShow={setShowModal} course={courseModal} user={user} />
    </ModalContainer >
  )
}
