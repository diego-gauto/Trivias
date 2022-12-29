import styled from "styled-components";

export const CompraRapida = styled.div`
  font-weight: 100;
  top: 50%;
  
  background: linear-gradient(to right, transparent, transparent);
  color: transparent;

  position: relative;
  left: 27.5%; 
  font-size: 24px;
  border-radius: 50px;
  padding: 15px 20px 15px;

  display: block;

  font-family: "MONTSERRAT-BOLD" !important;
  @font-face {
    font-family: MONTSERRAT-BOLD;
    src: url(../fonts/MONTSERRAT-BOLD.ttf);
  }
  @media only screen and (max-width: 800px) {
    font-size: 14px;
  }

  &:hover { 
     
    transition: 0.5s ease all;
    transform: scale(1.1);
    color: #e5dfe9;
  background: linear-gradient(to right, #942ced, #d244d1);
  }
`;

export const SlideImg = styled.div`
  position: relative;
  height: 382px;
  background-repeat: no-repeat;
  background-size: 80% auto;
  background-position: center;
  display: flex;
  align-items: flex-start;
  @media only screen and (max-width: 1600px) {
    height: 350px;
  }
  @media only screen and (max-width: 1024px) {
    height: 320px;
  }
`;

export const NewTag = styled.div`
  top: calc(25px + 3%);
  margin-left: 25px;
  border: 1px solid #a733e4;
  border-radius: 10px;
  width: 79px;
  height: 29px;
  text-align: center;
  position: absolute;
  z-index: 1;
`;

export const ContainerMain = styled.div`
  margin-inline: 15px;
  transition: all 0.2s ease-in-out;
  width: 100%;
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
  text-align: center;
  width: 100%;
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
  @media only screen and (max-width: 1600px) {
    font-size: 14px;
  }
  @media only screen and (max-width: 1024px) {
    font-size: 13px;
  }
  @media only screen and (max-width: 770px) {
    font-size: 11px;
  }

  @media only screen and (max-width: 580px) {
    font-size: 13px;
  }
`;
export const Text02 = styled.p`
  font-family: "Montserrat-ExtraBold" !important;
  @font-face {
    font-family: Montserrat-ExtraBold;
    src: url(../fonts/Montserrat-ExtraBold.ttf);
  }
  position: relative;
  font-weight: 500;
  font-size: 16px;
  line-height: 150%;
  color: #3f1168;
  margin: 0;
  @media only screen and (max-width: 1600px) {
    font-size: 13px;
  }
`;
export const Text03 = styled.span`
  font-family: Sans-Serif;
  font-size: 16px;
  line-height: 150%;
  color: #3f1168;
  @media only screen and (max-width: 1600px) {
    font-size: 14px;
  }

  @media only screen and (max-width: 1024px) {
    font-size: 13px;
  }
  @media only screen and (max-width: 770px) {
    font-size: 11px;
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
  @media only screen and (max-width: 1600px) {
    font-size: 14px;
  }

  @media only screen and (max-width: 1024px) {
    font-size: 13px;
  }
  @media only screen and (max-width: 770px) {
    font-size: 11px;
  }

  @media only screen and (max-width: 580px) {
    font-size: 13px;
  }
`;
