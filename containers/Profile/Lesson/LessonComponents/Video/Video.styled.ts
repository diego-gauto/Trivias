import Image from "next/image";
import styled from "styled-components";

export const Segment = styled.div`
  display: flex;
  position: relative;
  @media (max-width: 1124px) {
    flex-direction: column-reverse;
  }
`;
export const VideoContain = styled.div`
  display: flex;
  flex-direction: column;
  width: 70%;
  border-radius: 10px;
  min-height: 400px;
  .nav-course {
    display: none;
    background: #411369;
    padding-block: 20px;
    justify-content: space-between;
    padding-inline: 40px;
    align-items: center;
    img {
      width: 80px;
    }
    svg {
      color: #ede7f2;
      font-size: 24px;
    }
    @media (max-width: 1124px) {
      display: flex;
    }
  }
  .absolute {
    @media (max-width: 1450px) {
      height: auto !important;
    }
    video {
      height: 100% !important;
      object-fit: cover;
    }
  }
  .quiz-container {
    padding: 60px;
    .question-container {
      display: flex;
      flex-direction: column;
      gap: 10px;
      .question {
        display: flex;
        gap: 10px;
        p {
          margin: 0;
        }
      }
    }
  }
  .module-selector {
    background: #e8ddf2;
    padding: 20px 40px;
    padding-bottom: 0;
    p {
      color: #411369;
      font-weight: 700;
      span {
        font-weight: 500;
      }
    }
  }
  @media (max-width: 1124px) {
    width: 100%;
  }
`;
export const Title = styled.h1`
  font-size: 24px;
  font-family: "Montserrat", sans-serif;
  margin: 0;
  @media (max-width: 1023px) {
    font-size: 20px;
  }
  @media (max-width: 400px) {
    font-size: 16px;
  }
`;
export const TitleContain = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  justify-content: space-between;
`;
export const VideoImage = styled(Image)``;

export const MenuIcon = styled.i`
  background-image: url(../images/hamburger.png);
  height: 16px;
  width: 30px;
  cursor: pointer;
  display: none;
  @media (max-width: 700px) {
    display: block;
  }
`;
