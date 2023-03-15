import styled from "styled-components";

export const AboutContain = styled.div`
  display: flex;
  gap: 70px;
  .teacher-container {
    margin-top: 50px;
    width: 200px;
    position: relative;
    padding: 20px;
    background: #e0dcec;
    display: flex;
    flex-direction: column;
    gap: 20px;
    border-radius: 30px;
    img {
      border-radius: 50%;
      width: 50%;
      aspect-ratio: 1;
      object-fit: cover;
      position: absolute;
      top: 0;
      left: 0;
      transform: translate(50%, -50%);
    }
    p {
      font-size: 14px;
      margin: 0;
      color: #6717cd;
      font-weight: 500;
    }
    .title {
      margin-top: 40px;
      text-align: center;
      color: #3f1168;
      font-weight: 700;
      font-size: 21px;
      line-height: normal;
      span {
        color: #942ced;
      }
    }
  }
  @media (max-width: 1023px) {
    flex-direction: column;
    align-items: center;
    padding: 20px;
    border-radius: 10px;
    p {
      text-align: justify;
    }
  }
`;
export const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  flex: 1;
  @media (max-width: 374px) {
    gap: 10px;
  }
`;
export const CircleContain = styled.div`
  min-width: 150px;
  width: 150px;
  height: 150px;
  border-radius: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border: 4px solid gray;
`;
export const NumberText = styled.p`
  color: #8e2de2;
  text-align: center;
  font-size: 36px;
  font-weight: 600;
  font-family: "Montserrat", sans-serif;
  margin: 0;
  @media (max-width: 1023px) {
    font-size: 32px;
  }
`;
export const PointText = styled.p`
  color: #8e2de2;
  text-align: center;
  font-size: 16px;
  font-weight: 600;
  font-family: "Montserrat", sans-serif;
  margin: 0;
`;
export const LessonTitle = styled.p`
  font-size: 18px;
  font-weight: 600;
  font-family: "Montserrat", sans-serif;
  margin: 0;
  color: #f8a44c;
  @media (max-width: 1023px) {
    font-size: 14px;
  }
  span {
    font-weight: 500;
    opacity: 0.7;
  }
`;
export const LessonContent = styled.div`
  font-size: 14px;
  font-family: "Raleway", sans-serif;
  margin: 0;
  p {
    color: #74549c;
    font-weight: 500;
    text-align: justify;
  }
  .title {
    color: #74549c;
    font-weight: 700;
    font-size: 18px;
  }

  @media (max-width: 1023px) {
    font-size: 12px;
  }
`;
export const ObjectiveContainer = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  box-shadow: 0px 0px 20px 2px rgba(0, 0, 0, 0.25);
  padding: 15px;
  gap: 10px;
  p {
    margin: 0;
  }
  .title {
    p {
      text-align: center;
      font-size: 24px;
      font-weight: 600;
      @media (max-width: 1023px) {
        font-size: 16px;
      }
    }
  }
  .content {
    p {
      font-size: 16px;
      @media (max-width: 1023px) {
        font-size: 12px;
      }
    }
  }
`;
