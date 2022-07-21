import styled from 'styled-components';

export const Canvas = styled.canvas  `
display: block;
position: absolute;
height: 110vh;
width: 100vw;
top: 0;
left: 0;
z-index: -9999;
max-width:100%;
`

export const CanvasSkewTop = styled(Canvas) `
clip-path: polygon(0px 15%, 100% 0px, 100% 100%, 0px 100%);
`

export const CanvasSkewBottom = styled(Canvas) `
clip-path: polygon(0px 0px, 100% 0px, 100% 85%, 0px 100%);
`
