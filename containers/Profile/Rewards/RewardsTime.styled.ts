import styled from "styled-components";

export const TimeSvg = styled.svg`
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  stroke-dasharray: 346;
  position: absolute;
  transform: rotate(-90deg);
  filter: blur(0.5px);
  @media(max-width: 1023px) {
    stroke-dasharray: 289;
  }
`;
export const TimeProgressCircle = styled("circle")<{progress:number,progressResp:number}>`
    fill: none;
    width: 76px;
    stroke: url(#gradientTimeLevel);
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
export const TimeProgressBackground = styled.circle`
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