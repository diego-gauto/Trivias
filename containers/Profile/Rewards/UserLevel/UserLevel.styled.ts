import styled from "styled-components";

export const Background = styled.div`

`;
export const OuterProgress = styled.div`
  width: 54px;
  height: 54px;
  position: relative;
  border-radius: 50%;
  cursor: pointer;
  &:hover{
    box-shadow: 0px 0px 5px 2px #6717CD;
    transition: 1s ease all;
  }
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
  border-radius: 50%;
  filter: blur(0.5px);
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
  line-height: 30px;
`;
export const ProgressCircle = styled("circle")<{progress:number}>`
    fill: none;
    stroke: url(#gradient2);
    stroke-width: 4px;
    stroke-dasharray: 157;
    stroke-dashoffset: ${props=>props.progress};
    stroke-linecap: round;

    cx:27px;
    cy:27px;
    r:25px;
`;
export const ProgressBackground = styled.circle`
  fill: none;
  stroke: #808080;
  stroke-width: 4px;
  stroke-dasharray: 157;
  stroke-dashoffset: 0;
  cx:27px;
  cy:27px;
  r:25px;
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