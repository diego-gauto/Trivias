import styled from 'styled-components';

export const Canvas = styled.canvas  `
display: block;
position: absolute;
height: 100%;
width: 100vw;
top: 0;
left: 0;
z-index: -9999;
max-width:100%;
`

export const CanvasIncreasedHeight = styled(Canvas) `
height: calc(100% + 100px);
`
