

import {
  BottomContainer,
  BottomText,
  Column,
  FooterContainer,
  FooterIcons,
  FooterText,
  FBIcon,
  IGIcon,
  Logo2,
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