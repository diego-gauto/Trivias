 
import styled from 'styled-components';
import { Container, Col, Row, Button, Image } from "react-bootstrap";
/* 
export const ModuleImage = styled.div <{ ImgSRC: string }> `
background-image : ${props => props.ImgSRC} !important
background-repeat: no-repeat !important ;
`;
 */
 
export const Divisor = styled.div  ` 
position: relative;
    width: 110%;
    height: 200px;
    background: white;
    -webkit-transform: rotate(-185deg);
    -ms-transform: rotate(-185deg);
    transform: rotate(-185deg);
    margin-left: -5%;   
    bottom: 130px;
    z-index: -1;
`;
 
export const ContainerMain = styled.div  ` 
padding-bottom: 78px;
position: inherit; 
width: 1200px;
margin-top: -240px;  
margin-left: 20%; 
z-index: -1;
`; 
export const SliderContainer = styled.div  `

`; 
export const SliderContainerChild = styled.div  ` 
background-color: rebeccapurple;
z-index: -1;
position: relative;
height: 700px;
`; 
