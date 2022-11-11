import { Button } from "react-bootstrap";

import styled from "styled-components";

export const PurpleEmptyButtonContainer = styled(Button) `
width: 240px;
 margin-top: 30px;
 margin-bottom: 20%;
  font-family: 'Montserrat';
  border: 1px solid #3F1168;
  border-radius: 100px;
  color: #3F1168;
  background: transparent;  
  padding: 15px 25px;
  &:hover {
    background-color: #6717CD;
    border-color: transparent;
  }
  @media only screen and (max-width: 1440px) {
   
 margin-bottom: 20%;
  }
  @media only screen and (max-width: 1280px) {
   
 margin-bottom: 5%;
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

export const Text1 = styled.div `
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