import React from 'react'
import {
  BottomContainer,
  BottomText,
  Column,
  FBIcon,
  FooterContainer,
  FooterGroup,
  FooterIcons,
  FooterResponsive,
  FooterText,
  IGIcon,
  Logo2,
  RespContainer,
  RespContainer2,
  SocialContainer,
  WAIcon
} from './Footer.styled'

const Footer = () => {
  return (
    <>
      <FooterContainer>
        <Logo2 />
        <FooterGroup>
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
        </FooterGroup>
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
      <FooterResponsive>
        <RespContainer>
          <Logo2 />
          <FooterText>
            Inicio
          </FooterText>
          <FooterText>
            Tienda Online
          </FooterText>
          <FooterText>
            Academia
          </FooterText>
          <FooterText>
            Registrarse
          </FooterText>
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