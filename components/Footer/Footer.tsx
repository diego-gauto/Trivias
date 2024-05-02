import React, { useEffect, useState } from 'react';

import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { httpsCallable } from 'firebase/functions';
import { useRouter } from 'next/router';

import ModalFinish from '../../containers/Profile/User/Modal3/ModalFinish';
import { db, functions } from '../../firebase/firebaseConfig';
import { useAuth } from '../../hooks/useAuth';
import { FooterContainer } from './Footer.styled';
import { FooterContainerMobile } from './FooterMobile.styled';

const Footer = () => {
  const [show, setShow] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [userData, setUserData] = useState<any>(null);
  const [loader, setLoader] = useState<any>(false);

  const handleShow = () => {
    setShow(true);
  };
  try {
    var userDataAuth = useAuth();
    useEffect(() => {
      if (userDataAuth.user !== null) {
        setLoggedIn(true);
      } else {
        setLoggedIn(false);
      }
    }, []);
  } catch (error) {
    setLoggedIn(false);
  }

  const fetchDB_data = async () => {
    try {
      const query_1 = query(
        collection(db, 'users'),
        where('uid', '==', userDataAuth.user.id),
      );
      return onSnapshot(query_1, (response) => {
        response.forEach((e) => {
          setUserData({ ...e.data(), id: e.id });
        });
      });
    } catch (error) {
      return false;
    }
  };

  useEffect(() => {
    fetchDB_data();
  }, [loggedIn]);

  const cancelSubscription = async () => {
    setLoader(true);
    if (userData.membership.method == 'stripe') {
      const updateCard = httpsCallable(functions, 'cancelStripeSubscription');
      await updateCard(userData.membership.planId).then(async (res: any) => {
        handleShow();
        setLoader(false);
      });
    } else {
      let user = {
        planId: userData.membership.planId,
        id: userData.id,
      };
      const cancelPlan = httpsCallable(functions, 'cancelPaypalSubscription');
      await cancelPlan(user).then(async (res: any) => {
        handleShow();
        setLoader(false);
      });
    }
  };

  let { pathname } = useRouter();

  return (
    <>
      <FooterContainer>
        <img src='/images/Footer/logo.png' alt='' />
        <div className='right'>
          <div className='right-section'>
            <p>
              Copyright © Gonvar Technologies SAPI de CV{' '}
              <span className='middle'>2022</span>
            </p>
            <p>Todos los derechos reservados</p>
          </div>
          {/* {pathname !== "/" && <p>Términos y Condiciones de Suscripción Gonvar+</p>} */}
        </div>
      </FooterContainer>
      <FooterContainerMobile>
        <img src='/images/Footer/logo.png' alt='' />
        <div className='right'>
          <div className='right-section'>
            <p>
              Copyright © Gonvar Technologies SAPI de CV{' '}
              <span className='middle'>2022</span>
            </p>
            <p>Todos los derechos reservados</p>
          </div>
          {/* {pathname !== "/" && <p>Términos y Condiciones de Suscripción Gonvar+</p>} */}
        </div>
      </FooterContainerMobile>
      <ModalFinish show={show} setShow={setShow} user={userData} />
    </>
  );
};
export default Footer;
