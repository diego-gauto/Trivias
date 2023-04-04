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
  span {
    color: #a733e4;
  }
  @media (max-width: 1023px) {
    padding-left: 30px;
    font-size: 24px;
  }
`;
