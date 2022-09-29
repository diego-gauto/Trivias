import { Button } from "react-bootstrap";

import styled from "styled-components";

export const PurpleButtonContainer = styled(Button) `
font-family: 'Montserrat';
  background: #6717CD;
  border-radius: 100px;
  color: #fff;  
  border: 0;
  padding: 15px 25px;
  font-size: 16px;
  &:hover {
    transform: scale(1.03);
    -webkit-transition: .5s ease all;
    transition: .5s ease all;
    background-color: #5000b5;
  }
  @media only screen and (max-width: 992px) {
    font-size: 16px;
  }
  @media only screen and (max-width: 576px) {
    font-size: 18px;
  }
`