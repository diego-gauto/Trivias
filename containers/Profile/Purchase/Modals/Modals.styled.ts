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

export const OxxoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  padding: 40px;
  background-color: #fff;
  font-family: "Montserrat", sans-serif !important;
  text-align: center;

  h3 {
    font-weight: 400;
    font-size: 30px;
  }
  span {
    font-weight: bold;
  }
  p.p10 {
    font-size: 10px;
    color: #212121;
    font-style: italic;
    margin: 0;
  }
  p.p12 {
    font-size: 12px;
    margin: 0;
  }
  p.p18 {
    font-size: 24px;
    font-weight: 500;
    margin: 0;
  }
  p.p12-bold {
    font-size: 12px;
    font-weight: 500;
    margin: 0;
  }
`;
