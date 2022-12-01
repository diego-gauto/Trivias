import { Button } from "react-bootstrap";

import styled from "styled-components";

export const PurpleButtonContainer = styled(Button)`
  font-family: "Montserrat";
  border-radius: 100px;
  background: linear-gradient(135deg, #952ced 0%, #ca41d4 100%);
  color: #ede7f2;
  max-width: 200px;
  border: 0;
  padding: 15px 25px;
  font-size: 16px;
  font-weight: 600;
  transition: 0.5s ease all;
  &:hover {
    transform: scale(1.03);
    -webkit-transition: 0.5s ease all;
    transition: 0.5s ease all;
    background-color: #5000b5;
  }
  @media only screen and (max-width: 992px) {
    &:hover {
      transform: scale(1);
    }
    font-size: 16px;
  }
  @media only screen and (max-width: 576px) {
    font-size: 18px;
  }
`;
