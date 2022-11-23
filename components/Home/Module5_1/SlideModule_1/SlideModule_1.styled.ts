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
  z-index: 1;
`;
 
export const UsernameSectionWrapper = styled.div`

background-color: #F4E3BA;
border-radius: 50px;
margin: 0 auto;
position: absolute;
z-index: 1;
bottom: 0%;
text-align: center;
overflow: hidden;
width: 382px;
height: 100px;
`;
 
export const FacebookButton = styled.div`
position: absolute;
z-index: 1;
bottom: 25%;
background-repeat: no-repeat;
width: 50px;
height: 50px;
right: 10%;
background-color: white;
border-radius: 50px;
background-size: 105%;
`;
export const UserImage = styled.div`

background-color: #F4E3BA;
border-radius: 50px;
margin: 0 auto;
position: absolute;
z-index: 1;
bottom: 0%;
text-align: center;
overflow: hidden;
width: 382px;
height: 100px;
`;



 
export const ContainerMain = styled.div`
height: 480px;
background-color: #EDE7F2;
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
margin-top: -1px;
transition: all .2s ease-in-out;  
  background-color: rgba(239, 233, 243, 0.6);
width: 383px;
border-radius: 45px;
position: absolute; 
opacity: 1;
&:hover {  
background-color: transparent; 
height: 0px; 
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
export const Text02 = styled.p`
text-align: left !important;
  font-family: "Montserrat"; 
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
 

  @font-face {
    font-family: Montserrat;
    src: url(../fonts/Montserrat-VariableFont_wght.ttf);
  }
`;

export const DateText = styled.p`

background-color: #F4E3BA;
border-radius: 50px;
margin: 0 auto;
position: absolute;
z-index: 1;
bottom: 0%;
text-align: center;
overflow: hidden;
width: 382px;
height: 100px;
`;
