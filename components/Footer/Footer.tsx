import Link from 'next/link'
import { useRouter } from 'next/router';
import React from 'react'
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



const Footer = () => {

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
            pathname == '/Profile' &&
            <TextFinish>
              Terminar Suscripción
            </TextFinish>
          }
          <FooterText>
            Contactanos
          </FooterText>
          <SocialContainer>
            <FBIcon />
            <IGIcon />
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
          <FooterText>
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
              pathname == '/Profile' &&
              <TextFinish>
                Terminar Suscripción
              </TextFinish>
            }
            <FooterText>
              Contactanos
            </FooterText>
            <SocialContainer>
              <FBIcon />
              <IGIcon />
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
    </>

  )
}
export default Footer;