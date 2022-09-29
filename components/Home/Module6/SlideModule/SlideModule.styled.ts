

import styled from "styled-components";

export const SlideImg = styled.div `
width: 350px;
height: 350px;
background-repeat: no-repeat;
background-size: 95% auto;
padding: 0;
margin: 0 auto;
background-position: center;
display: flex;
align-items: flex-start;
border-radius: 20px;
@media only screen and (max-width: 1024px) {
  height: 180px;
}
`;

export const TextSectionWrapper = styled.div  `
padding-bottom: 40px;
@media only screen and (max-width: 1024px) {
  margin-bottom: 75px;
}
`;

export const NewTag = styled.div  `
top: calc(25px + 3%);
margin-left: 15px;
border: 1px solid #FFFFFF;
border-radius: 10px; 
width: 79px;
height: 29px;
text-align: center;
position: relative;
`;
export const ContainerMain = styled.div  `


`;
/*

div:hover {
  background-color: #FF1493;
}
 */
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
font-weight: 700;
font-size: 18px;
line-height: 150%;
 
text-align: center;

color: #FFFFFF;

text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
@font-face{
  font-family:Montserrat;
  src:url(../fonts/Montserrat-VariableFont_wght.ttf);
}  
@media only screen and (max-width: 1024px) {
  font-size: 16px;
}
`;
export const Text02 = styled.span `
text-align: center;
font-family: 'Raleway';
font-style: normal;
font-weight: 100;
font-size: 14px; 
line-height: 150%;

/* identical to box height, or 21px */

color: #FFFFFF;

text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
@font-face{
  font-family:Raleway;
  src:url(../fonts/Raleway-VariableFont_wght.ttf);
}
`;