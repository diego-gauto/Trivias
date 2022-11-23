import styled from "styled-components";

export const SlideImg = styled.div`
  width: 350px;
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
width: 92%;
margin: 0 auto;
position: relative;
height: 240px;
bottom: 110px;

  @media only screen and (max-width: 1024px) {
    margin-bottom: 75px;
  }
`;

export const NewTag = styled.div`
  top: calc(25px + 3%);
  margin-left: 15px;
  border: 1px solid #ffffff;
  border-radius: 10px;
  width: 79px;
  height: 29px;
  text-align: center;
  position: relative;
`;
export const ShadowLayer = styled.div`
height: 480px;
width: 85%;
box-shadow: -8px 8px 10px 0px rgba(0,0,0,0.2);
position: absolute;
border-radius: 50px;
left: 8%;

transition: all .2s ease-in-out;  
   
&:hover { 
transform: scale(1.0); 
}
`;

export const DisabledFilter = styled.div`
height: 500px;
width: 100%;
background-size: 87%;
background-repeat: no-repeat;
position: absolute;
opacity: 1;  

background-position-x: 14px;
z-index: 1;
&:hover {
  opacity: 0;
  
background-size: 87%; 
}
  z-index: 1;
   
transition: opacity .2s ease-in-out;   

 

`;
export const ContainerMain = styled.div`

transition: all .2s ease-in-out;  
   
&:hover { 
transform: scale(1.1); 
}
`;

export const TextNew = styled.span`
  font-family: "Raleway";
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 150%;
  margin-left: 0px;
  color: #ffffff;
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
