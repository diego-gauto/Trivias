 import { Button, Row, Col, Container } from "react-bootstrap";
import styled from "styled-components";

export const ModuleContainer = styled(Container) `
height: 82.5vh;
@media only screen and (max-width: 1024px) {
  height: 100vh;
}
`;
export const ArrowDownContainer = styled.div`
@keyframes bounce {
   0%, 20%, 50%, 80%, 100% {transform: translateY(0);} 
   40% {transform: translateY(-2.5px);} 
   60% {transform: translateY(-2.5px);} 
}
animation: bounce 1.75s infinite;
width: 35px;
position: absolute;
bottom: 17.5vh;
left: 10px;
cursor: pointer;
@media only screen and (max-width: 1024px) {
  margin: 0 auto;
  left: 0;
  right: 0;
  bottom: -5px;
}
`;
export const ArrowDownIcon = styled.svg `
fill: #f9f9f9;
`;
export const ModuleContentWrapper = styled(Row) `
display: grid;
grid-template-areas:
"left right";
grid-template-columns: 4fr 5fr;
height: 82.5vh;
align-items: center;
@media only screen and (max-width: 1024px) {
  height: 100vh;
  grid-template-areas:
  "right"
  "left";
  grid-template-columns: 1fr;
  grid-template-rows: 22.5% 77.5%;
}
`
export const SectionB = styled(Row)  ` 
margin-top: 35px;
@media only screen and (max-width: 1024px) {
  margin-top: 0;
  display: flex;
  flex-direction: column;
}
`;
export const SectionC = styled(Row)  ` 
margin-top: 30px;
display: flex;
justify-content: space-between;
flex-wrap: wrap;
justify-content: space-around;
row-gap: 2.5%;
`;
export const LeftWrapper = styled(Col)  `
grid-area: left;
display: flex;
align-items: flex-end;
`;
export const RightWrapper = styled(Col) `
grid-area: right;
display: flex;
flex-direction: column;
`;
export const Left = styled.div  `
margin: 0 5%;
@media only screen and (max-width: 1024px) {
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: space-around;
}
`; 
export const BlurWindow = styled.div  `
opacity: 0.25; 
z-index: -1; 
background-color: #FFFFFF;
width: 45%;
height: 82.5%;
position: absolute;
top: 0;
margin-left: -80px;

backdrop-filter: blur(180px);
border: 2px solid #ffffff;
box-sizing: border-box;    
box-shadow: 0px 4px 20px -1px rgb(0 0 0 / 25%);
@media only screen and (max-width: 1024px) {
  height: 100%;
  width: 94%;
  margin: 0 auto;
  top: auto;
  bottom: 1.5%;
  left: 3%;
  height: 50%;
}
`; 
export const Right = styled.div  ` 
`;
export const Button01 = styled.div  ` 
background: #6717CD;
border-radius: 100px;
width: 223px;
height: 54px;
cursor: pointer;
&:hover{
  background-color: #5000b5;
  transform:scale(1.03);
  transition:.5s ease all;
}
`;
export const Button02 = styled.div  ` 
width: 115%;
`;
export const Button02Content = styled.div  ` 
  padding-top: 15px;
`;
export const Button01Content = styled.div  ` 
  padding-top: 15px;
`;
//background: #CEEFDA;
export const BackgroundWrapper = styled.div  `
padding-top: 40px;
`;
export const SectionA_01 = styled.div  `
@media only screen and (max-width: 1024px) {
  margin-top: 50px;
}
`;
export const SectionA_02 = styled.div  `
margin-top: 20px;
width: 90%;  
`;
export const SectionA_03 = styled.div  `
margin-top: 20  px
`; 
export const SectionB_01 = styled.div  `
margin-left: 0px;
text-align: center;
@media only screen and (max-width: 1024px) {
  display: flex;
  justify-content: space-around;
  margin-bottom: 30px;
}
`;
export const SectionB_02 = styled.div  `
margin-right: 160px;
text-align: center;
@media only screen and (max-width: 1024px) {
  margin-right: 0;
  display: flex;
  justify-content: space-around;
}
`;
export const RightImage = styled.div  `
height: auto;
position: relative;
margin: 0 5%;
display: flex;
align-items: flex-end;
justify-content: center;
@media only screen and (max-width: 1024px) {
  width: 70%;
  margin-top: 35%;
  margin-left: 6%;
  margin-right: 6%;
}
@media only screen and (max-width: 650px) {
  width: 100%;
  margin-top: 50%;
  margin-left: 3%;
  margin-right: 5%;
}
`;
export const RightImageElement = styled.img  `
height: auto;
width: 85%;
@media only screen and (max-width: 1024px) {
width: 90%;
}
`
export const IconImageWrapper = styled.div  `
`;
export const SectionA_01TextWrapper = styled.p  `
font-style: normal;
font-size: 48px;
font-weight: 700;
line-height: 150%;
text-transform: uppercase; 
text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
@font-face{
  font-family:Montserrat;
  src:url(../fonts/Montserrat-VariableFont_wght.ttf);
}
@media only screen and (max-width: 1024px) {
  font-size: 28px;
  margin-bottom: 0;
}
`;
export const SectionA_01Text01 = styled.span  `
color: #FFFFFF; 
`;
export const SectionA_01Text02 = styled.span  `
color: #6717CD; 
`;
export const SectionA_02Text01 = styled.span  `
font-style: normal;
font-weight: 400;
font-size: 18px;
line-height: 150%;
@font-face{
  font-family:Montserrat;
  src:url(../fonts/Montserrat-VariableFont_wght.ttf);
}

color: #FFFFFF;
@media only screen and (max-width: 1024px) {
display: none;
}
`;
export const SectionA_02Text02 = styled.span  `
font-style: normal;
font-weight: 700;
font-size: 18px;
line-height: 150%;
@font-face{
  font-family:Montserrat;
  src:url(../fonts/Montserrat-VariableFont_wght.ttf);
}
color: #FFFFFF;
`;
export const SectionB_Text = styled.span  `
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
export const SectionB_TextALT1 = styled.span  `
font-style: normal; 
font-weight: 600;
font-size: 18px;
line-height: 150%;
margin-left: -25px;
@font-face{
  font-family:Montserrat;
  src:url(../fonts/Montserrat-VariableFont_wght.ttf);
}

color: #FFFFFF;
`;
export const IconElement = styled(Col)  `
padding: 0;
max-width: 200px;
min-width: 170px;
display: flex;
justify-content: center;
`; 
  
{/*
 @font-face{
    font-family:Montserrat;
    src:url(../fonts/Montserrat-VariableFont_wght.ttf);
  }
 */}