 
import styled from 'styled-components';
import { Container, Col, Row, Button, Image } from "react-bootstrap";
/* 
export const ModuleImage = styled.div <{ ImgSRC: string }> `
background-image : ${props => props.ImgSRC} !important
background-repeat: no-repeat !important ;
`;
 */
 
export const SliderContainer = styled.div`
position: relative;
bottom: -650px;
overflow: hidden;
@media only screen and (max-width: 1024px) {
  margin-top: auto;
  bottom: -525px;
}
`;
export const Divisor = styled.div  ` 
position: absolute;
width: 110%; 
height: 270px;
background: white;
transform: rotate(-185deg); 
margin-left: -5%;
bottom: 570px;
z-index: 2;
`;
 
export const ContainerMain = styled.div  ` 
padding-bottom: 0;
position: inherit;
width: 100%;
margin-top: -475px;
z-index: -1;
@media only screen and (max-width: 1024px) {
  margin-top: -450px;
}
`; 
export const AnimatedBackground = styled.video  `
width: 100%;
height: auto;
transform: rotate(0deg);
position: absolute;
z-index: -2;
bottom: 0%;
`; 
export const SliderContainerChild = styled.div  ` 
z-index: -1;
position: relative;
height: 675px;
@media only screen and (max-width: 1024px) {
  height: 450px;
}
`;

export const SliderSectionTitle = styled.p  `
font-weight: 700;
font-size: 48px;
text-transform: uppercase;
color: #FFFFFF;
text-align: right;
padding-right: 20px;
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

export const SliderItemLink = styled.a `
text-decoration: none;
color: #FFF;
`;
