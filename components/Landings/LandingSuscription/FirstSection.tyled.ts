import styled from 'styled-components';

export const FirstSection = styled.div`
  //SECTION
  width: 100%;
  position: relative;
  padding-block: 35px;
  background-color: #3f1168;
  .extra-margin {
    margin-top: 20px;
  }
  .big-text {
    font-size: 90px;
  }
  .left-img {
    min-width: 420px;
    width: 43%;
    z-index: 1;
    position: absolute;
    transform: translate(0px, -40px);
    left: 0;
  }
  .right-img-1 {
    min-width: 350px;
    width: 34%;
    z-index: 1;
    position: absolute;
    right: 0;
    transform: translateY(-460px);
  }
  .right-img-2 {
    min-width: 340px;
    width: 30%;
    z-index: 1;
    position: absolute;
    transform: translateY(-115px);
    right: 0;
  }
  .countdown {
    margin-top: 32px;
    .time {
      display: flex;
      gap: 8px;
      align-items: center;
      justify-content: center;
      .countdown-block {
        display: flex;
        align-items: center;
        flex-direction: column;
        .tiempo {
          width: 120px;
          height: 130px;
          color: #000;
          border-radius: 24px;
          border: 2px solid #6b7074;
          background: rgb(179, 185, 189);
          background: linear-gradient(
            180deg,
            #d2d6d8 0%,
            #ffffff 50%,
            #d2d6d8 100%
          );
          font-size: 5rem;
        }
      }
    }
  }
  .progress-container {
    display: flex;
    justify-content: center;
    .progress-bar {
      border-radius: 32px;
      background-color: #e0e3e4;
      width: 400px;
      height: 50px;
      position: relative;
      &.full {
        outline: 2px solid #ff0000;
      }
      &::after {
        position: relative;
        content: attr(progress-text);
        font-weight: 700;
        font-size: 1.2rem;
        color: white;
      }
      &::before {
        content: '';
        position: absolute;
        width: var(--progress);
        height: 100%;
        border-radius: 32px;
        background: #d244d1;
      }
    }
  }
  @media (max-width: 1000px) {
    .space {
      .big-text {
        font-size: 75px;
      }
    }
    .left-img {
      transform: unset;
      top: 650px;
      width: 30%;
      min-width: 240px;
    }
    .right-img-1 {
      max-width: 350px;
      width: 32%;
      min-width: unset;
      transform: translateY(-360px);
      min-width: 250px;
    }
    .right-img-2 {
      min-width: 250px;
      transform: translateY(220px);
    }
  }
  @media (max-width: 850px) {
    .left-img {
      top: 700px;
      min-width: 200px;
    }
    .right-img-1 {
      transform: translateY(-345px);
      min-width: 160px;
    }
    .right-img-2 {
      min-width: 140px;
      transform: translateY(200px);
    }
    .space {
      .subtitle {
        font-size: 18px;
        margin-top: 20px;
        font-weight: 800;
      }
    }
    .all-center {
      img {
        width: 150px;
        height: 25px;
      }
      h3 {
        margin-block: 15px;
        font-size: 16px;
      }
    }
    .extra-margin {
      font-size: 18px;
      padding-inline: 20px;
    }
    .btn {
      padding: 0px;
      padding-inline: 30px;
      padding-block: 8px;
      font-size: 16px;
      line-height: 20px;
    }
  }
  @media (max-width: 550px) {
    padding-block: 45px;
    padding-bottom: 30px;
    .space {
      margin-block: 5px;
      .big-text {
        font-size: 45px;
        line-height: 45px;
      }
      .subtitle {
        margin-top: 5px;
        margin-bottom: 0px;
      }
    }
    .progress-container {
      .progress-bar {
        margin-bottom: 8px;
        width: 350px;
        height: 40px;
      }
    }
    .fechas {
      margin-top: 0.5rem !important;
      margin-bottom: 20px !important;
    }
    .countdown {
      margin-top: 10px;
      .time {
        .countdown-block {
          .tiempo {
            width: 65px;
            height: 60px;
            font-size: 2.2rem;
            margin-bottom: 0.5rem;
          }
          .sub {
            font-size: 0.6em;
          }
        }
      }
    }
    .right-img-1 {
      transform: translateY(-155px);
      min-width: 80px;
      width: 20%;
    }
    .left-img {
      top: 480px;
      min-width: 160px;
      left: -10px;
    }
    .right-img-2 {
      min-width: 125px;
      transform: translateY(140px);
      right: -20px;
    }
    .all-center {
      .space {
        margin-block: 5px;
      }
    }
  }
  @media (max-width: 400px) {
    .space {
      margin-bottom: 5px;
      .big-text {
        font-size: 45px;
      }
      .subtitle {
        font-size: 16px;
        font-weight: 500;
      }
    }
    .all-center {
      img {
        width: 120px;
        height: 20px;
      }
      h3 {
        padding-left: 10px;
        font-size: 12px;
        margin-block: 5px;
      }
    }
    .extra-margin {
      margin-top: 20px;
      font-size: 14px;
    }
    .left-img {
      top: 560px;
      left: -20px;
    }
    .right-img-2 {
      transform: translateY(140px);
      right: -30px;
    }
    .btn {
      padding-block: 5px;
      font-size: 13px;
      padding-inline: 25px;
      line-height: 18px;
      font-weight: 500;
    }
  }
`;
