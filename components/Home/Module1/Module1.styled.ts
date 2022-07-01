import { Button,Row, Col } from "react-bootstrap";
import styled from 'styled-components';


export const SectionB = styled(Row)  ` 
margin-top: 35px;
`;
export const SectionC = styled(Row)  ` 
margin-top: 40px;
`;
export const LeftWrapper = styled(Col)  ` 
background: radial-gradient(93.75% 92.64% at 6.25% 7.36%, rgba(255, 255, 255, 0.4) 0%, rgba(255, 255, 255, 0.1) 100%, rgba(196, 196, 196, 0) 100%) /* warning: gradient uses a rotation that is not supported by CSS and may not behave as expected */;
opacity: 0.55;
box-shadow: 0px 4px 20px -1px rgba(0, 0, 0, 0.25);
backdrop-filter: blur(40px);
`;
export const Left = styled.div  `
margin-left: 50px;
width: 85%; 
`; 
export const Right = styled.div  ` 
width: 115%;
`;

export const BackgroundWrapper = styled.div  `
background-color: rebeccapurple;
padding-bottom: 40px;
padding-top: 40px;
`;
export const SectionA_01 = styled.div  `
margin-top: 110px
`;
export const SectionA_02 = styled.div  `
margin-top: 20px
`;
export const SectionA_03 = styled.div  `
margin-top: 20  px
`; 
export const SectionB_01 = styled.div  `
background-color: rebeccapurple;
`;
export const SectionB_02 = styled.div  `
background-color: rebeccapurple;
`;
export const RightImage = styled.div  `
width: 90%;
height: auto;
position: relative;
right: 30px;
`;
