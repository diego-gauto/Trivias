import Image from "next/image";
import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  gap: 10px;
`;
export const ContinueText = styled.h1`
  font-size: 36px;
  font-family:'Montserrat',sans-serif;
  margin: 0;
  padding-left:10px;
  @media( max-width: 1023px){
    font-size: 24px;
  }
`;
export const CardContainer = styled.div`
  display: flex;
  padding: 10px;
  gap: 20px;
  overflow-x: scroll;
  ::-webkit-scrollbar{
    display: none;
    width: 100%;
  }
`;
export const Video = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 420px;
  cursor: pointer;
  transition: all .2s ease-in-out;
  @media( max-width: 700px){
  width: 180px;
  height: 120px;
  }
  &:hover{
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
  border-radius:10px;
  @media( max-width: 700px){
    width:100%;
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
  @media( max-width: 700px){
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
  @media( max-width: 700px){
    display: flex;
  }
`;
export const Progress = styled.div`
  position: absolute;
  bottom: 0;
  display: flex;
  height: 12px;
  background: linear-gradient(135deg, #8E2DE2 0%, #4A00E0 100%);
  border-radius: 0px 10px 10px 10px;
`;
export const VideoTitle = styled.p`
  font-size: 18px;
  font-family: 'Montserrat', sans-serif;
  margin-top: 10px;
  margin-bottom: 0;
  @media( max-width: 1023px){
    display: none;
  }
`;
export const VideoInfo = styled.p`
  font-size: 14px;
  font-family: 'Raleway', sans-serif;
  margin: 0;
  @media( max-width: 1023px){
    display: none;
  }
`;