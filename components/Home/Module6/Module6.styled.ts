 
import styled from 'styled-components';
import { Container, Col, Row, Button, Image } from "react-bootstrap";
/* 
export const ModuleImage = styled.div <{ ImgSRC: string }> `
background-image : ${props => props.ImgSRC} !important
background-repeat: no-repeat !important ;
`;
 */
 
export const Divisor = styled.div  ` 
position: absolute;
    width: 110%; 
    height: 270px;
    background: white;
    transform: rotate(-185deg); 
    margin-left: -5%;
    bottom: 570px;
    z-index: 2;
}
`;
 
export const ContainerMain = styled.div  ` 
padding-bottom: 78px; 
position: inherit; 
width: 1200px;
margin-top: -400px; 
z-index: -1;
`; 
export const SliderContainer = styled.div  `

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
background-color: rebeccapurple;
z-index: -1;
position: relative;
height: 650px;
`; 
