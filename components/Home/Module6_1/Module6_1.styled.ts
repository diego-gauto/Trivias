import styled from "styled-components";
import { Col, Container, Image, Row } from "react-bootstrap";

export const SliderContainer = styled.div`
  position: relative;
  overflow: hidden;
`;
export const PineappleTextContainer = styled.div`
  position: relative;
  background: linear-gradient(135deg, #952ced 0%, #ca41d4 100%);
  height: 250px;
  display: flex;
  justify-content: space-between;
  padding-inline: 50px;
  align-items: center;
  @media only screen and (max-width: 1023px) {
    padding-block: 30px;
  }
`;
export const FooterComplement = styled.div`
  height: 100px;
  background-color: #29282c;
  position: sticky;
  bottom: 0%;
`;
export const GeneralContainer = styled(Container)`
  padding: 0;
  display: block;
  position: relative;
  margin-top: 250px;
`;

export const People = styled.div`
  background-image: url(/_next/static/media/Personas.898b7799.png);
  height: 500px;
  position: absolute;
  top: -480px;
  background-size: contain;
  width: 100%;
  background-repeat: no-repeat;
  background-position-x: 50%;
  background-position: bottom;
  z-index: 1;
`;
export const PeopleContainer = styled.div`
  height: 400px;
  background: #fff;
  position: relative;
  .lines {
    width: 100%;
    height: 100%;
  }
  .pineApple {
    height: 600px;
    position: absolute;
    bottom: -250px;
    z-index: 1;
    left: 50%;
    transform: translateX(-50%);
    img {
      position: relative;
      z-index: 2;
      height: 100%;
    }
    .yellow {
      background: #ffdd68;
      position: absolute;
      top: 130px;
      left: 50%;
      transform: translateX(-50%);
      width: 430px;
      height: 430px;
      z-index: 1;
      border-radius: 50%;
    }
  }
  @media only screen and (max-width: 1023px) {
    height: 600px;
    .lines {
      object-fit: cover;
    }
    .pineApple {
      bottom: 0;
    }
  }
  @media only screen and (max-width: 500px) {
    height: 450px;
    .pineApple {
      height: 450px;
      .yellow {
        top: 95px;
        width: 330px;
        height: 330px;
      }
    }
  }
`;

export const TittleA = styled.span`
  color: #3f1168;
  font-size: 38px;
  font-family: "Montserrat-ExtraBold" !important;
  @font-face {
    font-family: Montserrat-ExtraBold;
    src: url(../fonts/Montserrat-ExtraBold.ttf);
  }
`;
export const TittleB = styled.span`
  color: #a733e4;
  font-size: 38px;
  font-family: "Montserrat-ExtraBold" !important;
  @font-face {
    font-family: Montserrat-ExtraBold;
    src: url(../fonts/Montserrat-ExtraBold.ttf);
  }
`;

export const MoreText = styled.div`
  position: absolute;
  width: 15%;
  z-index: 1;
  right: 50px;
  bottom: 0;
  text-align: right;
  font-size: 18px;
  font-family: "MONTSERRAT-BOLD" !important;
  margin-bottom: 3%;
  @font-face {
    font-family: MONTSERRAT-BOLD;
    src: url(../fonts/MONTSERRAT-BOLD.ttf);
  }
  @media only screen and (max-width: 1023px) {
    display: none;
  }
`;
export const MoreText_1 = styled.div`
  cursor: pointer;
  bottom: 570px;
  color: #a73ae5;
  margin-bottom: 5px;
  transition: all 0.2s ease-in-out;

  &:hover {
    transform: scale(1.1);
  }
`;
export const MoreText_2 = styled.div`
  cursor: pointer;
  bottom: 570px;
  margin-bottom: 5px;
  transition: all 0.2s ease-in-out;

  &:hover {
    transform: scale(1.1);
  }
  color: #d244d1;
`;
export const MoreText_3 = styled.div`
  cursor: pointer;
  bottom: 570px;
  color: #e88807;
  margin-bottom: 5px;
  transition: all 0.2s ease-in-out;

  &:hover {
    transform: scale(1.1);
  }
`;

export const FooterAText = styled.div`
  z-index: 1;
  font-size: 16px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  @media only screen and (max-width: 1030px) {
    font-size: 12px;
    bottom: 14.5%;
    gap: 10px;
  }

  text-align: left;
  font-family: "MONTSERRAT-MEDIUM" !important;
  @font-face {
    font-family: MONTSERRAT-MEDIUM;
    src: url(../fonts/MONTSERRAT-MEDIUM.ttf);
  }
`;
export const FooterAText_1 = styled.div`
  width: 110%;
  color: #ede7f2;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    transform: translate(30px);
  }
`;
export const FooterAText_2 = styled.div`
  width: 110%;
  color: #ede7f2;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    transform: translate(30px);
  }
`;
export const FooterAText_3 = styled.div`
  width: 110%;
  color: #ede7f2;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    transform: translate(30px);
  }
`;

export const FooterAIcons = styled.div`
  position: absolute;
  height: 248px;
  width: 70px;
  z-index: 1;
  right: 5%;

  bottom: -42%;
  @media only screen and (max-width: 1980px) {
    bottom: -6.5%;
  }
  @media only screen and (max-width: 1440px) {
    bottom: -7%;
  }
  @media only screen and (max-width: 1030px) {
    bottom: 3.25%;
  }

  text-align: left;
  font-size: 24px;
  font-family: "MONTSERRAT-MEDIUM" !important;
  @font-face {
    font-family: MONTSERRAT-MEDIUM;
    src: url(../fonts/MONTSERRAT-MEDIUM.ttf);
  }
`;
export const FooterAIcons_1 = styled.div`
  background-repeat: no-repeat;
  color: #ede7f2;
  background-size: contain;
  width: 100%;
  height: auto;
  @media only screen and (max-width: 1023px) {
    display: none;
  }
`;

export const FooterBIcons = styled.div`
  display: flex;
  gap: 20px;
  width: 70px;
  z-index: 1;
  text-align: left;
  font-size: 24px;
  .content {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  .responsive-img {
    display: none;
  }
  @media only screen and (max-width: 1023px) {
    height: 100%;
    .content {
      justify-content: space-between;
    }
    .responsive-img {
      display: block;
      height: auto;
    }
  }
`;
export const FooterBIcons_1 = styled.div`
  cursor: pointer;
  width: 30px;
  height: 30px;
  background-size: 90%;
  margin-left: 20%;
  background-repeat: no-repeat;
`;
export const ContainerMain = styled.div`
  background-color: #ffffff;
  position: relative;
  border-top-left-radius: 30px;
  border-top-right-radius: 30px;

  width: 100%;
  z-index: 2;
  margin-top: 0;
`;
export const ContainerMain2 = styled.div`
  background-color: #ede7f2;

  position: absolute;
  width: 100%;

  height: 300px;
  margin-bottom: 0;

  @media only screen and (max-width: 1980px) {
    height: 1120px;
  }
`;
export const FooterEnding = styled.div`
  background-color: #29282c;
  padding: 0;
  margin: 0;
  display: flex;

  position: absolute;
  width: 100%;
  height: 45%;
  bottom: -75%;
  z-index: 2;

  @media only screen and (max-width: 1980px) {
    bottom: -42%;
    height: 25%;
  }
  @media only screen and (max-width: 1720px) {
    bottom: -35%;
  }
  @media only screen and (max-width: 1600px) {
    bottom: -30%;
  }
  @media only screen and (max-width: 1440px) {
    bottom: -18%;

    height: 20%;
  }
  @media only screen and (max-width: 1280px) {
    bottom: -7.5%;
    height: 15%;
  }
  @media only screen and (max-width: 1030px) {
    bottom: 0%;
    height: 17.5%;
  }
`;
export const Line = styled.div`
  background-color: #dbd0e5;
  position: absolute;
  width: 2.5px;
  height: 145px;
  top: 20%;
  right: 1%;
`;
export const LeftFooterContent = styled.div`
  width: 25%;
`;
export const CenterFooterContent = styled.div`
  width: 75%;
`;
export const FooterEndText1 = styled.span`
  color: #ede7f2;
  font-weight: 100;
  font-size: 24px;
  font-family: "MONTSERRAT-BOLD" !important;
  @font-face {
    font-family: MONTSERRAT-BOLD;
    src: url(../fonts/MONTSERRAT-BOLD.ttf);
  }

  @media only screen and (max-width: 1600px) {
    font-size: 18px;
  }

  @media only screen and (max-width: 1280px) {
    font-size: 12px;
  }
  @media only screen and (max-width: 1030px) {
  }
`;

export const GonvarFooterLogo = styled.div`
  width: 260px;
  height: 100px;
  background-size: 100%;
  background-repeat: no-repeat;
  left: 25%;
  position: relative;
  top: 20%;

  @media only screen and (max-width: 1600px) {
    width: 200px;
  }
  @media only screen and (max-width: 1440px) {
  }
  @media only screen and (max-width: 1280px) {
    width: 160px;
  }
  @media only screen and (max-width: 1030px) {
    width: 150px;
  }
`;
export const SeparingLine = styled.div`
  background-color: white;
  width: 2px;
  height: 50px;
  margin: 20px;

  @media only screen and (max-width: 1440px) {
    height: 35px;
  }
  @media only screen and (max-width: 1280px) {
    height: 25px;
  }
  @media only screen and (max-width: 1030px) {
    height: 20px;
  }
`;
export const FooterTextLine = styled.table`
  top: 15%;
  position: relative;

  @media only screen and (max-width: 1600px) {
    left: 0%;
  }
  @media only screen and (max-width: 1440px) {
  }
  @media only screen and (max-width: 1280px) {
    left: 15%;
  }
  @media only screen and (max-width: 1030px) {
    left: 5%;
  }
`;

export const SliderSectionTitle = styled.p`
  margin-top: 120px;
  font-size: 48px;
  color: #ffffff;
  position: relative;
  text-align: center;
  padding-right: 0;
  @media only screen and (max-width: 1024px) {
    font-size: 28px;
    margin-bottom: 25px;
    margin-left: auto;
    margin-right: auto;
    text-align: center;
    padding-right: 0;
  }
`;

export const SliderItemLink = styled.a`
  text-decoration: none;
  color: #fff;
`;
