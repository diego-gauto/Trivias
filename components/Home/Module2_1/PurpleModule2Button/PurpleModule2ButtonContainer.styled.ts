import { Button } from "react-bootstrap";

import styled from "styled-components";

export const PurpleModule2ButtonContainer = styled(Button)`
  width: 220px;
  border-radius: 100px;
  color: #fff;
  background: transparent;
  padding: 5px 25px;
  border-color: transparent;
  background-image: linear-gradient(to right, #942ced, #d244d1);
  &:hover {
    background-image: linear-gradient(to right, #6717cd, #6717cd);
    background-color: #6717cd;
  }
  @media only screen and (max-width: 1400px) {
    width: 180px;
  }
  @media only screen and (max-width: 1023px) {
    width: auto;
    &:hover {
      border-color: transparent;
      background-image: linear-gradient(to right, #942ced, #d244d1);
    }
    &:active {
      background-image: linear-gradient(to right, #6717cd, #6717cd);
      background-color: #6717cd;
    }
  }
`;
export const Text1 = styled.span`
  font-size: 18px;
  line-height: 20px;
  font-family: "MONTSERRAT-BOLD" !important;
  @font-face {
    font-family: MONTSERRAT-BOLD;
    src: url(../fonts/MONTSERRAT-BOLD.ttf);
  }
  @media only screen and (max-width: 1400px) {
    font-size: 14px;
  }
`;
export const Text2 = styled.span`
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
`;
