import styled from "styled-components";
import { Col, Container, Image, Row } from "react-bootstrap"; 

export const SliderContainer = styled.div`
  position: relative; 
  overflow: hidden;
  
`;
export const GeneralContainer = styled(Container)`
  padding: 0;
  display: block;
  @media only screen and (max-width: 1028px) { 
    display: none;
  
  }
`;


export const People = styled.div`
background-size: 100%;  
height: 100%;
background-repeat: no-repeat;
width: 100%; 
position: relative;
background-position-x: 50%;
z-index:1; 
background-color: white;
`;
export const PeopleContainer = styled.div` 
height: 62%;
 

`;
export const Lines = styled.div`
background-size: 100%;
height: 300px;
background-repeat: no-repeat;
@media only screen and (max-width: 1980px) {
  height: 180px;
}
`;
export const BgColor = styled.div`
background-color: #EDE7F2;
height: 300px;
top: -300px; 
position: relative;

@media only screen and (max-width: 1980px) {
  top: -59.6%;
  height: 280px;
} 
@media only screen and (max-width: 1720px) {
  top: -51%;
  height: 240px;
}
@media only screen and (max-width: 1600px) {
  height: 240px;
  top: -66.6%;
}
@media only screen and (max-width: 1440px) {
  top: -60%;
  height: 180px;
}
@media only screen and (max-width: 1280px) {
  
}

`;
export const TittleA = styled.span` 
color: #3F1168;
font-size: 38px;
font-family: "Montserrat-ExtraBold" !important;
@font-face {
  font-family: Montserrat-ExtraBold;
  src: url(../fonts/Montserrat-ExtraBold.ttf);
}
`;
export const TittleB = styled.span` 
color: #A733E4;
font-size: 38px;
font-family: "Montserrat-ExtraBold" !important;
@font-face {
  font-family: Montserrat-ExtraBold;
  src: url(../fonts/Montserrat-ExtraBold.ttf);
}
`;
export const Divisor = styled.div`
  position: absolute;
  width: 110%;
  height: 270px;
  background: white;
  transform: rotate(-185deg);
  margin-left: -5%;
  bottom: 570px;
  z-index: 2;
`;
export const MoreText = styled.div`
position: absolute;
width: 15%;
bottom: 18%;
z-index: 1;
right: 8%;

text-align: right;
font-size: 24px;
font-family: "MONTSERRAT-BOLD" !important;
@font-face {
  font-family: MONTSERRAT-BOLD;
  src: url(../fonts/MONTSERRAT-BOLD.ttf);
}
`;
export const MoreText_1 = styled.div`
  width: 110%;
  bottom: 570px; 
  color: #A73AE5;
  
  margin-bottom: 5px;
  transition: all .2s ease-in-out;  
    
&:hover {  

transform: scale(1.1);  
}
`;
export const MoreText_2 = styled.div`
  width: 110%;
  bottom: 570px; 
  
  margin-bottom: 5px;
  transition: all .2s ease-in-out;  
    
&:hover {  

transform: scale(1.1);  
}
  color: #D244D1;
`;
export const MoreText_3 = styled.div`
  width: 110%;
  bottom: 570px; 
  color: #E88807;
  margin-bottom: 5px;
  transition: all .2s ease-in-out;  
    
&:hover {  

transform: scale(1.1);  
}
`;

export const FooterAText = styled.div`
position: absolute;
width: 25%;
bottom: -8%;
z-index: 1;
left: 5%;

text-align: left;
font-size: 20px;
font-family: "MONTSERRAT-MEDIUM" !important;
@font-face {
  font-family: MONTSERRAT-MEDIUM;
  src: url(../fonts/MONTSERRAT-MEDIUM.ttf);
}
`;
export const FooterAText_1 = styled.div`
  width: 110%;  
  padding-bottom: 38px;

  color: #EDE7F2;
  overflow: hidden; 
  
transition: all .2s ease-in-out;  
    
&:hover {  

transform:translate(30px); 
}
  
`;
export const FooterAText_2 = styled.div`
  width: 110%;  
  padding-bottom: 38px;

  
  color: #EDE7F2;
  overflow: hidden; 
  
transition: all .2s ease-in-out;  
    
&:hover {  

transform:translate(30px); 
}
`;
export const FooterAText_3 = styled.div`
  width: 110%;  
  padding-bottom: 38px;

  color: #EDE7F2;
  overflow: hidden; 
  
transition: all .2s ease-in-out;  
    
&:hover {  

transform: translate(30px);
}
`;


export const FooterAIcons = styled.div`
position: absolute;
height: 248px;
width: 70px;
bottom: -8%;
z-index: 1;
right: 5%;

text-align: left;
font-size: 24px;
font-family: "MONTSERRAT-MEDIUM" !important;
@font-face {
  font-family: MONTSERRAT-MEDIUM;
  src: url(../fonts/MONTSERRAT-MEDIUM.ttf);
}
`;
export const FooterAIcons_1 = styled.div`
background-repeat: no-repeat;
color: #EDE7F2;
background-size: 42.5%;
height: 100%;
background-position-x: 33.3%;
  
`; 

export const FooterBIcons = styled.div`
position: absolute;
height: 248px;
width: 70px;
bottom: -8%;
z-index: 1;
right: 10%;

text-align: left;
font-size: 24px;
font-family: "MONTSERRAT-MEDIUM" !important;
@font-face {
  font-family: MONTSERRAT-MEDIUM;
  src: url(../fonts/MONTSERRAT-MEDIUM.ttf);
}
`;
export const FooterBIcons_1 = styled.div`
  width: 50px;
  height: 50px;
  background-size: 90%;  
  margin-bottom: 12px;
margin-left: 20%;
  background-repeat: no-repeat;
  color: #EDE7F2;
  
`; 
export const FooterBIcons_2 = styled.div`
  width: 50px;
  height: 50px;
  background-size: 90%;  
  margin-bottom: 12px;
margin-left: 20%;
  background-repeat: no-repeat;
  color: #EDE7F2;
  
`; 
export const FooterBIcons_3 = styled.div`
  width: 50px;
  height: 50px;
  background-size: 90%;  
  margin-bottom: 12px;
margin-left: 20%;
  background-repeat: no-repeat;
  color: #EDE7F2;
  
`; 
export const FooterBIcons_4 = styled.div`
  width: 50px;
  height: 50px;
  background-size: 90%;  
  margin-bottom: 12px;
margin-left: 20%;
  background-repeat: no-repeat;
  color: #EDE7F2;
  
`; 

export const ContainerMain = styled.div`
background-color: #FFFFFF;

border-top-left-radius: 50px 50px;
border-top-right-radius: 50px 50px;
 
width: 100%;
z-index: 2;
position: absolute;
height: 1400px;
margin-top: 0;
margin-bottom: 6.5%;  
 
`;
export const ContainerMain2 = styled.div`
background-color: #EDE7F2; 

  position: absolute;
  width: 100%;  

  height: 300px;
  margin-bottom: 0;

  @media only screen and (max-width: 1980px) { 
height: 1120px; 
  } 
  
`;
export const FooterEnding = styled.div`
background-color: #29282C;
position: relative;
width: 100%;
height: 240px;
bottom: 0%;
 padding: 0 ;
 margin: 0 ;
 display: flex;
`;
export const Line = styled.div`
background-color: #DBD0E5;
position: absolute;
width: 2.5px;
height: 145px;
top: 20%;
right: 1%;
  
`;
export const LeftFooterContent = styled.div`

width: 25%; 
`;
export const CenterFooterContent = styled.div`

width: 75%;
`;
export const FooterEndText1 = styled.span`
color: #EDE7F2;
font-weight: 100;
font-size: 24px;
font-family: "MONTSERRAT-BOLD" !important;
@font-face {
  font-family: MONTSERRAT-BOLD;
  src: url(../fonts/MONTSERRAT-BOLD.ttf);
}
  
`;
export const FooterEndText2 = styled.span`
color: #EDE7F2;
font-weight: 100;
font-size: 24px;
font-family: "MONTSERRAT-BOLD" !important;
@font-face {
  font-family: MONTSERRAT-BOLD;
  src: url(../fonts/MONTSERRAT-BOLD.ttf);
}
  
`;
export const FooterEndText3 = styled.span`
color: #EDE7F2;
font-size: 24px;
font-weight: 100;
font-family: "MONTSERRAT-BOLD" !important;
@font-face {
  font-family: MONTSERRAT-BOLD;
  src: url(../fonts/MONTSERRAT-BOLD.ttf);
}
  
`;
export const GonvarFooterLogo = styled.div`
width: 260px;
height: 100px;
background-size: 100%;
background-repeat: no-repeat;
left: 25%;
position: relative;
top: 20%;
`;
export const SeparingLine = styled.div`
background-color: white;
width: 2px;
height: 50px;
margin: 20px;
`;
export const FooterTextLine = styled.table`
top: 15%;
position: relative;
`;
 
 
 
export const SliderSectionTitle = styled.p` 
margin-top: 120px;
  font-size: 48px; 
  color: #ffffff; 
  bottom: 45px;
  position: relative;
  text-align: center;
  padding-right: 0;
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

export const SliderItemLink = styled.a`
  text-decoration: none;
  color: #fff;
`;
