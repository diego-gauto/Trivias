import styled from "styled-components";
import { Col, Container, Image, Row } from "react-bootstrap";

export const SliderContainer = styled.div`
  position: relative;
  overflow: hidden;
`;
export const GeneralContainer = styled(Container)`
  padding: 0;
  display: block;
  @media only screen and (max-width: 1028px) {
    display: none;
  }
`;

export const People = styled.div`
  display: none;
  background-repeat: no-repeat;
  width: 100%;
  position: relative;
  background-position-x: 50%;
  z-index: 1;

  top: 0%;
  height: 100%;
  background-size: 81%;
`;
export const PeopleContainer = styled.div`
  display: none;
  height: 940px;

  @media only screen and (max-width: 2100px) {
    height: 800px;
  }
  @media only screen and (max-width: 1600px) {
  }
  @media only screen and (max-width: 1440px) {
    height: 500px;
  }
  @media only screen and (max-width: 1028px) {
  }
`;
export const Lines = styled.div`
  background-size: 100%;
  height: 300px;
  background-repeat: no-repeat;
  @media only screen and (max-width: 1980px) {
    height: 180px;
  }
`;
export const BgColor = styled.div`
  background-color: #ede7f2;
  height: 600px;
  position: relative;

  @media only screen and (max-width: 2400px) {
    top: -68%;
  }
  @media only screen and (max-width: 2100px) {
    top: -66%;
  }

  @media only screen and (max-width: 1980px) {
  }
  @media only screen and (max-width: 1720px) {
    height: 440px;
  }

  @media only screen and (max-width: 1600px) {
    height: 380px;
    top: -66%;
  }

  @media only screen and (max-width: 1440px) {
    top: -55%;
    height: 57%;
  }
  @media only screen and (max-width: 1200px) {
  }
  @media only screen and (max-width: 1150px) {
  }
  @media only screen and (max-width: 1080px) {
  }
  @media only screen and (max-width: 1028px) {
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
export const Divisor = styled.div`
  position: absolute;
  width: 110%;
  height: 270px;
  background: white;
  transform: rotate(-185deg);
  margin-left: -5%;
  bottom: 570px;
  z-index: 2;
`;

export const ContainerMain = styled.div`
  background-color: #e5b6e9;
  margin-top: 0;
  position: inherit;
  width: 100%;
  padding-bottom: 250px;
`;
export const AnimatedBackground = styled.video`
  width: 100%;
  height: auto;
  transform: rotate(0deg);
  position: absolute;
  z-index: -2;
  bottom: 0%;
`;
export const SliderContainerChild = styled.div`
  z-index: -1;
  position: relative;
  height: 675px;
  @media only screen and (max-width: 1024px) {
    height: 450px;
  }
`;
export const SliderSectionTitle = styled.p`
  font-size: 48px;
  color: #ffffff;
  bottom: 45px;
  position: relative;
  text-align: center;
  padding-right: 0;
  @media only screen and (max-width: 1024px) {
    font-size: 28px;
    margin-bottom: 25px;
    max-width: 250px;
    margin-left: auto;
    margin-right: auto;
    text-align: center;
    padding-right: 0;
  }
`;

export const SliderItemLink = styled.h2`
  text-decoration: none;
  color: #fff;
`;
