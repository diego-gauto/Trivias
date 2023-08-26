import React from 'react'
import { SupportContainer } from './Support.styled';
import { ImArrowLeft2 } from 'react-icons/im'
import Cards from './Cards/Cards';
import { object_1, object_2, object_3 } from './constants';
import Link from 'next/link';
import { PROFILE_PATH } from '../../constants/paths';

const Support = () => {
  const redirectToWhatsAppChat = () => {
    const phoneNumber = '+52 1 55 3893 3134';
    const formattedPhoneNumber = phoneNumber.replace(/\D/g, '');
    const url = `https://wa.me/${formattedPhoneNumber}`;
    window.open(url, '_blank');
  };
  const openMail = () => {
    const emailAddress = 'soporte@gonvar.io';
    const mailtoLink = `mailto:${emailAddress}`;
    window.location.href = mailtoLink;
  }
  const sendTo = () => {

  }
  return (
    <SupportContainer>
      <div className='header-contain'>
        <div className='go-back'>
          <button className='btn-return'>
            <ImArrowLeft2 className='icon' />
            <Link href={PROFILE_PATH}>
              <p>Regresar a tu perfil</p>
            </Link>
          </button>
        </div>
        <h1 className='title'>CENTRO DE <span>AYUDA</span></h1>
      </div>
      <div className='option-contain'>
        <Cards
          card_data={object_1}
          handleAction={redirectToWhatsAppChat}
        />
        <Cards
          card_data={object_2}
          handleAction={openMail}
        />
        <Cards
          card_data={object_3}
          handleAction={sendTo}
          disable={true}
        />
      </div>
    </SupportContainer>
  )
}
export default Support;