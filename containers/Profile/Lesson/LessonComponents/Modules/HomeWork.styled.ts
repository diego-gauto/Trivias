import styled, { css } from 'styled-components';

export const HomeWorkContain = styled.div`
  display: flex;
  gap: 2%;
  .complete-hw {
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 10px;
    .reason {
      font-weight: 700;
      color: #3f1168;
    }
    .homework {
      margin-top: 20px;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 10px;
      justify-content: flex-start;
      font-weight: 500;
      color: #8e2de2;
      width: fit-content;
      padding-inline: 30px;
      padding-block: 8px;
      border: 1px solid #8e2de2;
      border-radius: 100px;
      svg {
        font-size: 22px;
      }
      &:hover {
        transform: scale(1.03);
        transition: 0.5s ease all;
      }
    }
    .quill-hw {
      p {
        margin: 0;
      }
    }
  }
  .left {
    width: 48%;
  }
  .middle {
    background: #d4cedc;
    width: 1.5px;
    height: 100%;
  }
  .quiz {
    width: 100%;
    p {
      margin: 0;
    }
    .quiz-info {
      display: flex;
      flex-direction: column;
      gap: 40px;
      padding-inline: 40px;
      padding-block: 20px;
      @media (max-width: 500px) {
        padding-inline: 0px;
      }
      .top {
        display: flex;
        justify-content: space-between;
        @media (max-width: 500px) {
          flex-direction: column;
          align-items: center;
          gap: 20px;
          margin-bottom: 20px;
        }
        .title {
          font-size: 28px;
          font-weight: 700;
          text-transform: uppercase;
        }
        .circle {
          border: 5px solid #8527e1;
          border-radius: 50%;
          width: 144px;
          height: 144px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          background: linear-gradient(180deg, #6818ce 0%, #8d2de2 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          text-fill-color: transparent;
          .points {
            font-weight: 700;
            font-size: 64px;
            line-height: normal;
          }
          .sub {
            font-weight: 400;
            font-size: 14px;
          }
        }
      }

      .bottom {
        display: flex;
        flex-direction: column;
        gap: 50px;
        button {
          display: flex;
          gap: 15px;
          align-items: center;
          background: linear-gradient(270deg, #8527e1 0.52%, #8627e2 100%);
          border-radius: 20px;
          color: #ffffff;
          margin: auto;
          border: none;
          padding: 7px 35px;
          text-transform: uppercase;
          font-weight: 500;
          height: 45px;
          svg {
            font-size: 22px;
          }
        }
        .quiz-bar-container {
          display: flex;
          gap: 40px;
          @media (max-width: 500px) {
            gap: 20px;
          }
          .quiz-bar {
            position: relative;
            flex: 1;
            background: linear-gradient(270deg, #d0b1ee 0.52%, #d7beef 100%);
            border-radius: 20px;
            height: 45px;
            color: #8628e2;
            font-weight: 700;
            font-size: 14px;
            .quiz-bar-progress {
              position: relative;
              height: 100%;
              background: rgba(130, 0, 255, 0.53);
              border-radius: 20px;
              .line {
                position: absolute;
                height: 100%;
                right: 0;
                border-right: 3px dashed #a754f7;
                top: -50%;
                p {
                  position: absolute;
                  top: -25px;
                  width: max-content;
                  transform: translateX(-50%);
                }
              }
            }
            .passing-grade {
              z-index: 2;
              width: max-content;
              display: flex;
              gap: 10px;
              position: absolute;
              left: 0;
              top: 50%;
              transform: translateY(-50%);
              height: 100%;
              p {
                align-self: center;
              }
              .line {
                position: relative;
                border-left: 3px dashed #ffb800;
                .minimum {
                  color: #ffb800;
                  position: absolute;
                  bottom: -22px;
                  transform: translateX(-50%);
                }
              }
            }
          }
          .quiz-bar-points {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 104px;
            background: rgba(171, 85, 255, 0.24);
            border-radius: 20px;
            font-weight: 700;
            font-size: 14px;
            color: #a855f7;
          }
        }
      }
    }
    .question-container {
      display: flex;
      flex-direction: column;
      gap: 10px;
      padding-inline: 20px;
      @media (max-width: 500px) {
        padding-inline: 0px;
      }
      button {
        background: linear-gradient(270deg, #8527e1 0.52%, #8627e2 100%);
        border-radius: 20px;
        border: none;
        color: #fff;
        margin: auto;
        width: 145px;
        height: 45px;
      }
      .question-bar {
        background: rgba(171, 85, 255, 0.24);
        height: 16px;
        width: 100%;
        border-radius: 15px;
        .progress {
          transition: 1s ease all;
          background: linear-gradient(270deg, #8527e1 0.52%, #8627e2 100%);
          border-radius: 15px;
          height: 100%;
          width: 0;
        }
      }
      .question-title {
        display: flex;
        gap: 10px;
        justify-content: space-between;
        padding: 10px 30px;
        flex-wrap: wrap;
        @media (max-width: 500px) {
          padding-inline: 0px;
        }
        .title {
          word-break: break-all;
          font-weight: 700;
          font-size: 28px;
        }
        .grade {
          display: flex;
          gap: 10px;
          align-items: center;
          color: #c293eb;
          font-weight: 600;
          .circle {
            border: 4px solid #c293eb;
            width: 39px;
            height: 39px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
          }
        }
      }
      .answers {
        display: grid;
        grid-template-columns: auto auto;
        gap: 20px;
        padding-inline: 30px;
        @media (max-width: 1000px) {
          grid-template: none;
        }
        @media (max-width: 500px) {
          padding-inline: 0px;
        }
      }
    }
    .done-container {
      display: flex;
      flex-direction: column;
      gap: 30px;
      padding-inline: 20px;
      @media (max-width: 500px) {
        padding-inline: 0px;
      }
      button {
        display: flex;
        align-items: center;
        background: linear-gradient(270deg, #8527e1 0.52%, #8627e2 100%);
        border-radius: 20px;
        color: #ffffff;
        margin: 20px auto;
        border: none;
        padding: 7px 35px;
        text-transform: uppercase;
        font-weight: 500;
        height: 45px;
      }
      .bar {
        background: rgba(171, 85, 255, 0.24);
        height: 16px;
        width: 100%;
        border-radius: 15px;
        .progress {
          transition: 1s ease all;
          background: linear-gradient(270deg, #8527e1 0.52%, #8627e2 100%);
          border-radius: 15px;
          height: 100%;
          width: 0;
        }
      }
      .quiz-results {
        padding-inline: 60px;
        display: flex;
        justify-content: space-between;
        @media (max-width: 820px) {
          padding-inline: 0px;
          flex-wrap: wrap;
          gap: 10px;
        }
        .left {
          font-weight: 400;
          font-size: 20px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          .title {
            font-weight: 700;
            font-size: 28px;
          }
        }
        .right {
          background: #e7ceff;
          border-radius: 20px;
          width: max-content;
          justify-content: space-between;
          padding: 14px 23px;
          color: #a855f7;
          font-weight: 600;
          font-size: 20px;
          .porcent {
            font-weight: 800;
            font-size: 36px;
            line-height: initial;
          }
        }
      }
      .quiz-bar-container {
        display: flex;
        gap: 40px;
        margin-top: 40px;
        padding-inline: 60px;
        @media (max-width: 820px) {
          padding-inline: 0px;
          gap: 20px;
        }
        .quiz-bar {
          position: relative;
          flex: 1;
          background: linear-gradient(270deg, #d0b1ee 0.52%, #d7beef 100%);
          border-radius: 20px;
          height: 45px;
          color: #8628e2;
          font-weight: 700;
          font-size: 14px;
          .quiz-bar-progress {
            position: relative;
            height: 100%;
            background: rgba(130, 0, 255, 0.53);
            border-radius: 20px;
            .line {
              position: absolute;
              height: 100%;
              right: 0;
              border-right: 3px dashed #a754f7;
              top: -50%;
              p {
                position: absolute;
                top: -25px;
                width: max-content;
                transform: translateX(-50%);
              }
            }
          }
          .passing-grade {
            z-index: 2;
            width: max-content;
            display: flex;
            gap: 10px;
            position: absolute;
            left: 0;
            top: 50%;
            transform: translateY(-50%);
            height: 100%;
            p {
              align-self: center;
            }
            .line {
              position: relative;
              border-left: 3px dashed #ffb800;
              .minimum {
                color: #ffb800;
                position: absolute;
                bottom: -22px;
                transform: translateX(-50%);
              }
            }
          }
        }
        .quiz-bar-points {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 104px;
          background: rgba(171, 85, 255, 0.24);
          border-radius: 20px;
          font-weight: 700;
          font-size: 14px;
          color: #a855f7;
        }
      }
    }
  }
  .right {
    width: 48%;
    display: flex;
    flex-direction: column;
    gap: 20px;
    .upload-info {
      .title {
        font-weight: 600;
        b {
          color: rgb(247, 136, 3);
        }
      }
      p {
        color: #3f1168;
        margin: 0;
      }
      .files {
        display: flex;
        justify-content: space-between;
        .line {
          width: 1px;
          height: auto;
          background: #8e2de2;
        }
      }
    }
    .line {
      width: 100%;
      height: 1.5px;
      background: #d4cedc;
    }
    .upload-container {
      p {
        margin: 0;
        font-weight: 600;
        color: #3f1168;
        span {
          font-weight: 500;
        }
      }
      .homework {
        margin-top: 20px;
        cursor: pointer;
        display: flex;
        align-items: center;
        gap: 10px;
        justify-content: flex-start;
        font-weight: 500;
        opacity: 0.7;
        color: #8e5fc1;
        svg {
          font-size: 22px;
        }
        &:hover {
          opacity: 1;
          color: #8e2de2;
          font-weight: 600;
          transition: 0.5s ease all;
        }
      }
    }
  }
  ol {
    margin-top: 20px;
    padding-left: 1.5rem;
  }
  @media (max-width: 1124px) {
    flex-direction: column;
    .left {
      width: 100%;
    }
    .middle {
      width: 100%;
      height: 1.5px;
    }
    .right {
      width: 100%;
      padding: 0;
      padding-top: 40px;
    }
  }
`;

export const Answer = styled.div<{
  veryfy: boolean;
  correct: boolean;
}>`
  display: flex;
  align-items: center;
  gap: 15px;
  background: linear-gradient(270deg, #d0b1ee 0.52%, #d7beef 100%);
  border-radius: 20px;
  color: #8100f0;
  height: 45px;
  border: none;
  cursor: pointer;
  .left {
    height: 100%;
    width: 45px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(171, 85, 255, 0.24);
    border-radius: 20px;
  }
  // &:hover {
  //   background: black !important;
  //   color: white !important;
  // }
  ${(props) =>
    props.veryfy &&
    props.correct &&
    css`
      background: linear-gradient(
        270deg,
        #b1eeb3 0.52%,
        #d8ffcb 100%
      ) !important;
      color: #00be35 !important;
      .left {
        background: rgba(109, 255, 85, 0.24) !important;
      }
    `}
  ${(props) =>
    props.veryfy &&
    !props.correct &&
    css`
      background: linear-gradient(
        270deg,
        #f69898 0.52%,
        #ffbfbf 100%
      ) !important;
      color: #f00000 !important;
    `}
`;

export const TaskTitle = styled.p`
  font-size: 18px;
  font-weight: 600;
  color: #f8a44c;
  margin: 0;
  line-height: normal;
  span {
    font-weight: 500;
  }
  @media (max-width: 1023px) {
    font-size: 14px;
  }
`;
export const TaskText = styled.p`
  font-size: 14px;
  font-family: 'Raleway', sans-serif;
  margin: 0;
  text-align: justify;
  @media (max-width: 1023px) {
    font-size: 12px;
  }
`;
export const ButtonDiv = styled.div`
  display: flex;
  justify-content: center;
`;
export const ReviewButton = styled.button`
  cursor: auto !important;
  display: flex;
  gap: 10px;
  font-family: 'Montserrat', sans-serif;
  font-size: 16px;
  font-weight: 600;
  padding-block: 15px;
  padding-inline: 25px;
  background: transparent;
  color: #6717cd;
  border: none;
  @media (max-width: 1023px) {
    display: none;
  }
`;
export const UploadButton = styled.button`
  display: flex;
  gap: 10px;
  font-family: 'Montserrat', sans-serif;
  font-size: 16px;
  font-weight: 600;
  padding-block: 15px;
  padding-inline: 25px;
  background: transparent;
  color: #6717cd;
  border-radius: 30px;
  border: 1px solid #6717cd;
  &:hover {
    transform: scale(1.03);
    transition: 0.5s ease all;
  }
  @media (max-width: 1023px) {
    display: none;
  }
`;
export const UploadIcon = styled.i`
  background-image: url(../images/Video/HomeWork/upload.png);
  height: 25px;
  width: 25px;
  background-position: center;
  background-repeat: no-repeat;
`;
