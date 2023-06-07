import { Card } from "react-bootstrap";
import styled from "styled-components";

export const CardContainer = styled(Card)`
  background: #ede7f2;
  border: 0;
  border-radius: 0;
  color: #fff;
  font-family: "Montserrat", sans-seriff;
  .course-container {
    display: flex;
    justify-content: space-between;
    @media only screen and (max-width: 1140px) {
      flex-direction: column;
      gap: 0;
      align-items: center;
      text-align: center;
    }
    .info {
      padding-left: 80px;
      padding-block: 100px;
      display: flex;
      flex-direction: column;
      gap: 30px;
      flex: 0 35%;
      @media only screen and (max-width: 1140px) {
        padding-left: 0;
        .top {
          padding: 15px;
          justify-content: center;
          button {
            font-size: 14px !important;
            margin-left: 0 !important;
          }
        }
        .middle {
          h3 {
            font-size: 32px !important;
            font-weight: 600;
          }
          p {
            font-size: 20px !important;
          }
        }
      }
      p,
      h1 {
        margin: 0;
      }

      .top {
        display: flex;
        gap: 10px;
        align-items: center;
        p {
          color: #3f1168;
          font-size: 25px;
          font-weight: 500;
        }
        button {
          margin-left: 40px;
          border: 1.5px solid #3f1168;
          background: none;
          border-radius: 20px;
          @media only screen and (max-width: 1366px) {
            font-size: 14px;
            width: max-content;
            margin-left: 20px;
          }
        }
      }

      .middle {
        h3 {
          color: #3f1168;
          font-size: 32px;
          font-weight: 600;
          span {
            color: #a733e4;
          }
        }
        p {
          padding-top: 10px;
          color: #3f1168;
          font-size: 18px;
          line-height: initial;
        }
      }
      .price {
        font-size: 28px;
        color: #ff9b00;
        span {
          font-size: 20px;
          font-weight: 400;
        }
      }
    }
  }
  .video video::-webkit-media-controls-start-playback-button {
    display: none;
  }
  .video {
    position: relative;
    flex: 1;
  }
  .video iframe {
    display: block;
    z-index: 1;
  }
  video {
    object-fit: cover;
    height: 100%;
  }
  // .video::before {
  //   content: "";
  //   position: absolute;
  //   z-index: 0;
  //   top: 0;
  //   right: 0;
  //   bottom: 0;
  //   left: 0;
  // }
  .row {
    bottom: 50px;
    width: 100%;
    position: absolute;
    left: 40px;
    @media only screen and (max-width: 1140px) {
      position: initial;
      margin: auto;
      .second-col {
        gap: 0;
        width: auto;
        flex-direction: row;
        justify-content: center;
      }
    }
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
  .second-col {
    gap: 20px;
    display: flex;
    flex-direction: column;
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
