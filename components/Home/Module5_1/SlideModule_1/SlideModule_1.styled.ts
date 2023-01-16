import styled from "styled-components";

export const SlideImg = styled.div`
  border-radius: 45px;
  height: 350px;
  background-size: 100% auto;
  padding: 0;
  margin: 0px;
  background-position: center;
  background-repeat: no-repeat;
  display: flex;
  align-items: flex-start;

  @media only screen and (max-width: 1024px) {
    height: 320px;
  }
`;

export const TextSectionWrapper = styled.div`
  background-color: #ede7f2;
  border-radius: 50px;
  width: 100%;
  margin: 0 auto;
  position: relative;
  height: 230px;
  bottom: 110px;
  top: -20%;

  text-align: center;
  overflow: hidden;

  transition: all 0.2s ease-in-out;

  &:hover {
    height: 360px;
    bottom: 240px !important;
  }
  &:active {
    height: 360px;
    bottom: 240px !important;
  }

  @media only screen and (max-width: 1024px) {
    margin-top: 32px;
    height: 205px;
    margin-bottom: 0;
  }
  @media only screen and (max-width: 840px) {
    margin-top: 0px;
    height: 210px;
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
  position: absolute;
  z-index: 1;
`;

export const UsernameSectionWrapper = styled.div`
  background-color: #f4e3ba;
  border-radius: 50px;
  margin: 0 auto;
  position: absolute;
  bottom: 0%;
  overflow: hidden;
  width: 100%;
  height: 100px;
  display: flex;
  align-items: center;
  padding-inline: 20px;
  gap: 20px;
`;

export const FacebookButton = styled.div`
  background-repeat: no-repeat;
  width: 35px;
  height: 35px;
  background-color: white;
  border-radius: 50px;
  background-size: 105%;
  margin-left: auto;
  @media only screen and (max-width: 1028px) {
    width: 30px;
    height: 30px;
  }
`;
export const UserImage = styled.div`
  border-radius: 50px;
  width: 70px;
  height: 70px;
  background-size: 100%;
  background-repeat: no-repeat;
  @media only screen and (max-width: 840px) {
    width: 60px;
    height: 60px;
  }
`;

export const ContainerMain = styled.div`
  height: 480px;
  background-color: #ede7f2;
  box-shadow: -8px 8px 10px 0px rgba(0, 0, 0, 0.2);
  transition: all 0.2s ease-in-out;
  width: 100%;
  border-radius: 50px;
  z-index: 2;
  .row {
    width: 100%;
    margin: 0;
  }
  &:hover {
    z-index: 1;
    transform: scale(1.1);
  }
  &:active {
    transform: scale(1.1);
  }
`;

export const UserDataContainer = styled.div`
  display: block;
  position: relative;
`;
export const DisabledMask = styled.div`
  height: 480px;
  margin-top: 0px;
  transition: all 0.3s ease-in-out;
  background-color: rgba(239, 233, 243, 0.6);
  width: 100%;
  border-radius: 45px;
  position: absolute;
  opacity: 1;
  margin-left: 0px;

  &:hover {
    background-color: transparent;
    height: 0px;
    opacity: 0;
  }
  &:active {
    background-color: transparent;
    height: 0px;
    opacity: 0;
  }
`;
export const GeneralContainer = styled.div``;

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
  font-family: "Montserrat";
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  color: #6b4e2f;
  text-align: left;
  position: relative;
  @font-face {
    font-family: Montserrat;
    src: url(../fonts/Montserrat-VariableFont_wght.ttf);
  }
  @media only screen and (max-width: 600px) {
    font-size: 12px;
  }
`;
export const Text02 = styled.p`
  text-align: left !important;
  font-family: "Montserrat";
  width: 80%;
  margin-left: 10%;
  position: relative;
  top: 20px;

  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 150%;
  color: #3f1168;

  @font-face {
    font-family: Montserrat;
    src: url(../fonts/Montserrat-VariableFont_wght.ttf);
  }

  @media only screen and (max-width: 1600px) {
    font-size: 13px;
  }
`;

export const DateText = styled.p`
  margin: 0;
  color: #ac8c57;
  font-family: "Montserrat";
  font-style: normal;
  font-weight: 700;
  font-size: 12px;
  text-align: left;
  @font-face {
    font-family: Montserrat;
    src: url(../fonts/Montserrat-VariableFont_wght.ttf);
  }
  @media only screen and (max-width: 1024px) {
    font-size: 11px;
  }

  @media only screen and (max-width: 580px) {
    font-size: 12px;
  }
`;
