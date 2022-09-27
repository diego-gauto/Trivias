import { Modal } from "react-bootstrap";

import styled from "styled-components";

export const RewardModalContainer = styled(Modal)`
  @font-face{
    font-family:Montserrat;
    src:url(../fonts/Montserrat-VariableFont_wght.ttf);
  }
  .modal-header {
    font-family:Montserrat;
    border-bottom: 0px;
  }
  .btn-close {
    opacity: 1;
  }
  .modal-title{
    font-size: 18px;
  }
  .modal-body {
    font-family: Raleway;
  }
  .about {
    font-size: 14px;
  }
  .warning {
    color: #6717CD;
    font-weight: 700;
    font-size: 14px;
  }
  .admin-copy {
    font-size: 14px;
    font-weight: 700;
  }
  .btn {
    font-family: 'Montserrat';
    align-items: center;
    padding: 15px 25px;
    gap: 10px;
    border: 0px;
    border-radius: 100px;
  }
  .claim-btn {
    border: 1px solid #6717CD;
    background: #FFFFFF;
    color: #6717CD; 
    margin-right: 10px;
    margin-bottom: 10px;
  }
  .close-btn {
    background: #6717CD;
  }
  .points {
    font-family: 'Montserrat';
    color: #6717CD;
    font-size: 16px;
    font-weight: 600;
  }
  .center {
    text-align: center;
  }
  .div-button {
    text-align: right;
  }
  .div-button span {
    font-weight: 600;
    font-size: 14px;
    margin-right: 10px;
  }
  @media(max-width: 992px) {
    .div-button {
      text-align: center;
    }
  }
`;

export const AlertIcon = styled.label`
  background-image: url(../images/ExIcon.svg);
  background-repeat: no-repeat;
  width: 20px;
  height: 20px;
  margin-right: 7.25px;
  @media(max-width: 870px) {
    width: 20px;
    height: 19.5px;
  }
`;