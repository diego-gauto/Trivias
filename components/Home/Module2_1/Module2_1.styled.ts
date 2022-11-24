import { Col, Container, Image, Row } from "react-bootstrap";

import styled from "styled-components";

export const ModuleContainer = styled(Container)`
height: 100%;  
margin-bottom: 1%  ;
padding-top: 90px;
display: block;
  @media only screen and (max-width: 1280px) {
    
    margin-bottom: 14.5%  ;
  }
 
  @media only screen and (max-width: 1024px) {
    margin: 25px auto;
    display: none;
  }
`;
 
export const ModuleContainerBG1alt =  styled.div` 
width: 100%; 
height: 355px;
position: absolute;
display: block;
background-size: 85%;
top: 58.5%;
left: 0%;
background-repeat: no-repeat;

    @media only screen and (max-width: 1980px) {  
    top: 55%;
    height: 525px;
    }
    @media only screen and (max-width: 1720px) {
      top: 50%;
      height: 455px;
    }
    @media only screen and (max-width: 1600px) {
      
      height: 440px;
      top: 52%;
    }
    @media only screen and (max-width: 1440px) {
      top: 42.5%;
      
      height: 400px;
    }
    @media only screen and (max-width: 1280px) {
      top: 45%;
      
      height: 375px;
    }
background-position-x: 115%;
  @media only screen and (max-widt|h: 1024px) {
    margin: 25px auto;
    padding: 0;
  }
  
`;
 
  
export const ModuleContainerBG2alt =  styled.div` 
width: 100%;
height: 110%;
background-repeat: no-repeat;
background-color: #EDE7F2;
background-size: 100%;
position: absolute;
display: block;
top: 0%;
left: 0;
margin-top: 90px;
  @media only screen and (max-widt|h: 1024px) {
    margin: 25px auto;
    padding: 0;
  }
`;
  
export const ConnectorColor =  styled.div` 
width: 100%;
height: 120px;
background-color: #E1A5E4;
position: absolute;
bottom: -20%;
left: 0;

@media only screen and (max-width: 1980px) {
}
@media only screen and (max-width: 1720px) {
}
@media only screen and (max-width: 1600px) {
}
@media only screen and (max-width: 1440px) {
}
@media only screen and (max-width: 1280px) {
  bottom: 5%;
}
@media only screen and (max-width: 1028px) {
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
padding-top: 125px;
  @media only screen and (max-width: 1280px) {
    top: 125%;
    margin-bottom: 2.5%  ;
  }

 
  @media only screen and (max-width: 1024px) {
    margin: 25px auto;
    padding: 0;   
    display: block;
    
margin-bottom: 360px;
  } 
  
  @media only screen and (max-width: 840px) { 
  margin-bottom: 340px;
  } 
  @media only screen and (max-width: 770px) {
    margin-bottom: 280px;
  } 
  @media only screen and (max-width: 580px) {
    margin-bottom: 280px;
  } 
  @media only screen and (max-width: 490px) {
    margin-bottom: 190px;
  } 
`;
 


export const ModuleContainerBG1alt_Mobile =  styled.div` 
width: 100%; 
height: 45%;
position: absolute;
display: block;
background-size: 100%; 
top: 45%; 
left: 0%;
background-repeat: no-repeat; 
 
  @media only screen and (max-width: 1024px) {
    margin: 25px auto;
    padding: 0;
    top: 65%;
  } 
  @media only screen and (max-width: 840px) {
    top: 62.5%;
    
  } 
  @media only screen and (max-width: 770px) {
   
    top: 65%;
  } 
  @media only screen and (max-width: 580px) {
     
    top: 62.5%;
  } 
  @media only screen and (max-width: 490px) {
     
    top: 65%;
  } 
  @media only screen and (max-width: 390px) {
     
    top: 75%;
  } 
`;
 
  
export const ModuleContainerBG2alt_Mobile =  styled.div` 
width: 100%;
height: 80%;
background-repeat: no-repeat; 
position: absolute;
display: block; 
background-color: #EDE7F2;
top: 70px;

margin-top: -150px;
left: 0;
  @media only screen and (max-widt|h: 1024px) {
    margin: 25px auto;
    padding: 0; 
  }

  @media only screen and (max-width: 1024px) {
    height: 145%; 
    
    margin-top: -190px;
  } 
  @media only screen and (max-width: 840px) {
    height: 130%;
     
    margin-top: -110px;
  } 
  @media only screen and (max-width: 770px) {
    height: 120%;
    margin-top: -100px;
  } 
  @media only screen and (max-width: 580px) {
    height: 110%;
    margin-top: -60px;
     
  } 
  @media only screen and (max-width: 490px) {
    height: 100%;
    
    margin-top: -42px;
    
  } 
`;
  


  
export const ColContainerLeft =  styled(Col)`  
@media only screen and (max-width: 1024px) {
  margin-left: -66.6% !important;
} 
@media only screen and (max-width: 840px) {
  margin-left: -33.3% !important;
} 
@media only screen and (max-width: 770px) {
  margin-left: -33.3% !important;
} 
@media only screen and (max-width: 580px) { 
  margin-left: -33.3% !important;
} 
@media only screen and (max-width: 490px) {
   margin-left: 33.3% !important;
  
} 
@media only screen and (max-width: 390px) {
   margin-left: 0% !important;
  
} 
  
`;
export const ColContainerRight =  styled(Col)` 
 
@media only screen and (max-width: 1024px) {
  margin-left: 100% !important;
} 
@media only screen and (max-width: 840px) {
  margin-left: 66.6% !important;
} 
@media only screen and (max-width: 770px) {
  margin-left: 66.6% !important;
} 
@media only screen and (max-width: 580px) { 
  margin-left: 66.6% !important;
} 
@media only screen and (max-width: 490px) {
  margin-left: 15% !important;
  
} 
@media only screen and (max-width: 390px) {
  margin-left: 0% !important;
  
} 
`;

export const ModuleContainerBGColor_Mobile =  styled.div` 
width: 100%;
height: 680px;
position: absolute;
background-color: #EDE7F2;
  
`;
export const ButtonsContainerMobile =  styled.div` 
display: flex;
position: relative;
  
  
@media only screen and (max-width: 1024px) {
  left: 20%;
} 
@media only screen and (max-width: 840px) {
 
left: 10%;
} 
@media only screen and (max-width: 770px) {
  
left: 10%;
} 
@media only screen and (max-width: 580px) {
left: 0%;
} 
@media only screen and (max-width: 490px) {
left: -33.3%;
} 
@media only screen and (max-width: 390px) {
display: contents;
} 
`;
  
  
export const ModuleContainerBG3alt_Mobile =  styled.div` 
width: 100%;
height: 40%;
background-repeat: no-repeat; 
position: absolute;
display: block;
top: 50%; 

left: 0;
  @media only screen and (max-widt|h: 1024px) {
    margin: 25px auto;
    padding: 0;
  }

  
  @media only screen and (max-width: 1024px) {
    top: 50%; 
    
    left: 7.5%;
    background-size: 85% !important;
  } 
  @media only screen and (max-width: 840px) {
    top: 50%;  
  } 
  @media only screen and (max-width: 770px) {
    top: 55%;  
  } 
  @media only screen and (max-width: 580px) {
    top: 52.5%;  
  } 
  @media only screen and (max-width: 490px) {
    top: 58.5%;  
  } 
  
  @media only screen and (max-width: 390px) {
    top: 70%;  
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
text-align: center;
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
    margin-bottom: 52.5%;
    left: 0%;
  }
  @media only screen and (max-width: 840px) {
  
    margin-bottom: 42.5%;
  }
  @media only screen and (max-width: 770px) {
    
    margin-bottom: 42.5%;
  }
  @media only screen and (max-width: 580px) {
   
    margin-bottom: 42.5%;
  }
  @media only screen and (max-width: 490px) {
    
    margin-bottom: 42.5%;
  }
`;

export const RightImage_Mobile = styled.div`
  display: flex;
  width: 95%;
  align-items: flex-start;
  height: 100%;

  justify-content: flex-end;
  
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