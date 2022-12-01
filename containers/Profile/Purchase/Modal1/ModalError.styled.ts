import { ModalHeader, ModalDialog } from "react-bootstrap";
import styled from "styled-components";

export const ModalContain = styled.div`
  @font-face {
    font-family: Montserrat;
    src: url(../fonts/Montserrat-VariableFont_wght.ttf);
  }
  @font-face {
    font-family: Raleway;
    src: url(../fonts/Raleway-VariableFont_wght.ttf);
  }
`;
export const Container = styled.div`
  display: flex;
  flex-direction: column;
  background: #ede7f2;
  border-radius: 40px !important;
  button {
    background: #3f1168;
    position: absolute;
    border: none;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    top: -20px;
    left: 50%;
    transform: translateX(-50%);
    color: white;
    font-size: 24px;
  }
  .bottom-section {
    background: #d2aff1;
    padding: 20px;
    padding-block: 40px;
    border-radius: 40px !important;
    h1 {
      font-size: 28px;
      font-weight: bold;
      color: #3f1168;
      border: none;
      padding: 0;
      span {
        color: #cc1854;
      }
      @media (max-width: 424px) {
        font-size: 20px;
      }
    }
    p {
      font-size: 17px;
      color: #3f1168;
      line-height: initial;
      text-align: center;
      margin: 0;
      span {
        color: #942ced;
        font-weight: bold;
      }
      .opacity {
        color: inherit;
        opacity: 0.5;
      }
    }
  }
  .top-section {
    padding: 20px;
    padding-block: 40px;
    border-radius: 40px !important;
    h1 {
      text-align: center;
      font-size: 37px;
      font-weight: bold;
      color: #3f1168;
      border: none;
      padding: 0;
      span {
        color: #cc1854;
      }
      @media (max-width: 424px) {
        font-size: 20px;
      }
    }
    p {
      font-size: 17px;
      color: #3f1168;
      line-height: initial;
      text-align: center;
      margin: 0;
      span {
        color: #942ced;
        font-weight: bold;
      }
      .opacity {
        font-weight: 400;
        color: inherit;
        opacity: 0.5;
      }
    }
  }
  @media (max-width: 424px) {
    gap: 20px;
  }
`;
export const ButtonsDiv = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
`;
export const ButtonsDiv2 = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 20px;
`;
export const PurpleButton = styled.button`
  background-color: #6717cd;
  color: #fff;
  border-radius: 30px;
  padding-block: 15px;
  padding-inline: 25px;
  border: none;
  &:hover {
    background-color: #5000b5;
    transform: scale(1.03);
    transition: 0.5s ease all;
  }
  @media (max-width: 424px) {
    font-size: 14px;
    padding-block: 10px;
    padding-inline: 15px;
  }
`;
export const TransparentButton = styled.button`
  background: white;
  color: #6717cd;
  border-radius: 30px;
  padding-block: 15px;
  padding-inline: 25px;
  border: 1px solid #6717cd;
  &:hover {
    transform: scale(1.03);
    transition: 0.5s ease all;
  }
  @media (max-width: 424px) {
    font-size: 14px;
    padding-block: 10px;
    padding-inline: 15px;
  }
`;
