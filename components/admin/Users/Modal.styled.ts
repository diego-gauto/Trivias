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

export const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 20px;
  .title {
    display: flex;
    p {
      font-size: 30px;
      font-weight: bold;
      margin: 0;
    }
  }
  .form-inputs {
    display: flex;
    flex-direction: column;
    gap: 30px;
    .column {
      display: flex;
      gap: 20px;
      width: 100%;
      .input {
        display: flex;
        flex-direction: column;
        gap: 5px;
        width: 45%;
        label {
          font-size: 20px;
          font-weight: bold;
          margin: 0;
        }
        input {
          font-size: 16px;
          padding: 10px;
        }
      }
    }
  }
  .button-contain {
    display: flex;
    justify-content: center;
    margin-top: 20px;
    button {
      font-size: 16px;
      font-family: 'Montserrat', sans-serif;
      background: #6717cd;
      color: white;
      padding-block: 10px;
      padding-inline: 30px;
      border-radius: 100px;
      border: none;
      &:hover {
        background-color: #5000b5;
        transform: scale(1.03);
        transition: 0.5s ease all;
      }
    }
  }
`;
