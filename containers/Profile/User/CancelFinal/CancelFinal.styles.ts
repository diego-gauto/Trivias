import styled from "styled-components";

export const CancelFin = styled.div`
  background-color: #ede7f2;
  padding: 4%;
  font-weight: 500;
  padding-right: 25%;
  position: relative;
  width: 100%;
  @media (max-width: 1023px) {
    padding-inline: 5%;
    .col-4 {
      display: flex;
      flex-direction: column;
      .form-check-label {
        white-space: nowrap;
      }
      .t-input {
        min-width: 200px;
      }
    }
    .buttons {
      button {
        min-width: 200px;
      }
    }
  }
  @media (max-width: 500px) {
    textarea {
      margin-left: 0 !important;
      width: 100% !important;
    }
    .buttons {
      display: flex;
      flex-direction: column;
      align-items: center;
      button {
        height: 41px;
      }
    }
  }
  h1 {
    font-weight: 800;
  }
  .dialog {
    padding: 15%;
    max-width: 55%;
    width: 100%;
    text-align: center;
    border-radius: 30px;
    z-index: 100;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #dad3e5;
    padding: 50px;
    box-shadow: 0px 12px 15px rgba(0, 0, 0, 0.5);
    .sangria {
      margin-left: 15%;
      margin-right: 15%;
    }
    .sangria-y {
      margin-top: 5%;
      margin-bottom: 5%;
    }
    .purple {
      color: #a556eb;
    }
    .green {
      color: #29c784;
    }
    .blue {
      color: #1b7beb;
    }
    .orange {
      color: #f88114;
    }
    ul {
      margin-left: 12%;
      margin-right: 12%;
      text-align: justify;
    }
    .p-li {
      list-style: none;
      margin-top: 15px;
      margin-bottom: 15px;
      font-size: medium;
    }
  }
  .dimScreen {
    z-index: 99;
    position: fixed;
    padding: 0;
    margin: 0;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(222, 215, 232, 0.5);
  }
  .space-bt {
    display: flex;
    align-items: center;
    img {
      width: 25px;
      height: 25px;
      margin-right: 15px;
    }
  }
  .exit {
    position: absolute;
    right: 0;
    padding-right: 5%;
    .ex-icon {
      cursor: pointer;
    }
  }
  .under {
    z-index: 0;
    position: absolute;
    right: 0;
    bottom: 0;
    width: 40%;
    max-width: 600px;
  }
  .w-80 {
    width: 80%;
  }
  .checkboxgroup {
    display: inline-block;
    text-align: center;
  }
  .checkboxgroup label {
    display: block;
  }
  .t-area {
    border-radius: 50px;
    padding: 10px 0;
    padding-left: 20px;
    padding-top: 30px;
    text-align: justify;
    resize: none;
    height: fit-content;
    border-color: #d7d8df;
  }
  .t-area:focus {
    outline: 1px solid #3f1168;
  }
  .t-area:focus::placeholder {
    color: transparent;
  }
  .t-input {
    border-radius: 30px;
    text-align: justify;
    border: none;
  }
  .p-radio {
    background-color: #dad3e5;
    border-color: #c094e6;
    accent-color: #c094e6 !important;
  }
  .sangria-menor {
    marging-left: 10%;
    margin-right: 10%;
  }
  .input-other {
    padding-left: 20px;
  }
  .input-other:focus {
    outline: 1px solid #3f1168;
  }
  .buttons {
    display: flex;
    gap: 15px;
    justify-content: flex-start;
    button {
      line-heigth: 90%;
      font-weight: 500;
      font-size: small;
      width: 25%;
      border: none;
      padding-inline: 50px;
      border-radius: 30px;
      color: #fff;
      &:hover {
        opacity: 0.5;
      }
    }
    .btn-link {
      text-decoration: none;
      color: #478ee1;
      padding-inline: 20px;
    }
    .left {
      color: black;
      background: #dad3e5;
    }
    .right {
      background: #478ee1;
    }
  }
  .purple {
    color: #a556eb;
  }
  .purple-dark {
    color: #3f1168;
  }
  @media (max-width: 1023px) {
    .under {
      display: none;
    }
  }
`;
