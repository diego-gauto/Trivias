import Link from 'next/link'
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import ModalFinish from '../../containers/Profile/User/Modal3/ModalFinish';
import {
  BottomContainer,
  BottomText,
  Column,
  FooterContainer,
  FooterIcons,
  FooterResponsive,
  FooterText,
  FBIcon,
  IGIcon,
  Logo2,
  RespContainer,
  RespContainer2,
  SocialContainer,
  WAIcon,
  TextFinish,
} from "./Footer.styled";
import { useAuth } from "../../hooks/useAuth";
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { db, functions } from "../../firebase/firebaseConfig";
import { httpsCallable } from 'firebase/functions';

const Footer = () => {
  const [show, setShow] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [userData, setUserData] = useState<any>(null);
  const handleShow = () => {
    setShow(true)
  }
  try {
    var userDataAuth = useAuth();
    useEffect(() => {
      if (userDataAuth.user !== null) {
        setLoggedIn(true)
      } else {
        setLoggedIn(false)
      }
    }, [])

  } catch (error) {
    console.log(error)
    setLoggedIn(false)
  }

  const fetchDB_data = async () => {
    try {
      const query_1 = query(collection(db, "users"), where("uid", "==", userDataAuth.user.id));
      return onSnapshot(query_1, (response) => {
        response.forEach((e) => {
          setUserData({ ...e.data(), id: e.id })
        });
      })
    } catch (error) {
      return false
    }
  }

  useEffect(() => {
    fetchDB_data()

  }, [loggedIn])

  const cancelSubscription = async () => {
    if (userData.membership.method == 'stripe') {
      const updateCard = httpsCallable(functions, 'cancelStripeSubscription');
      await updateCard(userData.membership.planId).then(async (res: any) => {
        handleShow()
      })
    } else {
      let user = {
        planId: userData.membership.planId,
        id: userData.id
      }
      console.log(1);

      const cancelPlan = httpsCallable(functions, 'cancelPaypalSubscription');
      await cancelPlan(user).then(async (res: any) => {
        handleShow()
      })
    }
  }

  let { pathname } = useRouter();
  return (
    <>
      <FooterContainer>
        <Logo2 />
        <Column>
          <FooterText>
            Aviso de Privacidad
          </FooterText>
          <FooterText>
            Condiciones
          </FooterText>
        </Column>
        <Column>
          <Link href="/">
            <FooterText>
              Inicio
            </FooterText>
          </Link>
          <FooterText>
            Tienda Online
          </FooterText>
        </Column>
        <Column>
          <Link href="/Preview">
            <FooterText>
              Cursos
            </FooterText>
          </Link>
          <Link href="/auth/Register">
            <FooterText>
              Registrarse
            </FooterText>
          </Link>
        </Column>
        <FooterIcons>
          {
            pathname == '/Profile' && userData?.membership.level == 1 &&
            <TextFinish onClick={cancelSubscription}>
              Terminar Suscripción
            </TextFinish>
          }
          <FooterText>
            Contactanos
          </FooterText>
          <SocialContainer>
            <a href="https://www.facebook.com/GonvarNails">
              <FBIcon />
            </a>
            <a href="https://www.instagram.com/gonvarnails/">
              <IGIcon />
            </a>
            <WAIcon />
          </SocialContainer>
        </FooterIcons>
      </FooterContainer>
      <FooterResponsive>
        <RespContainer>
          <Logo2 />
          <Link href="/">
            <FooterText>
              Inicio
            </FooterText>
          </Link>
          <FooterText>
            Tienda Online
          </FooterText>
          <Link href="/Preview">
            <FooterText>
              Cursos
            </FooterText>
          </Link>
          <Link href="/auth/Register">
            <FooterText>
              Registrarse
            </FooterText>
          </Link>
        </RespContainer>
        <RespContainer2>
          <FooterText >
            Aviso de Privacidad
          </FooterText>
          <FooterText>
            Condiciones
          </FooterText>
          <FooterText>
            Facturación
          </FooterText>
          <FooterIcons>
            {
              pathname == '/Profile' && userData?.membership.level == 1 &&
              <TextFinish onClick={() => {
                cancelSubscription()
              }}>
                Terminar Suscripción
              </TextFinish>
            }
            <FooterText>
              Contactanos
            </FooterText>
            <SocialContainer>
              <a href="https://www.facebook.com/GonvarNails">
                <FBIcon />
              </a>
              <a href="https://www.instagram.com/gonvarnails/">
                <IGIcon />
              </a>
              <WAIcon />
            </SocialContainer>
          </FooterIcons>
        </RespContainer2>
      </FooterResponsive>
      <BottomContainer>
        <BottomText>
          Gonvar Nails Academy 2022
        </BottomText>
        <BottomText>
          Inowu Development 2022
        </BottomText>
      </BottomContainer>
      <ModalFinish show={show} setShow={setShow} user={userData} />
    </>

  )
}
export default Footer;