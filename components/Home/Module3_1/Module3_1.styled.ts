import { Col, Row, Container } from "react-bootstrap";
import styled from "styled-components";


export const ColorContainer =  styled.div` 
background-color: #E2A6E5;
height: 110%;
width: auto;
position: relative;

@media only screen and (max-width: 1440px) {
  padding-top: 75px;
}
@media only screen and (max-width: 1280px) {
  padding-top: 85px;
}
@media only screen and (max-width: 1028px) {
  padding-top: 55px;
}
`;

export const Column_1 =  styled.div` 
left: 25%;
position: relative;
top: 70%;
`;

export const Column_2 =  styled.div` 
left: 0%;
position: relative;
top: 20%;
text-align: center;
`;

export const Column_3 =  styled.div` 
left: -10%;
position: relative;
top:  70%;
`;
  
export const Tittle =  styled.h3` 
color: #3F1168;
font-size: 38px;
font-family: "Montserrat-ExtraBold" !important;
@font-face {
  font-family: Montserrat-ExtraBold;
  src: url(../fonts/Montserrat-ExtraBold.ttf);
}

@media only screen and (max-width: 1440px) { 
font-size: 32px;
}
@media only screen and (max-width: 1280px) {
  font-size: 28px;
}
@media only screen and (max-widt|h: 1028px) {
  font-size: 24px;
}

`;
  
export const Subtittle_1 =  styled.span` 
color: #3F1168;
font-size: 28px;
font-family: "MONTSERRAT-MEDIUM" !important;
@font-face {
  font-family: MONTSERRAT-MEDIUM;
  src: url(../fonts/MONTSERRAT-MEDIUM.ttf);
}

@media only screen and (max-width: 1440px) { 
font-size: 22px;
}
@media only screen and (max-width: 1280px) {
  font-size: 18px;
}
@media only screen and (max-widt|h: 1028px) {
  font-size: 14px;
}

`;
  
export const Subtittle_2 =  styled.span` 
color: #942CED;
font-size: 28px;
font-family: "Montserrat-ExtraBold" !important;
@font-face {
  font-family: Montserrat-ExtraBold;
  src: url(../fonts/Montserrat-ExtraBold.ttf);
}

@media only screen and (max-width: 1440px) { 
font-size: 22px;
}
@media only screen and (max-width: 1280px) {
  font-size: 18px;
}
@media only screen and (max-widt|h: 10248px) {
  font-size: 14px;
}

`;
export const UlElement =  styled.ul` 
list-style-type: none !important;
`;
export const LiElement =  styled.li` 
padding-bottom: 50px;
`;
  

export const ModuleContainerBG1 =  styled.div` 
width: 66px;
height: 66px;
background-repeat: no-repeat; 
position: absolute;
display: block; 


@media only screen and (max-width: 1440px) {
  width: 50px;
  height: 50px;
}
 
@media only screen and (max-widt|h: 1028px) {
  width: 40px;
  height: 40px;
}
`;
export const ModuleContainerBG2 =  styled.div` 
width: 100%;
height: 170%;
background-repeat: no-repeat;
position: relative;
display: block; 
top: 35%;
background-position-x: 50%;

@media only screen and (max-width: 1980px) {   
}
@media only screen and (max-width: 1720px) {
  height: 165%; 
  top: 35%;
}
@media only screen and (max-width: 1600px) {
  height: 125%;
top: 30%;
}
@media only screen and (max-width: 1440px) {
  height: 160%;
  top: 35%;
}
@media only screen and (max-width: 1280px) {
  height: 160%;
  top: 45%;
}
@media only screen and (max-width: 1028px) {
  height: 145%;
  top: 45%;
}


`;
export const ListText =  styled.div` 
display: block;
position: relative;
margin-left: 100px; 

@media only screen and (max-width: 1440px) {
  margin-left: 75px;
}
 
@media only screen and (max-widt|h: 1028px) {
  margin-left: 70px;
}
`;

export const ModuleContainer = styled(Container)`  
height: 600px;
width: 100%;
max-width: 100%;
padding: 0;
top: -50px;
position: relative;

@media only screen and (max-width: 1720px) {
margin-top: 0px;
top: -35px;
position: relative;
    }
`;