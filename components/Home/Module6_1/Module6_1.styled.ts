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
background-size: 100%;  
height: 100%;
background-repeat: no-repeat;
width: 100%; 
position: relative;
background-position-x: 50%;
z-index:1; 
background-color: white;
`;
export const PeopleContainer = styled.div` 
height: 62%;
 

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
background-color: #EDE7F2;
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
color: #3F1168;
font-size: 38px;
font-family: "Montserrat-ExtraBold" !important;
@font-face {
  font-family: Montserrat-ExtraBold;
  src: url(../fonts/Montserrat-ExtraBold.ttf);
}
`;
export const TittleB = styled.span` 
color: #A733E4;
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
background-color: #FFFFFF;

border-top-left-radius: 50px 50px;
border-top-right-radius: 50px 50px;
 
width: 100%;
z-index: 2;
position: absolute;
height: 1400px;
margin-top: 0;
margin-bottom: 6.5%;  
 
`;
export const ContainerMain2 = styled.div`
background-color: #EDE7F2; 

  position: absolute;
  width: 100%;  

  height: 300px;
  margin-bottom: 0;

  @media only screen and (max-width: 1980px) { 
height: 1120px; 
  } 
  
`;
export const Line = styled.div`
background-color: #DBD0E5;
position: absolute;
width: 2.5px;
height: 145px;
top: 20%;
right: 1%;
  
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
