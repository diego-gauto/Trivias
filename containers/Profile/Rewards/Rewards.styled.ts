import Image from "next/image";
import styled from "styled-components";

export const RewardContainer = styled.div`
  @font-face{
    font-family:Montserrat;
    src:url(../fonts/Montserrat-VariableFont_wght.ttf);
  }
  @font-face{
    font-family:Raleway;
    src:url(../fonts/Raleway-VariableFont_wght.ttf);
  }
`;
export const Banner = styled(Image)`
  position: absolute;
  clip-path: polygon(100% 0%,
    100% 0%,
    100% 70%,
    0% 100%,
    0% 0%);
  `;
export const BannerContain = styled.div`
  display: flex;
  position: relative;
`;
export const InsideContain = styled.div`
  display: flex;
  align-items:center;
  width:100%;
  justify-content:space-between;
  padding-block:60px;
  padding-inline: 20px;
  position: absolute;
`;
export const BannerTitle = styled.h1`
  font-size: 36px;
  font-family: 'Montserrat', sans-serif;
  color: white;
  margin: 0;
`;
export const PointsText = styled.p`
  font-size: 36px;
  font-family: 'Montserrat', sans-serif;
  color: #E0C3FC;
  margin: 0;
`;
export const ProgressContain = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;
export const OuterProgress = styled.div`
  width: 130px;
  max-width: 130px;
  height: 130px;
  position: relative;
  padding: 10px;
  border: 1px solid #8E2DE2;
  border-radius: 50%;
`;
export const InnerProgress = styled.div`
  width: 110px;
  height: 110px;
  position: absolute;
  border: 1px solid #8E2DE2;
  border-radius: 50%;
`;

export const ProgressSvg = styled.svg`
  top: 0;
  left: 0;
  position: absolute;
`;
export const ProgressCircle = styled.circle`
    fill: none;
    stroke: #8E2DE2;
    stroke-width: 10px;
    stroke-dasharray: 377;
    stroke-dashoffset: 190;
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
`;
export const UpNarrow = styled.div`
  background-color: #E0C3FC;
  width: 35px;
  height: 25px;
  border-radius:10px;
  clip-path: polygon(50% 0%,                  
    100% 60%,                   
    100% 90%,
    50% 30%,
     0% 90%,                    
     0% 60%)
`;
export const UpNarrow2 = styled.div`
  background-color: #E0C3FC;
  width: 35px;
  height: 25px;
  border-radius:10px;
  clip-path: polygon(50% 0%,                  
    100% 60%,                   
    100% 90%,
    50% 30%,
     0% 90%,                    
     0% 60%)
`;
