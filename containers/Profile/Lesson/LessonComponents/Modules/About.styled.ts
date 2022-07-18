import styled from "styled-components";

export const AboutContain = styled.div`
  display: flex;
  gap: 20px;
  @media (max-width: 1023px) {
    flex-direction: column;
    align-items: center;
    box-shadow: 0px 0px 20px 2px rgba(0, 0, 0, 0.25);
    padding: 20px;
    border-radius: 10px;
  }
`;
export const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  max-width: 100%;
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
