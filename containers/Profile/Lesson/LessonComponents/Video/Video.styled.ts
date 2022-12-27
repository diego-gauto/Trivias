import Image from "next/image";
import styled from "styled-components";

export const Segment = styled.div`
  display: flex;
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
  .absolute {
    max-height: 570px;
    @media (max-width: 1450px) {
      height: auto !important;
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
    .select {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 130px;
      border-radius: 20px;
      margin-left: auto;
      padding: 5px 15px;
      background: linear-gradient(
          to right,
          rgb(148, 44, 237),
          rgb(210, 68, 209)
        )
        transparent;
      p {
        color: white;
        margin: 0;
      }
      svg {
        color: white;
        font-size: 18px;
      }
    }
    .list {
      position: absolute;
      right: 60px;
      width: 50px;
      background: #d244d1;
      flex-direction: column;
      text-align: center;
      border-bottom-left-radius: 27px;
      border-bottom-right-radius: 27px;
      p {
        font-size: 12px;
        font-weight: 700;
        color: white;
        margin: 0;
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
