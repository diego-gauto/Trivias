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
  gap: 20px;
  @media(max-width:500px){
    gap: 0;
  }
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
  @media(max-width: 991px){
    gap: 40px;
  }
  @media(max-width: 500px){
    gap: 20px;
    padding-inline: 10px;
  }
  @media(max-width: 400px){
    gap: 0px;
  }
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
  @media(max-width: 500px){
    font-size: 24px;
  }
`;
export const Title = styled.h1`
  font-size: 36px;
  font-family: 'Montserrat', sans-serif;
  color: white;
  text-shadow: -.5px 2px 8px black;
  margin: 0;
  @media(max-width: 991px){
    font-size: 24px;
  }
  @media(max-width: 991px){
    font-size: 20px;
  }
  @media(max-width: 400px){
    font-size: 18px;
  }
`;
export const SubTitle = styled.p`
  font-size: 24px;
  font-family: 'Montserrat', sans-serif;
  color: white;
  text-shadow: -.5px 2px 8px black;
  margin: 0;
  @media(max-width: 991px){
    font-size: 20px;
  }
  @media(max-width: 991px){
    font-size: 16px;
  }
  @media(max-width: 400px){
    font-size: 14px;
  }
`;
export const ImageBack = styled(Image)`
`;
export const ImageDiv = styled.div`
  position: absolute;
`;
export const InsideContent = styled.div`
  display: flex;
`;
export const ButtonContain = styled.div`
  display: flex;
  margin-top: 20px;
  gap: 20px;
  @media(max-width: 991px){
    max-width: 150px;
    flex-direction: column;
    gap: 10px;
    margin: 0;
  }
  @media(max-width: 480px){
    justify-content: space-between;
    max-width: 100%;
    flex-direction: row;
    gap: 10px;
    margin: 0;
  }
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
  @media(max-width: 991px){
    font-size: 10px;
    padding-inline: 15px;
  }
`;
export const CourseContain = styled.div`
  display: flex;
  margin-top: 20px;
  padding-inline: 20px;
  gap: 20px;
  @media(max-width: 991px){
    flex-direction: column;
  }
  @media(max-width: 500px){
    padding-inline: 10px;
  }
  @media(max-width: 400px){
    margin-top: 20px;
  }
  @media(max-width: 355px){
    margin-top: 40px;
  }
`;
export const AboutContain = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
  @media(max-width: 991px){
    width: 100%;
  }
`;
export const Datacontain = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
  @media(max-width: 991px){
    width: 100%;
  }
`;
export const Titles = styled.p`
  font-size: 14px;
  font-weight: 600;
  font-family: 'Raleway', sans-serif;
  margin: 0;
  @media(max-width: 500px){
    font-size: 12px;
  }
`;
export const Text = styled.p`
  font-size: 14px;
  font-family: 'Raleway', sans-serif;
  margin: 0;
  @media(max-width: 500px){
    font-size: 10px;
  }
`;
export const Data = styled.p`
  display: flex;
  gap: 10px;
  font-size: 14px;
  font-weight: 600;
  font-family: 'Raleway', sans-serif;
  margin: 0;
  @media(max-width: 500px){
    font-size: 10px;
  }
`;
export const DataSpan = styled.span`
  font-size: 14px;
  font-weight: 400;
  font-family: 'Raleway', sans-serif;
  margin: 0;
  @media(max-width: 500px){
    font-size: 10px;
  }
`;
export const LessonContain = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  padding-block: 20px;
  padding-inline: 20px;
  @media(max-width: 500px){
    padding-inline: 10px;
  }
`;
export const SeasonContain = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media(max-width: 374px){
    flex-direction: column;
    gap: 10px;
  }
`;
export const LessonTitle = styled.p`
  font-size: 24px;
  font-family: 'Montserrat', sans-serif;
  margin: 0;
  @media(max-width: 991px){
    font-size: 20px;
  }
  @media(max-width: 500px){
    font-size: 16px;
  }
`;
export const VideoContain = styled.div`
  display: flex;
  gap: 20px;
  @media(max-width: 991px){
    flex-direction: column;
    justify-content: center;
  }
`;
export const EpisodeContain = styled.div`
  display: flex;
  position: relative;
  width: 350px;
`;
export const ContainVideo = styled.div`
  display: flex;
  justify-content: center;
`;
export const EpisodeInfo = styled.div`
  display: flex;
  width: 50%;
  flex-direction: column;
  gap:5px;
  @media(max-width: 991px){
    width: 100%;
  }
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
  @media(max-width: 991px){
    display: none;
  }
`;
export const CardImage = styled(Image)`
filter: brightness(40%);
`;
export const Lock = styled.i`
  position: absolute;
  background-repeat: no-repeat;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
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