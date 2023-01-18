import React from 'react'
import { Modal } from 'react-bootstrap'
import { FaChevronDown } from 'react-icons/fa';
import { BackgroundContainer, BottomContainer, Middlecontainer } from './ModalGonvarPlus.styled';


export const ModalGonvarPlus = ({ show, setShow }: any) => {
  const backgroundImage = "/images/ModalImages/gonvarplusmetal.jpg"
  const phoneImage = "/images/ModalImages/telefonogonvar.png"
  const handPaintImage = "/images/ModalImages/manopintando.png"
  const handleClose = () => setShow(false);
  return (
    <Modal show={show} onHide={handleClose} size="lg" centered style={{ borderRadius: 0 }}>
      <BackgroundContainer>
        <img className="img-background" src={backgroundImage} />
        <img className="img-hand-phone" src={phoneImage} />
        <img className="img-hand-paint" src={handPaintImage} />
        <div className="upper-contain">
          <div className="first-container">
            <div className="text-contain">
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
          <div className="second-container">
            <p className="text">
              VER MAS
            </p>
            <FaChevronDown className="chevron-down" />
          </div>
        </div>
      </BackgroundContainer>
      <Middlecontainer>
        <div className="main-title">
          <p className="text-title">
            Obtén acceso inmediato<span> a todos los siguientes artículos </span><span className="span2">*</span><br />
            con una <span>única suscripción mensual de Gonvar+</span><br />
            <span className="span3">por sólo $149 <span style={{ fontWeight: 500 }}>MXN/mes</span></span>
          </p>
          <div className="bottom-container">
            <button className="start-button">Comenzar ahora</button>
          </div>
        </div>
      </Middlecontainer>
      <BottomContainer>
        <p className="main-text">
          Algunos cursos incluidos en <span>Gonvar+</span>
        </p>
      </BottomContainer>
    </Modal>
  )
}
