import { Container } from "react-bootstrap";

import styled from "styled-components";

export const SlideModuleContainer = styled(Container)`
  padding: 0;
  margin-top: 20px;
  padding-right: 10px;
`;

export const SlideImg = styled.div`
  background-position: center;
  background-size: 100% auto;
  background-repeat: no-repeat;
  height: 27vh;
  @media only screen and (min-height: 500px) {
    height: 42vh;
  }
  @media only screen and (min-height: 600px) {
    height: 38vh;
  }
  @media only screen and (min-height: 700px) {
    height: 34vh;
  }
  @media only screen and (min-height: 800px) and (max-height: 850px) {
    height: 24vh;
  }
  @media only screen and (max-width: 1024px) {
    background-size: 72% auto;
    margin-bottom: 15px;
    height: 28vh;
  }
  @media only screen and (max-width: 660px) {
    margin-bottom: 15px;
    margin-top: 0px;
    height: 25vh;
    background-size: 95% auto;
  }
  @media only screen and (max-width: 500px) {
    margin-bottom: 15px;
    margin-top: 0px;
    height: 18vh;
  }
`;

export const TextSectionWrapper = styled.div`
  padding-bottom: 20px;
  @media only screen and (max-width: 1024px) {
    display: none;
    padding-bottom: 0;
  }
`;

export const NewTag = styled.div`
  margin-top: 9px;
  margin-left: 9px;
  border: 1px solid #ffffff;
  border-radius: 10px;
  width: 79px;
  height: 29px;
  text-align: center;
`;

export const TextNew = styled.span`
  font-family: "Raleway";
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 150%;
  margin-left: 0px;
  color: #ffffff;
  flex: none;
  order: 0;
  flex-grow: 0;
  @font-face {
    font-family: Raleway;
    src: url(../fonts/Raleway-VariableFont_wght.ttf);
  }
`;
export const Text01 = styled.span`
  font-family: "Montserrat";
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 150%;
  color: #000000;
  @font-face {
    font-family: Montserrat;
    src: url(../fonts/Montserrat-VariableFont_wght.ttf);
  }
`;
export const Text02 = styled.span`
  font-family: "Raleway";
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 150%;

  /* identical to box height, or 21px */

  color: #000000;
  @font-face {
    font-family: Montserrat;
    src: url(../fonts/Montserrat-VariableFont_wght.ttf);
  }
`;
