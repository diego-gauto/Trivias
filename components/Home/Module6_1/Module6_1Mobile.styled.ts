import styled from "styled-components";
import { Col, Container, Image, Row } from "react-bootstrap";

/*
@media only screen and (max-width: 1980px) {
}
@media only screen and (max-width: 1720px) {
}
@media only screen and (max-width: 1600px) {
}
@media only screen and (max-width: 1440px) {
}
@media only screen and (max-width: 1280px) {
}
@media only screen and (max-width: 1028px) {
}
 */

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
  @media only screen and (max-width: 580px) {
    display: none;
  }
`;
export const SwiperContainerReduced = styled.div`
  display: none;
  @media only screen and (max-width: 580px) {
    display: block;
  }
  @media only screen and (max-width: 460px) {
    display: none;
  }
`;
export const SwiperContainerMoreReduced = styled.div`
  display: none;
  @media only screen and (max-width: 460px) {
    display: block;
  }
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
  height: 100%;
  background-repeat: no-repeat;
  width: 100%;
  position: relative;
  background-position-x: 50%;
  z-index: 1;
  background-color: white;
`;
export const PeopleContainerMobile = styled.div`
  height: 408px;
  @media only screen and (max-width: 770px) {
    height: 450px;
  }
  @media only screen and (max-width: 390px) {
    height: 408px;
  }
`;

export const BgColorMobile = styled.div`
  background-color: #ede7f2;
  height: 300px;
  top: -300px;
  position: relative;

  @media only screen and (max-width: 1980px) {
    top: -59.6%;
    height: 280px;
  }
  @media only screen and (max-width: 1720px) {
    top: -51%;
    height: 240px;
  }
  @media only screen and (max-width: 1600px) {
    height: 240px;
    top: -66.6%;
  }
  @media only screen and (max-width: 1440px) {
    top: -60%;
    height: 180px;
  }
  @media only screen and (max-width: 1280px) {
  }
`;
export const TittleAMobile = styled.span`
  color: #3f1168;
  font-size: 38px;

  @media only screen and (max-width: 580px) {
    font-size: 32px;
  }
  @media only screen and (max-width: 490px) {
  }
  @media only screen and (max-width: 390px) {
  }

  font-family: "Montserrat-ExtraBold" !important;
  @font-face {
    font-family: Montserrat-ExtraBold;
    src: url(../fonts/Montserrat-ExtraBold.ttf);
  }
`;
export const TittleBMobile = styled.span`
  color: #a733e4;
  font-size: 38px;
  font-family: "Montserrat-ExtraBold" !important;
  @media only screen and (max-width: 580px) {
    font-size: 32px;
  }
  @media only screen and (max-width: 490px) {
  }
  @media only screen and (max-width: 390px) {
  }

  @font-face {
    font-family: Montserrat-ExtraBold;
    src: url(../fonts/Montserrat-ExtraBold.ttf);
  }
`;

export const MoreTextMobile = styled.div`
  display: none;
  flex-direction: column;
  gap: 10px;
  z-index: 1;
  font-size: 20px;
  text-align: left;
  font-family: "MONTSERRAT-BOLD" !important;
  @font-face {
    font-family: MONTSERRAT-BOLD;
    src: url(../fonts/MONTSERRAT-BOLD.ttf);
  }
  @media only screen and (max-width: 1023px) {
    display: flex;
  }
  @media only screen and (max-width: 500px) {
    font-size: 16px;
  }
`;
export const MoreText_1Mobile = styled.div`
  color: #ede7f2;
  transition: all 0.2s ease-in-out;
  &:hover {
    transform: scale(1.1);
  }
`;
export const MoreText_2Mobile = styled.div`
  transition: all 0.2s ease-in-out;

  &:hover {
    transform: scale(1.1);
  }
  color: #ede7f2;
`;
export const MoreText_3Mobile = styled.div`
  color: #ede7f2;
  transition: all 0.2s ease-in-out;

  &:hover {
    transform: scale(1.1);
  }
`;

export const FooterATextMobile = styled.div`
  position: absolute;
  width: 25%;
  z-index: 1;
  left: 10%;

  font-size: 14px;
  bottom: -20%;

  @media only screen and (max-width: 770px) {
    font-size: 9px;
    bottom: 2.5%;
  }
  @media only screen and (max-width: 390px) {
    font-size: 8px;
    bottom: 0.5%;
  }

  text-align: left;
  font-family: "MONTSERRAT-MEDIUM" !important;
  @font-face {
    font-family: MONTSERRAT-MEDIUM;
    src: url(../fonts/MONTSERRAT-MEDIUM.ttf);
  }
`;
export const FooterAText_1Mobile = styled.div`
  width: 110%;
  padding-bottom: 38px;

  color: #ede7f2;
  overflow: hidden;

  transition: all 0.2s ease-in-out;

  &:hover {
    transform: translate(30px);
  }

  @media only screen and (max-width: 1440px) {
    padding-bottom: 20px;
  }
  @media only screen and (max-width: 1280px) {
    padding-bottom: 18px;
  }
  @media only screen and (max-width: 1030px) {
    padding-bottom: 5px;
  }
`;
export const FooterAText_2Mobile = styled.div`
  width: 110%;
  padding-bottom: 38px;

  color: #ede7f2;
  overflow: hidden;

  transition: all 0.2s ease-in-out;

  &:hover {
    transform: translate(30px);
  }
  @media only screen and (max-width: 1440px) {
    padding-bottom: 20px;
  }
  @media only screen and (max-width: 1280px) {
    padding-bottom: 18px;
  }
  @media only screen and (max-width: 1030px) {
    padding-bottom: 5px;
  }
`;
export const FooterAText_3Mobile = styled.div`
  width: 110%;
  padding-bottom: 38px;

  color: #ede7f2;
  overflow: hidden;

  transition: all 0.2s ease-in-out;

  &:hover {
    transform: translate(30px);
  }
  @media only screen and (max-width: 1440px) {
    padding-bottom: 20px;
  }
  @media only screen and (max-width: 1280px) {
    padding-bottom: 18px;
  }
  @media only screen and (max-width: 1030px) {
    padding-bottom: 5px;
  }
`;

export const FooterAIconsMobile = styled.div`
  position: absolute;
  height: 100px;
  width: 100px;
  z-index: 1;
  right: 0%;

  bottom: -22.5%;

  text-align: left;
  font-size: 24px;

  @media only screen and (max-width: 770px) {
    height: 120px;
    width: 75px;
    bottom: 2%;
  }
  @media only screen and (max-width: 390px) {
    height: 100px;
    width: 105px;
    bottom: 3%;
  }
  font-family: "MONTSERRAT-MEDIUM" !important;
  @font-face {
    font-family: MONTSERRAT-MEDIUM;
    src: url(../fonts/MONTSERRAT-MEDIUM.ttf);
  }
`;
export const FooterAIcons_1Mobile = styled.div`
  background-repeat: no-repeat;
  color: #ede7f2;
  background-size: 37%;
  height: 100%;
  background-position-x: 33.3%;

  @media only screen and (max-width: 770px) {
    background-size: 20%;
  }
  @media only screen and (max-width: 580px) {
  }
  @media only screen and (max-width: 490px) {
  }
  @media only screen and (max-width: 390px) {
    background-size: 12%;
  }
`;

export const FooterBIconsMobile = styled.div`
  position: absolute;
  height: 100px;
  width: 70px;
  z-index: 1;
  right: 10%;
  bottom: -22.5%;

  text-align: left;
  font-size: 24px;

  @media only screen and (max-width: 840px) {
  }
  @media only screen and (max-width: 770px) {
    bottom: 5%;
  }
  @media only screen and (max-width: 390px) {
    bottom: 0.5%;
  }

  font-family: "MONTSERRAT-MEDIUM" !important;
  @font-face {
    font-family: MONTSERRAT-MEDIUM;
    src: url(../fonts/MONTSERRAT-MEDIUM.ttf);
  }
`;
export const FooterBIcons_1Mobile = styled.div`
  width: 40px;
  height: 40px;
  background-size: 90%;
  margin-bottom: 15px;
  margin-left: 20%;
  background-repeat: no-repeat;

  @media only screen and (max-width: 770px) {
    width: 20px;
    height: 20px;
  }
  @media only screen and (max-width: 580px) {
    width: 16px;
    height: 16px;
  }
  @media only screen and (max-width: 490px) {
  }
  @media only screen and (max-width: 390px) {
    width: 14px;
    height: 14px;
    margin-bottom: 8px;
  }
`;
export const ContainerMainMobile = styled.div`
  background-color: #ffffff;

  border-top-left-radius: 50px 50px;
  border-top-right-radius: 50px 50px;

  width: 100%;
  z-index: 2;
  position: absolute;
  margin-top: 0;
`;
export const ContainerMain2Mobile = styled.div`
  position: relative;
  width: 100%;

  height: 408px;
  margin-bottom: 0;
  @media only screen and (max-width: 770px) {
    height: 450px;
  }
  @media only screen and (max-width: 390px) {
    height: 408px;
  }
`;
export const FooterEndingMobile = styled.div`
  background-color: #29282c;
  padding: 0;
  margin: 0;
  display: inline;

  position: absolute;
  width: 100%;
  z-index: 2;
  bottom: -37.5%;
  height: 15%;

  @media only screen and (max-width: 940px) {
    bottom: -38%;
    height: 22%;
  }

  @media only screen and (max-width: 840px) {
    bottom: -28%;
  }
  @media only screen and (max-width: 770px) {
    bottom: -20%;
  }
  @media only screen and (max-width: 580px) {
    height: 20%;
    bottom: -10%;
  }
  @media only screen and (max-width: 490px) {
    bottom: -5%;
  }
  @media only screen and (max-width: 390px) {
    height: 25%;
    bottom: -1%;
  }
`;
export const LineMobile = styled.div`
  background-color: #dbd0e5;
  position: absolute;
  width: 2.5px;
  height: 145px;
  top: 20%;
  right: 1%;
`;
export const LeftFooterContentMobile = styled.div`
  width: 100%;
  left: 0%;
  position: relative;
`;
export const CenterFooterContentMobile = styled.div`
  width: 80%;
  left: 10%;
  position: relative;
`;
export const FooterEndText1Mobile = styled.span`
  color: #ede7f2;
  font-weight: 100;
  font-size: 16px;

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
    font-size: 10px;
  }

  font-family: "MONTSERRAT-BOLD" !important;
  @font-face {
    font-family: MONTSERRAT-BOLD;
    src: url(../fonts/MONTSERRAT-BOLD.ttf);
  }
`;

export const GonvarFooterLogoMobile = styled.div`
  width: 150px;
  height: 35px;
  background-size: 100%;
  background-repeat: no-repeat;
  left: 40%;
  position: relative;
  top: 20%;
  margin-top: 5%;
  margin-bottom: 2.5%;

  @media only screen and (max-width: 1024px) {
  }
  @media only screen and (max-width: 840px) {
  }
  @media only screen and (max-width: 770px) {
  }
  @media only screen and (max-width: 580px) {
    left: 33.3%;
  }
  @media only screen and (max-width: 490px) {
  }
  @media only screen and (max-width: 390px) {
    left: 30%;
  }
`;
export const SeparingLineMobile = styled.div`
  background-color: white;
  width: 2px;
  height: 45px;
  margin: 20px;
`;
export const FooterTextLineMobile = styled.table`
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

export const SliderSectionTitleMobile = styled.p`
  margin-top: 120px;
  color: #ffffff;
  bottom: 45px;
  position: relative;

  font-size: 24px;
  margin-bottom: 25px;
  margin-left: auto;
  margin-right: auto;
  text-align: center;
  padding-right: 0;
  max-width: 50%;

  @media only screen and (max-width: 390px) {
    max-width: 75%;
  }
`;

export const SliderItemLinkMobile = styled.a`
  text-decoration: none;
  color: #fff;
`;
