import { Button } from "react-bootstrap";

import styled from "styled-components";

export const PurpleEmptyButtonContainer = styled(Button)`
  width: 220px;
  font-family: "Montserrat";
  border: 1px solid #3f1168;
  border-radius: 100px;
  color: #3f1168;
  background: transparent;
  padding: 10px 25px;
  &:hover {
    background-color: #6717cd;
    border-color: transparent;
  }
  @media only screen and (max-width: 1400px) {
    width: 180px;
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
