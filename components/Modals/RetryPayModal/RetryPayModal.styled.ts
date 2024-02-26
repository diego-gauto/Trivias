import { Modal } from "react-bootstrap";
import styled from "styled-components";

export const ModalContainer = styled(Modal)`
  padding-right: 0px !important;
  padding-left: 0px !important;
  .modal-content {
    width: 80%;
    margin-left: auto;
    margin-right: auto;
  }
`;
export const RetryPayModalContain = styled.div`
  display: flex;
  justify-content: center;
  padding: 30px;
  width: 100%;
  .close {
    position: absolute;
    top: 20px;
    right: 20px;
    font-size: 1.2rem;
    color: #3f1168;
    cursor: pointer;
    &:hover {
      opacity: 0.67;
    }
  }
  .data-contain {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 280px;
    text-align: left;
    .alert-icon {
      width: 50px;
      margin-bottom: 10px;
    }
  }
  p {
    margin: 0;
    color: #3f1168;
    font-weight: 500;
  }
  .bold {
    font-weight: 600;
  }
  .paragraph {
    margin-top: 10px;
  }
  button {
    margin-top: 15px;
    background-color: #9a1aff;
    border: none;
    border-radius: 100px;
    color: #fff;
    padding-block: 12px;
    font-size: 1rem;
    font-weight: 600;
    width: 100%;
    &:hover {
      opacity: 0.67;
    }
  }
`;
