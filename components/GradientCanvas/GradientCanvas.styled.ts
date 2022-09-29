import styled from "styled-components";

export const Canvas = styled.canvas  `
display: block;
position: absolute;
width: 100vw;
top: 0;
left: 0;
z-index: -9999;
max-width:100%;
@media only screen and (max-width: 1024px) {
  height: 100% !important;
}
@media only screen and (min-height: 600px) {
  height: 130% !important;
}
`

export const CanvasIncreasedHeight = styled(Canvas) `
height: calc(100% + 100px);
`
