import styled from "styled-components";

export const BackgroundContainer = styled.div`
  display: flex;
  width: 100%;
  position: relative;
  p {
    margin: 0;
  }
  .img-background {
    width: 100%;
    height: auto;
  }
  .img-hand-phone {
    width: 260px;
    position: absolute;
    bottom: 0;
    left: -90px;
  }
  .img-hand-paint {
    width: 300px;
    position: absolute;
    bottom: 0;
    right: -60px;
  }
  .upper-contain {
    display: flex;
    flex-direction: column;
    width: 100%;
    align-items: center;
    gap: 40px;
    position: absolute;
    top: 30px;
    left: 50%;
    transform: translateX(-50%);
    .first-container {
      display: flex;
      gap: 30px;
      .text-contain {
        .text {
          font-size: 20px;
          font-weight: 600;
          color: #3f1168;
        }
      }
      .subs-text {
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 14px;
        color: #3f1168;
        font-weight: 500;
        border: 1px solid #3f1168;
        padding-inline: 8px;
        border-radius: 100px;
      }
    }
    .second-container {
      .title {
        font-size: 20px;
        color: #d7d7d6;
        font-weight: 500;
        letter-spacing: 3px;
        text-shadow: 0px 1px 4px black;
        span {
          font-weight: 800;
        }
      }
    }
  }
  .bottom-contain {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 30px;
    position: absolute;
    bottom: 25px;
    left: 50%;
    transform: translateX(-50%);
    .first-container {
      display: flex;
      .text {
        font-size: 16px;
        font-weight: 500;
        color: #3f1168;
        line-height: 16px;
        text-align: center;
        span {
          font-weight: 800;
        }
      }
    }
    .second-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      cursor: pointer;
      width: fit-content;
      .text {
        font-size: 14px;
        line-height: 18px;
        letter-spacing: 3px;
        color: white;
        font-weight: 500;
        text-shadow: 0px 1px 7px black;
      }
      .chevron-down {
        font-size: 20px;
        color: white;
        filter: drop-shadow(0 0 5px black);
      }
    }
  }
`;
export const Middlecontainer = styled.div`
  background-color: #dad3e5;
  p {
    margin: 0;
  }
  padding: 40px;
  .main-title {
    display: flex;
    flex-direction: column;
    gap: 20px;
    justify-content: center;
    .text-title {
      font-size: 16px;
      font-weight: 500;
      color: #3f1168;
      text-align: center;
      span {
        font-weight: 800;
      }
      .span2 {
        color: #c96409;
      }
      .span3 {
        color: #ff9b00;
        font-size: 24px;
        span {
          font-size: 14px;
          font-weight: 500px;
        }
      }
    }
    .bottom-container {
      display: flex;
      justify-content: center;
      position: relative;
      .start-button {
        color: white;
        border: none;
        background: linear-gradient(135deg, #8e2de2 0%, #4a00e0 100%);
      }
    }
  }
`;
export const BottomContainer = styled.div`
  background-color: #ede7f2;
  padding-block: 200px 40px;
  padding-inline: 40px;
  border-radius: 0 0 20px 20px;
  p {
    margin: 0;
  }
  .main-text {
    font-size: 16px;
    font-weight: 600;
    color: #3f1168;
    span {
      color: #d244d1;
    }
  }
`;
