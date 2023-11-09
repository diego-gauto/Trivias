import { Card } from "react-bootstrap";
import styled from "styled-components";

export const CardContainer = styled(Card)`
  background: #ede7f2;
  border: 0;
  border-radius: 0;
  color: #ede7f2;
  font-family: "Montserrat", sans-seriff;
  .video {
    position: relative;
  }
  .video iframe {
    display: block;
    z-index: 1;
  }
  .text-logo {
    margin: 0;
    margin-top: 10px;
    font-weight: 500;
  }
  video {
    object-fit: cover;
  }
  .video::before {
    content: "";
    position: absolute;
    z-index: 0;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }
  .row {
    bottom: 50px;
    width: 100%;
    position: absolute;
    @media only screen and (max-width: 1140px) {
      margin: auto;
      text-align: center;
      .first-col,
      .second-col {
        padding: 0;
      }
    }
  }
  .new-btn {
    background: linear-gradient(135deg, #952ced 0%, #ca41d4 100%);
    color: #ede7f2;
    border: none;
    padding: 7px 18px;
    border-radius: 12px;
    font-size: 14px;
    margin-bottom: 20px;
    cursor: default;
    font-weight: 500;
    span {
      font-weight: 300;
    }
  }
  .card-title {
    font-size: 36px;
    font-weight: 600;
    margin-bottom: 0px;
  }
  .card-subtitle {
    font-size: 24px;
    font-weight: 300;
    margin-bottom: 20px;
    text-overflow: ellipsis;
    word-wrap: break-word;
    overflow: hidden;
    max-height: 3.6em;
    line-height: 1.3em;
  }
  .first-col {
    padding-left: 80px;
    .level {
      width: fit-content;
      position: relative;
      bottom: 0px;
      margin-bottom: 20px;
      flex-wrap: nowrap;
    }
  }
  .second-col {
    align-self: center;
    padding-top: 30px;
    text-align: center;
  }
  button:first-of-type {
    margin-right: 10px;
  }
  .price,
  .mobile-price {
    color: #ff9b00;
    font-size: 24px;
    font-weight: 700;
    span {
      color: #ede7f2;
    }
    .lower {
      font-size: 18px;
      font-weight: 300;
    }
  }
  .mobile-price {
    margin-top: 20px;
    padding-left: 50px;
  }
  @media only screen and (max-width: 784px) {
    .card-title {
      font-size: 26px;
    }
    .card-subtitle {
      font-size: 16px;
    }
    .price {
      font-size: 20px;
    }
    .row {
      bottom: 50px;
    }
    .first-col,
    .second-col {
      padding-left: 50px;
      button {
        width: 170px;
      }
    }
    .video::before {
      content: "";
      position: absolute;
      z-index: 0;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
    }
  }
`;
