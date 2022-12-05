import { Button } from "react-bootstrap";

import styled from "styled-components";

export const PurpleEmptyButtonContainer = styled(Button)`
  width: 220px;
  margin-top: 30px;
  margin-bottom: 20%;
  font-family: "Montserrat";
  border: 1px solid #3f1168;
  border-radius: 100px;
  color: #3f1168;
  background: transparent;
  padding: 15px 25px;
  &:hover {
    background-color: #6717cd;
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
    padding: 10px 25px;
    width: 120px;
  }
  @media only screen and (max-width: 576px) {
    font-size: 18px;
  }
  @media only screen and (max-width: 490px) {
    width: 120px;
  }
  @media only screen and (max-width: 390px) {
    width: 220px;
  }
`;

export const Text1 = styled.div`
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
`;
