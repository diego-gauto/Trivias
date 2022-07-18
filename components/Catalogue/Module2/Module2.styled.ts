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
`;
export const CardContainer = styled.div`
  display: flex;
  gap: 20px;
`;
export const Video = styled.div`
  display: flex;
  flex-direction: column;
  width:420px;
`;
export const VideoContain = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  position: relative;
`;
export const Background = styled(Image)`
`;
export const PlayIcon = styled.i`
  position: absolute;
  top: 80px;
  left: 175px;
  background-image: url(../images/Preview/play2.png);
  height: 76px;
  width: 76px;
  background-position: center;
  cursor: pointer;
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
`;
export const VideoInfo = styled.p`
  font-size: 14px;
  font-family: 'Raleway', sans-serif;
  margin: 0;
`;