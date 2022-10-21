import React, { useEffect, useState } from "react";

import { collection, onSnapshot, query, where } from "firebase/firestore";
import { httpsCallable } from "firebase/functions";
import Link from "next/link";
import { useRouter } from "next/router";

import ModalFinish from "../../containers/Profile/User/Modal3/ModalFinish";
import { db, functions } from "../../firebase/firebaseConfig";
import { useAuth } from "../../hooks/useAuth";
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
  LoaderContain,
  Logo2,
  RespContainer,
  RespContainer2,
  SocialContainer,
  TextFinish,
  WAIcon,
} from "./Footer.styled";
import Image from "next/image";

const Footer = () => {
  const [show, setShow] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [userData, setUserData] = useState<any>(null);
  const [loader, setLoader] = useState<any>(false);

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
    setLoader(true);
    if (userData.membership.method == 'stripe') {
      const updateCard = httpsCallable(functions, 'cancelStripeSubscription');
      await updateCard(userData.membership.planId).then(async (res: any) => {
        handleShow()
        setLoader(false);
      })
    } else {
      let user = {
        planId: userData.membership.planId,
        id: userData.id
      }
      const cancelPlan = httpsCallable(functions, 'cancelPaypalSubscription');
      await cancelPlan(user).then(async (res: any) => {
        handleShow();
        setLoader(false);
      })
    }
  }

  let { pathname } = useRouter();
  return (
    <>
      <FooterContainer>
        {/* <Logo2 /> */}
        <Image src="/images/Navbar/Logo.svg" width={100} height={100} />
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
            (pathname == '/Profile' && userData?.membership.level == 1 && !loader) &&
            <TextFinish onClick={cancelSubscription}>
              Terminar Suscripción
            </TextFinish>
          }
          {loader && <LoaderContain />}
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
          {/* <Logo2 /> */}
          <Image src="/images/Navbar/Logo.svg" width={80} height={80} />
          <Image src="/images/LogoResponsiveFooter.svg" width={80} height={80} />
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
          Gonvar©️ | Todos los derechos reservados
        </BottomText>
      </BottomContainer>
      <ModalFinish show={show} setShow={setShow} user={userData} />
    </>

  )
}
export default Footer;