import React, { useEffect, useState } from 'react'
import { ModalContainer, InfoContainer } from '../../../components/Error/ErrorModal.styled';
import { InputCard, WhiteLoader } from '../../../containers/Profile/User/User.styled';
import { attachPaymentMethod, attachPaymentMethodConekta, createPaymentMethod } from '../../../components/api/profile';
import { IoClose } from 'react-icons/io5';
declare let window: any
const ActiveUserConekta = ({ ondHide, show, user }: any) => {
  const [open, setOpen] = useState<boolean>(false);
  const [card, setCard] = useState<any>({
    holder: '', number: '', cvc: '', exp_month: '', exp_year: ''
  });
  const [loader, setLoader] = useState<any>(false);
  const [isActive, setIsActive] = useState<boolean>(false);

  useEffect(() => {
    window.Conekta.setPublicKey('key_U5yJatlpMvd1DhENgON5ZYx');
  }, [])


  const addNewCard = async () => {
    setLoader(!loader);
    if (Object.keys(card).some(key => card[key] === '')) {
      alert('Por favor acomplete todos los campos!');
      setLoader(false);
    } else {
      let tempCard = {
        card: {
          number: card.number.replaceAll(" ", ""),
          name: card.holder,
          exp_month: card.exp_month,
          exp_year: card.exp_year,
          cvc: card.cvc,
        }
      }

      window.Conekta.Token.create(
        tempCard,
        conektaSuccessResponseHandler,
        conektaErrorResponseHandler, 'web'
      );
    }
  }

  const conektaSuccessResponseHandler = (token: any) => {
    let tokenId = token.id
    const body = {
      token_id: tokenId,
      conekta_id: user.conekta_id
    }
    attachPaymentMethodConekta(body).then((res) => {
      ondHide();
    })
  }
  const conektaErrorResponseHandler = (response: any) => {
    alert("Hay un error en los datos de la tarjeta!")
    setLoader(false)
  };

  return (
    <ModalContainer show={show} onHide={ondHide} centered>
      <InfoContainer>
        <IoClose className='close-icon' onClick={ondHide} />
        <p>Gonvar está pasando por un cambio importante en beneficio de nuestras alumnas.</p>
        <p className='p14'>🚨Para esto es necesario que vuelvas a ingresar tus datos bancarios para no perder el acceso a tu
          suscripción mensual por $149 MXN al mes y todos tus beneficios acumulados.</p>
        <p className='p14-bold'>A partir del 18 de septiembre aumentaremos nuestros precios en la suscripción mensual a $249 MXN al mes. </p>
        <p className='p14'>Todas las alumnas que cuenten con su suscripción activa antes de esta fecha se les respetará el precio actual y <span className='p14-bold' style={{ fontWeight: "bold" }}>no habrá aumento en su mensualidad.</span></p>
        <p className='p14'>Para ingresar tu información necesitarás contar con tarjeta de crédito o débito vigente. </p>
        <p className='p14'>Haz click en el botón <span className='p14-bold' style={{ fontWeight: 'bold' }}>Actualizar información</span> para agregar tus datos.</p>
        <button onClick={() => { setIsActive(true) }}>Actualizar información</button>
        {isActive && <div className="new-card">
          <p className="main-title">Ingresa nuevamente un método de pago</p>
          <div className="container-2">
            <div className="card-input">
              <p>Nombre</p>
              <input
                placeholder="Nombre del propietario" onChange={(e) => {
                  setCard((card: any) => ({ ...card, holder: e.target.value }));
                }}
              />
            </div>
            <div className="card-input">
              <p>Número de tarjeta</p>
              <InputCard placeholder="XXXX XXXX XXXX XXXX" mask='9999 9999 9999 9999' maskChar={null} onChange={(e: any) => {
                setCard((card: any) => ({ ...card, number: e.target.value }));
              }} />
            </div>
            <div className="info">
              <div className="date">
                <p>
                  Fecha de expiración
                </p>
                <div className="inputs">
                  <input
                    placeholder="Mes"
                    className="date-inputs"
                    maxLength={2} onChange={(e) => {
                      setCard((card: any) => ({ ...card, exp_month: e.target.value }));
                    }}
                  />
                  <input
                    placeholder="Año"
                    className="date-inputs"
                    maxLength={4} onChange={(e) => {
                      setCard((card: any) => ({ ...card, exp_year: e.target.value }));
                    }}
                  />
                </div>
              </div>
              <div className="date">
                <p>CVV</p>
                <input
                  type={"password"}
                  placeholder="***"
                  className="date-inputs"
                  maxLength={4} onChange={(e) => {
                    setCard((card: any) => ({ ...card, cvc: e.target.value }));
                  }}
                />
              </div>
            </div>
          </div>
          {
            !loader
              ?
              <div className="button-contain" onClick={() => {
                addNewCard();
              }}>
                <button>Guardar</button>
              </div>
              : <WhiteLoader />
          }
        </div>}
      </InfoContainer>
    </ModalContainer>
  )
}
export default ActiveUserConekta;