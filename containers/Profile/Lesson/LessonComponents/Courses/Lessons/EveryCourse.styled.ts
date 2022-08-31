import styled from "styled-components";

export const LessonContain = styled.div`
  display: flex;
  width: 100%;
  gap: 15px;
  position: relative;
`;
export const ProgressCircle = styled.div`
  display: flex;
  width: 25px;
  height: 25px;
  border-radius: 50%;
  background: linear-gradient(135deg, #8E2DE2 0%, #4A00E0 100%);
`;
export const CurrentCircle = styled.div`
  display: flex;
  width: 25px;
  height: 25px;
  border-radius: 50%;
  border: 2px solid #8E2DE2;
`;
export const IncompleteCircle = styled.div`
  display: flex;
  width: 25px;
  height: 25px;
  border-radius: 50%;
  border: 2px solid gray;
`;
export const CourseTitle = styled.p`
  font-size: 14px;
  font-family: 'Raleway', sans-serif;
  margin: 0;
`;
export const CurrentCourse = styled.p`
  font-size: 14px;
  font-weight: 600;
  font-family: 'Raleway', sans-serif;
  margin: 0;
`;
export const Details = styled.div`
  display: flex;
  width: 90%;
  flex-direction: column;
  gap: 5px;
  cursor:pointer;
`;
export const DetailContain = styled.div`
  display: flex;
  width:100%;
  justify-content: space-between;
`;

export const CourseLength = styled.div`
  font-size: 12px;
  font-family: 'Raleway', sans-serif;
  color: gray;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 5px;
`;
export const CoursePoints = styled.p`
  font-size: 12px;
  font-family: 'Raleway', sans-serif;
  color: #8E2DE2;
  margin: 0;
`;
export const DividerComplete = styled.div`
  border-radius:10px;
  width: 4px;
  height: 44px;
  background: linear-gradient(135deg, #8E2DE2 0%, #4A00E0 100%);
  position: absolute;
  top: 28px;
  left: 11px;
`;
export const DocIcon = styled.i`
  background-image: url(../images/Video/icons/document.svg);
  height: 14px;
  width: 14px;
  background-position: center;
  background-repeat: no-repeat;
}`;
export const CurrentDivider = styled.div`
  border-radius:10px;
  width: 4px;
  height: 44px;
  border: 1px solid #8E2DE2;
  position: absolute;
  top: 28px;
  left: 11px;
`;
export const DividerIncomplete = styled.div`
  border-radius:10px;
  width: 4px;
  height: 44px;
  background: gray;
  position: absolute;
  top: 28px;
  left: 11px;
`;