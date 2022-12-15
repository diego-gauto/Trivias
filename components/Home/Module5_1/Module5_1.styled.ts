import styled from "styled-components";
import { Col, Container, Image, Row } from "react-bootstrap";

export const SliderContainer = styled.div`
  position: relative;
  overflow: hidden;
`;
export const GeneralContainer = styled(Container)`
  padding: 0;
  display: block;
`;

export const People = styled.div`
  background-repeat: no-repeat;
  width: 100%;
  position: relative;
  background-position-x: 50%;
  z-index: 1;

  background-size: 27%;
  top: 23%;
  height: 550px;

  @media only screen and (max-width: 2400px) {
    background-size: 37%;
    top: 7%;
  }
  @media only screen and (max-width: 2100px) {
    background-size: 42%;
    top: 2.5%;
  }
  @media only screen and (max-width: 1980px) {
    background-size: 45%;
    top: 0%;
  }
  @media only screen and (max-width: 1840px) {
    background-size: 47%;
    top: 0%;
  }

  @media only screen and (max-width: 1720px) {
    background-size: 51%;
    top: -2%;
  }
  @media only screen and (max-width: 1600px) {
    background-size: 44%;
    top: -5%;
  }
  @media only screen and (max-width: 1520px) {
    background-size: 49%;
    top: -10%;
  }
  @media only screen and (max-width: 1440px) {
    background-size: 50%;
    top: -10%;
  }
  @media only screen and (max-width: 1360px) {
    background-size: 53%;
    top: -12%;
  }

  @media only screen and (max-width: 1280px) {
    background-size: 54%;
    top: -8%;
  }
  @media only screen and (max-width: 1200px) {
    background-size: 59%;
    top: -10%;
  }
  @media only screen and (max-width: 1150px) {
    background-size: 60%;
    top: -8%;
  }
  @media only screen and (max-width: 1080px) {
    background-size: 64%;
    top: -7.5%;
  }
  @media only screen and (max-width: 1028px) {
    background-size: 66%;
  }
`;
export const PeopleContainer = styled.div`
  height: 470px;

  @media only screen and (max-width: 1720px) {
    height: 405px;
  }
  @media only screen and (max-width: 1600px) {
    height: 360px;
  }
  @media only screen and (max-width: 1440px) {
    height: 300px;
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
  height: 250px;
  position: relative;

  @media only screen and (max-width: 2400px) {
    top: -55%;
  }
  @media only screen and (max-width: 2100px) {
    top: -62%;
  }

  @media only screen and (max-width: 1980px) {
    top: -60%;
  }
  @media only screen and (max-width: 1720px) {
    top: -70%;
  }

  @media only screen and (max-width: 1600px) {
    height: 190px;
    top: -90%;
  }

  @media only screen and (max-width: 1440px) {
    top: -110%;
  }
  @media only screen and (max-width: 1200px) {
    top: -115%;
    height: 210px;
  }
  @media only screen and (max-width: 1150px) {
    top: -110%;
  }
  @media only screen and (max-width: 1080px) {
    top: -107%;
  }
  @media only screen and (max-width: 1028px) {
    top: -110%;
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
  height: 1200px;
  margin-top: 0;
  margin-bottom: 6.5%;
  position: inherit;
  width: 100%;

  @media only screen and (max-width: 1980px) {
    height: 1120px;
    margin-bottom: 5%;
  }
  @media only screen and (max-width: 1600px) {
    margin-bottom: 0%;
  }
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

export const SliderItemLink = styled.a`
  text-decoration: none;
  color: #fff;
`;
