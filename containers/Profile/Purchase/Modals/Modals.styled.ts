import { Modal } from 'react-bootstrap';
import styled from 'styled-components';

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
  font-family: 'Montserrat', sans-serif !important;
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
  button {
    margin-top: 10px;
    width: fit-content;
    margin-inline: auto;
    border: none;
    background: #c153ed;
    padding: 10px;
    border-radius: 10px;
    color: #fff;
  }
`;

export const SpeiContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 40px;
  background-color: #fff;
  font-family: 'Montserrat', sans-serif !important;
  text-align: center;
  p {
    margin: 0;
  }
  .top {
    display: flex;
    gap: 40px;
    align-items: center;
    img {
      width: auto;
      height: 30px;
    }
    p {
      margin: 0;
    }
    p.p30 {
      font-size: 30px;
      font-weight: 500;
    }
  }
  .box {
    border: 1px solid;
    padding-block: 5px;
    margin-inline: 20px;
  }
  p.p18-bold {
    font-size: 18px;
    font-weight: 500;
    text-align: start;
  }
  p.p16-bold {
    font-size: 14px;
    font-weight: 500;
    text-align: start;
    margin-top: 30px;
  }
  ol {
    li {
      width: fit-content;
      font-size: 12px;
      text-align: start;
      margin-bottom: 10px;
    }
  }
  .box-green {
    border: 2px solid #2cbb15;
    border-radius: 20px;
    padding: 15px;
    p {
      font-size: 14px;
      font-weight: 500;
      color: #2cbb15;
    }
  }
  button {
    margin-top: 10px;
    width: fit-content;
    margin-inline: auto;
    border: none;
    background: #c153ed;
    padding: 10px;
    border-radius: 10px;
    color: #fff;
  }
`;
