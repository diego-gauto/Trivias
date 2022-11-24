import styled from "styled-components";
export const SliderContainer = styled.div`
  position: relative; 
  overflow: hidden;
  
`;
export const People = styled.div`
background-size: 60%;
height: 470px;
background-repeat: no-repeat;
width: 100%; 
position: relative;
background-position-x: 50%;
z-index:1;
@media only screen and (max-width: 1980px) {
  height: 470px;
}
@media only screen and (max-width: 1720px) {
  height: 410px;
}
@media only screen and (max-width: 1600px) {
  height: 360px;
}
@media only screen and (max-width: 1440px) {
  height: 300px;
}


@media only screen and (max-width: 1028px) { 
  height: 270px;

}
`;
export const PeopleContainer = styled.div` 
height: 470px;

@media only screen and (max-width: 1720px) {
  height: 405;
}
@media only screen and (max-width: 1600px) {
  height: 360px;
}
@media only screen and (max-width: 1440px) {
  height: 300px;
  margin-top: 5%;
}
@media only screen and (max-width: 1028px) {
  margin-top: 8%;
}

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



export const ContainerMain = styled.div`
background-color: #E5B6E9;
height: 1120px;
margin-top: 0;
margin-bottom: 5%;
  position: inherit;
  width: 100%;  

  @media only screen and (max-width: 1600px) {
    
margin-bottom: 0%;
  }
  
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
