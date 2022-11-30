import styled from "styled-components";

export const SlideImg = styled.div`
  width: 382px;
  border-radius: 45px; 
  height: 350px;
  
  background-size: 95% auto;
  padding: 0;
  margin: 0px 15px 0px 12px;
  background-position: center;
  display: flex;
  align-items: flex-start; 
  @media only screen and (max-width: 1600px) {

    width: 290px;
    }

  @media only screen and (max-width: 1024px) {
    height: 320px;
  }
  @media only screen and (max-width: 770px) {
    width: 250px;
  }
  @media only screen and (max-width: 580px) {
    width: 290px;
  }
`;

export const TextSectionWrapper = styled.div` 
  

background-color: #EDE7F2;
border-radius: 50px;
width: 100%;
margin: 0 auto;
position: relative;
height: 230px;
bottom: 110px;
top: -20%; 

text-align: center;
overflow: hidden; 
  
transition: all .2s ease-in-out;  
    
&:hover {  
height: 360px;
bottom: 240px !important; 
}
&:active {  
height: 360px;
bottom: 240px !important; 
}

  @media only screen and (max-width: 1024px) {
    margin-top: 32px;
    height: 205px;
    margin-bottom: 0;
  }
  @media only screen and (max-width: 840px) {
    width: 110%;
    margin-top: 0px;
    height: 210px;
  }
  @media only screen and (max-width: 770px) {
    width: 102%;
  }
  @media only screen and (max-width: 580px) {
    width: 106%;
  }

`;

export const NewTag = styled.div`
  top: calc(25px + 3%);
  margin-left: 15px;
  border: 1px solid #A733E4;
  border-radius: 10px; 
  width: 79px;
  height: 29px;
  text-align: center;
  position: relative;
  z-index: 1;
`;
 
export const UsernameSectionWrapper = styled.div`

background-color: #F4E3BA;
border-radius: 50px;
margin: 0 auto;
position: absolute;
bottom: 0%;
text-align: center;
overflow: hidden;
width: 382px;
height: 100px;

@media only screen and (max-width: 1600px) {

width: 290px;
}

@media only screen and (max-width: 840px) {
  height: 80px;
  width: 284px;
  bottom: -5%;
}
@media only screen and (max-width: 770px) {
  width: 250px;
  
}
@media only screen and (max-width: 580px) {
  width: 290px;
  
}

`;
 
 
 


 
export const ContainerMain = styled.div`
height: 480px;

transition: all .2s ease-in-out;   
width: 100%;
border-radius: 50px;

&:hover { 
transform: scale(1.1);  
}
&:active { 
transform: scale(1.1);  
}

  @media only screen and (max-width: 840px) {
    width: 100%; 
      height: 420px;
}
  @media only screen and (max-width: 770px) {
    width: 95%;
}

`;
 
export const UserDataContainer = styled.div`
height: 10px !important;
display: block;
width: 100%;
position: relative; 
 

@media only screen and (max-width: 1028px) {
 
  left: -20px;
}
@media only screen and (max-width: 840px) {
  
  left: 0px; 
  padding-right: 33.3%;
}
@media only screen and (max-width: 770px) {
   
  padding-right: 30%;
}
@media only screen and (max-width: 580px) {
 
  padding-right: 25%;
}
`;
 
export const GeneralContainer = styled.div`
width: 383px;
@media only screen and (max-width: 1600px) {
  width: 290px;
}
@media only screen and (max-width: 840px) {
  width: 260px;
}
@media only screen and (max-width: 580px) {
  width: 290px;
}
@media only screen and (max-width: 460px) {
  margin-left: 20%;
}
@media only screen and (max-width: 390px) {
  margin-left: 12.5%;
}

`; 

export const TextNew = styled.span`
  font-family: "Raleway";
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 150%;
  margin-left: 0px;
  color: #A733E4;
  flex: none;
  order: 0;
  flex-grow: 0;
  @font-face {
    font-family: Raleway;
    src: url(../fonts/Raleway-VariableFont_wght.ttf);
  }
`;
export const Text01 = styled.span`
font-family: "Montserrat-ExtraBold" !important;
@font-face {
  font-family: Montserrat-ExtraBold;
  src: url(../fonts/Montserrat-ExtraBold.ttf);
}
  font-size: 16px;
  line-height: 150%;
  color: #A733E4;
  text-align: center; 
position: relative;
left: 37.5%; 

  @media only screen and (max-width: 1600px) { 
    font-size: 14px;
    width: 90px;
position: relative;
display: block; 
text-align: center;
      }
 

  @media only screen and (max-width: 1024px) {
    font-size: 13px;
    width: 140px; 
  }
  @media only screen and (max-width: 770px) {
    
  font-size: 11px;
  width: 125px;
  }

  @media only screen and (max-width: 580px) { 
    font-size: 13px;
      }

`;
export const Text02 = styled.p`
text-align: center !important;
font-family: "Montserrat-ExtraBold" !important;
@font-face {
  font-family: Montserrat-ExtraBold;
  src: url(../fonts/Montserrat-ExtraBold.ttf);
}
  padding-left: 20px;
padding-right: 20px;



  width: 80%;
  margin-left: 10%;
  position:relative;
  top: 20px;

  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 150%;
  color: #3F1168;
 
 

  @media only screen and (max-width: 1600px) { 
  font-size: 13px;
    }
  
`;
export const Text03 = styled.span`  
  
  font-family: Sans-Serif; 
  font-size: 16px;
  line-height: 150%;
  color: #3F1168;
  text-align: center; 
position: relative;
   left: 37.5%; 

  @media only screen and (max-width: 1600px) { 
    font-size: 14px;
    width: 90px;
position: relative;
display: block; 
text-align: center;
      }
 

  @media only screen and (max-width: 1024px) {
    font-size: 13px;
    width: 140px; 
  }
  @media only screen and (max-width: 770px) {
    
  font-size: 11px;
  width: 125px;
  }

  @media only screen and (max-width: 580px) { 
    font-size: 13px;
      }

`;

 