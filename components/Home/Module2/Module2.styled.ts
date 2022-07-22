import { Col, Row } from "react-bootstrap";
import styled from 'styled-components';
 
export const ImageTag = styled.div  `
 
`;
export const SectionCentered = styled.div  `
background-color: white;
height: 430.5px;
z-index: 1;
position: absolute;
width: 1073.125px;
background: #FFFFFF;
box-shadow: 0px 0px 20px 4px rgba(0, 0, 0, 0.25);
border-radius: 10px;
@media (min-width: 1800px) {
  height: 500px;
  width: 1225px;   
}
`;
export const SectionCenteredWrapper = styled.div  `
bottom: 395px;
position: relative;
display: flex;
justify-content: space-around;
@media (min-width: 1800px) {
  bottom: 450px;  
}
`;
export const LeftImage = styled.div  `
display: flex;
width: 95%;
align-items: flex-end;
justify-content: flex-start;
margin-left: 15px;
`;

export const RightImage = styled.div  `
display: flex;
width: 95%;
margin-top: 25px;
align-items: center;
justify-content: flex-end;
`;
export const SectionCenteredBackground = styled(Row)  `
height: 65vh;
`;
export const SectionCenteredTopColumn = styled(Col)  `
height: 10px;
bottom: 70px;
position: relative;
`;

export const IconImage = styled.div  `
display: flex;
justify-content: space-around;
`;

export const IconText = styled.p  `
margin-top: 27px;
text-align: center;
width: 100%; 
`;
export const IconText_B = styled.p  `
font-family: 'Raleway';
font-style: normal;
font-weight: 400;
font-size: 14px;
line-height: 150%;
 
text-align: center;
`;
export const TitleCenter = styled.span  `
font-family: 'Montserrat';
font-style: normal;
font-weight: 400;
font-size: 24px;
line-height: 150%;
 
text-align: center;
`;
export const TitleCenter2 = styled.span  `
font-family: 'Montserrat';
font-style: normal;
font-weight: 400;
font-size: 24px;
line-height: 150%;
 color: #6717CD;
text-align: center;
@font-face{
  font-family:Montserrat;
  src:url(../fonts/Montserrat-VariableFont_wght.ttf);
} 
`;