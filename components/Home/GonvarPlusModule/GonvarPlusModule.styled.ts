import { Card } from "react-bootstrap";
import styled from "styled-components";

export const CardContainer = styled(Card)`
  border: 0;
  border-radius: 0;
  color: #fff;
  font-family: "Montserrat", sans-seriff;
  .video video::-webkit-media-controls-start-playback-button {
    display: none;
  }
  .video {
    position: relative;
  }
  .video iframe {
    display: block;
    z-index: 1;
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
  }
  .new-btn {
    background: transparent;
    color: #fff;
    border: 1px solid #fff;
    padding: 4px 18px;
    border-radius: 10px;
    font-size: 14px;
    margin-bottom: 10px;
  }
  .card-title {
    font-size: 36px;
    font-weight: 400;
    margin-bottom: 20px;
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
    padding-left: 150px;
  }
  button:first-of-type {
    margin-right: 10px;
  }
  .price,
  .mobile-price {
    font-size: 24px;
    font-weight: 700;
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
