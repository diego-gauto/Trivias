import styled, { css } from "styled-components";

export const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  padding: 15px;
  box-shadow: 0px 0px 20px 2px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
`;
export const TitleCourse = styled.h1`
  font-size: 18px;
  font-weight: 600;
  font-family: 'Montserrat', sans-serif;
  margin: 0;
`;
export const Subtitle = styled.p`
  font-size: 14px;
  color: gray;
  font-family: 'Raleway', sans-serif;
  margin: 0;
`;
export const ProgressContain = styled.div`
  display: flex;
  position: relative;
  width: 100%;
`;
export const ProgressBar = styled.div<{progress:any}>`
  display: flex;
  height: 10px;
  background: linear-gradient(135deg, #8E2DE2 0%, #4A00E0 100%);
  position: absolute;
  border-radius: 20px;
  width: 0%;
  ${props => props.progress && css`
  width: ${props.progress}%;
  transition: 1s ease all;
  `}
`;
export const ProgressBar2 = styled.div`
  display: flex;
  height: 10px;
  background-color: gray;
  position:absolute;
  border-radius: 20px;
  width: 100%;
`;
export const SeasonContain = styled.div`
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
`;
export const ContainText = styled.div`
  display: flex;
  align-items:center;
  gap: 5px;
`;
export const SeasonText = styled.p`
  color: #8E2DE2;
  font-size: 16px;
  font-weight: 600;
  font-family: 'Montserrat', sans-serif;
  margin: 0;
`;
export const SeasonSpan = styled.span`
  font-size: 12px;
  font-family: 'Montserrat', sans-serif;
  margin: 0;
`;