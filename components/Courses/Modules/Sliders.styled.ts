import styled, { css } from "styled-components";
import { Container } from "react-bootstrap";

export const SlideContain = styled.div`
  overflow: scroll;
  overflow-y: hidden;
  padding-block-end: 40px;
  .slide-mod {
    display: flex;
    padding-left: 60px;
    @media (max-width: 1023px) {
      padding-left: 30px;
    }
  }
`;
export const SlideModuleContainer = styled(Container)<{ level: any }>`
  padding: 0;
  margin-top: 20px;
  margin-bottom: 0px;
  cursor: grab;
  transition: all 0.2s ease-in-out;
  flex-shrink: 0;
  .title {
    line-height: initial;
    padding-right: 10px;
    color: #a733e4;
    font-weight: 700;
    margin: 0;
    font-size: 14px;
  }
  .sub {
    line-height: initial;
    padding-right: 10px;
    color: #3f1168;
    margin: 0;
    span {
      font-weight: 700;
      font-size: 14px;
    }
  }
  .modules {
    font-size: 12px;
    margin: 0;
    ${(props) =>
      props.level == "Muy Fácil" &&
      css`
        color: #006ca8;
      `}
    ${(props) =>
      props.level == "Fácil" &&
      css`
        color: #8c5098;
      `}
      ${(props) =>
      props.level == "Intermedio" &&
      css`
        color: #ec7501;
      `}
    ${(props) =>
      props.level == "Avanzado" &&
      css`
        color: #149e62;
      `}
      ${(props) =>
      props.level == "Máster" &&
      css`
        color: #d22978;
      `}
  }
  .price {
    margin: 0;
    font-size: 14px;
    font-weight: 600;
    color: #12a071;
  }
  .level-container {
    display: flex;
    gap: 5px;
    align-items: center;
    img {
      width: 17px !important;
    }
    p {
      margin: 0;
      font-size: 14px;
      font-weight: 600;
      letter-spacing: 2px;
    }
    ${(props) =>
      props.level == "Muy Fácil" &&
      css`
        color: #006ca8;
      `}
    ${(props) =>
      props.level == "Fácil" &&
      css`
        color: #8c5098;
      `}
      ${(props) =>
      props.level == "Intermedio" &&
      css`
        color: #ec7501;
      `}
    ${(props) =>
      props.level == "Avanzado" &&
      css`
        color: #149e62;
      `}
      ${(props) =>
      props.level == "Máster" &&
      css`
        color: #d22978;
      `}
  }
  &:hover {
    transform: scale(1.1);
    img {
      box-shadow: 5px 7px 11px -7px rgb(0 0 0 / 75%);
    }
  }
  @media only screen and (max-width: 992px) {
    &:hover {
      transform: scale(1);
    }
    &:active {
      transform: scale(1.02);
    }
  }
`;
export const Progress = styled.div`
  position: relative;
  bottom: 12px;
  display: flex;
  height: 12px;
  background: linear-gradient(135deg, #8e2de2 0%, #4a00e0 100%);
  border-radius: 0px 10px 10px 10px;
`;
export const Title = styled.h1`
  color: #3f1168;
  font-size: 24px;
  font-family: "Montserrat", sans-serif;
  margin: 0;
  padding-left: 60px;
  .span-additional {
    font-style: italic;
  }
  .span-title {
    color: #a733e4;
  }
  @media (max-width: 1023px) {
    padding-left: 30px;
    font-size: 24px;
  }
`;
export const ButtonContain = styled.div`
  display: flex;
  justify-content: center;
  margin-block: 40px;
  @media (max-width: 1023px) {
    margin-block: 20px;
  }
`;
export const PurpleButton = styled.button`
  font-size: 16px;
  font-family: "Montserrat", sans-serif;
  background-color: #6717cd;
  padding-block: 15px;
  padding-inline: 25px;
  color: #fff;
  border-radius: 30px;
  border: none;
  &:hover {
    background-color: #5000b5;
    transform: scale(1.03);
    transition: 0.5s ease all;
  }
  @media (max-width: 1023px) {
    bottom: 10px;
    font-size: 14px;
    padding-block: 10px;
    padding-inline: 20px;
  }
`;
export const ImageContent = styled.div`
  overflow: hidden;
  display: flex;
  position: relative;
  .band {
    background-image: url(../images/band.png);
    background-repeat: no-repeat;
    width: 140px;
    height: 110px;
    cursor: pointer;
    position: absolute;
    top: -10px;
    left: -20px;
    z-index: 1;
  }
  .play-icon {
    font-size: 55px;
    color: white;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  .days-left {
    display: flex;
    position: absolute;
    justify-content: center;
    font-family: "Montserrat", sans serif;
    transform: rotate(-40deg);
    color: white;
    top: 25px;
    left: 15px;
    z-index: 2;
  }
  @media (max-width: 1023px) {
    height: auto;
    .band {
      background-image: none;
      top: -33px;
      left: 0;
      width: 27px;
      rotate: 45deg;
      background: #6717cd;
    }
    .days-left {
      top: 8px;
      left: 0px;
      z-index: 2;
      font-size: 12px;
    }
    .play-icon {
      font-size: 40px;
    }
  }
`;
export const Arrows = styled.div<{ side: string }>`
  display: flex;
  cursor: pointer;
  position: absolute;
  font-size: 45px;
  top: 30%;
  z-index: 10000;
  @media (max-width: 1023px) {
    display: none;
  }
  ${(props) =>
    props.side === "left" &&
    css`
      left: 10px;
    `}
  ${(props) =>
    props.side === "right" &&
    css`
      right: 10px;
    `}
`;
