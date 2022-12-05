import { Col, Row, Container } from "react-bootstrap";
import styled from "styled-components";

export const ColorContainer = styled.div`
  background-color: #e2a6e5;
  height: 110%;
  width: auto;
  position: relative;

  @media only screen and (max-width: 1440px) {
    padding-top: 75px;
  }
  @media only screen and (max-width: 1280px) {
    padding-top: 85px;
  }
  @media only screen and (max-width: 1028px) {
    padding-top: 55px;
  }
`;

export const Column_1 = styled.div`
  left: 25%;
  position: relative;
  top: 70%;
`;

export const Column_2 = styled.div`
  left: 0%;
  position: relative;
  top: 20%;
  text-align: center;
`;

export const Column_3 = styled.div`
  left: -10%;
  position: relative;
  top: 70%;
`;

export const Tittle = styled.h3`
  -webkit-background-clip: text !important;
  background: linear-gradient(to right, #942ced, #d244d1);
  -webkit-text-fill-color: transparent;
  font-size: 38px;
  font-family: "Montserrat-ExtraBold" !important;
  @font-face {
    font-family: Montserrat-ExtraBold;
    src: url(../fonts/Montserrat-ExtraBold.ttf);
  }

  @media only screen and (max-width: 1440px) {
    font-size: 32px;
  }
  @media only screen and (max-width: 1280px) {
    font-size: 28px;
  }
  @media only screen and (max-width: 1028px) {
    font-size: 24px;
  }
`;

export const Subtittle_1 = styled.span`
  color: #3f1168;
  font-size: 28px;
  font-family: "MONTSERRAT-MEDIUM" !important;
  @font-face {
    font-family: MONTSERRAT-MEDIUM;
    src: url(../fonts/MONTSERRAT-MEDIUM.ttf);
  }

  @media only screen and (max-width: 1440px) {
    font-size: 22px;
  }
  @media only screen and (max-width: 1280px) {
    font-size: 18px;
  }
  @media only screen and (max-widt|h: 1028px) {
    font-size: 14px;
  }
`;

export const Subtittle_2 = styled.span`
  color: #942ced;
  font-size: 28px;
  font-family: "Montserrat-ExtraBold" !important;
  @font-face {
    font-family: Montserrat-ExtraBold;
    src: url(../fonts/Montserrat-ExtraBold.ttf);
  }

  @media only screen and (max-width: 1440px) {
    font-size: 22px;
  }
  @media only screen and (max-width: 1280px) {
    font-size: 18px;
  }
  @media only screen and (max-widt|h: 10248px) {
    font-size: 14px;
  }
`;
export const UlElement = styled.ul`
  list-style-type: none !important;
`;
export const LiElement = styled.li`
  padding-bottom: 50px;
`;

export const ModuleContainerBG1 = styled.div`
  width: 66px;
  height: 66px;
  background-repeat: no-repeat;
  position: absolute;
  display: block;

  @media only screen and (max-width: 1440px) {
    width: 50px;
    height: 50px;
  }

  @media only screen and (max-widt|h: 1028px) {
    width: 40px;
    height: 40px;
  }
`;
export const ModuleContainerBG2 = styled.div`
  width: 100%;
  height: 170%;
  background-repeat: no-repeat;
  position: relative;
  display: block;
  top: 35%;
  background-position-x: 50%;

  @media only screen and (max-width: 1980px) {
  }
  @media only screen and (max-width: 1720px) {
    height: 165%;
    top: 35%;
  }
  @media only screen and (max-width: 1600px) {
    height: 125%;
    top: 30%;
  }
  @media only screen and (max-width: 1440px) {
    height: 160%;
    top: 35%;
  }
  @media only screen and (max-width: 1280px) {
    height: 160%;
    top: 45%;
  }
  @media only screen and (max-width: 1028px) {
    height: 145%;
    top: 45%;
  }
`;
export const ListText = styled.div`
  display: block;
  position: relative;
  margin-left: 100px;

  @media only screen and (max-width: 1440px) {
    margin-left: 75px;
  }

  @media only screen and (max-widt|h: 1028px) {
    margin-left: 70px;
  }
`;

export const ModuleContainer = styled(Container)`
  height: 600px;
  width: 100%;
  max-width: 100%;
  padding: 0;
  position: relative;
  display: block !important;
  @media only screen and (max-width: 1720px) {
    position: relative;
  }
  @media only screen and (max-width: 1028px) {
    display: none !important;
  }
`;

//--------------------------------------------

export const ModuleContainerMobile = styled(Container)`
  width: 100%;
  max-width: 100%;
  padding: 0;
  position: relative;
  display: none !important;
  @media only screen and (max-width: 1028px) {
    display: block !important;
  }
`;

export const ColorContainerMobile = styled.div`
  background-color: #e1b2e4;
  height: 140%;
  width: auto;
  position: relative;

  @media only screen and (max-width: 1440px) {
    padding-top: 75px;
  }
  @media only screen and (max-width: 1280px) {
    padding-top: 85px;
  }
  @media only screen and (max-width: 1028px) {
    padding-top: 55px;
  }
`;

export const Row_1Mobile = styled.div`
  left: 25%;
  position: relative;
  top: 70%;
  margin-top: 75px;

  @media only screen and (max-width: 1024px) {
  }
  @media only screen and (max-width: 840px) {
  }
  @media only screen and (max-width: 770px) {
  }
  @media only screen and (max-width: 580px) {
    left: 15%;
  }
  @media only screen and (max-width: 490px) {
    left: 10%;
  }
`;

export const Row_2Mobile = styled.div`
  left: 0%;
  position: relative;
  top: 20%;
  text-align: center;
`;

export const Row_3Mobile = styled.div`
  left: 0;
  position: relative;
  height: 270px;
  width: 100%;
`;

export const TittleMobile = styled.h3`
  display: inline-block;
  background: linear-gradient(to right, #942ced, #d244d1);
  margin-bottom: 0px;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

  font-size: 38px;
  font-family: "Montserrat-ExtraBold" !important;
  @font-face {
    font-family: Montserrat-ExtraBold;
    src: url(../fonts/Montserrat-ExtraBold.ttf);
  }

  @media only screen and (max-width: 1024px) {
    font-size: 32px;
  }
  @media only screen and (max-width: 490px) {
    font-size: 24px;
  }
`;

export const Subtittle_1Mobile = styled.span`
  color: #3f1168;
  font-size: 28px;
  font-family: "MONTSERRAT-MEDIUM" !important;
  @font-face {
    font-family: MONTSERRAT-MEDIUM;
    src: url(../fonts/MONTSERRAT-MEDIUM.ttf);
  }

  @media only screen and (max-width: 1440px) {
    font-size: 22px;
  }
  @media only screen and (max-width: 1280px) {
    font-size: 18px;
  }
  @media only screen and (max-widt|h: 1028px) {
    font-size: 14px;
  }

  @media only screen and (max-width: 490px) {
    font-size: 12px;
  }
`;

export const Subtittle_2Mobile = styled.span`
  color: #942ced;
  font-size: 28px;
  font-family: "Montserrat-ExtraBold" !important;
  @font-face {
    font-family: Montserrat-ExtraBold;
    src: url(../fonts/Montserrat-ExtraBold.ttf);
  }

  @media only screen and (max-width: 1440px) {
    font-size: 22px;
  }
  @media only screen and (max-width: 1280px) {
    font-size: 18px;
  }
  @media only screen and (max-widt|h: 10248px) {
    font-size: 14px;
  }

  @media only screen and (max-width: 490px) {
    font-size: 12px;
  }
`;
export const UlElementMobile = styled.ul`
  list-style-type: none !important;
`;
export const LiElementMobile = styled.li`
  padding-bottom: 50px;
  @media only screen and (max-width: 490px) {
    padding-bottom: 30px;
  }
  @media only screen and (max-width: 390px) {
    padding-bottom: 25px;
  }
`;

export const ModuleContainerBG1Mobile = styled.div`
  width: 66px;
  height: 66px;
  background-repeat: no-repeat;
  position: absolute;
  display: block;

  @media only screen and (max-width: 1440px) {
    width: 50px;
    height: 50px;
  }

  @media only screen and (max-width: 1028px) {
    width: 40px;
    height: 40px;
  }
  @media only screen and (max-width: 490px) {
    width: 30px;
    height: 30px;
  }
`;
export const ModuleContainerBG2Mobile = styled.div`
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
  position: relative;
  display: block;
  background-position-x: 50%;
`;
export const ListTextMobile = styled.div`
  display: block;
  position: relative;
  margin-left: 100px;

  @media only screen and (max-width: 1440px) {
    margin-left: 75px;
  }

  @media only screen and (max-width: 1028px) {
    margin-left: 70px;
  }

  @media only screen and (max-width: 490px) {
    margin-left: 45px;
  }
`;
