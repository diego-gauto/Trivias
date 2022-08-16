import Image from "next/image";
import styled from "styled-components";

export const RewardContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  @media(max-width: 1023px) {
    padding-inline: 0;
    margin-top: 0;
  }
  @font-face{
    font-family:Montserrat;
    src:url(../fonts/Montserrat-VariableFont_wght.ttf);
  }
  @font-face{
    font-family:Raleway;
    src:url(../fonts/Raleway-VariableFont_wght.ttf);
  }
`;
export const Gradient = styled.linearGradient`
`;
export const stop = styled.stop`
`;
export const MainContain = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding-inline: 20px;
`;
export const Banner = styled(Image)`
  position: absolute;
  filter: brightness(50%);
  `;
  export const ImageContain = styled.div`
  width: 100%;
  height: 300px;
  position: relative;
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
  @media(max-width: 1023px) {
    padding-block: 30px;
    flex-direction: column;
  }
  @media(max-width: 449px) {
    padding-inline: 0;
  }
`;
export const BannerTitle = styled.h1`
  font-size: 36px;
  font-family: 'Montserrat', sans-serif;
  color: white;
  margin: 0;
  @media(max-width: 1023px) {
    font-size: 24px;
    margin-top:-15px;
    margin-bottom: 15px;
  }
  @media(max-width: 449px) {
    font-size: 20px;
  }
`;
export const PointsText = styled.p`
  font-size: 36px;
  font-family: 'Montserrat', sans-serif;
  color: #E0C3FC;
  margin: 0;
  span{
    display: none;
    @media(max-width: 1023px) {
      display: revert;
    }
  }
  @media(max-width: 1023px) {
    order: 2;
    font-size: 24px;
    margin-top:-15px;
  }
  @media(max-width: 1023px) {
    font-size: 20px;
  }
`;
export const ProgressContain = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  @media(max-width: 1023px) {
    flex-direction: column;
  }
`;
export const OuterProgress = styled.div`
  width: 120px;
  height: 120px;
  position: relative;
  padding: 10px;
  border-radius: 50%;
  @media(max-width: 1023px) {
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
  @media(max-width: 1023px) {
    stroke-dasharray: 289;
  }
`;
export const ProgressCircle = styled("circle")<{progress:number,progressResp:number}>`
    fill: none;
    width: 76px;
    stroke: url(#gradient);
    stroke-width: 8px;
    stroke-dasharray: 346;
    cx: 60px;
    cy:60px;
    r: 55px;
    stroke-dashoffset: ${props=>props.progress};
    stroke-linecap: round;
    @media(max-width: 1023px) {
      stroke-dasharray: 289;
      stroke-dashoffset: ${props=>props.progressResp};
      cx: 50px;
      cy:50px;
      r: 46px;
    }
`;
export const ProgressBackground = styled.circle`
  fill: none;
  width:76px;
  stroke: #808080;
  cx: 60px;
  cy:60px;
  r: 55px;
  stroke-width: 7px;
  stroke-dasharray: 345;
  stroke-dashoffset: 0;
  @media(max-width: 1023px) {
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
  font-weight: 600;
  font-family: 'Raleway', sans-serif;
  color: #E0C3FC;
  margin: 0;
  @media(max-width: 1023px) {
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
  @media(max-width: 1023px) {
    bottom: 20px;
  }
`;
export const Vector2 = styled.i`
  background-image: url(../images/Rewards/VectorU.svg);
  background-repeat:no-repeat;
  height: 24px;
  width: 32px;
  position: absolute;
  bottom: 13px;
  @media(max-width: 1023px) {
    bottom: 8px;
  }
`;