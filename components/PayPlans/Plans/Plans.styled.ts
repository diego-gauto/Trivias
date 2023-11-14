import styled from "styled-components";

export const PlanStyles = styled.div`
  height: 100%;
  h3 {
    font-size: calc(1.1rem + 1.5vw);
  }
  .planes {
    --purple-pink: #cb5cc0;
    --blue: #6b77f5;
    --green: #149e62;
    --purple-pink2: #b746cd;
    --purple: #3f1168;
    .colors {
      display: flex;
      justify-content: space-between;
      .col-lg-3 {
        width: 33%;
      }
      .back {
        background-color: #ece7f2;
        height: 100%;
      }
      .break {
        background-color: #dad3e5;
        height: 100%;
      }
      .purple-pink {
        color: var(--purple-pink);
      }
      .blue {
        color: #6b77f5;
      }
      .green {
        color: #149e62;
      }
      .purple-pink2 {
        color: #b746cd;
      }
      .purple {
        color: #3f1168;
      }
      .Back-p-pink {
        background-color: var(--purple-pink);
      }
      .Back-blue {
        background-color: #6b77f5;
      }
      .Back-green {
        background-color: #149e62;
      }
      .Back-p-pink2 {
        background-color: #b746cd;
      }
    }
    span {
      font-weight: 500;
      color: #3f1168;
      font-size: small;
    }
    .special-plan {
      background: linear-gradient(to right, #8825e1 0%, #af39cd 100%);
      position: relative;
      .more-popular {
        background-color: white;
        padding-block: 8px;
        padding-inline: 12px;
        display: flex;
        align-items: center;
        gap: 5px;
        position: absolute;
        border-radius: 100px;
        right: 20px;
        top: -20px;
        svg {
          color: #8825e1;
        }
        .text {
          color: #8825e1;
          font-weight: 600;
          margin: 0;
        }
      }
      .b-white {
        border-bottom: 1px solid #e6e6e6;
      }
      .b-white-2 {
        border-top: 1px solid #e6e6e6;
      }
      .white {
        color: #fff !important;
      }
      .white-button {
        padding-block: 10px;
        padding-inline: 25px;
        border: none;
        border-radius: 100px;
        line-height: 18px;
        color: #8825e1;
        font-weight: 500;
        background-color: #fff;
      }
      .black-background {
        background-color: #00000047;
      }
      .back-white {
        background-color: #fff;
      }
      .tip-icon-special {
        color: #8825e1;
        min-width: 20px;
        min-height: 20px;
        align-self: center;
        border-radius: 100%;
      }
    }
    .size-sm {
      font-size: 20px;
    }
    .plan-container {
      box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.2);
      border-radius: 14px;
      padding-bottom: 15px;
      .header {
        .top-tab {
          border-radius: 14px 14px 0px 0px;
          width: 100%;
          height: 20px;
        }
        .text-center {
          .save {
            color: #3f1168;
            font-size: 14px;
            font-weight: 600;
          }
        }
        .tit-contain {
          margin-top: 7px !important;
        }
        .title {
          img {
            self-align: center;
            height: 100%;
          }
          display: flex;
          justify-content: center;
        }
        .b-p-pink {
          border-bottom: 1px solid #cb5cc0;
        }
        .b-blue {
          border-bottom: 1px solid var(--blue);
        }
        .b-green {
          border-bottom: 1px solid var(--green);
        }
        .b-p-pink2 {
          border-bottom: 1px solid var(--purple-pink2);
        }
        .purple-button {
          padding-block: 10px;
          padding-inline: 25px;
          line-height: 18px;
          border: none;
          border-radius: 100px;
          color: #ffffff;
          background-color: #3f1168;
        }
      }

      .main-body {
        display: flex;
        flex-direction: column;
        justify-content: center;
        .text-center {
          font-size: 14px;
          i {
            cursor: pointer;
            &:hover {
              opacity: 0.6;
            }
          }
        }
        .tip {
          cursor: pointer;
          font-size: small;
          padding: 15px;
          border-radius: 14px;
          position: relative;
          .new-item {
            position: absolute;
            border: 2px solid #3f1168;
            padding-inline: 5px;
            padding-block: 2px;
            border-radius: 8px;
            top: -10px;
            max-height: 25px;
            .text {
              color: #3f1168;
              margin: 0;
              font-size: 12px;
            }
          }
          .special {
            border: 2px solid #fff;
            .text {
              color: #fff;
            }
          }
          .special-back {
            background: #671ca6;
          }
          .just {
            text-align: justify;
          }
          .tip-q {
            align-items: center;
            display: flex;
            justify-content: space-between;
          }
          .tip-icon {
            color: #ffffff;
            min-width: 20px;
            min-height: 20px;
            align-self: center;
            border-radius: 100%;
          }
          .b-p-pink {
            border-top: 1px solid #cb5cc0;
          }
          .b-blue {
            border-top: 1px solid var(--blue);
          }
          .b-green {
            border-top: 1px solid var(--green);
          }
          .b-p-pink2 {
            border-top: 1px solid var(--purple-pink2);
          }
        }
      }
    }
  }
  @media (max-width: 991px) {
    .planes {
      .col-lg-3 {
        width: 50% !important;
      }
    }
  }
  @media (max-width: 600px) {
    .planes {
      .col-lg-3 {
        width: 100% !important;
      }
    }
  }
`;
