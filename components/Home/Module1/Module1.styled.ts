 import { Button,Row, Col } from "react-bootstrap";
import styled from 'styled-components';


export const SectionB = styled(Row)  ` 
margin-top: 35px;
`;
export const SectionC = styled(Row)  ` 
margin-top: 40px;
`;
export const LeftWrapper = styled(Col)  `
`;
export const Left = styled.div  `
margin: 0 5%;
`; 
export const BlurWindow = styled.div  `
opacity: 0.25; 
 z-index: -1; 
background-color: #FFFFFF;
width: 50%;
height: 100%;
position: absolute;
top: 0;
margin-left: -80px;

backdrop-filter: blur(180px);
    border: 2px solid #ffffff;
    box-sizing: border-box;    
    box-shadow: 0px 4px 20px -1px rgb(0 0 0 / 25%);
    
@media (min-width: 1600px) {
  height: 95%;
}
@media (min-width: 1800px) {
  height: 87.5%;
}
`; 
export const Right = styled.div  ` 
`;
export const Button01 = styled.div  ` 
background: #6717CD;
border-radius: 100px;
width: 223px;
height: 54px;
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

padding-bottom: 80px;
padding-top: 40px;
`;
export const SectionA_01 = styled.div  `
margin-top: 110px
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
`;
export const SectionB_02 = styled.div  `
margin-right: 160px;
text-align: center;
`;
export const RightImage = styled.div  `
height: auto;
position: relative;
margin: 0 5%;
`;
export const IconImageWrapper = styled.div  `
padding-left: 15px
`;
export const SectionA_01Text01 = styled.span  `
font-style: normal;
font-weight: 700;
font-size: 48px;
line-height: 150%;
text-transform: uppercase; 
color: #FFFFFF; 
text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
@font-face{
  font-family:Montserrat;
  src:url(../fonts/Montserrat-VariableFont_wght.ttf);
}
`;
export const SectionA_01Text02 = styled.span  `

font-style: normal;
font-weight: 700;
font-size: 48px;
line-height: 150%;
text-transform: uppercase; 
color: #6717CD; 
text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
@font-face{
  font-family:Montserrat;
  src:url(../fonts/Montserrat-VariableFont_wght.ttf);
}
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
}
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
}
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
}
`;
export const IconElement = styled(Col)  `
padding: 0;
    max-width: 200px;
    padding-left: 12px;
`; 
  
{/*
 @font-face{
    font-family:Montserrat;
    src:url(../fonts/Montserrat-VariableFont_wght.ttf);
  }
 */}