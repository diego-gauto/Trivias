import styled from "styled-components";

export const AboutContain = styled.div`
  display: flex;
  gap: 20px;
`;
export const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  max-width: 80%;
`;
export const CircleContain = styled.div`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border: 4px solid gray;
`;
export const NumberText = styled.p`
  color: #8E2DE2;
  text-align: center;
  font-size: 36px;
  font-weight: 600;
  font-family: 'Montserrat', sans-serif;
  margin: 0;
`;
export const PointText = styled.p`
  color: #8E2DE2;
  text-align: center;
  font-size: 16px;
  font-weight: 600;
  font-family: 'Montserrat', sans-serif;
  margin: 0;
`;
export const LessonTitle = styled.p`
  font-size: 16px;
  font-weight: 600;
  font-family: 'Montserrat', sans-serif;
  margin: 0;
`;
export const LessonContent = styled.p`
  font-size: 14px;
  font-family: 'Raleway', sans-serif;
  margin: 0;
`;