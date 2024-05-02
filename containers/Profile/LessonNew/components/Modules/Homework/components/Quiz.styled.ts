import styled, { css } from 'styled-components';

export const QuizContainer = styled.div`
  text-align: center;
  display: flex;
  padding-inline: 40px;
  padding-block: 20px;
  width: 100%;

  .quiz-info {
    display: flex;
    flex-direction: column;
    gap: 40px;
    width: 100%;
  }

  @media screen and (max-width: 768px) {
    padding-inline: 10px;

    .quiz-info {
      gap: 80px;
    }
  }
`;

export const Top = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 5px;

  * {
    margin: 0;
  }
  h2 {
    font-size: 28px;
    font-weight: 700;
    text-transform: uppercase;
  }

  .circle {
    border: 5px solid #8527e1;
    border-radius: 50%;
    min-width: 144px;
    height: 144px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: linear-gradient(180deg, #6818ce 0%, #8d2de2 100%);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;

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

  @media screen and (max-width: 768px) {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

export const Bottom = styled.div`
  display: flex;
  flex-direction: column;
  gap: 50px;

  * {
    margin: 0;
  }

  .quiz-bar-container {
    display: flex;
    gap: 10px;
    .quiz-bar {
      position: relative;
      flex: 1;
      background: linear-gradient(270deg, #d0b1ee 0.52%, #d7beef 100%);
      border-radius: 20px;
      height: 45px;
      color: #8628e2;
      font-weight: 700;
      font-size: 14px;
      display: flex;
      justify-content: start;
      align-items: center;
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
          .max {
            position: absolute;
            top: -45px;
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
            bottom: -42px;
            transform: translateX(-50%);
          }
          .minimum-top {
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
    .points-container {
      width: 144px;
      display: flex;
      justify-content: center;
      align-items: center;
      .point-child {
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #ca9ff3;
        padding: 5px 20px;
        border-radius: 10px;
        font-size: 14px;
        font-weight: bold;
        color: #a855f7;
        text-align: center;
      }
    }
  }

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
  }

  @media screen and (max-width: 768px) {
    .quiz-bar-container {
      display: flex;
      flex-direction: column;
      gap: 15px;
      height: 85px;

      .points-container {
        align-self: center;
      }
    }
  }
`;

export const QuestionContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;

  * {
    margin: 0;
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
    h2 {
      font-weight: 700;
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

  ol.answers {
    margin-block: 20px;
    display: grid;
    grid-template-columns: auto auto;
    gap: 20px;
    padding-inline: 30px;
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

  @media screen and (max-width: 768px) {
    justify-content: center;

    .question-title {
      justify-content: center;
    }

    ol.answers {
      margin-block: 20px;
      display: grid;
      grid-template-columns: auto;
      gap: 10px;
      padding-inline: 30px;
    }
  }
`;

export const DoneContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  width: 100%;

  * {
    margin: 0;
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

    .left {
      font-weight: 400;
      font-size: 20px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      h2 {
        font-weight: 700;
        font-size: 28px;
      }
      p {
        font-size: 16px;
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
          .max {
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
            bottom: -42px;
            transform: translateX(-50%);
          }
          .minimum-top {
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

  @media screen and (max-width: 768px) {
    .quiz-results {
      flex-direction: column;
      align-items: center;
      gap: 20px;
      padding-inline: 0px;
    }

    .quiz-bar-container {
      display: flex;
      flex-direction: column;
      height: 100px;
      padding-inline: 20px;

      .quiz-bar {
      }

      .quiz-bar-points {
        align-self: center;
      }
    }
  }
`;

export const QuizStatus = styled.div<{
  color: string;
  rgb: string;
  text: string;
  icon: string;
}>`
  display: flex;
  align-items: center;
  gap: 30px;
  border-left: 5px solid ${(props) => props.color};
  background: ${(props) => props.rgb};
  padding-inline: 30px;
  padding-block: 20px;
  width: 550px;
  border-radius: 0px 20px 20px 0px;
  .icon {
    font-size: 80px;
    color: ${(props) => props.icon};
  }
  p {
    margin: 0;
    color: ${(props) => props.text};
  }
  .right-data {
    display: flex;
    flex-direction: column;
    gap: 5px;
    .title {
      font-size: 18px;
      font-weight: 600;
    }
    .content {
      font-size: 12px;
      font-weight: 400;
      text-align: justify;
      width: 300px;
    }
  }
  @media (max-width: 600px) {
    width: 100%;
    gap: 15px;
    padding-inline: unset;
    padding-left: 10px;
    padding-right: 20px;
    .icon {
      font-size: 50px;
      min-width: 50px;
    }
    .right-data {
      .content {
        width: unset;
      }
    }
  }
`;
