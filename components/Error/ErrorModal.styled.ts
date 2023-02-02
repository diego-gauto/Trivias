import { Modal } from "react-bootstrap";
import styled from "styled-components";

export const ModalContainer = styled(Modal)`
  @font-face {
    font-family: Montserrat;
    src: url(../fonts/Montserrat-VariableFont_wght.ttf);
  }
  @font-face {
    font-family: Raleway;
    src: url(../fonts/Raleway-VariableFont_wght.ttf);
  }
  .modal-content {
    border-radius: 12px !important;
  }
  @media (min-width: 992px) {
    .modal-lg,
    .modal-xl {
      --bs-modal-width: 66%;
    }
  }
`;
export const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  gap: 10px;
  padding: 20px;
  font-family: Montserrat, sans-serif;
  .close {
    width: 40px;
    height: 40px;
    background-color: #391864;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: -22px;
    button {
      opacity: 1;
      width: 10px;
      &:hover {
        opacity: 0.5;
      }
    }
  }
  .title {
    p {
      font-size: 26px;
      color: #3f1168;
      font-weight: 800;
      margin: 0;
      text-align: center;
      span {
        color: #bc3055;
      }
      @media (max-width: 600px) {
        font-size: 20px;
      }
    }
  }
  .error {
    p {
      font-size: 18px;
      color: #3f1168;
      font-weight: 600;
      text-align: center;
      margin: 0;
      @media (max-width: 600px) {
        font-size: 14px;
      }
    }
  }
`;
