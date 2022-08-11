import styled from "styled-components";

export const Background = styled.div`
  background: white;
  opacity: .5;
  top:0;
  left:0;
  width: 50px;
  height: 50px;
  position: absolute;
  border-radius: 50%;
  z-index: 0;
`;
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
  z-index: 1;
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
  z-index: 1;
`;
export const ProgressCircle = styled("circle")<{progress:number}>`
    fill: none;
    stroke: url(#gradient2);
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
  z-index: 1;
`;
export const Vector2 = styled.i`
  background-image: url(../images/Rewards/VectorS.png);
  background-repeat:no-repeat;
  height: 10px;
  width: 17px;
  position: absolute;
  bottom: 8px;
  z-index: 1;
`;