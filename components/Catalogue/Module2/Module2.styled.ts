import Image from "next/image";
import styled, { css } from "styled-components";
import { Container } from "react-bootstrap";

export const ContainerS = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
`;
export const SlideModuleContainer = styled(Container)`
  padding: 0;
  margin-top: 10px;
  margin-bottom: 0px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  .title {
    padding-right: 10px;
    color: #a733e4;
    font-weight: 700;
    margin: 0;
    font-size: 14px;
  }
  .sub {
    padding-right: 10px;
    color: #3f1168;
    margin: 0;
    span {
      font-weight: 700;
      font-size: 14px;
    }
  }
  &:hover {
    transform: scale(1.1);
  }
  @media only screen and (max-width: 992px) {
    &:hover {
      transform: scale(1);
    }
    &:active {
      transform: scale(1.02);
    }
  }
`;

export const ContinueText = styled.h1`
  font-size: 24px;
  font-family: "Montserrat", sans-serif;
  color: #3f1168;
  margin: 0;
  @media (max-width: 1023px) {
    font-size: 24px;
  }
`;
export const CardContainer = styled.div`
  display: flex;
  padding: 20px;
  padding-block: 5px;
  gap: 10px;
  @media (max-width: 1023px) {
    .right-shadow {
      right: 0;
    }
  }
  @media (max-width: 1023px) {
    .right-shadow {
      height: 120px;
    }
  }
`;
export const Video = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 420px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  @media (max-width: 1023px) {
    width: 180px;
    height: 120px;
  }
  &:hover {
    transform: scale(1.02);
  }
`;
export const VideoContain = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  position: relative;
  height: 100%;
`;
export const Background = styled.img`
  border-radius: 10px;
  @media (max-width: 700px) {
    width: 100%;
    height: 100%;
  }
`;
export const PlayIcon = styled.i`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-image: url(../images/Preview/play2.png);
  height: 76px;
  width: 76px;
  background-position: center;
  cursor: pointer;
  @media (max-width: 700px) {
    display: none;
  }
`;
export const ImageContain = styled.div`
  display: flex;
  width: 100%;
  min-width: 180px;
  height: 100%;
`;
export const PlayIconS = styled.i`
  display: none;
  position: absolute;
  background-image: url(../images/Preview/playS.png);
  height: 64px;
  width: 64px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-position: center;
  cursor: pointer;
  @media (max-width: 700px) {
    display: flex;
  }
`;
export const Progress = styled.div`
  position: relative;
  bottom: 12px;
  display: flex;
  height: 12px;
  background: linear-gradient(135deg, #8e2de2 0%, #4a00e0 100%);
  border-radius: 0px 10px 10px 10px;
`;
export const VideoTitle = styled.p`
  font-size: 18px;
  font-weight: bold;
  margin-top: 10px;
  margin-bottom: 0;
  @media (max-width: 1023px) {
    display: none;
  }
`;
export const VideoInfo = styled.p`
  font-size: 14px;
  font-weight: 500;
  margin: 0;
  color: gray;
  @media (max-width: 1023px) {
    display: none;
  }
`;
