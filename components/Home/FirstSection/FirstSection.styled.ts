import { Container } from "react-bootstrap";

import styled from "styled-components";

export const FirstSectionContainer = styled(Container)`
  min-height: 80vh;
  padding-top: 120px;
  color: #fff;
  font-family: Montserrat, sans-serif;
  .left-side {
  }
  .skeleton-product {
    position: relative;
  }
  h1 {
    font-size: 48px;
    font-style: normal;
    font-weight: 700;
    line-height: 150%;
    text-transform: uppercase;
    color: #ffffff;
  }
  h3 {
    font-size: 18px;
  }
  .paragraphs {
    width: 90%;
    margin-bottom: 50px;
  }
  .right-side {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .button-group {
    align-items: center;
  }
  @media only screen and (max-width: 991px) {
    .left-side {
      padding-top: 15px;
    }
  }
  @media only screen and (max-width: 768px) {
    h1 {
      font-size: 40px;
    }
  }
  @media only screen and (max-width: 576px) {
    .button-group .col-12:nth-child(2) {
      margin-top: 20px;
      margin-left: 10px;
    }
  }
`;

export const BlurDiv = styled.div`
  opacity: 0.25;
  width: 50%;
  height: 83%;
  z-index: -1;
  background-color: #ffffff;
  position: absolute;
  top: 0;
  left: 0;
  @media only screen and (max-width: 1200px) {
    width: 48%;
    height: 90%;
  }
  @media only screen and (max-width: 991px) {
    width: 90%;
    height: 55%;
    top: 380px;
    left: 40px;
  }
  @media only screen and (max-width: 768px) {
    width: 90%;
    height: 55%;
    top: 380px;
    left: 40px;
  }
  @media only screen and (max-width: 576px) {
    width: 100%;
    top: 335px;
    left: 0px;
  }
`;

export const ArrowDownContainer = styled.div`
  @keyframes bounce {
    0%,
    20%,
    50%,
    80%,
    100% {
      transform: translateY(0);
    }
    40% {
      transform: translateY(-2.5px);
    }
    60% {
      transform: translateY(-2.5px);
    }
  }
  animation: bounce 1.75s infinite;
  cursor: pointer;
  @media only screen and (max-width: 1024px) {
    margin-top: 20px;
  }
`;
