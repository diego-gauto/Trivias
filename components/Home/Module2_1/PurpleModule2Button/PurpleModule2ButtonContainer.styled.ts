import { Button } from "react-bootstrap";

import styled from "styled-components";

export const PurpleModule2ButtonContainer = styled(Button) `
width: 240px; margin-top: 60px;
  border-radius: 100px;
  color: #FFF;
  background: transparent; 
  padding: 10px 25px;
  border-color: transparent;
  background-image: linear-gradient(to right, #942CED, #D244D1 ); 
 
  &:hover {
    
  background-image: none; 
    background-color: #6717CD;
  }
  @media only screen and (max-width: 1440px) {
    margin-top: 30px;
  }
  @media only screen and (max-width: 1280px) {
    width: 210px;
    
  padding: 5px 25px;
  }
  @media only screen and (max-width: 992px) {
    font-size: 16px;
  }
  @media only screen and (max-width: 576px) {
    font-size: 18px;
  }
`
export const Text1 = styled.span `
  font-size: 18px;
  
  line-height: 20px;
  font-family: "MONTSERRAT-BOLD" !important;
    @font-face {
      font-family: MONTSERRAT-BOLD;
      src: url(../fonts/MONTSERRAT-BOLD.ttf);
    } 
    @media only screen and (max-width: 1280px) {
      font-size: 12px;
    }
`
export const Text2 = styled.span `
font-size: 12px;

line-height: 20px;
  font-family: "MONTSERRAT-SEMIBOLD" !important;
    @font-face {
      font-family: MONTSERRAT-SEMIBOLD;
      src: url(../fonts/MONTSERRAT-SEMIBOLD.ttf);
    } 
    @media only screen and (max-width: 1280px) {
      font-size: 10px;
    }
`