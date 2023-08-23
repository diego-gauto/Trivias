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

export const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  padding: 20px;
  background-color: #ede7f2;
  border-radius: 12px;
  p {
    font-size: 18px;
    color: #3f1168;
    font-weight: 600;
    text-align: center;
  }
  .p14 {
    text-align: start;
    font-size: 14px;
    font-weight: 500;
  }
  .p14-bold {
    font-size: 14px;
  }
  button {
    padding: 5px;
    border: none;
    border-radius: 20px;
    background-color: #3f1168;
    color: #ffffff;
  }
  .new-card {
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 15px;
    padding-block: 30px;
    padding-inline: 25px;
    background-color: #942ced;
    border-radius: 20px;
    @media (max-width: 1260px) {
      padding: 20px;
    }
    .button-contain {
      display: flex;
      justify-content: center;
      button {
        font-size: 16px;
        font-weight: bold;
        color: #942ced;
        border-radius: 100px;
        padding-block: 5px;
        padding-inline: 30px;
        border: none;
        &:hover {
          transform: scale(1.03);
          transition: 1s ease all;
        }
        @media (max-width: 700px) {
          font-size: 14px;
        }
      }
    }
    .main-title {
      font-size: 16px;
      color: #ffdd69;
      span {
        font-weight: 600;
      }
      @media (max-width: 700px) {
        font-size: 14px;
      }
    }
    .container-2 {
      display: flex;
      flex-direction: column;
      gap: 10px;
      p {
        color: white;
        font-weight: 600;
      }
      input {
        width: 100%;
        border-radius: 100px;
        border: 1px solid white;
        background: transparent;
        color: white;
        padding-block: 5px;
        padding-inline: 20px;
        :focus {
          outline: none;
          border: 2px solid white;
          border-radius: 100px;
        }
        ::placeholder {
          /* Chrome, Firefox, Opera, Safari 10.1+ */
          color: white;
          opacity: 0.7;
        }
      }
      .card-input {
        width: 100%;
        display: flex;
        flex-direction: column;
        gap: 10px;
        p {
          text-align: start;
          margin: 0;
        }
        @media (max-width: 700px) {
          font-size: 14px;
        }
        @media (max-width: 480px) {
          font-size: 12;
        }
      }
      .info {
        display: flex;
        justify-content: space-between;
        .date {
          display: flex;
          flex-direction: column;
          gap: 10px;
          @media (max-width: 700px) {
            font-size: 14px;
          }
          @media (max-width: 480px) {
            font-size: 12px;
          }
          .inputs {
            display: flex;
            gap: 20px;
            @media (max-width: 480px) {
              gap: 10px;
            }
          }
        }
        .date-inputs {
          width: 90px;
          @media (max-width: 480px) {
            width: 70px;
          }
        }
      }
    }
  }
`;
