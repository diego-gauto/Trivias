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
export const MainContain = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding-inline: 20px;
`;
export const Banner = styled(Image)`
  position: absolute;
  filter: brightness(50%);
  &:@media(max-width: 870px) {
    width: 870px;
    height: 525px;
  }
  &:@media(max-width: 420px) {
    width: 550px;
    height: 525px;
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
  @media(max-width: 1023px) {
    padding-block: 30px;
    flex-direction: column;
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
`;
export const PointsText = styled.p`
  font-size: 36px;
  font-family: 'Montserrat', sans-serif;
  color: #E0C3FC;
  margin: 0;
  @media(max-width: 1023px) {
    order: 2;
    font-size: 24px;
    margin-top:-15px;
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
  width: 130px;
  max-width: 130px;
  height: 130px;
  position: relative;
  padding: 10px;
  border: 1px solid #8E2DE2;
  border-radius: 50%;
  @media(max-width: 1023px) {
    width: 96px;
    max-width: 96px;
    height: 96px;
  }
`;
export const InnerProgress = styled.div`
  width: 110px;
  height: 110px;
  position: absolute;
  border: 1px solid #8E2DE2;
  border-radius: 50%;
  @media(max-width: 1023px) {
    width: 76px;
    height: 76px;
  }
`;

export const ProgressSvg = styled.svg`
  top: 0;
  left: 0;
  position: absolute;
`;
export const ProgressCircle = styled.circle`
    fill: none;
    width:76px;
    stroke: #8E2DE2;
    stroke-width: 10px;
    stroke-dasharray: 377;
    stroke-dashoffset: 190;
    @media(max-width: 420px) {
      stroke-dashoffset:245 ;
      stroke-width: 10.5px;
    }
    @media(max-width: 1200px) {
      stroke-dashoffset: 245px ;
      stroke-width: 10.5px;
      cx: 47.5;
      cy: 47.5;
      r: 42.5;
    }
`;
export const LevelContain = styled.div`
  display: flex;
  align-items:center;
  flex-direction: column;
`;
export const CurrentLevel = styled.p`
  font-size: 35px;
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
  background-repeat:no-repeat;
  height: 24px;
  width: 32px;
  position: absolute;
  bottom: 30px;
  @media(max-width: 1023px) {
    height: 10px;
    width: 30px;
    bottom: 20px;
  }
`;
export const Vector2 = styled.i`
  background-image: url(../images/Rewards/VectorU.svg);
  background-repeat:no-repeat;
  height: 24px;
  width: 32px;
  position: absolute;
  bottom: 12px;
  @media(max-width: 1023px) {
    height: 10px;
    width: 30px;
    bottom: 8px;
  }
`;