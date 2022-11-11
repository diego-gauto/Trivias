import { Col, Container, Image, Row } from "react-bootstrap";

import styled from "styled-components";

export const ModuleContainer = styled(Container)`
height: 100%;  
margin-bottom: 0%  ;
display: block;
  @media only screen and (max-width: 1280px) {
    top: 125%;
    margin-bottom: 2.5%  ;
  }
 
  @media only screen and (max-width: 1024px) {
    margin: 25px auto;
    display: none;
  }
`;
 
export const ModuleContainerBG1alt =  styled.div` 
width: 100%; 
height: 100%;
position: absolute;
display: block;
background-size: 85%;
top: 125%;
left: 0%;
background-repeat: no-repeat;

    @media only screen and (max-width: 1980px) {  
    top: 45%;
    }
    @media only screen and (max-width: 1720px) {
      top: 40%;
    }
    @media only screen and (max-width: 1600px) {
      top: 40%;
    }
    @media only screen and (max-width: 1440px) {
      top: 32.5%;
    }
    @media only screen and (max-width: 1280px) {
      top: 30%;
    }
background-position-x: 115%;
  @media only screen and (max-widt|h: 1024px) {
    margin: 25px auto;
    padding: 0;
  }
`;
 
  
export const ModuleContainerBG2alt =  styled.div` 
width: 100%;
height: 100%;
background-repeat: no-repeat;
background-color: #EDE7F2;
background-size: 100%;
position: absolute;
display: block;
top: 0%;
left: 0;
  @media only screen and (max-widt|h: 1024px) {
    margin: 25px auto;
    padding: 0;
  }
`;
  

export const FirstSectionContainer = styled(Container)`  
  color: #fff;
  font-family: Montserrat, sans-serif;
  .left-side {
  }
  .skeleton-product {
    position: relative;
  }
  h1 {
    font-size: 48px;
    font-style: normal;
    font-weight: 700;
    line-height: 150%;
    text-transform: uppercase;
    color: #ffffff;
  }
  h3 {
    font-size: 18px;
  }
  .paragraphs {
    width: 90%;
    margin-bottom: 50px;
  }
  .right-side {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .button-group {
    align-items: center;
  }
  @media only screen and (max-width: 991px) {
    .left-side {
      padding-top: 15px;
    }
  }
  @media only screen and (max-width: 768px) {
    h1 {
      font-size: 40px;
    }
  }
  @media only screen and (max-width: 576px) {
    .button-group .col-12:nth-child(2) {
      margin-top: 20px;
      margin-left: 10px;
    }
  }
`;

export const LeftImage = styled.div`
display: inherit;
position: relative;
bottom: 0;
width: 85%;
 left: -30%;
margin-top: 30%;
   
  @media only screen and (max-width: 1720px) {
margin-top: 10%;
 left: -15%; 
  }
  @media only screen and (max-width: 1440px) {
margin-top: 10%;
 left: -5%; 
  }

  @media only screen and (max-width: 1024px) {
    margin: 25px auto;
    padding: 0;
  }
`;

export const RightImage = styled.div`
  display: flex;
  width: 95%;
  align-items: flex-start;
  height: 100%;

  justify-content: flex-end;
  @media only screen and (max-width: 1024px) {
    display: none;
  }
`;
export const TittleContainer = styled.div`
width: 75%;
margin-top:10%;
@media only screen and (max-width: 1440px) {
  margin-top: 15%

}
@media only screen and (max-width: 1440px) {
  margin-top: 12.5%

}
`;
export const Tittle = styled.span`
color: #942CED;
font-size: 50px;
line-height: 60px;
font-family: "Montserrat-ExtraBold" !important;
@font-face {
  font-family: Montserrat-ExtraBold;
  src: url(../fonts/Montserrat-ExtraBold.ttf);
}
@media only screen and (max-width: 1440px) {
  font-size: 48px;  
line-height: 54px;
}
@media only screen and (max-width: 1280px) {
  font-size: 42px;  
line-height: 48px;
}
`;
export const Subtittles = styled.div` 
width: 50%; margin-top: 50px;
@media only screen and (max-width: 1440px) {
  margin-top: 25px;
}
`;
export const Subtittle1 = styled.span`
color: #3F1168;
font-size: 18px;
font-family: "MONTSERRAT-MEDIUM" !important;
@font-face {
  font-family: MONTSERRAT-MEDIUM;
  src: url(../fonts/MONTSERRAT-MEDIUM.ttf);
}
@media only screen and (max-width: 1440px) {
  font-size: 14px; 
}
 
`;
export const Subtittle2 = styled.span`
color: #D24DD3;
font-size: 18px;
font-family: "MONTSERRAT-BOLD" !important;
@font-face {
  font-family: MONTSERRAT-BOLD;
  src: url(../fonts/MONTSERRAT-BOLD.ttf);
}

@media only screen and (max-width: 1440px) { 
font-size: 14px;
}
 
`;
 
export const TitleCenter = styled.p` 
  font-style: normal;
  font-weight: 400;
  font-size: 24px;
  line-height: 150%;
  text-align: center;
  color: black;
   
`;

//********************Mobile** */


export const ModuleContainer_Mobile = styled(Container)`
height: 100%;  
margin-bottom: 0%  ;
display: none;
 
  @media only screen and (max-width: 1280px) {
    top: 125%;
    margin-bottom: 2.5%  ;
  }

 
  @media only screen and (max-width: 1024px) {
    margin: 25px auto;
    padding: 0;   
    display: block;
  }
`;
 


export const ModuleContainerBG1alt_Mobile =  styled.div` 
width: 100%; 
height: 100%;
position: absolute;
display: block;
background-size: 85%;
top: 125%;
left: 0%;
background-repeat: no-repeat;

    @media only screen and (max-width: 1980px) {  
    top: 120%;
    }
    @media only screen and (max-width: 1720px) {
      top: 115%;
    }
    @media only screen and (max-width: 1600px) {
      top: 115%;
    }
    @media only screen and (max-width: 1440px) {
      top: 110%;
    }
    @media only screen and (max-width: 1280px) {
      top: 110%;
    }
background-position-x: 115%;
  @media only screen and (max-widt|h: 1024px) {
    margin: 25px auto;
    padding: 0;
  }
`;
 
  
export const ModuleContainerBG2alt_Mobile =  styled.div` 
width: 100%;
height: 100%;
background-repeat: no-repeat;
background-color: #EDE7F2;
background-size: 100%;
position: absolute;
display: block;
top: 83%;
left: 0;
  @media only screen and (max-widt|h: 1024px) {
    margin: 25px auto;
    padding: 0;
  }
`;
  

export const FirstSectionContainer_Mobile = styled(Container)`  
  color: #fff;
  font-family: Montserrat, sans-serif;
  .left-side {
  }
  .skeleton-product {
    position: relative;
  }
  h1 {
    font-size: 48px;
    font-style: normal;
    font-weight: 700;
    line-height: 150%;
    text-transform: uppercase;
    color: #ffffff;
  }
  h3 {
    font-size: 18px;
  }
  .paragraphs {
    width: 90%;
    margin-bottom: 50px;
  }
  .right-side {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .button-group {
    align-items: center;
  }
  @media only screen and (max-width: 991px) {
    .left-side {
      padding-top: 15px;
    }
  }
  @media only screen and (max-width: 768px) {
    h1 {
      font-size: 40px;
    }
  }
  @media only screen and (max-width: 576px) {
    .button-group .col-12:nth-child(2) {
      margin-top: 20px;
      margin-left: 10px;
    }
  }
`;

export const LeftImage_Mobile = styled.div`
display: inherit;
position: relative;
bottom: 0;
width: 85%;
 left: -30%;
margin-top: 30%;
   
  @media only screen and (max-width: 1720px) {
margin-top: 10%;
 left: -15%; 
  }
  @media only screen and (max-width: 1440px) {
margin-top: 10%;
 left: -5%; 
  }

  @media only screen and (max-width: 1024px) {
    margin: 25px auto;
    padding: 0;
  }
`;

export const RightImage_Mobile = styled.div`
  display: flex;
  width: 95%;
  align-items: flex-start;
  height: 100%;

  justify-content: flex-end;
  @media only screen and (max-width: 1024px) {
    display: none;
  }
`;
export const TittleContainer_Mobile = styled.div`
width: 100%;
margin-top:10%;
@media only screen and (max-width: 1440px) {
  margin-top: 15%

}
@media only screen and (max-width: 1440px) {
  margin-top: 12.5%

}
`;
export const Tittle_Mobile = styled.span`
color: #942CED;
font-size: 50px;
line-height: 60px;
font-family: "Montserrat-ExtraBold" !important;
@font-face {
  font-family: Montserrat-ExtraBold;
  src: url(../fonts/Montserrat-ExtraBold.ttf);
}
@media only screen and (max-width: 1440px) {
  font-size: 48px;  
line-height: 54px;
}
@media only screen and (max-width: 1280px) {
  font-size: 42px;  
line-height: 48px;
}
`;
export const Subtittles_Mobile = styled.div` 
width: 100%; margin-top: 50px;
@media only screen and (max-width: 1440px) {
  margin-top: 25px;
}
`;
export const Subtittle1_Mobile = styled.span`
color: #3F1168;
font-size: 18px;
font-family: "MONTSERRAT-MEDIUM" !important;
@font-face {
  font-family: MONTSERRAT-MEDIUM;
  src: url(../fonts/MONTSERRAT-MEDIUM.ttf);
}
@media only screen and (max-width: 1440px) {
  font-size: 14px; 
}
 
`;
export const Subtittle2_Mobile = styled.span`
color: #D24DD3;
font-size: 18px;
font-family: "MONTSERRAT-BOLD" !important;
@font-face {
  font-family: MONTSERRAT-BOLD;
  src: url(../fonts/MONTSERRAT-BOLD.ttf);
}

@media only screen and (max-width: 1440px) { 
font-size: 14px;
}
 
`;
 
export const TitleCenter_Mobile = styled.p` 
  font-style: normal;
  font-weight: 400;
  font-size: 24px;
  line-height: 150%;
  text-align: center;
  color: black;
   
`;