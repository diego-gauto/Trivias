import styled from "styled-components";
import { Col, Container, Image, Row } from "react-bootstrap";

/*
@media only screen and (max-width: 1024px) {
  }
  @media only screen and (max-width: 840px) {
  }
  @media only screen and (max-width: 770px) {
  }
  @media only screen and (max-width: 580px) {
  }
  @media only screen and (max-width: 490px) {
  }
@media only screen and (max-width: 390px) {
  }
   */

export const SliderContainerMobile = styled.div`
  position: relative;
  overflow: hidden;
`;
export const SwiperContainer = styled.div`
  display: block;
  // @media only screen and (max-width: 580px) {
  //   display: none;
  // }
`;
export const GeneralContainerMobile = styled(Container)`
  padding: 0;
  display: none;
  @media only screen and (max-width: 1028px) {
    display: block;
  }
`;

export const PeopleMobile = styled.div`
  background-size: 100%;
  height: 105%;
  background-repeat: no-repeat;
  width: 100%;
  position: relative;
  background-position-x: 50%;
  z-index: 1;

  top: -5%;
  @media only screen and (max-width: 950px) {
  }
  @media only screen and (max-width: 870px) {
  }
  @media only screen and (max-width: 770px) {
    top: 2.5%;
  }
  @media only screen and (max-width: 640px) {
    top: 5%;
  }
  @media only screen and (max-width: 580px) {
    top: 7.5%;
  }
  @media only screen and (max-width: 520px) {
    top: 4%;
  }
  @media only screen and (max-width: 490px) {
    top: -18%;
  }
  @media only screen and (max-width: 390px) {
  }
`;
export const PeopleContainerMobile = styled.div`
  margin-top: 2.5%;
  height: 488px;

  @media only screen and (max-width: 840px) {
    height: 390px;
  }
  @media only screen and (max-width: 770px) {
    height: 365px;
  }
  @media only screen and (max-width: 580px) {
    height: 270px;
  }
  @media only screen and (max-width: 490px) {
    height: 230px;
  }
  @media only screen and (max-width: 390px) {
    height: 187px;
  }
`;
export const LinesMobile = styled.div`
  background-size: 100%;
  height: 300px;
  background-repeat: no-repeat;
  @media only screen and (max-width: 1980px) {
    height: 180px;
  }
`;
export const BgColorMobile = styled.div`
  background-color: #ede7f2;
  position: relative;

  top: -58%;
  height: 57.5%;

  @media only screen and (max-width: 840px) {
    top: -55%;
    height: 55%;
  }

  @media only screen and (max-width: 580px) {
    height: 50%;
    top: -50%;
  }

  @media only screen and (max-width: 460px) {
    height: 50%;
    top: -55%;
  }
`;
export const TittleAMobile = styled.span`
  color: #3f1168;
  font-size: 38px;
  font-family: "Montserrat-ExtraBold" !important;
  @font-face {
    font-family: Montserrat-ExtraBold;
    src: url(../fonts/Montserrat-ExtraBold.ttf);
  }

  @media only screen and (max-width: 580px) {
    font-size: 30px;
  }
  @media only screen and (max-width: 460px) {
    font-size: 24px;
  }
`;
export const TittleBMobile = styled.span`
  color: #a733e4;
  font-size: 38px;
  font-family: "Montserrat-ExtraBold" !important;
  @font-face {
    font-family: Montserrat-ExtraBold;
    src: url(../fonts/Montserrat-ExtraBold.ttf);
  }

  @media only screen and (max-width: 580px) {
    font-size: 30px;
  }
  @media only screen and (max-width: 460px) {
    font-size: 24px;
  }
`;
export const DivisorMobile = styled.div`
  position: absolute;
  width: 110%;
  height: 270px;
  background: white;
  transform: rotate(-185deg);
  margin-left: -5%;
  bottom: 570px;
  z-index: 2;
`;

export const ContainerMainMobile = styled.div`
  background-color: #e5b6e9;
  margin-top: 0;

  height: 1020px;
  position: inherit;
  width: 100%;
`;
export const AnimatedBackgroundMobile = styled.video`
  width: 100%;
  height: auto;
  transform: rotate(0deg);
  position: absolute;
  z-index: -2;
  bottom: 0%;
`;
export const SliderContainerChildMobile = styled.div`
  z-index: -1;
  position: relative;
  height: 675px;
  @media only screen and (max-width: 1024px) {
    height: 450px;
  }
`;
export const SliderSectionTitleMobile = styled.p`
  font-size: 48px;
  color: #ffffff;
  bottom: 70px;
  position: relative;
  text-align: center;
  padding-right: 0;
  @media only screen and (max-width: 1024px) {
    font-size: 28px;
    margin-bottom: 25px;
    max-width: 100%;
    margin-left: auto;
    margin-right: auto;
    text-align: center;
    padding-right: 0;
  }

  @media only screen and (max-width: 580px) {
    margin-bottom: 0;
  }
`;

export const SliderItemLinkMobile = styled.a`
  text-decoration: none;
  color: #fff;
`;
