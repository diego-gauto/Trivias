import styled, { keyframes } from 'styled-components';

const rotate = keyframes`
from {
  transform: rotate(0deg);
}

to {
  transform: rotate(360deg);
}
`;
export const WhiteLoader = styled.div`
  box-sizing: border-box;
  align-self: center;
  display: block;
  width: 30px;
  height: 30px;
  margin: 6px;
  border-width: 9px;
  border-style: solid;
  border-radius: 50%;
  border-color: white transparent transparent;
  animation: ${rotate} 1.2s cubic-bezier(0.5, 0, 0.5, 1) 0s infinite normal none
    running;
`;

export const BackgroundLoader = styled.div`
  display: flex;
  width: 100%;
  min-height: 90vh;
  align-items: center;
  justify-content: center;
`;
export const LoaderImage = styled.div`
  position: relative;
  background-size: contain;
  background-position: center;
  display: flex;
  width: 60px;
  height: 60px;
  background-image: url(../images/logo-g.png);
  background-repeat: no-repeat;
  align-items: center;
  justify-content: center;
`;
export const LoaderContain = styled.div`
  box-sizing: border-box;
  display: block;
  position: absolute;
  left: -26px;
  top: -26px;
  width: 100px;
  height: 100px;
  margin: 6px;
  border-width: 9px;
  border-style: solid;
  border-radius: 50%;
  border-color: #6717cd transparent transparent;
  animation: ${rotate} 1.2s cubic-bezier(0.5, 0, 0.5, 1) 0s infinite normal none
    running;
`;

export const Background = styled.div`
  width: 100%;
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
`;
