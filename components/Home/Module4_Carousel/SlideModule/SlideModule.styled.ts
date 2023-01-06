import { Container } from "react-bootstrap";

import styled, { css } from "styled-components";

export const SlideModuleContainer = styled(Container)`
  padding: 0;
  margin-top: 10px;
  margin-bottom: 10px;
  padding-right: 10px;
  .hover {
    position: relative;
    background-color: black;
    border-radius: 10px;
    .text-overlay {
      top: 0;
      left: 0;
      position: absolute;
      width: 100%;
      height: 100%;
      opacity: 0;
      button {
        z-index: 5;
        position: absolute;
        border-radius: 15px;
        padding-block: 10px;
        padding-inline: 20px;
        border: none;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        color: #3f1168;
        font-weight: 800;
        margin: 0;
        white-space: nowrap;
        cursor: pointer;
        @media (max-width: 600px) {
          font-size: 14px;
          padding-block: 7px;
          border-radius: 10px;
          padding-inline: 15px;
        }
        @media (max-width: 400px) {
          font-size: 10px;
          padding-block: 5px;
          border-radius: 8px;
          padding-inline: 10px;
        }
      }
      &:hover {
        opacity: 1;
        transition: 0.3s ease all;
      }
      @media (max-width: 1023px) {
        display: none;
      }
    }
    &:hover {
      transform: scale(1.03);
      transition: 0.3s ease all;
      img {
        opacity: 0.5;
        transition: 0.3s ease all;
      }
    }
    @media only screen and (max-width: 1023px) {
      background-color: transparent;
      &:hover {
        transform: scale(1);
        img {
          opacity: 1;
        }
      }
      &:active {
        transform: scale(1.03);
        transition: 0.3s ease all;
      }
    }
  }
`;

export const SlideImg = styled.div`
  background-position: center;
  background-size: 100% auto;
  background-repeat: no-repeat;
  height: 27vh;
  // @media only screen and (max-height: 1980px) {
  //   height: 40vh;
  // }
  // @media only screen and (min-height: 600px) {
  //   height: 36vh;
  // }
  // @media only screen and (min-height: 700px) {
  //   height: 32vh;
  // }
  // @media only screen and (min-height: 800px) and (max-height: 850px) {
  //   background-size: 85% auto;
  //   height: 21vh;
  // }
  // @media only screen and (max-width: 1024px) {
  //   background-size: 72% auto;
  //   margin-bottom: 15px;
  //   height: 26vh;
  // }
  // @media only screen and (max-width: 660px) {
  //   margin-bottom: 15px;
  //   margin-top: 0px;
  //   height: 23vh;
  //   background-size: 95% auto;
  // }
  // @media only screen and (max-width: 500px) {
  //   margin-bottom: 15px;
  //   margin-top: 0px;
  //   height: 16vh;
  // }
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
  font-weight: 500;
  font-size: 18px;
  color: #3f1168;
  @font-face {
    font-family: Montserrat;
    src: url(../fonts/Montserrat-VariableFont_wght.ttf);
  }
`;
export const Text01_p = styled.span`
  font-family: "Montserrat";
  font-weight: 700;
  font-size: 18px;
  color: #a733e4;
  span {
    font-weight: 500;
  }
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
  color: #a733e4;
  @font-face {
    font-family: Montserrat;
    src: url(../fonts/Montserrat-VariableFont_wght.ttf);
  }
`;
export const Text02_p = styled.span`
  font-family: "Montserrat";
  font-weight: 700;
  font-size: 18px;
  color: #3f1168;
  span {
    font-weight: 500;
  }
  @font-face {
    font-family: Montserrat;
    src: url(../fonts/Montserrat-VariableFont_wght.ttf);
  }
`;
export const Text03 = styled.span<{ level: any }>`
  @font-face {
    font-family: Montserrat;
    src: url(../fonts/Montserrat-VariableFont_wght.ttf);
  }
  font-family: "Raleway";
  display: flex;
  align-items: center;

  font-weight: 400;
  font-size: 14px;
  line-height: 150%;
  span {
    font-weight: bold;
    text-transform: uppercase;
    letter-spacing: 2.5px;
  }
  ${(props) =>
    (props.level == "Muy Fácil" || props.level == "Fácil") &&
    css`
      color: #6678f8;
    `}
  ${(props) =>
    (props.level == "Avanzado" || props.level == "Máster") &&
    css`
      color: #ef1155;
    `}
  ${(props) =>
    props.level == "Intermedio" &&
    css`
      color: #12a071;
    `}
`;
