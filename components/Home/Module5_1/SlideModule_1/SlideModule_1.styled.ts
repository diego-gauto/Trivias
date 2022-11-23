import styled from "styled-components";

export const SlideImg = styled.div`
  width: 383px;
  border-radius: 45px; 
  height: 350px;
  
  background-size: 95% auto;
  padding: 0;
  margin: 1px auto;
  background-position: center;
  display: flex;
  align-items: flex-start; 
  @media only screen and (max-width: 1024px) {
    height: 180px;
  }
`;

export const TextSectionWrapper = styled.div` 
  

background-color: #EDE7F2;
border-radius: 50px;
width: 100%;
margin: 0 auto;
position: relative;
height: 200px;
bottom: 110px;

-webkit-transition: height 0.5s;
text-align: center;
overflow: hidden;
transition: height 0.5s;
   
&:hover { 
height: 280px;
}

  @media only screen and (max-width: 1024px) {
    margin-bottom: 75px;
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
  z-index: 2;
`;
 
export const UsernameSectionWrapper = styled.div`

`;
 
export const ContainerMain = styled.div`
height: 480px;
box-shadow: -8px 8px 10px 0px rgba(0,0,0,0.2);
transition: all .2s ease-in-out;   
width: 100%;
border-radius: 50px;

&:hover { 
transform: scale(1.1);  
}

`;
export const DisabledMask = styled.div`
height: 480px; 
transition: all .2s ease-in-out;  
  background-color: rgba(239, 233, 243, 0.4);
width: 383px;
border-radius: 50px;
position: absolute; 
opacity: 1;
&:hover {  
background-color: transparent; 
height: 0; 
opacity: 0;
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
  font-family: "Montserrat";
  font-style: normal;
  font-weight: 700;
  font-size: 18px;
  line-height: 150%;
  color: #ffffff;
  @font-face {
    font-family: Montserrat;
    src: url(../fonts/Montserrat-VariableFont_wght.ttf);
  }
  @media only screen and (max-width: 1024px) {
    font-size: 16px;
  }
`;
export const Text02 = styled.span`
text-align: left !important;
  font-family: "Montserrat"; 
  
  width: 80%;
  margin-left: 10%;
  margin-top: 25px;

  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 150%;
  color: #3F1168;
  @font-face {
    font-family: Montserrat;
    src: url(../fonts/Montserrat-VariableFont_wght.ttf);
  }
`;
