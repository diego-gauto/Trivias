import Image from "next/image";
import styled from "styled-components";

import { ContinueText } from "../Module2/Module2.styled";

export const Maincontainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;
export const CardContain = styled.div`
  display: flex;
  padding: 10px;
  gap: 20px;
  overflow: auto;
  float: left;
  overscroll-behavior-inline: contain;
  ::-webkit-scrollbar{
    display: none;
  }
`;
export const CardImage = styled(Image)`
`;
export const Title = styled(ContinueText)`
  @media( max-width: 1023px){
    font-size: 24px;
  }
`;
export const Cardcontent = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 400px;
  min-width: 350px;
  @media( max-width: 1023px){
    max-width: 350px;
    min-width: 250px;
  }
`;
export const ImageContent = styled.div`
  display: flex;
  position: relative;
`;
export const InsideContent = styled.div`
  display: flex;
  position: absolute;
  right: 0;
  bottom: 0;
`;
export const InsideText = styled.p`
  opacity:.8;
  border: 1px solid white;
  border-radius: 12px;
  padding-block: 3px;
  padding-inline: 20px;
  font-size: 14px;
  font-family: 'Montserrat', sans-serif;
  color: white;
  margin: 10px;
  @media( max-width: 1023px){
    font-size: 10px;
    padding-inline: 10px;
  }
`;
export const VideoInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  box-shadow: 0px 0px 10px 2px rgba(0, 0, 0, 0.25);
  border-radius: 0 0 10px 10px;
  @media( max-width: 1023px){
    gap:0;
  }
`;
export const TextContain = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding:10px;
`;
export const Text1 = styled.p`
  display: flex;
  flex-direction: column;
  font-size: 24px;
  font-family: 'Montserrat', sans-serif;
  margin: 0;
  @media( max-width: 1023px){
    font-size: 14px;
  }
`;
export const Text2 = styled.span`
  font-size: 12px;
  font-family: 'Raleway', sans-serif;
  margin: 0;
  @media( max-width: 1023px){
    font-size: 10px;
  }
`;
export const Text3 = styled.p`
  font-size: 14px;
  font-family: 'Raleway', sans-serif;
  margin: 0;
  @media( max-width: 1023px){
    display: none;
  }
`;
export const ViewCourse = styled.p`
  padding-block: 15px;
  color: #6717CD;
  text-align: center;
  font-size: 16px;
  font-family: 'Montserrat', sans-serif;
  font-weight: 600;
  cursor: pointer;
  margin-bottom: 0;
  &:hover{
    color: white;
    background-color: #6717CD;
    border-radius: 0 0 10px 10px;
  }
  @media( max-width: 1023px){
    padding-block: 10px;
    font-size: 14px;
  }
`;
