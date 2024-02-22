import React, { useEffect, useState } from 'react'
import { ModalContainer, RetryPayModalContain } from './RetryPayModal.styled'
import { IRetryPayModal } from './IRetryPayModal'
import { useAuth } from '../../../hooks/useAuth';
import { conektaPm } from '../../api/users';
import router from "next/router";

import { customerOrders, retryPayment } from '../../api/profile';
import { IoClose } from 'react-icons/io5';
const alert_icon = "/images/RetryPayment/alert-icon.png";
export const RetryPayModal = (props: IRetryPayModal) => {
  const { show, onHide, withSubscription } = props;
  const context = useAuth();
  const user = context.user;
  const [pm, setPm] = useState<any>([]);
  const [isLaoding, setIsloading] = useState(false);
  const [invoice, setInvoice] = useState({} as any);
  const [cards, setCards] = useState(0);
  const pay = () => {
    console.log(user);
    console.log(invoice);
    console.log(pm);

    let body = {
      paymentMethodId: pm.id,
      amount: invoice.amount,
      orderId: invoice.id
    }

    retryPayment(body).then((res) => {
      console.log(res);

    })

    // window.location.href ="month" ? "/pagoexitosomensualidad" : "/pagoexitosoanualidad";
  }

  const paymentMethods = () => {
    setIsloading(true);
    let body = {
      stripe_id: user.stripe_id,
      conekta_id: user.conekta_id
    }
    conektaPm(body).then((res) => {
      let cards = res.data.payment_methods.data
      let card = cards.filter((x: any) => x.default);
      setPm(card[0]);
      if (cards) {
        setCards(cards.length)
      }
      setIsloading(false);
    })
  }

  const dueOrders = () => {
    customerOrders({ conekta_id: user.conekta_id }).then((res) => {
      let order = res.data.data[0];
      setInvoice(order);
    })
  }

  const goTo = () => {
    onHide();
    router.push({ pathname: "/reintentar-pago" })
  }

  useEffect(() => {
    paymentMethods();
    // dueOrders();
  }, [])

  return (
    <ModalContainer show={show} centered>
      {!isLaoding && <RetryPayModalContain>
        <IoClose className='close' onClick={onHide} />
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
                  tu ({pm.brand} - {pm.last4}) O actualiza tu información de pago
                  para seguir disfrutando de los cursos.
                </p>
              </>
              :
              <>
                <p className='bold'>Se ha terminado tu suscripción y {user.level === 5 ? "tu año" : "tus 4 meses"} de acceso. ¡No te preocupes!</p>\
                <p className='paragraph'>
                  Si quieres seguir disfrutando de los
                  cursos disponibles en Gonvar+, {user.level === 8 ? `puedes agregar 4 meses de acceso más por ${user.type} MXN` :
                    `puedes agregar 1 año de acceso más por ${user.type} MXN`}
                  y así recuperar tus beneficios obtenidos.
                </p>
              </>
          }
          {withSubscription && cards > 0 && <button onClick={pay}>Reintentar pago</button>}
          <button onClick={goTo}>Actualiza info de pago</button>
        </div>
      </RetryPayModalContain>}
    </ModalContainer>
  )
}
