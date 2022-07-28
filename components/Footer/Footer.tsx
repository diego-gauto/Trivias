

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
} from "./Footer.styled";

const Footer = () => {
  return (
    <>
      <FooterContainer>
        <Logo2 />
        <Column>
          <FooterText>
            Inicio
          </FooterText>
        </Column>
        <Column>
          <FooterText>
            Tienda Online
          </FooterText>
        </Column>
        <Column>
          <FooterText>
            Academia
          </FooterText>
        </Column>
        <Column>
          <FooterText>
            Registrarse
          </FooterText>
        </Column>
        <Column style={{ textAlign: "right" }}>
          <FooterText>
            Aviso de Privacidad
          </FooterText>
          <FooterText>
            Condiciones
          </FooterText>
          <FooterText>
            Facturación
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