import Image from "next/image";
import styled, { css } from "styled-components";

export const RewardContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 50px;
  width: 100%;
  background-color: #ede7f2;
  padding-top: 70px;
  p {
    margin: 0;
  }
  @font-face {
    font-family: Montserrat;
    src: url(../fonts/Montserrat-VariableFont_wght.ttf);
  }
  @font-face {
    font-family: Raleway;
    src: url(../fonts/Raleway-VariableFont_wght.ttf);
  }
`;

export const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 15px;
  padding-left: 80px;
  .title{
    font-size: 36px;
    color: #3f1168;
    letter-spacing: 4px;
    span{
      font-weight: 600;
    }
  }
  .rewards-circle {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    position: relative;
    &:hover {
      .hover-text {
        opacity: 1;
        transition: 0.2s ease all;
      }
    }
    background: linear-gradient(59deg, #9a2fea 10%, #d244d1 40%, #fd8608 100%);
    cursor: pointer;
    .inside {
      width: 24px;
      height: 24px;
      border-radius: 50%;
      position: absolute;
      background-color: #dad3e5;
      top: 50%;
      right: 50%;
      transform: translate(50%, -50%);
    }
  }
  .
`;
export const RewardsTitle = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  padding-right: 30%;
  gap: 40px;
  align-items: center;
  .hand-container {
    position: absolute;
    top: 170px;
    left: 0;
    width: 125px;
    height: 230px;
    border-radius: 0 250px 250px 0;
    background-color: #ffdd67;
    @media (max-width: 1350px) {
      width: 92px;
      height: 200px;
      border-radius: 0 190px 190px 0;
    }
    img {
      top: -140px;
      position: absolute;
      left: 0;
      width: 400px;
      @media (max-width: 1350px) {
        width: 300px;
        top: -80px;
      }
    }
  }
  .main-text {
    margin-top: 40px;
    color: #3f1168;
    line-height: 44px;
    font-size: 40px;
    font-weight: 800;
    text-align: center;
    @media (max-width: 1500px) {
      font-size: 36px;
    }
    @media (max-width: 1300px) {
      font-size: 32px;
    }
    span {
      color: #942ced;
    }
  }
  .sub-paragraph {
    display: flex;
    flex-direction: column;
    gap: 20px;
    .second-text {
      color: #3f1168;
      font-size: 20px;
      font-weight: 500;
      text-align: center;
      @media (max-width: 1500px) {
        font-size: 18px;
      }
      @media (max-width: 1300px) {
        font-size: 16px;
      }
      .span-color {
        color: #d244d1;
        font-weight: 600;
      }
      .span-weight {
        font-weight: 800;
      }
    }
  }
`;
export const RewardCardContainer = styled.div<{
  reward: any;
  progress: any;
  timeProgress: any;
  certificateProgress: any;
  type: any;
}>`
  display: flex;
  position: absolute;
  padding-left: 40px;
 cursor: pointer;
  ${(props) =>
    props.type == 0 &&
    css<{ reward: any }>`
      top: 0;
      right: 0;
      background: linear-gradient(135deg, #fd8608 10%, #9a2fea 100%);
      z-index: 12;
      transition: 0.1s ease all;
      box-shadow: 65px 15px 40px -15px black;
      transform-origin: top right;
      @media (max-width: 1500px) {
        transform: scale(0.85);
      }
      @media (max-width: 1300px) {
        transform: scale(0.75);
      }
      @media (max-width: 1150px) {
        transform: scale(0.65);
      }
      ${(props) =>
        props.reward == 1 &&
        css`
          transform: scale(0.8);
          transition: 0.1s ease all;
          z-index: 9;
          @media (max-width: 1500px) {
            transform: scale(0.7);
          }
          @media (max-width: 1300px) {
            transform: scale(0.62);
          }
          @media (max-width: 1150px) {
            transform: scale(0.55);
          }
        `}
      ${(props) =>
        props.reward == 2 &&
        css`
          transform: scale(0.6);
          transition: 0.1s ease all;
          z-index: 7;
          @media (max-width: 1500px) {
            transform: scale(0.6);
          }
          @media (max-width: 1300px) {
            transform: scale(0.52);
          }
          @media (max-width: 1150px) {
            transform: scale(0.45);
          }
        `}
    `}
  ${(props) =>
    props.type == 1 &&
    css<{ reward: any }>`
      top: 185px;
      right: 0;
      background: linear-gradient(135deg, #10c576 50%, #9a2fea 100%);
      z-index: 8;
      transform: scale(0.8);
      transition: 0.3s ease all;
      box-shadow: 65px 15px 40px -15px black;
      transform-origin: top right;
      @media (max-width: 1500px) {
        transform: scale(0.7);
        top: 155px;
      }
      @media (max-width: 1300px) {
        top: 135px;
        transform: scale(0.62);
      }
      @media (max-width: 1150px) {
        top: 115px;
        transform: scale(0.55);
      }
      ${(props) =>
        props.reward == 1 &&
        css`
          transform: scale(1);
          transition: 0.1s ease all;
          top: 125px;
          right: 0;
          z-index: 12;
          box-shadow: 65px -15px 40px -15px black, 204px 15px 40px -15px black;
          @media (max-width: 1500px) {
            transform: scale(0.85);
            top: 110px;
          }
          @media (max-width: 1300px) {
            transform: scale(0.75);
            top: 100px;
          }
          @media (max-width: 1150px) {
            top: 90px;
            transform: scale(0.65);
          }
        `}
      ${(props) =>
        props.reward == 2 &&
        css`
          box-shadow: 65px -15px 40px -15px black;
          top: 120px;
          @media (max-width: 1500px) {
            top: 115px;
          }
          @media (max-width: 1300px) {
            top: 100px;
          }
          @media (max-width: 1150px) {
          }
        `}
    `}
  ${(props) =>
    props.type == 2 &&
    css<{ reward: any }>`
      top: 340px;
      right: 0;
      background: linear-gradient(135deg, #167fec 10%, #9a2fea 100%);
      z-index: 7;
      transform: scale(0.6);
      transition: 0.1s ease all;
      transform-origin: top right;
      @media (max-width: 1500px) {
        top: 280px;
        transform: scale(0.6);
      }
      @media (max-width: 1300px) {
        top: 250px;
        transform: scale(0.52);
      }
      @media (max-width: 1150px) {
        top: 215px;
        transform: scale(0.45);
      }
      ${(props) =>
        props.reward == 2 &&
        css`
          transition: 0.1s ease all;
          transform: scale(1);
          top: 280px;
          right: 0;
          z-index: 12;
          box-shadow: 65px -15px 40px -15px black;
          @media (max-width: 1500px) {
            top: 245px;
            transform: scale(0.85);
          }
          @media (max-width: 1300px) {
            top: 220px;
            transform: scale(0.75);
          }
          @media (max-width: 1150px) {
            transform: scale(0.65);
          }
        `}
    `}
  border-radius: 300px 0 0 300px;
  align-items: center;
  gap: 20px;
  .next-reward{
    display: flex;
    padding-block: 40px;
    padding-inline: 40px 30px;
    background-color: #3f1168;
    border-radius: 300px 0 0 300px;
    .container{
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 15px;
      .icon-rewards{
        font-size: 50px;
        color: #fedd67;
      }
      .next-reward-title{
        color:#ede7f2;
        text-align: center;
        font-size: 20px;
        font-weight: 500;
        span{
          color: #fedd67;
          font-weight: 600;
        }         
      }
      .next-reward-points{
        text-align: center;
        font-size: 20px;
        font-weight: 600;
        line-height: 26px;
        background: linear-gradient(to right, #e68a0d, #ffac0d,#e68a0d);
        -webkit-text-fill-color: transparent;
        -webkit-background-clip: text;
        span{
          font-size: 24px;
          font-weight: 800;
        }
      }
    }
  }
  .circle-level {
    display: flex;
    width: 220px;
    height: 220px;
    position: relative;
    .crown {
      position: absolute;
      font-size: 40px;
      width: 62px;
      top: -4px;
      left: 50%;
      transform: translateX(-50%);
      z-index: 2;
    }
    .points {
      font-size: 68px;
      font-weight: 600;
      position: absolute;
      color: #ede7f2;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
    svg {
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      stroke-dasharray: 755;
      z-index: 1;
      transform: rotate(-90deg);
      border-radius: 50%;
    }
    .progress-circle {
      fill: none;
      stroke: url(#gradient);
      stroke-width: 34px;
      stroke-dasharray: 565;
      ${(props) =>
        props.reward == 0 &&
        css<{ progress: number }>`
          stroke-dashoffset: ${(props) => props.progress};
        `}
      ${(props) =>
        props.reward == 1 &&
        css<{ timeProgress: number }>`
          stroke-dashoffset: ${(props) => props.timeProgress};
        `}
        ${(props) =>
          props.reward == 2 &&
          css<{ certificateProgress: number }>`
            stroke-dashoffset: ${(props) => props.certificateProgress};
          `}
      stroke-linecap: round;
      cx: 110px;
      cy: 110px;
      r: 90px;
    }
    .progress-background {
      fill: none;
      stroke: #ede7f2;
      stroke-width: 32px;
      stroke-dasharray: 565;
      stroke-dashoffset: 0;
      cx: 110px;
      cy: 110px;
      r: 90px;
    }
  }
  .card-title {
    display: flex;
    gap: 40px;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    .title-contain{
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 5px;
      .icon{
        font-size: 45px;
        color: #fedd67;
      }
    }
    .texts {
      font-size: 20px;
      text-align: center;
      color: #ede7f2;
      font-weight: 600;
      line-height: 20px;
      .main{
        color: #fedd67;
        letter-spacing: 1px;
      }
      .sub {
        color: #3f1168;
        font-weight: 800;
      }

  }
`;
export const AllSlider = styled.div`
  margin-top: 100px;
  padding-left: 20px;

  gap: 20px;
  .slide-container {
    display: flex;
    gap: 20px;
  }
`;
export const Gradient = styled.linearGradient``;
export const stop = styled.stop``;
export const MainContain = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding-inline: 20px;
  @media (max-width: 380px) {
    padding-inline: 10px;
  }
`;

export const ImageContain = styled.div`
  display: flex;
  width: 100%;
  height: 300px;
  position: relative;
  filter: brightness(50%);
  @media (max-width: 450px) {
    height: 280px;
  }
  @media (max-width: 400px) {
    height: 260px;
  }
  @media (max-width: 380px) {
    height: 240px;
  }
  img {
    width: 100%;
    height: auto;
  }
`;
export const BannerContain = styled.div`
  display: flex;
  position: relative;
`;
export const InsideContain = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: space-between;
  padding-block: 60px;
  padding-inline: 20px;
  position: absolute;
  @media (max-width: 1023px) {
    padding-block: 30px;
    flex-direction: column;
  }
  @media (max-width: 449px) {
    padding-inline: 0;
  }
`;

export const PointsText = styled.p`
  font-size: 36px;
  font-family: "Montserrat", sans-serif;
  color: #e0c3fc;
  margin: 0;
  span {
    display: none;
    @media (max-width: 1023px) {
      display: revert;
    }
  }
  @media (max-width: 1023px) {
    order: 2;
    font-size: 24px;
    margin-top: -15px;
  }
  @media (max-width: 1023px) {
    font-size: 20px;
  }
`;
export const ProgressContain = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  @media (max-width: 1023px) {
    flex-direction: column;
  }
`;
export const OuterProgress = styled.div`
  width: 120px;
  height: 120px;
  position: relative;
  padding: 10px;
  border-radius: 50%;
  @media (max-width: 1023px) {
    width: 100px;
    height: 100px;
  }
`;
export const ProgressSvg = styled.svg`
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  stroke-dasharray: 346;
  position: absolute;
  transform: rotate(-90deg);
  filter: blur(0.5px);
  @media (max-width: 1023px) {
    stroke-dasharray: 289;
  }
`;
export const ProgressCircle = styled("circle")<{
  progress: number;
  progressResp: number;
}>`
  fill: none;
  width: 76px;
  stroke: url(#gradient);
  stroke-width: 8px;
  stroke-dasharray: 346;
  cx: 60px;
  cy: 60px;
  r: 55px;
  stroke-dashoffset: ${(props) => props.progress};
  stroke-linecap: round;
  @media (max-width: 1023px) {
    stroke-dasharray: 289;
    stroke-dashoffset: ${(props) => props.progressResp};
    cx: 50px;
    cy: 50px;
    r: 46px;
  }
`;
export const ProgressBackground = styled.circle`
  fill: none;
  width: 76px;
  stroke: #808080;
  cx: 60px;
  cy: 60px;
  r: 55px;
  stroke-width: 7px;
  stroke-dasharray: 345;
  stroke-dashoffset: 0;
  @media (max-width: 1023px) {
    stroke-dasharray: 289;
    cx: 50px;
    cy: 50px;
    r: 46px;
  }
`;
export const LevelContain = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;
export const CurrentLevel = styled.p`
  font-size: 44px;
  line-height: 50px;
  font-weight: 600;
  font-family: "Raleway", sans-serif;
  color: #e0c3fc;
  margin: 0;
  @media (max-width: 1023px) {
    font-size: 32px;
  }
`;
export const Vector = styled.i`
  background-image: url(../images/Rewards/VectorU.svg);
  background-repeat: no-repeat;
  height: 24px;
  width: 32px;
  position: absolute;
  bottom: 25px;
  @media (max-width: 1023px) {
    bottom: 20px;
  }
`;
export const Vector2 = styled.i`
  background-image: url(../images/Rewards/VectorU.svg);
  background-repeat: no-repeat;
  height: 24px;
  width: 32px;
  position: absolute;
  bottom: 13px;
  @media (max-width: 1023px) {
    bottom: 8px;
  }
`;
