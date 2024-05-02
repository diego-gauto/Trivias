import Image from 'next/image';
import styled, { css } from 'styled-components';

export const RewardContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 50px;
  width: 100%;
  background: linear-gradient(180deg, #ede7f2 10%, #cfc0dc 100%);
  padding-top: 70px;
  @media (max-width: 1023px) {
    padding-top: 35px;
    gap: 20px;
  }
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
  @media (max-width: 1023px) {
    gap: 10px;
  }
  @media (max-width: 450px) {
    gap: 5px;
  }
  .title{
    font-size: 36px;
    color: #3f1168;
    letter-spacing: 4px;
    font-weight: 400 !important;
    @media (max-width: 1023px) {
      font-size: 28px;
      letter-spacing: 3px;
    }
    @media (max-width: 550px) {
      font-size: 24px;
    }
    @media (max-width: 500px) {
      font-size: 20px;
    }
    @media (max-width: 400px) {
      font-size: 16px;
      letter-spacing: 2px;
    }
    span{
      font-weight: 600;
    }
  }
  .rewards-circle {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    position: relative;
    @media (max-width: 1023px) {
      width: 30px;
      height: 30px;
    }
    @media (max-width: 550px) {
      width: 20px;
      height: 20px;
    }
    &:hover {
      .hover-text {
        opacity: 1;
        
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
      @media (max-width: 1023px) {
        width: 18px;
        height: 18px;
      }
      @media (max-width: 550px) {
        width: 10px;
        height: 10px;
      }
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
  @media (max-width: 1023px) {
    padding-right: 0;
    gap: 20px;
  }
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
    @media (max-width: 1023px) {
      top: 400px;
    }
    @media (max-width: 800px) {
      display: none;
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
    @media (max-width: 1023px) {
      font-size: 26px;
      line-height: 36px;
      margin: 0;
    }
    @media (max-width: 550px) {
      font-size: 22px;
      line-height: 28px;
      margin: 0;
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
      @media (max-width: 1023px) {
        font-size: 14px;
      }
      @media (max-width: 550px) {
        font-size: 12px;
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
  .reward-card-container {
    width: 100%;
    position: absolute;
    top: 0;
    right: 0;
    transform-origin: top right;
    @media (max-width: 1920px) {
      transform: scale(0.85);
    }
    @media (max-width: 1500px) {
      transform: scale(0.85);
    }
    @media (max-width: 1300px) {
      transform: scale(0.75);
    }
    @media (max-width: 1150px) {
      transform: scale(0.65);
    }
    @media (max-width: 1023px) {
      top: 285px;
    }
    @media (max-width: 550px) {
      top: 240px;
      transform: scale(0.42);
    }
  }
`;
export const RewardCardContainer = styled.div<{
  reward: any;
  progress: any;
  type: any;
}>`
  display: flex;
  position: absolute;
  padding-left: 40px;
 cursor: pointer;
 transition: 0.25s ease all;
  ${(props) =>
    props.type == 'points' &&
    css<{ reward: any }>`
      top: 0;
      right: 0;
      background: linear-gradient(135deg, #fd8608 10%, #9a2fea 100%);
      z-index: 12;
      box-shadow: 65px 15px 40px -15px black;
      transform-origin: top right;
      ${(props) =>
        props.reward == 'months' &&
        css`
          transform: scale(0.8);
          z-index: 9;
        `}
      ${(props) =>
        props.reward == 'certificates' &&
        css`
          transform: scale(0.6);
          z-index: 7;
        `}
    `}
  ${(props) =>
    props.type == 'months' &&
    css<{ reward: any }>`
      top: 185px;
      right: 0;
      background: linear-gradient(135deg, #10c576 50%, #9a2fea 100%);
      z-index: 8;
      transform: scale(0.8);
      box-shadow: 65px 15px 40px -15px black;
      transform-origin: top right;
      ${(props) =>
        props.reward == 'months' &&
        css`
          transform: scale(1);
          top: 125px;
          right: 0;
          z-index: 12;
          box-shadow:
            65px -15px 40px -15px black,
            204px 15px 40px -15px black;
        `}
      ${(props) =>
        props.reward == 'certificates' &&
        css`
          box-shadow: 65px -15px 40px -15px black;
          top: 100px;
        `}
    `}
  ${(props) =>
    props.type == 'certificates' &&
    css<{ reward: any }>`
      top: 340px;
      right: 0;
      background: linear-gradient(135deg, #167fec 10%, #9a2fea 100%);
      z-index: 7;
      transform: scale(0.6);
      transform-origin: top right;
      ${(props) =>
        props.reward == 'certificates' &&
        css`
          transform: scale(1);
          top: 235px;
          right: 0;
          z-index: 12;
          box-shadow: 65px -15px 40px -15px black;
        `}
    `}
  border-radius: 300px 0 0 300px;
  align-items: center;
  gap: 20px;
  @media (max-width: 550px) {
  
  }
  .next-reward{
    display: flex;
    padding-block: 40px;
    padding-inline: 40px 30px;
    background-color: #3f1168;
    border-radius: 300px 0 0 300px;
    max-width: 300px;
    @media (max-width: 550px) {
      padding-inline: 40px 20px;
    }
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
        white-space:nowrap;
        color:#ede7f2;
        text-align: center;
        font-size: 20px;
        font-weight: 500;
        @media(max-width: 550px){
          font-size: 22px;
        }
        span{
          white-space:initial;
          font-size: 16px;
          color: #fedd67;
          font-weight: 600;
        }         
      }
      .next-reward-points{
        text-align: center;
        font-size: 20px;
        font-weight: 600;
        line-height: 26px;
        border: 1px solid #3f1168;
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
          stroke-dashoffset: ${(props) => props.progress};
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
  margin-top: 90px;
  display: flex;
  flex-direction: column;
  @media (max-width: 1500px) {
    margin-top: 50px;
  }
  @media (max-width: 1023px) {
    margin-top: 350px;
  }
  @media (max-width: 550px) {
    margin-top: 220px;
  }
  h2 {
    padding-left: 20px;
    font-weight: 600;
    font-size: 20px;
    color: #3f1168;
    @media (max-width: 450px) {
      font-size: 16px;
    }
    @media (max-width: 390px) {
      font-size: 14px;
    }
  }
  .slide-container {
    display: flex;
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
  font-family: 'Montserrat', sans-serif;
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
export const ProgressCircle = styled('circle')<{
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
  font-family: 'Raleway', sans-serif;
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
