import Image from "next/image";
import { Modal } from "react-bootstrap";
import styled from "styled-components";

export const ModalContain = styled.div`
  @font-face{
    font-family:Montserrat;
    src:url(../fonts/Montserrat-VariableFont_wght.ttf);
  }
  @font-face{
    font-family:Raleway;
    src:url(../fonts/Raleway-VariableFont_wght.ttf);
  }
`;
export const ModalMod = styled(Modal)`
  .modal-content {
    border-radius: 12px !important;
  }
  `;
export const ModalCont = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
`;
export const ModalBackground = styled.div`  
  display: flex;
  position: relative;
`;
export const BackgroundOverlay = styled.div`  
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: linear-gradient(360deg, #FFFFFF 0%, rgba(255, 255, 255, 0) 39.51%);
  position: absolute;
`;
export const Container = styled.div`
  display: flex;
  width: 100%;
  padding-inline: 20px;
  flex-direction: column;
  gap: 220px;
  position: absolute;
`;
export const TextContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  gap: 2px;
`;
export const Cross = styled.p`
  display: flex;
  color: white;
  justify-content: flex-end;
  font-size: 36px;
  font-family: 'Montserrat', sans-serif;
  cursor: pointer;
  margin: 0;
`;
export const Title = styled.h1`
  font-size: 36px;
  font-family: 'Montserrat', sans-serif;
  color: white;
  text-shadow: -.5px 2px 8px black;
  margin: 0;
`;
export const SubTitle = styled.p`
  font-size: 24px;
  font-family: 'Montserrat', sans-serif;
  color: white;
  text-shadow: -.5px 2px 8px black;
  margin: 0;
`;
export const ImageBack = styled(Image)`

`;
export const InsideContent = styled.div`
  display: flex;
`;
export const ButtonContain = styled.div`
  display: flex;
  margin-top: 20px;
  gap: 20px;
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
`;
export const CourseContain = styled.div`
  display: flex;
  padding: 20px;
  gap: 20px;
`;
export const AboutContain = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
`;
export const Datacontain = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
`;
export const Titles = styled.p`
  font-size: 14px;
  font-weight: 600;
  font-family: 'Raleway', sans-serif;
  margin: 0;
`;
export const Text = styled.p`
  font-size: 14px;
  font-family: 'Raleway', sans-serif;
  margin: 0;
`;
export const Data = styled.p`
  display: flex;
  gap: 10px;
  font-size: 14px;
  font-weight: 600;
  font-family: 'Raleway', sans-serif;
  margin: 0;
`;
export const DataSpan = styled.span`
  font-size: 14px;
  font-weight: 400;
  font-family: 'Raleway', sans-serif;
  margin: 0;
`;
export const LessonContain = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
`;
export const SeasonContain = styled.div`
  display: flex;
  justify-content: space-between;
  padding-inline: 20px;
`;
export const LessonTitle = styled.p`
  font-size: 24px;
  font-family: 'Montserrat', sans-serif;
  margin: 0;
`;
export const TransparentButton = styled.button`
  display: flex;
  font-size: 16px;
  font-weight: 600;
  padding-inline: 25px;
  padding-block: 10px;
  gap: 10px;
  align-items: center;
  background:transparent;
  color: #6717CD;
  border-radius: 30px;
  border:1px solid #6717CD;
  &:hover{
    transform:scale(1.03);
    transition:.5s ease all;
  }
`;
export const VideoContain = styled.div`
  display: flex;
  gap: 20px;
  padding: 20px;
`;
export const EpisodeContain = styled.div`
  display: flex;
  position: relative;
`;
export const EpisodeInfo = styled.div`
  display: flex;
  width: 50%;
  flex-direction: column;
  gap:5px;
`;
export const EpisodeTitle = styled.p`
  font-size: 16px;
  font-weight: 600;
  font-family: 'Montserrat', sans-serif;
  margin: 0;
`;
export const EpisodeTime = styled.p`
  font-size: 12px;
  color: gray;
  font-family: 'Raleway', sans-serif;
  margin: 0;
`;
export const Description = styled.p`
  font-size: 14px;
  font-family: 'Raleway', sans-serif;
  margin: 0;
`;
export const DropDown = styled.i`
  background-image: url(../images/Preview/down.png);
  height: 10px;
  width: 16px;
  background-position: center;
  background-repeat: no-repeat;
`;
export const CardImage = styled(Image)`
filter: brightness(40%);
`;
export const Lock = styled.i`
  position: absolute;
  background-repeat: no-repeat;
  top: 70px;
  left: 145px;
  background-image: url(../images/Preview/lock.png);
  height: 64px;
  width: 64px;
  background-position: center;
  cursor: pointer;
`;
export const PlayIcon = styled.i`
  background-repeat: no-repeat;
  background-image: url(../images/Preview/play3.png);
  height: 20px;
  width: 20px;
  background-position: center;
`;