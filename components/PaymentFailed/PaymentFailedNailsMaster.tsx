import React, { useEffect, useState } from 'react'
import Link from "next/link";
import { PREVIEW_PATH, PURCHASE_PATH } from '../../constants/paths';
import { FailedContainer } from './PaymentFailed.styled';
import { useAuth } from '../../hooks/useAuth';
import router from 'next/router';

const PaymentFailedNailsMaster = () => {

  const [userData, setUserData] = useState<any>(null);

  const redirecTo = () => {
    window.location.href = "/preview";
  }

  useEffect(() => {
    setTimeout(() => {
      redirecTo();
    }, 5000)
  }, [])

  var userDataAuth = useAuth();
  useEffect(() => {
    if (userDataAuth.user !== null) {
      setUserData(userDataAuth.user);
    } else {
      window.location.href = "/preview";
    }
  }, [userDataAuth])

  const goTo = () => {
    router.push(
      { pathname: PURCHASE_PATH, query: { type: 'course', id: 30 } }
    )
  }

  return (
    <FailedContainer>
      <div className='left'>
        <h1>Tu compra no se ha podido<br /> realizar, <span>{userData?.name}!</span></h1>
        <p>Puede que tu tarjeta no este activada para enviar <br />
          pagos de manera online, intenta de nuevo o usa otro <br />
          método de pago.</p>
        <div className='buttons'>
          <button className='top' onClick={goTo}>Reintentar</button>
        </div>
      </div>
      <img src="/images/purchase/payment.png" alt="" />
    </FailedContainer>
  )
}
export default PaymentFailedNailsMaster;