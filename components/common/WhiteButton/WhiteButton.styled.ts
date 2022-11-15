import { Button } from "react-bootstrap";

import styled from "styled-components";

export const WhiteButtonContainer = styled(Button)`
  font-family: "Montserrat";
  border: 1px solid #ffffff;
  border-radius: 100px;
  color: #fff;
  background: transparent;
  padding: 15px 25px;
  &:hover {
    background-color: #6717cd;
    border-color: transparent;
  }
  @media only screen and (max-width: 992px) {
    font-size: 16px;
  }
  @media only screen and (max-width: 576px) {
    font-size: 18px;
  }
  &:focus {
    background-color: inherit !important;
    border-color: #ffffff !important;
    outline: none !important;
  }
`;
