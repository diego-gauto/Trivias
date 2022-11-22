import styled from "styled-components";
export const SliderContainer = styled.div`
  position: relative; 
  overflow: hidden;
  
`;
export const People = styled.div`
background-size: 50%;
height: 410px;
background-repeat: no-repeat;
width: 100%;
z-index: 1;
position: relative;
background-position-x: 50%;
`;
export const PeopleContainer = styled.div` 
height: 410px; 
`;
export const Lines = styled.div`
background-size: 100%;
height: 180px;
background-repeat: no-repeat;
`;
export const BgColor = styled.div`
background-color: #EDE7F2;
height: 300px;
top: -70%;
display: block;
position: relative;
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



export const ContainerMain = styled.div`
background-color: #E5B6E9;
height: 1120px;
margin-top: 0;

  padding-bottom: 0;
  position: inherit;
  width: 100%;  
  
`;
export const AnimatedBackground = styled.video`
  width: 100%;
  height: auto;
  transform: rotate(0deg);
  position: absolute;
  z-index: -2;
  bottom: 0%;
`;
export const SliderContainerChild = styled.div`
  z-index: -1;
  position: relative;
  height: 675px;
  @media only screen and (max-width: 1024px) {
    height: 450px;
  }
`;
export const SliderSectionTitle = styled.p` 
  font-size: 48px; 
  color: #ffffff; 
  bottom: 95px;
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
