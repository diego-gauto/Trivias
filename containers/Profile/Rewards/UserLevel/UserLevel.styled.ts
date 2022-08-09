import styled from "styled-components";

export const OuterProgress = styled.div`
  cursor: pointer;
  width: 54px;
  height: 54px;
  position: relative;
  border-radius: 50%;
`;
export const ProgressSvg = styled.svg`
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  stroke-dasharray: 157;
  position: absolute;
  transform: rotate(-90deg);
`;
export const LevelContain = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;
export const CurrentLevel = styled.p`
  font-size: 24px;
  font-weight: 600;
  font-family: 'Raleway', sans-serif;
  color: #6717CD;
  margin: 0;
`;
export const ProgressCircle = styled("circle")<{progress:number}>`
    fill: none;
    stroke: url(#gradient);
    stroke-width: 4px;
    stroke-dasharray: 157;
    stroke-dashoffset: ${props=>props.progress};
    stroke-linecap: round;
    
`;
export const ProgressBackground = styled.circle`
  fill: none;
  stroke: #808080;
  stroke-width: 4px;
  stroke-dasharray: 157;
  stroke-dashoffset: 0;
`;
export const Vector = styled.i`
  background-image: url(../images/Rewards/VectorS.png);
  background-repeat: no-repeat;
  height: 10px;
  width: 17px;
  position: absolute;
  bottom: 14px;
`;
export const Vector2 = styled.i`
  background-image: url(../images/Rewards/VectorS.png);
  background-repeat:no-repeat;
  height: 10px;
  width: 17px;
  position: absolute;
  bottom: 8px;
`;