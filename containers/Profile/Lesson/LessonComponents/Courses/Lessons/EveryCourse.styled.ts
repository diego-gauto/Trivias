import styled, { css } from "styled-components";

export const LessonContain = styled.div`
  display: flex;
  width: 100%;
  gap: 15px;
  position: relative;
  background: #dad3e5;
  height: 100px;
  align-items: baseline;
  padding-left: 30px;
  padding-top: 20px;
  padding-bottom: 10px;
  cursor: pointer;
`;
export const ProgressCircle = styled.div`
  position: relative;
  display: flex;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #3f1168;
`;
export const CurrentCircle = styled.div`
  position: relative;
  display: flex;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  border: 2px solid #3f1168;
`;
export const IncompleteCircle = styled.div`
  position: relative;
  display: flex;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  border: 2px solid gray;
`;
export const CourseTitle = styled.p<{ active: boolean }>`
  font-size: 14px;
  font-family: "Raleway", sans-serif;
  margin: 0;
  color: #3f1168;
  ${(props) =>
    props.active == true &&
    css`
      font-weight: 800;
    `}
`;
export const CurrentCourse = styled.p`
  font-size: 14px;
  font-weight: 600;
  font-family: "Raleway", sans-serif;
  margin: 0;
`;
export const Details = styled.div`
  display: flex;
  width: 90%;
  flex-direction: column;
  gap: 5px;
  cursor: pointer;
`;
export const DetailContain = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
`;

export const CourseLength = styled.div`
  font-size: 12px;
  font-family: "Raleway", sans-serif;
  color: #3f1168;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 5px;
`;
export const CoursePoints = styled.p`
  font-size: 12px;
  font-family: "Raleway", sans-serif;
  color: #3f1168;
  margin: 0;
`;
export const DividerComplete = styled.div`
  border-radius: 10px;
  width: 2px;
  height: 90px;
  z-index: 1;
  background: #3f1168;
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
`;
export const DocIcon = styled.i`
  background-image: url(../images/Video/icons/document.svg);
  height: 14px;
  width: 14px;
  background-position: center;
  background-repeat: no-repeat;
}`;
export const CurrentDivider = styled.div`
  border-radius: 10px;
  width: 2px;
  height: 44px;
  border: 1px solid #8e2de2;
  position: absolute;
  top: 28px;
  left: 11px;
`;
export const DividerIncomplete = styled.div`
  border-radius: 10px;
  width: 2px;
  height: 90px;
  z-index: 1;
  background: gray;
  position: absolute;
  top: 8px;
  left: 50%;
  transform: translateX(-50%);
`;
