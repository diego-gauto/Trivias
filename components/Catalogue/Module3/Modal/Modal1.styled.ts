import { Modal } from "react-bootstrap";
import styled, { css, keyframes } from "styled-components";

export const ModalContain = styled.div`
  @font-face {
    font-family: Montserrat;
    src: url(../fonts/Montserrat-VariableFont_wght.ttf);
  }
  @font-face {
    font-family: Raleway;
    src: url(../fonts/Raleway-VariableFont_wght.ttf);
  }
`;
export const ModalMod = styled(Modal)`
  // .modal-content {
  //   border-radius: 0px !important;
  // }
  @media (min-width: 992px) {
    .modal-lg,
    .modal-xl {
      --bs-modal-width: 66%;
    }
  }
`;
export const ModalCont = styled.div`
  display: flex;
  flex-direction: column;
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
  background: linear-gradient(
    360deg,
    #ffffff 0%,
    rgba(255, 255, 255, 0) 39.51%
  );
  position: absolute;
`;
export const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: space-between;
  padding-inline: 20px;
  flex-direction: column;
  position: absolute;
  .top {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    padding-block-start: 10px;
    .tag {
      background: linear-gradient(135deg, #952ced 22%, #ca41d4 80%);
      color: #fff;
      border-radius: 30px;
      border: none;
      font-size: 14px;
      font-weight: 500;
      padding: 4px 10px;
      letter-spacing: 2px;
      span {
        font-weight: 100;
        color: #ffffffa8;
      }
    }
  }
  @media (max-width: 991px) {
    gap: 40px;
  }
  @media (max-width: 500px) {
    gap: 20px;
    padding-inline: 10px;
  }
  @media (max-width: 400px) {
    gap: 0px;
  }
`;
export const TextContainer = styled.div`
  display: flex;
  width: 100%;
  bottom: 40px;
  flex-direction: column;
  gap: 2px;
  align-items: center;
  padding-block-end: 40px;
  p {
    color: white;
    margin: 0;
    line-height: initial;
  }
  .course {
    font-weight: 500;
    font-size: 18px;
    letter-spacing: 6px;
  }
  .title {
    font-size: 28px;
    font-weight: 700;
  }
  .price {
    color: #ff9b00;
    font-size: 20px;
    font-weight: 700;
  }
  button {
    margin-block-start: 30px;
    padding-inline: 20px;
  }
`;
export const Cross = styled.p`
  display: flex;
  color: #3f1168;
  justify-content: flex-end;
  font-size: 36px;
  font-family: "Montserrat", sans-serif;
  cursor: pointer;
  margin: 0;
  @media (max-width: 500px) {
    font-size: 24px;
  }
`;
export const Title = styled.h1`
  font-size: 36px;
  font-family: "Montserrat", sans-serif;
  color: white;
  margin: 0;
  @media (max-width: 991px) {
    font-size: 24px;
  }
  @media (max-width: 991px) {
    font-size: 20px;
  }
  @media (max-width: 400px) {
    font-size: 18px;
  }
`;
export const SubTitle = styled.p`
  font-size: 24px;
  font-family: "Montserrat", sans-serif;
  color: white;
  margin: 0;
  @media (max-width: 991px) {
    font-size: 20px;
  }
  @media (max-width: 991px) {
    font-size: 16px;
  }
  @media (max-width: 400px) {
    font-size: 14px;
  }
`;
export const ImageBack = styled.img`
  width: 100%;
  @media (max-width: 1023px) {
    height: auto;
  }
`;
export const ImageDiv = styled.div`
  position: absolute;
`;
export const InsideContent = styled.div`
  display: flex;
`;
export const ButtonContain = styled.div`
  display: flex;
  gap: 20px;
  @media (max-width: 991px) {
    max-width: 150px;
    flex-direction: column;
    gap: 10px;
    margin: 0;
  }
  @media (max-width: 480px) {
    justify-content: space-between;
    max-width: 100%;
    flex-direction: row;
    gap: 10px;
    margin: 0;
  }
`;
export const InsideText = styled.p`
  opacity: 0.8;
  border: 1px solid white;
  border-radius: 12px;
  padding-block: 3px;
  padding-inline: 20px;
  font-size: 14px;
  font-family: "Montserrat", sans-serif;
  color: white;
  margin: 10px;
  @media (max-width: 991px) {
    font-size: 10px;
    padding-inline: 15px;
  }
`;
export const CourseContain = styled.div<{ level: any }>`
  display: flex;
  padding: 40px;
  gap: 20px;
  background: #ede7f2;
  p {
    margin: 0;
    color: #3f1168;
    font-weight: 500;
    line-height: initial;
  }
  .left {
    flex: 0 35%;
    display: flex;
    flex-direction: column;
    border-right: 1px solid #80808063;
    padding-right: 20px;
    .level-container {
      margin-block-start: 10px;
      margin-block-end: 20px;
      display: flex;
      gap: 10px;
      align-items: center;
      img {
        width: 17px !important;
      }
      p {
        color: inherit;
        font-size: 12px;
        text-transform: uppercase;
        font-weight: 600;
        letter-spacing: 2px;
      }
      ${(props) =>
        (props.level == "Muy Fácil" || props.level == "Fácil") &&
        css`
          color: #6678f8;
        `}
      ${(props) =>
        (props.level == "Avanzado" || props.level == "Máster") &&
        css`
          color: #ef1155;
        `}
    ${(props) =>
        props.level == "Intermedio" &&
        css`
          color: #12a071;
        `}
    }
    .time {
      color: #a733e4;
      font-size: 12px;
      font-weight: 700;
      letter-spacing: -0.5px;
    }
    .duration {
      font-weight: 700;
      font-size: 14px;
    }
    button {
      border: 1px solid #ff9b00;
      border-radius: 20px;
      color: #ff9b00;
      background: none;
      font-size: 12px;
      font-weight: 700;
      width: fit-content;
      padding: 5px 20px;
      margin-block-start: 15px;
    }
  }
  .right {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 30px;
    .top {
      display: flex;
      gap: 30px;
      .rating {
        display: flex;
        align-items: center;
        gap: 10px;
        padding-right: 30px;
        border-right: 1px solid #80808063;
        svg {
          font-size: 25px;
        }
      }
      .professor-container {
        display: flex;
        gap: 10px;
        align-items: center;
        p {
          font-size: 12px;
          letter-spacing: 2px;
          span {
            font-weight: 600;
          }
          .name {
            font-size: 16px;
          }
        }
        img {
          width: 70px;
          border-radius: 50%;
        }
      }
    }
  }
  @media (max-width: 991px) {
    flex-direction: column;
    z-index: 10;
  }
`;
export const AboutContain = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
  button {
    padding: 5px;
    border: none;
    margin-top: 10px;
    width: fit-content;
    border-radius: 10px;
    background: #a733e4;
    color: white;
    transition: 0.5s ease all;
    &:hover {
      transition: 0.5s ease all;
      transform: scale(1.1);
    }
  }
  @media (max-width: 991px) {
    width: 100%;
  }
`;
export const Datacontain = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
  button {
    padding: 5px;
    border: none;
    margin-top: 10px;
    width: fit-content;
    border-radius: 10px;
    background: #a733e4;
    color: white;
    transition: 0.5s ease all;
    &:hover {
      transition: 0.5s ease all;
      transform: scale(1.1);
    }
  }
  @media (max-width: 991px) {
    width: 100%;
  }
`;
export const Titles = styled.p`
  font-size: 14px;
  font-weight: 600;
  font-family: "Raleway", sans-serif;
  margin: 0;
  @media (max-width: 500px) {
    font-size: 12px;
  }
`;
export const Text = styled.p`
  font-size: 14px;
  font-family: "Raleway", sans-serif;
  margin: 0;
  @media (max-width: 500px) {
    font-size: 10px;
  }
`;
export const Data = styled.p`
  display: flex;
  gap: 10px;
  font-size: 14px;
  font-weight: 600;
  font-family: "Raleway", sans-serif;
  margin: 0;
  @media (max-width: 500px) {
    font-size: 10px;
  }
`;
export const DataSpan = styled.span`
  font-size: 14px;
  font-weight: 400;
  font-family: "Raleway", sans-serif;
  margin: 0;
  @media (max-width: 500px) {
    font-size: 10px;
  }
`;
export const LessonContain = styled.div`
  background: #e7e1ee;
  display: flex;
  flex-direction: column;
  gap: 30px;
  padding-block: 40px;
  padding-left: 40px;
  padding-right: 80px;
  border-bottom-right-radius: 30px;
  border-bottom-left-radius: 30px;
`;
export const SeasonContain = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media (max-width: 374px) {
    flex-direction: column;
    gap: 10px;
  }
`;
export const LessonTitle = styled.p`
  font-size: 24px;
  font-family: "Montserrat", sans-serif;
  margin: 0;
  font-weight: 600;
  color: #3f1168;
  span {
    color: #a733e4;
  }
`;
export const VideoContain = styled.div`
  display: flex;
  gap: 20px;
  @media (max-width: 991px) {
    gap: 15px;
  }
  @media (max-width: 450px) {
    gap: 8px;
  }
`;
export const ModalVideo = styled.div`
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 430px;
  border-radius: 10px;
  @media (max-width: 1100px) {
    height: 500px;
  }
  @media (max-width: 850px) {
    height: 370px;
  }
  @media (max-width: 670px) {
    height: 300px;
  }
  @media (max-width: 520px) {
    height: 245px;
  }
  @media (max-width: 450px) {
    height: 220px;
  }
`;
export const EpisodeContain = styled.div`
  display: flex;
  position: relative;
  width: 250px;
  img {
    border-radius: 20px;
  }
`;
export const ContainerVideo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;
export const ContainVideo = styled.div`
  display: flex;
  justify-content: center;
  @media (max-width: 991px) {
  }
`;
export const EpisodeInfo = styled.div`
  display: flex;
  flex-direction: column;
  line-height: initial;
  color: #3f1168;
  font-weight: 500;
  font-size: 18px;
  justify-content: center;
`;
export const EpisodeTitle = styled.p`
  font-size: 20px;
  font-weight: 600;
  font-family: "Montserrat", sans-serif;
  margin: 0;
`;
export const EpisodeTime = styled.p`
  font-family: "Raleway", sans-serif;
  margin: 0;
`;
export const Description = styled.p`
  font-size: 18px;
  font-family: "Raleway", sans-serif;
  margin: 0;
`;
export const DescriptionResp = styled.p`
  font-size: 11px;
  display: none;
  font-family: "Raleway", sans-serif;
  margin: 0;
  @media (max-width: 450px) {
    display: flex;
  }
`;
export const CardImage = styled.img`
  filter: brightness(40%);
  border-radius: 10px;
  @media (max-width: 400px) {
    width: 100%;
  }
`;
export const CardImageUnlock = styled.img`
  border-radius: 10px;
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
  background-image: url(../images/Preview/rigthArrow.svg);
  height: 20px;
  width: 20px;
  background-position: center;
`;

const rotate = keyframes`
from {
  transform: rotate(0deg);
}

to {
  transform: rotate(360deg);
}
`;
export const LoaderContain = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  box-sizing: border-box;
  align-self: center;
  display: block;
  width: 30px;
  height: 30px;
  border-width: 9px;
  border-style: solid;
  border-radius: 50%;
  border-color: #6717cd transparent transparent;
  animation: ${rotate} 1.2s cubic-bezier(0.5, 0, 0.5, 1) 0s infinite normal none
    running;
`;
