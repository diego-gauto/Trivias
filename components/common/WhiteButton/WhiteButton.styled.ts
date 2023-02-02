import { Button } from "react-bootstrap";

import styled, { css } from "styled-components";

export const WhiteButtonContainer = styled(Button)`
  font-family: "Montserrat";
  border: 1.5px solid #ffffff;
  border-radius: 100px;
  color: #fff;
  max-width: 200px;
  font-weight: 600;
  background: transparent;
  padding: 15px 25px;
  &:hover {
    background-color: #6717cd;
    border-color: transparent;
  }
  @media only screen and (max-width: 992px) {
    font-size: 16px;
    &:hover {
      background-color: transparent;
      border-color: white;
    }
    &:active {
      background-color: #6717cd;
      border-color: transparent;
    }
  }
  @media only screen and (max-width: 576px) {
    font-size: 18px;
  }
`;
