

import styled from "styled-components";

export const SlideImg = styled.div ` 
width: 100%;
height: 200px;
border-radius: 10px;
background-repeat: no-repeat;
background-position: center;
background-size: 100% auto;
padding: 0;
border-radius: 42px;
@media only screen and (max-width: 1024px) {
  margin-bottom: 15px;
  height: 60vh;
}
@media only screen and (max-width: 660px) {
  margin-bottom: 15px;
  margin-top: 0px;
  height: 22vh;
  background-size: 95% auto;
}
@media only screen and (max-width: 500px) {
  margin-bottom: 15px;
  margin-top: 0px;
  height: 16vh;
}
`;

export const TextSectionWrapper = styled.div  `
padding-bottom: 40px;
@media only screen and (max-width: 1024px) {
  display: none;
  padding-bottom: 0;
}
`;

export const NewTag = styled.div  `
margin-top: 9px;
margin-left: 9px;
border: 1px solid #FFFFFF;
border-radius: 10px; 
width: 79px;
height: 29px;
text-align: center;
`;

export const TextNew = styled.span `
 
font-family: 'Raleway';
font-style: normal;
font-weight: 400;
font-size: 14px;
line-height: 150%; 
margin-left: 0px;
color: #FFFFFF; 
flex: none;
order: 0;
flex-grow: 0;
@font-face{
  font-family:Raleway;
  src:url(../fonts/Raleway-VariableFont_wght.ttf);
}
`;
export const Text01 = styled.span `
 
font-family: 'Montserrat';
font-style: normal;
font-weight: 400;
font-size: 18px;
line-height: 150%; 
color: #000000;
@font-face{
  font-family:Montserrat;
  src:url(../fonts/Montserrat-VariableFont_wght.ttf);
}  
`;
export const Text02 = styled.span `
 
font-family: 'Raleway';
font-style: normal;
font-weight: 400;
font-size: 14px;
line-height: 150%;

/* identical to box height, or 21px */

color: #000000;
@font-face{
  font-family:Montserrat;
  src:url(../fonts/Montserrat-VariableFont_wght.ttf);
}  
`;