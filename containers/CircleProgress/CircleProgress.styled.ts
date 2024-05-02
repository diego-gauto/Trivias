import styled from 'styled-components';

export const CircleOfProgress = styled.div<{ progress: any; color: any }>`
  display: flex;
  width: 180px;
  height: 180px;
  position: relative;
  .crown {
    position: absolute;
    font-size: 40px;
    width: 48px;
    top: -4px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 2;
  }
  .points {
    font-size: 68px;
    font-weight: 600;
    position: absolute;
    color: ${(props) => props.color};
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
    stroke: ${(props) => props.color};
    stroke-width: 25px;
    stroke-dasharray: 500;
    stroke-dashoffset: ${(props) => props.progress};
    stroke-linecap: round;
    cx: 90px;
    cy: 90px;
    r: 75px;
  }
  .progress-background {
    fill: none;
    stroke: #dad3e5;
    stroke-width: 25px;
    stroke-dasharray: 500;
    stroke-dashoffset: 0;
    cx: 90px;
    cy: 90px;
    r: 75px;
  }
`;
