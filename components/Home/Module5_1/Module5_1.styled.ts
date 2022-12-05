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
 
background-repeat: no-repeat;
width: 100%; 
position: relative;
background-position-x: 50%;
z-index:1; 

background-size: 25%;
  top: 23%;
  height: 310px;

@media only screen and (max-width: 2400px) {
  background-size: 25%;
  top: 23%;
  height: 280px;
}
@media only screen and (max-width: 2100px) {
  
  top: 26%;
}
@media only screen and (max-width: 1980px) {
  background-size: 32%;
  top: 16%;
}
@media only screen and (max-width: 1840px) {
  background-size: 34%;
  top: 15%;
}

@media only screen and (max-width: 1720px) {
  background-size: 35%;
  top: 19%;
}
@media only screen and (max-width: 1600px) {
  background-size: 37.5%;
top: -3%;
}
@media only screen and (max-width: 1520px) {
  background-size: 38%;
top: 0%;
}
@media only screen and (max-width: 1440px) {
  background-size: 40%;
  top: 1%;
  
}
@media only screen and (max-width: 1360px) {
  background-size: 45%;
  top: -5%;
}


@media only screen and (max-width: 1280px) {  
  background-size: 50%;
  top: -8%;

}
@media only screen and (max-width: 1200px) {  
   
  top: -4%;

}
@media only screen and (max-width: 1150px) {  
  
  background-size: 55%;
  top: -8%;
}
@media only screen and (max-width: 1080px) {  
  background-size: 60%;
top: -7.5%;
}
@media only screen and (max-width: 1028px) { 
   

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
background-color: #EDE7F2;
height: 270px;
top: -20%;
position: relative;

@media only screen and (max-width: 2400px) {
  height: 270px;
top: -12%;
}

@media only screen and (max-width: 1980px) {
  top: -35%;
  height: 260px;
} 
@media only screen and (max-width: 1720px) {
  top: -36%; 
}
@media only screen and (max-width: 1680px) {
  top: -32%;
}
@media only screen and (max-width: 1600px) {
  top: -50%;
}
@media only screen and (max-width: 1520px) {
  top: -55%;
}
@media only screen and (max-width: 1440px) {
  top: -70%;
  height: 100%;
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
background-color: #E5B6E9;
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
