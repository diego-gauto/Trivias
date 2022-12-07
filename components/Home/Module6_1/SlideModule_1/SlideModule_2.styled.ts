import styled from "styled-components";

export const CompraRapida = styled.div`
  font-weight: 100;
  background: linear-gradient(to right, #942ced, #d244d1);
  top: 50%;
  position: relative;
  left: 20%;
  font-size: 24px;
  border-radius: 50px;
  padding: 15px 20px 15px;
  color: #e5dfe9;

  font-family: "MONTSERRAT-BOLD" !important;
  @font-face {
    font-family: MONTSERRAT-BOLD;
    src: url(../fonts/MONTSERRAT-BOLD.ttf);
  }

  transition: all 0.2s ease-in-out;

  &:hover {
    transform: scale(1.1);
  }

  @media only screen and (max-width: 1600px) {
    left: 10%;
  }
  @media only screen and (max-width: 1440px) {
  }
  @media only screen and (max-width: 1280px) {
  }
  @media only screen and (max-width: 1030px) {
  }
`;

export const SlideImg = styled.div`
  width: 382px;
  border-radius: 45px;
  height: 350px;
  background-repeat: no-repeat;
  background-size: 95% auto;
  padding: 0;
  margin: 0px 15px 0px 12px;
  background-position: center;
  display: flex;
  align-items: flex-start;
  @media only screen and (max-width: 1600px) {
    width: 290px;
  }

  @media only screen and (max-width: 1024px) {
    height: 320px;
  }
  @media only screen and (max-width: 770px) {
    width: 200px;
  }
`;

export const NewTag = styled.div`
  top: calc(25px + 3%);
  margin-left: 15px;
  border: 1px solid #a733e4;
  border-radius: 10px;
  width: 79px;
  height: 29px;
  text-align: center;
  position: relative;
  z-index: 1;
`;

export const ContainerMain = styled.div`
  height: 480px;

  transition: all 0.2s ease-in-out;
  width: 100%;
  border-radius: 50px;

  &:hover {
    transform: scale(1.1);
  }
  &:active {
    transform: scale(1.1);
  }

  @media only screen and (max-width: 840px) {
    width: 100%;
    height: 420px;
  }
  @media only screen and (max-width: 770px) {
    width: 95%;
  }
`;

export const UserDataContainer = styled.div`
  height: 10px !important;
  display: block;
  width: 100%;
  position: relative;

  @media only screen and (max-width: 1028px) {
    left: -20px;
  }
  @media only screen and (max-width: 840px) {
    left: 0px;
    padding-right: 33.3%;
  }
  @media only screen and (max-width: 770px) {
    padding-right: 30%;
  }
  @media only screen and (max-width: 580px) {
    padding-right: 25%;
  }
`;

export const GeneralContainer = styled.div`
  width: 383px;
  @media only screen and (max-width: 1600px) {
    width: 290px;
  }
  @media only screen and (max-width: 840px) {
    width: 260px;
  }
  @media only screen and (max-width: 580px) {
    width: 290px;
  }
  @media only screen and (max-width: 460px) {
    margin-left: 20%;
  }
  @media only screen and (max-width: 390px) {
    margin-left: 12.5%;
  }
`;

export const TextNew = styled.span`
  font-family: "Raleway";
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 150%;
  margin-left: 0px;
  color: #a733e4;
  flex: none;
  order: 0;
  flex-grow: 0;
  @font-face {
    font-family: Raleway;
    src: url(../fonts/Raleway-VariableFont_wght.ttf);
  }
`;
export const Text01 = styled.span`
  font-family: "Montserrat-ExtraBold" !important;
  @font-face {
    font-family: Montserrat-ExtraBold;
    src: url(../fonts/Montserrat-ExtraBold.ttf);
  }
  font-size: 16px;
  line-height: 150%;
  color: #a733e4;
  text-align: center;
  position: relative;
  left: 37.5%;

  @media only screen and (max-width: 1600px) {
    font-size: 14px;
    width: 90px;
    position: relative;
    display: block;
    text-align: center;
  }

  @media only screen and (max-width: 1024px) {
    font-size: 13px;
    width: 140px;
  }
  @media only screen and (max-width: 770px) {
    font-size: 11px;
    width: 125px;
  }

  @media only screen and (max-width: 580px) {
    font-size: 13px;
  }
`;
export const Text02 = styled.p`
  text-align: center !important;
  font-family: "Montserrat-ExtraBold" !important;
  @font-face {
    font-family: Montserrat-ExtraBold;
    src: url(../fonts/Montserrat-ExtraBold.ttf);
  }
  padding-left: 20px;
  padding-right: 20px;

  width: 80%;
  margin-left: 10%;
  position: relative;
  top: 20px;

  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 150%;
  color: #3f1168;

  @media only screen and (max-width: 1600px) {
    font-size: 13px;
  }
`;
export const Text03 = styled.span`
  font-family: Sans-Serif;
  font-size: 16px;
  line-height: 150%;
  color: #3f1168;
  text-align: center;
  position: relative;
  left: 37.5%;

  @media only screen and (max-width: 1600px) {
    font-size: 14px;
    width: 90px;
    position: relative;
    display: block;
    text-align: center;
  }

  @media only screen and (max-width: 1024px) {
    font-size: 13px;
    width: 140px;
  }
  @media only screen and (max-width: 770px) {
    font-size: 11px;
    width: 125px;
  }

  @media only screen and (max-width: 580px) {
    font-size: 13px;
  }
`;

export const Text04 = styled.span`
  font-family: Sans-Serif;
  font-size: 16px;
  line-height: 150%;
  color: #3f1168;
  text-align: center;
  position: relative;
  left: 40%;

  @media only screen and (max-width: 1600px) {
    font-size: 14px;
    width: 90px;
    position: relative;
    display: block;
    text-align: center;
  }

  @media only screen and (max-width: 1024px) {
    font-size: 13px;
    width: 140px;
  }
  @media only screen and (max-width: 770px) {
    font-size: 11px;
    width: 125px;
  }

  @media only screen and (max-width: 580px) {
    font-size: 13px;
  }
`;
