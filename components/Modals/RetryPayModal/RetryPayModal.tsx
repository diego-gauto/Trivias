import React from 'react'
import { ModalContainer, RetryPayModalContain } from './RetryPayModal.styled'
import { IRetryPayModal } from './IRetryPayModal'
const alert_icon = "/images/RetryPayment/alert-icon.png";
export const RetryPayModal = (props: IRetryPayModal) => {
  const { show, onHide, withSubscription } = props;

  return (
    <ModalContainer show={show} onHide={onHide} centered>
      <RetryPayModalContain>
        <div className='data-contain'>
          <img src={alert_icon} className='alert-icon' />
          <p className='bold'>Tu cuenta està suspendida.</p>
          {
            withSubscription
              ?
              <>
                <p className='bold'>¿Quieres reintentar el pago?</p>
                <p className='paragraph'>
                  No pudimos procesar tu pago mas reciente. Reintenta con
                  tu (MASTERCARD - 4811) O actualiza tu información de pago
                  para seguir disfrutando de los cursos.
                </p>
              </>
              :
              <>
                <p className='bold'>Se ha terminado tu suscripción y tus {'4 meses o tus X Días'} de acceso. ¡No te preocupes!</p>\
                <p className='paragraph'>
                  Si quieres seguir disfrutando de los {'no. De cursos'}
                  cursos disponibles en Gonvar+, puedes agregar 4 meses de acceso
                  más por 1,599 MXN y así recuperar tus beneficios obtenidos.
                </p>
              </>
          }
          <button>Reintentar pago</button>
          <button>Actualiza info de pago</button>
        </div>
      </RetryPayModalContain>
    </ModalContainer>
  )
}
