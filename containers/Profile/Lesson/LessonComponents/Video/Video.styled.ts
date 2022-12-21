import Image from "next/image";
import styled from "styled-components";

export const Segment = styled.div`
  display: flex;
`;
export const VideoContain = styled.div`
  display: flex;
  flex-direction: column;
  width: 70%;
  border-radius: 10px;
  min-height: 400px;
  @media (max-width: 1023px) {
    gap: 10px;
    padding: 15px;
  }
  @media (max-width: 900px) {
    width: 100%;
  }
  .quiz-container {
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
