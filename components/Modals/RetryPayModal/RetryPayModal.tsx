import React, { useEffect, useState } from 'react'
import { ModalContainer, RetryPayModalContain } from './RetryPayModal.styled'
import { IRetryPayModal } from './IRetryPayModal'
import { useAuth } from '../../../hooks/useAuth';
import { conektaPm, updateMembership } from '../../api/users';
import router from "next/router";

import { customerOrders, retryPayment } from '../../api/profile';
import { IoClose } from 'react-icons/io5';
import { IPm } from '../../RetryPayment/IRetryPayment';
import { conektaSubscriptionApi } from '../../api/checkout';
import { createNotification } from '../../api/notifications';
const alert_icon = "/images/RetryPayment/alert-icon.png";
export const RetryPayModal = (props: IRetryPayModal) => {
  const { show, onHide, withSubscription } = props;
  const context = useAuth();
  const user = context.user;
  const [pm, setPm] = useState<any>([]);
  const [isLaoding, setIsloading] = useState(false);
  const [paymentMethods, setPaymentMethods] = useState<IPm[]>([])
  const [invoice, setInvoice] = useState({} as any);

  const pay = () => {
    const filter = paymentMethods.filter((x) => x.default)
    const pm = filter[0]
    let plan_id = "";

    if (user.level === 5 && user.type === 1599) plan_id = "anual";
    if (user.level === 5 && user.type === 3497) plan_id = "anual_v1_1";
    if (user.level === 8) plan_id = "cuatrimestre";

    const data = {
      id: pm?.id,
      conekta_id: user.conekta_id,
      plan_id: plan_id,
      userId: user.user_id
    }
    conektaSubscriptionApi(data).then(async (res) => {
      if (res?.data.data.status === 'active') {
        const sub = res.data.data;
        const membership = {
          final_date: sub.billing_cycle_end,
          method: "conekta",
          level: user.level,
          payment_method: sub.card_id,
          plan_id: sub.id,
          plan_name: "Gonvar Plus",
          start_date: sub.billing_cycle_start,
          type: user.type,
          userId: user.user_id
        }
        await updateMembership(membership)
        window.location.href = user.level === 5 ? "/pagoexitosoanualidad" : "/pagoexitosocuatrimestre";
      } else {
        let notification = {
          userId: user.user_id,
          type: "8",
          notificationId: '',
          amount: user.type,
          productName: 'Gonvar Plus',
          frecuency: user.level === 5 ? 'anual' : 'cuatrimestral'
        }
        await createNotification(notification);
        const msg = "pago-rechazado"
        window.location.href = user.level === 5 ? `/pagofallidoanualidad?error=${msg}` : `/pagofallidocuatrimestre?error=${msg}`;
      }
    })
  }

  const getPaymentMethods = () => {
    setIsloading(true);
    let body = {
      stripe_id: user.stripe_id,
      conekta_id: user.conekta_id
    }
    conektaPm(body).then((res) => {
      const conektaPaymentMethods = res.data.payment_methods.data
      console.log(conektaPaymentMethods);

      const extractedProperties = conektaPaymentMethods.map(({ id, brand, last4, default: boolean }: IPm) => ({ id, brand, last4, default: boolean }));
      setPaymentMethods(extractedProperties);
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
    getPaymentMethods();
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
          {paymentMethods.length > 0 && <button onClick={pay}>Reintentar pago</button>}
          <button onClick={goTo}>Actualiza info de pago</button>
        </div>
      </RetryPayModalContain>}
    </ModalContainer>
  )
}
