 
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
padding-bottom: 0;
    position: inherit;
    width: 100%;
    margin-top: -380px;
    z-index: -1;
`; 
export const SliderContainer = styled.div  `
margin-top: 30px;
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
`;

export const SliderSectionTitle = styled.p  `
font-weight: 700;
font-size: 48px;
text-transform: uppercase;
color: #FFFFFF;
text-align: right;
padding-right: 20px;
`
