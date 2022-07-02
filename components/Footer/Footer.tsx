import React from 'react'
import {
  BottomContainer,
  BottomText,
  Column1,
  Column2,
  Column3,
  FBIcon,
  FooterContainer,
  FooterGroupText,
  FooterIcons,
  FooterText,
  IGIcon,
  Logo2,
  SocialContainer,
  WAIcon
} from './Footer.styled'

export const Footer = () => {
  return (
    <>
      <FooterContainer>
        <Logo2 />
        <FooterGroupText>
          <Column1>
            <FooterText>
              Aviso de Privacidad
            </FooterText>
            <FooterText>
              Inicio
            </FooterText>
          </Column1>
          <Column2>
            <FooterText>
              Academia
            </FooterText>
            <FooterText>
              Condiciones
            </FooterText>
          </Column2>
          <Column3>
            <FooterText>
              Tienda Online
            </FooterText>
            <FooterText>
              Registrarse
            </FooterText>
          </Column3>
        </FooterGroupText>
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
