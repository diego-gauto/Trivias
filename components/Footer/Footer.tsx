import React from 'react'
import {
  BottomContainer,
  BottomText,
  Column,
  FBIcon,
  FooterContainer,
  FooterIcons,
  FooterText,
  IGIcon,
  Logo2,
  SocialContainer,
  WAIcon
} from './Footer.styled'

const Footer = () => {
  return (
    <>
      <FooterContainer>
        <Logo2 />
        <Column>
          <FooterText>
            Aviso de Privacidad
          </FooterText>
          <FooterText>
            Inicio
          </FooterText>
        </Column>
        <Column>
          <FooterText>
            Academia
          </FooterText>
          <FooterText>
            Condiciones
          </FooterText>
        </Column>
        <Column>
          <FooterText>
            Tienda Online
          </FooterText>
          <FooterText>
            Registrarse
          </FooterText>
        </Column>
        <FooterIcons>
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
      <BottomContainer>
        <BottomText>
          Gonvar Nailts Academy 2022
        </BottomText>
        <BottomText>
          Inowu Development 2022
        </BottomText>
      </BottomContainer>
    </>

  )
}
export default Footer;