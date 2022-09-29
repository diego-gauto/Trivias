import { Button } from "react-bootstrap";

import styled from "styled-components";

export const WhiteButtonContainer = styled(Button) `
  font-family: 'Montserrat';
  border: 1px solid #FFFFFF;
  border-radius: 100px;
  color: #fff;
  background: transparent; 
  padding: 15px 25px;
  &:hover {
    background-color: #6717CD;
    border-color: transparent;
  }
  @media only screen and (max-width: 992px) {
    font-size: 16px;
  }
  @media only screen and (max-width: 576px) {
    font-size: 18px;
  }
`