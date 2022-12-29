import styled from "styled-components";
import { Col, Container, Image, Row } from "react-bootstrap";

export const SliderContainer = styled.div`
  position: relative;
  overflow: hidden;
`;
export const PineappleTextContainer = styled.div`
top: -10%;
display: block;
position: relative;
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
  padding-top: 17%; 
  height: 2195px;
  margin-bottom: 18%;

  @media only screen and (max-width: 2100px) {
    margin-bottom: 14%;
  }
  @media only screen and (max-width: 1980px) {
    margin-bottom: 4%;
    height: 1880px; 
    
  padding-top: 6%;
  }
   
  @media only screen and (max-width: 1840px) {
    height: 1575px;
    margin-bottom: 9%;
  padding-top: 8%;
  }
  @media only screen and (max-width: 1720px) {
   
    margin-bottom: 17%;
  padding-top: 6%;
  }
  @media only screen and (max-width: 1600px) {
   
    margin-bottom: 9%; 
  }
  @media only screen and (max-width: 1520px) {
    margin-bottom: 7%;
    height: 1520px;
  }
  
  
  @media only screen and (max-width: 1440px) {
    margin-bottom: 12%;
    height: 1440px;
  padding-top: 3.5%;
  }
  @media only screen and (max-width: 1360px) {
    height: 1230px;
    margin-bottom: 23%;
  padding-top: 2%;
  }
  @media only screen and (max-width: 1280px) { 
    margin-bottom: 13%; 
  }
  @media only screen and (max-width: 1028px) {
    display: none;
  }
`;

export const People = styled.div`

  height: 100%;
  background-repeat: no-repeat;
  width: 100%;
  position: relative;
  background-position-x: 50%;
  z-index: 1;
  background-color: white;
  background-size: 100%;

  @media only screen and (max-width: 1720px) {
    background-size: 125%;
    }
  @media only screen and (max-width: 1600px) {
    background-size: 137%;
    }
  @media only screen and (max-width: 1520px) {
   
    background-size: 115%;
    }
  @media only screen and (max-width: 1440px) {
   
    background-size: 125%;
    }
  @media only screen and (max-width: 1380px) {
    
    }
  @media only screen and (max-width: 1280px) {
     
    background-size: 110%;
    }
  @media only screen and (max-width: 1200px) {
     
    background-size: 120%;
    }
  @media only screen and (max-width: 1150px) {
     
    background-size: 125%;
    }
  @media only screen and (max-width: 1080px) {
     
    background-size: 132%;
    }
  @media only screen and (max-width: 1030px) {
     
    background-size: 138%;
    }
`;
export const PeopleContainer = styled.div`
  height: 100%;

  @media only screen and (max-width: 2400px) {
    height: 113%;
  }
  @media only screen and (max-width: 2100px) {
    height: 106%;
  }
  @media only screen and (max-width: 1980px) {
    height: 96%;
  }
  @media only screen and (max-width: 1980px) {
    height: 84%;
  }
  @media only screen and (max-width: 1840px) {
    height: 66%;
  }
  @media only screen and (max-width: 1720px) {
    height: 78%;
  }
  @media only screen and (max-width: 1600px) {
    height: 71%;
  }

  @media only screen and (max-width: 1520px) {
    height: 64%;
  }
  @media only screen and (max-width: 1440px) {
    height: 66%;
  }
  @media only screen and (max-width: 1360px) {
    height: 62%;
  }
  @media only screen and (max-width: 1280px) {
    height: 51%;
  }
  
`;

export const BgColor = styled.div`
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
right: 8%;
bottom: 0;
text-align: right;
font-size: 32px;
font-family: "MONTSERRAT-BOLD" !important;
margin-bottom: 20%;

  @media only screen and (max-width: 1980px) { 
    
margin-bottom: 22.5%;
font-size: 24px;
  }

  @media only screen and (max-width: 1840px) {
    margin-bottom: 25%;
  }
  @media only screen and (max-width: 1720px) {
    font-size: 18px;    margin-bottom: 30%;
  }
  @media only screen and (max-width: 1440px) {
    
  }

  @media only screen and (max-width: 1030px) {
    font-size: 14px; 
  }
 
  @font-face {
    font-family: MONTSERRAT-BOLD;
    src: url(../fonts/MONTSERRAT-BOLD.ttf);
  }
`;
export const MoreText_1 = styled.div`
  width: 110%;
  bottom: 570px;
  color: #a73ae5;

  margin-bottom: 5px;
  transition: all 0.2s ease-in-out;

  &:hover {
    transform: scale(1.1);
  }
`;
export const MoreText_2 = styled.div`
  width: 110%;
  bottom: 570px;

  margin-bottom: 5px;
  transition: all 0.2s ease-in-out;

  &:hover {
    transform: scale(1.1);
  }
  color: #d244d1;
`;
export const MoreText_3 = styled.div`
  width: 110%;
  bottom: 570px;
  color: #e88807;
  margin-bottom: 5px;
  transition: all 0.2s ease-in-out;

  &:hover {
    transform: scale(1.1);
  }
`;

export const FooterAText = styled.div`
  position: absolute;
  width: 25%;
  z-index: 1;
  left: 5%;

  font-size: 32px;
  bottom: -42%;
  @media only screen and (max-width: 1980px) {
    
  font-size: 28px;
    bottom: -5%;
  }
  @media only screen and (max-width: 1720px) {
    
  font-size: 22px;
    bottom: -5%;
  }
  
  @media only screen and (max-width: 1440px) {
    font-size: 15px;
    bottom: 0%;
  }
  @media only screen and (max-width: 1030px) {
    font-size: 12px;
    bottom: 14.5%;
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
    padding-bottom: 10px;
  }
`;
export const FooterAText_2 = styled.div`
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
    padding-bottom: 10px;
  }
`;
export const FooterAText_3 = styled.div`
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
    padding-bottom: 10px;
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
  background-size: 42.5%;
  height: 100%;
  background-position-x: 33.3%;

  @media only screen and (max-width: 1440px) {
    background-size: 28%;
  }

  @media only screen and (max-width: 1280px) {
    background-size: 25%;
  }
  @media only screen and (max-width: 1030px) {
    background-size: 20%;
  }
`;

export const FooterBIcons = styled.div`
  position: absolute;
  height: 248px;
  width: 70px;
  z-index: 1;
  right: 10%;

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
export const FooterBIcons_1 = styled.div`
  width: 50px;
  height: 50px;
  background-size: 90%;
  margin-bottom: 12px;
  margin-left: 20%;
  background-repeat: no-repeat;

  @media only screen and (max-width: 1440px) {
    width: 30px;
    height: 30px;
  }
  @media only screen and (max-width: 1280px) {
    width: 25px;
    height: 25px;
  }
  @media only screen and (max-width: 1030px) {
    width: 18px;
    height: 18px;
  }
`;
export const ContainerMain = styled.div`
  background-color: #ffffff;

  border-top-left-radius: 50px 50px;
  border-top-right-radius: 50px 50px;

  width: 100%;
  z-index: 2;
  position: absolute;
  height: 1312px;
  margin-top: 0; 

  @media only screen and (max-width: 1440px) { 
  }
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
  bottom: 45px;
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
