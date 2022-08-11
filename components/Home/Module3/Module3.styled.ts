 
import { Col, Row } from "react-bootstrap";

import styled from "styled-components";

/* 
export const ModuleImage = styled.div <{ ImgSRC: string }> `
background-image : ${props => props.ImgSRC} !important
background-repeat: no-repeat !important ;
`;
 */

export const RightContainer = styled(Col) `
background: linear-gradient(270deg, #000000 9%, rgba(0, 0, 0, 0) 100%);
@media only screen and (max-width: 1024px) {
  background: none;
}
`;
export const ContentContainer = styled(Row) `
mix-blend-mode: normal;
@media only screen and (max-width: 1024px) {
  background: linear-gradient(0deg, #000000 9%, rgba(0, 0, 0, 0) 100%);
  display: flex;
  flex-direction: column;
}
`;
export const ResultsSection = styled.div `
@media only screen and (max-width: 1024px) {
  display: none;
}
`;
export const ButtonsContainer = styled.div `
display: flex;
gap: 20px;
@media only screen and (max-width: 1024px) {
  justify-content: space-around;
  width: 100vw;
  margin: 0 auto;
}
`;
export const Button01 = styled.div  ` 
background: #6717CD;
border-radius: 100px;
width: 157.5px;
height: 48.7px; 
cursor: pointer;
&:hover{
  background-color: #5000b5;
  transform:scale(1.03);
  transition:.5s ease all;
}
`;
export const Button02 = styled.div  ` 
border: 1px solid #FFFFFF; 
border-radius: 100px;
width: 157.5px;
height: 48.7px;  
cursor: pointer;
&:hover{
  transform:scale(1.03);
  transition:.5s ease all;
}
`;
export const Newtag = styled.div  ` 
border: 1px solid #FFFFFF;
border-radius: 10px;
margin-left: 14px;
margin-bottom: 5px;
width: 79px;
height: 29px;
@media only screen and (max-width: 1024px) {
  margin: 0 5%;
}
`;

export const ModuleImage = styled.div  `
background-repeat: no-repeat;
width: auto;
padding-left: 0;
margin-left: 0;
margin-bottom: 30px;
overflow: hidden;
background-size: cover;
background-position: center;
@media only screen and (max-width: 1024px) {
}
`;

export const ImageTag = styled.div  `
background-repeat: no-repeat;
height: 158px;
margin-top: -5px;
padding: 0;
`;
export const SectionLeft01 = styled.div  `
 height: 290px;
 padding: 0;
@media only screen and (max-width: 1024px) {
  display: none;
  background-position: center;
}
`;
export const SectionLeft02 = styled(Row)  `
 padding-left: 15%;
 width: 100%;
@media only screen and (max-width: 1024px) {
  padding: 0;
  margin: 0;
}
`;
export const Left = styled(Col)  `
width: 150%;
height: 600px;
@media only screen and (max-width: 1024px) {
  height: auto;
}
`;
export const Right = styled(Col)  `
width: 67%;
height: 600px;
margin-left: 33%;
position: relative;
@media only screen and (max-width: 1024px) {
  height: auto;
  margin-left: 0;
  width: 100%;
  display: flex;
  flex-direction: column-reverse;
}
`;
export const SectionRight01 = styled.div  `
padding-top: 65px;
@media only screen and (max-width: 1024px) {
  display: none;
}
`;
export const SectionRight02 = styled.div  `
padding-top: 40px;
margin-left: 50px;
`;
export const SectionRight02_Wrapper = styled(Row)  `
margin-bottom: 16px;
padding-right: 0;
`;
export const SectionRight02_01 = styled(Col)  ` 
margin-left: 5px;
max-width: 12%;
padding-top: 10px;
padding-right: 0;
`;
export const SectionRight02_02 = styled(Col)  ` 
 
  margin-left: 25px;
  max-width: 66%;
`;
export const SectionRight03 = styled.div  `
margin-top: 40px;
margin-left: 50px;
@media only screen and (max-width: 1024px) {
  margin: 40px 5%;
}
`;
export const SectionRight04Container = styled(Row) `
@media only screen and (max-width: 1024px) {
}
`
export const SectionRight04 = styled.div  `
margin-top: 36px;
margin-left: 45px;
width: 90%;
@media only screen and (max-width: 1024px) {
  margin: 0;
}
`;
export const Text01 = styled.span  `
width: 100%;
font-family: 'Montserrat';
font-style: normal;
font-weight: 400;
font-size: 24px;
line-height: 150%;
@font-face{
  font-family:Montserrat;
  src:url(../fonts/Montserrat-VariableFont_wght.ttf);
} 
color: #FFFFFF;
@media only screen and (max-width: 1024px) {
  font-size: 14px;
  max-width: 90vw;
  margin: 0 5%;
  padding: 0;
  margin-bottom: 31px;
}
`;
export const Text02 = styled.span  `
font-family: 'Montserrat';
font-style: normal;
font-weight: 400;
font-size: 36px;
line-height: 150%;
@font-face{
  font-family:Montserrat;
  src:url(../fonts/Montserrat-VariableFont_wght.ttf);
} 
color: #FFFFFF;

text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
@media only screen and (max-width: 1024px) {
  font-size: 24px;
  margin: 0 5%;
  padding: 0;
  margin-bottom: 20px;
}
`;
export const Text03 = styled.span  `

font-family: 'Montserrat';
font-style: normal;
font-weight: 600;
font-size: 18px;
line-height: 150%;
@font-face{
  font-family:Montserrat;
  src:url(../fonts/Montserrat-VariableFont_wght.ttf);
} 
color: #FFFFFF;
`;
export const Text04 = styled.span  ` 
font-family: 'Raleway';
font-style: normal;
font-weight: 400;
font-size: 14px;
line-height: 150%; 
color: #FFFFFF;
@font-face{
  font-family:Raleway;
  src:url(../fonts/Raleway-VariableFont_wght.ttf);
}
`;
export const Text05 = styled.span  ` 
font-family: 'Montserrat';
font-style: normal;
font-weight: 700;
font-size: 24px;
line-height: 150%;
@font-face{
  font-family:Montserrat;
  src:url(../fonts/Montserrat-VariableFont_wght.ttf);
} 
color: #FFFFFF;
@media only screen and (max-width: 1024px) {
  font-size: 20px;
}
`;
export const Text06 = styled.p  ` 
font-family: 'Montserrat';
font-style: normal;
font-weight: 600;
font-size: 14px;
line-height: 150%;
color: #FFFFFF;
-webkit-flex: none;
-ms-flex: none;
flex: none;
-webkit-order: 0;
-ms-flex-order: 0;
order: 0;
-webkit-box-flex: 0;
-webkit-flex-grow: 0;
-ms-flex-positive: 0;
flex-grow: 0;
top: 10px;
position: relative;
margin-bottom: 0;
margin-top: 3px;
text-align: center;
@font-face{
  font-family:Montserrat;
  src:url(../fonts/Montserrat-VariableFont_wght.ttf);
}
@media only screen and (max-width: 1024px) {
  display: none;
}
`;
export const Text06Sm = styled(Text06) `
display: none;
@media only screen and (max-width: 1024px) {
  display: block;
}
`;
export const TextNew = styled.span  `  
font-family: 'Raleway';
font-style: normal;
font-weight: 400;
font-size: 14px;
line-height: 150%; 
margin-left: 5px;
color: #FFFFFF; 
flex: none;
order: 0;
flex-grow: 0;
@font-face{
  font-family:Raleway;
  src:url(../fonts/Raleway-VariableFont_wght.ttf);
}
`;
