import { Col, Row, Container } from "react-bootstrap";
import styled from "styled-components";


export const ColorContainer =  styled.div` 
background-color: #E2A6E5;
height: 100%;
width: auto;
position: relative;
`;

export const Column_1 =  styled.div` 
left: 45%;
position: relative;
top: 70%;
`;

export const Column_2 =  styled.div` 
left: 10%;
position: relative;
top: 20%;
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
`;
  
export const Subtittle_1 =  styled.span` 
color: #3F1168;
font-size: 28px;


font-family: "MONTSERRAT-MEDIUM" !important;
@font-face {
  font-family: MONTSERRAT-MEDIUM;
  src: url(../fonts/MONTSERRAT-MEDIUM.ttf);
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

`;
export const ListText =  styled.div` 
display: block;
position: relative;
margin-left: 100px; 
`;

export const ModuleContainer = styled(Container)`  
height: 600px;
width: 100%;
max-width: 100%;
padding: 0;
@media only screen and (max-width: 1720px) {
margin-top: 0px;
top: -15px;
position: relative;
    }
`;