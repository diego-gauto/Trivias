import React, { useEffect, useState } from 'react'
import Link from "next/link";
import { PREVIEW_PATH } from '../../constants/paths';
import { ThankYouContainer } from './ThankYou.styled';
import { useAuth } from '../../hooks/useAuth';

const ThankYouNailsMaster = () => {
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
    window.location.href = "/lesson?id=30&season=0&lesson=0";
  }

  return (
    <ThankYouContainer>
      <div className='left'>
        <h1>Felicidades tu compra ha <br /> sido exitosa, <span>{userData?.name}!</span></h1>
        <p>Ahora puedes acceder a nuestros cursos de manera <br />
          directa, aprende de las mejores maquilladoras en <br />
          diferentes especialidades.</p>
        <div className='buttons'>
          <button className='top' onClick={goTo}>Iniciar curso</button>
          {/* <button className='bottom'>Descargar factura</button> */}
        </div>
      </div>
      <img src="/images/purchase/payment.png" alt="" />
    </ThankYouContainer>
  )
}
export default ThankYouNailsMaster;