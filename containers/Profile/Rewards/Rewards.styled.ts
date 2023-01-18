import Image from "next/image";
import styled from "styled-components";

export const RewardContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 50px;
  width: 100%;
  background-color: #ede7f2;
  height: 100vh;
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
  gap: 10px;
  padding-left: 80px;
  .title{
    font-size: 24px;
    color: #3f1168;
    letter-spacing: 4px;
    span{
      font-weight: 600;
    }
  }
  .rewards-circle {
    width: 30px;
    height: 30px;
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
      width: 18px;
      height: 18px;
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
  align-items: center;
  justify-content: center;
  .main-text {
    color: #3f1168;
    font-size: 36px;
    font-weight: 800;
    span {
      color: #942ced;
    }
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
