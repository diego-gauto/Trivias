import React, { useEffect, useState } from "react";

import { IoClose } from "react-icons/io5";

import { user } from "firebase-functions/v1/auth";
import router from "next/router";

import { useAuth } from "../../../hooks/useAuth";
import { conektaSubscriptionApi } from "../../api/checkout";
import { customerOrders } from "../../api/profile";
import { conektaPm, updateMembership } from "../../api/users";
import { IPm } from "../../RetryPayment/IRetryPayment";
import { IRetryPayModal } from "./IRetryPayModal";
import { ModalContainer, RetryPayModalContain } from "./RetryPayModal.styled";
import { getPlanId, getPriceToPay } from '../../../components/api/retry-payment';
/*
const USER_TEST = {
  "id": 49678,
  "name": "Diego",
  "last_name": " Gauto",
  "email": "diego@gonvar.io",
  "role": "admin",
  "stripe_id": "cus_NlfRoVQIQxAOJm",
  "conekta_id": "cus_2vW7pxSgqbiNemfHb",
  "terms": 1,
  "femsa_customer_id": null,
  "user_id": 49519,
  "final_date": 1734450000,
  "level": 5,
  "method": "admin",
  "payment_method": null,
  "plan_id": null,
  "plan_name": null,
  "start_date": 1734630000,
  "type": 0,
  "admin_update_id": 49678,
  "is_canceled": 0,
};
*/
const alert_icon = '/images/RetryPayment/alert-icon.png';

export const RetryPayModal = (props: IRetryPayModal) => {
  const { show, onHide, withSubscription } = props;
  const context = useAuth();
  const user = context.user; // USER_TEST
  const [pm, setPm] = useState<IPm | undefined>(undefined);
  const [isLaoding, setIsloading] = useState(false);
  const [paymentMethods, setPaymentMethods] = useState<IPm[]>([]);
  const [error, setError] = useState(false);

  const getNewUserLevel = (level: number) => {
    if ([4, 5].includes(level)) return 4;
    if ([1, 6].includes(level)) return 1;
    return 7;
  };

  const pay = async () => {
    const filter = paymentMethods.filter((x) => x.default);
    const pm = filter[0];

    if (pm !== undefined && pm !== null) {
      setPm(pm);
    }

    let plan_id = getPlanId(user.level, user.type);
    const type = getPriceToPay(user.level, user.type);

    const data = {
      id: pm?.id,
      conekta_id: user.conekta_id,
      plan_id: plan_id,
      userId: user.user_id,
    };

    try {
      const res = await conektaSubscriptionApi(data);

      if (res?.data.data.status === 'active') {
        const sub = res.data.data;
        const membership = {
          final_date: sub.billing_cycle_end,
          method: 'conekta',
          level: getNewUserLevel(user.level),
          payment_method: sub.card_id,
          plan_id: sub.id,
          plan_name: 'Gonvar Plus',
          start_date: sub.billing_cycle_start,
          type,
          userId: user.user_id,
        };
        await updateMembership(membership);
        window.location.href =
          user.level === 5
            ? '/pagoexitosoanualidad'
            : '/pagoexitosocuatrimestre';
      } else {
        setError(true);
      }
    } catch (error) {
      console.error(error);
      setError(true);
    }

    /*conektaSubscriptionApi(data).then(async (res) => {

    });*/
  };

  const getPaymentMethods = async () => {
    setIsloading(true);
    let body = {
      stripe_id: user.stripe_id,
      conekta_id: user.conekta_id,
    };

    try {
      const res = await conektaPm(body);

      const conektaPaymentMethods = res.data.payment_methods.data;
      const extractedProperties = conektaPaymentMethods.map(
        ({ id, brand, last4, default: boolean }: IPm) => ({
          id,
          brand,
          last4,
          default: boolean,
        }),
      );
      setPaymentMethods(extractedProperties);
    } catch (error) {
      console.log({ error });
    }
    setIsloading(false);
  };

  const goTo = () => {
    onHide();
    router.push({ pathname: '/reintentar-pago' });
  };

  useEffect(() => {
    if (user) {
      getPaymentMethods();
    }
  }, [user]);

  const returnSubscription = () => {
    const level = user.level;
    if ([1, 6].includes(level)) {
      return 'mensual';
    }
    if ([5, 4].includes(level)) {
      return 'anual';
    }
    if ([7, 8].includes(level)) {
      return 'cuatrimestral'
    }

    console.error(`El nivel del usuario "${level}" no coincide a ningun tipo de suscripción. Metodo: 'returnSubscription'`);
    return '';
  };

  const returnAccess = () => {
    const level = user.level;
    if (level === 0) {
      return 'tus días'
    }
    if ([1, 6].includes(level)) {
      return 'tu mes';
    }
    if ([5, 4].includes(level)) {
      return 'tu año';
    }
    if ([7, 8].includes(level)) {
      return 'tus 4 meses'
    }

    console.error(`El nivel del usuario "${level}" no coincide a ningun tipo de los valores apropiados. Metodo: ${'returnAccess'}`);
    return '';
  };

  const returnAccessCondition = () => {
    const price = getPriceToPay(user.level, user.type);

    const level = user.level;

    if (level === 0) {
      return `puedes agregar 4 meses de acceso más por ${price} MXN`;
    }
    if ([1, 6].includes(level)) {
      return `puedes agregar 1 mes de acceso más por ${price} MXN`;
    }
    if ([5, 4].includes(level)) {
      return `puedes agregar 1 año de acceso más por ${price} MXN`;
    }
    if ([7, 8].includes(level)) {
      return `puedes agregar 4 meses de acceso más por ${price} MXN`;
    }

    console.error(`El nivel del usuario "${level}" no coincide a ningun tipo de los valores apropiados. Metodo: ${'returnAccessCondition'}`);
    return '';
  };

  return (
    <ModalContainer show={show} centered>
      {!isLaoding && (
        <RetryPayModalContain>
          <IoClose className='close' onClick={onHide} />
          <div className='data-contain'>
            <img src={alert_icon} className='alert-icon' />
            <p className='bold'>Tu cuenta está suspendida.</p>
            {withSubscription ? (
              <>
                <p className='bold'>¿Quieres reintentar el pago?</p>
                <p className='paragraph'>
                  No pudimos procesar tu pago mas reciente. Reintenta con tu (
                  {pm?.brand} - {pm?.last4}) O actualiza tu información de pago
                  para seguir disfrutando de los cursos.
                </p>
              </>
            ) : (
              <>
                <p className='bold'>
                  Se ha terminado tu suscripción {returnSubscription()} y{' '}
                  {returnAccess()} de acceso. ¡No te preocupes!
                </p>
                <p className='paragraph'>
                  Si quieres seguir disfrutando de los cursos disponibles en
                  Gonvar+, {returnAccessCondition()}
                  &nbsp; y así recuperar tus beneficios obtenidos.
                </p>
              </>
            )}
            {error && (
              <p
                className='paragraph'
                style={{ color: 'red', fontSize: '12px' }}
              >
                No hemos podido procesar tu pago, puedes reintentar el pago
                nuevamente o dirigirte a Actualizar info. de pago
              </p>
            )}
            {paymentMethods.length > 0 && (
              <button onClick={pay} style={{ background: '#3f1168' }}>
                Reintentar pago
              </button>
            )}
            <button onClick={goTo}>Actualiza info. de pago</button>
          </div>
        </RetryPayModalContain>
      )}
    </ModalContainer>
  );
};
